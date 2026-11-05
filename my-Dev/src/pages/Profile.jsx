import { useState } from 'react';
import { UserRound, ShieldCheck, Bell, Globe, Save } from 'lucide-react';
import { SectionTitle, FeatureCard } from '../components/Ui';

export default function Profile() {
  const [name, setName] = useState('Mohid Khan');
  const [email, setEmail] = useState('mohid@example.com');
  const [currency, setCurrency] = useState('PKR');
  const [alerts, setAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <SectionTitle
          eyebrow="Your account"
          title="Profile and preferences"
          description="Manage the details and preferences displayed in this local demo profile."
        />

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-3xl bg-slate-950 p-6 text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black">
              MK
            </div>
            <h2 className="mt-4 text-xl font-black">{name}</h2>
            <p className="mt-1 text-sm text-slate-400">Demo customer</p>
            <div className="mt-7 space-y-3 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <UserRound size={16} /> Personal details
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} /> Security preferences
              </p>
              <p className="flex items-center gap-2">
                <Bell size={16} /> Notifications
              </p>
            </div>
          </aside>

          {/* Main content */}
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-black text-slate-950">Personal information</h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-bold text-slate-700">
                  Full name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border p-3 font-normal outline-none focus:border-blue-600"
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Email address
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border p-3 font-normal outline-none focus:border-blue-600"
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Preferred currency
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="mt-2 w-full rounded-xl border p-3"
                  >
                    <option>PKR</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>AED</option>
                    <option>SAR</option>
                  </select>
                </label>

                <label className="flex items-center gap-3 self-end rounded-xl bg-slate-50 p-3 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={alerts}
                    onChange={(e) => setAlerts(e.target.checked)}
                    className="h-4 w-4 accent-blue-700"
                  />
                  Enable demo account alerts
                </label>
              </div>

              <button
                onClick={handleSave}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
              >
                <Save size={17} />
                {saved ? 'Preferences saved' : 'Save preferences'}
              </button>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={ShieldCheck}
                title="Security centre"
                description="A future-ready area for password, device and sign-in security controls."
              />
              <FeatureCard
                icon={Globe}
                title="Regional preferences"
                description="Choose a display currency and prepare the experience for multiple regions."
              />
            </div>

            <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              This profile is stored only in the current page state. It is not connected to a user database.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
