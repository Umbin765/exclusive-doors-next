'use client';

import { useState } from 'react';

interface Props {
  mainImg: string;
  thumbImgs: string[];
  alt: string;
}

export default function ProductGallery({ mainImg, thumbImgs, alt }: Props) {
  const allImgs = [mainImg, ...thumbImgs];
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + allImgs.length) % allImgs.length);
  const next = () => setActive((i) => (i + 1) % allImgs.length);

  return (
    <div className="bg-stone-50 p-5">
      {/* Main image with arrow controls */}
      <div className="relative rounded-xl overflow-hidden h-[420px]">
        <img
          src={allImgs[active]}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Imagine anterioară"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Imagine următoare"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <span className="absolute bottom-3 right-3 bg-white/75 backdrop-blur-sm text-gray-500 text-[9px] tracking-widest px-2.5 py-1 rounded-md">
          {active + 1} / {allImgs.length}
        </span>
      </div>

      {/* Thumbnail strip — small fixed-width squares */}
      <div className="flex gap-2 mt-3">
        {allImgs.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg overflow-hidden w-14 h-14 shrink-0 border-2 transition-all duration-200 ${
              active === i
                ? 'ring-2 ring-accent ring-offset-1 border-transparent'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
