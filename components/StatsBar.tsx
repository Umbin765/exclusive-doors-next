import { statsBarItems } from '@/lib/data';

export default function StatsBar() {
  return (
    <section className="bg-accent text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {statsBarItems.map((stat) => (
          <div key={stat.label} data-aos="fade-up">
            <div className="text-3xl font-bold">{stat.num}</div>
            <div className="text-sm text-amber-800 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
