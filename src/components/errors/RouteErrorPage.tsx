import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import '../lecap/pages.css';
import '../lecap/simple.css';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }

  return '';
}

// Shown outside the layout (no header): it carries its own logo and plain links.
export function RouteErrorPage() {
  const error = useRouteError();
  const isModuleLoadError = /dynamically imported module|module script/i.test(
    getErrorMessage(error),
  );

  return (
    <main className="lc lc-error-page">
      <div className="lc-wrap">
        <a href="/" className="lc-logo" aria-label="TeachInspire, accueil">
          <img src="/brand/lockup-horizontal.svg" alt="" width={166} height={32} />
        </a>
        <div className="lc-green lc-lost" data-surface="green">
          <h1>La page n’a pas pu se charger.</h1>
          <p>
            {isModuleLoadError
              ? 'Une nouvelle version du site est disponible. Rechargez la page pour continuer.'
              : 'Une erreur inattendue s’est produite. Rechargez la page ou revenez à l’accueil.'}
          </p>
          <div className="lc-hero-actions">
            <button type="button" className="lc-btn lc-btn--yellow" onClick={() => window.location.reload()}>
              Recharger la page
            </button>
            <a className="lc-btn lc-btn--on-green" href="/">Retour à l’accueil</a>
          </div>
        </div>
      </div>
    </main>
  );
}
