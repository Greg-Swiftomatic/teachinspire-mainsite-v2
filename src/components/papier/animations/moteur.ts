// Le moteur des animations au trait (repris de brand/animations/build_anims.py).
// Il trace les chemins un à un, fait apparaître les lavis, écrit les titres lettre
// par lettre. Les sélecteurs s'écrivent sans préfixe : le moteur l'ajoute.

type OptionsTrace = { dur?: number; pas?: number; ease?: string };

export type Moteur = {
  $$: (sel: string) => Element[];
  el: (id: string) => Element | null;
  trace: (sel: string | Element[], t: number, options?: OptionsTrace) => number;
  apparait: (sel: string, t: number, dur?: number, depart?: string) => number;
  ecrit: (id: string, t: number, cps?: number) => number;
  bouge: (sel: string, t: number, keys: Keyframe[], dur: number) => number;
  anime: (el: Element | null, keys: Keyframe[], options: KeyframeAnimationOptions) => void;
};

export type Sequence = (m: Moteur) => number;

const EXCLUS = ['keyboard-keys', 'keyboard', 'tampon', 'lavis', 'bras'];

export function creerMoteur(racine: SVGSVGElement, prefixe: string) {
  let anims: Animation[] = [];
  let minuteries: number[] = [];
  let faits = new Set<Element>();

  const prefixer = (sel: string) => sel.replace(/#([\w-]+)/g, `#${prefixe}$1`);
  const $$ = (sel: string) => Array.from(racine.querySelectorAll(prefixer(sel)));
  const el = (id: string) => racine.querySelector(`#${prefixe}${id}`);

  const style = (e: Element) => (e as SVGElement).style;

  function prepTrait(p: Element) {
    p.setAttribute('pathLength', '1');
    style(p).strokeDasharray = '1';
    style(p).strokeDashoffset = '1';
    style(p).opacity = '0';
  }

  const trace: Moteur['trace'] = (sel, t, { dur = 300, pas = 60, ease = 'cubic-bezier(.45,0,.25,1)' } = {}) => {
    const chemins = (typeof sel === 'string' ? $$(sel) : sel).filter((p) => !faits.has(p));
    chemins.forEach((p, i) => {
      faits.add(p);
      prepTrait(p);
      anims.push(
        p.animate(
          [
            { strokeDashoffset: 1, opacity: 1 },
            { strokeDashoffset: 0, opacity: 1 },
          ],
          { duration: dur, delay: t + i * pas, easing: ease, fill: 'forwards' },
        ),
      );
    });
    return t + Math.max(0, (chemins.length - 1) * pas) + dur;
  };

  const apparait: Moteur['apparait'] = (sel, t, dur = 300, depart = 'translateY(-6px)') => {
    $$(sel).forEach((e) => {
      style(e).opacity = '0';
      anims.push(
        e.animate(
          [
            { opacity: 0, transform: depart },
            { opacity: 1, transform: 'none' },
          ],
          { duration: dur, delay: t, easing: 'ease-out', fill: 'forwards' },
        ),
      );
    });
    return t + dur;
  };

  const ecrit: Moteur['ecrit'] = (id, t, cps = 28) => {
    const e = el(id);
    if (!e) return t;
    const texte = e.getAttribute('data-texte') ?? '';
    e.textContent = '';
    [...texte].forEach((_, i) => {
      minuteries.push(window.setTimeout(() => (e.textContent = texte.slice(0, i + 1)), t + i * cps));
    });
    return t + texte.length * cps;
  };

  const bouge: Moteur['bouge'] = (sel, t, keys, dur) => {
    $$(sel).forEach((e) =>
      anims.push(e.animate(keys, { duration: dur, delay: t, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' })),
    );
    return t + dur;
  };

  const anime: Moteur['anime'] = (e, keys, options) => {
    if (e) anims.push(e.animate(keys, options));
  };

  const moteur: Moteur = { $$, el, trace, apparait, ecrit, bouge, anime };

  function reinitialiser() {
    racine.querySelectorAll('[pathLength]').forEach((p) => {
      style(p).opacity = '';
      style(p).strokeDasharray = '';
      style(p).strokeDashoffset = '';
    });
    racine.querySelectorAll<SVGElement>('[style]').forEach((e) => (e.style.opacity = ''));
    anims.forEach((a) => a.cancel());
    anims = [];
    minuteries.forEach((m) => window.clearTimeout(m));
    minuteries = [];
    faits = new Set();
    racine.querySelectorAll('[data-texte]').forEach((e) => (e.textContent = e.getAttribute('data-texte')));
  }

  function lancer(sequence: Sequence) {
    reinitialiser();
    $$('#lavis > *').forEach((e) => (style(e).opacity = '0'));
    const exclus = EXCLUS.map((id) => `#${prefixe}${id}`).join(', ');
    const tous = Array.from(racine.querySelectorAll('path, circle, ellipse, line, polyline, rect')).filter(
      (p) => !p.closest(exclus) && p.id !== `${prefixe}l-manche`,
    );
    tous.forEach(prepTrait);
    const fin = sequence(moteur);
    const reste = tous.filter((p) => !faits.has(p));
    if (reste.length) trace(reste, fin, { dur: 260, pas: 10 });
  }

  return { lancer, reinitialiser };
}
