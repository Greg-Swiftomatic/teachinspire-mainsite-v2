import { Hero } from '../components/sections/Hero';
import { Problem } from '../components/sections/Problem';
import { Possibility } from '../components/sections/Possibility';
import { Approach } from '../components/sections/Approach';
import { Modules } from '../components/sections/Modules';
import { Results } from '../components/sections/Results';
import { Philosophy } from '../components/sections/Philosophy';
import { Founder } from '../components/sections/Founder';
import { FinalCTA } from '../components/sections/FinalCTA';
import { ScrollThreadContainer } from '../components/animation/ScrollThreadContainer';

export function HomePage() {
  return (
    <ScrollThreadContainer preset="homepage">
      <Hero />
      <Problem />
      <Possibility />
      <Approach />
      <Modules />
      <Results />
      <Philosophy />
      <Founder />
      <FinalCTA />
    </ScrollThreadContainer>
  );
}
