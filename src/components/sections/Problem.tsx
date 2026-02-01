import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn doodle icons for each risk
const DependencyIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M12 24 L24 24 M24 24 L36 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
    <path d="M8 16 Q12 20 8 24 Q12 28 8 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M40 16 Q36 20 40 24 Q36 28 40 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const AdaptIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M24 8 L24 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 34 L24 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 24 Q17 18 24 24 T38 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="10" cy="24" r="3" fill="currentColor" />
    <circle cx="38" cy="24" r="3" fill="currentColor" />
    <path d="M36 20 L40 24 L36 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const OutpacedIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <circle cx="16" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
    <circle cx="34" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path d="M34 18 L38 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 30 L38 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 34 L12 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const risks = [
  {
    icon: DependencyIcon,
    text: "Dépendants d'outils qu'ils ne maîtrisent pas",
    color: 'text-rust',
  },
  {
    icon: AdaptIcon,
    text: "Incapables de s'adapter quand l'outil change",
    color: 'text-sage',
  },
  {
    icon: OutpacedIcon,
    text: 'Dépassés par ceux qui ont compris la méthode',
    color: 'text-navy',
  },
];

export function Problem() {
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

  const getTransition = (delay: number) => ({
    delay: prefersReducedMotion ? 0 : delay,
    duration: prefersReducedMotion ? 0.01 : 0.5,
  });

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden paper-texture relative">
      <Container>
        <SectionTitle>
          {"Vos formateurs entendent parler d'IA partout."}
          <br />
          <span className="text-sage">Et après ?</span>
        </SectionTitle>

        {/* Main text content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto mb-12"
        >
          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy-light mb-6"
          >
            Certains bricolent avec ChatGPT — résultats aléatoires.
            <br />
            D'autres attendent, sceptiques ou débordés.
            <br />
            {"Pendant ce temps, d'autres instituts forment déjà leurs équipes."}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy font-medium mb-8"
          >
            {"Le vrai risque ? Ce n'est pas que l'IA remplace vos formateurs."}
            <br />
            {"C'est qu'ils se retrouvent "}
            <span className="relative inline-block">
              <span className="relative z-10">largués</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow/40 -z-0" aria-hidden="true"></span>
            </span>
            {" — pendant que d'autres prennent de l'avance."}
          </motion.p>
        </motion.div>

        {/* Three risks */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0.2)}
          className="max-w-3xl mx-auto mb-10"
        >
          <p className="text-navy font-semibold text-lg mb-6 text-center">
            Trois scénarios à éviter :
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {risks.map((risk, idx) => {
              const Icon = risk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={getTransition(0.3 + idx * 0.1)}
                  className="bg-cream rounded-2xl p-6 text-center border border-navy/5 hover:border-navy/10 transition-colors"
                  style={{ borderRadius: '20px 16px 24px 14px' }}
                >
                  <div className={`w-14 h-14 mx-auto mb-4 ${risk.color}`}>
                    <Icon />
                  </div>
                  <p className="text-sm text-navy-light leading-relaxed">{risk.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={getTransition(0.4)}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow/20 via-sage/10 to-yellow/20 rounded-2xl blur-xl opacity-60" aria-hidden="true" />
            <div className="relative bg-navy text-cream rounded-2xl p-8 text-center">
              <p className="text-xl font-display font-medium mb-2">
                {"L'IA évolue vite. Les outils d'aujourd'hui seront obsolètes demain."}
              </p>
              <p className="text-cream/80">
                {"Ce qui reste ? La capacité à "}
                <span className="text-yellow font-semibold">{"penser l'IA"}</span>.
              </p>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
