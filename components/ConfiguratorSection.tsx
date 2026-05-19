'use client';

import { useState } from 'react';

const steps = [
  {
    step: 'Pasul 01',
    title: 'Filtrare',
    desc: 'Reducem 100 → 3 opțiuni',
    num: '01',
    illustLabel: 'Filtrare personalizată',
    imgs: [
      'https://exclusivedoors.ro/wp-content/uploads/2024/09/Untitled-design-5-700x700.jpg',
      'https://exclusivedoors.ro/wp-content/uploads/2021/12/HGM-WEISS-ART-TYP-101-409x546.jpg',
      'https://exclusivedoors.ro/wp-content/uploads/2021/10/ASTRA-LINEA-ART-cu-balamale-aparente.jpg',
    ],
    h3: 'Filtrăm 80% din opțiuni pentru tine.',
    body: 'Începem cu o conversație de 5 minute despre proiectul tău: stilul interior, tipul renovării, bugetul și nivelul de izolație necesar. Din sute de modele rămân 2–3 cu adevărat relevante.',
    features: [
      'Analiză rapidă a stilului tău interior și a proiectului existent',
      'Eliminăm opțiunile incompatibile cu bugetul și destinația',
      'Prezentăm doar variantele care chiar se potrivesc, fără confuzie',
    ],
  },
  {
    step: 'Pasul 02',
    title: 'Matching',
    desc: 'Coerență cu designul',
    num: '02',
    illustLabel: 'Potrivire cu spațiul',
    imgs: [
      'https://exclusivedoors.ro/wp-content/uploads/2021/12/HGM-GLATT-CULISANTA-1-409x546.jpg',
      'https://exclusivedoors.ro/wp-content/uploads/2021/11/ALINEA-1.jpg',
      'https://exclusivedoors.ro/wp-content/uploads/2020/12/SL-HI-TECH-8013.jpg',
    ],
    h3: 'Potrivim ușa cu designul tău interior.',
    body: 'Comparăm modele fizice din showroom cu planurile tale. Dimensiuni, finisaje, sisteme de deschidere — totul validat vizual, nu din imagini de catalog.',
    features: [
      'Comparare directă cu mostrele din showroom',
      'Coerență cromatică și texturală cu pardoselile și pereții',
      'Validare a dimensiunilor și compatibilității cu golul existent',
    ],
  },
  {
    step: 'Pasul 03',
    title: 'Validare',
    desc: 'Tehnic & montaj profesional',
    num: '03',
    illustLabel: 'Validare tehnică',
    imgs: [
      'https://exclusivedoors.ro/wp-content/uploads/2020/12/rupere_termica-700x700.jpg',
      'https://exclusivedoors.ro/wp-content/uploads/2020/12/metalice_antiefractie_1-700x700.jpg',
      'https://exclusivedoors.ro/wp-content/uploads/2020/12/SL-HI-TECH-8010.jpg',
    ],
    h3: 'Validăm tehnic fiecare detaliu.',
    body: 'Verificăm izolarea fonică, coeficientul termic, clasa de efracție și compatibilitatea cu golul existent. Zero surprize la montaj.',
    features: [
      'Verificare coeficient termic și izolație fonică',
      'Clasă de efracție potrivită pentru locul instalării',
      'Compatibilitate completă cu sistemul de montaj existent',
    ],
  },
];

export default function ConfiguratorSection() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="config-section">
      <div className="config-header">
        <div className="section-eyebrow">Showroom Decision System</div>
        <h2 className="section-h2">Metoda noastră în <em>3 pași</em>.</h2>
        <p className="section-lead">
          Nu îți arătăm un catalog. Conducem decizia. În 15 minute pleci cu 2–3 opțiuni
          clare — și știi exact ce alegi și de ce.
        </p>
      </div>

      <div className="configurator">
        <div className="config-tabs">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`config-tab${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="config-tab-step">{s.step}</div>
              <div className="config-tab-title">{s.title}</div>
              <div className="config-tab-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="config-body">
          <div className="config-illustration">
            <div className="config-illust-main">
              <img src={step.imgs[0]} alt={step.illustLabel} />
              <div className="config-illust-overlay">
                <span className="config-illust-num">{step.num}</span>
                <span className="config-illust-label">{step.illustLabel}</span>
              </div>
            </div>
            <div className="config-illust-sub">
              <img src={step.imgs[1]} alt={step.illustLabel} />
              <img src={step.imgs[2]} alt={step.illustLabel} />
            </div>
          </div>

          <div className="config-content">
            <h3>{step.h3}</h3>
            <p>{step.body}</p>
            <div className="config-features">
              {step.features.map((f, i) => (
                <div key={i} className="config-feature">
                  <div className="config-feature-check">✓</div>
                  <div>{f}</div>
                </div>
              ))}
            </div>
            <div className="config-cta">
              <a href="#contact" className="btn-orange-line">Începe consultația →</a>
              <span className="config-cta-note">Durează 15 min · Gratuit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
