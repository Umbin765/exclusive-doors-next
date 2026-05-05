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
      {/* Hero: breadcrumb + split layout */}
      {/* Mobile: natural height stacked; Desktop: viewport-filling side-by-side */}
      <div className="flex flex-col lg:h-[calc(100vh-4rem)]">
        <Breadcrumb category={category} productName={product.name} />
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] xl:grid-cols-[2fr_1fr] 2xl:grid-cols-[2.5fr_1fr] lg:min-h-0 lg:overflow-hidden">
          <ProductGallery
            mainImg={product.mainImg}
            thumbImgs={product.thumbImgs}
            alt={product.name}
            salePercent={product.salePercent}
          />
          {/* Right column: details panel */}
          <div className="bg-stone-50 border-t lg:border-t-0 lg:border-l border-gray-100 p-4 lg:p-5 lg:h-full lg:flex lg:flex-col">
            <div className="lg:flex-1 lg:min-h-0 bg-white rounded-xl overflow-hidden">
              <ProductDetails product={product} />
            </div>
          </div>
        </section>
      </div>

      {/* Related products */}
      <RelatedProducts products={related} />

      {/* Description */}
      <div className="bg-stone-50 border-t border-gray-100 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[0.625rem] font-bold tracking-[0.3em] uppercase text-gray-300 mb-4">
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
