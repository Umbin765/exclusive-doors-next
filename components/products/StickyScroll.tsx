'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollStop } from '@/lib/data';

interface Props {
  stops: ScrollStop[];
  badge: string;
}

// Non-linear easing: spring overshoot for entering elements
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export default function StickyScroll({ stops, badge }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stopRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.45 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-gray-950">

      {/* ── MOBILE: each stop stacked with inline image ── */}
      <div className="lg:hidden">
        {stops.map((stop, i) => (
          <div key={i} className="border-b border-white/5">
            {/* Image */}
            <div className="relative h-56 sm:h-72 overflow-hidden">
              <img
                src={stop.img}
                alt={`${badge} — stop ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
              {i === 0 && (
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-accent text-[8px] font-bold tracking-[0.35em] uppercase px-3 py-1.5 rounded-full border border-accent/20">
                  {badge}
                </span>
              )}
              <span className="absolute bottom-3 right-3 text-white/30 text-[10px] font-bold tracking-widest">
                {String(i + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
              </span>
            </div>

            {/* Text */}
            <div className="px-6 py-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-accent mb-4">
                {stop.eyebrow}
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                {stop.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {stop.body}
              </p>
              <div className="flex gap-8">
                {stop.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white tracking-tight">{stat.num}</div>
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/30 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: original sticky layout ── */}
      <div className="hidden lg:grid lg:grid-cols-2">

        {/* LEFT — sticky image */}
        <div className="relative lg:h-auto">
          <div className="sticky top-0 h-screen flex flex-col justify-center px-8 py-8 overflow-hidden">

            {/* Dark ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
              style={{
                background: `radial-gradient(ellipse at ${30 + activeIndex * 20}% 60%, rgba(248,175,23,0.07) 0%, transparent 70%)`,
              }}
            />

            {/* Crossfading image stack */}
            <div className="relative rounded-2xl overflow-hidden flex-1 max-h-[70vh]">
              {stops.map((stop, i) => (
                <img
                  key={i}
                  src={stop.img}
                  alt={`${badge} — stop ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transition: `opacity 0.9s ease`,
                    transformOrigin: 'center center',
                    zIndex: activeIndex === i ? 1 : 0,
                  }}
                />
              ))}

              {/* Spacer */}
              <div className="invisible w-full h-full" aria-hidden />

              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent z-10" />

              {/* Badge */}
              <span className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-accent text-[8px] font-bold tracking-[0.35em] uppercase px-3 py-1.5 rounded-full border border-accent/20">
                {badge}
              </span>

              {/* Stop counter */}
              <span className="absolute bottom-4 right-4 z-20 text-white/30 text-[10px] font-bold tracking-widest">
                {String(activeIndex + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
              </span>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 justify-center mt-5">
              {stops.map((_, i) => (
                <button
                  key={i}
                  onClick={() => stopRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="h-px rounded-full transition-all duration-500"
                  style={{
                    width: activeIndex === i ? 32 : 8,
                    background: activeIndex === i ? '#F8AF17' : 'rgba(255,255,255,0.2)',
                    transition: `width 0.4s ${SPRING}, background 0.3s ease`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scroll stops */}
        <div className="border-l border-white/5">
          {stops.map((stop, i) => {
            const isActive = activeIndex === i;
            const isAbove = i < activeIndex;

            return (
              <div
                key={i}
                ref={(el) => { stopRefs.current[i] = el; }}
                className="min-h-[80vh] flex flex-col justify-center px-12 py-20 border-b border-white/5"
              >
                {/* Eyebrow */}
                <div
                  style={{
                    opacity: isActive ? 1 : 0.15,
                    transform: isActive ? 'translateX(0)' : isAbove ? 'translateX(-12px)' : 'translateX(20px)',
                    transition: `all 0.7s ${SPRING}`,
                    letterSpacing: isActive ? '0.35em' : '0.2em',
                  }}
                >
                  <p className="text-[9px] font-bold uppercase text-accent mb-5">
                    {stop.eyebrow}
                  </p>
                </div>

                {/* Title */}
                <div
                  style={{
                    opacity: isActive ? 1 : 0.1,
                    transform: isActive
                      ? 'translateY(0) scale(1)'
                      : isAbove
                      ? 'translateY(-24px) scale(0.97)'
                      : 'translateY(40px) scale(0.95)',
                    filter: isActive ? 'blur(0px)' : 'blur(3px)',
                    transition: `opacity 0.6s ease, transform 0.8s ${SPRING}, filter 0.6s ease`,
                  }}
                >
                  <h3 className="text-4xl font-bold text-white leading-tight mb-6 max-w-xs">
                    {stop.title}
                  </h3>
                </div>

                {/* Body */}
                <div
                  style={{
                    opacity: isActive ? 0.65 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.7s ease 0.1s, transform 0.7s ${SPRING} 0.1s`,
                  }}
                >
                  <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-sm">
                    {stop.body}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-10">
                  {stop.stats.map((stat, si) => (
                    <div
                      key={stat.label}
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)',
                        transition: `opacity 0.6s ease ${0.2 + si * 0.1}s, transform 0.7s ${SPRING} ${0.2 + si * 0.1}s`,
                      }}
                    >
                      <div className="text-3xl font-bold text-white tracking-tight">{stat.num}</div>
                      <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/30 mt-1.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
