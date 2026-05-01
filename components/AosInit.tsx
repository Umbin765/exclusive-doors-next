'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AosInit() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname);
  }, []);

  return (
    <Script
      src="https://unpkg.com/aos@2.3.1/dist/aos.js"
      strategy="afterInteractive"
      onLoad={() => {
        (window as any).AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
      }}
    />
  );
}
