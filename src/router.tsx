import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouteErrorPage } from './components/errors/RouteErrorPage';
import { Layout } from './components/layout/Layout';

const HomePage = lazy(async () => {
  const mod = await import('./pages/HomePage');
  return { default: mod.HomePage };
});

const FormationPage = lazy(async () => {
  const mod = await import('./pages/FormationPage');
  return { default: mod.FormationPage };
});

const CoursPage = lazy(async () => {
  const mod = await import('./pages/CoursPage');
  return { default: mod.CoursPage };
});

const StudioPage = lazy(async () => {
  const mod = await import('./pages/StudioPage');
  return { default: mod.StudioPage };
});

const AboutPage = lazy(async () => {
  const mod = await import('./pages/AboutPage');
  return { default: mod.AboutPage };
});

const InvitePage = lazy(async () => {
  const mod = await import('./pages/InvitePage');
  return { default: mod.InvitePage };
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
  <div className="min-h-[60vh]" aria-busy="true" />
);

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={pageFallback}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorPage />,
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
        // The old offer page now lives inside Formation (also redirected in public/_redirects).
        path: 'offre',
        element: <Navigate to="/formation" replace />,
      },
      {
        path: 'cours-de-a-a-z',
        element: withSuspense(<CoursPage />),
      },
      {
        path: 'plateforme',
        element: <Navigate to="/studio" replace />,
      },
      {
        path: 'studio',
        element: withSuspense(<StudioPage />),
      },
      {
        path: 'a-propos',
        element: withSuspense(<AboutPage />),
      },
      {
        // Hidden page — not in navigation, accessible only via direct URL
        path: 'invite',
        element: withSuspense(<InvitePage />),
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
