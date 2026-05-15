'use client';
import { useState } from 'react';
import './v2.css';
import { products, portfolio } from '@/lib/data';

const getConfigSteps = () => [
  {
    step: 'Pasul 01', title: 'Filtrare', desc: 'Reducem 100 → 3 opțiuni',
    num: '01', illustLabel: 'Filtrare personalizată',
    img: products[0].mainImg,
    h3: 'Filtrăm 80% din opțiuni pentru tine.',
    body: 'Începem cu o conversație de 5 minute despre proiectul tău: stilul interior, tipul renovării, bugetul și nivelul de izolație necesar. Din sute de modele rămân 2–3 cu adevărat relevante.',
    features: [
      'Analiză rapidă a stilului tău interior și a proiectului existent',
      'Eliminăm opțiunile incompatibile cu bugetul și destinația',
      'Prezentăm doar variantele care chiar se potrivesc, fără confuzie',
    ],
  },
  {
    step: 'Pasul 02', title: 'Matching', desc: 'Coerență cu designul',
    num: '02', illustLabel: 'Matching design',
    img: portfolio[0].img,
    h3: 'Potrivim ușa cu designul tău existent.',
    body: 'Analizăm pardoselile, pereții, finisajele și stilul renovării. Recomandăm soluții care completează spațiul — nu uși care arată frumos în catalog, ci uși care arată bine în casa ta.',
    features: [
      'Corelăm finisajul ușii cu pardoselile și pereții existenți',
      'Recomandăm variante coerente de mânere și accesorii',
      'Verificăm compatibilitatea cu sistemul de iluminat ales',
    ],
  },
  {
    step: 'Pasul 03', title: 'Validare', desc: 'Tehnic & montaj profesional',
    num: '03', illustLabel: 'Validare & montaj',
    img: portfolio[1].img,
    h3: 'Validăm tehnic și instalăm corect.',
    body: 'Măsurători la fața locului, verificarea golului, confirmarea izolației necesare. Echipa noastră montează și reglează — o dată, corect. Garanție completă inclusă.',
    features: [
      'Măsurători gratuite la fața locului înainte de comandă',
      'Montaj profesional cu aliniere garantată',
      'Service și garanție incluse — fără costuri ascunse',
    ],
  },
];

const getCatalogItems = () => [
  { hero: true, brand: 'Grauthoff Germania', name: 'HGM Fachwerk\nFurnir Stejar Natur', tags: ['Bestseller', 'Furnirui', 'Premium'], badge: 'Featured', img: products[0].mainImg },
  { brand: 'Grauthoff', name: 'HGM Classic Art Nuc', tags: ['Furnirui'], img: products[0].thumbImgs[2] },
  { brand: 'L&H', name: 'L&H Sticlă Securizată', tags: ['Modern'], img: products[2].mainImg },
  { brand: 'SUPERLOCK', name: 'SL Chic Antiefracție', tags: ['Exterior'], img: products[3].mainImg },
  { brand: 'Groke', name: 'GROKE Modern Aluminiu', tags: ['Exterior'], img: products[1].mainImg },
];

const VOICES = [
  { text: '"Am venit fără să știu ce vreau. În 20 de minute știam exact ce uși se potrivesc cu renovarea. Montajul perfect, fără nicio corecție ulterioară."', name: 'Alexandru M.', role: 'Proprietar · Sector 1, București' },
  { text: '"Recomand constant Exclusive Doors clienților mei. Documentație tehnică clară, termene respectate, nicio problemă de aliniere."', name: 'Ioana R.', role: 'Arhitect · 12 proiecte împreună' },
];

export default function V2Page() {
  const [activeStep, setActiveStep] = useState(0);
  const CONFIG_STEPS = getConfigSteps();
  const step = CONFIG_STEPS[activeStep];
  const CATALOG_ITEMS = getCatalogItems();

  return (
    <div className="v2">
      {/* NAV */}
      <nav className="v2-nav">
        <div className="v2-nav-logo">Exclusive<em>.</em>Doors</div>
        <div className="v2-nav-links">
          {['Uși Interior', 'Uși Exterior', 'Tehnice & Garaj', 'Showroom', 'Proiecte', 'Blog'].map(l => (
            <a key={l}>{l}</a>
          ))}
        </div>
        <div className="v2-nav-right">
          <div className="v2-nav-phone">0728 959 652</div>
          <button className="v2-nav-cta">Programează</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="v2-hero">
        <div className="v2-hero-meta">
          <span><span className="v2-hero-meta-num">№ 01</span> · Decizia care contează</span>
          <span>Showroom Otopeni · Mai 2026</span>
        </div>
        <div className="v2-hero-grid">
          <div className="v2-hero-left">
            <img src={products[1].mainImg} alt="Ușă premium Exclusive Doors" className="v2-hero-left-img" />
            <h1 className="v2-h1">
              <span className="v2-strike">Sute</span><br />
              de uși.<br />
              <em>Trei</em> corecte<br />
              pentru tine.
            </h1>
          </div>
          <div className="v2-hero-right">
            <div className="v2-hero-eyebrow">Consultanță gratuită · 15 min</div>
            <p className="v2-hero-sub">
              Renovezi în nordul Bucureștiului și ușile sunt una din ultimele decizii. <strong>Filtrăm pentru tine 80% din opțiuni</strong> și rămânem cu 2–3 potrivite pentru proiectul tău. Pleci din showroom cu claritate completă.
            </p>
            <div className="v2-hero-actions">
              <button className="v2-btn-cta">Programează consultația gratuită</button>
              <button className="v2-btn-cta-secondary">Descoperă colecțiile <span>→</span></button>
            </div>
            <div className="v2-hero-fineprint">Fără obligații · Showroom Otopeni · 0728 959 652</div>
          </div>
        </div>
        <div className="v2-hero-stats">
          {[
            { val: '20+', label: 'Ani de experiență cu uși germane premium' },
            { val: '500+', label: 'Proiecte finalizate în București și Ilfov' },
            { val: '4.9', label: 'Rating Google din 127 recenzii reale' },
            { val: '6', label: 'Producători germani și europeni reprezentați' },
          ].map((s, i) => (
            <div key={i} className="v2-hero-stat">
              <div className="v2-hero-stat-val">
                {i === 0 ? <><em>20</em>+</> : i === 1 ? <>500<em>+</em></> : i === 2 ? <>4<em>.</em>9</> : <>{s.val}</>}
              </div>
              <div className="v2-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="v2-problem">
        <div className="v2-section-meta">
          <span><span className="v2-section-meta-num">№ 02</span> · Realitatea renovărilor</span>
          <span>Costul greșelii</span>
        </div>
        <div className="v2-problem-grid">
          <div>
            <h2 className="v2-problem-h2">Majoritatea aleg <em>greșit.</em><br />Și află după montaj.</h2>
            <p className="v2-problem-intro">Cele 3 capcane în care cad cei mai mulți proprietari când vine momentul să aleagă ușile pentru renovarea lor.</p>
          </div>
          <div className="v2-problem-list">
            {[
              { idx: '№ 01', title: 'Paralizia opțiunilor', desc: 'Sute de modele, colecții, branduri — fără logică clară. Alegi pe baza prețului sau a imaginii. Nici una nu e criteriu bun.', costLabel: 'Cost potențial', costVal: '+€500–1.500' },
              { idx: '№ 02', title: 'Capcana ușilor ieftine', desc: 'Se deformează în 2–3 ani. Nu izolează. Trebuie înlocuite. Practic plătești de două ori pentru același spațiu — odată ieftin, odată corect.', costLabel: 'Cost potențial', costVal: '2× prețul inițial' },
              { idx: '№ 03', title: 'Decizia tardivă', desc: 'Ușile sunt printre ultimele decizii, dar golurile trebuie finalizate la timp. O alegere tardivă poate bloca tot proiectul de renovare cu 4–8 săptămâni.', costLabel: 'Cost potențial', costVal: '4–8 săptămâni' },
            ].map(r => (
              <div key={r.idx} className="v2-problem-row">
                <div className="v2-problem-idx">{r.idx}</div>
                <div>
                  <h3 className="v2-problem-title">{r.title}</h3>
                  <p className="v2-problem-desc">{r.desc}</p>
                </div>
                <div className="v2-problem-cost">
                  {r.costLabel}<br />
                  <span className="v2-problem-cost-val">{r.costVal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section className="v2-config">
        <div className="v2-config-header">
          <div className="v2-section-eyebrow">Showroom Decision System</div>
          <h2 className="v2-section-h2">Metoda noastră în <em>3 pași</em>.</h2>
          <p className="v2-section-lead">Nu îți arătăm un catalog. Conducem decizia. În 15 minute pleci cu 2–3 opțiuni clare — și știi exact ce alegi și de ce.</p>
        </div>
        <div className="v2-configurator">
          <div className="v2-config-tabs">
            {CONFIG_STEPS.map((s, i) => (
              <div key={i} className={`v2-config-tab${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(i)}>
                <div className="v2-config-tab-step">{s.step}</div>
                <div className="v2-config-tab-title">{s.title}</div>
                <div className="v2-config-tab-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="v2-config-body">
            <div className="v2-config-illust">
              <img src={step.img} alt={step.illustLabel} />
              <div className="v2-config-illust-num">{step.num}</div>
              <div className="v2-config-illust-label">{step.illustLabel}</div>
            </div>
            <div className="v2-config-content">
              <h3>{step.h3}</h3>
              <p>{step.body}</p>
              <div className="v2-config-features">
                {step.features.map((f, i) => (
                  <div key={i} className="v2-config-feature">
                    <div className="v2-config-feature-check">✓</div>
                    <div>{f}</div>
                  </div>
                ))}
              </div>
              <div className="v2-config-cta">
                <button className="v2-btn-orange-line">Începe consultația →</button>
                <span className="v2-config-cta-note">Durează 15 min · Gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="v2-catalog">
        <div className="v2-catalog-header">
          <div>
            <div className="v2-section-eyebrow">Colecții selectate</div>
            <h2 className="v2-catalog-h2">Uși germane,<br /><em>aici</em> în România.</h2>
            <p className="v2-catalog-sub">Selecție de modele reprezentative din colecțiile noastre. Toate fabricate real în Germania, importate direct, instalate de echipa noastră.</p>
          </div>
          <div className="v2-catalog-nav">
            <div className="v2-catalog-nav-label">Toate categoriile</div>
            {['Uși interior', 'Uși exterior', 'Sticlă securizată', 'Tehnice & garaj', 'Filomuro'].map(l => (
              <a key={l}>{l}</a>
            ))}
          </div>
        </div>
        <div className="v2-catalog-grid">
          {CATALOG_ITEMS.map((item, i) => (
            <div key={i} className={`v2-catalog-item${item.hero ? ' v2-catalog-item-hero' : ''}`}>
              <div className="v2-catalog-item-img">
                <img src={item.img} alt={item.name} />
                {item.badge && <div className="v2-catalog-item-badge">{item.badge}</div>}
              </div>
              <div className="v2-catalog-item-info">
                <div className="v2-catalog-item-brand">{item.brand}</div>
                <div className="v2-catalog-item-name">{item.name}</div>
                <div className="v2-catalog-item-tags">
                  {item.tags.map(t => <span key={t} className="v2-catalog-item-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VOICES */}
      <section className="v2-voices">
        <div className="v2-voices-grid">
          <div>
            <div className="v2-section-eyebrow">Voci · Rating Google</div>
            <h2 className="v2-voices-h2">Cei care au<br /><em>ales corect.</em></h2>
            <div className="v2-rating-display">
              <div className="v2-rating-val">4.9</div>
              <div>
                <div className="v2-rating-stars">★★★★★</div>
                <div className="v2-rating-meta">127 recenzii verificate Google</div>
              </div>
            </div>
            <p className="v2-voices-desc">Testimoniale de la proprietari și arhitecți care au trecut prin Showroom Decision System și au finalizat renovarea fără regrete.</p>
            <p>→ <a className="v2-voices-link">Citește toate cele 127 de recenzii pe Google</a></p>
          </div>
          <div className="v2-voice-cards">
            {VOICES.map((v, i) => (
              <div key={i} className="v2-voice-card">
                <div className="v2-voice-stars">★★★★★</div>
                <p className="v2-voice-text">{v.text}</p>
                <div className="v2-voice-author">
                  <span className="v2-voice-name">{v.name}</span>
                  <span className="v2-voice-role">{v.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="v2-showroom">
        <div className="v2-showroom-deco">📍</div>
        <div className="v2-showroom-content">
          <div>
            <div className="v2-section-eyebrow" style={{ color: 'var(--v2-orange)' }}>Vino să vezi</div>
            <h2 className="v2-showroom-h2">Vino să <em>atingi.</em><br />Vino să <em>decizi.</em></h2>
            <p className="v2-showroom-lead">Showroom-ul nostru din Otopeni e la 15 minute din nordul Bucureștiului. Modelele expuse sunt cele reale — atingi materialele, închizi ușile, simți greutatea.</p>
            <div className="v2-showroom-details">
              {[
                { label: 'Adresă', value: 'Drumul Gării Odăi 1A, Otopeni, Ilfov', mono: false },
                { label: 'Telefon', value: '0728 959 652', mono: true },
                { label: 'Email', value: 'office@exclusivedoors.ro', mono: true },
              ].map(r => (
                <div key={r.label} className="v2-showroom-row">
                  <div className="v2-showroom-label">{r.label}</div>
                  <div className={r.mono ? 'v2-showroom-value v2-showroom-value-mono' : 'v2-showroom-value'}>{r.value}</div>
                </div>
              ))}
            </div>
            <div className="v2-showroom-ctas">
              <button className="v2-btn-orange-solid">Programează vizita</button>
              <button className="v2-btn-ghost-light">Indicații GPS</button>
            </div>
          </div>
          <div>
            <div className="v2-showroom-card-dark">
              <div className="v2-showroom-map">
                <div className="v2-showroom-map-pin">📍</div>
                <div className="v2-showroom-map-label">Otopeni, Jud. Ilfov</div>
              </div>
              <div className="v2-showroom-hours">
                <div className="v2-showroom-hours-cell">
                  <div className="v2-showroom-hours-label">Luni — Vineri</div>
                  <div className="v2-showroom-hours-val">09:00 — 18:00</div>
                </div>
                <div className="v2-showroom-hours-cell">
                  <div className="v2-showroom-hours-label">Sâmbătă</div>
                  <div className="v2-showroom-hours-val">10:00 — 14:00</div>
                </div>
              </div>
            </div>
            <div className="v2-showroom-dealer">
              <div>
                <div className="v2-showroom-dealer-label">Dealer partener</div>
                <div className="v2-showroom-dealer-name">Turquoise Studio Design</div>
              </div>
              <div className="v2-showroom-dealer-city">Constanța →</div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="v2-partners">
        <div className="v2-partners-grid">
          <div className="v2-partners-h">Colaborăm cu <em>arhitecți</em> & designeri.</div>
          <div className="v2-partners-list">
            {['Studio Arhitectura A', 'Design Interior B', 'Renovart Consulting', 'Spațiu & Formă'].map(p => (
              <div key={p} className="v2-partner-card">{p}</div>
            ))}
            <div className="v2-partner-card v2-partner-cta">Devino partener →</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="v2-final">
        <div className="v2-final-eyebrow">— Pasul următor —</div>
        <h2 className="v2-final-h2">Alege <em>corect.</em><br />Din prima.</h2>
        <p className="v2-final-sub">15 minute în showroom. Filtrăm opțiunile, potrivim cu designul tău, validăm tehnic. Pleci cu o decizie clară.</p>
        <div className="v2-final-actions">
          <button className="v2-btn-cta-large">Programează consultația</button>
          <button className="v2-btn-cta-large-outline">0728 959 652</button>
        </div>
        <div className="v2-final-note">Gratuit · Fără obligații · Showroom Otopeni</div>
      </section>

      {/* FOOTER */}
      <footer className="v2-footer">
        <div className="v2-footer-top">
          <div>
            <div className="v2-footer-brand">Exclusive<em>.</em>Doors</div>
            <p className="v2-footer-tagline">Importator unic de uși germane premium. Showroom în Otopeni, Ilfov. Consultanță gratuită pentru proprietari și arhitecți.</p>
          </div>
          {[
            { title: 'Produse', links: ['Uși Interior', 'Uși Exterior', 'Sticlă Securizată', 'Tehnice & Garaj'] },
            { title: 'Servicii', links: ['Consultanță gratuită', 'Măsurători', 'Montaj profesional', 'Parteneri arhitecți'] },
            { title: 'Companie', links: ['Showroom Otopeni', 'Dealer Constanța', 'Proiecte realizate', 'Blog & Ghiduri', 'Contact'] },
          ].map(col => (
            <div key={col.title} className="v2-footer-col">
              <div className="v2-footer-col-title">{col.title}</div>
              {col.links.map(l => <a key={l}>{l}</a>)}
            </div>
          ))}
        </div>
        <div className="v2-footer-bottom">
          <div>© 2026 Exclusive Doors Style SRL · Drumul Gării Odăi 1A, Otopeni, Ilfov</div>
          <div>0728 959 652 · office@exclusivedoors.ro</div>
        </div>
      </footer>
    </div>
  );
}
