'use client';

import { useState } from 'react';
import { megaMenus } from '@/lib/data';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="ref-nav">
        <a href="/" className="nav-logo">
          <img src="/logo.png" alt="Exclusive Doors" className="nav-logo-img" />
        </a>

        <div className="nav-links">
          {Object.entries(megaMenus).map(([key, menu]) => (
            <a key={key} href={menu.href}>{menu.label}</a>
          ))}
          <a href="/portofoliu">Proiecte</a>
          <a href="#contact">Showroom</a>
        </div>

        <div className="nav-right">
          <a href="tel:0728959652" className="nav-phone">0728 959 652</a>
          <a href="#contact" className="nav-cta">Programează</a>
          <button
            className="nav-burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Deschide meniu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer__head">
              <a href="/" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="Exclusive Doors" style={{ height: '28px', width: 'auto' }} />
              </a>
              <button onClick={() => setMobileOpen(false)} aria-label="Închide">✕</button>
            </div>
            <div className="mobile-drawer__links">
              {Object.entries(megaMenus).map(([key, menu]) => (
                <a key={key} href={menu.href} onClick={() => setMobileOpen(false)}>{menu.label}</a>
              ))}
              <a href="/portofoliu" onClick={() => setMobileOpen(false)}>Proiecte</a>
              <a href="#contact" onClick={() => setMobileOpen(false)}>Showroom</a>
            </div>
            <div className="mobile-drawer__foot">
              <a href="tel:0728959652" className="mobile-tel">0728 959 652</a>
              <a href="#contact" className="nav-cta" style={{ textAlign: 'center', borderRadius: '100px' }} onClick={() => setMobileOpen(false)}>
                Programează consultația
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
