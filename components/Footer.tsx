import { footerColumns } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          © {year} Exclusive Doors. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
