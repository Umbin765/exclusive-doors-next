import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="bg-white pt-20 pb-12">
      {/* Section header */}
      <div className="text-center mb-10 px-6" data-aos="fade-up">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-500 mb-3">
          Colecția noastră
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Descoperă produsele din showroom
        </h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Suntem specializați în proiecte premium: uși de interior și exterior la comandă,
          glisante și pivotante pentru case particulare și comerciale.
        </p>
      </div>

      {/* Cards */}
      <div className="px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" style={{ height: '70vh' }}>
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden rounded-xl block"
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
                <p className="text-[10px] font-bold tracking-widest text-amber-400 mb-2 uppercase">
                  {cat.tags}
                </p>
                <h3 className="text-lg font-bold text-white mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{cat.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
