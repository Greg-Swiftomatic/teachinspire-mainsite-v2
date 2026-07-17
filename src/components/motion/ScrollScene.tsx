import { useLayoutEffect, useRef, type ReactNode } from 'react';
import './scroll-scene.css';

interface ScrollSceneProps {
  children: ReactNode;
}

const REVEAL_SELECTOR = '[data-scroll-reveal], [data-scroll-item]';

export function ScrollScene({ children }: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(scene.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    scene.querySelectorAll<HTMLElement>('[data-scroll-stagger]').forEach((group) => {
      const step = Number(group.dataset.scrollStagger) || 90;
      const items = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-scroll-item]'));

      items.forEach((item, index) => {
        item.style.setProperty('--scroll-delay', `${Math.min(index * step, 320)}ms`);
      });
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-scroll-visible'));
      return;
    }

    scene.classList.add('is-scroll-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-scroll-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );

    targets.forEach((target) => observer.observe(target));

    const revealHashTarget = () => {
      if (!window.location.hash) return;

      const id = decodeURIComponent(window.location.hash.slice(1));
      const hashTarget = document.getElementById(id);
      if (!hashTarget || !scene.contains(hashTarget)) return;

      hashTarget
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((target) => target.classList.add('is-scroll-visible'));
    };

    const revealAll = () => {
      targets.forEach((target) => target.classList.add('is-scroll-visible'));
    };

    revealHashTarget();
    window.addEventListener('hashchange', revealHashTarget);
    window.addEventListener('beforeprint', revealAll);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', revealHashTarget);
      window.removeEventListener('beforeprint', revealAll);
    };
  }, []);

  return (
    <div ref={sceneRef} className="ti-scroll-scene">
      <div className="ti-scroll-progress" aria-hidden="true" />
      {children}
    </div>
  );
}
