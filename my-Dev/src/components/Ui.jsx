import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function PageHero({ eyebrow, title, accent, description, action, secondary, children, dark = false }) {
  return (
    <section className={dark ? 'bg-slate-950 text-white' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-950'}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">

        <div>
          <span className={`inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.18em] ${dark ? 'border border-blue-400/30 bg-blue-400/10 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
            {eyebrow}
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {title} <span className="text-blue-600">{accent}</span>
          </h1>

          <p className={`mt-6 max-w-xl text-lg leading-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {action && (
              <Link to={action.to} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-4 font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800">
                {action.label} <ArrowRight size={18} />
              </Link>
            )}
            {secondary && (
              <Link to={secondary.to} className={`rounded-xl border px-6 py-4 font-bold ${dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-white'}`}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-9 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="text-xs font-black uppercase tracking-[.2em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, description, tag }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      {Icon && (
        <span className="mb-5 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700">
          <Icon size={23} />
        </span>
      )}
      {tag && <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-700">{tag}</p>}
      <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </article>
  );
}

export function CTA({ title, description, to = '/register', label = 'Get started' }) {
  return (
    <section className="mx-auto my-16 max-w-7xl px-5">
      <div className="flex flex-col justify-between gap-7 rounded-[2rem] bg-blue-700 p-8 text-white md:flex-row md:items-center md:p-12">
        <div>
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">{description}</p>
        </div>
        <Link to={to} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-blue-800">
          {label} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}
