import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IntroVideo } from './IntroVideo';
import { ShelfIllustration, SoloIllustration, TeamIllustration } from './Illustrations';
import { Words, order, useMotion, useScrollProgress } from './motion';
import { Route } from './Route';
import { TestimonialSpot, Testimonials } from './Testimonials';
import { CHIFFRES_TEMOIGNAGES, TEMOIGNAGES, TEMOIGNAGES_EN_ATTENTE } from './temoignages-data';
import { ChatWindow, StudioWindow } from './Windows';
import {
  BOOKING_URL,
  CTA_APPEL,
  CTA_COURS,
  FORMATEURS_INCLUS,
  PRIX_EQUIPE,
  PRIX_FORMATEUR_SUPPLEMENTAIRE,
  PRIX_INDIVIDUEL,
  ROUTES,
  euros,
} from './site';
import './pages.css';

const documents = [
  { nom: 'Support de l’apprenant', texte: 'L’article, les activités, la mise en situation finale.', art: 'texte' },
  { nom: 'Dialogue audio', texte: 'Une réunion à deux voix, et sa transcription exacte.', art: 'audio' },
  { nom: 'Guide de l’enseignant', texte: 'Le déroulé, les corrigés, la grille de retour.', art: 'liste' },
  { nom: 'Plan de cours', texte: 'L’objectif, la tâche finale, les étapes, les sources.', art: 'plan' },
] as const;

const campus = [
  'Les 26 leçons, module par module',
  'Les travaux, avec un retour individuel',
  'Les ateliers en direct et leurs enregistrements',
  'Les échanges avec le groupe',
];

const chiffres = [
  { valeur: '26', label: 'leçons en 6 modules' },
  { valeur: '7', label: 'ateliers en direct, dont un de lancement' },
  { valeur: '6', suffixe: 'semaines à 3 mois', label: 'à votre rythme' },
  { valeur: '1', suffixe: 'an', label: 'd’accès à Campus et au Studio' },
];

// Small drawings of a document, made of flat shapes: they show what the thing is, nothing more.
function Art({ type }: { type: (typeof documents)[number]['art'] }) {
  if (type === 'audio') {
    return (
      <span className="lc-art lc-art--audio" aria-hidden="true">
        {[14, 26, 18, 34, 22, 30, 12, 28, 20, 32, 16, 24].map((h, i) => (
          <i key={i} style={{ height: h }} />
        ))}
      </span>
    );
  }
  if (type === 'liste') {
    return (
      <span className="lc-art lc-art--liste" aria-hidden="true">
        <i className="est-coche" /><b />
        <i className="est-coche" /><b />
        <i /><b />
      </span>
    );
  }
  if (type === 'plan') {
    return (
      <span className="lc-art lc-art--plan" aria-hidden="true">
        <i /><i /><i className="est-ici" /><i /><i /><i />
      </span>
    );
  }
  return (
    <span className="lc-art lc-art--texte" aria-hidden="true">
      <b /><i /><i /><i /><i />
    </span>
  );
}

export function Home() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);
  // Blocks whose drawing advances with the scroll.
  const hero = useRef<HTMLDivElement>(null);
  const docs = useRef<HTMLUListElement>(null);
  const campusTile = useRef<HTMLElement>(null);
  const doors = useRef<HTMLDivElement>(null);
  useScrollProgress(hero, { start: 0.14, end: 0.14, span: 1, prop: '--sp' });
  useScrollProgress(docs, { start: 0.96, end: 0.42 });
  useScrollProgress(campusTile, { start: 0.94, end: 0.2 });
  useScrollProgress(doors, { start: 0.98, end: 0.5 });

  return (
    <div className="lc lc-page" ref={page}>
      <section className="lc-wrap" aria-labelledby="accueil-titre">
        <div className="lc-green lc-hero" data-surface="green" data-reveal ref={hero}>
          <div className="lc-hero-text">
            <p className="lc-hero-kicker">Formation pour les instituts de langues</p>
            <h1 id="accueil-titre">
              <Words text="Vos formateurs créent des cours sur mesure avec l’IA." under="sur mesure" />
            </h1>
            <p className="lc-hero-lead" data-rise style={order(4)}>
              Une méthode en six étapes pour partir du métier de chaque apprenant et arriver à un
              cours prêt à enseigner. L’IA prépare, le formateur décide.
            </p>
            <div className="lc-hero-actions" data-rise style={order(5)}>
              <a className="lc-btn lc-btn--yellow" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
              <Link className="lc-btn lc-btn--on-green" to={ROUTES.cours}>{CTA_COURS}</Link>
            </div>
            <p className="lc-hero-note" data-rise style={order(6)}>
              Pour une équipe&nbsp;: {euros(PRIX_EQUIPE)}&nbsp;HT jusqu’à {FORMATEURS_INCLUS}&nbsp;formateurs.
              Financement OPCO possible.{' '}
              <Link to={`${ROUTES.formation}#independants`}>Vous êtes formateur indépendant&nbsp;?</Link>
            </p>
          </div>
          <div data-rise style={order(3)}><IntroVideo /></div>
        </div>
      </section>

      <section className="lc-wrap lc-why" aria-labelledby="pourquoi-titre">
        <div className="lc-why-text" data-reveal>
          <h2 className="lc-h2 lc-h2--big" id="pourquoi-titre">
            <Words text="Les ressources existent. Ce qui prend des heures, c’est de les adapter à chaque apprenant." mark="adapter à chaque apprenant" />
          </h2>
          <p className="lc-lead" data-rise style={order(6)}>
            Un chef de chantier n’a pas besoin du même anglais qu’une infirmière. Avec la méthode,
            son cours porte sur sa réunion, ses interlocuteurs, ses mots. Il reconnaît son métier
            dès la première séance.
          </p>
        </div>
        <div className="lc-principle" data-reveal>
          <ChatWindow />
          <h3><Words text="L’IA prépare. Le formateur décide." /></h3>
          <ul>
            <li data-rise style={order(1)}><strong>Il cadre</strong> le contexte, l’objectif et le niveau.</li>
            <li data-rise style={order(2)}><strong>Il vérifie</strong> chaque résultat à partir des sources.</li>
            <li data-rise style={order(3)}><strong>Il adapte</strong>, puis valide ce qui entre en classe.</li>
          </ul>
        </div>
      </section>

      <section className="lc-wrap" aria-labelledby="preuve-titre">
        <div className="lc-proof">
          <div className="lc-head" data-reveal>
            <p className="lc-kicker">La preuve</p>
            <h2 className="lc-h2" id="preuve-titre"><Words text="Un vrai cours, à ouvrir document par document." /></h2>
            <p className="lc-lead">
              Thomas est chef de projet, niveau B1 en anglais. Son objectif&nbsp;: animer en anglais
              la réunion d’équipe du lundi matin. Son cours a été construit avec la méthode, du
              premier document au dernier.
            </p>
            <Link className="lc-btn lc-btn--ink" to={ROUTES.cours}>{CTA_COURS}</Link>
          </div>
          <ul className="lc-docs lc-docs--stack" ref={docs}>
            {documents.map((doc) => (
              <li key={doc.nom} className={`lc-doc lc-doc--${doc.art} lc-sd lc-sd--stack`}>
                <Art type={doc.art} />
                <h3>{doc.nom}</h3>
                <p>{doc.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials items={TEMOIGNAGES} chiffres={CHIFFRES_TEMOIGNAGES} brouillon={TEMOIGNAGES_EN_ATTENTE} sauf={[3]} />

      <section className="lc-wrap" aria-labelledby="parcours-titre">
        <div className="lc-green lc-journey" data-surface="green">
          <div className="lc-head" data-reveal>
            <p className="lc-kicker">Le parcours</p>
            <h2 className="lc-h2 lc-h2--big" id="parcours-titre">
              <Words text="Six modules, du besoin de l’apprenant au cours prêt à enseigner." under="Six modules" />
            </h2>
            <p className="lc-lead" data-rise style={order(8)}>
              Chaque formateur suit le parcours avec un de ses vrais apprenants. À la fin de chaque
              module, il repart avec un document de plus.
            </p>
          </div>
          <Route />
          <Link className="lc-link" to={`${ROUTES.formation}#programme`}>Voir le programme de la formation</Link>
        </div>
      </section>

      <section className="lc-wrap" aria-labelledby="outils-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Les outils</p>
          <h2 className="lc-h2" id="outils-titre"><Words text="Une plateforme pour apprendre, une autre pour produire." /></h2>
          <p className="lc-lead">Campus et le Studio sont ouverts pendant un an à chaque formateur.</p>
        </div>
        <div className="lc-platform">
          <article className="lc-green lc-campus" data-surface="green" ref={campusTile}>
            <p className="lc-tile-name">Campus</p>
            <h3>Le parcours, les travaux et le groupe.</h3>
            <ShelfIllustration />
            <ul>
              {campus.map((ligne) => (
                <li key={ligne}>{ligne}</li>
              ))}
            </ul>
          </article>
          <StudioWindow />
        </div>
        <Link className="lc-link" to={ROUTES.plateforme}>Découvrir la plateforme</Link>
      </section>

      {/* A card about the Studio, right after the tools. */}
      <TestimonialSpot items={TEMOIGNAGES} id={3} cote="droite" />

      <section className="lc-wrap" aria-labelledby="bref-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">La formation</p>
          <h2 className="lc-h2" id="bref-titre"><Words text="La formation, en bref." /></h2>
        </div>
        <ul className="lc-figures" data-reveal>
          {chiffres.map((c, n) => (
            <li key={c.label} data-rise style={order(n)}>
              <strong>{c.valeur}{c.suffixe ? <small> {c.suffixe}</small> : null}</strong>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
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
      </section>
    </div>
  );
}
