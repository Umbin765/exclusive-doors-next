import type { Metadata } from 'next';
import './globals.css';
import './editorial.css';
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppButton />
        <AosInit />
        <BrowserDetect />
      </body>
    </html>
  );
}
