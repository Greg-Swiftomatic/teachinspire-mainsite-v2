import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { FormationPage } from './pages/FormationPage';
import { PlateformePage } from './pages/PlateformePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

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
        path: 'plateforme',
        element: <PlateformePage />,
      },
      {
        path: 'a-propos',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);
