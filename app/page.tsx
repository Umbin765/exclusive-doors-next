import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductSection from '@/components/ProductSection';
import CtaBand from '@/components/CtaBand';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { productSections } from '@/lib/data';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <CategoryGrid />
      <div className="bg-[linear-gradient(180deg,_#ffffff_0%,_#fff8e8_15%,_#fdefc4_32%,_#fef6d8_48%,_#f0ebe4_65%,_#e4ddd5_80%,_#ffffff_100%)]">
        {productSections.map((section, i) => (
          <ProductSection key={section.id} section={section} alt={i % 2 !== 0} />
        ))}
      </div>
      <CtaBand />
      <WhyUs />
      <Reviews />
      <Portfolio />
      <Blog />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
