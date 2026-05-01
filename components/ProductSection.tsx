import { ProductSectionData } from '@/lib/data';

export default function ProductSection({ section }: { section: ProductSectionData }) {
  const { id, eyebrow, heading, body, img, alt, imageLeft, dark } = section;

  const eyebrowClass = dark
    ? 'text-xs tracking-[0.3em] uppercase text-stone-400 mb-3'
    : 'text-xs tracking-[0.3em] uppercase text-gray-400 mb-3';
  const headingClass = dark
    ? 'text-3xl font-light leading-snug mb-5 text-white'
    : 'text-3xl font-light leading-snug mb-5';
  const bodyClass = dark
    ? 'text-stone-300 leading-relaxed mb-8'
    : 'text-gray-500 leading-relaxed mb-8';
  const ctaClass = dark
    ? 'inline-block border border-white/60 text-white text-sm px-7 py-3 hover:bg-white hover:text-gray-900 transition-colors'
    : 'inline-block border border-gray-900 text-sm px-7 py-3 hover:bg-gray-900 hover:text-white transition-colors';
  const bgClass = dark ? 'py-24 bg-stone-700' : 'py-24 bg-white';

  const imageEl = (
    <div data-aos={imageLeft ? 'fade-right' : 'fade-left'}>
      <img src={img} alt={alt} className="w-full h-[480px] object-cover rounded-lg" />
    </div>
  );

  const textEl = (
    <div data-aos={imageLeft ? 'fade-left' : 'fade-right'}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={headingClass}>{heading}</h2>
      <p className={bodyClass}>{body}</p>
      <a href="#contact" className={ctaClass}>
        Cere ofertă online
      </a>
    </div>
  );

  return (
    <section className={bgClass} id={id}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {imageLeft ? imageEl : textEl}
        {imageLeft ? textEl : imageEl}
      </div>
    </section>
  );
}
