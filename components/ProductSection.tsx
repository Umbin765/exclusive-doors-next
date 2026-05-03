import { ProductSectionData, megaMenus } from '@/lib/data';

export default function ProductSection({ section, alt }: { section: ProductSectionData; alt?: boolean }) {
  const { id, eyebrow, heading, body, ctaLabel } = section;
  const subCards = megaMenus[id]?.cards ?? [];

  return (
    <section className={`py-20 border-t border-gray-100 ${alt ? 'bg-stone-50' : 'bg-white'}`} id={id}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Text block */}
        <div className="max-w-2xl mb-12" data-aos="fade-up">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-500 mb-4">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            {heading}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            {body}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-gray-900 text-sm font-medium px-6 py-3 hover:bg-gray-900 hover:text-white transition-colors"
          >
            {ctaLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* 3-image grid */}
        {subCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
            {subCards.map((card) => (
              <a
                key={card.title}
                href="#contact"
                className="group block border-2 border-transparent rounded-xl overflow-hidden shadow-md hover:border-amber-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-500">
                    Detalii
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
