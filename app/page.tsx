import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import Platforms from './components/Platforms';
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
        <Problem />
        <Solution />
        <Features />
        <Platforms />
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
