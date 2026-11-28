import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck } from 'lucide-react';
import { SectionTitle, Stat } from '../components/Ui';

const recentActivity = [
  ['System health check',    'Completed', 'Today, 09:30'],
  ['Sample report generated','Completed', 'Yesterday, 16:10'],
  ['Role review',            'Pending',   'Yesterday, 14:25'],
];

// ─── Admin Login Gate ─────────────────────────────────────────────────────────

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (username === 'admin' && password === 'apex2024') {
      localStorage.setItem('apex_admin', 'true');
      onLogin();
    } else {
      setError('Invalid admin credentials');
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-5">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="mb-7 flex items-center gap-3">
          <span className="rounded-2xl bg-blue-700 p-2.5 text-white"><ShieldCheck size={22} /></span>
          <span className="text-2xl font-black text-slate-950">Admin Access</span>
        </div>
        <p className="mb-7 text-sm text-slate-500">Sign in to the Apex Bank admin panel.</p>

        {error && (
          <p className="mb-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-bold text-slate-700">
            Username
            <input
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              className="mt-2 w-full rounded-xl border border-slate-200 p-4 font-normal outline-none focus:border-blue-600"
            />
          </label>
          <label className="block text-sm font-bold text-slate-700">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full rounded-xl border border-slate-200 p-4 font-normal outline-none focus:border-blue-600"
            />
          </label>
          <button className="w-full rounded-xl bg-blue-700 py-4 font-bold text-white hover:bg-blue-800">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }) {
  const [users, setUsers]               = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError]     = useState(null);

  const [posts, setPosts]               = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const [todos, setTodos]               = useState([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [todosError, setTodosError]     = useState(null);

  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(r => setUsers(r.data))
      .catch(() => setUsersError('Could not load user data.'))
      .finally(() => setUsersLoading(false));

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(r => setPosts(r.data))
      .catch(() => {})
      .finally(() => setPostsLoading(false));

    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(r => setTodos(r.data))
      .catch(() => setTodosError('Could not load pending approvals.'))
      .finally(() => setTodosLoading(false));
  }, []);

  function approveUser(id, name) {
    showToast(`✓ ${name} approved`);
  }

  function blockUser(id, name) {
    showToast(`✗ ${name} blocked`);
  }

  function approveTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
    showToast('Account request approved');
  }

  function rejectTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
    showToast('Account request rejected');
  }

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-12">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionTitle
            eyebrow="Administration"
            title="Admin Dashboard"
            description="Apex Bank operations overview."
          />
          <button
            onClick={onLogout}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            Log out
          </button>
        </div>

        {/* 1. Stats row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            value={usersLoading ? '…' : String(users.length)}
            label="Total users"
          />
          <Stat
            value={postsLoading ? '…' : String(posts.length)}
            label="Total posts"
          />
          <Stat value="PKR 8.4M" label="Illustrative deposits" />
          <Stat value="99.2%"    label="Uptime" />
        </div>

        {/* 2. Users Table */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-xl font-black text-slate-950">Users</h2>
            {!usersLoading && !usersError && (
              <p className="mt-1 text-sm text-slate-500">{users.length} users fetched from API</p>
            )}
          </div>

          {usersError && <p className="p-6 text-red-500">{usersError}</p>}

          {!usersLoading && !usersError && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-5 py-3 text-left font-bold text-slate-600">ID</th>
                    <th className="px-5 py-3 text-left font-bold text-slate-600">Name</th>
                    <th className="px-5 py-3 text-left font-bold text-slate-600">Email</th>
                    <th className="px-5 py-3 text-left font-bold text-slate-600">Company</th>
                    <th className="px-5 py-3 text-left font-bold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-slate-500">{u.id}</td>
                      <td className="px-5 py-3 font-bold text-slate-800">{u.name}</td>
                      <td className="px-5 py-3 text-slate-600">{u.email}</td>
                      <td className="px-5 py-3 text-slate-500">{u.company?.name}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveUser(u.id, u.name)}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => blockUser(u.id, u.name)}
                            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600"
                          >
                            Block
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 3. Pending Approvals */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black text-slate-950">Pending Approvals</h2>
          <p className="mt-1 text-sm text-slate-500">Account requests awaiting review</p>

          {todosError && <p className="mt-4 text-red-500">{todosError}</p>}
          {todosLoading && <p className="mt-4 text-slate-500">Loading…</p>}

          {!todosLoading && !todosError && todos.length === 0 && (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-6 text-center">
              <p className="font-bold text-emerald-700">All caught up! No pending approvals.</p>
            </div>
          )}

          {!todosLoading && todos.length > 0 && (
            <div className="mt-5 space-y-3">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                      Request #{todo.id}
                    </p>
                    <p className="mt-1 font-semibold capitalize text-slate-800">{todo.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveTodo(todo.id)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
                    >
                      Approve Account
                    </button>
                    <button
                      onClick={() => rejectTodo(todo.id)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Recent Activity */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black">Recent admin activity</h2>
          <div className="mt-5 divide-y text-sm">
            {recentActivity.map(([action, status, time]) => (
              <div key={action} className="flex flex-wrap justify-between gap-2 py-4">
                <span className="font-bold text-slate-800">{action}</span>
                <span className="text-slate-500">{status} · {time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('apex_admin') === 'true'
  );

  function handleLogin() {
    setIsAdmin(true);
  }

  function handleLogout() {
    localStorage.removeItem('apex_admin');
    setIsAdmin(false);
  }

  if (!isAdmin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
