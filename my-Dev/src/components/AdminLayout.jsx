import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Menu, X, ShieldCheck } from 'lucide-react';

const adminLinks = [
  { label: 'Dashboard', to: '/admin-secret-panel' },
  { label: 'Users', to: '/admin-secret-panel/users' },
  { label: 'Approvals', to: '/admin-secret-panel/approvals' },
  { label: 'Activity', to: '/admin-secret-panel/activity' },
];

const mobileAdminLinks = [
  { label: 'Dashboard', to: '/admin-secret-panel' },
  { label: 'Users', to: '/admin-secret-panel/users' },
  { label: 'Approvals', to: '/admin-secret-panel/approvals' },
  { label: 'Activity', to: '/admin-secret-panel/activity' },
];

export function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [logoutTriggered, setLogoutTriggered] = useState(false);

  function handleLogout() {
    localStorage.removeItem('apex_admin_secret');
    setLogoutTriggered(true);
    setTimeout(() => navigate('/'), 500);
  }

  // Show login screen if not authenticated
  if (logoutTriggered || localStorage.getItem('apex_admin_secret') !== 'true') {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="rounded-2xl bg-blue-700 p-2.5 text-white">
              <ShieldCheck size={22} />
            </span>
            <span className="text-2xl font-black text-slate-950">
              Admin Access
            </span>
          </div>
          <p className="mb-7 text-sm text-slate-500">
            Sign in to the Apex Bank admin panel.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const username = e.target.username.value;
              const password = e.target.password.value;

              if (username === 'apexadmin' && password === 'Ap3x2024$B@nk') {
                localStorage.setItem('apex_admin_secret', 'true');
                window.location.reload();
              } else {
                e.target.error?.remove?.();
                const errorDiv = document.createElement('div');
                errorDiv.className =
                  'mb-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700';
                errorDiv.textContent = 'Invalid secret credentials';
                e.target.insertBefore(errorDiv, e.target.firstChild);
                setTimeout(() => errorDiv.remove(), 3000);
              }
            }}
            className="space-y-4"
          >
            <label className="block text-sm font-bold text-slate-700">
              Username
              <input
                required
                name="username"
                placeholder="apexadmin"
                className="mt-2 w-full rounded-xl border border-slate-200 p-4 font-normal outline-none focus:border-blue-600"
              />
            </label>
            <label className="block text-sm font-bold text-slate-700">
              Password
              <input
                required
                name="password"
                type="password"
                placeholder="Enter password"
                className="mt-2 w-full rounded-xl border border-slate-200 p-4 font-normal outline-none focus:border-blue-600"
              />
            </label>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Use: apexadmin / Ap3x2024$B@nk
              </span>
              <button
                type="submit"
                className="rounded-xl bg-blue-700 py-3 px-6 font-bold text-white hover:bg-blue-800"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/admin-secret-panel"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="rounded-2xl bg-blue-700 p-2.5 text-white">
              <Landmark size={23} />
            </span>
            <span className="text-2xl font-black tracking-tight text-slate-950">
              Apex <span className="text-blue-700">Admin</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex">
            {adminLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-semibold transition text-slate-600 hover:text-blue-700"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Log out
            </button>
          </nav>

          <button
            className="rounded-xl p-2 text-slate-800 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-slate-200 bg-white p-4 xl:hidden">
            {mobileAdminLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-semibold text-slate-700"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 rounded-xl border border-slate-200 p-3 text-center font-bold"
            >
              Log out
            </button>
          </nav>
        )}
      </header>

      <main>{children}</main>
    </>
  );
}

export default AdminLayout;
