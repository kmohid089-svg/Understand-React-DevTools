import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { AccountProvider } from './context/AccountContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import PersonalBanking from './pages/PersonalBanking';
import BusinessBanking from './pages/BusinessBanking';
import Cards from './pages/Cards';
import Loans from './pages/Loans';
import Savings from './pages/Savings';
import Investments from './pages/Investments';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Support from './pages/Support';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import News from './pages/News';
import Blog from './pages/Blog';

function Layout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"element={<Home />} />
        <Route path="/personal"element={<ProtectedRoute><PersonalBanking /></ProtectedRoute>} />
        <Route path="/business"element={<ProtectedRoute><BusinessBanking /></ProtectedRoute>} />
        <Route path="/cards"element={<ProtectedRoute><Cards /></ProtectedRoute>} />
        <Route path="/loans"element={<ProtectedRoute><Loans /></ProtectedRoute>} />
        <Route path="/savings"element={<ProtectedRoute><Savings /> <div>hi kesa ho </div></ProtectedRoute>} />
        <Route path="/investments"element={<ProtectedRoute><Investments /></ProtectedRoute>} />
        <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transactions"element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/profile"element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin"element={<Admin />} />
        <Route path="/support"element={<Support />} />
        <Route path="/contact"element={<Contact />} />
        <Route path="/about"element={<About />} />
        <Route path="/login"element={<Login />} />
        <Route path="/register"element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="*"element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AccountProvider>
          <Layout />
        </AccountProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
