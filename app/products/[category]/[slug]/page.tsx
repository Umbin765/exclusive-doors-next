import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
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

      {/* ── Breadcrumb + title (compact) ── */}
      <div className="bg-cream border-b border-warm-border px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.625rem] text-warm-muted tracking-wide mb-0.5">
              <a href="/" className="hover:text-accent transition-colors">Acasă</a>
              <span className="mx-1.5">/</span>
              <a href={`/products/${category}`} className="hover:text-accent transition-colors capitalize">{category}</a>
              <span className="mx-1.5">/</span>
              <span className="text-warm-text font-medium">{product.name}</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-semibold text-warm-text leading-tight">
              {product.name}
              <span className="text-sm font-normal text-warm-muted ml-3 hidden sm:inline">{brandLabel} · {product.model}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main product section ── */}
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 xl:gap-10">
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
