export default function Contact() {
  return (
    <section className="py-20 bg-stone-800" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">Showroom București</p>
          <h2 className="text-3xl font-light text-white">Vizitează-ne</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-sm text-stone-300" data-aos="fade-right">
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">📍</span>
              <span>Bd. Dacia, nr. 153-155, București 020057</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">🕐</span>
              <span>
                Luni – Vineri: 10:00 – 18:00<br />
                Sâmbătă: 10:00 – 14:00 (cu programare)
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">📞</span>
              <a href="tel:+40757874874" className="hover:text-white transition-colors">
                +40 (0)757 874 874
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">✉️</span>
              <a href="mailto:office@exclusivedoors.ro" className="hover:text-white transition-colors">
                office@exclusivedoors.ro
              </a>
            </div>
          </div>

          <div className="h-72 rounded-lg overflow-hidden" data-aos="fade-left">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.6!2d26.0685308!3d44.5672858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b21ca1c1c4fd8f%3A0xee6fb9a733ebb916!2sExclusive%20Doors!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
