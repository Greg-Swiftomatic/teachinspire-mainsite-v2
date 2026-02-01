import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn calendar icon
const CalendarDoodle = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10 L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 3 L8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3 L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="14" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <circle cx="16" cy="14" r="1" fill="currentColor" />
  </svg>
);

// Hand-drawn checkmark icon
const CheckDoodle = () => (
  <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
    <path
      d="M4 10 Q6 8 8 12 Q12 6 16 4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Decorative elements
const Decorations = () => (
  <>
    {/* Top left decoration */}
    <svg
      className="absolute top-8 left-4 lg:left-12 w-16 h-16 text-yellow/20"
      viewBox="0 0 64 64"
      fill="none"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" />
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.5" />
    </svg>

    {/* Top right decoration */}
    <svg
      className="absolute top-12 right-4 lg:right-16 w-12 h-12 text-sage/30"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path d="M8 24 Q24 8 40 24 Q24 40 8 24" stroke="currentColor" strokeWidth="2" />
    </svg>

    {/* Bottom left decoration */}
    <svg
      className="absolute bottom-8 left-8 lg:left-20 w-10 h-10 text-rust/20"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path d="M20 4 L36 36 L4 36 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>

    {/* Bottom right decoration */}
    <svg
      className="absolute bottom-12 right-8 lg:right-24 w-8 h-8 text-yellow/30"
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="2" transform="rotate(15 16 16)" />
    </svg>
  </>
);

const reassurances = [
  { text: 'Gratuit', color: 'text-yellow' },
  { text: 'Sans engagement', color: 'text-sage' },
  { text: '15 minutes', color: 'text-rust-light' },
];

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-navy py-16 lg:py-24 overflow-hidden relative">
      {/* Decorative elements */}
      <Decorations />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          {/* Warm headline */}
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cream mb-6"
          >
            On en parle ?
          </motion.h2>

          {/* Warm subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0.01 : 0.5 }}
          >
            <p className="text-xl text-cream/90 mb-4">
              Un appel de 15 minutes pour voir si on peut vous aider.
            </p>
            <p className="text-cream/70 mb-8 max-w-xl mx-auto leading-relaxed">
              On échange sur vos besoins, votre contexte, vos questions.
              <span className="block mt-2 text-cream/50 italic">
                Pas de pitch commercial — juste une conversation.
              </span>
            </p>
          </motion.div>

          {/* CTA with calendar icon */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0.01 : 0.4 }}
            className="mb-10"
          >
            <HandDrawnButton
              variant="primary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            >
              <span className="w-5 h-5 mr-2">
                <CalendarDoodle />
              </span>
              Réserver mon appel découverte
            </HandDrawnButton>
          </motion.div>

          {/* Reassurance badges */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:gap-6"
          >
            {reassurances.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 text-cream/70 text-sm"
              >
                <span className={`w-4 h-4 ${item.color}`}>
                  <CheckDoodle />
                </span>
                {item.text}
              </span>
            ))}
          </motion.div>

          {/* Email alternative */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="text-cream/40 text-sm mt-8"
          >
            Ou écrivez-nous directement :{' '}
            <a
              href="mailto:greg@teachinspire.me"
              className="text-cream/60 hover:text-yellow transition-colors underline underline-offset-2"
            >
              greg@teachinspire.me
            </a>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
