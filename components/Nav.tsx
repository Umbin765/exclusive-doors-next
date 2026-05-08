'use client';

import { useState } from 'react';
import { megaMenus } from '@/lib/data';

export default function Nav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="bg-cream border-b border-warm-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" className="shrink-0 flex items-center">
              <img
                src="/logo.png"
                alt="Exclusive Doors"
                className="h-8 sm:h-9 w-auto"
              />
            </a>

            {/* Mega-menu items — desktop only */}
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
                        : 'text-warm-muted border-transparent hover:text-warm-text'
                    }`}
                  >
                    {menu.label}
                  </a>

                  {activeMenu === key && (
                    <div className="absolute top-full left-0 w-[41.25rem] bg-cream shadow-2xl border border-warm-border p-6 grid grid-cols-[10rem_1fr] gap-6 rounded-xl">
                      {/* Category list */}
                      <div>
                        <p className="text-[0.625rem] font-bold uppercase tracking-widest text-warm-muted mb-3">
                          Categorii
                        </p>
                        <ul className="space-y-0.5">
                          {menu.categories.map((cat) => (
                            <li key={cat}>
                              <a
                                href="#"
                                className="text-sm text-warm-text hover:text-accent transition-colors block py-1"
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
                        <p className="text-[0.625rem] font-bold uppercase tracking-widest text-warm-muted mb-3">
                          {menu.heading}
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {menu.cards.map((card) => (
                            <a key={card.title} href={card.href} className="group">
                              <div className="h-28 overflow-hidden rounded mb-2 bg-warm-subtle">
                                <img
                                  src={card.img}
                                  alt={card.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="font-semibold text-xs text-warm-text mb-0.5">
                                {card.title}
                              </div>
                              <div className="text-xs text-warm-muted leading-snug line-clamp-2">
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

              <span className="text-warm-border mx-1 text-xs select-none">|</span>
              <a href="#contact" className="px-3 h-full flex items-center text-sm text-warm-muted hover:text-warm-text transition-colors">
                Despre Noi
              </a>
              <a href="#contact" className="px-3 h-full flex items-center text-sm text-warm-muted hover:text-warm-text transition-colors">
                Contact
              </a>
            </div>

            {/* Right: phone + CTA + hamburger */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <a href="tel:0728959652" className="text-sm font-semibold hidden md:block text-warm-text">
                0728 959 652
              </a>
              <a
                href="#contact"
                className="hidden sm:block bg-warm-dark text-cream text-sm px-4 sm:px-5 py-2.5 hover:bg-warm-text transition-colors"
              >
                Programare showroom
              </a>
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label="Deschide meniu"
              >
                <span className="block w-5 h-0.5 bg-warm-text" />
                <span className="block w-5 h-0.5 bg-warm-text" />
                <span className="block w-3.5 h-0.5 bg-warm-text" />
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-auto w-full max-w-sm bg-cream h-full overflow-y-auto flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-warm-border sticky top-0 bg-cream z-10">
              <a href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="Exclusive Doors" className="h-7 w-auto" />
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900"
                aria-label="Închide meniu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu sections */}
            <div className="flex-1 px-5 py-4 space-y-6">
              {Object.entries(megaMenus).map(([key, menu]) => (
                <div key={key}>
                  <a
                    href={menu.href}
                    className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-2 block hover:text-accent transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {menu.label}
                  </a>
                  <ul className="space-y-0.5 pl-1">
                    {menu.categories.map((cat) => (
                      <li key={cat}>
                        <a
                          href={menu.href}
                          className="text-sm text-gray-500 hover:text-accent transition-colors block py-1"
                          onClick={() => setMobileOpen(false)}
                        >
                          {cat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-warm-border pt-5 space-y-3">
                <a
                  href="#contact"
                  className="text-sm text-gray-600 hover:text-accent transition-colors block"
                  onClick={() => setMobileOpen(false)}
                >
                  Despre Noi
                </a>
                <a
                  href="#contact"
                  className="text-sm text-gray-600 hover:text-accent transition-colors block"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="px-5 py-5 border-t border-warm-border space-y-3">
              <a
                href="tel:0728959652"
                className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-accent transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0728 959 652
              </a>
              <a
                href="#contact"
                className="block w-full bg-warm-dark text-cream text-sm font-bold px-5 py-3 text-center hover:bg-warm-text transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Programare showroom
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
