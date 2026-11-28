import { useState, useEffect } from 'react';
import axios from 'axios';
import { HelpCircle, MessageCircle, ShieldQuestion, CreditCard, UserRound } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';

const faqs = [
  [
    'Is Apex Bank a real bank?',
    'No. This website is a demonstration banking interface. It is not a licensed bank and does not provide real financial services.',
  ],
  [
    'Can I transfer real money?',
    'No. Any buttons or workflows shown in this demo are local examples and do not move funds.',
  ],
  [
    'Are my login details stored?',
    'The current demonstration pages do not connect to a live authentication service or database. Do not enter real passwords.',
  ],
  [
    'How can I explore the dashboard?',
    'Use the Dashboard link in the website navigation or visit the demo dashboard page.',
  ],
];

function HeroCard() {
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl bg-blue-700 p-6 text-white">
        <MessageCircle size={28} />
        <h3 className="mt-5 text-2xl font-black">How can we help?</h3>
        <p className="mt-2 leading-7 text-blue-100">
          Browse quick answers or send a message through the demo contact form.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">Support availability</p>
        <p className="mt-2 text-2xl font-black text-slate-950">Always accessible</p>
        <p className="mt-1 text-xs text-slate-500">Website help content is available any time.</p>
      </div>
    </div>
  );
}

export default function Support() {
  const [active, setActive] = useState(0);

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=3'
        );
        setArticles(data);
      } catch (err) {
        setArticlesError('Could not load help articles.');
      } finally {
        setArticlesLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="We're here to help"
        title="Answers when you"
        accent="need them."
        description="Find guidance about the Apex Bank demo experience, account screens and the features shown across the website."
        action={{ to: '/contact', label: 'Contact support' }}
        secondary={{ to: '/about', label: 'About Apex Bank' }}
      >
        <HeroCard />
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="Help topics" title="Find the right place to start" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={UserRound}
            title="Account access"
            description="Explore the demo login, registration and profile pages."
          />
          <FeatureCard
            icon={CreditCard}
            title="Cards and payments"
            description="Learn how the sample card and payment controls behave."
          />
          <FeatureCard
            icon={ShieldQuestion}
            title="Security"
            description="Understand the security concepts represented in this website."
          />
          <FeatureCard
            icon={HelpCircle}
            title="General questions"
            description="Find answers about the demonstration and its limitations."
          />
        </div>

        <div className="mt-14 max-w-3xl">
          <SectionTitle eyebrow="Frequently asked questions" title="Quick answers" />

          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b border-slate-200">
              <button
                onClick={() => setActive(active === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-extrabold text-slate-950"
              >
                {q}
                <span className="text-2xl text-blue-700">{active === i ? '−' : '+'}</span>
              </button>
              {active === i && <p className="pb-5 leading-7 text-slate-600">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <CTA
        title="Still need a hand?"
        description="Send a message through the contact page and tell us what you are trying to explore."
        to="/contact"
        label="Contact us"
      />

      {/* Help Articles section */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Help articles" title="Browse our help content" description="Demo articles from JSONPlaceholder API." />
        {articlesLoading && <p className="text-slate-500">Loading articles…</p>}
        {articlesError && <p className="text-red-500">{articlesError}</p>}
        {articles.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {articles.map((post) => (
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
