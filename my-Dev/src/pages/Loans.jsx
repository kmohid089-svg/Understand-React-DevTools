import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Car, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';
import { useAccount } from '../context/AccountContext';

const fmt = n => new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

function Calculator({ onTakeLoan }) {
  const [amount, setAmount] = useState(1000000);
  const [rate,   setRate]   = useState(18);
  const [years,  setYears]  = useState(3);

  const monthly = useMemo(() => {
    const r = rate / 1200, n = years * 12;
    return r === 0 ? amount / n : amount * r / (1 - Math.pow(1 + r, -n));
  }, [amount, rate, years]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
      <p className="text-sm font-bold text-slate-500">Estimated monthly repayment</p>
      <p className="mt-2 text-4xl font-black text-slate-950">PKR {fmt(monthly)}</p>
      <p className="mt-2 text-xs text-slate-500">Illustrative estimate, not a loan offer</p>
      <div className="mt-7 space-y-5">
        <label className="block text-sm font-bold text-slate-700">
          Loan amount: PKR {fmt(amount)}
          <input type="range" min="100000" max="10000000" step="50000" value={amount} onChange={e => setAmount(+e.target.value)} className="mt-3 w-full accent-blue-700" />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Annual rate: {rate}%
          <input type="range" min="5" max="30" value={rate} onChange={e => setRate(+e.target.value)} className="mt-3 w-full accent-blue-700" />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Term: {years} years
          <input type="range" min="1" max="10" value={years} onChange={e => setYears(+e.target.value)} className="mt-3 w-full accent-blue-700" />
        </label>
      </div>
      <button
        onClick={() => onTakeLoan(amount, Math.round(monthly))}
        className="mt-6 w-full rounded-2xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 transition-colors"
      >
        Take This Loan
      </button>
    </div>
  );
}

export default function Loans() {
  const { loan, loanMonthly, takeLoan, repayLoan } = useAccount();
  const [toast, setToast] = useState('');

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/users?_limit=4'
        );
        setCountries(data);
      } catch (err) {
        setCountriesError('Could not load data.');
      } finally {
        setCountriesLoading(false);
      }
    }
    fetchCountries();
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  }

  function handleTakeLoan(amount, monthly) {
    takeLoan(amount, monthly);
    showToast(`PKR ${fmt(amount)} added to your account`);
  }

  function handleMonthlyPayment() {
    repayLoan(loanMonthly);
    showToast('Payment made');
  }

  function handleRepayFull() {
    repayLoan(loan);
    showToast('Loan fully repaid!');
  }

  return (
    <>
      <PageHero
        eyebrow="Borrowing, made clearer"
        title="Plan your next step with"
        accent="confidence."
        description="Explore illustrative financing categories and estimate a monthly repayment using the demo calculator below."
        action={{ to: '/support', label: 'Ask a question' }}
      >
        <Calculator onTakeLoan={handleTakeLoan} />
      </PageHero>

      {/* Your Loan section */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Your Loan</h2>

          {loan === 0 ? (
            <p className="mt-4 text-slate-500">No active loan. Use the calculator above to take a loan.</p>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="flex flex-wrap gap-6">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Outstanding balance</p>
                  <p className="mt-1 text-2xl font-black text-slate-950">PKR {fmt(loan)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Monthly payment</p>
                  <p className="mt-1 text-2xl font-black text-slate-950">PKR {fmt(loanMonthly)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleMonthlyPayment}
                  className="rounded-2xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800 transition-colors"
                >
                  Make Monthly Payment
                </button>
                <button
                  onClick={handleRepayFull}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  Repay Full Loan
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-2xl">
          {toast}
        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Financing options"
          title="Support for different milestones"
          description="These are illustrative product categories for the website experience; eligibility and terms are not real offers."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Home}             title="Home financing"      description="Explore a sample home purchase planning journey." />
          <FeatureCard icon={Car}              title="Vehicle financing"   description="Plan a vehicle purchase with an example repayment view." />
          <FeatureCard icon={GraduationCap}    title="Education support"   description="Explore ways financing can support education costs." />
          <FeatureCard icon={BriefcaseBusiness} title="Personal financing" description="Review a general-purpose borrowing concept." />
        </div>
      </section>

      <CTA
        title="Need help understanding the options?"
        description="Visit the support centre for answers about the demo loan calculator and product concepts."
        to="/support"
        label="Visit support"
      />

      {/* Asian Countries & Currencies section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Our Partners" title="Loan advisors" description="Data from JSONPlaceholder API." />
        {countriesLoading && <p className="text-slate-500">Loading country data…</p>}
        {countriesError && <p className="text-red-500">{countriesError}</p>}
        {countries.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((c) => (
              <div key={c.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="font-black text-slate-900">{c.name}</p>
                <p className="mt-2 text-sm text-slate-500">{c.email}</p>
                <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {c.company.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
