import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BOOKING_URL, CAMPUS_URL, CTA_APPEL, CTA_COURS, MENU, ROUTES } from '../lecap/site';
import './layout.css';

export function Header() {
  const [ouvert, setOuvert] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!ouvert) return;
    const fermer = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOuvert(false);
      bouton.current?.focus();
    };
    window.addEventListener('keydown', fermer);
    return () => window.removeEventListener('keydown', fermer);
  }, [ouvert]);

  const liens = MENU.map((lien) => (
    <li key={lien.href}>
      <Link
        to={lien.href}
        className="lc-nav-link"
        aria-current={pathname === lien.href ? 'page' : undefined}
        onClick={() => setOuvert(false)}
      >
        {lien.label}
      </Link>
    </li>
  ));

  return (
    <header className="lc lc-header">
      <a className="lc-skip" href="#contenu">Aller au contenu</a>
      <div className="lc-wrap lc-header-bar">
        <Link to="/" className="lc-logo" aria-label="TeachInspire, accueil" onClick={() => setOuvert(false)}>
          <img src="/brand/lockup-horizontal.svg" alt="" width={166} height={32} />
        </Link>

        <nav className="lc-nav" aria-label="Menu principal">
          <ul className="lc-nav-track">{liens}</ul>
        </nav>

        <div className="lc-header-actions">
          <a className="lc-link lc-login" href={CAMPUS_URL}>Se connecter</a>
          <a className="lc-btn lc-btn--ink lc-btn--small" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {CTA_APPEL}
          </a>
        </div>

        <button
          ref={bouton}
          type="button"
          className="lc-btn lc-btn--line lc-btn--small lc-menu-button"
          aria-expanded={ouvert}
          aria-controls="lc-menu-mobile"
          onClick={() => setOuvert(!ouvert)}
        >
          {ouvert ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {ouvert ? (
        <nav id="lc-menu-mobile" className="lc-wrap lc-mobile" aria-label="Menu principal">
          <ul>{liens}</ul>
          <div className="lc-mobile-actions">
            <a className="lc-btn lc-btn--ink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{CTA_APPEL}</a>
            <Link className="lc-btn lc-btn--line" to={ROUTES.cours} onClick={() => setOuvert(false)}>{CTA_COURS}</Link>
            <a className="lc-link" href={CAMPUS_URL}>Se connecter</a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
