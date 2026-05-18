import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import StickyBar from '@/components/products/StickyBar';
import ProductGallery from '@/components/products/ProductGallery';
import StickyScroll from '@/components/products/StickyScroll';
import FinishSection from '@/components/products/FinishSection';
import FAQSection from '@/components/products/FAQSection';
import { products, Product } from '@/lib/data';

interface Props {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export default function ProductPage({ params }: Props) {
  const { category, slug } = params;
  const product = products.find((p) => p.category === category && p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 3);
  const eyebrowParts = product.eyebrow.split('·');
  const brandLabel = eyebrowParts.length > 1 ? eyebrowParts[1].trim() : eyebrowParts[0].trim();
  const salePrice = product.salePercent
    ? Math.round(product.startingPrice * (1 - product.salePercent / 100))
    : product.startingPrice;

  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <nav className="pd-breadcrumb">
        <a href="/">exclusivedoors.ro</a>
        <span className="sep">›</span>
        <a href={`/products/${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</a>
        <span className="sep">›</span>
        <a href={`/products/${category}`}>{brandLabel}</a>
        <span className="sep">›</span>
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Sticky conversion bar */}
      <StickyBar product={product} />

      {/* ── S1: Hero product ── */}
      <section className="pd-hero" id="pd-hero">
        <ProductGallery product={product} />

        <div className="pd-info">
          <div className="pd-eyebrow">{product.eyebrow}</div>
          <h1 className="pd-title">{product.name.toUpperCase()}</h1>
          <p className="pd-subtitle">
            {product.description.split('.').slice(0, 2).join('. ')}.
          </p>

          {/* Characteristic chips */}
          <div className="char-grid">
            {product.specs.map((spec) => (
              <div key={spec.key} className="char-item">
                <div className="char-label">{spec.key}</div>
                <div className={`char-value${spec.key.includes('fonică') || spec.key.includes('Garanție') ? ' highlight' : ''}`}>
                  {spec.value}
                </div>
              </div>
            ))}
            <div className="char-item">
              <div className="char-label">Disponibilitate</div>
              <div className="char-value">La comandă</div>
            </div>
          </div>

          {/* Finish selector */}
          <div className="config-section">
            <div className="config-label">
              <span>Esență furnir</span>
              <a>Ghid finisaje →</a>
            </div>
            <div className="options-row">
              {product.finishes.map((f, i) => (
                <button key={i} className={`opt-chip${i === 0 ? ' active' : ''}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Opening direction */}
          <div className="config-section">
            <div className="config-label"><span>Sens deschidere</span></div>
            <div className="options-row">
              <button className="dir-chip active">↩ Stânga · Interior</button>
              <button className="dir-chip">↪ Dreapta · Interior</button>
              <button className="dir-chip">↩ Stânga · Exterior</button>
              <button className="dir-chip">↪ Dreapta · Exterior</button>
            </div>
          </div>

          {/* Dimensions */}
          <div className="config-section">
            <div className="config-label">
              <span>Dimensiuni gol de zid</span>
              <a>Cum măsor? →</a>
            </div>
            <div className="dims-row">
              <div className="dim-input">
                <label>Lățime gol</label>
                <span className="dim-val">900 <span className="dim-unit">mm</span></span>
              </div>
              <div className="dim-input">
                <label>Înălțime gol</label>
                <span className="dim-val">2100 <span className="dim-unit">mm</span></span>
              </div>
              <div className="dim-input">
                <label>Grosime perete</label>
                <span className="dim-val">150 <span className="dim-unit">mm</span></span>
              </div>
              <div className="dim-input">
                <label>Număr de foi</label>
                <span className="dim-val">1 foaie</span>
              </div>
            </div>
          </div>

          {/* Price block */}
          {product.salePercent ? (
            <div className="price-block">
              <div>
                <div className="price-promo-label">Promoție activă</div>
                <div>
                  <span className="price-main">{salePrice.toLocaleString('ro-RO')} €</span>
                  <span className="price-orig">{product.startingPrice.toLocaleString('ro-RO')} €</span>
                </div>
                <div className="price-vat">+ TVA · Preț indicativ · Ofertă exactă la consultație</div>
              </div>
              <div className="price-badge">−{product.salePercent}%</div>
            </div>
          ) : (
            <div className="price-block">
              <div>
                <div className="price-promo-label">Preț de la</div>
                <div className="price-main">{product.startingPrice.toLocaleString('ro-RO')} €</div>
                <div className="price-vat">+ TVA · Preț indicativ · Ofertă exactă la consultație</div>
              </div>
            </div>
          )}

          {/* CTA stack */}
          <div className="cta-stack">
            <a href="#contact" className="btn-primary-lg">Cere ofertă de preț</a>
            <a href="#contact" className="btn-secondary-lg">Programare showroom</a>
            <a href="tel:0728959652" className="btn-phone-lg">📞 0728 959 652 · Consultanță gratuită</a>
          </div>

          {/* Expert card */}
          <div className="expert-card">
            <div className="expert-avatar">
              <img src="/monica.png" alt="Monica Dochia" />
            </div>
            <div>
              <div className="expert-name">Monica Dochia</div>
              <div className="expert-role">Director de vânzări</div>
            </div>
            <div className="expert-contact">
              <a href="tel:0728959652">0728 959 652</a>
              <a href="mailto:monica.dochia@exclusivedoors.ro">monica.dochia@</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── S2: Scroll story ── */}
      <StickyScroll stops={product.scrollStops} badge={product.eyebrow} />

      {/* ── S3: Technical specs ── */}
      <section className="specs-section">
        <div className="section-meta">
          <span className="section-num">§ Specificații tehnice complete</span>
          <span className="section-label">Valori verificabile · Certificări disponibile</span>
        </div>
        <div className="specs-grid">
          <div>
            <h2 className="specs-h2">SPECS<br /><span>TEHNICE.</span></h2>
            <table className="specs-table">
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.key} className={spec.key.includes('fonică') || spec.key.includes('Înălțime') ? 'spec-hl' : ''}>
                    <td>{spec.key}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
                <tr><td>Finisaj suprafață</td><td>Lac mat anti-UV, aplicat în 2 straturi</td></tr>
                <tr><td>Garnituri</td><td>EPDM triple perimetrale</td></tr>
                <tr><td>Lățimi disponibile</td><td>600 · 700 · 800 · 900 · 1000 mm</td></tr>
                <tr><td>Grosime panou</td><td>45 mm</td></tr>
                <tr><td>Certificare</td><td>CE EN 14351-1 <span className="spec-cert">CE</span></td></tr>
                <tr><td>Origine</td><td>Westfalia, Germania 🇩🇪</td></tr>
                <tr><td>Producție</td><td>La comandă · 4–8 săptămâni</td></tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="specs-visual">
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Secțiune transversală panou
              </div>
              <div className="xsec-diagram">
                <div className="xsec">
                  <div className="xsec-l1" />
                  <div className="xsec-l2" />
                  <div className="xsec-l3">MDF 19mm</div>
                  <div className="xsec-l4" />
                  <div className="xsec-l5" />
                </div>
                <div className="xsec-legend">
                  <div className="xsec-leg">
                    <div className="xsec-dot" style={{ background: '#8B6914' }} />
                    <span className="xsec-leg-text">Furnir stejar 0.6mm</span>
                  </div>
                  <div className="xsec-leg">
                    <div className="xsec-dot" style={{ background: '#C4A35A' }} />
                    <span className="xsec-leg-text">Cadru lemn masiv</span>
                  </div>
                  <div className="xsec-leg">
                    <div className="xsec-dot" style={{ background: '#D4C09A' }} />
                    <span className="xsec-leg-text">MDF hidrofug 19mm</span>
                  </div>
                </div>
              </div>
              <div className="xsec-title">45mm total panou</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S4: Finishes ── */}
      <FinishSection finishes={product.finishes} />

      {/* ── S5: FAQ ── */}
      <FAQSection />

      {/* ── S6: Similar products ── */}
      <section className="similar-section">
        <div className="similar-header">
          <h2 className="similar-h2">
            POATE TE<br />INTERESEAZĂ<br />ȘI <span>ACESTEA.</span>
          </h2>
          <a href={`/products/${category}`} className="similar-view-all">
            Vezi toate ușile {category} →
          </a>
        </div>
        <div className="similar-grid">
          {related.map((p) => {
            const relBrand = p.eyebrow.split('·').slice(0, 2).join('·').trim();
            const relSalePrice = p.salePercent
              ? Math.round(p.startingPrice * (1 - p.salePercent / 100))
              : null;
            return (
              <a
                key={p.slug}
                href={`/products/${p.category}/${p.slug}`}
                className="similar-card"
              >
                <div className="similar-img">
                  <img src={p.mainImg} alt={p.name} />
                  {p.salePercent && (
                    <div className="similar-badge">−{p.salePercent}%</div>
                  )}
                </div>
                <div className="similar-info">
                  <div className="similar-brand">{relBrand}</div>
                  <div className="similar-name">{p.name}</div>
                  <div className="similar-chips">
                    {p.tags.map((tag) => (
                      <span key={tag} className="similar-chip">{tag}</span>
                    ))}
                  </div>
                  <div className="similar-link">Detalii produs</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── S7: Consult CTA ── */}
      <section className="consult-section" id="contact">
        <div className="consult-grid">
          <div>
            <h2 className="consult-h2">ALEGE<br />CORECT<br />DIN PRIMA.</h2>
            <p className="consult-sub">
              Vino 15 minute în showroom. Vedem mostrele fizice de furnir, verificăm dacă
              produsul se potrivește cu golul tău de zid, și pleci cu o ofertă exactă — fără surprize.
            </p>
            <div>
              <a href="tel:0728959652" className="btn-white">Programează consultația</a>
              <a href="tel:0728959652" className="btn-woutline">0728 959 652</a>
            </div>
            <p className="consult-note">Gratuit · Fără obligații · Otopeni, Ilfov</p>
          </div>

          <div className="consult-card">
            <div className="consult-card-header">
              <div className="consult-avatar">
                <img src="/monica.png" alt="Monica Dochia" />
              </div>
              <div>
                <div className="consult-name">Monica Dochia</div>
                <div className="consult-role">Director de vânzări · Exclusive Doors</div>
              </div>
            </div>
            <div className="consult-body">
              <div className="consult-item">
                <span className="consult-ico">📞</span>
                <a href="tel:0728959652">0728 959 652</a>
              </div>
              <div className="consult-item">
                <span className="consult-ico">✉</span>
                <a href="mailto:monica.dochia@exclusivedoors.ro">monica.dochia@exclusivedoors.ro</a>
              </div>
              <div className="consult-item">
                <span className="consult-ico">📍</span>
                Drumul Gării Odăi 1A, Otopeni, Ilfov
              </div>
              <div className="consult-item">
                <span className="consult-ico">🕐</span>
                Lun–Vin 09–18 · Sâm 10–14
              </div>
              <div className="consult-item">
                <span className="consult-ico">💬</span>
                <a href="https://wa.me/40728959652">WhatsApp direct →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
