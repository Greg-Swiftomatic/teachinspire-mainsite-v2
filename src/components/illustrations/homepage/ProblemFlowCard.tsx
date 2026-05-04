import { motion } from 'framer-motion';

interface ProblemFlowCardProps {
  className?: string;
  prefersReducedMotion?: boolean;
}

const steps = [
  'Quel outil choisir\u00a0?',
  'Comment lui parler\u00a0?',
  "Comment l'adapter aux élèves\u00a0?",
  'Comment en faire un cours\u00a0?',
];

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

export function ProblemFlowCard({
  className = '',
  prefersReducedMotion = false,
}: ProblemFlowCardProps) {
  const reveal = (delay: number) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-10%' },
          transition: { duration: 0.55, delay, ease: EASE_OUT_QUART },
        };

  return (
    <div
      className={`relative mt-10 w-full max-w-[520px] ${className}`}
      role="img"
      aria-label="Sans méthode, les formateurs tournent en boucle entre outils, prompts et adaptation. La méthode TeachInspire est la sortie."
    >
      <div className="relative overflow-hidden rounded-sm border border-navy/10 bg-cream">
        {/* top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-navy/10" aria-hidden="true" />

        <div className="relative px-6 pt-8 pb-9 sm:px-9 sm:pt-10 sm:pb-11">
          {/* eyebrow */}
          <motion.div {...reveal(0)} className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-rust" />
            <span className="text-[10px] font-sans font-medium tracking-[0.28em] uppercase text-rust">
              Sans méthode
            </span>
          </motion.div>

          {/* title */}
          <motion.h3
            {...reveal(0.05)}
            className="font-display text-[1.75rem] sm:text-[2rem] leading-[1.1] text-navy font-semibold"
          >
            Beaucoup d'IA.
            <br />
            <span className="italic font-normal text-rust">Pas assez de méthode.</span>
          </motion.h3>

          {/* METHOD CONTRAST — 4 questions resolved by a method */}
          <div className="relative mt-8">
            <div className="grid gap-3">
              {steps.map((label, i) => (
                <FlowStep
                  key={label}
                  label={label}
                  index={i}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>

            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
              whileInView={
                prefersReducedMotion ? undefined : { scaleX: 1, opacity: 1 }
              }
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE_OUT_QUART }}
              style={{ transformOrigin: 'left' }}
              className="my-6 h-px bg-rust"
            />

            <motion.div
              {...reveal(0.65)}
              className="grid gap-3 border-l-2 border-rust pl-4"
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-rust">
                  Avec méthode
                </p>
                <p className="mt-2 font-display text-xl font-semibold leading-tight text-navy">
                  Chaque choix est cadré par un objectif pédagogique.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-px bg-navy/10 text-center">
                {['Déléguer', 'Contrôler', 'Valider'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{
                      duration: 0.35,
                      delay: 0.75 + index * 0.06,
                      ease: EASE_OUT_QUART,
                    }}
                    className="bg-white px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowStep({
  label,
  index,
  prefersReducedMotion,
}: {
  label: string;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const pillDelay = 0.22 + index * 0.1;
  const pillAnim = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10%' },
        transition: { duration: 0.5, delay: pillDelay, ease: EASE_OUT_QUART },
      };

  return (
    <motion.div
      {...pillAnim}
      className="grid grid-cols-[2.5rem_1fr] items-center border border-navy/10 bg-white"
    >
      <span className="border-r border-navy/10 py-3 text-center font-display text-lg font-semibold text-navy/20">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="px-3 py-3 text-[11px] font-medium leading-snug text-navy sm:text-sm">
        {label}
      </span>
    </motion.div>
  );
}
