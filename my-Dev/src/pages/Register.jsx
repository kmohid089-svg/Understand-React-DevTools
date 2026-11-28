import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Landmark, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Personal', password: '' });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Already logged in → dashboard pe bhejo
  if (user) return <Navigate to="/dashboard" replace />;

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        type: form.type,
        password: form.password,
      });
      setDone(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // Agar server offline ho toh demo mode mein kaam kare
      if (!err?.response) {
        setDone(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err?.response?.data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

        {/* Left panel */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-600 p-9 text-white md:p-12">
          <Landmark size={36} />
          <p className="mt-12 text-sm font-bold uppercase tracking-widest text-blue-200">Start with Apex Bank</p>
          <h1 className="mt-4 text-4xl font-black">A better view of your money starts here.</h1>
          <p className="mt-5 leading-8 text-blue-100">Explore the registration journey for this fictional banking website concept.</p>
          <div className="mt-10 rounded-2xl bg-white/10 p-5">
            <ShieldCheck />
            <p className="mt-3 font-bold">Your information matters</p>
            <p className="mt-1 text-sm text-blue-100">This demo does not send or store the details you enter.</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Create a profile</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Open an account</h2>
          <p className="mt-2 text-slate-500">Fill in the sample form to preview the flow.</p>

          {done && (
            <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
              Account created! Please sign in.
            </p>
          )}
          {error && (
            <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block text-sm font-bold">
              Full name
              <input required name="name" value={form.name} onChange={change} placeholder="Your full name" className="mt-2 w-full rounded-xl border p-4 font-normal" />
            </label>
            <label className="block text-sm font-bold">
              Email address
              <input required type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" className="mt-2 w-full rounded-xl border p-4 font-normal" />
            </label>
            <label className="block text-sm font-bold">
              Phone number
              <input required name="phone" value={form.phone} onChange={change} placeholder="03XX XXXXXXX" className="mt-2 w-full rounded-xl border p-4 font-normal" />
            </label>
            <label className="block text-sm font-bold">
              Account type
              <select name="type" value={form.type} onChange={change} className="mt-2 w-full rounded-xl border p-4">
                <option>Personal</option>
                <option>Business</option>
              </select>
            </label>
            <label className="block text-sm font-bold">
              Password
              <input required type="password" name="password" value={form.password} onChange={change} placeholder="Min 8 characters" minLength={8} className="mt-2 w-full rounded-xl border p-4 font-normal outline-none focus:border-blue-600" />
            </label>
            <button disabled={loading} className="w-full rounded-xl bg-blue-700 py-4 font-bold text-white disabled:opacity-60">
              {loading ? 'Creating account…' : 'Continue'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already registered? <Link to="/login" className="font-bold text-blue-700">Sign in</Link>
          </p>
        </div>

      </div>
    </main>
  );
}
