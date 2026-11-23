import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      login({
        name: res.data.user.name,
        email: res.data.user.email,
        accountNumber: res.data.user.accountNumber,
        balance: res.data.user.balance,
      });
      localStorage.setItem('mb_token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (!err.response) {
        // Server offline — fall back to demo mode
        if (password.length >= 6) {
          setError('Server offline — using demo mode');
          login({ name: 'Demo User', email, accountNumber: 'MB-DEMO-0000', balance: 0 });
          setTimeout(() => navigate('/dashboard'), 1200);
        } else {
          setError('Server offline — using demo mode. Password must be at least 6 characters.');
        }
      } else {
        setError(err.response?.data?.message || 'Incorrect email or password');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-[75vh] bg-slate-50 lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-slate-950 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black">
          <Landmark className="text-blue-400" />MetaBank
        </Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">Your finances, in focus</p>
          <h1 className="mt-5 max-w-lg text-5xl font-black leading-tight">Welcome to a clearer banking experience.</h1>
          <p className="mt-5 max-w-md leading-8 text-slate-300">Sign-in screen concept for the MetaBank demo website.</p>
        </div>
        <p className="text-xs text-slate-500">Fictional banking demo — no real account access.</p>
      </div>

      <div className="flex items-center justify-center px-5 py-14">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-7 flex items-center gap-3 lg:hidden">
            <Landmark className="text-blue-700" />
            <span className="text-2xl font-black">MetaBank</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Secure access</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Sign in</h2>
          <p className="mt-2 text-slate-500">Enter your MetaBank credentials to continue.</p>

          {error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <label className="mt-7 block text-sm font-bold">
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border p-4 font-normal outline-none focus:border-blue-600"
              placeholder="you@example.com"
            />
          </label>
          <label className="mt-5 block text-sm font-bold">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border p-4 font-normal outline-none focus:border-blue-600"
              placeholder="Enter your password"
            />
          </label>

          <button disabled={loading} className="mt-7 w-full rounded-xl bg-blue-700 py-4 font-bold text-white disabled:opacity-60">
            {loading ? 'Signing in…' : 'Continue'}
          </button>
          <p className="mt-5 text-center text-sm text-slate-500">
            New to MetaBank? <Link to="/register" className="font-bold text-blue-700">Open an account</Link>
          </p>
          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} /> Demo form only. Do not use a real password.
          </p>
        </form>
      </div>
    </main>
  );
}
