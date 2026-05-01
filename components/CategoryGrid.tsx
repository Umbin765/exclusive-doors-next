import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="py-16 px-6 bg-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <a key={cat.title} href="#" className="relative group overflow-hidden block aspect-[3/4]" data-aos="fade-up">
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="text-base font-semibold">{cat.title}</div>
              <div className="text-xs text-gray-300 mt-1">{cat.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
