'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';

export default function ProductDetails({ product }: { product: Product }) {
  const [activeFinish, setActiveFinish] = useState(0);

  return (
    <div className="px-6 py-5 flex flex-col gap-3.5 h-full overflow-y-auto">

      {/* Identity */}
      <div>
        <p className="text-[0.5625rem] font-bold tracking-[0.3em] uppercase text-accent mb-1">
          {product.eyebrow}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
        <p className="text-[0.6875rem] text-gray-400 mt-1">{product.model}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="border border-gray-200 text-gray-400 text-[0.5625rem] tracking-widest px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* Specs */}
      <div>
        <p className="text-[0.5625rem] font-bold tracking-[0.3em] uppercase text-gray-300 mb-2">
          Specificații
        </p>
        {product.specs.map((spec) => (
          <div key={spec.key} className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-xs text-gray-400">{spec.key}</span>
            <span className="text-xs font-semibold text-gray-800">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Finish swatches */}
      <div>
        <p className="text-[0.5625rem] font-bold tracking-[0.3em] uppercase text-gray-300 mb-2">
          Finisaje disponibile
        </p>
        <div className="flex gap-2 items-center">
          {product.finishes.map((finish, i) => (
            <button
              key={finish.label}
              onClick={() => setActiveFinish(i)}
              title={finish.label}
              className={`w-5 h-5 rounded-full transition-all duration-200 ${
                activeFinish === i ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background: finish.color,
                border: finish.color === '#f0f0f0' || finish.color === '#f5f5f5' ? '1px solid #ddd' : 'none',
              }}
            />
          ))}
        </div>
        <p className="text-[0.625rem] text-gray-400 mt-1.5">
          {product.finishes[activeFinish].label} · {product.finishes.length - 1} alte variante disponibile
        </p>
      </div>

      {/* Price */}
      {product.salePercent ? (
        <div className="border-t border-gray-100 pt-3.5">
          <div className="bg-amber-50 border border-accent/20 rounded-xl px-4 py-3.5">
            <p className="text-[0.5625rem] font-bold tracking-[0.25em] uppercase text-accent mb-1">
              Preț promoțional
            </p>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(product.startingPrice * (1 - product.salePercent / 100)).toLocaleString('ro-RO')} €
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.startingPrice.toLocaleString('ro-RO')} €
              </span>
              <span className="text-xs text-gray-400">+ TVA</span>
            </div>
            <p className="text-[0.625rem] font-semibold text-accent mt-1">
              Economisești {Math.round(product.startingPrice * product.salePercent / 100).toLocaleString('ro-RO')} € · ofertă limitată
            </p>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-100 pt-3.5">
          <p className="text-[0.5625rem] font-bold tracking-[0.25em] uppercase text-accent mb-0.5">
            De la
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.startingPrice.toLocaleString('ro-RO')} €
            </span>
            <span className="text-xs text-gray-400">+ TVA</span>
          </div>
          <p className="text-[0.625rem] text-gray-300 mt-1">Prețul final depinde de dimensiuni și finisaj ales</p>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-2 pt-0.5">
        <a
          href="#contact"
          className="bg-gray-900 text-white text-[0.6875rem] font-bold tracking-[0.2em] uppercase py-3 text-center hover:bg-gray-700 transition-colors"
        >
          Cere ofertă personalizată
        </a>
        <a
          href="#contact"
          className={`text-[0.6875rem] py-3 text-center transition-colors ${
            product.salePercent
              ? 'border-2 border-accent text-gray-700 hover:bg-accent/10'
              : 'border border-gray-200 text-gray-500 hover:border-gray-400'
          }`}
        >
          Programare showroom
        </a>
        <p className="text-[0.625rem] text-gray-300 text-center">
          📞 0728 959 652 · Consultanță gratuită
        </p>
      </div>

    </div>
  );
}
