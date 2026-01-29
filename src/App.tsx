import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { Approach } from './components/sections/Approach';
import { Offerings } from './components/sections/Offerings';
import { Modules } from './components/sections/Modules';
import { Testimonials } from './components/sections/Testimonials';
import { Philosophy } from './components/sections/Philosophy';
import { Founder } from './components/sections/Founder';
import { FinalCTA } from './components/sections/FinalCTA';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content with padding for fixed header */}
      <main className="flex-1 pt-20">
        <Hero />
        <Problem />
        <Approach />
        <Offerings />
        <Modules />
        <Testimonials />
        <Philosophy />
        <Founder />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
