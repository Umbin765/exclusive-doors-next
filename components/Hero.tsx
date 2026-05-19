export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <h1 className="hero-h1">
            <span className="strike">Sute</span><br />
            de uși.<br />
            <em>Trei</em> corecte<br />
            pentru tine.
          </h1>
        </div>

        <div className="hero-right-col">
          <div className="hero-eyebrow">Consultanță gratuită · 15 min</div>
          <p className="hero-sub">
            Renovezi în nordul Bucureștiului și ușile sunt una din ultimele decizii.{' '}
            <strong>Filtrăm pentru tine 80% din opțiuni</strong> și rămânem cu 2–3 potrivite
            pentru proiectul tău. Pleci din showroom cu claritate completă.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-cta">Programează consultația gratuită</a>
            <a href="#catalog" className="btn-cta-secondary">Descoperă colecțiile <span>→</span></a>
          </div>
          <div className="hero-fineprint">Fără obligații · Showroom Otopeni · 0728 959 652</div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-val"><em>20+</em></div>
          <div className="hero-stat-label">Ani de experiență cu uși germane premium</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-val">500<em>+</em></div>
          <div className="hero-stat-label">Proiecte finalizate în București și Ilfov</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-val">4<em>.</em>9</div>
          <div className="hero-stat-label">Rating Google din 127 recenzii reale</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-val">6</div>
          <div className="hero-stat-label">Producători germani și europeni reprezentați</div>
        </div>
      </div>
    </section>
  );
}
