import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SquiggleLine } from '../ui/HandDrawnIllustrations';

// Hand-drawn pillar icons
const BrainIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M24 8 C32 8 38 14 38 22 C38 30 32 36 24 40 C16 36 10 30 10 22 C10 14 16 8 24 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M17 20 Q21 16 24 20 Q27 24 31 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M17 28 Q21 24 24 28 Q27 32 31 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="18" cy="16" r="2" fill="currentColor" />
    <circle cx="30" cy="16" r="2" fill="currentColor" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <rect x="8" y="14" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
    <path d="M8 22 L40 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="34" cy="28" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 10 L36 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M24 6 L38 12 L38 24 C38 34 24 42 24 42 C24 42 10 34 10 24 L10 12 L24 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 24 L22 28 L30 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const pillars = [
  {
    icon: BrainIcon,
    title: "Penser avant d'utiliser",
    description:
      "Une approche structurée pour évaluer, choisir et adapter les outils IA à chaque contexte d'enseignement.",
    color: 'sage',
  },
  {
    icon: WalletIcon,
    title: 'Gratuit ou presque',
    description:
      'Google AI Studio, transcription en 30 secondes, synthèse vocale pro — des outils puissants à 0€/mois.',
    color: 'yellow',
  },
  {
    icon: ShieldIcon,
    title: 'Pas de dépendance',
    description:
      "Vos formateurs apprennent à s'adapter, pas à suivre un mode d'emploi qui sera obsolète dans 6 mois.",
    color: 'rust',
  },
];


export function Approach() {
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
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
    },
  };

  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden paper-texture relative">
      {/* Decorative elements */}
      <div className="absolute top-32 right-8 w-24 opacity-10 rotate-12" aria-hidden="true">
        <SquiggleLine className="text-sage" />
      </div>

      <Container>
        <SectionTitle>
          {"On n'enseigne pas un outil."}
          <br />
          <span className="text-sage">{"On enseigne à penser l'IA."}</span>
        </SectionTitle>

        {/* Big Quote Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative">
            {/* Decorative quote marks */}
            <div className="absolute -top-6 -left-4 text-yellow/30 font-display text-8xl leading-none" aria-hidden="true">"</div>
            <div className="absolute -bottom-10 -right-4 text-yellow/30 font-display text-8xl leading-none rotate-180" aria-hidden="true">"</div>

            <blockquote className="relative bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 lg:p-12 text-center" style={{ borderRadius: '24px 18px 28px 16px' }}>
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow via-rust to-sage opacity-20 blur-xl" style={{ borderRadius: '24px 18px 28px 16px' }} aria-hidden="true" />

              <p className="relative text-2xl lg:text-3xl font-display font-bold text-cream leading-relaxed">
                L'IA comme{' '}
                <span className="relative inline-block">
                  <span className="text-yellow">assistant</span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M0,4 Q25,0 50,4 T100,4" fill="none" stroke="#f1d263" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                , pas comme{' '}
                <span className="relative inline-block">
                  <span className="text-cream/60 line-through decoration-rust/60">remplaçant</span>
                </span>
                .
              </p>
            </blockquote>
          </div>
        </motion.div>

        {/* Main text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <motion.p variants={fadeInUp} className="text-lg text-navy-light mb-6">
            La plupart des formations IA vous apprennent à utiliser ChatGPT.
            <br />
            {"Problème : quand ChatGPT change (ou qu'un meilleur outil arrive), vous repartez de zéro."}
          </motion.p>

          <motion.p variants={fadeInUp} className="text-xl text-navy font-medium">
            {"TeachInspire enseigne une "}
            <span className="relative inline-block">
              <span className="relative z-10">méthode transférable</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-yellow"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,4 Q50,0 100,4 T200,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
            <br />
            {"Vos formateurs deviennent "}
            <span className="text-sage">autonomes</span> — pas utilisateurs captifs.
          </motion.p>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const colorClasses = {
              sage: 'border-sage/30 text-sage',
              yellow: 'border-yellow/50 text-yellow',
              rust: 'border-rust/30 text-rust',
            };
            const iconBgClasses = {
              sage: 'bg-sage/15',
              yellow: 'bg-yellow/20',
              rust: 'bg-rust/15',
            };

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: prefersReducedMotion ? 0 : -4 }}
                className={`rounded-2xl p-6 border-2 ${colorClasses[pillar.color as keyof typeof colorClasses]} bg-white shadow-sm hover:shadow-lg transition-shadow`}
                style={{ borderRadius: '20px 14px 22px 12px' }}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${iconBgClasses[pillar.color as keyof typeof iconBgClasses]} flex items-center justify-center mb-4`}
                  style={{ borderRadius: '14px 10px 16px 8px' }}
                >
                  <div className={`w-8 h-8 ${colorClasses[pillar.color as keyof typeof colorClasses].split(' ').pop()}`}>
                    <Icon />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-navy mb-3">{pillar.title}</h3>
                <p className="text-navy-light leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center mt-12"
        >
          <HandDrawnButton variant="secondary" size="lg" href="/formation">
            Voir le programme détaillé
          </HandDrawnButton>
        </motion.div>
      </Container>
    </section>
  );
}
