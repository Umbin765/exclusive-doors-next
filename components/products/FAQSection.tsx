'use client';

import { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

const DEFAULT_FAQS: FAQ[] = [
  {
    q: 'Ce este un sistem Filomuro și cum diferă de o ușă normală?',
    a: 'Filomuro înseamnă că ușa este montată flush cu peretele — tocul este invizibil, integrat în structura peretelui. Spre deosebire de o ușă clasică cu toc vizibil, Filomuro creează o suprafață continuă. Necesită pregătire specială a golului de zid.',
  },
  {
    q: 'Furniritul de stejar se zgârie sau se deteriorează ușor?',
    a: 'Furniriul de 0.6mm este tratat cu lac mat anti-UV în 2 straturi. Rezistă la zgărieturi normale, dar nu la contactul prelungit cu apă sau la impact puternic. Nu este recomandat în băi fără ventilație sau în spații cu umiditate mare.',
  },
  {
    q: 'Cât durează montajul și ce pregătiri sunt necesare?',
    a: 'Montajul durează 1–2 zile per cameră, în funcție de numărul de uși. Golul de zid trebuie finalizat și uscat. Echipa Exclusive Doors vine mai întâi pentru măsurători gratuite. Producția durează 4–8 săptămâni de la confirmare.',
  },
  {
    q: 'Pot schimba esența de furnir sau dimensiunile după comandă?',
    a: 'Nu. Fiecare ușă Filomuro este produsă la comandă, dimensional și ca finisaj. Modificările nu sunt posibile după confirmarea comenzii și plata avansului. De aceea consultația și mostrele fizice din showroom sunt esențiale înainte de decizie.',
  },
  {
    q: 'Ce include garanția de 5 ani?',
    a: 'Garanția acoperă defecte de fabricație, deformarea panoului, defecțiuni ale garniturilor și problemele de aliniere apărute din motive de producție. Nu acoperă deteriorarea cauzată de utilizare incorectă, umiditate excesivă sau intervenții neautorizate.',
  },
];

export default function FAQSection({ faqs = DEFAULT_FAQS }: { faqs?: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq">
      <div className="section-meta">
        <span className="section-num">§ Întrebări frecvente</span>
        <span className="section-label">Răspunsuri directe · Fără marketing</span>
      </div>
      <div className="faq-grid">
        <div>
          <h2 className="faq-h2">ÎN<span>TREBĂRI</span><br />DIRECTE.</h2>
          <p className="faq-intro">
            Cele mai comune întrebări primite în showroom — răspunsuri concrete, fără marketing.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' open' : ''}`}
            >
              <div
                className="faq-q"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
