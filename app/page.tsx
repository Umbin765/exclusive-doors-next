import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductSection from '@/components/ProductSection';
import CtaBand from '@/components/CtaBand';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { productSections } from '@/lib/data';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <CategoryGrid />
      {productSections.slice(0, 2).map((section, i) => (
        <ProductSection key={section.id} section={section} alt={i % 2 !== 0} />
      ))}
      <CtaBand />
      {productSections.slice(2).map((section, i) => (
        <ProductSection key={section.id} section={section} alt={i % 2 !== 0} />
      ))}
      <WhyUs />
      <Reviews />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}
