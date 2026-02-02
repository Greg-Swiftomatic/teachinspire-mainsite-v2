import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const forYouIf = [
  'Vous dirigez un institut de langues (10-50 formateurs)',
  'Vos formateurs créent leurs propres cours',
  'Vous formez des adultes professionnels',
  'Vous voulez rester compétitif face à la transformation du secteur',
  'Vous cherchez une solution structurée, pas des bricolages individuels',
];

const notForYouIf = [
  'Vos cours sont déjà packagés et standardisés',
  'Vous cherchez une solution "clé en main" sans implication',
  "Vous attendez que l'IA fasse le travail à la place des formateurs",
];

export function TargetAudience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-navy"
            style={{ left: `${(i + 1) * (100 / 12)}%` }}
          />
        ))}
      </div>

      <Container>
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-rust" />
            <span className="text-rust font-medium text-sm tracking-wide uppercase">
              Pour qui ?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
          >
            Pour les instituts qui veulent
            <span className="block text-rust mt-2">prendre de l'avance</span>
          </motion.h2>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-px bg-navy/10 mb-16">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 lg:p-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 bg-sage/20 flex items-center justify-center text-sage font-bold">
                ✓
              </span>
              <h3 className="text-xl font-display font-bold text-navy">
                Pour vous si...
              </h3>
            </div>

            <ul className="space-y-4">
              {forYouIf.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-sage mt-1">→</span>
                  <span className="text-navy-light">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-cream p-8 lg:p-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 bg-navy/10 flex items-center justify-center text-navy/50 font-bold">
                ✕
              </span>
              <h3 className="text-xl font-display font-bold text-navy">
                Pas pour vous si...
              </h3>
            </div>

            <ul className="space-y-4">
              {notForYouIf.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-navy/30 mt-1">→</span>
                  <span className="text-navy-light">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <p className="text-xl text-navy font-medium">Ça vous ressemble ?</p>
          <Button
            variant="primary"
            size="lg"
            href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            showArrow
          >
            Parlons-en — 15 min, gratuit
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
