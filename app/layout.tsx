import type { Metadata } from 'next';
import './globals.css';
import AosInit from '@/components/AosInit';

export const metadata: Metadata = {
  title: 'Exclusive Doors — Uși Premium București',
  description:
    'Cel mai bun showroom de uși de interior și exterior din București. Specializați în proiecte premium la comandă.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {children}
        <AosInit />
      </body>
    </html>
  );
}
