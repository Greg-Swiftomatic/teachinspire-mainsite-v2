import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/seo/PageMeta';
import { Words, order, useMotion } from '../components/lecap/motion';
import { BOOKING_URL, CTA_APPEL, CTA_COURS, ROUTES } from '../components/lecap/site';
import '../components/lecap/pages.css';
import '../components/lecap/simple.css';

// Hidden page, sent by hand to a director: not in the menu, not indexed.
// The introduction video validated on 10 November 2026, the same file as on the home page.
const VIDEO = '/videos/introduction-teachinspire.mp4';
const POSTER = '/videos/introduction-teachinspire-poster.webp';

const aVoir = [
  'Le ton et la démarche de la formation',
  'La méthode, du besoin de l’apprenant au cours prêt à enseigner',
  'La place du formateur : l’IA prépare, il décide',
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
        <div className="lc-green lc-intro lc-intro--video" data-surface="green" data-reveal>
          <div className="lc-intro-text">
            <p className="lc-hero-kicker">Aperçu privé</p>
            <h1 id="invite-titre"><Words text="La méthode, en 90 secondes." under="90 secondes" /></h1>
            <p className="lc-hero-lead" data-rise style={order(4)}>
              Greg présente la méthode et la formation. Regardez-la, et jugez la démarche avant d’en
              discuter.
            </p>
            <ul className="lc-points" data-rise style={order(5)}>
              {aVoir.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div className="lc-frame" data-rise style={order(3)}>
            <video
              src={VIDEO}
              poster={POSTER}
              controls
              playsInline
              preload="none"
              width={1280}
              height={720}
              aria-label="Vidéo de présentation de TeachInspire"
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
