'use client';

import { useState, useRef } from 'react';
import { megaMenus } from '@/lib/data';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <div className="nav-wrapper">
        <nav className="ref-nav">
          {/* Logo */}
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt="Exclusive Doors" className="nav-logo-img" />
          </a>

          {/* Centre links */}
          <div className="nav-links">
            {Object.entries(megaMenus).map(([key, menu]) => (
              <a
                key={key}
                href={menu.href}
                className={activeMenu === key ? 'mega-active' : ''}
                onMouseEnter={() => openMenu(key)}
                onMouseLeave={scheduleClose}
              >
                {menu.label}
              </a>
            ))}
            <a href="/portofoliu">Proiecte</a>
            <a href="#contact">Showroom</a>
          </div>

          {/* Right actions */}
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

        {/* Mega menu panel */}
        {activeMenu && megaMenus[activeMenu] && (
          <div
            className="mega-menu"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="mega-inner">
              {/* Left: category list */}
              <div className="mega-cats">
                <div className="mega-section-label">Categorii</div>
                {megaMenus[activeMenu].categories.map((cat) => (
                  <a key={cat} href={megaMenus[activeMenu].href} className="mega-cat-link">
                    {cat}
                  </a>
                ))}
                <a href={megaMenus[activeMenu].href} className="mega-view-all">
                  Văzuieste tot →
                </a>
              </div>

              {/* Right: image cards */}
              <div className="mega-cards-area">
                <div className="mega-section-label">{megaMenus[activeMenu].heading}</div>
                <div className="mega-cards">
                  {megaMenus[activeMenu].cards.map((card) => (
                    <a key={card.title} href={card.href} className="mega-card">
                      <div className="mega-card-img">
                        <img src={card.img} alt={card.title} />
                        {card.salePercent && (
                          <div className="mega-card-badge">−{card.salePercent}%</div>
                        )}
                      </div>
                      <div className="mega-card-info">
                        <div className="mega-card-title">{card.title}</div>
                        <div className="mega-card-desc">{card.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
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
