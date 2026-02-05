import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-cream min-h-[90vh] relative overflow-hidden">
      <GridOverlay />

      <Container>
        <div className="grid lg:grid-cols-12 gap-8 min-h-[90vh] items-center py-24">
          {/* Left column - main content */}
          <div className="lg:col-span-7">
            {/* Category label */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-12 h-px bg-rust" />
              <span className="text-rust font-medium text-sm tracking-wide">
                Formation IA · Instituts de langues
              </span>
            </motion.div>

            {/* Headline with number accent */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              {/* Large number background */}
              <span
                className="absolute -left-4 -top-16 text-[12rem] font-display font-bold text-sage/10 leading-none select-none pointer-events-none hidden lg:block"
                aria-hidden="true"
              >
                01
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-navy leading-[1.1] relative z-10">
                Formez vos équipes à créer des leçons à partir de
                <span className="block text-rust">n'importe quelle source</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-navy-light mt-8 max-w-xl leading-relaxed"
            >
              La méthode IA pour vos formateurs de langues — sans expertise, sans budget.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <a
                href="/formation"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-navy text-cream font-semibold hover:bg-navy/90 transition-colors"
              >
                <span>Découvrir le programme</span>
                <span className="text-yellow group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
                className="inline-flex items-center gap-3 px-6 py-4 border border-navy/20 text-navy font-semibold hover:border-navy hover:bg-navy/5 transition-all"
              >
                Réserver un appel
              </a>
            </motion.div>
          </div>

          {/* Right column - info card */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-navy text-cream p-8 lg:p-10">
              {/* Process preview */}
              <div className="mb-8 pb-8 border-b border-cream/10">
                <span className="text-cream/50 text-sm uppercase tracking-wider">Le processus</span>
                <p className="text-xl font-display mt-3">
                  Vidéo YouTube, podcast, article → leçon sur mesure
                </p>
              </div>

              {/* Time metric */}
              <div className="mb-8 pb-8 border-b border-cream/10">
                <span className="text-cream/50 text-sm uppercase tracking-wider">Temps de création</span>
                <p className="text-4xl font-display font-bold text-yellow mt-2">
                  &lt; 1 heure
                </p>
              </div>

              {/* Funding note */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sage" />
                <span className="text-cream/70 text-sm">Éligible financement OPCO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
