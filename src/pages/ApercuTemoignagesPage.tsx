import { useRef } from 'react';
import { Testimonials, type Testimonial } from '../components/lecap/Testimonials';
import { useMotion } from '../components/lecap/motion';
import '../components/lecap/pages.css';

// Design preview of the testimonial section, with grey blocks in place of the words.
// Only reachable on the local development server: this route is not built into the site.
const vide = (ton: Testimonial['ton']): Testimonial => ({ citation: '', nom: 'Prénom Nom', role: 'Rôle, institut (à venir)', ton });
const VIDES = [vide('forest'), vide('mint'), vide('yellow'), vide('sand')];

export function ApercuTemoignagesPage() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);
  return (
    <div className="lc lc-page" ref={page}>
      <meta name="robots" content="noindex, nofollow" />
      <Testimonials items={VIDES} />
    </div>
  );
}
