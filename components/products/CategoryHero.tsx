import { categoryMeta } from '@/lib/data';

export default function CategoryHero({ category }: { category: string }) {
  const meta = categoryMeta[category] ?? { label: category, heading: category, sub: '' };
  return (
    <section className="bg-stone-50 border-b border-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[0.625rem] font-bold tracking-[0.3em] uppercase text-accent mb-4">
          {meta.label}
        </p>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-2xl">
          {meta.heading}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-xl">{meta.sub}</p>
      </div>
    </section>
  );
}
