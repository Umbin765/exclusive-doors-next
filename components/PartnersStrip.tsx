const brands = [
  { name: 'GRAUTHOFF', href: '/products/interior' },
  { name: 'GROKE', href: '/products/exterior' },
  { name: 'SUPERLOCK', href: '/products/exterior' },
  { name: 'HÖRMANN', href: '/products/exterior' },
  { name: 'HGM', href: '/products/interior' },
  { name: 'L&H', href: '/products/glisante' },
];

export default function PartnersStrip() {
  return (
    <section className="ed-partners">
      <div className="ed-partners__inner">
        <span className="ed-partners__label">Branduri reprezentate</span>
        <div className="ed-partners__logos">
          {brands.map((b) => (
            <a key={b.name} href={b.href} className="ed-partners__logo">
              {b.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
