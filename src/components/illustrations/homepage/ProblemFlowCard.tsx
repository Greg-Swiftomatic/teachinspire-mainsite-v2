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
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

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
      <div className="relative bg-navy rounded-sm overflow-hidden">
        {/* top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-cream/10" aria-hidden="true" />
        {/* subtle editorial vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 40% at 100% 0%, rgba(248,247,242,0.9), transparent 60%)',
          }}
        />

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
            className="font-display text-[1.75rem] sm:text-[2rem] leading-[1.1] text-cream font-semibold"
          >
            IA partout.
            <br />
            <span className="italic font-normal text-cream/85">Et ensuite&nbsp;?</span>
          </motion.h3>

          {/* LOOP AREA — 4 questions only */}
          <div className="relative mt-8">
            {/* reserve right gutter for loop arrow */}
            <div className="pr-[76px] sm:pr-[104px]">
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 sm:gap-x-4">
                {/* entry pill */}
                <motion.div
                  {...reveal(0.15)}
                  className="relative mt-1 px-3 py-2 bg-cream text-navy text-[11px] sm:text-sm font-medium whitespace-nowrap rounded-sm"
                >
                  IA partout
                  <span
                    aria-hidden="true"
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-1 h-px w-3 bg-cream/40"
                  />
                </motion.div>

                {/* vertical flow of questions */}
                <div className="flex flex-col gap-0">
                  {steps.map((label, i) => (
                    <FlowStep
                      key={label}
                      label={label}
                      index={i}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ))}
                </div>
              </div>
            </div>

            <LoopArrow prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* ESCAPE — rust arrow breaking out to Méthode */}
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
            whileInView={
              prefersReducedMotion ? undefined : { scaleY: 1, opacity: 1 }
            }
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.45, delay: 1.1, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="mx-auto mt-5 flex flex-col items-center"
          >
            <span className="block h-6 w-px bg-rust" />
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="#B7553D"
              aria-hidden="true"
              className="-mt-px"
            >
              <path d="M0 0 L10 0 L5 6 z" />
            </svg>
          </motion.div>

          {/* SOLUTION — Méthode TeachInspire */}
          <motion.div
            {...reveal(1.25)}
            className="relative mx-auto mt-3 w-fit"
          >
            <div className="relative px-4 py-2.5 text-[11px] sm:text-sm font-semibold text-center rounded-sm bg-[#f7e9c5] text-rust border border-rust/30 tracking-wide">
              Méthode TeachInspire
            </div>
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-rust/40"
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.08, 1.14],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: 1.7,
                  ease: 'easeOut',
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Connector({
  delay,
  prefersReducedMotion,
}: {
  delay: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="mx-auto block h-3 w-px bg-cream/30"
      style={{ transformOrigin: 'top' }}
      initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
      whileInView={prefersReducedMotion ? undefined : { scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.28, delay, ease: 'easeOut' }}
    />
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
    <>
      {index > 0 && (
        <Connector
          delay={pillDelay - 0.04}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
      <motion.div
        {...pillAnim}
        className="relative px-3 py-2 bg-cream text-navy text-[11px] sm:text-sm font-medium text-center rounded-sm leading-snug"
      >
        {label}
      </motion.div>
    </>
  );
}

function LoopArrow({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[76px] sm:w-[104px]">
      <svg
        viewBox="0 0 100 260"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="pfc-arrow-head"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#B7553D" />
          </marker>
        </defs>
        {/* D-shaped loop: bottom of last question → up → top of first question */}
        <motion.path
          d="M 4 238 L 58 238 Q 88 238 88 210 L 88 46 Q 88 18 58 18 L 12 18"
          stroke="#B7553D"
          strokeWidth="1.75"
          strokeLinecap="round"
          markerEnd="url(#pfc-arrow-head)"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={
            prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }
          }
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.6, delay: 0.7, ease: EASE_IN_OUT }}
        />
      </svg>

      {/* center label inside the loop */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
        className="absolute inset-y-0 left-0 right-0 flex flex-col items-center justify-center gap-1.5"
      >
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B7553D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { rotate: [0, -360] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 4v5h-5" />
        </motion.svg>
        <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.12em] uppercase text-center leading-[1.3] text-cream/70">
          On<br />recommence
        </span>
      </motion.div>
    </div>
  );
}
