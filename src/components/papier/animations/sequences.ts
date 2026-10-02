// Les deux séquences, reprises telles quelles de brand/animations/build_anims.py.
import type { Sequence } from './moteur';

// Les quatre documents d'un cours complet se dessinent l'un après l'autre.
export const sequenceCoursComplet: Sequence = ({ trace, apparait, ecrit, bouge }) => {
  let t = 0;
  t = trace('#desk-edge path', t, { dur: 420, pas: 80 });
  // 1. support apprenant
  t = trace('#left-planning-sheet > path', t, { dur: 420, pas: 80 });
  apparait('#l-support, #l-support-titre', t - 200, 500, 'none');
  t = ecrit('t-support', t - 120);
  t = trace('#construction-crane path', t, { dur: 260, pas: 70 });
  t = trace('#speech-bubbles path', t, { dur: 260, pas: 90 });
  t = trace('#checklist path', t, { dur: 300, pas: 60 }) + 120;
  // 2. guide enseignant
  t = trace('#architectural-presentation > path', t, { dur: 380, pas: 80 });
  apparait('#l-guide, #l-guide-titre', t - 200, 500, 'none');
  t = ecrit('t-guide', t - 120);
  t = trace('#building-perspective path, #landscape-trees path', t, { dur: 220, pas: 45 }) + 120;
  // 3. plan de cours
  t = trace('#workflow-document > path', t, { dur: 380, pas: 80 });
  apparait('#l-plan, #l-plan-titre', t - 200, 500, 'none');
  t = ecrit('t-plan', t - 120);
  t = trace('#flowchart path', t, { dur: 260, pas: 80 }) + 120;
  // 4. dialogue audio
  t = trace('#display-housing path', t, { dur: 360, pas: 70 });
  apparait('#l-ecran, #l-ecran-titre', t - 200, 500, 'none');
  t = ecrit('t-audio', t - 120);
  t = trace('#audio-waveform path, #play-control path', t, { dur: 420, pas: 60 });
  apparait('#l-lecture', t, 400, 'scale(.6)');
  t = trace('#keyboard-base path, #trackpad', t, { dur: 300, pas: 50 });
  apparait('#keyboard-keys', t - 200, 300, 'none');
  bouge(
    '#audio-waveform',
    t,
    [
      { transform: 'scaleY(1)' },
      { transform: 'scaleY(1.35)' },
      { transform: 'scaleY(.8)' },
      { transform: 'scaleY(1.2)' },
      { transform: 'scaleY(1)' },
    ],
    1200,
  );
  // 5. les mains du formateur, en dernier
  t = trace('#left-hand-with-pencil path, #right-hand-and-sleeve path', t + 100, { dur: 240, pas: 25 });
  apparait('#l-manche-g, #l-manche-d', t - 300, 500, 'none');
  return trace('#paperclip path', t, { dur: 300, pas: 60 });
};

// L'IA prépare un brouillon ; le formateur relit, coche, adapte, puis valide.
export const sequenceIaPrepare: Sequence = ({ $$, el, trace, apparait, ecrit, bouge, anime }) => {
  let t = 0;
  t = trace('#desk-lines path', t, { dur: 380, pas: 60 });
  // l'IA prépare : le brouillon apparaît à l'écran
  t = trace('#screen-housing path', t, { dur: 380, pas: 70 });
  apparait('#l-ecran', t - 200, 400, 'none');
  t = trace('#laptop-base path', t, { dur: 300, pas: 60 });
  apparait('#keyboard', t - 250, 300, 'none');
  t = ecrit('t-onglet', t);
  t = trace('#brouillon-ecran path', t, { dur: 220, pas: 110 }) + 200;
  // la version imprimée se pose
  t = trace('#left-document path', t, { dur: 380, pas: 70 });
  apparait('#l-impr, #l-impr-titre', t - 250, 450, 'none');
  t = ecrit('t-impr', t - 150) + 150;
  // le formateur relit : il coche ce qui convient, puis ajoute une adaptation pour son apprenant
  apparait('#bras', t, 450, 'translate(40px,60px)');
  t += 500;
  const coches = $$('#coches path');
  const cibles: [number, number][] = [
    [71, -81],
    [75, -67],
    [79, -52],
    [-3, -2],
    [1, 13],
    [15, 60],
  ];
  let avant: [number, number] = [0, 0];
  const vers = (c: [number, number], d = 300) => {
    bouge('#bras', t, [{ transform: `translate(${avant[0]}px,${avant[1]}px)` }, { transform: `translate(${c[0]}px,${c[1]}px)` }], d);
    avant = c;
    t += d;
  };
  coches.forEach((c, i) => {
    vers(cibles[i]);
    trace([c], t, { dur: 260, pas: 0 });
    t += 320;
  });
  vers(cibles[5], 360);
  t = ecrit('t-note', t, 45);
  t = ecrit('t-note2', t + 80, 45) + 250;
  vers([60, 130], 500);
  // le formateur décide : la version finale, puis le tampon
  t = trace('#right-document path', t, { dur: 380, pas: 70 });
  apparait('#l-final, #l-final-titre', t - 250, 450, 'none');
  t = ecrit('t-final', t - 150) + 200;
  const tampon = el('tampon');
  if (tampon) (tampon as SVGElement).style.opacity = '0';
  anime(
    tampon,
    [
      { opacity: 0, transform: 'scale(1.6) rotate(-8deg)' },
      { opacity: 1, transform: 'scale(.92) rotate(0deg)', offset: 0.7 },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 420, delay: t, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' },
  );
  return t + 420;
};
