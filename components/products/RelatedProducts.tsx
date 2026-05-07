import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="bg-cream border-t border-warm-border px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-xl sm:text-2xl font-display font-semibold text-warm-text mb-8">
          Poate te interesează și modelele ăstea
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
