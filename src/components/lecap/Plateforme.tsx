import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BOOKING_URL,
  CTA_APPEL,
  CTA_COURS,
  FORMATEURS_INCLUS,
  OUTILS,
  PRIX_EQUIPE,
  PRIX_FORMATEUR_SUPPLEMENTAIRE,
  PRIX_INDIVIDUEL,
  ROUTES,
  euros,
} from './site';
import { ShelfIllustration, SoloIllustration, TeamIllustration } from './Illustrations';
import { Words, order, useMotion, useScrollProgress } from './motion';
import { TestimonialSpot } from './Testimonials';
import { TEMOIGNAGES } from './temoignages-data';
import './pages.css';

// The free Prompts tool still opens its account on the Studio site; Campus itself is invite-only.
const PROMPTS_GRATUIT_URL = 'https://studio.teachinspire.me/signup';

const reperes = [
  { valeur: '4', label: 'outils dans le Studio' },
  { valeur: '26', label: 'leçons dans Campus' },
  { valeur: '60 min', label: 'd’audio par mois' },
  { valeur: '1 an', label: 'd’accès, pour chaque formateur' },
];

const campus = [
  'Les 26 leçons, module par module',
  'Les travaux, avec un retour individuel',
  'Les ateliers en direct et leurs enregistrements',
  'Les échanges avec le groupe',
];

const surCampus = [
  {
    titre: 'Les leçons, à son rythme',
    texte: 'Chaque formateur avance quand il veut, en 6 semaines ou jusqu’à 3 mois, et reprend où il s’était arrêté.',
  },
  {
    titre: 'Les travaux, sur un vrai apprenant',
    texte: 'À chaque module, il dépose le document qu’il a construit pour un de ses apprenants et reçoit un retour.',
  },
  {
    titre: 'Le direct et le groupe',
    texte: 'Les ateliers, leurs enregistrements et les échanges restent au même endroit que le parcours.',
  },
];

// The four tools, in the order of the method: find the source, ask, produce, lay out.
const outils: Record<(typeof OUTILS)[number]['ton'], { flux: string; texte: string; detail: string }> = {
  prompts: {
    flux: 'Un besoin → une demande structurée',
    texte:
      'Décrivez votre besoin en français courant : niveau, public, objectif. L’outil pose deux ou trois questions, puis construit une demande structurée, prête à copier dans ChatGPT, Gemini ou l’IA de votre choix. Chaque bloc est annoté : vous voyez pourquoi il est là.',
    detail: 'Aussi à essayer gratuitement, sans la formation',
  },
  transcription: {
    flux: 'Un enregistrement → le texte',
    texte:
      'Déposez l’audio d’une source authentique, une vidéo ou un podcast du métier de l’apprenant. Vous récupérez le texte, à relire, à découper et à exploiter dans la séance.',
    detail: 'L’étape « Sélectionner » du parcours',
  },
  audio: {
    flux: 'Un script → un MP3',
    texte:
      'Collez un dialogue ou un monologue, puis choisissez le niveau, le rythme et l’accent. Des registres prêts à l’emploi (réunion, podcast, examinateur, service client) et un champ libre pour le reste. Vous dirigez, l’outil enregistre.',
    detail: '60 minutes par mois pendant un an, puis des recharges',
  },
  documents: {
    flux: 'Un contenu → un PDF mis en page',
    texte:
      'Collez un article, une transcription ou le résultat d’une demande. L’outil en tire le support de l’apprenant, les exercices, le guide de l’enseignant et le plan de cours, corrigés compris, dans le style de mise en page de votre choix.',
    detail: 'L’étape « Finaliser » du parcours',
  },
};

const questions = [
  {
    q: 'Faut-il suivre la formation pour utiliser la plateforme ?',
    r: 'Campus et le Studio complet sont compris dans la formation, pendant un an. L’outil Prompts s’essaie aussi gratuitement : le compte s’ouvre en deux minutes, sans carte bancaire.',
  },
  {
    q: 'Et si les 60 minutes d’audio ne suffisent pas ?',
    r: 'Vous rechargez à la demande : 9 € les 60 minutes, ou 24 € les 180 minutes. Les minutes achetées n’expirent pas à la fin du mois.',
  },
  {
    q: 'Les outils remplacent-ils la formation ?',
    r: 'Ils l’accompagnent. La formation vous apprend à juger ce que l’IA produit ; les outils accélèrent ce que vous savez déjà juger. Un support généré reste un support à relire.',
  },
  {
    q: 'Et si je veux partir ?',
    r: 'Les demandes se copient en un clic, les audios se téléchargent en MP3 et les documents en PDF. Rien ne reste enfermé dans la plateforme.',
  },
];

export function Plateforme() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);
  const hero = useRef<HTMLDivElement>(null);
  const campusTile = useRef<HTMLElement>(null);
  const doors = useRef<HTMLDivElement>(null);
  useScrollProgress(hero, { start: 0.14, end: 0.14, span: 1, prop: '--sp' });
  useScrollProgress(campusTile, { start: 0.94, end: 0.2 });
  useScrollProgress(doors, { start: 0.98, end: 0.5 });

  return (
    <div className="lc lc-page" ref={page}>
      <section className="lc-wrap" aria-labelledby="plateforme-titre">
        <div className="lc-green lc-hero lc-hero--formation" data-surface="green" data-reveal ref={hero}>
          <div className="lc-hero-text">
            <p className="lc-hero-kicker">La plateforme · Campus et le Studio</p>
            <h1 id="plateforme-titre">
              <Words text="Campus pour apprendre, le Studio pour produire." under="le Studio" />
            </h1>
            <p className="lc-hero-lead" data-rise style={order(5)}>
              Le parcours, les travaux et le groupe d’un côté ; les quatre outils qui préparent le
              cours de l’autre. Ouverts pendant un an à chaque formateur.
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
      </section>

      <section className="lc-wrap" aria-labelledby="campus-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Campus</p>
          <h2 className="lc-h2" id="campus-titre"><Words text="Le parcours, les travaux et le groupe, au même endroit." mark="au même endroit" /></h2>
        </div>
        <div className="lc-platform">
          <article className="lc-green lc-campus" data-surface="green" ref={campusTile}>
            <p className="lc-tile-name">Campus</p>
            <h3>Ce que chaque formateur y trouve.</h3>
            <ShelfIllustration />
            <ul>
              {campus.map((ligne) => (
                <li key={ligne}>{ligne}</li>
              ))}
            </ul>
          </article>
          <ul className="lc-campus-steps" data-reveal>
            {surCampus.map((c, n) => (
              <li key={c.titre} className="lc-tile lc-tile--paper" data-rise style={order(n)}>
                <h3>{c.titre}</h3>
                <p>{c.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lc-wrap" aria-labelledby="studio-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Le Studio</p>
          <h2 className="lc-h2" id="studio-titre"><Words text="Quatre outils pour préparer le cours, étape par étape." mark="étape par étape" /></h2>
          <p className="lc-lead">
            Chaque outil sert une étape de la méthode : transcrire une source, demander à l’IA,
            produire l’audio, mettre en page les documents.
          </p>
        </div>
        <ul className="lc-outils" data-reveal>
          {OUTILS.map((outil, n) => (
            <li key={outil.nom} className={`lc-tile lc-outil lc-tool--${outil.ton}`} data-rise style={order(n)}>
              <p className="lc-outil-flux">{outils[outil.ton].flux}</p>
              <h3>{outil.nom}</h3>
              <p>{outils[outil.ton].texte}</p>
              <p className="lc-outil-detail">{outils[outil.ton].detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* After the tools: Lyane on how her learners take the audios. Shows once her card is published. */}
      <TestimonialSpot items={TEMOIGNAGES} id={13} cote="gauche" />

      <section className="lc-wrap" aria-labelledby="acces-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Y accéder</p>
          <h2 className="lc-h2" id="acces-titre"><Words text="La plateforme est comprise dans la formation." /></h2>
          <p className="lc-lead">Pendant un an, pour chaque formateur, audio compris.</p>
        </div>
        <div className="lc-doors" data-reveal ref={doors}>
          <Link data-rise style={order(0)} className="lc-tile lc-tile--ask lc-door" to={`${ROUTES.formation}#equipe`}>
            <span className="lc-door-top"><span className="lc-door-who">Je dirige un institut</span><TeamIllustration /></span>
            <strong>{euros(PRIX_EQUIPE)}&nbsp;HT</strong>
            <span>
              jusqu’à {FORMATEURS_INCLUS}&nbsp;formateurs, puis {euros(PRIX_FORMATEUR_SUPPLEMENTAIRE)}&nbsp;HT
              par formateur supplémentaire
            </span>
            <span className="lc-door-go">Voir la formation d’équipe</span>
          </Link>
          <Link data-rise style={order(1)} className="lc-tile lc-tile--sand lc-door" to={`${ROUTES.formation}#independants`}>
            <span className="lc-door-top"><span className="lc-door-who">Je suis formateur indépendant</span><SoloIllustration /></span>
            <strong>{euros(PRIX_INDIVIDUEL)}&nbsp;HT</strong>
            <span>par personne, pour celui ou celle qui s’inscrit et paie pour soi</span>
            <span className="lc-door-go">Voir la formation individuelle</span>
          </Link>
        </div>
        <p className="lc-free">
          Vous voulez d’abord voir l’outil Prompts ?{' '}
          <a className="lc-link" href={PROMPTS_GRATUIT_URL} target="_blank" rel="noopener noreferrer">Essayer Promptomatik gratuitement</a>
        </p>
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
