import { Wallet, PiggyBank, ArrowLeftRight, Smartphone, ReceiptText, ShieldCheck } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA } from '../components/Ui';

const quickActions = [
  ['Send', '↗'],
  ['Bills', '▤'],
  ['Save', '＋'],
];

function AccountCard() {
  return (
    <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-2xl">
      <p className="text-sm text-slate-400">Everyday account</p>
      <p className="mt-3 text-4xl font-black">PKR 485,250</p>
      <p className="mt-2 text-sm text-emerald-300">Illustrative available balance</p>
      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        {quickActions.map(([label, icon]) => (
          <div key={label} className="rounded-2xl bg-white/10 p-4">
            <p className="text-2xl">{icon}</p>
            <p className="mt-2 text-xs text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PersonalBanking() {
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
        <AccountCard />
      </PageHero>

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
    </>
  );
}
