import { reviews } from '@/lib/data';

export default function Reviews() {
  return (
    <section className="bg-stone-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">Recenzii Google</p>
          <h2 className="text-3xl font-light text-white">Clienții ne recomandă cu încredere</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-stone-700 p-6" data-aos="fade-up">
              <div className="flex text-amber-400 text-lg mb-3 tracking-tight">★★★★★</div>
              <p className="text-stone-300 text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-white">{r.name}</span>
                <span className="text-xs text-stone-400">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
