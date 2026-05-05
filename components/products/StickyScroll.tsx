'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollStop } from '@/lib/data';

interface Props {
  stops: ScrollStop[];
  img: string;
  badge: string;
}

export default function StickyScroll({ stops, img, badge }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stopRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-t border-gray-100">

      {/* LEFT — sticky image */}
      <div className="relative bg-stone-50 p-6">
        <div className="sticky top-20">
          <div className="rounded-xl overflow-hidden h-[460px]">
            <img src={img} alt={badge} className="w-full h-full object-cover" />
          </div>
          <span className="absolute top-9 left-9 bg-black/50 backdrop-blur-sm text-accent text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded">
            {badge}
          </span>
          {/* Dot indicators */}
          <div className="flex gap-2 justify-center mt-5">
            {stops.map((_, i) => (
              <button
                key={i}
                onClick={() => stopRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-accent' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — scroll stops */}
      <div className="bg-white border-l border-gray-100">
        {stops.map((stop, i) => (
          <div
            key={i}
            ref={(el) => { stopRefs.current[i] = el; }}
            className={`min-h-[60vh] flex flex-col justify-center px-12 py-16 border-b border-gray-50 transition-all duration-500 ${
              activeIndex === i
                ? 'opacity-100 translate-y-0'
                : 'opacity-25 translate-y-2'
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-4">
              {stop.eyebrow}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-5">
              {stop.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
              {stop.body}
            </p>
            <div className="flex gap-10">
              {stop.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900">{stat.num}</div>
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
