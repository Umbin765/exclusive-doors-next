import { heroStats, heroHighlights } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Showroom Exclusive Doors București"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-start">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 w-full" data-aos="fade-up">
          {/* Location bubble */}
          <a
            href="https://maps.google.com/?q=Bd.+Dacia+153-155+Bucuresti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-2 rounded-full mt-8 mb-8 hover:bg-yellow-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.555 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Showroom București — Bd. Dacia, nr. 153-155
          </a>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Showroom &amp; magazin de uși{' '}
            <span className="text-yellow-400">la comandă</span>{' '}
            premium în București
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
            Cel mai bun showroom de uși de interior și exterior din București. Suntem orientați
            către proiecte unde integrarea în arhitectură, performanța și montajul corect contează.
            Specializați în proiecte premium de uși la comandă, pentru case particulare și comerciale.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 text-sm font-bold px-8 py-3.5 hover:bg-yellow-300 transition-colors"
            >
              Programare showroom
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/60 text-white text-sm font-medium px-8 py-3.5 hover:bg-white hover:text-gray-900 transition-colors"
            >
              Cere ofertă online
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {heroStats.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? 'border-l border-gray-600 pl-8' : ''}>
                <div className="text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service highlights strip */}
      <div className="relative bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-700">
            {heroHighlights.map((item) => (
              <div key={item.text} className="py-4 px-5 flex items-center gap-3">
                <span className="text-yellow-400 shrink-0">{item.icon}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
