import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="bg-stone-50 border-t border-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-8">
          Din aceeași categorie
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
