'use client';

import { useEffect, useRef, useState } from 'react';
import { fallbackGoogleReviews } from '@/lib/data';

interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-accent' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, 160) + '…';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 min-w-[280px] max-w-[320px] shrink-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <img
            src={review.profile_photo_url}
            alt={review.author_name}
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-tight">{review.author_name}</p>
            <p className="text-xs text-gray-400">{review.relative_time_description}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>

      <Stars rating={review.rating} />

      <p className="text-sm text-gray-600 leading-relaxed">
        {displayText}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-accent font-medium ml-1 hover:underline"
          >
            Citește mai mult
          </button>
        )}
      </p>
    </div>
  );
}

export default function Reviews() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((json) => {
        const liveReviews = Array.isArray(json.reviews) ? json.reviews : [];
        const liveNames = new Set(liveReviews.map((r: GoogleReview) => r.author_name));
        const extras = fallbackGoogleReviews.filter((r) => !liveNames.has(r.author_name));
        const merged = [...liveReviews, ...extras].slice(0, 8);
        setData({
          rating: json.rating ?? 4.3,
          totalReviews: json.totalReviews ?? 152,
          reviews: merged,
        });
      })
      .catch(() => setData({ rating: 4.3, totalReviews: 152, reviews: fallbackGoogleReviews }));
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10" data-aos="fade-up">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-3">
            Recenzii clienți
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Clienții ne recomandă<br className="hidden sm:block" /> cu încredere
            </h2>

            {data && (
              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Excelent</span>
                  <Stars rating={Math.round(data.rating)} />
                  <span className="text-sm text-gray-500">
                    {data.rating.toFixed(1)} · {data.totalReviews} recenzii
                  </span>
                </div>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJj_3EwaEcskARFrnrM6e5b-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border border-gray-300 rounded-full px-4 py-2 hover:border-accent transition-colors whitespace-nowrap"
                >
                  Scrie o recenzie
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Cards + arrows */}
        {data ? (
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:border-accent transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {data.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:border-accent transition-colors"
              aria-label="Următor"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 min-w-[280px] h-48 animate-pulse border border-gray-100 shrink-0" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
