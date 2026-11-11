import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ROUTES } from '../lecap/site';
import { TestimonialBand } from '../lecap/Testimonials';
import { CARTE_PAR_PAGE, TEMOIGNAGES } from '../lecap/temoignages-data';

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenu" className="flex-1">
        <Outlet />
        {CARTE_PAR_PAGE[pathname] ? <TestimonialBand key={pathname} items={TEMOIGNAGES} id={CARTE_PAR_PAGE[pathname]} /> : null}
      </main>
      {/* The contact page is the booking itself: no second call under it. */}
      <Footer appel={pathname !== ROUTES.contact} />
    </div>
  );
}
