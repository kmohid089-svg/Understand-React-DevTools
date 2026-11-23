import { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Plus, Send, Download, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAccount } from '../context/AccountContext';

const initialRows = [
  ['Salary credit',       'Income',   '+ PKR 125,000', 'Today'],
  ['Grocery store',       'Shopping', '- PKR 8,450',   'Yesterday'],
  ['Electricity bill',    'Utilities','- PKR 12,600',  '28 Oct'],
  ['Online subscription', 'Services', '- PKR 2,100',   '26 Oct'],
];

const quickActions = [
  [Plus,     'Add funds'],
  [Send,     'Transfer'],
  [Download, 'Statement'],
];

const bars = [35, 55, 45, 70, 52, 85, 65, 95, 72, 80, 60, 90];

export default function Dashboard() {
  const [visible, setVisible] = useState(true);
  const rows = initialRows;
  const { user } = useAuth();
  const { balance, deposit, withdraw } = useAccount();

  const [holder, setHolder] = useState(null);
  const [holderLoading, setHolderLoading] = useState(true);
  const [holderError, setHolderError] = useState(null);

  useEffect(() => {
    async function fetchHolder() {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        setHolder(data);
      } catch (err) {
        setHolderError('Could not load account holder info.');
      } finally {
        setHolderLoading(false);
      }
    }
    fetchHolder();
  }, []);

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-blue-700">ACCOUNT OVERVIEW</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">Welcome back, {user?.name ?? 'Mohid'}</h1>
            <p className="mt-2 text-slate-500">Here is your illustrative financial snapshot.</p>
          </div>
          <Link to="/profile" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700">
            Account settings
          </Link>
        </div>

        {/* Balance + Chart */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-blue-800 to-blue-600 p-7 text-white shadow-xl lg:col-span-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-blue-100">Total available balance</p>
                <p className="mt-3 text-4xl font-black">{visible ? `PKR ${balance.toLocaleString('en-PK')}` : '••••••••'}</p>
              </div>
              <button onClick={() => setVisible(!visible)} className="h-fit rounded-xl bg-white/15 p-3">
                {visible ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {quickActions.map(([Icon, label]) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === 'Add funds') { deposit(50000); }
                    else if (label === 'Transfer') { withdraw(10000); }
                    else { alert('This is a demo banking action. No money is moved.'); }
                  }}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-800"
                >
                  <Icon size={17} /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-emerald-50 p-3 text-emerald-700"><Activity /></span>
              <div>
                <p className="text-sm text-slate-500">Monthly cash flow</p>
                <p className="text-2xl font-black text-slate-950">+ PKR 64,500</p>
              </div>
            </div>
            <div className="mt-8 flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-blue-200" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">Illustrative monthly activity</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Income this month</p>
            <p className="mt-2 text-2xl font-black text-slate-950">PKR 185,000</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Spending this month</p>
            <p className="mt-2 text-2xl font-black text-slate-950">PKR 120,500</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Savings goal</p>
            <p className="mt-2 text-2xl font-black text-slate-950">35% complete</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-950">Recent activity</h2>
              <p className="mt-1 text-sm text-slate-500">Sample transactions for this demo account.</p>
            </div>
            <Link to="/transactions" className="font-bold text-blue-700">View all</Link>
          </div>
          <div className="mt-5 divide-y">
            {rows.map(([name, type, amount, date], i) => (
              <div key={name} className="flex items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl bg-slate-100 p-3 text-slate-700">
                    {i === 0 ? <ArrowDownLeft /> : <ArrowUpRight />}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{name}</p>
                    <p className="text-sm text-slate-500">{type} · {date}</p>
                  </div>
                </div>
                <p className={`font-extrabold ${amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Demo notice: balances and transactions are fictional. No real account, transfer or deposit is connected.
        </p>

        {/* Account Holder Info Card */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black text-slate-950">Account Holder</h2>
          <p className="mt-1 text-sm text-slate-500">Data fetched from JSONPlaceholder API.</p>
          {holderLoading && <p className="mt-4 text-slate-500">Loading account holder…</p>}
          {holderError && <p className="mt-4 text-red-500">{holderError}</p>}
          {holder && (
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</p>
                <p className="mt-1 font-extrabold text-slate-900">{holder.name}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</p>
                <p className="mt-1 font-extrabold text-slate-900">{holder.email}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Company</p>
                <p className="mt-1 font-extrabold text-slate-900">{holder.company?.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
