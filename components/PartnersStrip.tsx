const brands = [
  { name: 'Grauthoff', href: '/products/interior' },
  { name: 'Groke', href: '/products/exterior' },
  { name: 'Superlock', href: '/products/exterior' },
  { name: 'Hörmann', href: '/products/exterior' },
  { name: 'HGM', href: '/products/interior' },
  { name: 'L&H', href: '/products/glisante' },
];

export default function PartnersStrip() {
  return (
    <section className="partners-strip">
      <div className="partners-grid">
        <div className="partners-h">
          Colaborăm cu <em>arhitecți</em> &amp; designeri.
        </div>
        <div className="partners-list">
          {brands.map((b) => (
            <a key={b.name} href={b.href} className="partner-card">{b.name}</a>
          ))}
          <a href="#contact" className="partner-card partner-cta">Devino partener →</a>
        </div>
      </div>
    </section>
  );
}
