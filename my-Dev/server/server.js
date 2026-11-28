
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 25000 }
}, { timestamps: true });

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["deposit", "transfer"],
    required: true
  },
  amount: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/", (req, res) => {
  res.json({ message: "Apex Bank API is running" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        message: "Name, valid email and password of at least 8 characters required"
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      accountNumber: String(Date.now()).slice(-10)
    });

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: user.balance
      }
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/api/account/me", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.json(user);
});

app.get("/api/transactions", authenticate, async (req, res) => {
  const transactions = await Transaction.find({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(transactions);
});

// Demo deposit only; this does not add real money.
app.post("/api/account/demo-deposit", authenticate, async (req, res) => {
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) {
    return res.status(400).json({ message: "Invalid demo amount" });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $inc: { balance: amount } },
    { new: true }
  );

  await Transaction.create({
    userId: user._id,
    type: "deposit",
    amount,
    description: "Demo deposit"
  });

  res.json({ balance: user.balance });
});

app.post("/api/transfers", authenticate, async (req, res) => {
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const user = await User.findById(req.user.id);

  if (!user || user.balance < amount) {
    return res.status(400).json({ message: "Insufficient demo balance" });
  }

  user.balance -= amount;
  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "transfer",
    amount,
    description: req.body.description || "Demo transfer"
  });

  res.json({
    message: "Demo transfer completed",
    balance: user.balance
  });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI || !JWT_SECRET) {
      throw new Error("MONGODB_URI and JWT_SECRET are required in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Apex Bank API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
