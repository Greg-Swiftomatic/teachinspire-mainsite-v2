import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { GridOverlay } from '../components/ui/GridOverlay';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function MentionsLegalesPage() {
  return (
    <section className="bg-cream min-h-screen relative overflow-hidden">
      <GridOverlay />

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="mb-8">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                Mentions Légales
              </span>
              <div className="h-px bg-navy/10 mt-4" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-navy mb-12 leading-[1.1] tracking-tight">
              Mentions légales
            </h1>

            <div className="space-y-12 text-navy/80 leading-relaxed">
              {/* Éditeur du site */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  Éditeur du site
                </h2>
                <p>
                  Le site <strong>teachinspire.me</strong> est édité par :
                </p>
                <ul className="mt-3 space-y-1">
                  <li>Gregory [NOM] — Auto-entrepreneur</li>
                  <li>SIRET : [À COMPLÉTER]</li>
                  <li>Siège social : [À COMPLÉTER]</li>
                  <li>
                    Email :{' '}
                    <a
                      href="mailto:greg@teachinspire.me"
                      className="text-rust hover:underline"
                    >
                      greg@teachinspire.me
                    </a>
                  </li>
                </ul>
              </div>

              {/* Directeur de la publication */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  Directeur de la publication
                </h2>
                <p>Gregory [NOM]</p>
              </div>

              {/* Hébergeur */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  Hébergeur
                </h2>
                <ul className="space-y-1">
                  <li>Cloudflare, Inc.</li>
                  <li>101 Townsend Street, San Francisco, CA 94107, USA</li>
                  <li>
                    Site :{' '}
                    <a
                      href="https://www.cloudflare.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rust hover:underline"
                    >
                      cloudflare.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Propriété intellectuelle */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  Propriété intellectuelle
                </h2>
                <p>
                  L'ensemble du contenu de ce site (textes, images, logos, mise en page)
                  est la propriété exclusive de TeachInspire, sauf mention contraire.
                  Toute reproduction, représentation, modification ou adaptation, totale
                  ou partielle, est interdite sans autorisation écrite préalable.
                </p>
              </div>

              {/* Crédits */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  Crédits
                </h2>
                <ul className="space-y-1">
                  <li>
                    Polices : Fraunces et DM Sans, servies via{' '}
                    <a
                      href="https://fonts.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rust hover:underline"
                    >
                      Google Fonts
                    </a>
                  </li>
                  <li>Icônes : Lucide React</li>
                </ul>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-16 pt-8 border-t border-navy/10">
              <p className="text-navy/40 text-sm">
                Dernière mise à jour : février 2025
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
