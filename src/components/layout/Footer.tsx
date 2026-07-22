import { Link } from 'react-router-dom';
import { LOGO, SITE_LOGO, BOOKING_URL } from '../../assets/assets';
import { Container } from './Container';

const footerLinks = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Formation', href: '/formation' },
    { label: 'Studio', href: '/studio' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Confidentialité', href: '/confidentialite' },
  ],
};

export function Footer({ compact = false }: { compact?: boolean }) {
  const currentYear = new Date().getFullYear();

  if (compact) {
    return (
      <footer className="border-t border-navy/15 bg-[#e7e8de] text-navy">
        <Container>
          <div className="grid gap-8 py-9 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Link
                to="/"
                className="inline-flex min-h-11 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                aria-label="TeachInspire : Accueil"
              >
                <img
                  src={SITE_LOGO}
                  alt=""
                  width={384}
                  height={246}
                  className="h-12 w-auto object-contain object-left"
                />
              </Link>
              <p className="mt-2 max-w-md font-display text-lg text-navy/85">
                Formation IA pour formateurs en langues.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm md:items-end">
              <a
                href="mailto:greg@teachinspire.me"
                className="inline-flex min-h-11 items-center font-medium hover:text-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                greg@teachinspire.me
              </a>
              <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Informations légales">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex min-h-11 items-center text-navy/65 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <p className="text-navy/55">© {currentYear} TeachInspire</p>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-navy text-cream">
      {/* Main footer content */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 lg:py-20">
          {/* Logo & Tagline */}
          <div className="md:col-span-5">
            <img
              src={LOGO}
              alt="TeachInspire"
              width={320}
              height={80}
              className="h-10 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-xl font-display text-cream/90 mb-4">
              L'IA comme assistant, pas comme remplaçant.
            </p>
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm">
              Formation IA pour formateurs en langues. Gagner du temps sans perdre
              le métier.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm uppercase tracking-wider text-cream/70 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="flex min-h-11 items-center gap-2 text-cream/80 transition-colors hover:text-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy group"
                  >
                    <span className="text-sage-light group-hover:text-yellow transition-colors">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-sm uppercase tracking-wider text-cream/70 mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:greg@teachinspire.me"
                  className="inline-flex min-h-11 items-center text-cream/80 transition-colors hover:text-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  greg@teachinspire.me
                </a>
              </li>
              <li>
                <a
                  href={BOOKING_URL}
                  className="mt-2 inline-flex min-h-11 items-center gap-2 bg-cream/15 px-4 py-2 text-cream transition-colors hover:bg-yellow hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  Réserver un appel
                  <span>→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-sm">
              © {currentYear} TeachInspire. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-cream/60 transition-colors hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
