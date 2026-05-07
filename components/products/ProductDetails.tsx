'use client';

import { Product } from '@/lib/data';

function specIconPath(key: string): string {
  const k = key.toLowerCase();
  if (k.includes('material'))
    return 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z';
  if (k.includes('termic'))
    return 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z';
  if (k.includes('fonic'))
    return 'M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072';
  if (k.includes('efrac') || k.includes('securit'))
    return 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z';
  if (k.includes('garanți') || k.includes('garantie'))
    return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
  if (k.includes('sistem'))
    return 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z';
  if (k.includes('înălțime') || k.includes('inaltime'))
    return 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4';
  if (k.includes('lățime') || k.includes('latime') || k.includes('deschidere'))
    return 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4';
  if (k.includes('greutate') || k.includes('sarcin'))
    return 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3';
  if (k.includes('pivot') || k.includes('tip'))
    return 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15';
  return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
}

function getMadeInBadge(eyebrow: string): { line1: string; line2: string } | null {
  if (eyebrow.toUpperCase().includes('GROKE') || eyebrow.toUpperCase().includes('GRAUTHOFF'))
    return { line1: 'MADE IN', line2: 'GERMANY' };
  return { line1: 'PRODUS', line2: 'EUROPEAN' };
}

export default function ProductDetails({ product }: { product: Product }) {
  const badge = getMadeInBadge(product.eyebrow);

  return (
    <div className="flex flex-col gap-5">

      {/* Made in badge */}
      <div className="flex justify-end">
        {badge && (
          <div className="border-2 border-gray-800 px-3 py-1.5 text-center">
            <p className="text-[0.5rem] font-bold tracking-[0.25em] uppercase text-gray-500">{badge.line1}</p>
            <p className="text-[0.8125rem] font-black tracking-[0.2em] uppercase text-gray-900">{badge.line2}</p>
          </div>
        )}
      </div>

      {/* Caracteristici */}
      <div>
        <p className="text-[0.5625rem] font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
          Caracteristici
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {product.specs.map((spec) => (
            <div
              key={spec.key}
              className="flex flex-col items-center gap-1.5 p-2.5 border border-gray-100 rounded-lg text-center bg-stone-50"
            >
              <svg
                className="w-5 h-5 text-gray-600 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={specIconPath(spec.key)} />
              </svg>
              <span className="text-[0.5625rem] font-bold text-gray-800 leading-tight">{spec.value}</span>
              <span className="text-[0.4375rem] text-gray-400 uppercase tracking-wider leading-tight">{spec.key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Funcționalități opționale */}
      <div>
        <p className="text-[0.5625rem] font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
          Funcționalități
        </p>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-[0.625rem] font-semibold px-2.5 py-1.5 rounded"
            >
              <svg className="w-3 h-3 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Sale price pill */}
      {product.salePercent && (
        <div className="flex items-center gap-3 bg-amber-50 border border-accent/25 rounded px-3 py-2">
          <span className="text-[0.5625rem] font-bold uppercase tracking-widest text-accent">Promoție</span>
          <span className="text-xl font-black text-gray-900">
            {Math.round(product.startingPrice * (1 - product.salePercent / 100)).toLocaleString('ro-RO')} €
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.startingPrice.toLocaleString('ro-RO')} €
          </span>
          <span className="text-[0.5625rem] text-gray-400">+ TVA</span>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-2 pt-1">
        <a
          href="#contact"
          className="bg-gray-900 text-white text-[0.6875rem] font-bold tracking-[0.2em] uppercase py-3 px-5 text-center hover:bg-gray-700 transition-colors"
        >
          CERE OFERTĂ DE PREȚ
        </a>
        <a
          href="#contact"
          className="bg-accent text-gray-900 text-[0.6875rem] font-bold tracking-[0.15em] uppercase py-3 px-5 text-center hover:bg-accent-hover transition-colors"
        >
          PROGRAMARE SHOWROOM
        </a>
        <a
          href="tel:0728959652"
          className="border border-gray-300 text-gray-600 text-[0.6875rem] font-semibold tracking-wider py-2.5 px-5 text-center hover:border-gray-500 transition-colors"
        >
          📞 0728 959 652 · Consultanță gratuită
        </a>
      </div>

      {/* Detail thumbnails */}
      <div className="pt-1 border-t border-gray-100">
        <div className="flex gap-2">
          {product.details.map((d, i) => (
            <div key={i} className="relative flex-1 aspect-[4/3] overflow-hidden rounded">
              <img src={d.img} alt={d.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                <p className="text-white text-[0.5rem] font-bold uppercase tracking-wide leading-tight">
                  {d.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
