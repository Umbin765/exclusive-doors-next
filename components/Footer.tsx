const socialLinks: Record<string, string> = {
  Facebook: 'https://www.facebook.com/exclusivedoors.ro/',
  Instagram: 'https://www.instagram.com/exclusivedoors.ro/',
  'Google Maps': 'https://maps.google.com/?cid=17163938270079558934',
};

const cols = [
  {
    head: 'Produse',
    links: [
      { label: 'Uși Interior', href: '/products/interior' },
      { label: 'Uși Exterior', href: '/products/exterior' },
      { label: 'Uși Glisante', href: '/products/glisante' },
      { label: 'Uși Pivotante', href: '/products/pivotante' },
    ],
  },
  {
    head: 'Branduri',
    links: [
      { label: 'Grauthoff', href: '/products/interior' },
      { label: 'Groke', href: '/products/exterior' },
      { label: 'Superlock', href: '/products/exterior' },
      { label: 'Hörmann', href: '/products/exterior' },
    ],
  },
  {
    head: 'Companie',
    links: [
      { label: 'Portofoliu', href: '/portofoliu' },
      { label: 'Contact', href: '#contact' },
      { label: 'Facebook', href: socialLinks['Facebook'] },
      { label: 'Instagram', href: socialLinks['Instagram'] },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ed-footer">
      <div className="ed-footer__inner">
        <div className="ed-footer__grid">
          {/* Brand column */}
          <div className="ed-footer__brand">
            <img src="/logo.png" alt="Exclusive Doors" />
            <p className="ed-footer__tagline">
              Importator unic Grauthoff în România.<br />
              Showroom Otopeni, județul Ilfov.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.head}>
              <span className="ed-footer__col-head">{col.head}</span>
              <ul className="ed-footer__col-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ed-footer__bottom">
          <span>© {year} Exclusive Doors. Toate drepturile rezervate.</span>
          <span>Airport Plaza, Drumul Gării Odăi 1A (DN1), Otopeni, Ilfov</span>
        </div>
      </div>
    </footer>
  );
}
