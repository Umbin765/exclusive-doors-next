export default function CtaBand() {
  return (
    <section className="ed-cta">
      <div className="ed-cta__inner">
        <span className="ed-eyebrow">Consultanță gratuită</span>
        <h2 className="ed-cta__hl">
          Alege <em>corect.</em><br />Din prima.
        </h2>
        <p className="ed-cta__sub">
          15 minute în showroom. Filtrăm opțiunile, potrivim designul,
          validăm tehnic. Fără cataloage inutile, fără surprize la montaj.
        </p>
        <div className="ed-cta__actions">
          <a href="#contact" className="ed-btn ed-btn--primary">
            Programează consultația gratuită
          </a>
          <a href="tel:0728959652" className="ed-btn ed-btn--ghost">
            0728 959 652
          </a>
        </div>
      </div>
    </section>
  );
}
