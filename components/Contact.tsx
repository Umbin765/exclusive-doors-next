export default function Contact() {
  return (
    <section className="ed-showroom" id="contact">
      <div className="ed-showroom__inner">
        {/* Left: info */}
        <div>
          <span className="ed-eyebrow" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Vino să vezi în realitate
          </span>
          <h2 className="ed-showroom__hl">Showroom<br />Otopeni</h2>

          <div className="ed-showroom__info">
            <div className="ed-showroom__info-row">
              <svg className="ed-showroom__info-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div>
                <span className="ed-showroom__info-label">Adresă</span>
                <p className="ed-showroom__info-val">
                  Airport Plaza, Drumul Gării Odăi 1A (DN1)<br />
                  Parter, 075100 Otopeni, Ilfov
                </p>
              </div>
            </div>

            <div className="ed-showroom__info-row">
              <svg className="ed-showroom__info-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="ed-showroom__info-label">Program</span>
                <p className="ed-showroom__info-val">
                  Luni – Vineri: 10:00 – 18:00<br />
                  Sâmbătă: 10:00 – 15:00, doar cu programare
                </p>
              </div>
            </div>

            <div className="ed-showroom__info-row">
              <svg className="ed-showroom__info-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div>
                <span className="ed-showroom__info-label">Contact</span>
                <p className="ed-showroom__info-val">
                  <a href="tel:+40728959652">+40 (0)728 959 652</a><br />
                  <a href="mailto:office@exclusivedoors.ro">office@exclusivedoors.ro</a>
                </p>
              </div>
            </div>
          </div>

          <a href="tel:+40728959652" className="ed-btn ed-btn--primary">
            Programează o vizită →
          </a>
        </div>

        {/* Right: map */}
        <div className="ed-showroom__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.6!2d26.0685308!3d44.5672858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b21ca1c1c4fd8f%3A0xee6fb9a733ebb916!2sExclusive%20Doors!5e0!3m2!1sro!2sro!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
