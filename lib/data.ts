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
  tags: string;
  sub: string;
  img: string;
  href: string;
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
      { title: 'Pivot central',     desc: 'Design spectaculos cu pivot central.',                        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
      { title: 'Pivot offset',      desc: 'Impact vizual maxim cu pivot asimetric.',                     img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
      { title: 'Supradimensionate', desc: 'Modele la comandă pentru înălțimi și lățimi speciale.',       img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80' },
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
  {
    title: 'Uși Interior',
    tags: 'FILOMURO, FURNIR, STICLĂ, ALBE',
    sub: 'La comandă, adaptate la dimensiuni, finisaje și stil',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    href: '#interior',
  },
  {
    title: 'Uși Exterior',
    tags: 'ALUMINIU, LEMN, LA COMANDĂ',
    sub: 'Modele de calitate, configurate la comandă',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    href: '#exterior',
  },
  {
    title: 'Uși Glisante',
    tags: 'SISTEM GLISANT, PLIANTE, LIFTANT',
    sub: 'Elegante și funcționale, ideale pentru spații deschise',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    href: '#glisante',
  },
  {
    title: 'Uși Pivotante',
    tags: 'PIVOT CENTRAL, PIVOT OFFSET',
    sub: 'Design spectaculos pentru intrări de impact',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    href: '#pivotante',
  },
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
  { name: 'Andrei M.', date: 'Februarie 2025', text: 'Experiență excelentă! Ușile de interior alese împreună cu consultantul lor sunt exact ce căutam. Montajul a fost impecabil și în termen.' },
  { name: 'Elena D.',  date: 'Noiembrie 2024', text: 'Showroom-ul este spectaculos, cu o gamă impresionantă de produse. Echipa a fost profesionistă și răbdătoare cu toate întrebările mele.' },
  { name: 'Bogdan T.', date: 'Ianuarie 2025',  text: 'Am ales uși glisante pentru apartament. Calitate remarcabilă, livrare și montaj în termenul promis. Recomand cu toată încrederea!' },
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
