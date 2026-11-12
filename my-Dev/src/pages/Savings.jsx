import { useState } from 'react';
import { Target, CalendarDays, TrendingUp } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';

function SavingsCard({ saved, setSaved, goal }) {
  const pct = Math.min(100, Math.round((saved / goal) * 100));
  return (
    <div className="rounded-3xl bg-slate-950 p-7 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">My travel fund</p>
          <p className="mt-2 text-3xl font-black">PKR {saved.toLocaleString('en-PK')}</p>
        </div>
        <Target className="text-blue-300" size={34} />
      </div>
      <div className="mt-7 h-3 rounded-full bg-white/10">
        <div className="h-3 rounded-full bg-blue-400" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-sm text-slate-300">
        <span>{pct}% completed</span>
        <span>Goal PKR {goal.toLocaleString('en-PK')}</span>
      </div>
      <div className="mt-6 flex gap-2">
        <button onClick={() => setSaved(v => Math.min(goal, v + 10000))} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold">
          Add PKR 10,000
        </button>
        <button onClick={() => setSaved(0)} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold">
          Reset demo
        </button>
      </div>
    </div>
  );
}

export default function Savings() {
  const [goal, setGoal]   = useState(500000);
  const [saved, setSaved] = useState(175000);

  return (
    <>
      <PageHero
        eyebrow="Make room for your goals"
        title="Small steps can build"
        accent="big possibilities."
        description="Create a savings target, track contributions and see how close you are to the milestone you care about."
        action={{ to: '/dashboard', label: 'View dashboard' }}
      >
        <SavingsCard saved={saved} setSaved={setSaved} goal={goal} />
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="Savings tools" title="Give every goal a plan" />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard icon={Target}      title="Goal-based savings"    description="Give a target a name, amount and progress indicator so it feels achievable." />
          <FeatureCard icon={CalendarDays} title="Regular contributions" description="Build a consistent habit with a weekly or monthly contribution plan." />
          <FeatureCard icon={TrendingUp}  title="Progress insights"     description="See how each contribution moves you closer to your goal." />
        </div>

        <div className="mt-10 max-w-xl rounded-3xl border border-slate-200 p-6">
          <h3 className="text-xl font-extrabold">Adjust your demo goal</h3>
          <label className="mt-5 block text-sm font-bold">
            Savings target: PKR {goal.toLocaleString('en-PK')}
            <input
              className="mt-3 w-full accent-blue-700"
              type="range"
              min="100000"
              max="2000000"
              step="25000"
              value={goal}
              onChange={e => setGoal(+e.target.value)}
            />
          </label>
          <p className="mt-3 text-sm text-slate-500">
            Progress is stored only in this page's current state and resets when the page reloads.
          </p>
        </div>
      </section>

      <CTA
        title="Make your next goal feel closer"
        description="Explore the demo account dashboard and see your savings alongside everyday activity."
        to="/dashboard"
        label="Explore dashboard"
      />
    </>
  );
}
