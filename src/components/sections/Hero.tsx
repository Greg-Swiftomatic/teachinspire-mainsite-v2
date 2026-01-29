import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TextReveal } from '../ui/TextReveal';

// Cloudflare Stream video ID
const HERO_VIDEO_ID = '60c8ff1c20b6ec6447a28e65f25089ed';

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
    <section className="bg-cream py-16 lg:py-20 overflow-hidden">
      <Container>
        {/* Text Content - Centered above */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge variant="sage">Pour formateurs de langues</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
          >
            <TextReveal delay={0.2}>
              Transformez n'importe quelle source
            </TextReveal>
            <span className="text-sage block mt-1">
              <TextReveal delay={0.4}>
                en cours parfaitement adapté.
              </TextReveal>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy-light mb-8 max-w-2xl mx-auto"
          >
            Apprenez à maîtriser l'IA pour créer des leçons sur-mesure — 
            quel que soit le niveau, le secteur ou les objectifs de vos apprenants.
            <span className="block mt-2 text-navy font-medium">
              En quelques minutes, pas en quelques heures.
            </span>
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" href="/formation">
              Découvrir la formation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            >
              Réserver un appel (15 min)
            </Button>
          </motion.div>
        </motion.div>

        {/* Video - Full width below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-navy/10">
            <iframe
              src={`https://iframe.cloudflarestream.com/${HERO_VIDEO_ID}?muted=true&autoplay=true&loop=true&controls=false`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="absolute border-0"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.1)',
                width: '110%',
                height: '110%',
              }}
              title="TeachInspire - L'IA comme assistant pédagogique"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
