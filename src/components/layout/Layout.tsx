import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ROUTES } from '../lecap/site';

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      {/* The contact page is the booking itself: no second call under it. */}
      <Footer appel={pathname !== ROUTES.contact} />
    </div>
  );
}
