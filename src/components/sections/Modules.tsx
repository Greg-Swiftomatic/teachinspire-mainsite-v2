import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Badge } from '../ui/Badge';
import { TiltCard } from '../ui/MagicCard';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn icons for each module - growth metaphor (seed → sprout → bloom)
const SeedIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <ellipse cx="24" cy="30" rx="10" ry="6" stroke="currentColor" strokeWidth="2.5" />
    <path d="M24 24 L24 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 18 Q24 12 28 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="30" r="3" fill="currentColor" opacity="0.3" />
  </svg>
);

const SproutIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M24 40 L24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 24 Q16 20 14 12 Q22 14 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M24 28 Q32 24 34 16 Q26 18 24 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M20 40 L28 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BloomIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M24 42 L24 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="24" cy="20" r="3" fill="currentColor" />
    <path d="M24 8 L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 14 L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 14 L30 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 42 L28 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 32 Q24 26 30 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const modules = [
  {
    number: 1,
    period: 'Mois 1',
    title: 'Panorama des Outils IA',
    description:
      "Se familiariser avec les briques essentielles : modèles de langage, transcription automatique, synthèse vocale. Comprendre ce que chaque type d'outil permet de créer.",
    icon: SeedIcon,
    color: 'yellow',
  },
  {
    number: 2,
    period: 'Mois 2',
    title: 'Prompt Engineering',
    description:
      "Apprendre à formuler des instructions claires pour obtenir des résultats précis et exploitables. La clé pour transformer n'importe quel contenu.",
    icon: SproutIcon,
    color: 'sage',
  },
  {
    number: 3,
    period: 'Mois 3',
    title: 'Workflows Complets',
    description:
      "Partir d'une ressource authentique (vidéo, podcast, article) et en faire une séquence pédagogique complète et imprimable.",
    icon: BloomIcon,
    color: 'rust',
  },
];

export function Modules() {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, rotateX: prefersReducedMotion ? 0 : -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: prefersReducedMotion ? 1 : 0 },
    visible: {
      scaleX: 1,
      transition: { duration: prefersReducedMotion ? 0.01 : 1, ease: [0.16, 1, 0.3, 1] as const, delay: prefersReducedMotion ? 0 : 0.3 },
    },
  };
  const colorClasses = {
    yellow: { bg: 'bg-yellow/20', text: 'text-yellow', border: 'border-yellow/40', badgeBg: 'bg-yellow' },
    sage: { bg: 'bg-sage/20', text: 'text-sage', border: 'border-sage/40', badgeBg: 'bg-sage' },
    rust: { bg: 'bg-rust/20', text: 'text-rust', border: 'border-rust/40', badgeBg: 'bg-rust' },
  };

  return (
    <section className="bg-white py-16 lg:py-24 paper-texture relative">
      <Container>
        <SectionTitle subtitle="Cadence recommandée : 3 mois. Adaptable selon vos contraintes.">
          Un parcours progressif en 3 étapes
        </SectionTitle>

        {/* Growth metaphor subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-navy-light mb-8 -mt-8"
        >
          De la graine à la floraison — votre équipe grandit étape par étape.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mt-12"
        >
          {/* Animated connection line (desktop only) - hand-drawn style */}
          <motion.svg
            className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-4 -translate-y-1/2 z-0"
            viewBox="0 0 800 16"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,8 Q100,2 200,8 T400,8 T600,8 T800,8"
              fill="none"
              stroke="url(#moduleGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 6"
              variants={lineVariants}
              style={{ originX: 0 }}
            />
            <defs>
              <linearGradient id="moduleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f1d263" />
                <stop offset="50%" stopColor="#85a2a3" />
                <stop offset="100%" stopColor="#B7553D" />
              </linearGradient>
            </defs>
          </motion.svg>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {modules.map((module) => {
              const Icon = module.icon;
              const colors = colorClasses[module.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={module.number}
                  variants={cardVariants}
                  className="relative"
                  style={{ perspective: 1000 }}
                >
                  {/* Animated number badge with hand-drawn shape */}
                  <motion.div
                    className={`absolute -top-4 left-6 w-12 h-12 ${colors.badgeBg} flex items-center justify-center font-bold text-navy shadow-lg z-20`}
                    style={{ borderRadius: '50% 45% 55% 48%' }}
                    initial={{ scale: prefersReducedMotion ? 1 : 0, rotate: prefersReducedMotion ? 0 : -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : {
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2 + module.number * 0.15,
                          }
                    }
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.1,
                            rotate: 5,
                          }
                    }
                  >
                    {module.number}
                  </motion.div>

                  <TiltCard className={`h-full bg-cream border-2 ${colors.border} p-6`} tiltAmount={6}>
                    <div className="pt-6">
                      {/* Icon */}
                      <div className={`w-14 h-14 ${colors.bg} flex items-center justify-center mb-4`} style={{ borderRadius: '16px 12px 18px 10px' }}>
                        <div className={`w-9 h-9 ${colors.text}`}>
                          <Icon />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={module.color === 'yellow' ? 'yellow' : module.color === 'sage' ? 'sage' : 'default'}>
                          Module {module.number}
                        </Badge>
                        <span className="text-sm text-navy-light">{module.period}</span>
                      </div>

                      <h3 className="text-xl font-semibold font-display text-navy mb-3">
                        {module.title}
                      </h3>

                      <p className="text-navy-light leading-relaxed">{module.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0.01 : 0.5 }}
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
