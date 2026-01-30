import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export function Hero() {
  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      <Container>
        {/* Text Content - Centered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge variant="sage">Formation IA · Instituts de langues</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
          >
            Formez vos équipes à créer des leçons{' '}
            <span className="relative inline-block">
              <span className="relative z-10">à partir de n'importe quelle source</span>
              {/* Brush stroke underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-yellow"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
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
            La méthode IA pour vos formateurs de langues — sans expertise, sans budget.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy font-medium mb-8 max-w-2xl mx-auto"
          >
            Vidéo YouTube, podcast, article → leçon sur mesure en moins d'une heure.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button variant="primary" size="lg" href="/formation">
              Découvrir le programme
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            >
              Réserver un appel
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-sm text-navy-light"
          >
            Éligible financement OPCO
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
