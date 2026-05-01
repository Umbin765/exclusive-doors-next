import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import StatsBar from '@/components/StatsBar';
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
      <StatsBar />
      {productSections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}
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
