'use client';

import { useEffect, useState } from 'react';
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

function stars(n: number) {
  return '★'.repeat(Math.round(n));
}

function truncate(text: string, max = 200) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max)) + '…';
}

export default function Reviews() {
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((json) => {
        const liveReviews = Array.isArray(json.reviews) ? json.reviews : [];
        const liveNames = new Set(liveReviews.map((r: GoogleReview) => r.author_name));
        const extras = fallbackGoogleReviews.filter((r) => !liveNames.has(r.author_name));
        const merged = [...liveReviews, ...extras].slice(0, 6);
        setData({
          rating: json.rating ?? 4.3,
          totalReviews: json.totalReviews ?? 152,
          reviews: merged,
        });
      })
      .catch(() =>
        setData({ rating: 4.3, totalReviews: 152, reviews: fallbackGoogleReviews.slice(0, 6) })
      );
  }, []);

  return (
    <section className="ed-voices">
      <div className="ed-voices__inner">
        <div className="ed-voices__head">
          <div>
            <span className="ed-label">Ce spun clienții</span>
            <h2 className="ed-voices__hl">Peste 150 de proiecte.<br />O singură concluzie.</h2>
          </div>
          {data && (
            <div className="ed-voices__meta">
              <span className="ed-voices__stars">{stars(Math.round(data.rating))}</span>
              <span className="ed-voices__rating-num">
                {data.rating.toFixed(1)} · {data.totalReviews} recenzii
              </span>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJj_3EwaEcskARFrnrM6e5b-4"
                target="_blank"
                rel="noopener noreferrer"
                className="ed-voices__write-link"
              >
                Scrie o recenzie
              </a>
            </div>
          )}
        </div>

        {data ? (
          <div className="ed-voices__grid">
            {data.reviews.map((review, i) => (
              <div key={i} className="ed-voice-card">
                <div className="ed-voice-card__stars">{stars(review.rating)}</div>
                <p className="ed-voice-card__quote">"{truncate(review.text)}"</p>
                <div className="ed-voice-card__author">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="ed-voice-card__avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="ed-voice-card__name">{review.author_name}</span>
                    <span className="ed-voice-card__when">{review.relative_time_description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ed-voices__grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  background: 'var(--paper)',
                  borderLeft: '3px solid var(--line)',
                  padding: '2rem 1.75rem',
                  height: '180px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
