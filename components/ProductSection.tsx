import { ProductSectionData, megaMenus } from '@/lib/data';

export default function ProductSection({ section }: { section: ProductSectionData }) {
  const { id, eyebrow, heading, body, ctaLabel } = section;
  const subCards = megaMenus[id]?.cards ?? [];

  return (
    <section className="py-20 bg-white border-t border-gray-100" id={id}>
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
              <a key={card.title} href="#contact" className="group block">
                <div className="overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-500 transition-colors">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
