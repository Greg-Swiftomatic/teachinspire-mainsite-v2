import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ConversationIllustration } from '../lecap/Illustrations';
import { Words, useMotion, useScrollProgress } from '../lecap/motion';
import { BOOKING_URL, CAMPUS_URL, CTA_APPEL, CTA_COURS, MENU, ROUTES } from '../lecap/site';
import './layout.css';

// The closing call is part of the footer, so every page ends on the same two buttons.
export function Footer({ appel = true }: { appel?: boolean }) {
  const footer = useRef<HTMLElement>(null);
  useMotion(footer);
  const call = useRef<HTMLElement>(null);
  useScrollProgress(call, { start: 0.96, end: 0.38 });

  return (
    <footer className="lc lc-footer" ref={footer}>
      <div className="lc-wrap">
        {appel ? (
          <section className="lc-green lc-call" data-surface="green" aria-labelledby="lc-call-titre" data-reveal ref={call}>
            <div className="lc-call-text">
              <h2 id="lc-call-titre"><Words text="Quinze minutes, un avis honnête." dot /></h2>
              <p>
                Vous repartez avec une idée précise de ce que la méthode peut apporter à votre
                équipe, que vous travailliez avec nous ou non.
              </p>
            </div>
            <div className="lc-call-art"><ConversationIllustration /></div>
            <div className="lc-call-actions">
              <a className="lc-btn lc-btn--yellow" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
              <Link className="lc-btn lc-btn--on-green" to={ROUTES.cours}>{CTA_COURS}</Link>
            </div>
          </section>
        ) : null}

        <div className="lc-footer-grid">
          <div className="lc-footer-brand">
            <Link to="/" className="lc-logo" aria-label="TeachInspire, accueil">
              <img src="/brand/lockup-horizontal.svg" alt="" width={166} height={32} loading="lazy" />
            </Link>
            <p>L’IA prépare. Le formateur décide.</p>
          </div>

          <nav aria-label="Pages du site">
            <ul>
              {MENU.map((lien) => (
                <li key={lien.href}><Link to={lien.href}>{lien.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact et accès">
            <ul>
              <li><a href={CAMPUS_URL}>Se connecter à Campus</a></li>
              <li><Link to={ROUTES.contact}>Contact</Link></li>
              <li><a href="mailto:greg@teachinspire.me">greg@teachinspire.me</a></li>
            </ul>
          </nav>
        </div>

        <div className="lc-footer-legal">
          <p>© {new Date().getFullYear()} TeachInspire</p>
          <ul>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/confidentialite">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
