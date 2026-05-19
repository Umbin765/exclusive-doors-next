'use client';

import { useEffect } from 'react';

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
}

export default function BrowserDetect() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    document.documentElement.classList.add(isSafari ? 'browser-safari' : 'browser-chrome');

    // Set --vh to actual visible height (fixes Safari dvh/vh discrepancy)
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return null;
}
