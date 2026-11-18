import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BOOKING_URL,
  CTA_APPEL,
  CTA_COURS,
  FORMATEURS_INCLUS,
  MODULES,
  PRIX_EQUIPE,
  PRIX_FORMATEUR_SUPPLEMENTAIRE,
  PRIX_INDIVIDUEL,
  ROUTES,
  euros,
  prixEquipe,
} from './site';
import { DossierIllustration } from './Illustrations';
import { Words, order, useMotion, useScrollProgress } from './motion';
import { TestimonialSpot } from './Testimonials';
import { TEMOIGNAGES } from './temoignages-data';
import './pages.css';

const reperes = [
  { valeur: '26', label: 'leçons en 6 modules' },
  { valeur: '7', label: 'ateliers en direct, dont un de lancement' },
  { valeur: '6 sem. à 3 mois', label: 'à votre rythme' },
  { valeur: '1 an', label: 'd’accès à Campus et au Studio' },
];

const deroule = [
  {
    titre: 'Les leçons, à son rythme',
    texte: '26 leçons vidéo en 6 modules. Chacun avance quand il veut, en 6 semaines ou jusqu’à 3 mois.',
  },
  {
    titre: 'Les travaux, sur un vrai apprenant',
    texte: 'Chaque formateur construit le cours d’un de ses apprenants et reçoit un retour individuel.',
  },
  {
    titre: 'Campus et le Studio, pendant un an',
    texte: 'Le parcours, les échanges et les quatre outils : Prompts, Transcription, Audio, Documents.',
  },
];

const inclusEquipe = [
  'Les 26 leçons en 6 modules, pour chaque formateur',
  '7 ateliers en direct avec votre équipe, dont un de lancement',
  'Un retour individuel sur les travaux de chaque formateur',
  'Campus et le Studio pendant 1 an, audio compris (60 minutes par mois)',
];

const inclusIndividuel = [
  'Les 26 leçons en 6 modules',
  'Deux permanences en direct par mois, pour poser vos questions',
  'Un retour individuel sur votre cours final',
  'Campus et le Studio pendant 1 an, audio compris (60 minutes par mois)',
];

const comparaison = [
  { ligne: 'Les 26 leçons en 6 modules', equipe: 'Oui', seul: 'Oui' },
  { ligne: 'Campus et le Studio pendant 1 an', equipe: 'Oui', seul: 'Oui' },
  { ligne: 'En direct', equipe: '7 ateliers avec votre équipe', seul: '2 permanences par mois' },
  { ligne: 'Retour individuel', equipe: 'Sur chaque travail', seul: 'Sur le cours final' },
  {
    ligne: 'Prix',
    equipe: `${euros(PRIX_EQUIPE)} HT jusqu’à ${FORMATEURS_INCLUS} formateurs`,
    seul: `${euros(PRIX_INDIVIDUEL)} HT par personne`,
  },
];

const questions = [
  {
    q: 'La formation compte-t-elle pour Qualiopi ?',
    r: 'Elle peut nourrir deux indicateurs du Référentiel national qualité : le développement des compétences de vos formateurs (indicateur 22) et la veille sur les innovations pédagogiques et technologiques, avec ce qu’elle change dans vos formations (indicateur 25). Un formateur indépendant certifié peut aussi s’en servir pour montrer sa propre formation continue. L’auditeur juge l’ensemble du dossier : la formation y contribue, elle ne garantit pas la certification.',
  },
  {
    q: 'Mes formateurs n’ont pas le temps.',
    r: 'Les leçons se suivent à son rythme, entre les ateliers, sur 6 semaines ou jusqu’à 3 mois. Les ateliers sont enregistrés. Surtout, chaque travail porte sur un vrai apprenant du formateur : le temps passé sert directement ses cours.',
  },
  {
    q: 'Nous utilisons déjà ChatGPT.',
    r: 'Tant mieux : la formation n’enseigne pas un outil, elle enseigne une méthode. Elle fonctionne avec ChatGPT, Gemini, Claude ou un autre assistant. Ce qui change, c’est ce que vos formateurs demandent à l’IA, et ce qu’ils vérifient avant d’utiliser le résultat.',
  },
  {
    q: 'Qui peut prendre la formation individuelle ?',
    r: 'La personne qui s’inscrit et paie elle-même. Dès qu’une structure inscrit ses formateurs, c’est la formation d’équipe.',
  },
  {
    q: 'Et après la formation ?',
    r: 'Campus et le Studio restent ouverts un an à partir du début. Un institut qui termine en 3 mois garde donc 9 mois de pratique avec les outils.',
  },
];

function Check() {
  return (
    <svg className="lc-check" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M5.5 10.4l3 3 6-6.6" fill="none" stroke="var(--lc-paper)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The team price for a given number of trainers: 4 200 € up to 10, then 250 € each.
function Simulateur() {
  const [n, setN] = useState(FORMATEURS_INCLUS);
  const changer = (delta: number) => setN((v) => Math.min(60, Math.max(1, v + delta)));
  return (
    <div className="lc-sim">
      <p id="lc-sim-label">Combien de formateurs dans votre équipe&nbsp;?</p>
      <div className="lc-sim-row" role="group" aria-labelledby="lc-sim-label">
        <button type="button" onClick={() => changer(-1)} disabled={n <= 1} aria-label="Un formateur de moins">−</button>
        <output aria-live="polite">{n}</output>
        <button type="button" onClick={() => changer(1)} disabled={n >= 60} aria-label="Un formateur de plus">+</button>
        <p className="lc-sim-total" aria-live="polite">
          <strong>{euros(prixEquipe(n))}&nbsp;HT</strong>
          <span>pour {n}&nbsp;formateur{n > 1 ? 's' : ''}</span>
        </p>
      </div>
    </div>
  );
}

export function Formation() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);
  const hero = useRef<HTMLDivElement>(null);
  useScrollProgress(hero, { start: 0.14, end: 0.14, span: 1, prop: '--sp' });
  // The programme: as the list of modules is read, one more document lands on the pile.
  const programme = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useScrollProgress(programme, { start: 0.72, end: 0.72, span: 1, onChange: (p) => setStep(Math.min(MODULES.length - 1, Math.floor(p * MODULES.length))) });

  return (
    <div className="lc lc-page" ref={page}>
      <section className="lc-wrap" aria-labelledby="formation-titre">
        <div className="lc-green lc-hero lc-hero--formation" data-surface="green" data-reveal ref={hero}>
          <div className="lc-hero-text">
            <p className="lc-hero-kicker">La formation · Construire des formations avec l’IA</p>
            <h1 id="formation-titre">
              <Words text="Du besoin de l’apprenant au cours prêt à enseigner, en six modules." under="prêt à enseigner" />
            </h1>
            <p className="lc-hero-lead" data-rise style={order(5)}>
              Chaque formateur part d’un de ses vrais apprenants et repart avec son cours complet,
              et une méthode à refaire pour le suivant.
            </p>
            <div className="lc-hero-actions" data-rise style={order(6)}>
              <a className="lc-btn lc-btn--yellow" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
              <Link className="lc-btn lc-btn--on-green" to={ROUTES.cours}>{CTA_COURS}</Link>
            </div>
          </div>
          <ul className="lc-hero-panel">
            {reperes.map((r, n) => (
              <li key={r.label} data-rise style={order(n + 3)}>
                <strong>{r.valeur}</strong>
                <span>{r.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <nav className="lc-jump" aria-label="Les deux formules">
          <a href="#equipe">Pour un institut</a>
          <a href="#independants">Pour un formateur indépendant</a>
        </nav>
      </section>

      <section className="lc-wrap" id="programme" aria-labelledby="programme-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Le programme</p>
          <h2 className="lc-h2" id="programme-titre"><Words text="Six modules. À chaque module, un document de plus." mark="un document de plus" /></h2>
        </div>
        <div className="lc-prog" ref={programme}>
          <div className="lc-green lc-prog-art" data-surface="green" aria-hidden="true">
            <DossierIllustration />
            <p className="lc-prog-caption">
              <strong>Module {step + 1} sur {MODULES.length}</strong>
              <span>{MODULES[step].remis}</span>
            </p>
          </div>
          <ol className="lc-programme" data-reveal>
            {MODULES.map((m, i) => (
              <li key={m.nom} className={i <= step ? 'est-atteint' : undefined} data-rise style={order(i)}>
                <span className="lc-path-num" aria-hidden="true">{i + 1}</span>
                <h3>{m.nom}</h3>
                <p>{m.texte}</p>
                <p className="lc-programme-out"><span>Ils repartent avec</span> {m.remis}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Lyane: tailor-made courses even in trades she knows nothing about. */}
      <TestimonialSpot items={TEMOIGNAGES} id={12} cote="gauche" />

      <section className="lc-wrap" aria-labelledby="deroule-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Le déroulé</p>
          <h2 className="lc-h2" id="deroule-titre"><Words text="Comment ça se passe." /></h2>
        </div>
        <ul className="lc-three" data-reveal>
          {deroule.map((d, n) => (
            <li key={d.titre} className="lc-tile lc-tile--paper" data-rise style={order(n)}>
              <h3>{d.titre}</h3>
              <p>{d.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="lc-wrap" id="equipe" aria-labelledby="equipe-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Pour un institut</p>
          <h2 className="lc-h2" id="equipe-titre"><Words text="La formation d’équipe." /></h2>
          <p className="lc-lead">
            Toute l’équipe suit le parcours ensemble, avec ses ateliers à elle et la même méthode
            pour tout le monde. Pour un institut certifié Qualiopi, c’est aussi une façon concrète
            de nourrir la veille pédagogique et technologique de l’équipe.
          </p>
        </div>
        <div className="lc-offer lc-tile lc-tile--ask" data-reveal data-rise>
          <div className="lc-offer-price">
            <p className="lc-price"><strong>{euros(PRIX_EQUIPE)}</strong>&nbsp;HT</p>
            <p>
              jusqu’à {FORMATEURS_INCLUS}&nbsp;formateurs, puis {euros(PRIX_FORMATEUR_SUPPLEMENTAIRE)}&nbsp;HT
              par formateur supplémentaire
            </p>
            <Simulateur />
            <p className="lc-offer-note">Financement OPCO possible. Paiement en 3&nbsp;fois sans frais.</p>
          </div>
          <div className="lc-offer-list">
            <h3>Ce qui est inclus</h3>
            <ul>
              {inclusEquipe.map((ligne) => (
                <li key={ligne}><Check />{ligne}</li>
              ))}
            </ul>
            <a className="lc-btn lc-btn--ink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
          </div>
        </div>
      </section>

      {/* A director speaks after the team offer; an independent trainer after the individual one. */}
      <TestimonialSpot items={TEMOIGNAGES} id={4} cote="droite" />

      <section className="lc-wrap" id="independants" aria-labelledby="independants-titre">
        <div className="lc-solo lc-tile lc-tile--sand" data-reveal data-rise>
          <div className="lc-solo-text">
            <p className="lc-kicker">Pour un formateur indépendant</p>
            <h2 id="independants-titre">La formation individuelle.</h2>
            <p className="lc-price lc-price--small"><strong>{euros(PRIX_INDIVIDUEL)}</strong>&nbsp;HT par personne</p>
            <p>
              Le même parcours, seul, à votre rythme. Cette formule est réservée à la personne qui
              s’inscrit et paie elle-même&nbsp;: dès qu’une structure inscrit ses formateurs, c’est
              la formation d’équipe.
            </p>
            <a className="lc-btn lc-btn--line" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
          </div>
          <div className="lc-offer-list">
            <h3>Ce qui est inclus</h3>
            <ul>
              {inclusIndividuel.map((ligne) => (
                <li key={ligne}><Check />{ligne}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TestimonialSpot items={TEMOIGNAGES} id={2} cote="gauche" />

      <section className="lc-wrap" aria-labelledby="comparer-titre">
        <div className="lc-head" data-reveal>
          <h2 className="lc-h2" id="comparer-titre"><Words text="Ce qui change entre les deux." /></h2>
        </div>
        <div className="lc-table" data-reveal data-rise>
          <table>
            <thead>
              <tr>
                <td />
                <th scope="col">Équipe</th>
                <th scope="col">Individuelle</th>
              </tr>
            </thead>
            <tbody>
              {comparaison.map((c) => (
                <tr key={c.ligne}>
                  <th scope="row">{c.ligne}</th>
                  <td>{c.equipe}</td>
                  <td>{c.seul}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="lc-wrap lc-faq" aria-labelledby="questions-titre">
        <div className="lc-head" data-reveal>
          <h2 className="lc-h2" id="questions-titre"><Words text="Vos questions." /></h2>
        </div>
        <div className="lc-faq-list">
          {questions.map((item) => (
            <details key={item.q}>
              <summary>{item.q}<span aria-hidden="true" /></summary>
              <p>{item.r}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
