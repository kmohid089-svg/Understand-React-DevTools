import { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, PiggyBank, ArrowLeftRight, Smartphone, ReceiptText, ShieldCheck } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';
import { useAccount } from '../context/AccountContext';

const quickActions = [
  ['Send', '↗', 'send'],
  ['Bills', '▤', 'bills'],
  ['Save', '＋', 'save'],
];

const BILL_LIST = [
  { id: 'elec', label: 'Electricity', amount: 3500 },
  { id: 'net',  label: 'Internet',    amount: 2100 },
  { id: 'gas',  label: 'Gas',         amount: 1800 },
  { id: 'wat',  label: 'Water',       amount: 900  },
];

function fmt(n) {
  return n.toLocaleString('en-PK');
}

function AccountCard({ balance, setModal }) {
  return (
    <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-2xl">
      <p className="text-sm text-slate-400">Everyday account</p>
      <p className="mt-3 text-4xl font-black">PKR {fmt(balance)}</p>
      <p className="mt-2 text-sm text-emerald-300">Illustrative available balance</p>
      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        {quickActions.map(([label, icon, key]) => (
          <button
            key={label}
            onClick={() => setModal(key)}
            className="rounded-2xl bg-white/10 p-4 hover:bg-white/20 transition-colors"
          >
            <p className="text-2xl">{icon}</p>
            <p className="mt-2 text-xs text-slate-300">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ModalWrapper({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}

function SendModal({ balance, onClose, onConfirm }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  function handleSend() {
    const amt = Number(amount);
    if (!recipient.trim()) { setError('Please enter a recipient name.'); return; }
    if (!amt || amt < 1)    { setError('Amount must be at least PKR 1.'); return; }
    if (amt > balance)      { setError(`Amount exceeds balance PKR ${fmt(balance)}.`); return; }
    onConfirm(amt, recipient.trim());
  }

  return (
    <ModalWrapper onClose={() => onClose(0)}>
      <h2 className="text-2xl font-black text-slate-900 mb-6">Send Money</h2>
      <label className="block text-sm font-bold text-slate-700 mb-1">Recipient Name</label>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Enter recipient name"
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
      />
      <label className="block text-sm font-bold text-slate-700 mb-1">Amount (PKR)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={1}
        max={balance}
        placeholder="0"
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
      />
      <p className="text-xs text-slate-400 mb-4">Available: PKR {fmt(balance)}</p>
      {error && <p className="text-sm text-red-600 mb-4 font-bold">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={handleSend}
          className="flex-1 rounded-2xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 transition-colors"
        >
          Send
        </button>
        <button
          onClick={() => onClose(0)}
          className="flex-1 rounded-2xl bg-slate-100 py-3 font-bold text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
}

function BillsModal({ balance, onClose, onConfirm }) {
  const [selected, setSelected] = useState({});
  const [error, setError] = useState('');

  const total = BILL_LIST.reduce((sum, b) => sum + (selected[b.id] ? b.amount : 0), 0);

  function toggle(id) { setSelected(p => ({ ...p, [id]: !p[id] })); setError(''); }

  function handlePay() {
    if (total === 0)      { setError('Select at least one bill.'); return; }
    if (total > balance)  { setError(`Total PKR ${fmt(total)} exceeds balance.`); return; }
    onConfirm(total);
  }

  return (
    <ModalWrapper onClose={() => onClose(0)}>
      <h2 className="text-2xl font-black text-slate-900 mb-6">Pay Bills</h2>
      <div className="space-y-3 mb-6">
        {BILL_LIST.map((bill) => (
          <label key={bill.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 cursor-pointer hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!selected[bill.id]}
                onChange={() => toggle(bill.id)}
                className="w-4 h-4 accent-blue-700"
              />
              <span className="font-bold text-slate-800">{bill.label}</span>
            </div>
            <span className="text-sm font-bold text-slate-500">PKR {fmt(bill.amount)}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-slate-700">Total</span>
        <span className="font-black text-slate-900">PKR {fmt(total)}</span>
      </div>
      <p className="text-xs text-slate-400 mb-4">Available: PKR {fmt(balance)}</p>
      {error && <p className="text-sm text-red-600 mb-4 font-bold">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={handlePay}
          className="flex-1 rounded-2xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 transition-colors"
        >
          Pay Selected
        </button>
        <button
          onClick={() => onClose(0)}
          className="flex-1 rounded-2xl bg-slate-100 py-3 font-bold text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
}

function SaveModal({ balance, onClose, onConfirm }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  function handleSave() {
    const amt = Number(amount);
    if (!amt || amt < 1) { setError('Amount must be at least PKR 1.'); return; }
    if (amt > balance)   { setError(`Amount exceeds balance PKR ${fmt(balance)}.`); return; }
    onConfirm(amt);
  }

  return (
    <ModalWrapper onClose={() => onClose(0)}>
      <h2 className="text-2xl font-black text-slate-900 mb-6">Save</h2>
      <label className="block text-sm font-bold text-slate-700 mb-1">Amount to Save (PKR)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={1}
        max={balance}
        placeholder="0"
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
      />
      <p className="text-xs text-slate-400 mb-4">Available: PKR {fmt(balance)}</p>
      {error && <p className="text-sm text-red-600 mb-4 font-bold">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 rounded-2xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 transition-colors"
        >
          Transfer to Savings
        </button>
        <button
          onClick={() => onClose(0)}
          className="flex-1 rounded-2xl bg-slate-100 py-3 font-bold text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
}

export default function PersonalBanking() {
  const [modal, setModal]     = useState(null);
  const [toast, setToast]     = useState('');
  const { balance, deposit, withdraw } = useAccount();

  const [updates, setUpdates]               = useState([]);
  const [updatesLoading, setUpdatesLoading] = useState(true);
  const [updatesError, setUpdatesError]     = useState(null);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=3'
        );
        setUpdates(data);
      } catch (err) {
        setUpdatesError('Could not load latest updates.');
      } finally {
        setUpdatesLoading(false);
      }
    }
    fetchUpdates();
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  }

  function closeModal(delta) {
    if (delta < 0) withdraw(-delta);
    else if (delta > 0) deposit(delta);
    setModal(null);
  }

  function handleSend(amt, recipient) {
    withdraw(amt);
    showToast(`PKR ${amt.toLocaleString('en-PK')} sent to ${recipient}`);
    setModal(null);
  }

  function handleBills(total) {
    withdraw(total);
    showToast(`Bills paid: PKR ${total.toLocaleString('en-PK')}`);
    setModal(null);
  }

  function handleSave(amt) {
    withdraw(amt);
    showToast(`PKR ${amt.toLocaleString('en-PK')} moved to savings`);
    setModal(null);
  }

  return (
    <>
      <PageHero
        eyebrow="For your everyday"
        title="Personal banking built around"
        accent="your priorities."
        description="A practical home for everyday spending, incoming payments, bill planning and the goals that matter to you."
        action={{ to: '/register', label: 'Explore an account' }}
        secondary={{ to: '/dashboard', label: 'View demo dashboard' }}
      >
        <AccountCard balance={balance} setModal={setModal} />
      </PageHero>

      {modal === 'send'  && <SendModal  balance={balance} onClose={() => setModal(null)} onConfirm={handleSend} />}
      {modal === 'bills' && <BillsModal balance={balance} onClose={() => setModal(null)} onConfirm={handleBills} />}
      {modal === 'save'  && <SaveModal  balance={balance} onClose={() => setModal(null)} onConfirm={handleSave} />}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-2xl">
          {toast}
        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Everyday essentials"
          title="Your finances, all in one place"
          description="Explore account features designed to help you stay organised without making everyday banking complicated."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Wallet}        title="Current account"   description="A central account view for regular income, daily purchases and outgoing payments." />
          <FeatureCard icon={PiggyBank}     title="Savings account"   description="Separate your savings from everyday spending and track progress toward your goals." />
          <FeatureCard icon={ArrowLeftRight} title="Transfers"        description="Explore a simulated transfer workflow with clear review and confirmation steps." />
          <FeatureCard icon={ReceiptText}   title="Bill planning"     description="Keep recurring household payments and due dates organised in one place." />
          <FeatureCard icon={Smartphone}    title="Digital access"    description="A responsive banking experience for desktop, tablet and mobile screens." />
          <FeatureCard icon={ShieldCheck}   title="Account security"  description="Learn about sign-in protection, alerts and safe account habits." />
        </div>
      </section>

      <CTA
        title="Make everyday money management clearer"
        description="Explore the demo dashboard to see how accounts and activity can work together."
        to="/dashboard"
        label="Open dashboard"
      />

      {/* Latest Updates section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Latest updates" title="What's new in personal banking" description="Demo content from JSONPlaceholder API." />
        {updatesLoading && <p className="text-slate-500">Loading updates…</p>}
        {updatesError && <p className="text-red-500">{updatesError}</p>}
        {updates.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {updates.map((post) => (
              <div key={post.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Update #{post.id}</p>
                <h3 className="mt-2 font-extrabold capitalize text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
