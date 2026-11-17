import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Car, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';

const fmt = n => new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

function Calculator() {
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
    </div>
  );
}

export default function Loans() {
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

  return (
    <>
      <PageHero
        eyebrow="Borrowing, made clearer"
        title="Plan your next step with"
        accent="confidence."
        description="Explore illustrative financing categories and estimate a monthly repayment using the demo calculator below."
        action={{ to: '/support', label: 'Ask a question' }}
      >
        <Calculator />
      </PageHero>

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
