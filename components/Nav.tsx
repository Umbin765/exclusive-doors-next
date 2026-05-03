'use client';

import { useState } from 'react';
import { megaMenus } from '@/lib/data';

export default function Nav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="text-lg font-bold tracking-widest shrink-0">
            EXCLUSIVE DOORS
          </a>

          {/* Mega-menu items */}
          <div className="hidden lg:flex items-center h-full">
            {Object.entries(megaMenus).map(([key, menu]) => (
              <div
                key={key}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMenu(key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={menu.href}
                  className={`px-3 h-full flex items-center text-sm border-b-2 transition-colors ${
                    activeMenu === key
                      ? 'text-accent border-accent'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {menu.label}
                </a>

                {activeMenu === key && (
                  <div className="absolute top-full left-0 w-[660px] bg-white shadow-2xl border border-gray-100 p-6 grid grid-cols-[160px_1fr] gap-6">
                    {/* Category list */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Categorii
                      </p>
                      <ul className="space-y-0.5">
                        {menu.categories.map((cat) => (
                          <li key={cat}>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-accent transition-colors block py-1"
                            >
                              {cat}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={menu.href}
                        className="text-accent text-xs font-semibold mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Vezi toate →
                      </a>
                    </div>

                    {/* Photo cards */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        {menu.heading}
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {menu.cards.map((card) => (
                          <a key={card.title} href="#" className="group">
                            <div className="h-28 overflow-hidden rounded mb-2 bg-gray-100">
                              <img
                                src={card.img}
                                alt={card.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="font-semibold text-xs text-gray-900 mb-0.5">
                              {card.title}
                            </div>
                            <div className="text-xs text-gray-400 leading-snug line-clamp-2">
                              {card.desc}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <span className="text-gray-300 mx-1 text-xs select-none">|</span>
            <a href="#contact" className="px-3 h-full flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Despre Noi
            </a>
            <a href="#contact" className="px-3 h-full flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>

          {/* Phone + CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <a href="tel:0757874874" className="text-sm font-semibold hidden md:block">
              0757 874 874
            </a>
            <a
              href="#contact"
              className="bg-gray-900 text-white text-sm px-5 py-2.5 hover:bg-gray-700 transition-colors"
            >
              Programare showroom
            </a>
          </div>

        </div>
      </nav>
    </header>
  );
}
