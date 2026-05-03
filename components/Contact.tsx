export default function Contact() {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">

          {/* Left: info */}
          <div className="flex flex-col justify-between" data-aos="fade-right">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4">
                Showroom București
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-10">Vizitează-ne</h2>

              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">Adresă</p>
                    <p className="text-sm text-gray-500">Airport Plaza, Drumul Gării Odăi 1A (DN1), Parter, 075100 Otopeni, Ilfov</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">Program</p>
                    <p className="text-sm text-gray-500">Luni – Vineri: 10:00 – 18:00</p>
                    <p className="text-sm text-gray-500">Sâmbătă: 10:00 – 15:00, doar cu programare</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">Telefon & email</p>
                    <a href="tel:+40728959652" className="text-sm text-gray-500 hover:text-accent transition-colors block">
                      +40 (0)728 959 652
                    </a>
                    <a href="mailto:office@exclusivedoors.ro" className="text-sm text-gray-500 hover:text-accent transition-colors block">
                      office@exclusivedoors.ro
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="tel:+40728959652"
              className="mt-10 w-full bg-accent hover:bg-accent-hover text-gray-900 font-bold text-sm py-4 flex items-center justify-center gap-2 rounded-full transition-colors"
            >
              Programează o vizită
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: map */}
          <div className="h-[480px] lg:h-auto rounded-2xl overflow-hidden" data-aos="fade-left">
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
