import { useEffect, useRef } from 'react';
import { creerMoteur, type Sequence } from './moteur';

// Un dessin au trait qui se trace quand il entre à l'écran, une seule fois.
// Avec prefers-reduced-motion, le dessin s'affiche directement terminé.
export function AnimationTrait({
  svg,
  prefixe,
  sequence,
  className = '',
}: {
  svg: string;
  prefixe: string;
  sequence: Sequence;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const relancer = useRef<() => void>(() => {});

  useEffect(() => {
    const boite = ref.current;
    const racine = boite?.querySelector('svg');
    if (!boite || !racine) return;
    const moteur = creerMoteur(racine, prefixe);
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lancer = () => {
      boite.classList.add('est-lance');
      moteur.lancer(sequence);
    };
    relancer.current = lancer;
    if (reduit || !('IntersectionObserver' in window)) {
      boite.classList.add('est-lance');
      return () => moteur.reinitialiser();
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) {
          observateur.disconnect();
          lancer();
        }
      },
      { threshold: 0.35 },
    );
    observateur.observe(boite);
    return () => {
      observateur.disconnect();
      moteur.reinitialiser();
    };
  }, [prefixe, sequence]);

  return (
    <figure className={`pe-anim ${className}`}>
      <div ref={ref} className="pe-anim-dessin" dangerouslySetInnerHTML={{ __html: svg }} />
      <button type="button" className="pe-anim-rejouer" onClick={() => relancer.current()}>
        Rejouer
      </button>
    </figure>
  );
}
