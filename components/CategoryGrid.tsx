import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="bg-neutral-900 flex flex-col min-h-[70vh]">
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2 p-2">
        {categories.map((cat) => (
          <a
            key={cat.title}
            href={cat.href}
            className="group relative overflow-hidden rounded-xl flex-1 min-h-[300px] lg:min-h-0 block"
            data-aos="fade-up"
          >
            {/* Background image */}
            <img
              src={cat.img}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Arrow icon — top right */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-lg font-bold text-white mb-1">{cat.title}</h3>
              <p className="text-xs text-gray-300 leading-snug">{cat.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
