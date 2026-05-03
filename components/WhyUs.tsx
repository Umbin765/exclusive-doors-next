import { features } from '@/lib/data';

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: project photo */}
        <div data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80"
            alt="Proiect hotelier de anvergură — Exclusive Doors"
            className="w-full h-[540px] object-cover rounded-lg"
          />
        </div>

        {/* Right: content */}
        <div data-aos="fade-left">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 font-semibold mb-4">
            De ce să alegi Exclusive Doors?
          </p>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Partener de proiect,<br />nu doar magazin
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10">
            Exclusive Doors nu este doar un magazin de uși, ci un partener de proiect pentru cei care caută
            soluții premium, finisaje de calitate și o echipă care înțelege atât partea estetică, cât și
            cerințele tehnice. Am echipat proiecte rezidențiale și hoteliere de anvergură —
            inclusiv <span className="font-semibold text-gray-700">Marriott București</span>.
          </p>

          <div className="space-y-7">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="shrink-0 mt-0.5 text-amber-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                    <path d={f.iconPath} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
