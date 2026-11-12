import { useMemo, useState } from 'react';
import { Search, ArrowDownLeft, ArrowUpRight, Download, SlidersHorizontal } from 'lucide-react';

const data = [
  ['Salary credit',       'Income',   '125000',  '2026-11-02', 'Credit'],
  ['Grocery store',       'Shopping', '-8450',   '2026-11-01', 'Debit'],
  ['Electricity bill',    'Utilities','-12600',  '2026-10-28', 'Debit'],
  ['Online subscription', 'Services', '-2100',   '2026-10-26', 'Debit'],
  ['Freelance payment',   'Income',   '45000',   '2026-10-24', 'Credit'],
  ['Fuel station',        'Transport','-6500',   '2026-10-22', 'Debit'],
  ['Restaurant',          'Food',     '-3200',   '2026-10-20', 'Debit'],
];

export default function Transactions() {
  const [q, setQ]       = useState('');
  const [kind, setKind] = useState('All');

  const filtered = useMemo(() =>
    data.filter(r =>
      (r[0].toLowerCase().includes(q.toLowerCase()) ||
       r[1].toLowerCase().includes(q.toLowerCase())) &&
      (kind === 'All' || r[4] === kind)
    ), [q, kind]);

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-12">

        <p className="text-sm font-bold uppercase tracking-widest text-blue-700">Account activity</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Transactions</h1>
        <p className="mt-3 text-slate-500">Search and filter your illustrative account activity.</p>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">

          {/* Filters */}
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search merchant or category"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-600"
              />
            </label>
            <select
              value={kind}
              onChange={e => setKind(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 font-semibold"
            >
              <option>All</option>
              <option>Credit</option>
              <option>Debit</option>
            </select>
            <button
              onClick={() => { setQ(''); setKind('All'); }}
              className="rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-700"
            >
              <SlidersHorizontal className="mr-2 inline" size={17} />
              Reset
            </button>
          </div>

          {/* Header row */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{filtered.length} transactions found</p>
            <button
              onClick={() => alert('Statement export is a demo action.')}
              className="font-bold text-blue-700"
            >
              <Download className="mr-2 inline" size={17} />
              Export
            </button>
          </div>

          {/* List */}
          <div className="mt-4 divide-y">
            {filtered.map((r, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-3 py-5">
                <div className="flex items-center gap-3">
                  <span className={`rounded-xl p-3 ${r[4] === 'Credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                    {r[4] === 'Credit' ? <ArrowDownLeft /> : <ArrowUpRight />}
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">{r[0]}</p>
                    <p className="mt-1 text-sm text-slate-500">{r[1]} · {r[3]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black ${r[4] === 'Credit' ? 'text-emerald-600' : 'text-slate-950'}`}>
                    {r[4] === 'Credit' ? '+' : '−'} PKR {Math.abs(Number(r[2])).toLocaleString('en-PK')}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{r[4]}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="py-12 text-center text-slate-500">No matching transactions found.</p>
            )}
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          All records are fictional sample data, not real bank transactions.
        </p>
      </div>
    </main>
  );
}
