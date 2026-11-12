import { Landmark, ShieldCheck, HeartHandshake, Lightbulb, Target } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA, Stat } from '../components/Ui';

// ─── Data ────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  { icon: Lightbulb,      title: 'Clarity',  description: 'Present useful information in a direct, understandable way.' },
  { icon: ShieldCheck,    title: 'Security', description: 'Make account safety and responsible use visible throughout the journey.' },
  { icon: HeartHandshake, title: 'Service',  description: 'Keep help and support easy to discover.' },
  { icon: Target,         title: 'Purpose',  description: 'Connect tools to everyday needs and longer-term goals.' },
];

const STATS = [
  { value: '16',         label: 'Separate website routes' },
  { value: 'Responsive', label: 'Desktop, tablet and mobile' },
  { value: 'Demo',       label: 'Fictional banking experience' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white">
      <Landmark size={42} className="text-blue-300" />
      <p className="mt-8 text-3xl font-black">Simple by design.</p>
      <p className="mt-3 leading-7 text-slate-300">
        A clear interface for everyday banking concepts, financial planning and digital support.
      </p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <>
      <PageHero
        dark
        eyebrow="About MetaBank"
        title="A banking experience shaped by"
        accent="clarity and trust."
        description="MetaBank is a fictional digital banking concept created to demonstrate a modern, accessible and feature-rich financial services website."
        action={{ to: '/personal', label: 'Explore services' }}
        secondary={{ to: '/contact', label: 'Contact' }}
      >
        <HeroCard />
      </PageHero>

      {/* Principles section */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Our principles"
          title="What guides the experience"
          description="The website concept is organised around a few practical principles that help make complex services easier to understand."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.description} />
          ))}
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <CTA
        title="Explore what MetaBank offers"
        description="Browse personal and business services, cards, savings and the dashboard demo."
        to="/personal"
        label="Explore banking"
      />
    </>
  );
}
