import { statsBarItems } from '@/lib/data';

export default function Hero() {
  return (
    <section className="ed-hero">
      <div className="ed-hero__inner">
        {/* Left: display headline */}
        <div className="ed-hero__left">
          <span className="ed-label">Showroom Otopeni · București</span>
          <h1 className="ed-hero__hl">
            <span className="ed-hero__hl-cross">Mii de opțiuni.</span>
            <span className="ed-hero__hl-cross">Nicio decizie.</span>
            <span className="ed-hero__hl-main">Ușa potrivită.<br />Din prima.</span>
          </h1>
        </div>

        {/* Right: body + CTAs */}
        <div className="ed-hero__right">
          <span className="ed-eyebrow">Sistemul Exclusiv de Alegere</span>
          <p className="ed-hero__body">
            În 15 minute în showroom filtrăm 80% din opțiuni,
            potrivim designul cu arhitectura ta și validăm tehnic
            fiecare detaliu — fără să pierzi timp cu cataloage inutile.
          </p>
          <div className="ed-hero__ctas">
            <a href="#contact" className="ed-btn ed-btn--primary">
              Programează consultația gratuită
            </a>
            <a href="#catalog" className="ed-btn ed-btn--ghost">
              Explorează colecția
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="ed-stats-bar">
        {statsBarItems.map((stat) => (
          <div key={stat.label} className="ed-stats-bar__item">
            <span className="ed-stats-bar__num">{stat.num}</span>
            <span className="ed-stats-bar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
