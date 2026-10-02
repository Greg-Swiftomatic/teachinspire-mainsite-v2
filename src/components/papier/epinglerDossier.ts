import { gsap } from 'gsap';

// La séquence épinglée : à chaque étape, un document se pose sur le dossier.
// À appeler en premier dans usePapierMotion, avant les autres déclencheurs.
export function epinglerDossier(scope: HTMLElement, bureau: boolean) {
  if (!bureau) return;
  const zone = scope.querySelector<HTMLElement>('.ds-sequence');
  if (!zone) return;
  const docs = gsap.utils.toArray<HTMLElement>('.ds-doc', zone);
  const items = gsap.utils.toArray<HTMLElement>('.ds-etape', zone);
  const n = docs.length;

  zone.classList.add('est-epingle');
  gsap.set(docs, { yPercent: -50, xPercent: 0 });
  gsap.set(docs.slice(1), { x: 160, y: 40, rotate: 7, opacity: 0 });
  gsap.set(docs[0], { rotate: -1.5 });
  gsap.set(zone.querySelector('.ds-tampon'), { scale: 2.4, opacity: 0, rotate: 10 });

  const actif = (k: number) => items.forEach((item, j) => item.classList.toggle('est-actif', j === k));
  actif(0);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: zone,
      start: 'top top+=96',
      end: `+=${n * 70}%`,
      pin: true,
      scrub: 0.6,
      // le texte change quand le document de l'étape est presque posé
      onUpdate: (self) => actif(Math.min(n - 1, Math.floor(self.progress * tl.duration() + 0.7))),
      onLeaveBack: () => actif(0),
    },
  });

  for (let i = 1; i < n; i++) {
    tl.to(docs[i], { x: 0, y: 0, rotate: i % 2 ? 1.5 : -1.5, duration: 1, ease: 'power2.out' }, i - 1);
    tl.to(docs[i], { opacity: 1, duration: 0.2, ease: 'none' }, i - 1);
    docs.slice(0, i).forEach((precedent, k) => {
      const recul = i - k;
      tl.to(precedent, { x: -recul * 22, y: -recul * 16, scale: 1 - recul * 0.04, duration: 1, ease: 'power2.out' }, i - 1);
    });
    tl.to(zone.querySelector('.ds-rail i'), { scaleY: (i + 1) / n, duration: 1, ease: 'none' }, i - 1);
  }
  tl.to(zone.querySelector('.ds-tampon'), { scale: 1, opacity: 1, rotate: -12, duration: 0.4, ease: 'power3.in' }, n - 1.3);
  tl.to({}, { duration: 0.5 });
}
