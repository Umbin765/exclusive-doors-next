import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="bg-cream pt-20 pb-16">
      {/* Section header */}
      <div className="text-center mb-12 px-4 sm:px-6" data-aos="fade-up">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-3">
          Colecția noastră
        </p>
        <h2 className="font-display text-2xl sm:text-4xl font-semibold text-warm-text mb-4">
          Descoperă produsele din showroom
        </h2>
        <p className="text-warm-muted text-base max-w-xl mx-auto leading-relaxed">
          Uși de interior și exterior la comandă, glisante și pivotante —
          pentru case particulare și comerciale.
        </p>
      </div>

      {/* Cards — editorial grid, image contained with text below */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group block"
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              {/* Image container — no dark overlay, just the photo */}
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle warm tint on hover */}
                <div className="absolute inset-0 bg-warm-dark/0 group-hover:bg-warm-dark/15 transition-colors duration-500" />
                {/* Arrow — top right */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-warm-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Text below image — cream background, warm palette */}
              <div>
                <p className="text-[0.625rem] font-bold tracking-[0.25em] uppercase text-accent mb-1.5 line-clamp-1">
                  {cat.tags}
                </p>
                <h3 className="font-display font-semibold text-lg text-warm-text mb-1 leading-tight group-hover:text-accent transition-colors duration-200">
                  {cat.title}
                </h3>
                <p className="text-sm text-warm-muted leading-snug">{cat.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
