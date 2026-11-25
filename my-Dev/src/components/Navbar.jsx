import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Landmark, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const publicLinks = [
  { label: 'Home',    to: '/' },
  { label: 'About',   to: '/about' },
  { label: 'Support', to: '/support' },
  { label: 'News',    to: '/news' },
];

const privateLinks = [
  { label: 'Home',        to: '/' },
  { label: 'Personal',    to: '/personal' },
  { label: 'Business',    to: '/business' },
  { label: 'Cards',       to: '/cards' },
  { label: 'Loans',       to: '/loans' },
  { label: 'Savings',     to: '/savings' },
  { label: 'Investments', to: '/investments' },
  { label: 'Dashboard',   to: '/dashboard' },
  { label: 'Support',     to: '/support' },
  { label: 'Blog',        to: '/blog' },
];

const navCls = ({ isActive }) =>
  `text-sm font-semibold transition ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'}`;

const mobileCls = ({ isActive }) =>
  `rounded-lg px-3 py-3 font-semibold ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user ? privateLinks : publicLinks;

  function handleLogout() {
    logout();
    navigate('/');
    close();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <span className="rounded-2xl bg-blue-700 p-2.5 text-white"><Landmark size={23} /></span>
          <span className="text-2xl font-black tracking-tight text-slate-950">Meta<span className="text-blue-700">Bank</span></span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {links.map(l => <NavLink key={l.to} to={l.to} className={navCls}>{l.label}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm font-bold text-slate-700">{user.name}</span>
              <button onClick={handleLogout} className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Log in</Link>
              <Link to="/register" className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800">Open an account</Link>
            </>
          )}
        </div>

        <button className="rounded-xl p-2 text-slate-800 xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-slate-200 bg-white p-4 xl:hidden">
          {links.map(l => <NavLink key={l.to} to={l.to} onClick={close} className={mobileCls}>{l.label}</NavLink>)}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {user ? (
              <button onClick={handleLogout} className="col-span-2 rounded-xl border p-3 text-center font-bold">Log out</button>
            ) : (
              <>
                <Link to="/login"    onClick={close} className="rounded-xl border p-3 text-center font-bold">Log in</Link>
                <Link to="/register" onClick={close} className="rounded-xl bg-blue-700 p-3 text-center font-bold text-white">Open account</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
