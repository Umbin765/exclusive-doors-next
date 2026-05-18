const problems = [
  {
    num: '01',
    title: 'Prea multe opțiuni, nicio claritate',
    text: 'Sute de modele, zeci de branduri, finisaje infinite — fără un ghid expert, ajungi să alegi la întâmplare.',
  },
  {
    num: '02',
    title: 'Specificații tehnice greu de verificat',
    text: 'Izolație fonică, coeficient termic, clasa de efracție — parametrii pe care nu știi cum să-i compari corect.',
  },
  {
    num: '03',
    title: 'Montaj improvizat care anulează calitatea',
    text: 'O ușă premium montată prost e mai rea decât una medie montată corect. Golul de toc, nivelul, garnitura — contează.',
  },
  {
    num: '04',
    title: 'Termene și prețuri neclare',
    text: 'Oferte fără TVA, livrare "estimativă", costuri ascunse la montaj. Surprizele apar întotdeauna la final.',
  },
];

export default function ProblemSection() {
  return (
    <section className="ed-problem">
      <div className="ed-problem__inner">
        <div className="ed-problem__head">
          <div>
            <span className="ed-eyebrow" style={{ color: 'rgba(255,255,255,0.35)' }}>
              De ce e greu să alegi
            </span>
            <h2 className="ed-problem__hl">
              4 probleme reale<br />ale cumpărătorului<br />de uși premium
            </h2>
          </div>
          <p className="ed-problem__sub">
            Le-am auzit de mii de ori în showroom. Sistemul nostru de consultanță
            există tocmai ca să le rezolve — în 15 minute, nu în 6 luni.
          </p>
        </div>

        <div className="ed-problem__grid">
          {problems.map((p) => (
            <div key={p.num} className="ed-problem__card">
              <div className="ed-problem__num">{p.num}</div>
              <h3 className="ed-problem__card-title">{p.title}</h3>
              <p className="ed-problem__card-text">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
