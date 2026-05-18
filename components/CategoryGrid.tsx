import { categories } from '@/lib/data';

const catalogItems = [
  {
    brand: 'Grauthoff Germania',
    name: 'HGM Fachwerk\nFurnir Stejar Natur',
    tags: ['Bestseller', 'Furnirui', 'Premium'],
    img: 'https://exclusivedoors.ro/wp-content/uploads/2024/09/Untitled-design-5-700x700.jpg',
    href: '/products/interior',
    hero: true,
    badge: 'Featured',
  },
  {
    brand: 'Grauthoff',
    name: 'HGM Classic Art Nuc',
    tags: ['Furnirui'],
    img: 'https://exclusivedoors.ro/wp-content/uploads/2021/12/HGM-WEISS-ART-TYP-101-409x546.jpg',
    href: '/products/interior',
    hero: false,
  },
  {
    brand: 'L&H',
    name: 'L&H Sticlă Securizată',
    tags: ['Modern'],
    img: 'https://exclusivedoors.ro/wp-content/uploads/2020/12/usi_sticla_securizata1_1-700x700.png',
    href: '/products/glisante',
    hero: false,
  },
  {
    brand: 'SUPERLOCK',
    name: 'SL Chic Antiefracție',
    tags: ['Exterior'],
    img: 'https://exclusivedoors.ro/wp-content/uploads/2020/12/SL-HI-TECH-8013.jpg',
    href: '/products/exterior',
    hero: false,
  },
  {
    brand: 'Groke',
    name: 'GROKE Modern Aluminiu',
    tags: ['Exterior'],
    img: 'https://exclusivedoors.ro/wp-content/uploads/2020/12/rupere_termica-700x700.jpg',
    href: '/products/exterior',
    hero: false,
  },
];

export default function CategoryGrid() {
  return (
    <section className="catalog-section" id="catalog">
      <div className="catalog-header">
        <div>
          <div className="section-eyebrow">Colecții selectate</div>
          <h2 className="catalog-h2">Uși germane,<br /><em>aici</em> în România.</h2>
          <p className="catalog-sub">
            Selecție de modele reprezentative din colecțiile noastre. Toate fabricate real în
            Germania, importate direct, instalate de echipa noastră.
          </p>
        </div>
        <div className="catalog-nav">
          <div className="catalog-nav-label">Toate categoriile</div>
          <a href="/products/interior">Uși interior</a>
          <a href="/products/exterior">Uși exterior</a>
          <a href="/products/glisante">Sticlă securizată</a>
          <a href="/products/pivotante">Tehnice &amp; garaj</a>
          <a href="/products/interior">Filomuro</a>
        </div>
      </div>

      <div className="catalog-grid">
        {catalogItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`catalog-item${item.hero ? ' catalog-item-hero' : ''}`}
          >
            <div className="catalog-item-img">
              <img src={item.img} alt={item.name.replace('\n', ' ')} />
              {item.badge && <div className="catalog-item-badge">{item.badge}</div>}
            </div>
            <div className="catalog-item-info">
              <div className="catalog-item-brand">{item.brand}</div>
              <div className="catalog-item-name">
                {item.name.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < item.name.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
              <div className="catalog-item-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="catalog-item-tag">{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
