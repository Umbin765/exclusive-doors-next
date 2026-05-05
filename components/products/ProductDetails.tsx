'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';

export default function ProductDetails({ product }: { product: Product }) {
  const [activeFinish, setActiveFinish] = useState(0);

  return (
    <div className="bg-white border-l border-gray-100 p-8 flex flex-col gap-5">

      {/* Identity */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-2">
          {product.eyebrow}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
        <p className="text-xs text-gray-400 mt-1.5">{product.model}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="border border-gray-200 text-gray-400 text-[9px] tracking-widest px-2.5 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* Specs */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-3">
          Specificații
        </p>
        {product.specs.map((spec) => (
          <div key={spec.key} className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-400">{spec.key}</span>
            <span className="text-sm font-semibold text-gray-800">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Finish swatches */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-3">
          Finisaje disponibile
        </p>
        <div className="flex gap-2.5 items-center">
          {product.finishes.map((finish, i) => (
            <button
              key={finish.label}
              onClick={() => setActiveFinish(i)}
              title={finish.label}
              className={`w-6 h-6 rounded-full transition-all duration-200 ${
                activeFinish === i ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background: finish.color,
                border: finish.color === '#f0f0f0' || finish.color === '#f5f5f5' ? '1px solid #ddd' : 'none',
              }}
            />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-2">
          {product.finishes[activeFinish].label} · {product.finishes.length - 1} alte variante disponibile
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5 pt-1">
        <a
          href="#contact"
          className="bg-gray-900 text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 text-center hover:bg-gray-700 transition-colors"
        >
          Cere ofertă personalizată
        </a>
        <a
          href="#contact"
          className="border border-gray-200 text-gray-500 text-[11px] py-3.5 text-center hover:border-gray-400 transition-colors"
        >
          Programare showroom
        </a>
        <p className="text-[10px] text-gray-300 text-center pt-1">
          📞 0728 959 652 · Consultanță gratuită
        </p>
      </div>

    </div>
  );
}
