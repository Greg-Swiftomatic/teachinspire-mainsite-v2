import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { Badge } from '../ui/Badge';
import { LightbulbIllustration, SquiggleLine } from '../ui/HandDrawnIllustrations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <section className="bg-cream pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden paper-texture relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 opacity-20" aria-hidden="true">
        <SquiggleLine className="text-sage" />
      </div>
      <div className="absolute bottom-20 right-10 w-20 h-20 opacity-15 rotate-45" aria-hidden="true">
        <SquiggleLine className="text-rust" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge variant="sage">Formation IA · Instituts de langues · France</Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold font-display text-navy mb-6 leading-tight"
            >
              L'IA pour vos formateurs —{' '}
              <span className="relative inline-block">
                <span className="relative z-10">une méthode, pas une béquille.</span>
                {/* Brush stroke underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-yellow"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,8 Q40,2 80,6 T160,4 T200,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-navy-light mb-4 max-w-xl"
            >
              Formez vos équipes à penser l'IA, pas à dépendre d'un outil.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-navy font-medium mb-8 max-w-xl"
            >
              Une formation qui rend autonome — pas captif.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <HandDrawnButton variant="primary" size="lg" href="/formation">
                Voir le programme complet
              </HandDrawnButton>
              <HandDrawnButton
                variant="secondary"
                size="lg"
                href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              >
                Réserver mon appel
              </HandDrawnButton>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-sm text-navy-light flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-sage" aria-hidden="true" />
              Éligible financement OPCO
            </motion.p>
          </motion.div>

          {/* Illustration - Right */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Decorative background blob */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-yellow/20 via-sage/10 to-transparent rounded-full blur-3xl"
              style={{ transform: 'scale(0.8)' }}
              aria-hidden="true"
            />

            {/* Self-drawing lightbulb illustration */}
            <LightbulbIllustration className="w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] relative z-10" />

            {/* Small decorative doodles */}
            <motion.div
              className="absolute top-10 right-0 text-rust opacity-60"
              animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-0 text-sage opacity-50"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
