import { Hero } from '../components/sections/Hero';
import { Problem } from '../components/sections/Problem';
import { Approach } from '../components/sections/Approach';
import { Results } from '../components/sections/Results';
import { HowItWorks } from '../components/sections/HowItWorks';
import { TargetAudience } from '../components/sections/TargetAudience';
import { Testimonials } from '../components/sections/Testimonials';
import { Founder } from '../components/sections/Founder';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';

export function HomePage() {
  return (
    <>
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
    </>
  );
}
