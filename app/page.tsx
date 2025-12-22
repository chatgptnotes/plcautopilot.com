import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AICapabilities from './components/AICapabilities';
import Problem from './components/Problem';
import Solution from './components/Solution';
import MultiPlatform from './components/MultiPlatform';
import CompetitiveAdvantages from './components/CompetitiveAdvantages';
import SimulationTesting from './components/SimulationTesting';
import Features from './components/Features';
import Platforms from './components/Platforms';
import OnPremises from './components/OnPremises';
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
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Hero />
        <AICapabilities />
        <MultiPlatform />
        <CompetitiveAdvantages />
        <SimulationTesting />
        <Problem />
        <Solution />
        <Features />
        <Platforms />
        <OnPremises />
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
