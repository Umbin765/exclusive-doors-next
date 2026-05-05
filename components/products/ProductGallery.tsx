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

  return (
    <div className="bg-stone-50 p-5 flex flex-col gap-3">
      {/* Main image */}
      <div className="relative rounded-xl overflow-hidden h-[340px]">
        <img
          src={allImgs[active]}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <span className="absolute bottom-3 right-3 bg-white/75 backdrop-blur-sm text-gray-500 text-[9px] tracking-widest px-2.5 py-1 rounded-md">
          ↔ Mărește
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {allImgs.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg overflow-hidden h-[52px] border-2 transition-all duration-200 ${
              active === i
                ? 'ring-2 ring-accent ring-offset-1 border-transparent'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
