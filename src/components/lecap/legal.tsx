import type { ReactNode } from 'react';
import './simple.css';

// The publisher, in one place for both legal pages.
// TODO(Greg): full legal name, SIRET and registered address are still missing.
export const EDITEUR = {
  nom: 'Gregory [NOM]',
  statut: 'Auto-entrepreneur',
  siret: '[À COMPLÉTER]',
  siege: '[À COMPLÉTER]',
  email: 'greg@teachinspire.me',
};

export const MISE_A_JOUR = 'novembre 2026';

export function Editeur() {
  return (
    <ul>
      <li>{EDITEUR.nom} : {EDITEUR.statut}</li>
      <li>SIRET : {EDITEUR.siret}</li>
      <li>Siège social : {EDITEUR.siege}</li>
      <li>E-mail : <a href={`mailto:${EDITEUR.email}`}>{EDITEUR.email}</a></li>
    </ul>
  );
}

export function LegalPage({ kicker, titre, children }: { kicker: string; titre: string; children: ReactNode }) {
  return (
    <div className="lc lc-page">
      <article className="lc-wrap">
        <div className="lc-doc-page">
          <header className="lc-head">
            <p className="lc-kicker">{kicker}</p>
            <h1>{titre}</h1>
          </header>
          <div className="lc-prose">{children}</div>
          <p className="lc-prose-date">Dernière mise à jour : {MISE_A_JOUR}</p>
        </div>
      </article>
    </div>
  );
}
