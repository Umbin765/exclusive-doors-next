'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/data';

export default function StickyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('pd-hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const salePrice = product.salePercent
    ? Math.round(product.startingPrice * (1 - product.salePercent / 100))
    : product.startingPrice;

  const eyebrowParts = product.eyebrow.split('·');
  const brandLabel = eyebrowParts.length > 1 ? eyebrowParts[1].trim() : eyebrowParts[0].trim();

  return (
    <div className={`pd-sticky-bar${visible ? ' visible' : ''}`}>
      <div className="pd-sticky-info">
        <div className="pd-sticky-thumb">
          <img src={product.mainImg} alt={product.name} />
        </div>
        <div>
          <div className="pd-sticky-brand">{brandLabel}</div>
          <div className="pd-sticky-name">{product.name}</div>
        </div>
      </div>

      <div>
        <span className="pd-sticky-price">{salePrice.toLocaleString('ro-RO')} €</span>
        {product.salePercent && (
          <span className="pd-sticky-orig">{product.startingPrice.toLocaleString('ro-RO')} €</span>
        )}
      </div>

      <div className="pd-sticky-actions">
        <a href="#contact" className="pd-sticky-btn">Cere ofertă</a>
        <a href="#contact" className="pd-sticky-btn-outline">Programare showroom</a>
        <a href="tel:0728959652" className="pd-sticky-phone">📞 0728 959 652</a>
      </div>
    </div>
  );
}
