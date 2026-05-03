import { portfolio } from '@/lib/data';

export default function Portfolio() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-12" data-aos="fade-up">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4">Portofoliu</p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
            Proiecte recente Exclusive Doors<br />în București și împrejurimi
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Fiecare ușă și fiecare pardoseală montată de Exclusive Doors face parte dintr-un proiect real,
            construit alături de arhitecți, designeri, dezvoltatori și proprietari care au ales soluții
            premium pentru amenajările gândite. În portofoliu găsiți studii de caz din București și
            împrejurimi — de la exterior din aluminiu pentru ansambluri rezidențiale, până la uși interioare
            contemporane cu finisaje integrate în spații ample.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.map((item, i) => (
            <div
              key={item.title}
              className="relative group overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Always-visible gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-bold text-lg leading-snug mb-1">{item.title}</p>
                <p className="text-white/70 text-sm">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center" data-aos="fade-up">
          <a href="#contact" className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-accent transition-colors">
            Discută despre proiectul tău →
          </a>
        </div>

      </div>
    </section>
  );
}
