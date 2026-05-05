import { Product } from '@/lib/data';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block rounded-xl overflow-hidden border-2 border-transparent hover:border-accent shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="overflow-hidden h-56">
        <img
          src={product.mainImg}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 bg-white">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-1">
          {product.eyebrow}
        </p>
        <h3 className="font-bold text-gray-900 text-base leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-1">{product.model}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="border border-gray-200 text-gray-400 text-[9px] tracking-widest px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
