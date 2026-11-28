import { AdminLayout } from '../components/AdminLayout';
import { SectionTitle } from '../components/Ui';

export default function Activity() {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-5 py-12">
        <SectionTitle
          eyebrow="Activity"
          title="Recent Activity"
          description="Track admin actions and system events."
        />

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-xl font-black text-slate-950">Activity Log</h2>
            <p className="mt-1 text-sm text-slate-500">
              Recent admin and system activities
            </p>
          </div>
          <div className="p-12 text-center">
            <p className="text-slate-500">Activity log loading...</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
