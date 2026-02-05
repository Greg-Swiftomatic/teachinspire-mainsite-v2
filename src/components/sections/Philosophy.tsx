import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { LetterReveal, BlurReveal } from '../ui/TextReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Philosophy() {
  const prefersReducedMotion = useReducedMotion();
  const getTransition = (duration: number = 1) => ({
    duration: prefersReducedMotion ? 0.01 : duration,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section className="bg-navy py-24 lg:py-32 relative overflow-hidden">
      {/* Animated decorative quote marks */}
      <motion.div
        className="absolute top-12 left-8 text-yellow/10 text-[200px] font-display leading-none select-none"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={getTransition()}
        aria-hidden="true"
      >
        "
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-8 text-yellow/10 text-[200px] font-display leading-none select-none rotate-180"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={getTransition()}
        aria-hidden="true"
      >
        "
      </motion.div>

      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center relative z-10"
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cream leading-tight mb-8">
            <LetterReveal delay={prefersReducedMotion ? 0 : 0.2} staggerDelay={prefersReducedMotion ? 0 : 0.03} className="block mb-2">
              L'IA comme assistant,
            </LetterReveal>
            <motion.span
              className="text-yellow block relative inline-block"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
              pas comme remplaçant.
              {/* Subtle underline that draws in */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow/40 rounded-full"
                initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: prefersReducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ originX: 0 }}
                aria-hidden="true"
              />
            </motion.span>
          </div>

          <div className="text-xl text-sage-light max-w-2xl mx-auto space-y-4 mb-8 text-left">
            <BlurReveal delay={prefersReducedMotion ? 0 : 0.9}>
              <p>
                Votre expertise pédagogique, votre connaissance de vos élèves,
                votre capacité d'adaptation — ça, l'IA ne peut pas le faire.
              </p>
            </BlurReveal>
            <BlurReveal delay={prefersReducedMotion ? 0 : 1}>
              <p>
                Ce qu'elle peut faire : vous donner accès à des contenus
                que vous n'auriez jamais pu exploiter autrement.
                Et vous libérer du temps pour ce qui compte vraiment :
                l'accompagnement, la relation, l'inspiration.
              </p>
            </BlurReveal>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: prefersReducedMotion ? 0 : 1.2,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="text-sage font-display italic text-2xl inline-block"
          >
            — C'est notre conviction depuis le premier jour.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
