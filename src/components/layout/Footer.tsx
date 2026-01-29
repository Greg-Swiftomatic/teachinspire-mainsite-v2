import { LOGO } from '../../assets/assets';
import { Container } from './Container';

const footerLinks = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Formation', href: '/formation' },
    { label: 'Plateforme', href: '/plateforme' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <img
              src={LOGO}
              alt="TeachInspire"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-cream/80 max-w-sm font-handwritten text-xl">
              L'IA comme assistant, pas comme remplaçant.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:greg@teachinspire.me"
                  className="text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  greg@teachinspire.me
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
                  className="text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  Réserver un appel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/60 text-sm">
            © {currentYear} TeachInspire. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/60 hover:text-cream text-sm transition-colors duration-200"
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
