import { useState, useEffect } from 'react';
import axios from 'axios';
import { Landmark, ShieldCheck, Smartphone, Globe2, ArrowUpRight, Wallet, CreditCard, ChartNoAxesCombined } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero, SectionTitle, FeatureCard, CTA, Stat } from '../components/Ui';

const features = [
  { icon: Wallet,               title: 'Personal banking',    description: 'Manage everyday accounts, move money in your demo workspace and stay on top of your spending.' },
  { icon: Landmark,             title: 'Business banking',    description: 'Explore business account features, payment workflows and cash-flow visibility.' },
  { icon: CreditCard,           title: 'Cards with control',  description: 'Review card options and try demo card controls, including freeze and unfreeze.' },
  { icon: ChartNoAxesCombined,  title: 'Savings and goals',   description: 'Set a target, track your progress and build a savings habit at your own pace.' },
  { icon: Globe2,               title: 'Investment overview', description: 'Explore a sample portfolio view and learn about diversified investment categories.' },
  { icon: ShieldCheck,          title: 'Security first',      description: 'Understand account protection features, alerts and responsible digital banking.' },
];

const stats = [
  { value: '24/7',          label: 'Digital access concept' },
  { value: '3 min',         label: 'Illustrative account setup' },
  { value: 'Multi-currency',label: 'Designed for global needs' },
  { value: 'One view',      label: 'Accounts and activity' },
];

function HeroCard() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-300/5 p-5 shadow-2xl">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-500">MetaBank Platinum</span>
          <Landmark className="text-blue-700" />
        </div>
        <p className="mt-8 text-sm text-slate-500">Available balance</p>
        <p className="mt-1 text-4xl font-black">PKR 2,450,800</p>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">••••  ••••  ••••  2048</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Active</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/10 p-4 text-white">
          <Wallet />
          <p className="mt-3 text-sm text-blue-100">Monthly savings</p>
          <p className="text-xl font-bold">PKR 85,000</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 text-white">
          <ChartNoAxesCombined />
          <p className="mt-3 text-sm text-blue-100">Portfolio growth</p>
          <p className="text-xl font-bold">+8.4%</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [rates, setRates] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        const { data } = await axios.get('https://open.er-api.com/v6/latest/USD');
        setRates(data.rates);
      } catch (err) {
        setRatesError('Could not load live rates.');
      } finally {
        setRatesLoading(false);
      }
    }
    fetchRates();
  }, []);

  return (
    <>
      <PageHero
        dark
        eyebrow="Banking, reimagined"
        title="A smarter way to"
        accent="move forward."
        description="Bring everyday banking, savings goals and financial insights together in one clear digital experience. Built for people and businesses with big plans."
        action={{ to: '/register', label: 'Open your account' }}
        secondary={{ to: '/about', label: 'Discover MetaBank' }}
      >
        <HeroCard />
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="One connected experience"
          title="Banking that fits your life"
          description="From daily spending to long-term plans, explore tools designed to make money management feel simpler."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="At a glance" title="A clearer view of your finances" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(s => <Stat key={s.value} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">Your money, in focus</p>
          <h2 className="mt-4 text-4xl font-black">Less guesswork. More confidence.</h2>
          <p className="mt-5 leading-8 text-slate-300">
            See spending patterns, review activity and keep your financial priorities close with a dashboard made for everyday decisions.
          </p>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold">
            Explore dashboard <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="space-y-5">
          <FeatureCard icon={Smartphone}  title="A consistent digital experience" description="Move between account information, support and planning tools with a familiar interface." />
          <FeatureCard icon={ShieldCheck} title="Built around trust"               description="Clear information, security education and transparent demo experiences are part of every step." />
        </div>
      </section>

      <CTA
        title="Ready to explore a better banking experience?"
        description="Create a demo profile and explore the MetaBank experience. This is a demonstration website, not a real financial institution."
      />

      {/* Live Rates section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Live rates" title="Today's exchange rates" description="Rates fetched live from Open Exchange Rates API (base: USD)." />
        {ratesLoading && <p className="text-slate-500">Loading rates…</p>}
        {ratesError && <p className="text-red-500">{ratesError}</p>}
        {rates && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[['USD', '🇺🇸'], ['PKR', '🇵🇰'], ['EUR', '🇪🇺'], ['GBP', '🇬🇧'], ['AED', '🇦🇪']].map(([code, flag]) => (
              <div key={code} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <p className="text-2xl">{flag}</p>
                <p className="mt-2 text-lg font-black text-slate-950">{code}</p>
                <p className="mt-1 text-2xl font-bold text-blue-700">{rates[code]?.toFixed(4)}</p>
                <p className="mt-1 text-xs text-slate-400">per 1 USD</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
