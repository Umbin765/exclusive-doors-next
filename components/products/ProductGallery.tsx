'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  const allImgs = [product.mainImg, ...product.thumbImgs];
  const [active, setActive] = useState(0);

  const salePrice = product.salePercent
    ? Math.round(product.startingPrice * (1 - product.salePercent / 100))
    : null;

  return (
    <div className="pd-gallery">
      <div className="pd-gallery-main">
        {allImgs.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.name} — ${i + 1}`}
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}

        {product.salePercent && (
          <div className="pd-gallery-badge">−{product.salePercent}% reducere</div>
        )}

        {product.madeInGermany && (
          <div className="pd-gallery-origin">
            <strong>🇩🇪 DE</strong>Made in<br />Germany
          </div>
        )}

        <div className="pd-gallery-counter">{active + 1} / {allImgs.length}</div>
        <div className="pd-gallery-zoom">⊕</div>
      </div>

      <div className="pd-gallery-thumbs">
        {allImgs.map((img, i) => (
          <button
            key={i}
            className={`pd-gallery-thumb${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Imagine ${i + 1}`}
          >
            <img src={img} alt={`View ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
