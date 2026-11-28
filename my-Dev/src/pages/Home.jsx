import { useState, useEffect } from 'react';
import axios from 'axios';
import { Landmark, ShieldCheck, Smartphone, Globe2, ArrowUpRight, Wallet, CreditCard, ChartNoAxesCombined, BadgeCheck, Clock, Lock, User, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero, SectionTitle, FeatureCard, CTA, Stat } from '../components/Ui';
import { useAccount } from '../context/AccountContext';
import { useAuth } from '../context/AuthContext';

function HeroCard({ balance }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-300/5 p-5 shadow-2xl">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-500">Apex Bank Platinum</span>
          <Landmark className="text-blue-700" />
        </div>
        <p className="mt-8 text-sm text-slate-500">Available balance</p>
        <p className="mt-1 text-4xl font-black">PKR {balance.toLocaleString('en-PK')}</p>
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
  const { balance } = useAccount();
  const { user } = useAuth();
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
      {/* 1. Hero */}
      <PageHero
        dark
        eyebrow="Pakistan's Digital Bank"
        title="Banking made"
        accent="simple & secure."
        description="Open your Apex Bank account in minutes. Zero hidden fees, real-time transfers, and bank-grade security — all from your phone or browser."
        action={user ? { to: '/dashboard', label: 'Go to Dashboard' } : { to: '/register', label: 'Open Account' }}
        secondary={user ? { to: '/personal', label: 'Personal Banking' } : { to: '/login', label: 'Sign In' }}
      >
        <HeroCard balance={balance} />
      </PageHero>

      {/* 2. Why MetaBank */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Why Apex Bank"
          title="Everything you need, nothing you don't"
          description="Built from the ground up for Pakistanis who want a modern banking experience."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard icon={BadgeCheck} title="Zero hidden fees" description="No monthly charges, no surprise deductions. What you see is what you keep." />
          <FeatureCard icon={Clock} title="24/7 Digital banking" description="Transfer money, pay bills and check your balance any time, any day — even on holidays." />
          <FeatureCard icon={Lock} title="Bank-grade security" description="256-bit encryption, two-factor authentication and real-time fraud alerts protect every transaction." />
        </div>
      </section>

      {/* 3. Products */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            eyebrow="Our Products"
            title="The right account for every goal"
            description="Whether you're saving for tomorrow or running a business today, we have you covered."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: User,       title: 'Personal Account',  desc: 'Everyday banking with zero fees, free transfers and instant notifications.' },
              { icon: Briefcase,  title: 'Business Account',  desc: 'Dedicated IBAN, bulk payments and cash-flow dashboard for your business.' },
              { icon: CreditCard, title: 'Apex Card',          desc: 'Virtual and physical debit card with real-time spend controls.' },
              { icon: TrendingUp, title: 'Investments',       desc: 'Grow your savings with mutual funds and government bonds from PKR 1,000.' },
            ].map(p => (
              <article key={p.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="mb-5 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700"><p.icon size={23} /></span>
                <h3 className="text-xl font-extrabold text-slate-950">{p.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{p.desc}</p>
                <Link to="/register" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:underline">Learn more <ArrowUpRight size={14} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Live Exchange Rates */}
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

      {/* 5. How it works */}
      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="How it works" title="Up and running in 3 steps" />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Create account',    desc: 'Fill in your name, email and phone number. Takes less than 2 minutes.' },
              { step: '02', title: 'Verify identity',   desc: 'Upload your CNIC photo. Our system verifies it automatically.' },
              { step: '03', title: 'Start banking',     desc: 'Your account is live. Transfer, pay and save right away.' },
            ].map(item => (
              <div key={item.step} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <p className="text-5xl font-black text-blue-500">{item.step}</p>
                <h3 className="mt-5 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="Customer stories" title="Trusted by thousands across Pakistan" center />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { quote: 'Apex Bank made my salary transfers instant. I no longer wait two days for funds to clear.', name: 'Zara Ahmed', city: 'Karachi' },
            { quote: 'Setting up my business account took five minutes. The dashboard is incredibly clear.', name: 'Hamza Raza', city: 'Lahore' },
            { quote: 'The Apex Card works everywhere. Zero fees abroad saved me a lot on my last trip.', name: 'Ayesha Malik', city: 'Islamabad' },
          ].map(t => (
            <div key={t.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="leading-7 text-slate-600">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{t.name[0]}</span>
                <div>
                  <p className="font-extrabold text-slate-950">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <CTA
        title="Join thousands of customers banking smarter"
        description="Open your Apex Bank account today. No paperwork, no branch visits, no hidden fees."
        to="/register"
        label="Open Account"
      />
    </>
  );
}
