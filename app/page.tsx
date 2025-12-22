import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import MultiPlatform from './components/MultiPlatform';
import Features from './components/Features';
import Platforms from './components/Platforms';
import Services from './components/Services';
import Team from './components/Team';
import Testimonial from './components/Testimonial';
import Pricing from './components/Pricing';
import Compliance from './components/Compliance';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Hero />
        <MultiPlatform />
        <Problem />
        <Solution />
        <Features />
        <Platforms />
        <Services />
        <Team />
        <Testimonial />
        <Pricing />
        <Compliance />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
