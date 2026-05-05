import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductGallery from '@/components/products/ProductGallery';
import ProductDetails from '@/components/products/ProductDetails';
import StickyScroll from '@/components/products/StickyScroll';
import RelatedProducts from '@/components/products/RelatedProducts';
import { products, categoryMeta } from '@/lib/data';

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

  const related = products
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Nav />
      {/* Viewport-filling hero: breadcrumb + split */}
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <Breadcrumb category={category} productName={product.name} />
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] min-h-0">
          <ProductGallery
            mainImg={product.mainImg}
            thumbImgs={product.thumbImgs}
            alt={product.name}
          />
          {/* Right column: details aligned to photo, spacer matches thumbnail strip */}
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <ProductDetails product={product} />
            </div>
            <div className="h-[88px] bg-stone-50 border-l border-gray-100" />
          </div>
        </section>
      </div>

      {/* Related products */}
      <RelatedProducts products={related} />

      {/* Description */}
      <div className="bg-stone-50 border-t border-gray-100 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-4">
            Despre produs
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{product.description}</p>
        </div>
      </div>

      {/* Sticky scroll */}
      <StickyScroll
        stops={product.scrollStops}
        badge={product.eyebrow}
      />

      <Footer />
    </>
  );
}
