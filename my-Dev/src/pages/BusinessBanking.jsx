import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Users, Receipt, ChartNoAxesCombined, CreditCard, ShieldCheck } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA, Stat } from '../components/Ui';
import { useAccount } from '../context/AccountContext';

function HeroPanel() {
  const { balance } = useAccount();
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 rounded-3xl bg-white p-7 text-slate-950">
        <p className="text-sm font-bold text-slate-500">Business cash position</p>
        <p className="mt-2 text-4xl font-black">PKR {balance.toLocaleString('en-PK')}</p>
        <div className="mt-7 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-3/4 rounded-full bg-blue-600" />
        </div>
        <p className="mt-3 text-xs text-slate-500">Illustrative business account data</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white">
        <Users />
        <p className="mt-5 text-2xl font-black">12</p>
        <p className="text-sm text-slate-300">Team members</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white">
        <Receipt />
        <p className="mt-5 text-2xl font-black">38</p>
        <p className="text-sm text-slate-300">Monthly invoices</p>
      </div>
    </div>
  );
}

export default function BusinessBanking() {
  const [news, setNews]           = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  async function fetchNews() {
    setNewsLoading(true);
    setNewsError(null);
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
      setNews(data);
    } catch {
      setNewsError('Could not load business news.');
    } finally {
      setNewsLoading(false);
    }
  }

  useEffect(() => { fetchNews(); }, []);

  return (
    <>
      <PageHero
        dark
        eyebrow="For ambitious businesses"
        title="Business banking for"
        accent="what's next."
        description="A business-focused banking concept for teams that need clearer cash-flow visibility, payment organisation and room to grow."
        action={{ to: '/contact', label: 'Talk to our team' }}
        secondary={{ to: '/register', label: 'Create demo profile' }}
      >
        <HeroPanel />
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Business toolkit"
          title="Tools for the way you operate"
          description="Bring key business banking workflows into a single, easy-to-understand experience."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Building2}
            title="Business accounts"
            description="Separate operating funds, reserves and project budgets with organised account views."
          />
          <FeatureCard
            icon={ChartNoAxesCombined}
            title="Cash-flow overview"
            description="Review incoming and outgoing activity to support better planning."
          />
          <FeatureCard
            icon={Receipt}
            title="Payments and invoices"
            description="Keep payment activity and invoice workflows visible to the right team members."
          />
          <FeatureCard
            icon={Users}
            title="Team access"
            description="A role-based access concept for owners, finance staff and operational teams."
          />
          <FeatureCard
            icon={CreditCard}
            title="Business cards"
            description="Explore employee card controls and spending oversight concepts."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Controls and oversight"
            description="Understand approvals, account alerts and activity review."
          />
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3">
          <Stat value="Multi-user" label="Team access concept" />
          <Stat value="Live view" label="Illustrative cash-flow overview" />
          <Stat value="Role-based" label="Permissions concept" />
        </div>
      </section>

      <CTA
        title="Give your business a clearer financial picture"
        description="Contact the MetaBank demo team to explore a business banking workflow."
        to="/contact"
        label="Contact business team"
      />

      {/* Business News section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Business news" title="Latest business insights" description="Demo articles from JSONPlaceholder API." />
        {newsLoading && <p className="text-slate-500">Loading news…</p>}
        {newsError && (
          <div className="flex items-center gap-4">
            <p className="text-red-500">{newsError}</p>
            <button onClick={fetchNews} className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">
              Retry
            </button>
          </div>
        )}
        {news.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((post) => (
              <div key={post.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Article #{post.id}</p>
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
