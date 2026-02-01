import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn icons for each step
const PhoneIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <rect x="14" y="6" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="24" cy="36" r="2" fill="currentColor" />
    <path d="M18 10 L30 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <rect x="6" y="12" width="26" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
    <path d="M32 20 L42 14 L42 34 L32 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <path d="M24 6 C16 6 10 12 10 20 C10 26 14 30 18 34 L18 38 L30 38 L30 34 C34 30 38 26 38 20 C38 12 32 6 24 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 42 L30 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 24 Q24 20 28 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
    <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="34" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M6 40 Q6 30 18 30 Q30 30 30 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 36 Q28 28 34 28 Q42 28 42 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const steps = [
  {
    number: '01',
    icon: PhoneIcon,
    title: 'Appel découverte',
    description: 'On échange sur vos besoins, votre contexte, vos objectifs. Pas de pitch commercial — juste une conversation.',
    duration: '15 min, gratuit',
    color: 'yellow',
  },
  {
    number: '02',
    icon: VideoIcon,
    title: 'Formation hybride',
    description: 'Modules vidéo (20 min chacun) + sessions live. Vos formateurs avancent à leur rythme, avec un point régulier.',
    duration: '12 semaines',
    color: 'sage',
  },
  {
    number: '03',
    icon: LightbulbIcon,
    title: 'Mise en pratique',
    description: 'Pas de théorie abstraite. Chaque module se termine par une application concrète avec leurs vrais apprenants.',
    duration: null,
    color: 'rust',
  },
  {
    number: '04',
    icon: UsersIcon,
    title: 'Communauté',
    description: 'Accès à la communauté TeachInspire pendant 1 an. Questions, mises à jour sur les outils, entraide entre instituts.',
    duration: null,
    color: 'navy',
  },
];

// Animated connecting path component
function AnimatedPath({ isInView, prefersReducedMotion }: { isInView: boolean; prefersReducedMotion: boolean }) {
  return (
    <svg
      className="absolute left-6 top-16 w-1 h-20 hidden md:block"
      viewBox="0 0 4 80"
      fill="none"
    >
      <motion.path
        d="M2,0 Q0,20 2,40 Q4,60 2,80"
        stroke="#85a2a3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 1, ease: 'easeOut' }}
      />
    </svg>
  );
}

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  const colorClasses = {
    yellow: { bg: 'bg-yellow/20', text: 'text-yellow', border: 'border-yellow/30' },
    sage: { bg: 'bg-sage/20', text: 'text-sage', border: 'border-sage/30' },
    rust: { bg: 'bg-rust/20', text: 'text-rust', border: 'border-rust/30' },
    navy: { bg: 'bg-navy/10', text: 'text-navy', border: 'border-navy/20' },
  };

  return (
    <section ref={sectionRef} className="bg-cream py-16 lg:py-24 overflow-hidden paper-texture relative">
      <Container>
        <SectionTitle>Un parcours structuré pour vos équipes</SectionTitle>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto mb-12"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            const colors = colorClasses[step.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="relative"
              >
                {/* Animated connecting path */}
                {!isLast && (
                  <AnimatedPath isInView={isInView} prefersReducedMotion={prefersReducedMotion} />
                )}

                <div className="flex gap-6 mb-8">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 bg-navy text-cream flex items-center justify-center font-display font-bold text-lg"
                      style={{ borderRadius: '14px 10px 16px 8px' }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
                    className={`bg-white rounded-2xl p-6 flex-1 border-2 ${colors.border} shadow-sm hover:shadow-md transition-shadow`}
                    style={{ borderRadius: '20px 14px 22px 12px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${colors.bg} flex items-center justify-center flex-shrink-0`}
                        style={{ borderRadius: '14px 10px 16px 8px' }}
                      >
                        <div className={`w-7 h-7 ${colors.text}`}>
                          <Icon />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-navy mb-2">
                          {step.title}
                        </h3>
                        <p className="text-navy-light leading-relaxed">{step.description}</p>
                        {step.duration && (
                          <p className="text-sm text-sage mt-2 font-medium">{step.duration}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Format note */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-xl p-6 border border-navy/10">
            <p className="text-navy font-medium mb-2">
              Format groupe (10-25 formateurs) pour que toute l'équipe avance ensemble.
            </p>
            <p className="text-navy-light text-sm">
              Espace dédié pour votre institut dans la communauté.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
