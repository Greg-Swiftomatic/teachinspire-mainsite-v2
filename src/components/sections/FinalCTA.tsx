import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import BlurText from '../reactbits/BlurText';

const reassurances = [
  { text: 'Gratuit' },
  { text: 'Sans engagement' },
  { text: '15 minutes' },
];

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-navy py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay variant="light" />
      <GeometricAccentGroup preset="final-cta" />

      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Large number accent */}
            <span
              className="text-[10rem] lg:text-[14rem] font-display font-bold text-cream/[0.03] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
              aria-hidden="true"
            >
              ?
            </span>

            <div className="relative z-10 mb-6">
              <h2>
                <BlurText
                  text="Prêt à former"
                  delay={120}
                  animateBy="words"
                  direction="bottom"
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-cream leading-tight"
                  stepDuration={0.4}
                />
                <BlurText
                  text="vos équipes ?"
                  delay={120}
                  animateBy="words"
                  direction="bottom"
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-yellow leading-tight mt-2"
                  stepDuration={0.4}
                />
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-xl text-cream/80 mb-4">
                Réservez un appel découverte de 15 minutes.
              </p>
              <p className="text-cream/50 max-w-xl mx-auto leading-relaxed">
                On échange sur vos besoins, votre contexte, vos questions.
                <span className="block mt-1 italic">
                  Pas de pitch commercial — juste une conversation.
                </span>
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-10"
          >
            <Button
              variant="cta"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              showArrow
            >
              Réserver mon appel découverte
            </Button>
          </motion.div>

          {/* Reassurances */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10"
          >
            {reassurances.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 text-cream/60 text-sm">
                <Check className="w-4 h-4 text-sage flex-shrink-0" aria-hidden="true" />
                {item.text}
              </span>
            ))}
          </motion.div>

          {/* Email alternative */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-cream/40 text-sm text-center"
          >
            Ou écrivez-nous directement :{' '}
            <a
              href="mailto:greg@teachinspire.me"
              className="text-cream/60 hover:text-yellow transition-colors underline underline-offset-4"
            >
              greg@teachinspire.me
            </a>
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
