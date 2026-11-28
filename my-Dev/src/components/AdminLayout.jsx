import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, ShieldCheck, Home, Users, CheckCircle, Activity } from 'lucide-react';

const bottomNavLinks = [
  { label: 'Home', to: '/admin-secret-panel', icon: Home },
  { label: 'Users', to: '/admin-secret-panel/users', icon: Users },
  { label: 'Approvals', to: '/admin-secret-panel/approvals', icon: CheckCircle },
  { label: 'Activity', to: '/admin-secret-panel/activity', icon: Activity },
];

export function AdminLayout({ children }) {
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();

  // Show login screen if not authenticated
  if (localStorage.getItem('apex_admin_secret') !== 'true') {
    return (
      <main className="flex min-h-[100vh] flex-col items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="rounded-2xl bg-blue-700 p-2.5 text-white">
              <ShieldCheck size={24} />
            </span>
          </div>
          <h2 className="mb-2 text-center text-2xl font-black text-slate-950">
            Admin Access
          </h2>
          <p className="mb-6 text-center text-sm text-slate-500">
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
                  'mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700';
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
                className="mt-1 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-blue-600"
              />
            </label>
            <label className="block text-sm font-bold text-slate-700">
              Password
              <input
                required
                name="password"
                type="password"
                placeholder="Enter password"
                className="mt-1 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-blue-600"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white hover:bg-blue-800"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-400">
            Use: apexadmin / Ap3x2024$B@nk
          </p>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-2">
          <div className="mx-auto flex max-w-md items-center justify-around">
            <button
              onClick={() => navigate('/')}
              className="flex flex-col items-center gap-1 rounded-lg p-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex flex-col items-center gap-1 rounded-lg p-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Landmark size={20} />
              <span>Bank</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>{children}</main>

      {/* Bottom Admin Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-3xl items-center justify-around px-2 py-2">
          {bottomNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setActiveTab(link.label)}
              className={`flex flex-col items-center gap-1 rounded-lg p-3 transition ${
                activeTab === link.label
                  ? 'text-blue-700'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <link.icon size={22} />
              <span className="text-xs font-semibold">{link.label}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem('apex_admin_secret');
              window.location.reload();
            }}
            className="flex flex-col items-center gap-1 rounded-lg p-3 text-red-600 hover:bg-red-50"
          >
            <ShieldCheck size={22} />
            <span className="text-xs font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default AdminLayout;
