import { Users, Wallet, Activity, ShieldCheck, FileBarChart, Settings } from 'lucide-react';
import { SectionTitle, FeatureCard, Stat } from '../components/Ui';

const recentActivity = [
  ['System health check',    'Completed', 'Today, 09:30'],
  ['Sample report generated','Completed', 'Yesterday, 16:10'],
  ['Role review',            'Pending',   'Yesterday, 14:25'],
];

export default function Admin() {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-12">

        <SectionTitle
          eyebrow="Administration"
          title="Operations overview"
          description="A sample administrative workspace showing how an internal banking operations dashboard could be organised. No real user records are connected."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="1,284"  label="Sample customer profiles" />
          <Stat value="PKR 8.4M" label="Illustrative deposits" />
          <Stat value="42"     label="Items awaiting review" />
          <Stat value="99.2%"  label="Sample service availability" />
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Users}        title="Customer management"  description="A planned area for reviewing customer profiles, account status and support history." />
          <FeatureCard icon={Wallet}       title="Account oversight"    description="Monitor account categories, sample balances and operational status." />
          <FeatureCard icon={Activity}     title="Activity monitoring"  description="Review high-level activity indicators and operational events." />
          <FeatureCard icon={ShieldCheck}  title="Roles and permissions" description="Plan access for administrators, finance staff, support and auditors." />
          <FeatureCard icon={FileBarChart} title="Reports"              description="Organise financial summaries, operational reports and downloadable statements." />
          <FeatureCard icon={Settings}     title="System settings"      description="Configure application preferences and future integration settings." />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black">Recent admin activity</h2>
          <div className="mt-5 divide-y text-sm">
            {recentActivity.map(([action, status, time]) => (
              <div key={action} className="flex flex-wrap justify-between gap-2 py-4">
                <span className="font-bold text-slate-800">{action}</span>
                <span className="text-slate-500">{status} · {time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
