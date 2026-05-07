import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductGallery from '@/components/products/ProductGallery';
import ProductDetails from '@/components/products/ProductDetails';
import StickyScroll from '@/components/products/StickyScroll';
import RelatedProducts from '@/components/products/RelatedProducts';
import { products } from '@/lib/data';

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

  // Brand label from eyebrow: "Ușă Interior · Filomuro" → "Filomuro"
  const eyebrowParts = product.eyebrow.split('·');
  const brandLabel = eyebrowParts.length > 1 ? eyebrowParts[1].trim() : eyebrowParts[0].trim();

  return (
    <>
      <Nav />

      {/* ── Breadcrumb ── */}
      <Breadcrumb category={category} productName={product.name} />

      {/* ── Product title header ── */}
      <div className="bg-cream border-b border-warm-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-warm-text tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-warm-muted mt-0.5">{brandLabel}</p>
          </div>
          <p className="text-sm text-warm-muted italic hidden sm:block">{product.model}</p>
        </div>
      </div>

      {/* ── Main product section ── */}
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 xl:gap-14">
            <ProductGallery
              mainImg={product.mainImg}
              thumbImgs={product.thumbImgs}
              alt={product.name}
              salePercent={product.salePercent}
            />
            <ProductDetails product={product} />
          </div>
        </div>
      </div>

      {/* ── Detail images + Consultant ── */}
      <div className="bg-warm-subtle border-t border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-6 items-stretch">

          {/* Detail image strip */}
          <div className="flex gap-3 flex-1 overflow-x-auto">
            {product.details.map((d, i) => (
              <div key={i} className="shrink-0 flex-1 min-w-[140px] max-w-[220px]">
                <div className="relative h-36 sm:h-44 overflow-hidden">
                  <img src={d.img} alt={d.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                    <div>
                      <p className="text-white text-[0.5625rem] font-bold uppercase tracking-wide leading-tight">
                        {d.title}
                      </p>
                      <p className="text-white/60 text-[0.5rem] mt-0.5">
                        {d.specKey}: {d.specVal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultant card */}
          <div className="shrink-0 flex items-center gap-6 bg-cream px-8 py-7 border border-warm-border md:self-center min-w-[320px]">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 bg-warm-subtle ring-[3px] ring-accent/30">
              <img
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=300&q=80"
                alt="Monica Dochia"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-warm-text leading-tight">Monica Dochia</p>
              <p className="text-[0.625rem] font-semibold text-warm-muted uppercase tracking-[0.2em] mt-1 mb-4">
                Director de vânzări
              </p>
              <a
                href="tel:0728959652"
                className="block text-lg font-bold text-warm-text hover:text-accent transition-colors"
              >
                0728 959 652
              </a>
              <a
                href="mailto:monica.dochia@exclusivedoors.ro"
                className="block text-sm text-warm-muted hover:text-accent transition-colors mt-0.5"
              >
                monica.dochia@exclusivedoors.ro
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ── */}
      <RelatedProducts products={related} />

      {/* ── Animated product details ── */}
      <div id="product-details">
        <StickyScroll stops={product.scrollStops} badge={product.eyebrow} />
      </div>

      {/* ── Brand section ── */}
      <div className="bg-cream border-t border-warm-border px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-lg sm:text-xl text-warm-muted italic leading-relaxed font-light">
            &ldquo;{product.description.split('.').slice(0, 2).join('. ')}...&rdquo;
          </p>
          <div className="mt-8 inline-block border-t-2 border-warm-border pt-5">
            <span className="text-xl font-bold tracking-[0.3em] uppercase text-warm-muted">
              {brandLabel}
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
