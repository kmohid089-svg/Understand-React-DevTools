import { useState, useEffect } from 'react';
import axios from 'axios';
import { CreditCard, LockKeyhole, Plane, ShoppingBag } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';
import { useAuth } from '../context/AuthContext';

// ─── Data ────────────────────────────────────────────────────────────────────

const CARD_TIERS = [
  { icon: CreditCard,  tag: 'Everyday', title: 'Essential debit', description: 'A straightforward card concept for routine purchases and cash access.' },
  { icon: Plane,       tag: 'Travel',   title: 'Platinum card',   description: 'A premium sample tier with travel-focused benefits and spending insights.' },
  { icon: ShoppingBag, tag: 'Flexible', title: 'Rewards card',    description: 'A sample rewards experience for eligible everyday spending categories.' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroCard({ frozen, tab }) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-950 to-blue-700 p-7 text-white shadow-2xl">
      <div className="flex items-start justify-between">
        <span className="text-lg font-black">MetaBank</span>
        <CreditCard size={30} />
      </div>
      <p className="mt-16 text-sm text-blue-100">PLATINUM {tab.toUpperCase()} CARD</p>
      <p className="mt-2 text-2xl font-bold tracking-[.2em]">•••• •••• •••• 2048</p>
      <div className="mt-8 flex justify-between text-sm">
        <span>MOHID KHAN</span>
        <span>VISA</span>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-xl bg-white/10 p-3">
        <span className="text-sm">Demo card status</span>
        <span className="font-bold">{frozen ? 'Frozen' : 'Active'}</span>
      </div>
    </div>
  );
}

function FreezeControl({ frozen, setFrozen }) {
  return (
    <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-blue-50 p-3 text-blue-700">
          <LockKeyhole />
        </span>
        <div>
          <h3 className="font-extrabold text-slate-950">Temporary card lock</h3>
          <p className="text-sm text-slate-500">
            {frozen
              ? 'Your demo card is currently frozen.'
              : 'Your demo card is currently active.'}
          </p>
        </div>
      </div>
      <button
        onClick={() => setFrozen(!frozen)}
        className={`mt-6 w-full rounded-xl px-5 py-4 font-bold text-white ${
          frozen ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'
        }`}
      >
        {frozen ? 'Unfreeze demo card' : 'Freeze demo card'}
      </button>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        This only changes the status shown on this page. It does not control a real payment card.
      </p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Cards() {
  const { user } = useAuth();
  const [frozen, setFrozen] = useState(false);
  const [tab, setTab] = useState('debit');

  const [tips, setTips] = useState([]);
  const [tipsLoading, setTipsLoading] = useState(true);
  const [tipsError, setTipsError] = useState(null);

  useEffect(() => {
    async function fetchTips() {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=3'
        );
        setTips(data);
      } catch (err) {
        setTipsError('Could not load card tips.');
      } finally {
        setTipsLoading(false);
      }
    }
    fetchTips();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Cards and payments"
        title="A card experience with"
        accent="more control."
        description="Compare sample card tiers, review card benefits and try the interactive freeze control. All card details and actions on this page are demonstrations."
        action={user ? { to: '/dashboard', label: 'Go to Dashboard' } : { to: '/register', label: 'Get started' }}
      >
        <HeroCard frozen={frozen} tab={tab} />
      </PageHero>

      {/* Card controls section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionTitle
            eyebrow="Card controls"
            title="Manage your demo card"
            description="Switch card type and test the local freeze/unfreeze interaction."
          />
          <div className="flex gap-2">
            <button
              onClick={() => setTab('debit')}
              className={`rounded-xl px-5 py-3 font-bold ${
                tab === 'debit' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Debit
            </button>
            <button
              onClick={() => setTab('credit')}
              className={`rounded-xl px-5 py-3 font-bold ${
                tab === 'credit' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Credit
            </button>
          </div>
        </div>

        <FreezeControl frozen={frozen} setFrozen={setFrozen} />
      </section>

      {/* Card tiers section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Choose a card" title="Find a card for your lifestyle" />
          <div className="grid gap-5 md:grid-cols-3">
            {CARD_TIERS.map((c) => (
              <FeatureCard
                key={c.title}
                icon={c.icon}
                tag={c.tag}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Explore your MetaBank account"
        description="Review your account overview and demo card activity in the dashboard."
        to="/dashboard"
        label="Go to dashboard"
      />

      {/* Card Tips section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Card tips" title="Tips for smarter card use" description="Demo articles from JSONPlaceholder API." />
        {tipsLoading && <p className="text-slate-500">Loading tips…</p>}
        {tipsError && <p className="text-red-500">{tipsError}</p>}
        {tips.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {tips.map((tip) => (
              <div key={tip.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Tip #{tip.id}</p>
                <h3 className="mt-2 font-extrabold capitalize text-slate-900">{tip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{tip.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
