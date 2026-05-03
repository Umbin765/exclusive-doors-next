import { footerColumns } from '@/lib/data';

const socialLinks: Record<string, string> = {
  Facebook: 'https://www.facebook.com/exclusivedoors.ro/',
  Instagram: 'https://www.instagram.com/exclusivedoors.ro/',
  'Google Maps': 'https://maps.google.com/?cid=17163938270079558934',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Contact strip */}
        <div className="flex flex-wrap gap-6 items-center mb-10 pb-10 border-b border-gray-800">
          <span className="text-sm font-bold tracking-widest uppercase text-white mr-2">Exclusive Doors</span>
          <a href="tel:+40728959652" className="text-sm text-gray-400 hover:text-white transition-colors">
            0728 959 652
          </a>
          <a href="mailto:office@exclusivedoors.ro" className="text-sm text-gray-400 hover:text-white transition-colors">
            office@exclusivedoors.ro
          </a>
          <span className="text-sm text-gray-500">Airport Plaza, Drumul Gării Odăi 1A (DN1), Parter, 075100 Otopeni, Ilfov</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={socialLinks[link] ?? '#'}
                      target={socialLinks[link] ? '_blank' : undefined}
                      rel={socialLinks[link] ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          © {year} Exclusive Doors. Toate drepturile rezervate. Înființat în 2011.
        </div>
      </div>
    </footer>
  );
}
