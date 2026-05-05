# Product Page — Design Spec
_Date: 2026-05-05_

## Goal
Add individual product pages and category listing pages to the Exclusive Doors Next.js site. Start with the Interior Doors category (Filomuro), then replicate the pattern for Exterior, Glisante, and Pivotante — each with a slightly different visual mood.

## Routes

| URL | Page |
|-----|------|
| `/products/interior` | Category listing — all interior door products |
| `/products/interior/filomuro` | Individual product page (interior, warm style) |
| `/products/exterior` | Category listing — all exterior door products |
| `/products/exterior/groke-thermosafe` | Individual product page (exterior, dark style) |
| `/products/glisante` | Category listing |
| `/products/glisante/liftant-culisant` | Individual product page |
| `/products/pivotante` | Category listing |
| `/products/pivotante/grand-pivot` | Individual product page |

Dynamic routes: `app/products/[category]/page.tsx` and `app/products/[category]/[slug]/page.tsx`.

## Navigation wiring
- Mega-menu top-level label (e.g. "Uși Interior") → `/products/interior`
- Mega-menu subcategory cards (e.g. "Filomuro") → `/products/interior/filomuro`
- Update `megaMenus` in `lib/data.ts` to add `href` fields on each card

## Design language
Matches the home page exactly:
- `rounded-xl` on image containers and cards, `rounded-lg` on thumbnails
- Accent colour `#F8AF17` for eyebrows, active states, hover borders
- Sharp buttons (no border-radius) — same as `Nav` CTA
- White / `stone-50` / `#f8f6f2` section backgrounds
- Typography: `font-bold tracking-[0.3em] uppercase text-accent` for eyebrows; `font-bold text-gray-900` for headings
- `border border-gray-900 hover:bg-gray-900 hover:text-white` for secondary CTA

## Product data model (`lib/data.ts`)

```ts
export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductFinish {
  color: string;   // CSS color string
  label: string;
}

export interface ScrollStop {
  eyebrow: string;
  title: string;
  body: string;
  stats: { num: string; label: string }[];
}

export interface DetailPanel {
  title: string;
  body: string;
  specKey: string;
  specVal: string;
  img: string;
}

export interface Product {
  slug: string;
  category: string;          // 'interior' | 'exterior' | 'glisante' | 'pivotante'
  eyebrow: string;           // e.g. "Ușă Interior · Filomuro"
  name: string;              // e.g. "Furnir Stejar Natural"
  model: string;             // e.g. "FLM-OAK-01 · La comandă"
  tags: string[];
  mainImg: string;
  thumbImgs: string[];       // 4 additional images
  specs: ProductSpec[];
  finishes: ProductFinish[];
  description: string;
  scrollStops: ScrollStop[]; // 3 stops for the sticky scroll section
  details: DetailPanel[];    // 3 detail zoom panels
}

export const products: Product[] = [ /* see section below */ ]
```

One placeholder product per category (4 total), using Unsplash images.

## Individual product page structure

### 1. Nav
Existing `<Nav />` component — no changes needed, mega-menu links updated.

### 2. Breadcrumb
Thin bar below nav: `Acasă / Uși Interior / Furnir Stejar Natural`
Background: `bg-stone-50`, `border-b border-gray-100`, `text-xs text-gray-400`

### 3. Split section
Two columns, `grid-cols-[1.15fr_1fr]`, full-width, white background.

**Left — Gallery**
- Background: `bg-stone-50`
- Main image: `rounded-xl overflow-hidden h-[340px] object-cover`
- Zoom hint badge: `absolute bottom-3 right-3 bg-white/75 backdrop-blur text-xs rounded-md` — "↔ Mărește"
- Thumbnail strip: 5 thumbnails, `rounded-lg h-[52px]`, amber `ring-2 ring-accent` on active
- Clicking thumbnail swaps main image (`useState`)

**Right — Details**
- Padding: `p-8`
- Eyebrow: `text-xs font-bold tracking-[0.3em] uppercase text-accent`
- Product name: `text-3xl font-bold text-gray-900 leading-tight`
- Model code: `text-xs text-gray-400 mt-1`
- Tags: small bordered pills `border border-gray-200 text-gray-400 text-[10px] tracking-widest px-2 py-1 rounded`
- Divider: `border-t border-gray-100`
- Specs table: key `text-sm text-gray-400` / value `text-sm font-semibold text-gray-800`, `border-b border-gray-50 py-2`
- Finish swatches: `w-6 h-6 rounded-full`, amber `ring-2 ring-offset-2 ring-accent` on active (`useState`)
- Primary CTA: `bg-gray-900 text-white text-sm font-bold tracking-widest py-4 text-center w-full` (sharp)
- Secondary CTA: `border border-gray-200 text-sm text-gray-500 py-3 text-center w-full` (sharp)
- Phone note: `text-xs text-gray-300 text-center`

### 4. Description band
`bg-stone-50 border-t border-gray-100 px-8 py-8`
- Section label: `text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300`
- Body: `text-sm text-gray-500 leading-relaxed max-w-xl`

### 5. Sticky scroll section — Apple style
`"use client"` component — `StickyScroll.tsx`

Layout: two columns `grid-cols-2 gap-0`

**Left — locked image**
- `position: sticky; top: 80px` (below nav height)
- `rounded-xl overflow-hidden h-[460px]`
- Image with `object-cover`
- Amber eyebrow badge top-left: `absolute top-4 left-4 bg-black/50 backdrop-blur text-accent text-[9px] tracking-widest px-3 py-1 rounded`

**Right — scroll stops**
- Three `<ScrollStop>` blocks stacked vertically, each ~`min-h-[50vh]` so they scroll past the locked image
- `IntersectionObserver` with `threshold: 0.5` tracks which stop is in view
- Active stop: full opacity, text slides up (`translateY(0) opacity(1)`)
- Inactive: `opacity-30`
- Each stop contains:
  - Amber eyebrow
  - Large title (`text-3xl font-bold`)
  - Body paragraph
  - Two stat chips side-by-side (`text-2xl font-bold` number + `text-[10px] uppercase text-gray-400` label)
- Dot indicators at bottom: 3 dots, active = amber `bg-accent`, inactive = `bg-gray-200`

Animation: CSS transitions only — `transition: opacity 400ms ease, transform 400ms ease` — no external animation library needed.

### 6. Detail zoom panels
Three cards in a `grid-cols-3 gap-4` row. Each card:
- `rounded-xl overflow-hidden border-2 border-transparent hover:border-accent transition-all`
- Photo: `h-[180px] object-cover group-hover:scale-105 transition-transform duration-500 overflow-hidden`
- Gradient overlay: `absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`
- Title overlaid on photo: `absolute bottom-3 left-4 font-bold text-white text-sm`
- Body: `p-4 text-sm text-gray-500`
- Spec row: `border-t border-gray-100 px-4 py-3 flex justify-between text-xs` — label gray, value `text-accent font-bold`

### 7. Related products
`bg-stone-50 border-t border-gray-100 px-8 py-8`
- Section label: same style as above
- `grid grid-cols-3 gap-4`
- Each card: `rounded-xl overflow-hidden border-2 border-transparent hover:border-accent shadow-sm`
- Photo `h-[80px] object-cover`
- Info: `p-3` — name `font-bold text-sm text-gray-900`, sub `text-xs text-gray-400`
- Links to sibling product pages

## Category listing page (`/products/[category]`)
- Hero band: eyebrow + heading (`Uși de interior la comandă`), `bg-stone-50 py-20`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` of product cards
- Each card: `rounded-xl overflow-hidden shadow-md hover:border-accent border-2 border-transparent`
- Links to individual product pages

## Category-specific moods

| Category | Background | Accent use | Mood |
|----------|-----------|------------|------|
| Interior | white / stone-50 | amber eyebrows + active thumb | Warm, residential |
| Exterior | gray-950 / gray-900 | amber badges + CTA bg | Dark, secure |
| Glisante | white / gray-50 | stat chips prominent | Airy, open |
| Pivotante | gray-950 | amber left accent line + large type | Bold, architectural |

For phase 1 (interior), only the warm/white mood is implemented. The other three moods are noted for future phases.

## File structure

```
app/
  products/
    [category]/
      page.tsx               ← category listing
      [slug]/
        page.tsx             ← product page (server component, composes client parts)
components/
  products/
    Breadcrumb.tsx           ← breadcrumb bar
    ProductGallery.tsx       ← "use client" — main img + thumbnail swap
    ProductDetails.tsx       ← specs, finishes, CTAs
    StickyScroll.tsx         ← "use client" — sticky image + IntersectionObserver stops
    DetailZoom.tsx           ← 3-card zoom panel row
    RelatedProducts.tsx      ← 3-card related row
    CategoryHero.tsx         ← category page hero band
    ProductCard.tsx          ← reusable card for category listing + related
lib/
  data.ts                    ← add Product type + products array
```

## Constraints
- No external animation libraries — CSS transitions + IntersectionObserver only
- No 3D model viewer
- Placeholder Unsplash images until PDF assets are provided
- Placeholder product data until manufacturer PDF is provided
- All CTAs link to `#contact` (same pattern as the rest of the site)
- Romanian language content throughout
- Mobile layout: single column (gallery above, details below); sticky scroll collapses to sequential sections
