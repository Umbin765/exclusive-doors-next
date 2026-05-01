'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Întrebări frecvente</p>
          <h2 className="text-3xl font-light">Despre showroom-ul de uși</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="py-5" data-aos="fade-up">
              <button
                className="w-full flex items-center justify-between text-left text-sm font-medium cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-gray-400 shrink-0 text-lg leading-none">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="pt-3">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-stone-50 border border-stone-200 p-8 text-center" data-aos="fade-up">
          <h3 className="font-semibold mb-2">Programează o vizită în showroom</h3>
          <p className="text-sm text-gray-500 mb-5">Suntem disponibili luni – vineri, 10:00 – 18:00</p>
          <a
            href="#contact"
            className="inline-block bg-gray-900 text-white text-sm px-7 py-3 hover:bg-gray-700 transition-colors"
          >
            Programare showroom
          </a>
        </div>
      </div>
    </section>
  );
}
