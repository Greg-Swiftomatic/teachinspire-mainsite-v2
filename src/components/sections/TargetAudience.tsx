import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn check icon
const CheckDoodle = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <path
      d="M4 12 Q8 8 10 14 Q14 6 20 4"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn X icon
const XDoodle = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <path d="M6 6 L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 6 L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

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
    <section className="bg-white py-16 lg:py-24 overflow-hidden paper-texture relative">
      <Container>
        <SectionTitle>Pour les instituts qui veulent prendre de l'avance</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* For you if */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-sage/10 border-2 border-sage/30 p-6 lg:p-8"
              style={{ borderRadius: '24px 18px 26px 16px' }}
            >
              <h3 className="text-xl font-display font-bold text-navy mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-sage/30 flex items-center justify-center" style={{ borderRadius: '10px 6px 12px 8px' }}>
                  <span className="w-5 h-5 text-sage">
                    <CheckDoodle />
                  </span>
                </span>
                Pour vous si...
              </h3>
              <ul className="space-y-4">
                {forYouIf.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 text-sage flex-shrink-0 mt-0.5">
                      <CheckDoodle />
                    </span>
                    <span className="text-navy-light">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Not for you if */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-navy/5 border-2 border-navy/10 p-6 lg:p-8"
              style={{ borderRadius: '18px 24px 16px 26px' }}
            >
              <h3 className="text-xl font-display font-bold text-navy mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-navy/10 flex items-center justify-center" style={{ borderRadius: '10px 6px 12px 8px' }}>
                  <span className="w-5 h-5 text-navy-light">
                    <XDoodle />
                  </span>
                </span>
                Pas pour vous si...
              </h3>
              <ul className="space-y-4">
                {notForYouIf.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 text-navy-light/60 flex-shrink-0 mt-0.5">
                      <XDoodle />
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
            transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="text-center"
          >
            <p className="text-xl text-navy font-medium mb-6">Ça vous ressemble ?</p>
            <HandDrawnButton
              variant="primary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
            >
              Parlons-en — 15 min, gratuit
            </HandDrawnButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
