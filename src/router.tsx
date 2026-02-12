import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { FormationPage } from './pages/FormationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { MentionsLegalesPage } from './pages/MentionsLegalesPage';
import { PolitiqueConfidentialitePage } from './pages/PolitiqueConfidentialitePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OffrePage } from './pages/OffrePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'formation',
        element: <FormationPage />,
      },
      {
        // Hidden page — not in navigation, accessible only via direct URL
        path: 'offre',
        element: <OffrePage />,
      },
      {
        path: 'a-propos',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'mentions-legales',
        element: <MentionsLegalesPage />,
      },
      {
        path: 'confidentialite',
        element: <PolitiqueConfidentialitePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
