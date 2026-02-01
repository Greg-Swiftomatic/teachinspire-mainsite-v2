import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { Approach } from './components/sections/Approach';
import { Results } from './components/sections/Results';
import { HowItWorks } from './components/sections/HowItWorks';
import { TargetAudience } from './components/sections/TargetAudience';
import { Testimonials } from './components/sections/Testimonials';
import { Founder } from './components/sections/Founder';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { BackToTop } from './components/ui/BackToTop';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content with padding for fixed header */}
      <main className="flex-1 pt-20">
        <Hero />
        <Problem />
        <Approach />
        <Results />
        <HowItWorks />
        <TargetAudience />
        <Testimonials />
        <Founder />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
