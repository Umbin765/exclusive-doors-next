'use client';

import { useEffect } from 'react';

export default function BrowserDetect() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    document.documentElement.classList.add(isSafari ? 'browser-safari' : 'browser-chrome');
  }, []);

  return null;
}
