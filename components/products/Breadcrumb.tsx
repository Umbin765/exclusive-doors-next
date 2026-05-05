import Link from 'next/link';
import { categoryMeta } from '@/lib/data';

interface Props {
  category: string;
  productName: string;
}

export default function Breadcrumb({ category, productName }: Props) {
  const label = categoryMeta[category]?.label ?? category;
  return (
    <div className="bg-stone-50 border-b border-gray-100 px-6 py-2.5">
      <p className="text-[0.625rem] text-gray-400 tracking-wide">
        <Link href="/" className="hover:text-accent transition-colors">Acasă</Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link href={`/products/${category}`} className="hover:text-accent transition-colors">{label}</Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-600 font-medium">{productName}</span>
      </p>
    </div>
  );
}
