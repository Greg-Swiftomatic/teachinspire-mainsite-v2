import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }

  return '';
}

export function RouteErrorPage() {
  const error = useRouteError();
  const isModuleLoadError = /dynamically imported module|module script/i.test(
    getErrorMessage(error),
  );

  return (
    <main className="min-h-screen bg-cream text-navy flex items-center">
      <div className="w-full max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rust mb-6">
          TeachInspire
        </p>
        <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-tight mb-6">
          La page n'a pas pu se charger
        </h1>
        <p className="text-lg text-navy/70 leading-relaxed max-w-2xl mb-10">
          {isModuleLoadError
            ? "Une nouvelle version du site est disponible. Rechargez la page pour continuer."
            : "Une erreur inattendue s'est produite. Rechargez la page ou revenez à l'accueil."}
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-yellow text-navy px-6 py-3 font-semibold border border-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2"
          >
            Recharger la page
          </button>
          <a
            href="/"
            className="px-6 py-3 font-semibold border border-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </main>
  );
}
