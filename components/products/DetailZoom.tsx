import { DetailPanel } from '@/lib/data';

export default function DetailZoom({ details }: { details: DetailPanel[] }) {
  return (
    <section className="bg-white border-t border-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[0.625rem] font-bold tracking-[0.3em] uppercase text-gray-300 mb-8">
          Detalii tehnice
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {details.map((panel) => (
            <div
              key={panel.title}
              className="group rounded-xl overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="relative h-[12.5rem] overflow-hidden">
                <img
                  src={panel.img}
                  alt={panel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-3 left-4 font-bold text-white text-sm">
                  {panel.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 leading-relaxed">{panel.body}</p>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center">
                <span className="text-[0.5625rem] font-bold tracking-[0.2em] uppercase text-gray-300">
                  {panel.specKey}
                </span>
                <span className="text-sm font-bold text-accent">{panel.specVal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
