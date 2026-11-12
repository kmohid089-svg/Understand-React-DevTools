
import { Link } from 'react-router-dom';
import { Landmark, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      h: 'Banking',
      a: [
        ['Personal banking', '/personal'],
        ['Business banking', '/business'],
        ['Cards', '/cards'],
        ['Savings', '/savings'],
      ],
    },
    {
      h: 'Explore',
      a: [
        ['Loans', '/loans'],
        ['Investments', '/investments'],
        ['Dashboard', '/dashboard'],
        ['Transactions', '/transactions'],
      ],
    },
    {
      h: 'Help',
      a: [
        ['Support centre', '/support'],
        ['Contact us', '/contact'],
        ['About MetaBank', '/about'],
        ['Account access', '/login'],
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-5">

        {/* Brand Section */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="mb-4 flex items-center gap-3 text-2xl font-black text-white"
          >
            <span className="rounded-xl bg-blue-600 p-2">
              <Landmark size={24} />
            </span>
            MetaBank
          </Link>

          <p className="max-w-sm leading-7 text-slate-400">
            A modern banking experience concept built around clarity,
            control and confidence.
          </p>

          <div className="mt-6 flex gap-3">
            <span className="rounded-lg bg-white/10 px-4 py-2 text-sm">
              Instagram
            </span>

            <span className="rounded-lg bg-white/10 px-4 py-2 text-sm">
              LinkedIn
            </span>
          </div>
        </div>

        {/* Footer Links */}
        {footerSections.map((section) => (
          <div key={section.h}>
            <h3 className="mb-4 font-bold text-white">
              {section.h}
            </h3>

            <ul className="space-y-3">
              {section.a.map(([name, url]) => (
                <li key={url}>
                  <Link
                    to={url}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">

          <span>
            © {new Date().getFullYear()} MetaBank. Demo website concept.
          </span>

          <span className="flex items-center gap-2">
            <ShieldCheck size={15} />
            Educational demo — no real banking services or money transfers.
          </span>

        </div>
      </div>
    </footer>
  );
}
