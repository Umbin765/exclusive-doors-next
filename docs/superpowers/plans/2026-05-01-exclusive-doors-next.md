# Exclusive Doors Next — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the `exclusive-doors` Laravel/Blade single-page marketing site into a pixel-perfect Next.js 14 (App Router) project deployable to Vercel.

**Architecture:** Single route (`/`) composed from 13 section components. Two client components (Nav for mega-menu hover, Faq for accordion). All static content extracted to `lib/data.ts`. AOS animations loaded via CDN through a `"use client"` AosInit component.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, AOS 2.3.1 (CDN)

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript config with `@/*` path alias |
| `next.config.ts` | Minimal Next.js config |
| `tailwind.config.ts` | Content paths for App Router |
| `postcss.config.js` | PostCSS for Tailwind |
| `app/globals.css` | Tailwind directives |
| `app/layout.tsx` | Root HTML shell, AOS CSS link, metadata |
| `app/page.tsx` | Composes all section components in order |
| `lib/data.ts` | All static content (typed constants) |
| `components/AosInit.tsx` | `"use client"` — loads AOS JS, inits on load, clears hash |
| `components/Nav.tsx` | `"use client"` — sticky nav + mega-menu (useState hover) |
| `components/Hero.tsx` | Hero section with stats strip |
| `components/CategoryGrid.tsx` | 4-card 2×2/4×1 dark grid |
| `components/StatsBar.tsx` | Amber stats band |
| `components/ProductSection.tsx` | Reusable alternating image+text section |
| `components/CtaBand.tsx` | Amber CTA band |
| `components/WhyUs.tsx` | "De ce să alegi" with feature list |
| `components/Reviews.tsx` | Google reviews grid |
| `components/Portfolio.tsx` | Portfolio hover-reveal grid |
| `components/Blog.tsx` | Blog teasers grid |
| `components/Faq.tsx` | `"use client"` — FAQ accordion (useState) |
| `components/Contact.tsx` | Showroom address + map placeholder |
| `components/Footer.tsx` | 5-column footer |

---

## Task 1: Scaffold project config files

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "exclusive-doors-next",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.29",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Install dependencies**

Run from `/Users/tudor/projects/exclusive-doors-next`:
```bash
npm install
```
Expected: `node_modules/` created, no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.js
git commit -m "chore: scaffold Next.js 14 project config"
```

---

## Task 2: App shell (globals.css + layout.tsx)

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `components/AosInit.tsx`

- [ ] **Step 1: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 2: Create `components/AosInit.tsx`**

This client component loads AOS from CDN, initialises it once the script loads, and replicates the original scroll-restoration + hash-clearing behaviour from `layouts/public.blade.php`.

```tsx
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
```

- [ ] **Step 3: Create `app/layout.tsx`**

```tsx
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
```

- [ ] **Step 4: Create a minimal `app/page.tsx` to verify the shell compiles**

```tsx
export default function Home() {
  return <main>Exclusive Doors</main>;
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript or Tailwind errors.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx app/page.tsx components/AosInit.tsx
git commit -m "feat: add app shell with Tailwind and AOS init"
```

---

## Task 3: Static data layer

**Files:**
- Create: `lib/data.ts`

All static content lives here so components contain zero hardcoded strings.

- [ ] **Step 1: Create `lib/data.ts`**

```ts
// ─── Types ───────────────────────────────────────────────────────────────────

export interface MegaMenuCard {
  title: string;
  desc: string;
  img: string;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  categories: string[];
  heading: string;
  cards: MegaMenuCard[];
}

export interface Stat {
  num: string;
  label: string;
}

export interface CategoryCard {
  title: string;
  sub: string;
  img: string;
}

export interface ProductSectionData {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  img: string;
  alt: string;
  imageLeft: boolean;
  dark: boolean;
}

export interface Feature {
  title: string;
  body: string;
  iconPath: string;
}

export interface Review {
  name: string;
  date: string;
  text: string;
}

export interface PortfolioItem {
  title: string;
  img: string;
}

export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface FooterColumn {
  heading: string;
  links: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const megaMenus: Record<string, MegaMenuItem> = {
  interior: {
    label: 'Uși Interior',
    href: '#interior',
    categories: ['Filomuro', 'Albe vopsite', 'Laminate', 'Furnir natural', 'Sticlă', 'Glisante', 'Duble'],
    heading: 'Tipuri de uși interior',
    cards: [
      { title: 'Filomuro',     desc: 'La nivel cu peretele, pentru un aspect modern și îngrijit.',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { title: 'Albe vopsite', desc: 'Uși de interior vopsite în alb, luminoase și elegante.',        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
      { title: 'Laminate',     desc: 'Uși de interior laminate, pentru un aspect cald și natural.',   img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    ],
  },
  exterior: {
    label: 'Uși Exterior',
    href: '#exterior',
    categories: ['Aluminiu', 'Lemn masiv', 'Personalizate', 'Blindate', 'Pivot exterior'],
    heading: 'Tipuri de uși exterior',
    cards: [
      { title: 'Aluminiu',      desc: 'Uși de exterior din aluminiu — moderne și durabile.',           img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
      { title: 'Lemn masiv',    desc: 'Uși de exterior din lemn masiv, clasice și calde.',            img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80' },
      { title: 'Personalizate', desc: 'Soluții complet personalizate pentru orice proiect.',           img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80' },
    ],
  },
  glisante: {
    label: 'Uși Glisante',
    href: '#glisante',
    categories: ['Sistem glisant', 'Liftant-culisant', 'Pliante', 'Telescopice'],
    heading: 'Tipuri de uși glisante',
    cards: [
      { title: 'Sistem glisant',   desc: 'Elegante și funcționale, ideale pentru spații deschise.',  img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80' },
      { title: 'Liftant-culisant', desc: 'Sisteme liftant-culisante pentru deschideri mari.',         img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { title: 'Pliante',          desc: 'Uși pliante pentru separarea elegantă a spațiilor.',       img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
    ],
  },
  pivotante: {
    label: 'Uși Pivotante',
    href: '#pivotante',
    categories: ['Pivot central', 'Pivot offset', 'Design supradimensionat'],
    heading: 'Tipuri de uși pivotante',
    cards: [
      { title: 'Pivot central',    desc: 'Design spectaculos cu pivot central.',                          img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
      { title: 'Pivot offset',     desc: 'Impact vizual maxim cu pivot asimetric.',                       img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
      { title: 'Supradimensionate',desc: 'Modele la comandă pentru înălțimi și lățimi speciale.',         img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80' },
    ],
  },
};

export const heroStats: Stat[] = [
  { num: '17+',    label: 'Ani experiență' },
  { num: '5.000+', label: 'Variante uși exterior' },
  { num: '4.8/5',  label: 'Rating Google' },
];

export const heroHighlights = [
  { icon: '💬', text: 'Consultanță pe proiect' },
  { icon: '📐', text: 'Măsurători & montaj profesional' },
  { icon: '🛡️', text: 'Service & garanție' },
  { icon: '🏠', text: 'Soluții complete uși interior + exterior' },
];

export const categories: CategoryCard[] = [
  { title: 'Uși Interior',  sub: 'Filomuro, furnir, sticlă, glisante și duble',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title: 'Uși Exterior',  sub: 'Aluminiu, lemn și soluții complet personalizate', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { title: 'Uși Glisante',  sub: 'Sisteme glisante, liftant-culisante și pliante',  img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80' },
  { title: 'Uși Pivotante', sub: 'Design modern, pivot central și offset',          img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
];

export const statsBarItems: Stat[] = [
  { num: '17+',    label: 'Ani experiență' },
  { num: '5.000+', label: 'Variante uși exterior' },
  { num: '300+',   label: 'Modele uși interior' },
  { num: '4.8/5',  label: 'Rating Google' },
];

export const productSections: ProductSectionData[] = [
  {
    id: 'interior',
    eyebrow: 'Showroom București',
    heading: 'Showroom și magazin de uși de interior în București',
    body: 'Descoperiți o selecție vastă de uși de interior — filomuro, furnir, sticlă, glisante și duble — expuse în showroom-ul nostru din București. Fiecare model poate fi personalizat la comandă.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    alt: 'Uși Interior',
    imageLeft: true,
    dark: false,
  },
  {
    id: 'exterior',
    eyebrow: 'La comandă',
    heading: 'Uși de exterior la comandă',
    body: 'Uși de exterior din aluminiu, lemn masiv și soluții complet personalizate. Securitate ridicată, izolare termică și estetică premium pentru intrarea casei dumneavoastră.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    alt: 'Uși Exterior',
    imageLeft: false,
    dark: true,
  },
  {
    id: 'glisante',
    eyebrow: 'Sisteme glisante',
    heading: 'Uși glisante premium',
    body: 'Sisteme glisante, liftant-culisante și pliante pentru interior și exterior. Soluții elegante care maximizează spațiul și aduc lumină naturală în orice cameră.',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80',
    alt: 'Uși Glisante',
    imageLeft: true,
    dark: false,
  },
  {
    id: 'pivotante',
    eyebrow: 'Design modern',
    heading: 'Uși pivotante de design',
    body: 'Uși cu pivot central sau offset — statement-ul perfect pentru o intrare de impact. Disponibile în dimensiuni supradimensionate și finisaje la alegere.',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    alt: 'Uși Pivotante',
    imageLeft: false,
    dark: true,
  },
];

export const features: Feature[] = [
  {
    title: 'Experiență în proiecte premium',
    body: 'Am contribuit la ansambluri rezidențiale, case unifamiliale și proiecte cu standard ridicat, în București și împrejurimi.',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Consultanță pentru profesioniști și proprietari',
    body: 'Analizăm planurile, clarificăm detaliile tehnice și recomandăm soluții potrivite bugetului, stilului și nivelului de calitate dorit.',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Servicii complete: măsurători, montaj, service',
    body: 'Ușile sunt măsurate și montate corect, pentru un rezultat coerent și o performanță durabilă în timp.',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Întreținere și garanție',
    body: 'Rămânem aproape și după livrare, prin servicii de întreținere și asistență dedicată pentru tot ce ține de garanție.',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

export const reviews: Review[] = [
  { name: 'Andrei M.',  date: 'Februarie 2025', text: 'Experiență excelentă! Ușile de interior alese împreună cu consultantul lor sunt exact ce căutam. Montajul a fost impecabil și în termen.' },
  { name: 'Elena D.',   date: 'Noiembrie 2024', text: 'Showroom-ul este spectaculos, cu o gamă impresionantă de produse. Echipa a fost profesionistă și răbdătoare cu toate întrebările mele.' },
  { name: 'Bogdan T.',  date: 'Ianuarie 2025',  text: 'Am ales uși glisante pentru apartament. Calitate remarcabilă, livrare și montaj în termenul promis. Recomand cu toată încrederea!' },
];

export const portfolio: PortfolioItem[] = [
  { title: 'Apartament în Voluntari — uși interior filomuro', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title: 'Vilă în Pipera — uși exterior aluminiu',          img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { title: 'Complex rezidențial — 20 uși glisante',           img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80' },
  { title: 'Penthouse — uși pivotante de design',             img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
];

export const blogPosts: BlogPost[] = [
  { date: '23 Ianuarie 2025', title: 'Cele mai bune uși de exterior pentru casă',           excerpt: 'Cum alegi ușa de exterior potrivită în funcție de material, securitate și design.' },
  { date: '02 Martie 2025',   title: 'Cum alegi ușile într-o locuință cu finisaje premium', excerpt: 'Ghid complet pentru corelarea ușilor cu pardoselile și finisajele interioare.' },
  { date: '02 Martie 2025',   title: 'Stiluri de design interior: cum alegi ușa potrivită', excerpt: 'De la minimalist la industrial — ușile care se potrivesc fiecărui stil.' },
  { date: '02 Martie 2025',   title: 'Montajul ușilor de interior: sfaturi utile',          excerpt: 'Tot ce trebuie să știi înainte de a programa montajul ușilor noi.' },
];

export const faqs: FAQ[] = [
  { q: 'Trebuie să fac programare înainte să vin în showroom?',   a: 'Nu este obligatorie, însă o recomandăm pentru a beneficia de atenția unui consultant dedicat. Puteți programa vizita prin telefon sau formularul de contact.' },
  { q: 'Pot vedea în showroom uși filomuro și uși de exterior?',  a: 'Da, showroom-ul nostru expune o gamă completă de uși interior (inclusiv filomuro) și uși exterior din aluminiu și lemn.' },
  { q: 'Pot veni pentru consultanță înainte să comand?',           a: 'Absolut. Consultanța este gratuită și fără obligații. Echipa noastră vă ajută să alegeți soluția potrivită pentru proiectul dumneavoastră.' },
  { q: 'Oferiți măsurători și montaj în București?',               a: 'Da, oferim servicii complete de măsurare și montaj profesional în București și zonele limitrofe (Ilfov, Voluntari, Pipera, Otopeni).' },
  { q: 'Puteți gestiona proiectul complet?',                       a: 'Da. Preluăm managementul complet: consultanță, măsurători, comandă, livrare și montaj, inclusiv service post-vânzare.' },
];

export const footerColumns: FooterColumn[] = [
  { heading: 'Uși Interior',  links: ['Filomuro', 'Furnir', 'Sticlă', 'Glisante', 'Duble', 'Pivot'] },
  { heading: 'Uși Exterior',  links: ['Aluminiu', 'Lemn', 'Personalizate', 'Blindate'] },
  { heading: 'Uși Glisante',  links: ['Sistem glisant', 'Liftant-culisant', 'Pliante'] },
  { heading: 'Uși Pivotante', links: ['Pivot central', 'Pivot offset', 'Design premium'] },
  { heading: 'Resurse',       links: ['Blog', 'Proiecte', 'Despre noi', 'Contact', 'Politica confidențialitate'] },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add static data layer with all content types"
```

---

## Task 4: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { megaMenus } from '@/lib/data';

export default function Nav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="text-lg font-bold tracking-widest shrink-0">
            EXCLUSIVE DOORS
          </a>

          {/* Mega-menu items */}
          <div className="hidden lg:flex items-center h-full">
            {Object.entries(megaMenus).map(([key, menu]) => (
              <div
                key={key}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMenu(key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={menu.href}
                  className={`px-3 h-full flex items-center text-sm border-b-2 transition-colors ${
                    activeMenu === key
                      ? 'text-amber-500 border-amber-400'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {menu.label}
                </a>

                {activeMenu === key && (
                  <div className="absolute top-full left-0 w-[660px] bg-white shadow-2xl border border-gray-100 p-6 grid grid-cols-[160px_1fr] gap-6">
                    {/* Category list */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Categorii
                      </p>
                      <ul className="space-y-0.5">
                        {menu.categories.map((cat) => (
                          <li key={cat}>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-amber-500 transition-colors block py-1"
                            >
                              {cat}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={menu.href}
                        className="text-amber-500 text-xs font-semibold mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Vezi toate →
                      </a>
                    </div>

                    {/* Photo cards */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        {menu.heading}
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {menu.cards.map((card) => (
                          <a key={card.title} href="#" className="group">
                            <div className="h-28 overflow-hidden rounded mb-2 bg-gray-100">
                              <img
                                src={card.img}
                                alt={card.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="font-semibold text-xs text-gray-900 mb-0.5">
                              {card.title}
                            </div>
                            <div className="text-xs text-gray-400 leading-snug line-clamp-2">
                              {card.desc}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <span className="text-gray-300 mx-1 text-xs select-none">|</span>
            <a href="#contact" className="px-3 h-full flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Despre Noi
            </a>
            <a href="#contact" className="px-3 h-full flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>

          {/* Phone + CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <a href="tel:0757874874" className="text-sm font-semibold hidden md:block">
              0757 874 874
            </a>
            <a
              href="#contact"
              className="bg-gray-900 text-white text-sm px-5 py-2.5 hover:bg-gray-700 transition-colors"
            >
              Programare showroom
            </a>
          </div>

        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add Nav with mega-menu hover state"
```

---

## Task 5: Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import { heroStats, heroHighlights } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Showroom Exclusive Doors București"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-start">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 w-full" data-aos="fade-up">
          {/* Location bubble */}
          <a
            href="https://maps.google.com/?q=Bd.+Dacia+153-155+Bucuresti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 text-xs font-semibold px-4 py-2 rounded-full mt-8 mb-8 hover:bg-amber-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.555 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Showroom București — Bd. Dacia, nr. 153-155
          </a>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Showroom &amp; magazin de uși{' '}
            <span className="text-amber-400">la comandă</span>{' '}
            premium în București
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
            Cel mai bun showroom de uși de interior și exterior din București. Suntem orientați
            către proiecte unde integrarea în arhitectură, performanța și montajul corect contează.
            Specializați în proiecte premium de uși la comandă, pentru case particulare și comerciale.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 text-sm font-bold px-8 py-3.5 hover:bg-amber-300 transition-colors"
            >
              Programare showroom
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/60 text-white text-sm font-medium px-8 py-3.5 hover:bg-white hover:text-gray-900 transition-colors"
            >
              Cere ofertă online
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {heroStats.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? 'border-l border-gray-600 pl-8' : ''}>
                <div className="text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service highlights strip */}
      <div className="relative bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-700">
            {heroHighlights.map((item) => (
              <div key={item.text} className="py-4 px-5 flex items-center gap-3">
                <span className="text-amber-400 shrink-0">{item.icon}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section"
```

---

## Task 6: CategoryGrid and StatsBar

**Files:**
- Create: `components/CategoryGrid.tsx`
- Create: `components/StatsBar.tsx`

- [ ] **Step 1: Create `components/CategoryGrid.tsx`**

```tsx
import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="py-16 px-6 bg-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <a key={cat.title} href="#" className="relative group overflow-hidden block aspect-[3/4]" data-aos="fade-up">
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="text-base font-semibold">{cat.title}</div>
              <div className="text-xs text-gray-300 mt-1">{cat.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/StatsBar.tsx`**

```tsx
import { statsBarItems } from '@/lib/data';

export default function StatsBar() {
  return (
    <section className="bg-amber-400 text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {statsBarItems.map((stat) => (
          <div key={stat.label} data-aos="fade-up">
            <div className="text-3xl font-bold">{stat.num}</div>
            <div className="text-sm text-amber-800 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/CategoryGrid.tsx components/StatsBar.tsx
git commit -m "feat: add CategoryGrid and StatsBar sections"
```

---

## Task 7: ProductSection (reusable, used 4×)

**Files:**
- Create: `components/ProductSection.tsx`

- [ ] **Step 1: Create `components/ProductSection.tsx`**

```tsx
import { ProductSectionData } from '@/lib/data';

export default function ProductSection({ section }: { section: ProductSectionData }) {
  const { id, eyebrow, heading, body, img, alt, imageLeft, dark } = section;

  const eyebrowClass = dark ? 'text-xs tracking-[0.3em] uppercase text-stone-400 mb-3' : 'text-xs tracking-[0.3em] uppercase text-gray-400 mb-3';
  const headingClass = dark ? 'text-3xl font-light leading-snug mb-5 text-white' : 'text-3xl font-light leading-snug mb-5';
  const bodyClass    = dark ? 'text-stone-300 leading-relaxed mb-8' : 'text-gray-500 leading-relaxed mb-8';
  const ctaClass     = dark
    ? 'inline-block border border-white/60 text-white text-sm px-7 py-3 hover:bg-white hover:text-gray-900 transition-colors'
    : 'inline-block border border-gray-900 text-sm px-7 py-3 hover:bg-gray-900 hover:text-white transition-colors';
  const bgClass      = dark ? 'py-24 bg-stone-700' : 'py-24 bg-white';

  const imageEl = (
    <div data-aos={imageLeft ? 'fade-right' : 'fade-left'}>
      <img src={img} alt={alt} className="w-full h-[480px] object-cover rounded-lg" />
    </div>
  );

  const textEl = (
    <div data-aos={imageLeft ? 'fade-left' : 'fade-right'}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={headingClass}>{heading}</h2>
      <p className={bodyClass}>{body}</p>
      <a href="#contact" className={ctaClass}>
        Cere ofertă online
      </a>
    </div>
  );

  return (
    <section className={bgClass} id={id}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {imageLeft ? imageEl : textEl}
        {imageLeft ? textEl : imageEl}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProductSection.tsx
git commit -m "feat: add reusable ProductSection component"
```

---

## Task 8: CtaBand and WhyUs

**Files:**
- Create: `components/CtaBand.tsx`
- Create: `components/WhyUs.tsx`

- [ ] **Step 1: Create `components/CtaBand.tsx`**

```tsx
export default function CtaBand() {
  return (
    <section className="py-20 bg-amber-400 text-center">
      <div className="max-w-2xl mx-auto px-6" data-aos="fade-up">
        <p className="text-xs tracking-[0.4em] uppercase text-amber-800 mb-3">Consultanță gratuită</p>
        <h2 className="text-3xl font-light mb-8 text-gray-900">
          Ai un proiect? Vorbește cu un specialist.
        </h2>
        <a
          href="#contact"
          className="inline-block bg-gray-900 text-white text-sm px-8 py-3.5 hover:bg-stone-700 transition-colors"
        >
          Programare showroom
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/WhyUs.tsx`**

```tsx
import { features } from '@/lib/data';

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: project photo */}
        <div data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80"
            alt="Proiect Marriott București — Exclusive Doors"
            className="w-full h-[540px] object-cover rounded-lg"
          />
        </div>

        {/* Right: content */}
        <div data-aos="fade-left">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 font-semibold mb-4">
            De ce să alegi Exclusive Doors?
          </p>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Partener de proiect,<br />nu doar magazin
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10">
            Exclusive Doors nu este doar un magazin de uși, ci un partener de proiect pentru cei care caută
            soluții premium, finisaje de calitate și o echipă care înțelege atât partea estetică, cât și
            cerințele tehnice. Am echipat proiecte rezidențiale și hoteliere de anvergură —
            inclusiv <span className="font-semibold text-gray-700">Marriott București</span>.
          </p>

          <div className="space-y-7">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="shrink-0 mt-0.5 text-amber-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                    <path d={f.iconPath} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/CtaBand.tsx components/WhyUs.tsx
git commit -m "feat: add CtaBand and WhyUs sections"
```

---

## Task 9: Reviews and Portfolio

**Files:**
- Create: `components/Reviews.tsx`
- Create: `components/Portfolio.tsx`

- [ ] **Step 1: Create `components/Reviews.tsx`**

```tsx
import { reviews } from '@/lib/data';

export default function Reviews() {
  return (
    <section className="bg-stone-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">Recenzii Google</p>
          <h2 className="text-3xl font-light text-white">Clienții ne recomandă cu încredere</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-stone-700 p-6" data-aos="fade-up">
              <div className="flex text-amber-400 text-lg mb-3 tracking-tight">★★★★★</div>
              <p className="text-stone-300 text-sm leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-white">{r.name}</span>
                <span className="text-xs text-stone-400">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Portfolio.tsx`**

```tsx
import { portfolio } from '@/lib/data';

export default function Portfolio() {
  return (
    <section className="py-20 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div data-aos="fade-up">
            <p className="text-xs tracking-[0.4em] uppercase text-stone-500 mb-3">Portofoliu</p>
            <h2 className="text-3xl font-light text-white">
              Proiecte recente Exclusive Doors<br />în București și împrejurimi
            </h2>
          </div>
          <a href="#" className="text-sm underline underline-offset-4 hidden lg:block text-stone-300 hover:text-white transition-colors">
            Vezi toate proiectele →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolio.map((item) => (
            <div key={item.title} className="relative group overflow-hidden aspect-square" data-aos="fade-up">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Reviews.tsx components/Portfolio.tsx
git commit -m "feat: add Reviews and Portfolio sections"
```

---

## Task 10: Blog and Faq

**Files:**
- Create: `components/Blog.tsx`
- Create: `components/Faq.tsx`

- [ ] **Step 1: Create `components/Blog.tsx`**

```tsx
import { blogPosts } from '@/lib/data';

export default function Blog() {
  return (
    <section className="bg-stone-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Blog</p>
          <h2 className="text-3xl font-light">Ghiduri și articole utile</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <a key={post.title} href="#" className="bg-white group block" data-aos="fade-up">
              <div className="h-44 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-gray-300 group-hover:to-gray-400 transition-colors duration-300" />
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Faq.tsx`**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add components/Blog.tsx components/Faq.tsx
git commit -m "feat: add Blog and FAQ sections"
```

---

## Task 11: Contact and Footer

**Files:**
- Create: `components/Contact.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Contact.tsx`**

```tsx
export default function Contact() {
  return (
    <section className="py-20 bg-stone-800" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">Showroom București</p>
          <h2 className="text-3xl font-light text-white">Vizitează-ne</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-sm text-stone-300" data-aos="fade-right">
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">📍</span>
              <span>Bd. Dacia, nr. 153-155, București 020057</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">🕐</span>
              <span>
                Luni – Vineri: 10:00 – 18:00<br />
                Sâmbătă: 10:00 – 14:00 (cu programare)
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">📞</span>
              <a href="tel:+40757874874" className="hover:text-white transition-colors">
                +40 (0)757 874 874
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-stone-400">✉️</span>
              <a href="mailto:office@exclusivedoors.ro" className="hover:text-white transition-colors">
                office@exclusivedoors.ro
              </a>
            </div>
          </div>

          <div
            className="h-72 bg-stone-700 flex items-center justify-center text-stone-400 text-sm"
            data-aos="fade-left"
          >
            Google Maps embed placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import { footerColumns } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          © {year} Exclusive Doors. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx components/Footer.tsx
git commit -m "feat: add Contact and Footer sections"
```

---

## Task 12: Compose page.tsx and final build

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the placeholder `app/page.tsx` with the full page**

```tsx
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import StatsBar from '@/components/StatsBar';
import ProductSection from '@/components/ProductSection';
import CtaBand from '@/components/CtaBand';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { productSections } from '@/lib/data';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <CategoryGrid />
      <StatsBar />
      {productSections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}
      <CtaBand />
      <WhyUs />
      <Reviews />
      <Portfolio />
      <Blog />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: Build completes successfully. No TypeScript errors. Output shows all routes as static.

- [ ] **Step 3: Smoke-test locally**

```bash
npm run start
```
Open `http://localhost:3000` and verify:
- Sticky nav is visible, mega-menu appears on hover
- Hero fills viewport minus nav height
- All 4 product sections render with correct dark/light backgrounds
- FAQ accordion opens and closes
- AOS fade animations fire on scroll
- Footer shows correct year

- [ ] **Step 4: Final commit and push**

```bash
git add app/page.tsx
git commit -m "feat: compose full page and verify production build"
git push origin main
```

---

## Task 13: Deploy to Vercel

- [ ] **Step 1: Import project in Vercel**

Go to [vercel.com/new](https://vercel.com/new), import `Umbin765/exclusive-doors-next` from GitHub.

- [ ] **Step 2: Accept defaults**

Framework preset: **Next.js** (auto-detected). No environment variables needed. Click **Deploy**.

- [ ] **Step 3: Verify live URL**

Once deployed, open the Vercel URL and verify the page renders correctly.
