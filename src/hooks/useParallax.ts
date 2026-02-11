import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Simple parallax translateY on scroll via GSAP ScrollTrigger scrub.
 *
 * @param speed - multiplier for the parallax offset. Positive = moves down, negative = moves up.
 * @returns ref to attach to the element.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 50) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion, speed]);

  return ref;
}
