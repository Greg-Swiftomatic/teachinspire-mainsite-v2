import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LOGO } from '../../assets/assets';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-navy/10">
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex min-h-11 min-w-11 items-center">
            <img src={LOGO} alt="TeachInspire" width={320} height={80} className="h-10 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm font-medium tracking-wide text-navy-light transition-colors hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                {link.label}
              </a>
            ))}
            <Button variant="secondary" size="sm" href="https://studio.teachinspire.me">
              Se connecter
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="https://cal.com/teachinspire.me"
              showArrow
            >
              Réserver un appel
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 text-navy cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.98, y: -8 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.98, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            id="mobile-navigation"
            className="md:hidden bg-cream border-b border-navy/10"
          >
            <Container>
              <div className="py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex min-h-11 items-center border-b border-navy/5 py-3 font-medium text-navy transition-colors last:border-0 hover:text-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
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
                  href="https://cal.com/teachinspire.me"
                  showArrow
                  className="mt-2"
                >
                  Réserver un appel
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
