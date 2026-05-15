'use client';
import { useState } from 'react';
import './v1.css';

const TABS = ['Interior Furniruite', 'Interior Albe & Vopsite', 'Sticlă Securizată', 'Exterior & Antiefracție', 'Tehnice & Garaj'];

const PRODUCTS = [
  { brand: 'Grauthoff', name: 'HGM Fachwerk Furnir Stejar Natur', tags: ['Furnirui', 'Germania', 'Garanție 2 ani'], badge: 'Bestseller' },
  { brand: 'Grauthoff', name: 'HGM Classic Art Nuc Natural', tags: ['Furnirui', 'Clasic', 'Premium'], badge: undefined },
  { brand: 'Grauthoff', name: 'HGM Steel Art Efect Metal Negru', tags: ['Modern', 'Izolație fonică'], badge: undefined },
  { brand: 'L&H', name: 'L&H Sticlă Securizată Premium', tags: ['Sticlă', 'Design'], badge: undefined },
];

const TESTIMONIALS = [
  { initials: 'AM', name: 'Alexandru M.', role: 'Proprietar · Sector 1, București', text: 'Am venit fără să știu ce vreau. În 20 de minute știam exact ce uși se potrivesc cu renovarea noastră. Montajul a fost perfect, fără nicio corecție ulterioară.' },
  { initials: 'IR', name: 'Ioana R.', role: 'Arhitect · 12 proiecte împreună', text: 'Recomand constant Exclusive Doors clienților mei. Documentație tehnică clară, termene respectate, nicio problemă de aliniere. Exact ce am nevoie ca arhitect.' },
  { initials: 'CD', name: 'Cristina D.', role: 'Proprietar · Pipera, Ilfov', text: 'Am schimbat ușile vechi — diferența de izolație fonică este remarcabilă. Nu mai aud coridorul deloc. Merită fiecare leu investit.' },
];

export default function V1Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="v1">
      {/* NAV */}
      <nav className="v1-nav">
        <div className="v1-nav-logo">Exclusive<span>.</span>Doors</div>
        <div className="v1-nav-links">
          {['Uși Interior', 'Uși Exterior', 'Tehnice & Garaj', 'Showroom', 'Proiecte', 'Blog'].map(l => (
            <a key={l}>{l}</a>
          ))}
        </div>
        <button className="v1-nav-cta">Programează</button>
      </nav>

      {/* HERO */}
      <section className="v1-hero">
        <div className="v1-hero-left">
          <div className="v1-eyebrow">Uși germane autentice · Showroom Otopeni</div>
          <h1 className="v1-h1">
            Alege ușile corecte<br />
            <em>din prima.</em><br />
            Fără regrete.
          </h1>
          <p className="v1-hero-sub">
            Consultanță gratuită în showroom. Filtrăm 80% din opțiuni și rămânem cu 2–3 potrivite pentru proiectul tău. 15 minute. Claritate completă.
          </p>
          <div className="v1-hero-ctas">
            <button className="v1-btn-primary">Programează Consultația Gratuită</button>
            <button className="v1-btn-ghost">Descoperă Colecțiile →</button>
          </div>
          <div className="v1-hero-proof">
            {[
              { icon: '🇩🇪', val: '100%', label: 'Fabricat în Germania' },
              { icon: '⭐', val: '4.9 / 5', label: '127 recenzii Google' },
              { icon: '🏠', val: '500+', label: 'Proiecte finalizate' },
            ].map(p => (
              <div key={p.val} className="v1-proof-item">
                <div className="v1-proof-icon">{p.icon}</div>
                <div>
                  <span className="v1-proof-val">{p.val}</span>
                  <span className="v1-proof-label">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="v1-hero-right">
          <div className="v1-hero-right-bg" />
          <div className="v1-hero-img-icon">🚪</div>
          <div className="v1-hero-img-label">
            <strong>Fotografie hero</strong>
            Ușă Grauthoff HGM în context<br />rezidențial premium, lumină naturală
          </div>
          <div className="v1-hero-badge">
            ✓ Consultație Gratuită
            <span>15 minute · Fără obligații</span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="v1-trust-bar">
        <span className="v1-trust-label">Importator oficial</span>
        <div className="v1-trust-divider" />
        <div className="v1-brand-logos">
          {['GRAUTHOFF', 'GROKE', 'SUPERLOCK', 'HÖRMANN', 'ASTRA', 'L&H'].map(b => (
            <div key={b} className="v1-brand-logo">{b}</div>
          ))}
        </div>
        <div className="v1-trust-divider" />
        <div className="v1-trust-stats">
          <div className="v1-trust-stat"><strong>20+</strong><span>ani experiență</span></div>
          <div className="v1-trust-stat"><strong>2 ani</strong><span>garanție producător</span></div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="v1-problem">
        <div className="v1-section-eyebrow">Realitatea renovărilor</div>
        <h2 className="v1-section-h2">Majoritatea aleg ușile greșit.<br />Și-și dau seama după montaj.</h2>
        <p className="v1-section-sub">Renovezi casa și ușile sunt una din ultimele decizii. Există sute de opțiuni. Nimeni nu te ajută să filtrezi. Alegi pe baza prețului sau a imaginii — și nici una nu e criteriu bun.</p>
        <div className="v1-problem-grid">
          {[
            { icon: '😰', title: 'Prea multe opțiuni', desc: 'Sute de modele, colecții, branduri — fără o logică clară care să te ajute să alegi. Te pierzi. Alegi aleatoriu.' },
            { icon: '💸', title: 'Greșeala care costă dublu', desc: 'Ușile ieftine se deformează în 2–3 ani. Nu izolează. Trebuie înlocuite. Practic plătești de două ori pentru același spațiu.' },
            { icon: '⏰', title: 'Decizia amânată = blocaj', desc: 'Ușile sunt printre ultimele decizii, dar golurile trebuie finalizate la timp. O alegere tardivă poate bloca tot proiectul de renovare.' },
          ].map(c => (
            <div key={c.title} className="v1-problem-card">
              <div className="v1-problem-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MECHANISM */}
      <section className="v1-mechanism">
        <div className="v1-mechanism-grid">
          <div className="v1-mechanism-left">
            <div className="v1-section-eyebrow">Showroom Decision System</div>
            <h2 className="v1-section-h2">
              Nu îți arătăm 100 de uși.<br />
              Îți arătăm <span style={{ color: 'var(--v1-orange)' }}>3 corecte.</span>
            </h2>
            <p className="v1-section-sub">Consultanță ghidată care elimină confuzia și reduce riscul unei alegeri costisitoare. Metodă unică în România.</p>
            <div className="v1-steps">
              {[
                { title: 'Filtrăm 80% din opțiuni', body: 'Pe baza proiectului tău: stilul interior, tipul de renovare, bugetul, izolația necesară. Rămân 2–3 opțiuni relevante.' },
                { title: 'Potrivim cu designul existent', body: 'Material, culoare, finisaj, stil. Ușile trebuie să pară parte din proiect, nu adăugate după finalizarea renovării.' },
                { title: 'Validăm tehnic și instalăm corect', body: 'Măsurători gratuite la fața locului. Montaj profesional. Aliniere perfectă garantată. Fără surprize după instalare.' },
              ].map((s, i) => (
                <div key={i} className="v1-step">
                  <div className="v1-step-num">{i + 1}</div>
                  <div>
                    <div className="v1-step-title">{s.title}</div>
                    <div className="v1-step-body">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="v1-mechanism-card">
            <div className="v1-mechanism-card-header">✓ Ce include consultanța gratuită</div>
            {[
              { title: 'Filtrare personalizată', body: 'Rămânem cu 2–3 opțiuni relevante pentru proiectul tău specific' },
              { title: 'Matching design', body: 'Verificăm coerența cu restul renovării — stil, culori, finisaje' },
              { title: 'Validare tehnică', body: 'Izolație, aliniere, tip montaj, certificate de calitate și garanție' },
              { title: 'Fără obligații', body: 'Durează 15 minute. Pleci cu claritate completă despre ce trebuie ales.' },
            ].map((g, i) => (
              <div key={i} className="v1-g-item">
                <div className="v1-g-icon">✓</div>
                <div>
                  <div className="v1-g-title">{g.title}</div>
                  <div className="v1-g-body">{g.body}</div>
                </div>
              </div>
            ))}
            <div className="v1-mechanism-cta">
              <button className="v1-btn-primary" style={{ width: '100%', padding: '14px' }}>Rezervă Consultația Gratuită →</button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="v1-products">
        <div className="v1-products-header">
          <div>
            <div className="v1-section-eyebrow">Colecțiile noastre</div>
            <h2 className="v1-section-h2" style={{ fontSize: '32px', marginBottom: 0 }}>Uși fabricate real în Germania</h2>
          </div>
          <a>Vezi toate colecțiile →</a>
        </div>
        <div className="v1-tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`v1-tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>
        <div className="v1-products-grid">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="v1-product-card">
              <div className="v1-product-img">
                🚪
                {p.badge && <div className="v1-product-badge">{p.badge}</div>}
              </div>
              <div className="v1-product-info">
                <div className="v1-product-brand">{p.brand}</div>
                <div className="v1-product-name">{p.name}</div>
                <div className="v1-product-tags">
                  {p.tags.map(t => <span key={t} className="v1-product-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
          <div className="v1-product-cta-card">
            <div className="v1-product-cta-num">80+</div>
            <div className="v1-product-cta-label">modele disponibile<br />în showroom</div>
            <div className="v1-product-cta-link">Vezi catalogul complet →</div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="v1-social">
        <div className="v1-social-header">
          <div>
            <div className="v1-section-eyebrow">Ce spun clienții noștri</div>
            <h2 className="v1-section-h2" style={{ fontSize: '32px', marginBottom: 0 }}>Proprietari și arhitecți<br />care au ales corect</h2>
          </div>
          <div className="v1-rating-block">
            <div className="v1-rating-big">4.9</div>
            <div>
              <span className="v1-rating-stars">★★★★★</span>
              <span className="v1-rating-count">127 recenzii Google</span>
            </div>
          </div>
        </div>
        <div className="v1-testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="v1-testimonial">
              <div className="v1-t-quote">&ldquo;</div>
              <div className="v1-t-stars">★★★★★</div>
              <p className="v1-t-text">{t.text}</p>
              <div className="v1-t-author">
                <div className="v1-t-avatar">{t.initials}</div>
                <div>
                  <div className="v1-t-name">{t.name}</div>
                  <div className="v1-t-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="v1-projects-label">Proiecte finalizate</div>
        <div className="v1-projects-strip">
          {['Apartament · Dorobanți · 2025', 'Casă · Pipera · 2025', 'Penthouse · Floreasca · 2026'].map(c => (
            <div key={c} className="v1-project-thumb">
              <div className="v1-project-thumb-img">🏠</div>
              <div className="v1-project-caption">{c}</div>
            </div>
          ))}
          <div className="v1-project-more">
            <span style={{ fontSize: '22px', color: '#ccc' }}>+</span>
            <span>Vezi toate proiectele →</span>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="v1-local">
        <div className="v1-section-eyebrow">Vino să vezi</div>
        <h2 className="v1-section-h2">Vino să atingi.<br />Vino să decizi.</h2>
        <div className="v1-local-grid">
          <div>
            <div className="v1-showroom-card">
              <h3>Showroom Otopeni</h3>
              <div className="v1-showroom-address">Drumul Gării Odăi 1A, Otopeni, Jud. Ilfov</div>
              <div className="v1-showroom-details">
                {[
                  { icon: '📞', text: '0728 959 652' },
                  { icon: '🕐', text: 'Luni–Vineri 09:00–18:00 · Sâmbătă 10:00–14:00' },
                  { icon: '✉', text: 'office@exclusivedoors.ro' },
                ].map(d => (
                  <div key={d.text} className="v1-showroom-detail">
                    <div className="v1-showroom-detail-icon">{d.icon}</div>
                    {d.text}
                  </div>
                ))}
              </div>
              <div className="v1-showroom-btns">
                <button className="v1-btn-primary" style={{ padding: '14px', width: '100%' }}>Programează Vizita →</button>
                <button className="v1-btn-secondary">Obține Indicații GPS</button>
              </div>
            </div>
            <div className="v1-dealer-card">
              <div className="v1-dealer-dot" />
              <div>
                <div className="v1-dealer-name">Turquoise Studio Design</div>
                <div className="v1-dealer-city">Dealer partener · Constanța</div>
              </div>
            </div>
          </div>
          <div className="v1-map-box">
            <div className="v1-map-pin">📍</div>
            <div className="v1-map-label">Otopeni, Jud. Ilfov</div>
            <div className="v1-map-sublabel">← 15 minute din nordul Bucureștiului</div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <div className="v1-partners">
        <span className="v1-partners-label">Colaborăm cu arhitecți și designeri</span>
        {['Studio Arhitectura A', 'Design Interior B', 'Renovart Consulting', 'Spațiu & Formă'].map(p => (
          <div key={p} className="v1-partner-chip">{p}</div>
        ))}
        <div className="v1-partner-chip-cta">Devino Partener →</div>
      </div>

      {/* FINAL CTA */}
      <section className="v1-final">
        <div className="v1-final-eyebrow">Pasul următor</div>
        <h2>Gata să alegi corect?</h2>
        <p>Vino 15 minute în showroom. Filtrăm opțiunile, potrivim cu designul tău și pleci cu claritate completă. Fără obligații.</p>
        <div className="v1-final-btns">
          <button className="v1-btn-white">Programează Consultația Gratuită</button>
          <button className="v1-btn-outline-white">Sună Acum: 0728 959 652</button>
        </div>
        <div className="v1-final-note">Consultanță gratuită · Fără obligații · Durează 15 minute · Showroom Otopeni</div>
      </section>

      {/* FOOTER */}
      <footer className="v1-footer">
        <div className="v1-footer-links">
          {['Uși Interior', 'Uși Exterior', 'Showroom', 'Parteneri', 'Blog', 'Contact'].map(l => (
            <a key={l}>{l}</a>
          ))}
        </div>
        <div className="v1-footer-copy">© 2026 Exclusive Doors Style SRL · Otopeni, Ilfov</div>
      </footer>
    </div>
  );
}
