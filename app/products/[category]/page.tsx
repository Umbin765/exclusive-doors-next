import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CategoryHero from '@/components/products/CategoryHero';
import ProductCard from '@/components/products/ProductCard';
import { products, categoryMeta } from '@/lib/data';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  if (!categoryMeta[category]) notFound();

  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <>
      <Nav />
      <CategoryHero category={category} />
      <section className="py-14 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
