import { categories } from '@/lib/data';

export default function CategoryGrid() {
  const [hero, ...rest] = categories;

  return (
    <section className="ed-catalog" id="catalog">
      <div className="ed-catalog__inner">
        <div className="ed-catalog__head">
          <div>
            <span className="ed-label">Colecția noastră</span>
            <h2 className="ed-catalog__hl">
              Uși pentru orice<br />proiect premium
            </h2>
          </div>
          <a href="/products" className="ed-catalog__see-all">
            Vezi toate produsele →
          </a>
        </div>

        <div className="ed-mosaic">
          {/* Hero card — spans 2 rows */}
          <a href={hero.href} className="ed-mosaic__card ed-mosaic__card--hero">
            <img src={hero.img} alt={hero.title} />
            <div className="ed-mosaic__info">
              <span className="ed-mosaic__tag">{hero.tags}</span>
              <span className="ed-mosaic__title">{hero.title}</span>
            </div>
            <span className="ed-mosaic__arrow">↗</span>
          </a>

          {/* Remaining cards */}
          {rest.map((cat) => (
            <a key={cat.title} href={cat.href} className="ed-mosaic__card">
              <img src={cat.img} alt={cat.title} />
              <div className="ed-mosaic__info">
                <span className="ed-mosaic__tag">{cat.tags}</span>
                <span className="ed-mosaic__title">{cat.title}</span>
              </div>
              <span className="ed-mosaic__arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
