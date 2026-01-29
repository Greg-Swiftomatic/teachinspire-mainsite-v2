import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
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
    <section className="bg-cream pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <Container>
        {/* Text Content - Centered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge variant="sage">Formation IA · Instituts de langues · France</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
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
            className="text-xl text-navy-light mb-4 max-w-2xl mx-auto"
          >
            Formez vos équipes à penser l'IA, pas à dépendre d'un outil.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy font-medium mb-8 max-w-2xl mx-auto"
          >
            Une formation qui rend autonome — pas captif.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button variant="primary" size="lg" href="/formation">
              Voir le programme complet
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            >
              Réserver mon appel (15 min, gratuit)
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-sm text-navy-light"
          >
            Éligible financement OPCO
          </motion.p>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-navy/10 bg-navy/5 border-2 border-dashed border-navy/20">
            {/* Placeholder for video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-yellow" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-navy-light text-sm">Vidéo de présentation</p>
                <p className="text-navy-light/60 text-xs mt-1">(placeholder)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
