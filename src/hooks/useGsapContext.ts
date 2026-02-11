import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Convenience wrapper for gsap.context() + useEffect cleanup + reduced-motion check.
 * Pattern from PremiumSourceDiagram.tsx.
 *
 * @param callback - receives the GSAP context scope. Only called if reduced motion is off.
 * @param scopeRef - React ref whose current element scopes GSAP selectors.
 * @param deps - additional dependency array items (reduced motion is always included).
 */
export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  scopeRef: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  const prefersReducedMotion = useReducedMotion();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (prefersReducedMotion || !scopeRef.current) return;

    const ctx = gsap.context(() => {
      callbackRef.current(ctx);
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ...deps]);

  return prefersReducedMotion;
}
