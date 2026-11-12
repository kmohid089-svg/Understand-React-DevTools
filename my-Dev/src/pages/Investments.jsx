import { ChartNoAxesCombined, Globe, Layers3, Scale, ShieldCheck } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA, Stat } from '../components/Ui';

function PortfolioCard() {
  return (
    <div className="rounded-3xl bg-white p-7 text-slate-950">
      <p className="text-sm font-bold text-slate-500">Sample portfolio value</p>
      <p className="mt-2 text-4xl font-black">PKR 1,820,450</p>
      <p className="mt-2 text-sm font-bold text-emerald-600">+8.4% illustrative change</p>
      <div className="mt-8 flex h-4 overflow-hidden rounded-full">
        <div className="w-[45%] bg-blue-700" />
        <div className="w-[30%] bg-cyan-500" />
        <div className="w-[15%] bg-indigo-300" />
        <div className="w-[10%] bg-slate-300" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <span>● Equities 45%</span>
        <span className="text-cyan-700">● Fixed income 30%</span>
        <span className="text-indigo-500">● Funds 15%</span>
        <span className="text-slate-500">● Cash 10%</span>
      </div>
    </div>
  );
}

export default function Investments() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Invest with perspective"
        title="Understand your portfolio's"
        accent="bigger picture."
        description="Explore an educational portfolio overview and learn how different asset categories may play different roles in a long-term plan."
        action={{ to: '/support', label: 'Learn more' }}
      >
        <PortfolioCard />
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Portfolio basics"
          title="Different assets, different roles"
          description="This sample allocation is for interface demonstration only and is not an investment recommendation."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={ChartNoAxesCombined} title="Portfolio overview"   description="Review a sample portfolio value and illustrative allocation." />
          <FeatureCard icon={Globe}               title="Global markets"       description="Learn how regional and global exposure can affect a portfolio." />
          <FeatureCard icon={Layers3}             title="Diversification"      description="Understand why portfolios may combine different asset categories." />
          <FeatureCard icon={Scale}               title="Risk and return"      description="Explore the relationship between risk tolerance, time horizon and return expectations." />
          <FeatureCard icon={ShieldCheck}         title="Investor education"   description="Review key questions to consider before making financial decisions." />
          <FeatureCard icon={Layers3}             title="Long-term planning"   description="Connect investment choices to broader goals and time horizons." />
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3">
          <Stat value="45%" label="Sample equities allocation" />
          <Stat value="30%" label="Sample fixed-income allocation" />
          <Stat value="10%" label="Sample cash allocation" />
        </div>
      </section>

      <CTA
        title="Build your financial knowledge"
        description="Visit support to explore the educational information available in this demo."
        to="/support"
        label="Explore support"
      />
    </>
  );
}
