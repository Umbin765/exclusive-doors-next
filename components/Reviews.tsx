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
        const merged = [...liveReviews, ...extras].slice(0, 2);
        setData({
          rating: json.rating ?? 4.9,
          totalReviews: json.totalReviews ?? 127,
          reviews: merged,
        });
      })
      .catch(() =>
        setData({ rating: 4.9, totalReviews: 127, reviews: fallbackGoogleReviews.slice(0, 2) })
      );
  }, []);

  const displayRating = data?.rating ?? 4.9;
  const displayTotal = data?.totalReviews ?? 127;

  return (
    <section className="voices-section">
      <div className="voices-grid">
        {/* Left: heading + rating display */}
        <div>
          <div className="section-eyebrow">Voci · Rating Google</div>
          <h2 className="voices-h2">Cei care au<br /><em>ales corect.</em></h2>

          <div className="rating-display">
            <div className="rating-display-val">{displayRating.toFixed(1)}</div>
            <div>
              <div className="rating-display-stars">★★★★★</div>
              <div className="rating-display-meta">{displayTotal} recenzii verificate Google</div>
            </div>
          </div>

          <p style={{ color: 'var(--ink-gray)', lineHeight: 1.65, fontSize: '15px' }}>
            Testimoniale de la proprietari și arhitecți care au trecut prin Showroom Decision System
            și au finalizat renovarea fără regrete.
          </p>

          <p className="voices-cta">
            → <a
              href="https://search.google.com/local/writereview?placeid=ChIJj_3EwaEcskARFrnrM6e5b-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Citește toate recenziile pe Google
            </a>
          </p>
        </div>

        {/* Right: 2 voice cards */}
        <div className="voice-cards">
          {data?.reviews.map((review, i) => (
            <div key={i} className="voice-card">
              <div className="voice-stars">{'★'.repeat(review.rating)}</div>
              <p className="voice-text">"{truncate(review.text)}"</p>
              <div className="voice-author">
                <div className="voice-author-left">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="voice-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="voice-name">{review.author_name}</div>
                    <div className="voice-role">{review.relative_time_description}</div>
                  </div>
                </div>
              </div>
            </div>
          )) ?? (
            <>
              <div className="voice-card">
                <div className="voice-stars">★★★★★</div>
                <p className="voice-text">"Am venit fără să știu ce vreau. În 20 de minute știam exact ce uși se potrivesc cu renovarea. Montajul perfect, fără nicio corecție ulterioară."</p>
                <div className="voice-author">
                  <div>
                    <span className="voice-name">Alexandru M.</span>
                    <span className="voice-role" style={{ display: 'block', marginTop: '2px' }}>Proprietar · Sector 1, București</span>
                  </div>
                </div>
              </div>
              <div className="voice-card">
                <div className="voice-stars">★★★★★</div>
                <p className="voice-text">"Recomand constant Exclusive Doors clienților mei. Documentație tehnică clară, termene respectate, nicio problemă de aliniere."</p>
                <div className="voice-author">
                  <div>
                    <span className="voice-name">Ioana R.</span>
                    <span className="voice-role" style={{ display: 'block', marginTop: '2px' }}>Arhitect · 12 proiecte împreună</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
