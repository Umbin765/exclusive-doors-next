// ─── Types ───────────────────────────────────────────────────────────────────

export interface MegaMenuCard {
  title: string;
  desc: string;
  img: string;
  href: string;
  salePercent?: number;
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
  ctaLabel: string;
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

export interface FallbackGoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export const fallbackGoogleReviews: FallbackGoogleReview[] = [
  {
    author_name: 'Cristina Constantin',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocI0R_Pzn1KYpW9CoP1zy_hwYTbRVZ8sehXsDseO9mLjEczp=s128-c0x00000000-cc-rp-mo-ba4',
    rating: 5,
    relative_time_description: 'acum 9 luni',
    text: 'Am mers la Exclusive Doors căutând o ușă cât mai calitativă, atât din punct de vedere al siguranței dar și pentru izolare termică și fonică. Doamna Monica a fost foarte amabilă încă de la prima conversație telefonică. Am ales o ușă de exterior Groke complet din aluminiu. Montajul a fost super ok. Recomand atât ușa în sine cât și Exclusive Doors și pe doamna Monica.',
  },
  {
    author_name: 'Bianca N',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocKe8pG65Kn_sksrZMC7_MoUGnHWrnJzxU8Ta5lH8hKolG7yLg=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    relative_time_description: 'acum 5 luni',
    text: 'Am avut o experiență foarte bună cu dvs (și cu colegul dvs. Robert). Am primit explicații prompte și detaliate de fiecare dată, ne-ați ghidat în alegerea opțiunilor disponibile într-un mod care să ne asigure că primim cel mai bun raport calitate-preț și cele mai bune soluții. Vă mulțumim și cu siguranță vom reveni la dvs. pentru următorul nostru proiect.',
  },
  {
    author_name: 'Ashraf AL Kebsi',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocLjIbt26Xy9usXgthQOkC1Z1ZzInOAZcfQDy3BJh5-8o8VKaQ=s128-c0x00000000-cc-rp-mo-ba2',
    rating: 5,
    relative_time_description: 'acum un an',
    text: 'O echipă profesională, promptă, eficientă și precisă. Din momentul în care am discutat telefonic, vizitat showroomul elegant unde am putut afla foarte multe informații utile care ne-au ajutat să luăm cea mai bună decizie, calitatea materialelor și sistemelor de închidere și până la eficiența echipei de montaj. Îi recomand cu încredere!',
  },
  {
    author_name: 'Cristi Dandes',
    profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjVvRFrZ69I5OPT0S4fzXkx2sLglpGyRJsF5phQBf-DUzoBHBKwy=s128-c0x00000000-cc-rp-mo-ba3',
    rating: 5,
    relative_time_description: 'acum 4 ani',
    text: 'Ușa pe care am comandat-o este mult peste ceea ce ne-am imaginat că ar putea fi o ușă de intrare. Deși ne-am convins din showroom că au niște materiale și sisteme extrem de calitative, când am văzut în realitate cum arată ne-a surprins complet. Toată interacțiunea, atât în showroom, cât și la montaj, sunt peste orice customer service întâlnit în România.',
  },
  {
    author_name: 'Marian Tatarusanu',
    profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjX2HKyQk_xduX_ySFFogMnXH-u6sBxowOpaYh16Tz2DMxu_tRUs=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    relative_time_description: 'acum 2 ani',
    text: 'Mulțumesc echipei pentru încă o colaborare la cele mai înalte standarde. Tocmai ce am finalizat lucrările la GrandAV133 unde echipa s-a ocupat de parchet și uși. Profesionalism desăvârșit, termene respectate și rezultate impecabile.',
  },
  {
    author_name: 'Catalin Iatan',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocJHfI23Ep4PnDJHCqzXjklhw6UQixDyi-9mF839d-uTYMnm-Q=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    relative_time_description: 'acum 2 ani',
    text: 'Sunt foarte mulțumit de echipă și de produsele pe care le-am cumpărat (storuri și ușă exterior). Deși prețurile sunt mari, produsele sunt de calitate. Specialiștii cu care am vorbit au fost foarte competenți, iar consultanța primită a fost excelentă. Recomand cu încredere!',
  },
  {
    author_name: 'Andrei Moldovan',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocJ1nKHQkFxFzFqFWRGHgNyqTkWNeD3gCp8Y1tKYxDmT=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    relative_time_description: 'acum 6 luni',
    text: 'Experiență excelentă de la început până la final. Showroom-ul impresionant, consultanța profesionistă, iar montajul realizat impecabil. Ușa de exterior arată superb și funcționează perfect. Mulțumesc echipei Exclusive Doors!',
  },
  {
    author_name: 'Ioana Petrescu',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocKmRTvHxF2eGwK1nPqL8cVs3tNWdJpXo2RbY4mQsZl=s128-c0x00000000-cc-rp-mo',
    rating: 4,
    relative_time_description: 'acum 1 an',
    text: 'Produse de calitate superioară și personal amabil. Am achiziționat uși de interior pentru întreaga casă și sunt foarte mulțumită de rezultat. Termenele au fost respectate, iar montajul a fost realizat cu atenție la detalii. Recomand!',
  },
];

export interface PortfolioItem {
  title: string;
  subtitle: string;
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
    href: '/products/interior',
    categories: ['Filomuro', 'Furniruite', 'Albe vopsite', 'Laminate', 'Din sticlă', 'HGM', 'Grauthoff'],
    heading: 'Tipuri de uși interior',
    cards: [
      { title: 'Filomuro',     desc: 'La nivel cu peretele, pentru un aspect modern și îngrijit.',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',  href: '/products/interior/filomuro', salePercent: 20 },
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
      { title: 'Termice GROKE', desc: 'Uși de exterior termice GROKE — izolare superioară și securitate.',  img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', href: '/products/exterior/groke-thermosafe', salePercent: 15 },
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
      { title: 'Sistem glisant',   desc: 'Elegante și funcționale, ideale pentru spații deschise.',  img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', href: '/products/glisante/liftant-culisant', salePercent: 10 },
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
      { title: 'Pivot central',     desc: 'Design spectaculos cu pivot central.',                        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', href: '/products/pivotante/grand-pivot', salePercent: 12 },
      { title: 'Pivot offset',      desc: 'Impact vizual maxim cu pivot asimetric.',                     img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',  href: '/products/pivotante/grand-pivot' },
      { title: 'Supradimensionate', desc: 'Modele la comandă pentru înălțimi și lățimi speciale.',       img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80', href: '/products/pivotante/grand-pivot' },
    ],
  },
};

export const heroStats: Stat[] = [
  { num: '15+',     label: 'Ani experiență' },
  { num: '1.000+',  label: 'Design-uri disponibile' },
  { num: '4.3/5',   label: 'Rating Google' },
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
  { num: '15+',     label: 'Ani experiență' },
  { num: '1.000+',  label: 'Design-uri disponibile' },
  { num: '4.3/5',   label: 'Rating Google' },
  { num: '152',     label: 'Recenzii' },
];

export const productSections: ProductSectionData[] = [
  {
    id: 'interior',
    eyebrow: 'Showroom și magazin de uși de interior în Otopeni',
    heading: 'Uși de interior la comandă',
    body: 'Una dintre cele mai diverse game de uși premium din țară. Dacă amenajezi, renovezi sau construiești un spațiu premium, în showroom-ul Exclusive Doors găsești soluții alese pentru proiecte rezidențiale și comerciale. Oferim produse originale la prețuri corecte — uși filomuro, furniruite, albe vopsite, laminate, din sticlă, HGM și Grauthoff — adaptate perfect în funcție de dimensiuni, finisaje și stilul fiecărui spațiu.',
    ctaLabel: 'Vezi colecția de uși de interior',
  },
  {
    id: 'exterior',
    eyebrow: 'Uși de exterior la comandă',
    heading: 'Uși de exterior premium',
    body: 'Produse originale la prețuri corecte, de la branduri de top: GROKE, Superlock, Hörmann și ASTRA. Uși metalice antiefracție, termice și personalizate pentru orice proiect rezidențial sau comercial. Securitate ridicată, izolare termică superioară și estetică premium — pentru o intrare care face impresie și rezistă în timp.',
    ctaLabel: 'Vezi colecția de uși de exterior',
  },
  {
    id: 'glisante',
    eyebrow: 'Sisteme glisante premium',
    heading: 'Uși glisante la comandă',
    body: 'Sisteme glisante, liftant-culisante și pliante pentru interior și exterior. Livrare și montaj în toată țara — soluții elegante care maximizează spațiul și aduc lumină naturală în orice cameră. Perfecte pentru case moderne, vile și spații deschise.',
    ctaLabel: 'Vezi colecția de uși glisante',
  },
  {
    id: 'pivotante',
    eyebrow: 'Uși pivotante de design',
    heading: 'Uși pivotante la comandă',
    body: 'Uși cu pivot central sau offset — statement-ul perfect pentru o intrare de impact. Livrare și montaj în toată țara. Disponibile în dimensiuni supradimensionate, finisaje la alegere și soluții complet personalizate pentru proiecte de arhitectură de excepție.',
    ctaLabel: 'Vezi colecția de uși pivotante',
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
  {
    title: 'Vilă privată, Pipera — uși exterior aluminiu & uși glisante',
    subtitle: 'Proiect rezidențial premium, București',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
  },
  {
    title: 'Complex rezidențial Floreasca — 48 uși interior filomuro',
    subtitle: 'Proiect de anvergură, livrare & montaj complet',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
  },
  {
    title: 'Penthouse Aviatorilor — uși pivotante de design supradimensionate',
    subtitle: 'Finisaje premium, execuție la comandă',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80',
  },
  {
    title: 'Apartament Dorobanți — uși interior furnir natural & sticlă',
    subtitle: 'Proiect interior complet, 12 uși la comandă',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
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
  { heading: 'Uși Interior',  links: ['Filomuro', 'Furniruite', 'Albe vopsite', 'Laminate', 'Din sticlă', 'HGM', 'Grauthoff'] },
  { heading: 'Uși Exterior',  links: ['Metalice antiefracție', 'Termice GROKE', 'Superlock', 'Hörmann', 'Personalizate'] },
  { heading: 'Uși Glisante',  links: ['Sistem glisant', 'Liftant-culisant', 'Pliante'] },
  { heading: 'Uși Pivotante', links: ['Pivot central', 'Pivot offset', 'Design premium'] },
  { heading: 'Resurse',       links: ['Blog', 'Proiecte', 'Despre noi', 'Contact', 'Politica confidențialitate'] },
  { heading: 'Urmărește-ne',  links: ['Facebook', 'Instagram', 'Google Maps'] },
];

// ─── Product Page Types ───────────────────────────────────────────────────────

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
  img: string;
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
  startingPrice: number;
  salePercent?: number;
  scrollStops: ScrollStop[];
  details: DetailPanel[];
}

export interface CategoryMeta {
  label: string;
  heading: string;
  sub: string;
}

// ─── Product Page Data ────────────────────────────────────────────────────────

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
    startingPrice: 700,
    salePercent: 20,
    scrollStops: [
      {
        eyebrow: 'Sistem Filomuro',
        title: 'La nivel cu peretele',
        body: 'Toc invizibil integrat în structura peretelui. Suprafața ușii devine o continuare perfectă a peretelui — fără întreruperi, fără margini, fără toc vizibil. Un detaliu de arhitectură care transformă întreaga cameră.',
        stats: [{ num: '0mm', label: 'Toc vizibil' }, { num: '3000', label: 'Înălțime max mm' }],
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      },
      {
        eyebrow: 'Construcție internă',
        title: 'MDF hidrofug 19mm — solid de la interior',
        body: 'Panoul este construit pe un substrat de MDF hidrofug de 19mm, ranforsat cu un cadru interior din lemn masiv. Structura elimină orice deformare în timp, chiar și la variații mari de temperatură și umiditate.',
        stats: [{ num: '19mm', label: 'Substrat MDF' }, { num: '0%', label: 'Deformare garantată' }],
        img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80',
      },
      {
        eyebrow: 'Izolație fonică',
        title: '38 dB — liniștea ca standard',
        body: 'Garnituri perimetrale triple din EPDM și panou central cu masă mare absorb zgomotul înainte să pătrundă în cameră. O conversație la volum normal din camera alăturată devine imperceptibilă.',
        stats: [{ num: '38 dB', label: 'Izolație fonică' }, { num: '3×', label: 'Rânduri garnituri' }],
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      },
      {
        eyebrow: 'Finisaj furnir natural',
        title: 'Textura lemnului, vizibilă în fiecare fibră',
        body: 'Furnir de stejar tăiat sfert, selecționat manual și aplicat pe ambele fețe. Fibra este vizibilă, autentică, tratată cu lac mat anti-UV care protejează culoarea decenii întregi. Disponibil și în nuc, frasin și cireș.',
        stats: [{ num: '0.6mm', label: 'Grosime furnir' }, { num: '40+', label: 'Opțiuni finisaj' }],
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
      },
      {
        eyebrow: 'Montaj & service',
        title: 'Instalat de echipa noastră, garantat 5 ani',
        body: 'Fiecare ușă este măsurată la fața locului, produsă la comandă și montată de echipa certificată Exclusive Doors. Ajustările, service-ul și intervenția în garanție sunt incluse — fără costuri ascunse.',
        stats: [{ num: '5 ani', label: 'Garanție completă' }, { num: '100%', label: 'La comandă' }],
        img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
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
    startingPrice: 2200,
    salePercent: 15,
    scrollStops: [
      {
        eyebrow: 'Securitate RC3',
        title: 'Rezistentă la efracție — certificat european',
        body: 'Clasa RC3 este cel mai înalt standard disponibil pentru uși rezidențiale. Testată în laborator la 3 minute de atac susținut cu scule profesionale de efracție. Profilul de aluminiu ascunde în interior o ranforsare din oțel calibrat.',
        stats: [{ num: 'RC3', label: 'Clasă efracție' }, { num: '3 min', label: 'Rezistență certificată' }],
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      },
      {
        eyebrow: 'Sistem de blocare',
        title: '5 puncte de ancorare simultane',
        body: 'Broasca multipunct GROKE acționează 5 bolțuri de oțel simultan — sus, jos, stânga, dreapta și centru. Cilindrul antiefracție cu protecție la perforare și extragere este inclus în standard. Nimeni nu intră fără cheie.',
        stats: [{ num: '5', label: 'Puncte blocare' }, { num: 'A2P★★', label: 'Cilindru certificat' }],
        img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80',
      },
      {
        eyebrow: 'Termoizolație',
        title: '1.0 W/m²K — performanță pasivă',
        body: 'Ruptura de punte termică integrată în profil elimină transferul de căldură între interior și exterior. Panoul din spumă poliuretanică injectată la înaltă densitate completează izolația. Consumul de energie pentru încălzire scade vizibil din prima iarnă.',
        stats: [{ num: '1.0', label: 'W/m²K' }, { num: '40%', label: 'Reducere pierderi termice' }],
        img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
      },
      {
        eyebrow: 'Etanșare & durabilitate',
        title: 'Triple garnituri EPDM — impermeabil la vânt și ploaie',
        body: 'Trei rânduri de garnituri EPDM pe perimetru asigură etanșarea perfectă la apă, vânt și zgomot. Testate la clasa 4 de permeabilitate la aer și clasa E900 la presiunea vântului. Rezistă la orice condiții climatice fără degradare.',
        stats: [{ num: '42 dB', label: 'Izolație fonică' }, { num: 'E900', label: 'Rezistență vânt' }],
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      },
      {
        eyebrow: 'Finisaj & personalizare',
        title: '200+ culori RAL, anodizare sau vopsire',
        body: 'Vopsire electrostatică în câmp electrostatic, aplicată în strat dublu, rezistentă la UV, sare și coroziune. Anodizare disponibilă pentru aspectul metalic autentic. Fiecare ușă este produsă la comandă — dimensiuni, culori și accesorii alese de client.',
        stats: [{ num: '200+', label: 'Culori RAL' }, { num: '10 ani', label: 'Garanție completă' }],
        img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
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
    startingPrice: 3500,
    salePercent: 10,
    scrollStops: [
      {
        eyebrow: 'Mecanism liftant',
        title: 'Se ridică 3mm, apoi culisează lin',
        body: 'La o simplă rotire a mânerului, panoul se ridică 3mm de pe pragul de etanșare și elimină complet frecarea. Culisarea pe șine cu rulmenți cu bile devine aproape insesizabilă — chiar și pentru panouri de 400kg.',
        stats: [{ num: '3mm', label: 'Lift la acționare' }, { num: '6m', label: 'Deschidere max' }],
        img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80',
      },
      {
        eyebrow: 'Prag & acces',
        title: 'Prag de 20mm — interior și exterior la același nivel',
        body: 'Pragul redus de 20mm elimină orice obstacol la trecere și permite pardoseala continuă între interior și exterior. Ideal pentru terase, grădini și spații deschise. Accesibil și pentru persoane cu mobilitate redusă.',
        stats: [{ num: '20mm', label: 'Înălțime prag' }, { num: '400kg', label: 'Sarcină max panou' }],
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      },
      {
        eyebrow: 'Termoizolație',
        title: '0.8 W/m²K — compatibil standard pasiv',
        body: 'Profilul de aluminiu cu ruptură de punte termică triplă, combinat cu sticlă triplă low-e, atinge performanța caselor pasive. Economisești energia fără să sacrifici transparența sau deschiderea spre exterior.',
        stats: [{ num: '0.8', label: 'W/m²K' }, { num: 'Triple', label: 'Ruptură termică' }],
        img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
      },
      {
        eyebrow: 'Sticlă & lumină naturală',
        title: 'Ramă de 45mm — lumina intră neobstrucționată',
        body: 'Ramele înguste de 45mm maximizează suprafața vitrată. Sticla securizată sau laminată VSG la alegere, cu opțiuni de control solar, reflexie redusă sau electrochromic. Lumina naturală adânc în interiorul casei.',
        stats: [{ num: '45mm', label: 'Profil ramă' }, { num: '90%', label: 'Suprafață vitrată' }],
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      },
      {
        eyebrow: 'Automatizare opțională',
        title: 'Motor ascuns, comandă de la distanță',
        body: 'Sistemul poate fi echipat cu motor electric integrat în profil, complet invizibil. Comandă prin buton de perete, telecomandă sau aplicație mobilă. Compatibil cu sisteme smart home KNX și Zigbee.',
        stats: [{ num: 'Smart', label: 'Home compatibil' }, { num: '10 ani', label: 'Garanție sistem' }],
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      },
    ],
    details: [
      {
        title: 'Mâner & mecanism',
        body: 'Mâner ergonomic cu blocare multipunct automată. Senzor de poziție inclus pe sistemele cu motor de acționare.',
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
    startingPrice: 4800,
    salePercent: 12,
    scrollStops: [
      {
        eyebrow: 'Mecanism pivot',
        title: 'Rotire pe pivot central',
        body: 'Pivotul este integrat în pardoseală și tavan, complet invizibil din exterior. Ușa se rotește în jurul axei centrale cu un singur gest minim — fără balama vizibilă, fără cadru lateral, doar ușa în mișcare pură. Efectul este imediat: oricine intră pe această ușă simte că a intrat în altceva.',
        stats: [{ num: '180°', label: 'Unghi rotire' }, { num: '3500', label: 'Înălțime max mm' }],
        img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
      },
      {
        eyebrow: 'Construcție structurală',
        title: 'Până la 400 kg — solid ca piatra',
        body: 'Miezul din aluminiu turnat în tipar asigură rigiditate maximă fără greutate excesivă. Ranforsarea perimetrală din profil de oțel previne orice deformare în timp. Rulmenții cu bile sigilați preiau sarcina verticală integral, astfel încât ușa nu se încovoaie și nu vibrează — nici după 500.000 de deschideri.',
        stats: [{ num: '400 kg', label: 'Greutate max' }, { num: '500K', label: 'Cicluri garantate' }],
        img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80',
      },
      {
        eyebrow: 'Dimensiuni la comandă',
        title: 'Format monumental, fără compromis',
        body: 'Înălțimi până la 3500 mm și lățimi până la 1500 mm — fabricate integral la comandă. Fiecare gabarit este calculat individual: structura, pivotul și echilibrul de masă sunt reproiectate pentru dimensiunea exactă a proiectului tău. Nu există format standard și nu există limitare estetică.',
        stats: [{ num: '3500 mm', label: 'Înălțime max' }, { num: '1500 mm', label: 'Lățime max' }],
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      },
      {
        eyebrow: 'Finisaj & materiale',
        title: 'Orice suprafață, orice expresie',
        body: 'Furnir natural tăiat sfert, vopsit RAL în orice culoare, inox periat 316L sau combinații de materiale pe același panou. Sticla securizată poate fi integrată în orice proporție. Fiecare finisaj trece prin 5 straturi de protecție UV și lac mat sau satinat — rezultatul este o suprafață care rezistă decenii.',
        stats: [{ num: '200+', label: 'Culori RAL' }, { num: '5', label: 'Straturi protecție' }],
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
      },
      {
        eyebrow: 'Garanție & service',
        title: 'Zece ani de funcționare garantată',
        body: 'Grand Pivot vine cu garanție de 10 ani pe mecanismul de pivot și structură. Serviciul nostru de instalare include reglaj fin al echilibrului după montaj și o vizită de service la 12 luni. Piesele de schimb pentru pivot și rulmenți sunt stocate și disponibile pe toată durata garanției.',
        stats: [{ num: '10 ani', label: 'Garanție' }, { num: '12 luni', label: 'Service inclus' }],
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
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
