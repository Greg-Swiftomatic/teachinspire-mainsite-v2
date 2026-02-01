import { LOGO } from '../../assets/assets';
import { Container } from './Container';

// Hand-drawn decorative elements
const FooterDecoration = () => (
  <svg
    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-4"
    viewBox="0 0 800 16"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M0,8 Q100,2 200,8 T400,8 T600,8 T800,8"
      stroke="url(#footerGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="8 6"
      opacity="0.3"
    />
    <defs>
      <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f1d263" />
        <stop offset="50%" stopColor="#85a2a3" />
        <stop offset="100%" stopColor="#B7553D" />
      </linearGradient>
    </defs>
  </svg>
);

// Hand-drawn mail icon
const MailDoodle = () => (
  <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 6 L10 11 L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Hand-drawn calendar icon
const CalendarDoodle = () => (
  <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 8 L17 8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 2 L7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 2 L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Hand-drawn heart icon
const HeartDoodle = () => (
  <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
    <path
      d="M10 17 Q3 11 3 7 Q3 3 7 3 Q10 3 10 6 Q10 3 13 3 Q17 3 17 7 Q17 11 10 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

const footerLinks = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Formation', href: '/formation' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Confidentialité', href: '/confidentialite' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream py-16 relative">
      {/* Decorative top border */}
      <FooterDecoration />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pt-4">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <img
              src={LOGO}
              alt="TeachInspire"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-cream/80 max-w-sm font-handwritten text-xl mb-4">
              L'IA comme assistant, pas comme remplaçant.
            </p>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
              Formation pratique à l'IA pour formateurs en langues.
              Créez des cours personnalisés en moins de temps.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-cream/90">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/60 hover:text-yellow transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 bg-sage/50 group-hover:bg-yellow transition-colors"
                      style={{ borderRadius: '50% 40% 60% 45%' }}
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-cream/90">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:greg@teachinspire.me"
                  className="text-cream/60 hover:text-yellow transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-4 text-sage/70 group-hover:text-yellow transition-colors">
                    <MailDoodle />
                  </span>
                  greg@teachinspire.me
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
                  className="text-cream/60 hover:text-yellow transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-4 text-sage/70 group-hover:text-yellow transition-colors">
                    <CalendarDoodle />
                  </span>
                  Réserver un appel
                </a>
              </li>
            </ul>

            {/* Small decorative element */}
            <div className="mt-6 flex items-center gap-2 text-cream/40 text-xs">
              <span className="w-3 h-3 text-rust/50">
                <HeartDoodle />
              </span>
              Fait avec passion à Paris
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-cream/50 text-sm">
            © {currentYear} TeachInspire. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/50 hover:text-cream/80 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
