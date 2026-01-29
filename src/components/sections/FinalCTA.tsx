import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Calendar, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-navy py-16 lg:py-24 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cream mb-6">
            Prêt à former vos équipes ?
          </h2>

          {/* Subtext */}
          <p className="text-xl text-cream/80 mb-4">
            Réservez un appel découverte de 15 minutes.
          </p>
          <p className="text-cream/60 mb-8">
            On échange sur vos besoins, votre contexte, vos questions.
            <br />
            Pas de pitch commercial — juste une conversation.
          </p>

          {/* CTA */}
          <Button
            variant="primary"
            size="lg"
            href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            className="mb-8"
          >
            <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
            Réserver mon appel découverte
          </Button>

          {/* Reassurance */}
          <div className="flex items-center justify-center gap-6 text-cream/60 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-yellow" aria-hidden="true" />
              Gratuit
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-yellow" aria-hidden="true" />
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-yellow" aria-hidden="true" />
              15 minutes
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
