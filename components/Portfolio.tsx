import { portfolio } from '@/lib/data';

export default function Portfolio() {
  return (
    <section className="py-20 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div data-aos="fade-up">
            <p className="text-xs tracking-[0.4em] uppercase text-stone-500 mb-3">Portofoliu</p>
            <h2 className="text-3xl font-light text-white">
              Proiecte recente Exclusive Doors<br />în București și împrejurimi
            </h2>
          </div>
          <a href="#" className="text-sm underline underline-offset-4 hidden lg:block text-stone-300 hover:text-white transition-colors">
            Vezi toate proiectele →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolio.map((item) => (
            <div key={item.title} className="relative group overflow-hidden aspect-square" data-aos="fade-up">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
