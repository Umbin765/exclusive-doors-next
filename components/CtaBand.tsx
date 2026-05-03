export default function CtaBand() {
  return (
    <section className="grid lg:grid-cols-2 min-h-[520px]">

      {/* Left — dark content panel */}
      <div className="bg-neutral-900 flex items-center px-10 py-16 lg:px-16">
        <div data-aos="fade-up" className="max-w-lg">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-500 mb-5">
            Consultanță gratuită
          </p>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            Ai un proiect? Discută cu un specialist Exclusive Doors
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Analizăm planurile, clarificăm detaliile tehnice și îți recomandăm
            soluții potrivite pentru spațiu, buget și nivelul de finisaj dorit.
            Programează o vizită în showroom sau solicită o ofertă online.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-amber-500 text-gray-900 text-sm font-bold px-7 py-3.5 hover:bg-amber-400 transition-colors"
            >
              Programare showroom
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-gray-600 text-white text-sm font-medium px-7 py-3.5 hover:border-white transition-colors"
            >
              Cere ofertă online
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Right — full-height photo */}
      <div className="relative min-h-[300px] lg:min-h-0">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
          alt="Consultanță Exclusive Doors"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

    </section>
  );
}
