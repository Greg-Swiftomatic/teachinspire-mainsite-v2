import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

const HomePage = lazy(async () => {
  const mod = await import('./pages/HomePage');
  return { default: mod.HomePage };
});

const FormationPage = lazy(async () => {
  const mod = await import('./pages/FormationPage');
  return { default: mod.FormationPage };
});

const OffrePage = lazy(async () => {
  const mod = await import('./pages/OffrePage');
  return { default: mod.OffrePage };
});

const AboutPage = lazy(async () => {
  const mod = await import('./pages/AboutPage');
  return { default: mod.AboutPage };
});

const ContactPage = lazy(async () => {
  const mod = await import('./pages/ContactPage');
  return { default: mod.ContactPage };
});

const MentionsLegalesPage = lazy(async () => {
  const mod = await import('./pages/MentionsLegalesPage');
  return { default: mod.MentionsLegalesPage };
});

const PolitiqueConfidentialitePage = lazy(async () => {
  const mod = await import('./pages/PolitiqueConfidentialitePage');
  return { default: mod.PolitiqueConfidentialitePage };
});

const NotFoundPage = lazy(async () => {
  const mod = await import('./pages/NotFoundPage');
  return { default: mod.NotFoundPage };
});

const pageFallback = (
  <div className="min-h-[40vh] flex items-center justify-center text-sm text-navy/60">
    Chargement...
  </div>
);

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={pageFallback}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      {
        path: 'formation',
        element: withSuspense(<FormationPage />),
      },
      {
        // Hidden page — not in navigation, accessible only via direct URL
        path: 'offre',
        element: withSuspense(<OffrePage />),
      },
      {
        path: 'a-propos',
        element: withSuspense(<AboutPage />),
      },
      {
        path: 'contact',
        element: withSuspense(<ContactPage />),
      },
      {
        path: 'mentions-legales',
        element: withSuspense(<MentionsLegalesPage />),
      },
      {
        path: 'confidentialite',
        element: withSuspense(<PolitiqueConfidentialitePage />),
      },
      {
        path: '*',
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },
]);
