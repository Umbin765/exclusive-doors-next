'use client';

import { useState } from 'react';
import { megaMenus } from '@/lib/data';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="ed-nav">
        <div className="ed-nav__inner">
          {/* Logo */}
          <a href="/" className="ed-nav__logo">
            <img src="/logo.png" alt="Exclusive Doors" />
          </a>

          {/* Desktop nav links */}
          <nav className="ed-nav__links">
            {Object.entries(megaMenus).map(([key, menu]) => (
              <a key={key} href={menu.href} className="ed-nav__link">
                {menu.label}
              </a>
            ))}
            <a href="/portofoliu" className="ed-nav__link">Portofoliu</a>
            <a href="#contact" className="ed-nav__link">Contact</a>
          </nav>

          {/* Right: phone + CTA pill + burger */}
          <div className="ed-nav__right">
            <a href="tel:0728959652" className="ed-nav__phone">0728 959 652</a>
            <a href="#contact" className="ed-nav__cta">Programează</a>
            <button
              className="ed-nav__burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Deschide meniu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="ed-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="ed-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ed-mobile-drawer__head">
              <a href="/" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="Exclusive Doors" />
              </a>
              <button onClick={() => setMobileOpen(false)} aria-label="Închide">✕</button>
            </div>

            <div className="ed-mobile-drawer__links">
              {Object.entries(megaMenus).map(([key, menu]) => (
                <a key={key} href={menu.href} onClick={() => setMobileOpen(false)}>
                  {menu.label}
                </a>
              ))}
              <a href="/portofoliu" onClick={() => setMobileOpen(false)}>Portofoliu</a>
              <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
            </div>

            <div className="ed-mobile-drawer__foot">
              <a href="tel:0728959652" className="ed-mobile-tel">0728 959 652</a>
              <a href="#contact" className="ed-nav__cta" onClick={() => setMobileOpen(false)}>
                Programează consultația
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
