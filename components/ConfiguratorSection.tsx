'use client';

import { useState } from 'react';

const steps = [
  {
    tab: '01 — Filtrare',
    num: '01',
    hl: 'Filtrăm 80% din opțiuni',
    body: 'Analizăm stilul arhitecturii, materialele existente și bugetul. Eliminăm ce nu se potrivește — înainte să pierzi timp cu cataloage inutile.',
    img: 'https://exclusivedoors.ro/wp-content/uploads/2024/09/Untitled-design-5-700x700.jpg',
    cta: 'Explorează colecția de uși',
    href: '/products/interior',
  },
  {
    tab: '02 — Potrivire',
    num: '02',
    hl: 'Potrivim designul cu spațiul',
    body: 'Comparăm modele fizice din showroom cu planurile tale. Dimensiuni, finisaje, sisteme de deschidere — totul validat vizual, nu din imagini de catalog.',
    img: 'https://exclusivedoors.ro/wp-content/uploads/2020/12/rupere_termica-700x700.jpg',
    cta: 'Programează vizita',
    href: '#contact',
  },
  {
    tab: '03 — Validare',
    num: '03',
    hl: 'Validăm tehnic fiecare detaliu',
    body: 'Verificăm izolarea fonică, coeficientul termic, clasa de efracție și compatibilitatea cu golul existent. Zero surprize la montaj.',
    img: 'https://exclusivedoors.ro/wp-content/uploads/2021/12/HGM-GLATT-CULISANTA-1-409x546.jpg',
    cta: 'Vorbește cu un specialist',
    href: '#contact',
  },
];

export default function ConfiguratorSection() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="ed-config">
      <div className="ed-config__inner">
        <div className="ed-config__head">
          <span className="ed-eyebrow">Cum funcționează</span>
          <h2 className="ed-config__hl">
            Sistemul Exclusiv<br />de Alegere în 15 minute
          </h2>
        </div>

        <div className="ed-config__tabs">
          {steps.map((s, i) => (
            <button
              key={i}
              className={`ed-config__tab${active === i ? ' ed-config__tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div className="ed-config__panel">
          <div>
            <div className="ed-config__step-num">{step.num}</div>
            <h3 className="ed-config__step-hl">{step.hl}</h3>
            <p className="ed-config__step-body">{step.body}</p>
            <a href={step.href} className="ed-btn ed-btn--primary">{step.cta}</a>
          </div>
          <div className="ed-config__img">
            <img src={step.img} alt={step.hl} />
          </div>
        </div>
      </div>
    </section>
  );
}
