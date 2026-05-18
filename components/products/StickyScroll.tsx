'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollStop } from '@/lib/data';

interface Props {
  stops: ScrollStop[];
  badge: string;
}

export default function StickyScroll({ stops, badge }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = chapterRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (i: number) => {
    chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="story-section">
      <div className="story-sticky-wrap">

        {/* LEFT — sticky visual col (sticky is on the grid item itself) */}
        <div className="story-visual-col">
          <div className="story-visual-bg" />

          {/* Crossfading images */}
          <div className="story-img-wrap">
            {stops.map((stop, i) => (
              <img
                key={i}
                src={stop.img}
                alt={`${badge} — ${stop.eyebrow}`}
                style={{ opacity: activeIndex === i ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Badge */}
          <div className="story-badge">{badge}</div>

          {/* Counter */}
          <div className="story-counter">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(stops.length).padStart(2, '0')}
          </div>

          {/* Dot nav */}
          <div className="story-dots">
            {stops.map((_, i) => (
              <button
                key={i}
                className={`story-dot${activeIndex === i ? ' active' : ''}`}
                style={{ width: activeIndex === i ? 28 : 8 }}
                onClick={() => scrollTo(i)}
                aria-label={`Capitol ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — scroll chapters */}
        <div className="story-content-col">
          {stops.map((stop, i) => (
            <div
              key={i}
              ref={(el) => { chapterRefs.current[i] = el; }}
              className={`story-chapter${activeIndex === i ? ' is-active' : ''}`}
            >
              <div className="chapter-tag">
                {stop.eyebrow} · {String(i + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
              </div>

              <h2 className="chapter-h">
                {stop.title.split(' ').map((word, wi) =>
                  wi === 0 ? <span key={wi}>{word} </span> : word + ' '
                )}
              </h2>

              <p className="chapter-text">{stop.body}</p>

              <div className="chapter-specs">
                {stop.stats.map((stat) => (
                  <div key={stat.label} className="chapter-spec">
                    <div className="spec-val">{stat.num}</div>
                    <div className="spec-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
