import type { Metadata } from 'next';
import './globals.css';
import AosInit from '@/components/AosInit';
import BrowserDetect from '@/components/BrowserDetect';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Exclusive Doors — Uși Premium București',
  description:
    'Cel mai bun showroom de uși de interior și exterior din București. Specializați în proiecte premium la comandă.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="antialiased bg-cream text-warm-text font-sans">
        {children}
        <WhatsAppButton />
        <AosInit />
        <BrowserDetect />
      </body>
    </html>
  );
}
