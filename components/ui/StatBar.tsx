import type { Stat } from '@/lib/types';

export default function StatBar({ stats }: { stats?: Stat[] }) {
  if (!stats?.length) return null;
  return (
    <section className="bg-(--accent) py-10">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-(--primary)">{s.value}</p>
              <p className="text-sm font-medium text-(--primary)/80 mt-1 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
