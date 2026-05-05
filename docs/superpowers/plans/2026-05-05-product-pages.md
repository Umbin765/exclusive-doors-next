# Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add individual product pages and category listing pages to the Exclusive Doors Next.js site, starting with the interior doors design (warm/white), wired into the existing mega-menu navigation.

**Architecture:** Dynamic App Router routes (`app/products/[category]/page.tsx` and `app/products/[category]/[slug]/page.tsx`) pull data from a `products` array added to `lib/data.ts`. The product page composes several focused client/server components. Scroll animations use `IntersectionObserver` + CSS transitions — no external animation library.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, React `useState` + `useEffect` + `useRef`, native `IntersectionObserver`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `lib/data.ts` | Add `Product` type, `categoryMeta`, `products` array, `href` on `MegaMenuCard` |
| Modify | `components/Nav.tsx` | Wire card hrefs from updated `megaMenus` data |
| Create | `components/products/ProductCard.tsx` | Reusable card — used in category listing + related |
| Create | `components/products/Breadcrumb.tsx` | Breadcrumb bar below nav |
| Create | `components/products/ProductGallery.tsx` | `"use client"` — main img + thumbnail swap |
| Create | `components/products/ProductDetails.tsx` | Specs table, finish swatches, CTAs |
| Create | `components/products/StickyScroll.tsx` | `"use client"` — sticky img + `IntersectionObserver` stops |
| Create | `components/products/DetailZoom.tsx` | 3-card zoom panel row |
| Create | `components/products/RelatedProducts.tsx` | 3-card related products row |
| Create | `components/products/CategoryHero.tsx` | Hero band for category listing page |
| Create | `app/products/[category]/page.tsx` | Category listing page |
| Create | `app/products/[category]/[slug]/page.tsx` | Individual product page |

---

## Task 1: Add product types and data to `lib/data.ts`

**Files:**
- Modify: `lib/data.ts`

- [ ] **Step 1: Add `href` to `MegaMenuCard` and update `megaMenus` card hrefs**

Open `lib/data.ts`. Change the `MegaMenuCard` interface and update each card's `href`:

```ts
// Change this:
export interface MegaMenuCard {
  title: string;
  desc: string;
  img: string;
}

// To this:
export interface MegaMenuCard {
  title: string;
  desc: string;
  img: string;
  href: string;
}
```

Then update the cards in `megaMenus` to include hrefs:

```ts
export const megaMenus: Record<string, MegaMenuItem> = {
  interior: {
    label: 'Uși Interior',
    href: '/products/interior',
    categories: ['Filomuro', 'Furniruite', 'Albe vopsite', 'Laminate', 'Din sticlă', 'HGM', 'Grauthoff'],
    heading: 'Tipuri de uși interior',
    cards: [
      { title: 'Filomuro',     desc: 'La nivel cu peretele, pentru un aspect modern și îngrijit.',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',  href: '/products/interior/filomuro' },
      { title: 'Albe vopsite', desc: 'Uși de interior vopsite în alb, luminoase și elegante.',        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', href: '/products/interior/filomuro' },
      { title: 'Laminate',     desc: 'Uși de interior laminate, pentru un aspect cald și natural.',   img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',  href: '/products/interior/filomuro' },
    ],
  },
  exterior: {
    label: 'Uși Exterior',
    href: '/products/exterior',
    categories: ['Metalice antiefracție', 'Termice GROKE', 'Superlock', 'Hörmann', 'Personalizate'],
    heading: 'Tipuri de uși exterior',
    cards: [
      { title: 'Termice GROKE', desc: 'Uși de exterior termice GROKE — izolare superioară și securitate.',  img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', href: '/products/exterior/groke-thermosafe' },
      { title: 'Hörmann',       desc: 'Uși de exterior Hörmann, clasice și durabile.',                     img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80', href: '/products/exterior/groke-thermosafe' },
      { title: 'Personalizate', desc: 'Soluții complet personalizate pentru orice proiect.',                img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', href: '/products/exterior/groke-thermosafe' },
    ],
  },
  glisante: {
    label: 'Uși Glisante',
    href: '/products/glisante',
    categories: ['Sistem glisant', 'Liftant-culisant', 'Pliante', 'Telescopice'],
    heading: 'Tipuri de uși glisante',
    cards: [
      { title: 'Sistem glisant',   desc: 'Elegante și funcționale, ideale pentru spații deschise.',  img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', href: '/products/glisante/liftant-culisant' },
      { title: 'Liftant-culisant', desc: 'Sisteme liftant-culisante pentru deschideri mari.',         img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',  href: '/products/glisante/liftant-culisant' },
      { title: 'Pliante',          desc: 'Uși pliante pentru separarea elegantă a spațiilor.',       img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', href: '/products/glisante/liftant-culisant' },
    ],
  },
  pivotante: {
    label: 'Uși Pivotante',
    href: '/products/pivotante',
    categories: ['Pivot central', 'Pivot offset', 'Design supradimensionat'],
    heading: 'Tipuri de uși pivotante',
    cards: [
      { title: 'Pivot central',     desc: 'Design spectaculos cu pivot central.',                        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', href: '/products/pivotante/grand-pivot' },
      { title: 'Pivot offset',      desc: 'Impact vizual maxim cu pivot asimetric.',                     img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',  href: '/products/pivotante/grand-pivot' },
      { title: 'Supradimensionate', desc: 'Modele la comandă pentru înălțimi și lățimi speciale.',       img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80', href: '/products/pivotante/grand-pivot' },
    ],
  },
};
```

- [ ] **Step 2: Add product-related types at the end of the interfaces section**

Add after the `FooterColumn` interface:

```ts
export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductFinish {
  color: string;
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
  category: string;
  eyebrow: string;
  name: string;
  model: string;
  tags: string[];
  mainImg: string;
  thumbImgs: string[];
  specs: ProductSpec[];
  finishes: ProductFinish[];
  description: string;
  scrollStops: ScrollStop[];
  details: DetailPanel[];
}

export interface CategoryMeta {
  label: string;
  heading: string;
  sub: string;
}
```

- [ ] **Step 3: Add `categoryMeta` and `products` data at the end of the data section**

Add after `footerColumns`:

```ts
export const categoryMeta: Record<string, CategoryMeta> = {
  interior: {
    label: 'Uși Interior',
    heading: 'Uși de interior la comandă',
    sub: 'Filomuro, furniruite, albe vopsite și laminate — adaptate la dimensiuni, finisaje și stilul fiecărui spațiu.',
  },
  exterior: {
    label: 'Uși Exterior',
    heading: 'Uși de exterior premium',
    sub: 'Metalice antiefracție, termice și personalizate — securitate, izolare și estetică pentru orice proiect.',
  },
  glisante: {
    label: 'Uși Glisante',
    heading: 'Uși glisante la comandă',
    sub: 'Sisteme glisante, liftant-culisante și pliante — elegante, funcționale, livrare și montaj în toată țara.',
  },
  pivotante: {
    label: 'Uși Pivotante',
    heading: 'Uși pivotante de design',
    sub: 'Pivot central sau offset — statement-ul perfect pentru o intrare de impact, disponibil la orice dimensiune.',
  },
};

export const products: Product[] = [
  {
    slug: 'filomuro',
    category: 'interior',
    eyebrow: 'Ușă Interior · Filomuro',
    name: 'Furnir Stejar Natural',
    model: 'FLM-OAK-01 · La comandă',
    tags: ['Filomuro', 'Furnir natural', 'La comandă'],
    mainImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    thumbImgs: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
    ],
    specs: [
      { key: 'Material', value: 'Furnir stejar natural' },
      { key: 'Sistem', value: 'Filomuro (flush wall)' },
      { key: 'Izolație fonică', value: '38 dB' },
      { key: 'Înălțime maximă', value: '3000 mm' },
      { key: 'Garanție', value: '5 ani' },
    ],
    finishes: [
      { color: '#c8a96e', label: 'Stejar natural' },
      { color: '#6b4c2a', label: 'Nuc' },
      { color: '#f0f0f0', label: 'Alb mat' },
      { color: '#2a2a2a', label: 'Negru mat' },
      { color: '#b8b0a0', label: 'Gri deschis' },
    ],
    description: 'Ușile Filomuro sunt montate la nivel cu peretele, creând o suprafață continuă fără toc vizibil. Disponibile cu furnir de stejar natural, nuc, sau în variante vopsite mat. Ideale pentru proiecte premium cu finisaje îngrijite și arhitectură contemporană. Substrat MDF hidrofug 19mm, garnituri perimetrale triple.',
    scrollStops: [
      {
        eyebrow: 'Sistem Filomuro',
        title: 'La nivel cu peretele',
        body: 'Toc invizibil integrat în structura peretelui. Suprafață continuă, fără întreruperi vizuale. Rezultatul: o cameră care respiră.',
        stats: [{ num: '0mm', label: 'Toc vizibil' }, { num: '3000', label: 'Înălțime max mm' }],
      },
      {
        eyebrow: 'Izolație fonică',
        title: '38 dB de liniște',
        body: 'Garnituri perimetrale triple și panou central cu masă mare. Zgomotul rămâne afară, confortul rămâne înăuntru.',
        stats: [{ num: '38 dB', label: 'Izolație' }, { num: '3×', label: 'Garnituri' }],
      },
      {
        eyebrow: 'Finisaj furnir',
        title: 'Stejar natural sau la alegere',
        body: 'Furnir tăiat sfert, stratificat pe MDF hidrofug. Disponibil în stejar, nuc, frasin și 40+ culori RAL vopsite mat.',
        stats: [{ num: '40+', label: 'Finisaje' }, { num: '5 ani', label: 'Garanție' }],
      },
    ],
    details: [
      {
        title: 'Mâner & închidere',
        body: 'Design minimalist integrat. Sistem de închidere multipunct cu clapetă magnetică silențioasă.',
        specKey: 'Mecanism',
        specVal: 'Multipunct',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      },
      {
        title: 'Toc invizibil',
        body: 'Toc integrat în perete cu finisaj continuu. Joc de 2mm pe perimetru, garnitură magnetică inclusă.',
        specKey: 'Joc perimetral',
        specVal: '2 mm',
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      },
      {
        title: 'Furnir natural',
        body: 'Furnir stejar tăiat sfert, aplicat pe MDF 19mm. Fibra lemnului vizibilă, cu protecție UV inclusă.',
        specKey: 'Substrat',
        specVal: 'MDF 19mm',
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      },
    ],
  },
  {
    slug: 'groke-thermosafe',
    category: 'exterior',
    eyebrow: 'Ușă Exterior · GROKE',
    name: 'Thermosafe 90',
    model: 'GRK-TS90 · La comandă',
    tags: ['Antiefracție RC3', 'Termoizolantă', 'La comandă'],
    mainImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    thumbImgs: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    ],
    specs: [
      { key: 'Material', value: 'Aluminiu' },
      { key: 'Izolație termică', value: '1.0 W/m²K' },
      { key: 'Antiefracție', value: 'RC3' },
      { key: 'Izolație fonică', value: '42 dB' },
      { key: 'Garanție', value: '10 ani' },
    ],
    finishes: [
      { color: '#1a1a1a', label: 'Negru mat' },
      { color: '#c0c0c0', label: 'Argintiu' },
      { color: '#8b7355', label: 'Bronze' },
      { color: '#f5f5f5', label: 'Alb RAL 9016' },
    ],
    description: 'Ușile GROKE Thermosafe sunt soluția premium pentru intrări rezidențiale de înaltă performanță. Profil din aluminiu reciclabil, garnituri triple, sisteme de blocare multipunct și finisaje anodizate sau vopsite în orice culoare RAL. Disponibile la orice dimensiune, inclusiv formate supradimensionate.',
    scrollStops: [
      {
        eyebrow: 'Securitate RC3',
        title: 'Rezistentă la efracție',
        body: 'Clasă de rezistență RC3 — testată la 3 minute de atac cu scule de efracție. Oțel armat în interiorul profilului de aluminiu.',
        stats: [{ num: 'RC3', label: 'Clasă efracție' }, { num: '3 min', label: 'Rezistență atac' }],
      },
      {
        eyebrow: 'Termoizolație',
        title: '1.0 W/m²K — performanță pasivă',
        body: 'Rupere de punte termică integrată. Pierderile de căldură reduse cu până la 40% față de o ușă standard.',
        stats: [{ num: '1.0', label: 'W/m²K' }, { num: '40%', label: 'Economie energie' }],
      },
      {
        eyebrow: 'Finisaj aluminiu',
        title: 'Orice culoare RAL',
        body: 'Vopsire electrostatică în câmp electrostatic, rezistentă la UV și coroziune. Anodizare disponibilă pentru un look premium metalic.',
        stats: [{ num: '200+', label: 'Culori RAL' }, { num: '10 ani', label: 'Garanție' }],
      },
    ],
    details: [
      {
        title: 'Sistem de închidere',
        body: 'Broască multipunct GROKE cu 5 puncte de ancorare. Cilindru antiefracție inclus.',
        specKey: 'Puncte blocare',
        specVal: '5',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      },
      {
        title: 'Profil aluminiu',
        body: 'Secțiune 90mm cu ruptură de punte termică dublă. Panou central din spumă poliuretanică.',
        specKey: 'Secțiune profil',
        specVal: '90 mm',
        img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
      },
      {
        title: 'Garnituri triple',
        body: 'Trei rânduri de garnituri EPDM pe perimetru. Etanșare perfectă la apă, vânt și zgomot.',
        specKey: 'Izolație fonică',
        specVal: '42 dB',
        img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      },
    ],
  },
  {
    slug: 'liftant-culisant',
    category: 'glisante',
    eyebrow: 'Ușă Glisantă · Sistem',
    name: 'Liftant-Culisant 200',
    model: 'LC-200 · La comandă',
    tags: ['Liftant-culisant', 'Termoizolant', 'La comandă'],
    mainImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80',
    thumbImgs: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    ],
    specs: [
      { key: 'Sistem', value: 'Liftant-culisant' },
      { key: 'Deschidere maximă', value: '6000 mm' },
      { key: 'Izolație termică', value: '0.8 W/m²K' },
      { key: 'Izolație fonică', value: '42 dB' },
      { key: 'Garanție', value: '10 ani' },
    ],
    finishes: [
      { color: '#1a1a1a', label: 'Negru mat' },
      { color: '#f0f0f0', label: 'Alb RAL 9016' },
      { color: '#c0c0c0', label: 'Argintiu anodizat' },
      { color: '#8b7355', label: 'Bronze' },
    ],
    description: 'Sistemul liftant-culisant permite deschideri de până la 6 metri cu un singur gest. Panoul se ridică ușor de pe pragul de etanșare și culisează lin pe șine ascunse. Ideal pentru case cu terasă sau grădină, aducând lumina naturală adânc în interior.',
    scrollStops: [
      {
        eyebrow: 'Mecanism liftant',
        title: 'Se ridică, apoi culisează',
        body: 'La acționarea mânerului, panoul se ridică 3mm de pe pragul de etanșare și culisează fără frecare. Un singur gest, o deschidere spectaculoasă.',
        stats: [{ num: '3mm', label: 'Lift la acționare' }, { num: '6m', label: 'Deschidere max' }],
      },
      {
        eyebrow: 'Termoizolație',
        title: '0.8 W/m²K — standard pasiv',
        body: 'Profilul de aluminiu cu ruptură de punte termică triplă și sticlă dublă sau triplă low-e. Potrivit pentru case pasive.',
        stats: [{ num: '0.8', label: 'W/m²K' }, { num: 'Triple', label: 'Garnituri' }],
      },
      {
        eyebrow: 'Sticlă & lumină',
        title: 'Până la 90% transparență',
        body: 'Ramă minimă de 45mm. Suprafața vitrata maximizată. Sticlă securizată sau laminată la alegere, cu control solar opțional.',
        stats: [{ num: '45mm', label: 'Ramă profil' }, { num: '90%', label: 'Suprafață sticlă' }],
      },
    ],
    details: [
      {
        title: 'Mâner & mecanism',
        body: 'Mâner ergonomic cu blocare multipunct automată. Senzor de poziție inclus pe sistemele cu motorede acționare.',
        specKey: 'Tip acționare',
        specVal: 'Manual / Motor',
        img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      },
      {
        title: 'Prag ascuns',
        body: 'Prag cu înălțime redusă de 20mm — acces fără obstacole, ideal pentru spații cu pardoseală continuă interior-exterior.',
        specKey: 'Înălțime prag',
        specVal: '20 mm',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      },
      {
        title: 'Șine de rulare',
        body: 'Șine din oțel inoxidabil cu role cu rulmenți. Sarcina maximă per panou: 400kg. Funcționare silențioasă garantată.',
        specKey: 'Sarcină max panou',
        specVal: '400 kg',
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      },
    ],
  },
  {
    slug: 'grand-pivot',
    category: 'pivotante',
    eyebrow: 'Ușă Pivotantă · Design',
    name: 'Grand Pivot',
    model: 'GPV-01 · La comandă',
    tags: ['Pivot central', 'Supradimensionată', 'La comandă'],
    mainImg: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
    thumbImgs: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    ],
    specs: [
      { key: 'Tip pivot', value: 'Central / Offset' },
      { key: 'Înălțime maximă', value: '3500 mm' },
      { key: 'Lățime maximă', value: '1500 mm' },
      { key: 'Greutate maximă', value: '400 kg' },
      { key: 'Garanție', value: '10 ani' },
    ],
    finishes: [
      { color: '#1a1a1a', label: 'Negru mat' },
      { color: '#c8a96e', label: 'Furnir stejar' },
      { color: '#6b4c2a', label: 'Furnir nuc' },
      { color: '#f0f0f0', label: 'Alb mat' },
      { color: '#c0c0c0', label: 'Inox periat' },
    ],
    description: 'Ușile Grand Pivot sunt statement-ul perfect pentru o intrare de impact. Pivot central sau offset — disponibil la orice dimensiune, inclusiv formate supradimensionate până la 3500mm înălțime. Construcție cu miez din aluminiu turnat, placată cu furnir natural sau vopsită în orice culoare RAL.',
    scrollStops: [
      {
        eyebrow: 'Mecanism pivot',
        title: 'Rotire pe pivot central',
        body: 'Pivotul este integrat în pardoseală și tavan, invizibil. Ușa se rotește în jurul axei centrale cu un gest minim — spectacol garantat.',
        stats: [{ num: '180°', label: 'Unghi rotire' }, { num: '3500', label: 'Înălțime max mm' }],
      },
      {
        eyebrow: 'Construcție',
        title: 'Până la 400 kg — solid ca piatra',
        body: 'Miez din aluminiu turnat, placaj structurat, placă exterioară la alegere. Rulmenți cu bile sigilați pentru 500.000 cicluri garantate.',
        stats: [{ num: '400 kg', label: 'Greutate max' }, { num: '500K', label: 'Cicluri garantate' }],
      },
      {
        eyebrow: 'Design',
        title: 'Orice finisaj, orice dimensiune',
        body: 'Furnir natural, vopsit RAL, inox periat sau combinații. Sticlă integrată disponibilă. Fiecare piesă este unică și fabricată la comandă.',
        stats: [{ num: '100%', label: 'La comandă' }, { num: '10 ani', label: 'Garanție' }],
      },
    ],
    details: [
      {
        title: 'Pivot & rulmenți',
        body: 'Pivot din oțel inoxidabil cu rulmenți cu bile sigilați. Suportă 400kg, funcționare silențioasă și lină garantată 10 ani.',
        specKey: 'Sarcină max',
        specVal: '400 kg',
        img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
      },
      {
        title: 'Miez structural',
        body: 'Miez din aluminiu turnat în tipar, ranforsare perimetrală cu profil de oțel. Rigid, ușor, fără deformare în timp.',
        specKey: 'Material miez',
        specVal: 'Aluminiu turnat',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      },
      {
        title: 'Finisaj furnir',
        body: 'Furnir natural tăiat sfert, aplicat pe ambele fețe. Protecție UV și lac mat sau satinat la alegere.',
        specKey: 'Grosime furnir',
        specVal: '0.6 mm',
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      },
    ],
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add product types, categoryMeta, and product data to lib/data.ts"
```

---

## Task 2: Update Nav to use card hrefs

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Wire card hrefs in the mega-menu**

In `components/Nav.tsx`, find the card link `<a key={card.title} href="#">` and replace `href="#"` with `href={card.href}`:

```tsx
// Find this line (~line 73):
<a key={card.title} href="#" className="group">

// Replace with:
<a key={card.title} href={card.href} className="group">
```

Also wire the top-level menu label href. Find `<a href={menu.href}` — this already uses `menu.href` so it will automatically point to `/products/interior` etc. after the data update. No change needed there.

- [ ] **Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: wire mega-menu card links to product pages"
```

---

## Task 3: Create `ProductCard` component

**Files:**
- Create: `components/products/ProductCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { Product } from '@/lib/data';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block rounded-xl overflow-hidden border-2 border-transparent hover:border-accent shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="overflow-hidden h-56">
        <img
          src={product.mainImg}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 bg-white">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-1">
          {product.eyebrow}
        </p>
        <h3 className="font-bold text-gray-900 text-base leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-1">{product.model}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="border border-gray-200 text-gray-400 text-[9px] tracking-widest px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/ProductCard.tsx
git commit -m "feat: add ProductCard component"
```

---

## Task 4: Create `Breadcrumb` component

**Files:**
- Create: `components/products/Breadcrumb.tsx`

- [ ] **Step 1: Create the file**

```tsx
import Link from 'next/link';
import { categoryMeta } from '@/lib/data';

interface Props {
  category: string;
  productName: string;
}

export default function Breadcrumb({ category, productName }: Props) {
  const label = categoryMeta[category]?.label ?? category;
  return (
    <div className="bg-stone-50 border-b border-gray-100 px-6 py-2.5">
      <p className="text-[10px] text-gray-400 tracking-wide">
        <Link href="/" className="hover:text-accent transition-colors">Acasă</Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link href={`/products/${category}`} className="hover:text-accent transition-colors">{label}</Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-600 font-medium">{productName}</span>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/Breadcrumb.tsx
git commit -m "feat: add Breadcrumb component"
```

---

## Task 5: Create `ProductGallery` component

**Files:**
- Create: `components/products/ProductGallery.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useState } from 'react';

interface Props {
  mainImg: string;
  thumbImgs: string[];
  alt: string;
}

export default function ProductGallery({ mainImg, thumbImgs, alt }: Props) {
  const allImgs = [mainImg, ...thumbImgs];
  const [active, setActive] = useState(0);

  return (
    <div className="bg-stone-50 p-5 flex flex-col gap-3">
      {/* Main image */}
      <div className="relative rounded-xl overflow-hidden h-[340px]">
        <img
          src={allImgs[active]}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <span className="absolute bottom-3 right-3 bg-white/75 backdrop-blur-sm text-gray-500 text-[9px] tracking-widest px-2.5 py-1 rounded-md">
          ↔ Mărește
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {allImgs.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg overflow-hidden h-[52px] border-2 transition-all duration-200 ${
              active === i ? 'ring-2 ring-accent ring-offset-1 border-transparent' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/ProductGallery.tsx
git commit -m "feat: add ProductGallery component with thumbnail swap"
```

---

## Task 6: Create `ProductDetails` component

**Files:**
- Create: `components/products/ProductDetails.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';

export default function ProductDetails({ product }: { product: Product }) {
  const [activeFinish, setActiveFinish] = useState(0);

  return (
    <div className="bg-white border-l border-gray-100 p-8 flex flex-col gap-5">

      {/* Identity */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-2">
          {product.eyebrow}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
        <p className="text-xs text-gray-400 mt-1.5">{product.model}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="border border-gray-200 text-gray-400 text-[9px] tracking-widest px-2.5 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* Specs */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-3">
          Specificații
        </p>
        {product.specs.map((spec) => (
          <div key={spec.key} className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-400">{spec.key}</span>
            <span className="text-sm font-semibold text-gray-800">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Finish swatches */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-3">
          Finisaje disponibile
        </p>
        <div className="flex gap-2.5 items-center">
          {product.finishes.map((finish, i) => (
            <button
              key={finish.label}
              onClick={() => setActiveFinish(i)}
              title={finish.label}
              className={`w-6 h-6 rounded-full transition-all duration-200 ${
                activeFinish === i
                  ? 'ring-2 ring-accent ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ background: finish.color, border: finish.color === '#f0f0f0' ? '1px solid #ddd' : 'none' }}
            />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-2">
          {product.finishes[activeFinish].label} · {product.finishes.length - 1} alte variante disponibile
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5 pt-1">
        <a
          href="#contact"
          className="bg-gray-900 text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 text-center hover:bg-gray-700 transition-colors"
        >
          Cere ofertă personalizată
        </a>
        <a
          href="#contact"
          className="border border-gray-200 text-gray-500 text-[11px] py-3.5 text-center hover:border-gray-400 transition-colors"
        >
          Programare showroom
        </a>
        <p className="text-[10px] text-gray-300 text-center pt-1">
          📞 0728 959 652 · Consultanță gratuită
        </p>
      </div>

    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/ProductDetails.tsx
git commit -m "feat: add ProductDetails component with specs, finishes, CTAs"
```

---

## Task 7: Create `StickyScroll` component

**Files:**
- Create: `components/products/StickyScroll.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollStop } from '@/lib/data';

interface Props {
  stops: ScrollStop[];
  img: string;
  badge: string;
}

export default function StickyScroll({ stops, img, badge }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stopRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="grid grid-cols-2 border-t border-gray-100">

      {/* LEFT — sticky image */}
      <div className="relative bg-stone-50 p-6">
        <div className="sticky top-20">
          <div className="rounded-xl overflow-hidden h-[460px]">
            <img src={img} alt={badge} className="w-full h-full object-cover" />
          </div>
          <span className="absolute top-9 left-9 bg-black/50 backdrop-blur-sm text-accent text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded">
            {badge}
          </span>
          {/* Dot indicators */}
          <div className="flex gap-2 justify-center mt-5">
            {stops.map((_, i) => (
              <button
                key={i}
                onClick={() => stopRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-accent' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — scroll stops */}
      <div className="bg-white border-l border-gray-100">
        {stops.map((stop, i) => (
          <div
            key={i}
            ref={(el) => { stopRefs.current[i] = el; }}
            className={`min-h-[60vh] flex flex-col justify-center px-12 py-16 border-b border-gray-50 transition-all duration-500 ${
              activeIndex === i
                ? 'opacity-100 translate-y-0'
                : 'opacity-25 translate-y-2'
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-4">
              {stop.eyebrow}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-5">
              {stop.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
              {stop.body}
            </p>
            <div className="flex gap-10">
              {stop.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900">{stat.num}</div>
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/StickyScroll.tsx
git commit -m "feat: add StickyScroll component with IntersectionObserver"
```

---

## Task 8: Create `DetailZoom` component

**Files:**
- Create: `components/products/DetailZoom.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { DetailPanel } from '@/lib/data';

export default function DetailZoom({ details }: { details: DetailPanel[] }) {
  return (
    <section className="bg-white border-t border-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-8">
          Detalii tehnice
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {details.map((panel) => (
            <div
              key={panel.title}
              className="group rounded-xl overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={panel.img}
                  alt={panel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-3 left-4 font-bold text-white text-sm">
                  {panel.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 leading-relaxed">{panel.body}</p>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-300">
                  {panel.specKey}
                </span>
                <span className="text-sm font-bold text-accent">{panel.specVal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/DetailZoom.tsx
git commit -m "feat: add DetailZoom component"
```

---

## Task 9: Create `RelatedProducts` component

**Files:**
- Create: `components/products/RelatedProducts.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="bg-stone-50 border-t border-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-8">
          Din aceeași categorie
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/RelatedProducts.tsx
git commit -m "feat: add RelatedProducts component"
```

---

## Task 10: Create `CategoryHero` component

**Files:**
- Create: `components/products/CategoryHero.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { categoryMeta } from '@/lib/data';

export default function CategoryHero({ category }: { category: string }) {
  const meta = categoryMeta[category] ?? { label: category, heading: category, sub: '' };
  return (
    <section className="bg-stone-50 border-b border-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-4">
          {meta.label}
        </p>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-2xl">
          {meta.heading}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-xl">{meta.sub}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/products/CategoryHero.tsx
git commit -m "feat: add CategoryHero component"
```

---

## Task 11: Create category listing page

**Files:**
- Create: `app/products/[category]/page.tsx`

- [ ] **Step 1: Create the directory and file**

```tsx
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import { products, categoryMeta } from '@/lib/data';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  if (!categoryMeta[category]) notFound();

  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <>
      <Nav />
      <CategoryHero category={category} />
      <section className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the dev server renders the page**

Run `npm run dev` and open `http://localhost:3000/products/interior`. You should see the hero band and one product card (Filomuro).

- [ ] **Step 3: Commit**

```bash
git add app/products/
git commit -m "feat: add category listing page"
```

---

## Task 12: Create individual product page

**Files:**
- Create: `app/products/[category]/[slug]/page.tsx`

- [ ] **Step 1: Create the directory and file**

```tsx
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductGallery from '@/components/products/ProductGallery';
import ProductDetails from '@/components/products/ProductDetails';
import StickyScroll from '@/components/products/StickyScroll';
import DetailZoom from '@/components/products/DetailZoom';
import RelatedProducts from '@/components/products/RelatedProducts';
import { products, categoryMeta } from '@/lib/data';

interface Props {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export default function ProductPage({ params }: Props) {
  const { category, slug } = params;
  const product = products.find((p) => p.category === category && p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === category && p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Nav />
      <Breadcrumb category={category} productName={product.name} />

      {/* Split: gallery left, details right */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        <ProductGallery
          mainImg={product.mainImg}
          thumbImgs={product.thumbImgs}
          alt={product.name}
        />
        <ProductDetails product={product} />
      </section>

      {/* Description */}
      <div className="bg-stone-50 border-t border-gray-100 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-4">
            Despre produs
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{product.description}</p>
        </div>
      </div>

      {/* Sticky scroll section */}
      <StickyScroll
        stops={product.scrollStops}
        img={product.mainImg}
        badge={product.eyebrow}
      />

      {/* Detail zoom panels */}
      <DetailZoom details={product.details} />

      {/* Related products */}
      <RelatedProducts products={related} />

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify all four product pages render**

With `npm run dev` still running, open each URL and check for errors:
- `http://localhost:3000/products/interior/filomuro`
- `http://localhost:3000/products/exterior/groke-thermosafe`
- `http://localhost:3000/products/glisante/liftant-culisant`
- `http://localhost:3000/products/pivotante/grand-pivot`

Each should show: nav → breadcrumb → split (gallery + details) → description → sticky scroll → detail zooms → related → footer.

- [ ] **Step 3: Verify sticky scroll behaviour**

On the interior product page, scroll down through the sticky scroll section. The door photo should stay fixed on the left while the three text stops (`La nivel cu peretele`, `38 dB de liniște`, `Stejar natural sau la alegere`) fade in and out on the right. The dot indicators should advance.

- [ ] **Step 4: Commit and push**

```bash
git add app/products/
git commit -m "feat: add individual product page with sticky scroll and detail zooms"
git push origin main
```

---

## Self-Review

**Spec coverage check:**
- ✅ Routes `/products/[category]` and `/products/[category]/[slug]` — Tasks 11 + 12
- ✅ Nav mega-menu wired — Task 2
- ✅ Product data model — Task 1
- ✅ Split layout (gallery left, details right) — Tasks 5 + 6 + 12
- ✅ Breadcrumb — Task 4
- ✅ Thumbnail swap — Task 5
- ✅ Specs table — Task 6
- ✅ Finish swatches — Task 6
- ✅ CTAs linking to `#contact` — Task 6
- ✅ Description band — Task 12
- ✅ Sticky scroll with IntersectionObserver — Task 7
- ✅ Detail zoom panels — Task 8
- ✅ Related products — Task 9
- ✅ Category listing page with hero — Tasks 10 + 11
- ✅ `generateStaticParams` for static export — Tasks 11 + 12
- ✅ No external animation libraries — Task 7 uses only CSS transitions + IntersectionObserver
- ✅ Romanian language throughout — all data in Task 1
- ✅ All placeholder images from Unsplash — Task 1
