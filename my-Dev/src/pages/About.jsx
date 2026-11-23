import { useState, useEffect } from 'react';
import axios from 'axios';
import { Landmark, ShieldCheck, HeartHandshake, Lightbulb, Target } from 'lucide-react';
import { PageHero, SectionTitle, FeatureCard, CTA, Stat } from '../components/Ui';

export default function About() {
  const [team, setTeam]           = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=4');
        setTeam(data);
      } catch {
        setTeamError('Could not load team data.');
      } finally {
        setTeamLoading(false);
      }
    }
    fetchTeam();
  }, []);

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
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white">
          <Landmark size={42} className="text-blue-300" />
          <p className="mt-8 text-3xl font-black">Simple by design.</p>
          <p className="mt-3 leading-7 text-slate-300">
            A clear interface for everyday banking concepts, financial planning and digital support.
          </p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle
          eyebrow="Our principles"
          title="What guides the experience"
          description="The website concept is organised around a few practical principles that help make complex services easier to understand."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Lightbulb}     title="Clarity"  description="Present useful information in a direct, understandable way." />
          <FeatureCard icon={ShieldCheck}   title="Security" description="Make account safety and responsible use visible throughout the journey." />
          <FeatureCard icon={HeartHandshake} title="Service" description="Keep help and support easy to discover." />
          <FeatureCard icon={Target}        title="Purpose"  description="Connect tools to everyday needs and longer-term goals." />
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3">
          <Stat value="16"         label="Separate website routes" />
          <Stat value="Responsive" label="Desktop, tablet and mobile" />
          <Stat value="Demo"       label="Fictional banking experience" />
        </div>
      </section>

      {/* Our Team — API data */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionTitle eyebrow="Our Team" title="The people behind MetaBank" description="Team data from JSONPlaceholder API." />
        {teamLoading && <p className="text-slate-500">Loading team…</p>}
        {teamError   && <p className="text-red-500">{teamError}</p>}
        {team.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(member => (
              <div key={member.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white">
                  {member.name.charAt(0)}
                </div>
                <p className="mt-3 font-extrabold text-slate-900">{member.name}</p>
                <p className="mt-1 text-sm text-slate-500">{member.email}</p>
                <p className="mt-1 text-xs font-semibold text-blue-700">{member.company?.name}</p>
              </div>
            ))}
          </div>
        )}
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
