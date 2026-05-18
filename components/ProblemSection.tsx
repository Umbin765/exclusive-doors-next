const problems = [
  {
    index: '№ 01',
    title: 'Paralizia opțiunilor',
    desc: 'Sute de modele, colecții, branduri — fără logică clară. Alegi pe baza prețului sau a imaginii. Nici una nu e criteriu bun.',
    cost: 'Cost potențial',
    costVal: '+€500–1.500',
  },
  {
    index: '№ 02',
    title: 'Capcana ușilor ieftine',
    desc: 'Se deformează în 2–3 ani. Nu izolează. Trebuie înlocuite. Practic plătești de două ori pentru același spațiu — odată ieftin, odată corect.',
    cost: 'Cost potențial',
    costVal: '2× prețul inițial',
  },
  {
    index: '№ 03',
    title: 'Decizia tardivă',
    desc: 'Ușile sunt printre ultimele decizii, dar golurile trebuie finalizate la timp. O alegere tardivă poate bloca tot proiectul de renovare cu 4–8 săptămâni.',
    cost: 'Cost potențial',
    costVal: '4–8 săptămâni',
  },
];

export default function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="section-meta">
        <span><span className="section-meta-num">№ 02</span> · Realitatea renovărilor</span>
        <span>Costul greșelii</span>
      </div>

      <div className="problem-grid">
        <div>
          <h2 className="problem-h2">
            Majoritatea aleg <em>greșit.</em><br />Și află după montaj.
          </h2>
          <p className="problem-intro-text">
            Cele 3 capcane în care cad cei mai mulți proprietari când vine momentul să aleagă
            ușile pentru renovarea lor.
          </p>
        </div>

        <div className="problems-list">
          {problems.map((p) => (
            <div key={p.index} className="problem-row">
              <div className="problem-index">{p.index}</div>
              <div>
                <h3 className="problem-title">{p.title}</h3>
                <p className="problem-desc">{p.desc}</p>
              </div>
              <div className="problem-cost">
                {p.cost}<br />
                <span className="problem-cost-val">{p.costVal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
