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

          <div
            className="h-72 bg-stone-700 flex items-center justify-center text-stone-400 text-sm"
            data-aos="fade-left"
          >
            Google Maps embed placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
