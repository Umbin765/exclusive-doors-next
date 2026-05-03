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
    eyebrow: 'Showroom și magazin de uși de interior în București',
    heading: 'Uși de interior la comandă',
    body: 'Dacă amenajezi, renovezi sau construiești un spațiu premium și cauți un magazin de uși de interior în București, în showroom-ul Exclusive Doors găsești soluții alese pentru proiecte rezidențiale și comerciale. Oferim uși de interior la comandă, adaptate perfect în funcție de dimensiuni, finisaje, stil și cerințele fiecărui spațiu: uși din lemn, uși filomuro, uși albe, uși glisante, uși laminate sau uși din sticlă.',
    ctaLabel: 'Vezi colecția de uși de interior',
  },
  {
    id: 'exterior',
    eyebrow: 'Uși de exterior la comandă',
    heading: 'Uși de exterior premium',
    body: 'Uși de exterior din aluminiu, lemn masiv și soluții complet personalizate pentru orice proiect rezidențial sau comercial. Securitate ridicată, izolare termică superioară și estetică premium — pentru o intrare care face impresie și rezistă în timp.',
    ctaLabel: 'Vezi colecția de uși de exterior',
  },
  {
    id: 'glisante',
    eyebrow: 'Sisteme glisante premium',
    heading: 'Uși glisante la comandă',
    body: 'Sisteme glisante, liftant-culisante și pliante pentru interior și exterior. Soluții elegante care maximizează spațiul și aduc lumină naturală în orice cameră — perfecte pentru case moderne și spații deschise.',
    ctaLabel: 'Vezi colecția de uși glisante',
  },
  {
    id: 'pivotante',
    eyebrow: 'Uși pivotante de design',
    heading: 'Uși pivotante la comandă',
    body: 'Uși cu pivot central sau offset — statement-ul perfect pentru o intrare de impact. Disponibile în dimensiuni supradimensionate, finisaje la alegere și soluții complet personalizate pentru proiecte de arhitectură de excepție.',
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
  { heading: 'Uși Interior',  links: ['Filomuro', 'Furnir', 'Sticlă', 'Glisante', 'Duble', 'Pivot'] },
  { heading: 'Uși Exterior',  links: ['Aluminiu', 'Lemn', 'Personalizate', 'Blindate'] },
  { heading: 'Uși Glisante',  links: ['Sistem glisant', 'Liftant-culisant', 'Pliante'] },
  { heading: 'Uși Pivotante', links: ['Pivot central', 'Pivot offset', 'Design premium'] },
  { heading: 'Resurse',       links: ['Blog', 'Proiecte', 'Despre noi', 'Contact', 'Politica confidențialitate'] },
];
