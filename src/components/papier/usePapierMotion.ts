import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Avant = (scope: HTMLElement, bureau: boolean) => void;

// Le mouvement des pages « Papier & encre ».
// Tout le contenu est visible sans JavaScript et avec prefers-reduced-motion :
// les états de départ ne sont posés qu'ici, juste avant d'animer.
// `avant` crée les séquences épinglées en premier, pour que les autres
// déclencheurs tiennent compte de l'espace qu'elles ajoutent.
export function usePapierMotion(ref: RefObject<HTMLElement | null>, avant?: Avant) {
  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    const mm = gsap.matchMedia(scope);
    mm.add(
      { bouge: '(prefers-reduced-motion: no-preference)', bureau: '(min-width: 1000px)' },
      (context) => {
        const { bouge, bureau } = context.conditions as { bouge: boolean; bureau: boolean };
        if (!bouge) return;

        avant?.(scope, bureau);

        const q = gsap.utils.selector(scope);

        q('[data-mots]').forEach((titre) => {
          const mots = titre.querySelectorAll('.pe-w');
          const immediat = titre.getAttribute('data-mots') === 'immediat';
          gsap.set(mots, { yPercent: 110 });
          gsap.to(mots, {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.045,
            ease: 'power3.out',
            delay: immediat ? 0.1 : 0,
            scrollTrigger: immediat ? undefined : { trigger: titre, start: 'top 88%', once: true },
          });
        });

        const montants = q('[data-monte]').filter((el) => !el.closest('.est-epingle'));
        gsap.set(montants, { y: 28, opacity: 0 });
        ScrollTrigger.batch(montants, {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: true }),
        });

        q('[data-devoile]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 80%', once: true } },
          );
          const img = el.querySelector('img');
          if (img) {
            gsap.fromTo(img, { yPercent: 4, scale: 1.06 }, { yPercent: -4, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
          }
        });

        q('[data-sombre]').forEach((section) => {
          gsap.fromTo(
            section,
            { clipPath: 'inset(6% 4% 6% 4%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: section, start: 'top 95%', end: 'top 30%', scrub: 0.4 } },
          );
        });

        q('[data-compte]').forEach((el) => {
          const fin = Number(el.getAttribute('data-compte'));
          const suffixe = el.getAttribute('data-suffixe') ?? '';
          const compteur = { v: 0 };
          el.textContent = `0${suffixe}`;
          gsap.to(compteur, {
            v: fin,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(compteur.v).toLocaleString('fr-FR')}${suffixe}`;
            },
          });
        });

        q('[data-trace]').forEach((chemin) => {
          gsap.fromTo(
            chemin,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: chemin.closest('[data-trace-zone]') ?? chemin, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } },
          );
        });
      },
    );

    const rafraichir = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(rafraichir);
    window.addEventListener('load', rafraichir);

    return () => {
      window.removeEventListener('load', rafraichir);
      mm.revert();
      gsap.set(scope.querySelectorAll('.pe-w, [data-monte], [data-devoile], [data-devoile] img, [data-sombre], .ds-doc, .ds-tampon, .ds-rail i'), { clearProps: 'transform,opacity,clipPath,translate,rotate,scale' });
      scope.querySelector('.est-epingle')?.classList.remove('est-epingle');
    };
  }, [ref, avant]);
}
