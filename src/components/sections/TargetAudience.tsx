import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { Check, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const forYou = [
  'Vous dirigez un institut de langues (10-50 formateurs)',
  'Vos formateurs créent leurs propres cours',
  'Vous formez des adultes professionnels',
  'Vous voulez rester compétitif face à la transformation du secteur',
  'Vous cherchez une solution structurée, pas des bricolages individuels',
];

const notForYou = [
  'Vos cours sont déjà packagés et standardisés',
  'Vous cherchez une solution "clé en main" sans implication',
  "Vous attendez que l'IA fasse le travail à la place des formateurs",
];

export function TargetAudience() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
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
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>{"Pour les instituts qui veulent prendre de l'avance"}</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* For you */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-sage/10 rounded-2xl p-6 border border-sage/20"
            >
              <h3 className="text-lg font-display font-bold text-navy mb-4">
                Cette formation est faite pour vous si :
              </h3>
              <ul className="space-y-3">
                {forYou.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-sage" aria-hidden="true" />
                    </span>
                    <span className="text-navy-light">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Not for you */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-navy/5 rounded-2xl p-6 border border-navy/10"
            >
              <h3 className="text-lg font-display font-bold text-navy mb-4">
                {"Ce n'est PAS pour vous si :"}
              </h3>
              <ul className="space-y-3">
                {notForYou.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-navy-light" aria-hidden="true" />
                    </span>
                    <span className="text-navy-light">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="text-center"
          >
            <p className="text-xl text-navy font-medium mb-6">Ça vous ressemble ?</p>
            <Button
              variant="primary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            >
              Parlons-en — 15 min, gratuit
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
