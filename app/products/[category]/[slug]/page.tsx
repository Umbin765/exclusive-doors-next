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
      <Breadcrumb category={category} productName={product.name} />

      {/* Split: gallery left, details right */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col">
          <ProductGallery
            mainImg={product.mainImg}
            thumbImgs={product.thumbImgs}
            alt={product.name}
          />
          {/* Related products — compact strip below gallery */}
          {related.length > 0 && (
            <div className="bg-stone-50 border-t border-gray-100 px-5 py-5">
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-4">
                Din aceeași categorie
              </p>
              <div className="flex flex-col gap-3">
                {related.map((p) => (
                  <a
                    key={p.slug}
                    href={`/products/${p.category}/${p.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={p.mainImg}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">{p.eyebrow}</p>
                      <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-accent transition-colors duration-200">{p.name}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-accent shrink-0 ml-auto transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <ProductDetails product={product} />
      </section>

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
