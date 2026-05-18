'use client';

import { useState } from 'react';
import { ProductFinish } from '@/lib/data';

const SWATCHES: Record<string, string> = {
  'Stejar natural':  'linear-gradient(135deg,#A0784A,#B8935A)',
  'Stejar albit':    'linear-gradient(135deg,#D4C4A8,#E8DCC8)',
  'Nuc':             'linear-gradient(135deg,#4A3218,#6B4A28)',
  'Alb mat':         'linear-gradient(135deg,#F0EDE5,#fff)',
  'Negru mat':       'linear-gradient(135deg,#1A1816,#2C2A26)',
  'Gri deschis':     'linear-gradient(135deg,#C0B8AC,#D0C8BC)',
  'Frasin':          'linear-gradient(135deg,#C8B090,#D8C0A0)',
  'Cireș':           'linear-gradient(135deg,#8B4040,#A85050)',
  'Wenge':           'linear-gradient(135deg,#1A1408,#2A2010)',
};

function swatchStyle(color: string, label: string): string {
  if (SWATCHES[label]) return SWATCHES[label];
  return color;
}

export default function FinishSection({ finishes }: { finishes: ProductFinish[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="finish-section">
      <div className="section-meta">
        <span className="section-num">§ Esențe de furnir disponibile</span>
        <span className="section-label">Toate la comandă · Mostre în showroom</span>
      </div>
      <h2 className="finish-h2">ALEGE<br /><span>ESENȚA.</span></h2>
      <p className="finish-sub">
        Esențe nobile disponibile. Toate cu furnir natural autentic — nu folie, nu HPL.
        Mostrele fizice sunt disponibile în showroom Otopeni.
      </p>
      <div className="finish-grid">
        {finishes.map((f, i) => (
          <div
            key={i}
            className={`finish-card${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            <div
              className="finish-swatch"
              style={{ background: swatchStyle(f.color, f.label) }}
            />
            <div className="finish-info">
              <div className="finish-name">{f.label}</div>
              <div className="finish-type">Furnir · Natural</div>
            </div>
            <div className="finish-check">✓</div>
          </div>
        ))}
      </div>
    </section>
  );
}
