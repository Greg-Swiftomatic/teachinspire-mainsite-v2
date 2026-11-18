import { Link } from 'react-router-dom';
import { PageMeta } from '../components/seo/PageMeta';
import { CTA_COURS, ROUTES } from '../components/lecap/site';
import '../components/lecap/pages.css';
import '../components/lecap/simple.css';

export function NotFoundPage() {
  return (
    <div className="lc lc-page">
      <PageMeta title="Page introuvable | TeachInspire" description="Cette page n’existe pas ou a été déplacée." path="/404" noindex />
      <section className="lc-wrap" aria-labelledby="introuvable-titre">
        <div className="lc-green lc-lost" data-surface="green">
          <p className="lc-hero-kicker">Erreur 404</p>
          <h1 id="introuvable-titre">Page introuvable.</h1>
          <p>Le lien est peut-être incorrect, ou la page a été déplacée.</p>
          <div className="lc-hero-actions">
            <Link className="lc-btn lc-btn--yellow" to={ROUTES.accueil}>Retour à l’accueil</Link>
            <Link className="lc-btn lc-btn--on-green" to={ROUTES.cours}>{CTA_COURS}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
