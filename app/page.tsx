import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import ConfiguratorSection from '@/components/ConfiguratorSection';
import CategoryGrid from '@/components/CategoryGrid';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import PartnersStrip from '@/components/PartnersStrip';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProblemSection />
      <ConfiguratorSection />
      <CategoryGrid />
      <Reviews />
      <Contact />
      <PartnersStrip />
      <CtaBand />
      <Footer />
    </>
  );
}
