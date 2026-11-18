import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/seo/PageMeta';
import { Words, order, useMotion } from '../components/lecap/motion';
import { BOOKING_URL, CTA_APPEL, CTA_COURS, ROUTES } from '../components/lecap/site';
import '../components/lecap/pages.css';
import '../components/lecap/simple.css';

// Hidden page, sent by hand to a director: not in the menu, not indexed.
const VIDEO_URL = 'https://customer-y3j8jz0c4eop5wt4.cloudflarestream.com/eaa14f9ff1fc5d4e87fe22ae3f932d6f/iframe';

const aVoir = [
  'Le ton et la pédagogie de la formation',
  'La manière dont une leçon avance, sans jargon inutile',
  'Le niveau de précision demandé aux formateurs',
];

const suite = [
  { titre: '26 leçons en 6 modules', texte: 'Du besoin de l’apprenant au cours prêt à enseigner, à suivre au rythme de chacun.' },
  { titre: '7 ateliers en direct', texte: 'Avec votre équipe, dont un de lancement, sur les cours de vos formateurs.' },
  { titre: 'Campus et le Studio, un an', texte: 'Le parcours, les travaux avec un retour individuel, et les quatre outils pour produire.' },
];

export function InvitePage() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);

  return (
    <div className="lc lc-page" ref={page}>
      <PageMeta
        title="Aperçu privé : TeachInspire"
        description="Aperçu vidéo privé de la formation TeachInspire pour instituts de langues."
        path="/invite"
        noindex
      />

      <section className="lc-wrap" aria-labelledby="invite-titre">
        <div className="lc-green lc-intro" data-surface="green" data-reveal>
          <div className="lc-intro-text">
            <p className="lc-hero-kicker">Aperçu privé</p>
            <h1 id="invite-titre"><Words text="Un extrait, pour voir comment ça travaille." under="comment ça travaille" /></h1>
            <p className="lc-hero-lead" data-rise style={order(4)}>
              Regardez le premier module et jugez le rythme, le ton et le niveau de détail avant d’en
              discuter.
            </p>
            <ul className="lc-points" data-rise style={order(5)}>
              {aVoir.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div className="lc-frame" data-rise style={order(3)}>
            <iframe
              src={VIDEO_URL}
              title="TeachInspire : aperçu privé de la formation"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="lc-wrap" aria-labelledby="suite-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Dans la suite</p>
          <h2 className="lc-h2" id="suite-titre"><Words text="Ce que contient la formation complète." /></h2>
        </div>
        <ul className="lc-three" data-reveal>
          {suite.map((s, n) => (
            <li key={s.titre} className="lc-tile lc-tile--paper" data-rise style={order(n)}>
              <h3>{s.titre}</h3>
              <p>{s.texte}</p>
            </li>
          ))}
        </ul>
        <p className="lc-free">
          Si cet aperçu vous parle, parlons de votre équipe&nbsp;: je vous montre où le parcours colle
          à vos besoins, et où il faudra l’ajuster.
        </p>
        <div className="lc-hero-actions">
          <a className="lc-btn lc-btn--ink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
          <Link className="lc-btn lc-btn--line" to={ROUTES.formation}>Voir la formation</Link>
          <Link className="lc-link" to={ROUTES.cours}>{CTA_COURS}</Link>
        </div>
      </section>
    </div>
  );
}
