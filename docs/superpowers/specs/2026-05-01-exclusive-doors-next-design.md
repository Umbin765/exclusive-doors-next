# Exclusive Doors Next — Design Spec
_Date: 2026-05-01_

## Goal
Convert the existing `exclusive-doors` Laravel/Blade single-page marketing site into a Next.js 14 (App Router) project deployable to Vercel as a demo. Pixel-perfect parity with the original. No backend — all CTAs are decorative anchor links.

## Source
`/Users/tudor/projects/exclusive-doors/resources/views/pages/home.blade.php`
Single Blade template (~680 lines) with 16 numbered sections.

## Tech Stack
- **Framework:** Next.js 14, App Router
- **Styling:** Tailwind CSS (same palette as source: amber-400, stone-700/800/900, gray-900)
- **Animations:** AOS 2.3.1 via CDN script + a `"use client"` `AosInit` component in root layout
- **Images:** Same Unsplash URLs used directly (no next/image optimization needed for demo)
- **Language:** TypeScript
- **Deploy target:** Vercel (zero-config static export)

## Project Structure
```
exclusive-doors-next/
├── app/
│   ├── layout.tsx          # Root HTML shell; loads AosInit
│   ├── page.tsx            # Composes all 13 section components in order
│   └── globals.css         # @tailwind base/components/utilities
├── components/
│   ├── AosInit.tsx         # "use client" — runs AOS.init() on mount
│   ├── Nav.tsx             # "use client" — mega-menu hover (useState)
│   ├── Hero.tsx            # Hero with stats strip
│   ├── CategoryGrid.tsx    # 4-card 2×2/4×1 grid
│   ├── StatsBar.tsx        # Amber stats band
│   ├── ProductSection.tsx  # Reusable image+text section (imageLeft prop)
│   ├── CtaBand.tsx         # Amber CTA band
│   ├── WhyUs.tsx           # "De ce să alegi" section with feature list
│   ├── Reviews.tsx         # Google reviews grid
│   ├── Portfolio.tsx       # Portfolio hover-reveal grid
│   ├── Blog.tsx            # Blog teasers grid
│   ├── Faq.tsx             # "use client" — FAQ accordion (useState)
│   ├── Contact.tsx         # Showroom address + map placeholder
│   └── Footer.tsx          # 5-column footer
├── lib/
│   └── data.ts             # All static content (megaMenus, stats, reviews, FAQs…)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Component Details

### Client Components (interactive)
- **Nav.tsx** — `activeMenu: string | null` state drives mega-menu visibility via `onMouseEnter`/`onMouseLeave`. Matches Alpine.js `x-data="{ activeMenu: null }"` behaviour exactly.
- **Faq.tsx** — `open: number | null` state drives accordion. One open item at a time, matching original Alpine.js behaviour.
- **AosInit.tsx** — `useEffect` runs `AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' })` on mount. AOS script loaded via `next/script` in layout.

### Server Components (static)
All remaining components. No interactivity, no `"use client"` directive needed.

### Data Layer (`lib/data.ts`)
Exports typed constants:
- `megaMenus` — nav items with categories and photo cards
- `categories` — 4 category cards (CategoryGrid)
- `stats` — stats bar numbers
- `productSections` — 4 product sections with image, text, color variant
- `features` — WhyUs bullet points with SVG icon paths
- `reviews` — 3 Google review cards
- `portfolio` — 4 portfolio items
- `blogPosts` — 4 blog teasers
- `faqs` — 5 FAQ items
- `footerColumns` — 5 footer link columns

## Sections (in render order)
1. Nav + mega-menu
2. Hero (viewport height minus nav, background image + overlay)
3. Category grid (dark background)
4. Stats bar (amber)
5. Interior doors section (image left)
6. Exterior doors section (image right, dark bg)
7. Sliding doors section (image left)
8. Pivot doors section (image right, dark bg)
9. CTA band (amber)
10. Why Us (image left, feature list right)
11. Reviews (dark background)
12. Portfolio (dark background, hover reveal)
13. Blog teasers
14. FAQ accordion
15. Contact / showroom
16. Footer

## Constraints
- All anchor links (`#interior`, `#exterior`, etc.) preserved as-is
- Phone number and email preserved
- Romanian language content preserved verbatim
- No contact form submission — button links scroll to `#contact`
- No authentication, no database, no API routes
