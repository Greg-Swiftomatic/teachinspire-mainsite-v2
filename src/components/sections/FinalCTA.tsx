import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';

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

      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Large number accent */}
            <span
              className="text-[10rem] lg:text-[14rem] font-display font-bold text-cream/[0.03] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
              aria-hidden="true"
            >
              ?
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-cream leading-tight relative z-10 mb-6">
              Prêt à former
              <span className="block text-yellow mt-2">vos équipes ?</span>
            </h2>

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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10"
          >
            <Button
              variant="primary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              showArrow
              className="bg-yellow text-navy hover:bg-yellow/90"
            >
              Réserver mon appel découverte
            </Button>
          </motion.div>

          {/* Reassurances */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
            transition={{ duration: 0.5, delay: 0.4 }}
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
