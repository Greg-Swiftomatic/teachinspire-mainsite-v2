import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_LOGO, BOOKING_URL } from '../../assets/assets';
import { Container } from './Container';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Formation', href: '/formation' },
  { label: 'Studio', href: '/studio' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-navy/10">
      <Container size="wide" className="xl:max-w-[94rem] xl:px-10">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex min-h-11 items-center" aria-label="TeachInspire : Accueil">
            <img
              src={SITE_LOGO}
              alt=""
              width={384}
              height={246}
              className="h-11 w-auto object-contain object-left"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative inline-flex min-h-11 items-center text-sm font-medium tracking-wide transition-colors hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${pathname === link.href ? 'text-navy after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-rust' : 'text-navy-light'}`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="ghost" size="sm" href="https://studio.teachinspire.me">
              Se connecter
            </Button>
            <Button
              variant="primary"
              size="sm"
              href={BOOKING_URL}
              showArrow
            >
              Réserver un appel
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 text-navy cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="animate-fade-in-up border-b border-navy/10 bg-cream lg:hidden motion-reduce:animate-none"
          >
            <Container>
              <div className="py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex min-h-11 items-center border-b border-navy/5 py-3 font-medium text-navy transition-colors last:border-0 hover:text-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="secondary"
                  size="md"
                  href="https://studio.teachinspire.me"
                  className="mt-4"
                >
                  Se connecter
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href={BOOKING_URL}
                  showArrow
                  className="mt-2"
                >
                  Réserver un appel
                </Button>
              </div>
            </Container>
          </div>
      )}
    </header>
  );
}
