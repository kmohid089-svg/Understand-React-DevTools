import { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, CalendarDays, TrendingUp, CheckCircle2, Trash2, PlusCircle } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';
import { useAccount } from '../context/AccountContext';

/* ── Single goal card ─────────────────────────────────────────── */
function GoalCard({ goal, onContribute, onDelete }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');

  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  const remaining = Math.max(0, goal.target - goal.saved);
  const reached = pct >= 100;

  function handleConfirm() {
    const amount = Number(input);
    if (!amount || amount < 1) { setErr('Enter a valid amount.'); return; }
    const ok = onContribute(goal.id, amount);
    if (!ok) { setErr('Insufficient balance.'); return; }
    setInput('');
    setErr('');
    setOpen(false);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-extrabold text-slate-950">{goal.name}</p>
          {reached && (
            <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
              <CheckCircle2 size={15} /> Goal Reached! 🎉
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(goal.id)}
          className="shrink-0 rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
          title="Delete goal"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* progress bar */}
      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div
          className={`h-3 rounded-full transition-all ${reached ? 'bg-emerald-500' : 'bg-blue-600'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
        <span>{pct}% complete</span>
        <span>PKR {remaining.toLocaleString('en-PK')} remaining</span>
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-slate-600">
          Saved: <span className="font-bold text-slate-950">PKR {goal.saved.toLocaleString('en-PK')}</span>
        </span>
        <span className="text-slate-600">
          Target: <span className="font-bold text-slate-950">PKR {goal.target.toLocaleString('en-PK')}</span>
        </span>
      </div>

      {/* inline add-money */}
      {!reached && (
        <div className="mt-5">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              <PlusCircle size={15} /> Add Money
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                min="1"
                placeholder="Amount PKR"
                value={input}
                onChange={(e) => { setInput(e.target.value); setErr(''); }}
                className="w-36 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleConfirm}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => { setOpen(false); setInput(''); setErr(''); }}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              {err && <p className="w-full text-xs text-red-500">{err}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────── */
export default function Savings() {
  const { balance, goals, deposit, addGoal, contributeToGoal, deleteGoal } = useAccount();

  /* new-goal form */
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [formErr, setFormErr] = useState('');

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) { setFormErr('Goal name is required.'); return; }
    const amount = Number(newTarget);
    if (!amount || amount < 1000) { setFormErr('Target must be at least PKR 1,000.'); return; }
    addGoal(newName.trim(), amount);
    setNewName('');
    setNewTarget('');
    setFormErr('');
  }

  /* API section */
  const [todos, setTodos] = useState([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [todosError, setTodosError] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/todos?userId=1&_limit=4'
        );
        setTodos(data);
      } catch {
        setTodosError('Could not load savings goals.');
      } finally {
        setTodosLoading(false);
      }
    }
    fetchTodos();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Make room for your goals"
        title="Small steps can build"
        accent="big possibilities."
        description="Create a savings target, track contributions and see how close you are to the milestone you care about."
        action={{ to: '/dashboard', label: 'View dashboard' }}
      >
        {/* Section C — Current Balance (inside hero) */}
        <div className="rounded-3xl bg-slate-950 p-7 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Current Balance</p>
              <p className="mt-2 text-3xl font-black">PKR {balance.toLocaleString('en-PK')}</p>
            </div>
            <Target className="text-blue-300" size={34} />
          </div>
          <div className="mt-6">
            <button
              onClick={() => deposit(10000)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold hover:bg-blue-700"
            >
              Add PKR 10,000
            </button>
          </div>
        </div>
      </PageHero>

      {/* Section A — My Goals */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="My savings goals" title="Track every goal" />

        {goals.length === 0 ? (
          <p className="text-slate-500">No goals yet. Create your first goal below.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                onContribute={contributeToGoal}
                onDelete={deleteGoal}
              />
            ))}
          </div>
        )}

        {/* Section B — Add New Goal */}
        <div className="mt-12 max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-950">Add New Goal</h3>
          <form onSubmit={handleCreate} className="mt-5 space-y-4" noValidate>
            <div>
              <label className="block text-sm font-bold text-slate-700">Goal Name</label>
              <input
                type="text"
                placeholder="e.g. Car, House, Laptop"
                value={newName}
                onChange={(e) => { setNewName(e.target.value); setFormErr(''); }}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700">Target Amount (PKR)</label>
              <input
                type="number"
                min="1000"
                placeholder="Minimum PKR 1,000"
                value={newTarget}
                onChange={(e) => { setNewTarget(e.target.value); setFormErr(''); }}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formErr && <p className="text-sm text-red-500">{formErr}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800"
            >
              Create Goal
            </button>
          </form>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <SectionTitle eyebrow="Savings tools" title="Give every goal a plan" />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard icon={Target}       title="Goal-based savings"    description="Give a target a name, amount and progress indicator so it feels achievable." />
          <FeatureCard icon={CalendarDays} title="Regular contributions" description="Build a consistent habit with a weekly or monthly contribution plan." />
          <FeatureCard icon={TrendingUp}   title="Progress insights"     description="See how each contribution moves you closer to your goal." />
        </div>
      </section>

      <CTA
        title="Make your next goal feel closer"
        description="Explore the demo account dashboard and see your savings alongside everyday activity."
        to="/dashboard"
        label="Explore dashboard"
      />

      {/* Section D — API (existing) */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Savings goals" title="Your savings checklist" description="Demo goals from JSONPlaceholder API." />
        {todosLoading && <p className="text-slate-500">Loading goals…</p>}
        {todosError && <p className="text-red-500">{todosError}</p>}
        {todos.length > 0 && (
          <ul className="mt-4 max-w-xl space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    todo.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {todo.completed ? '✓' : '○'}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                  }`}
                >
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
