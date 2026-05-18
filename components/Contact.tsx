export default function Contact() {
  return (
    <section className="showroom-section" id="contact">
      <div className="showroom-decoration">Doors</div>

      <div className="showroom-content">
        <div className="showroom-left">
          <div className="section-eyebrow" style={{ color: 'var(--orange)' }}>Vino să vezi</div>
          <h2>Vino să <em>atingi.</em><br />Vino să <em>decizi.</em></h2>
          <p className="showroom-lead">
            Showroom-ul nostru din Otopeni e la 15 minute din nordul Bucureștiului.
            Modelele expuse sunt cele reale — atingi materialele, închizi ușile, simți greutatea.
          </p>

          <div className="showroom-details">
            <div className="showroom-row">
              <div className="showroom-label">Adresă</div>
              <div className="showroom-value">Drumul Gării Odăi 1A, Otopeni, Ilfov</div>
            </div>
            <div className="showroom-row">
              <div className="showroom-label">Telefon</div>
              <div className="showroom-value showroom-value-mono">
                <a href="tel:+40728959652">0728 959 652</a>
              </div>
            </div>
            <div className="showroom-row">
              <div className="showroom-label">Email</div>
              <div className="showroom-value showroom-value-mono">
                <a href="mailto:office@exclusivedoors.ro">office@exclusivedoors.ro</a>
              </div>
            </div>
          </div>

          <div className="showroom-cta-area">
            <a href="tel:+40728959652" className="btn-orange-solid">Programează vizita</a>
            <a
              href="https://maps.google.com/?cid=17163938270079558934"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              Indicații GPS
            </a>
          </div>
        </div>

        <div className="showroom-right">
          <div className="showroom-card-dark">
            <div className="showroom-map-iframe">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.6!2d26.0685308!3d44.5672858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b21ca1c1c4fd8f%3A0xee6fb9a733ebb916!2sExclusive%20Doors!5e0!3m2!1sro!2sro!4v1"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="showroom-hours">
              <div className="showroom-hours-cell">
                <div className="showroom-hours-label">Luni — Vineri</div>
                <div className="showroom-hours-val">10:00 — 18:00</div>
              </div>
              <div className="showroom-hours-cell">
                <div className="showroom-hours-label">Sâmbătă</div>
                <div className="showroom-hours-val">10:00 — 14:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
