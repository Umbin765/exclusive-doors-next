import { Product } from '@/lib/data';
import Link from 'next/link';
import SaleBadge from './SaleBadge';
import GermanBadge from './GermanBadge';

export default function ProductCard({ product }: { product: Product }) {
  const onSale = !!product.salePercent;

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className={`relative group block border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${
        onSale
          ? 'border-accent/40 hover:border-accent'
          : 'border-transparent hover:border-accent'
      }`}
    >
      {onSale && (
        <div className="absolute -top-4 -left-4 z-10">
          <SaleBadge percent={product.salePercent!} />
        </div>
      )}
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={product.mainImg}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.madeInGermany && (
          <div className="absolute bottom-3 right-3">
            <GermanBadge />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 bg-cream">
        <p className="text-[0.625rem] font-bold tracking-[0.3em] uppercase text-accent mb-1">
          {product.eyebrow}
        </p>
        <h3 className="font-display font-semibold text-warm-text text-base leading-tight">{product.name}</h3>
        <p className="text-xs text-warm-muted mt-1">{product.model}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="border border-warm-border text-warm-muted text-[0.5625rem] tracking-widest px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className={`mt-4 w-full border-2 text-[0.625rem] font-bold tracking-[0.15em] uppercase py-2.5 text-center transition-colors duration-200 ${
            onSale
              ? 'border-accent text-warm-text group-hover:bg-accent'
              : 'border-warm-border text-warm-muted group-hover:border-warm-muted'
          }`}
        >
          Detalii →
        </div>
      </div>
    </Link>
  );
}
