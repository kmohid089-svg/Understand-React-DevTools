import { useState } from "react";
import axios from "axios";
import {Link,Routes,Route,} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {increment,decrement,reset,} from "./redux/counterSlice";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [name, setName] = useState("Mohid");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getUser() {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );

      setUser(response.data);
    } catch {
      setError("User data load nahi hua.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <section>
        <h1 className="text-3xl font-bold">
          My React Learning App
        </h1>

        <p className="mt-2">
          Welcome, {name}!
        </p>

        <button
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => setName("React Developer")}
        >
          Change Name
        </button>
      </section>

      <section className="rounded border p-5">
        <h2 className="text-xl font-bold">
          Redux Toolkit Counter
        </h2>

        <p className="my-3 text-2xl">{count}</p>

        <div className="flex gap-3">
          <button
            className="rounded bg-green-600 px-3 py-2 text-white"
            onClick={() => dispatch(increment())}
          >
            Increase
          </button>

          <button
            className="rounded bg-red-600 px-3 py-2 text-white"
            onClick={() => dispatch(decrement())}
          >
            Decrease
          </button>

          <button
            className="rounded bg-gray-700 px-3 py-2 text-white"
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="rounded border p-5">
        <h2 className="text-xl font-bold">
          Axios API Calling
        </h2>

        <button
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          onClick={getUser}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get User"}
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}

        {user && (
          <UserCard
            name={user.name}
            email={user.email}
          />
        )}
      </section>
    </main>
  );
}

function UserCard(props) {
  return (
    <div className="mt-4 rounded bg-gray-100 p-4 text-gray-900">
      <h3 className="font-bold">{props.name}</h3>
      <p>{props.email}</p>
    </div>
  );
}

function About() {
  return <h1 className="p-8 text-2xl">About Page</h1>;
}

function Docs() {
  return <h1 className="p-8 text-2xl">Docs Page</h1>;
}

export default function App() {
  return (
    <>
      <nav className="flex gap-6 bg-slate-900 p-4 text-white">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/docs">Docs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </>
  );
}
