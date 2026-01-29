import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { BlurReveal } from '../ui/TextReveal';
import { ILLUSTRATIONS } from '../../assets/assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function Founder() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait with hover effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start order-1 lg:order-none"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Animated glow behind image */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-yellow/30 to-sage/30 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <img
                src={ILLUSTRATIONS.portraitGregory}
                alt="Grégory Le Dall, fondateur de TeachInspire"
                className="w-full max-w-sm rounded-2xl shadow-xl relative z-10"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="order-2 lg:order-none"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold font-display text-navy mb-6"
            >
              Derrière TeachInspire
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 text-lg text-navy-light mb-8">
              <BlurReveal delay={0.2}>
                <p>
                  Je m'appelle Grégory. Formateur de langues depuis 2016, certifié CELTA (Cambridge).
                </p>
              </BlurReveal>
              <BlurReveal delay={0.3}>
                <p>
                  J'ai vécu le même dilemme que vous : des apprenants aux profils très différents, 
                  des secteurs techniques que je ne maîtrisais pas, et l'impression d'être limité 
                  par ce que je connaissais.
                </p>
              </BlurReveal>
              <BlurReveal delay={0.4}>
                <p>
                  Fin 2022, j'ai découvert l'IA générative. Depuis, je peux transformer 
                  n'importe quelle source en cours adapté. C'est ce que j'enseigne.
                </p>
              </BlurReveal>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  href="/a-propos"
                >
                  En savoir plus sur mon parcours
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
