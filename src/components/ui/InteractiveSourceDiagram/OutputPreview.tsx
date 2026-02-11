import { motion, AnimatePresence } from 'framer-motion';
import type { SourceId } from './sourceConfigs';
import { sourceConfigs } from './sourceConfigs';

interface OutputPreviewProps {
  activeSource: SourceId | null;
  phase: 'idle' | 'selected' | 'processing' | 'output';
  prefersReducedMotion: boolean;
}

const springBounce = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
};

export function OutputPreview({
  activeSource,
  phase,
  prefersReducedMotion,
}: OutputPreviewProps) {
  const isRevealed = phase === 'output' && activeSource;
  const config = activeSource ? sourceConfigs[activeSource] : null;
  const dur = prefersReducedMotion ? 0.01 : 0.5;

  return (
    <div
      className="relative overflow-hidden min-h-[220px]"
      aria-live="polite"
      style={{
        background: 'linear-gradient(135deg, #2c3d57 0%, #34475f 50%, #2c3d57 100%)',
      }}
    >
      {/* Animated subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(241,210,99,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Glow effect — intensifies when output revealed */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(241,210,99,0.25) 0%, transparent 70%)',
          opacity: isRevealed ? 0.6 : 0.12,
          filter: isRevealed ? 'blur(30px)' : 'blur(40px)',
        }}
      />

      <div className="relative z-10 p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {isRevealed && config ? (
            <motion.div
              key={activeSource}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur * 0.6 }}
            >
              {/* Source-specific output icon */}
              <motion.div
                className="w-12 h-12 mb-4 flex items-center justify-center bg-yellow/15"
                initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={prefersReducedMotion ? { duration: 0.01 } : springBounce}
              >
                <OutputIcon />
              </motion.div>

              {/* Section label */}
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-cream/40 mb-2">
                R\u00e9sultat
              </p>

              {/* Title — masked text reveal */}
              <div className="overflow-hidden mb-5">
                <motion.h3
                  className="text-lg lg:text-xl font-display font-semibold text-cream leading-tight"
                  initial={prefersReducedMotion ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
                  }
                >
                  {config.output.title}
                </motion.h3>
              </div>

              {/* List items with accent bars */}
              <ul className="space-y-3">
                {config.output.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-cream/70"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : {
                            duration: 0.4,
                            delay: 0.2 + idx * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                  >
                    {/* Accent bar that draws on from left */}
                    <motion.span
                      className="mt-2 flex-shrink-0 h-[2px] bg-rust"
                      initial={prefersReducedMotion ? false : { width: 0 }}
                      animate={{ width: 20 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : {
                              duration: 0.4,
                              delay: 0.25 + idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }
                      }
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Quality badge — spring bounce */}
              <motion.div
                className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-yellow/15"
                initial={
                  prefersReducedMotion
                    ? false
                    : { scale: 0.85, opacity: 0, y: 6 }
                }
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { ...springBounce, delay: 0.45 }
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-yellow"
                >
                  <path
                    d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-xs font-medium text-yellow">
                  Qualit\u00e9 professionnelle
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur }}
            >
              {/* Default idle state */}
              <div className="w-16 h-16 mb-6 relative">
                <OutputIcon />
              </div>

              <p className="text-xs font-medium tracking-[0.15em] uppercase text-cream/40 mb-2">
                R\u00e9sultat
              </p>
              <h3 className="text-xl lg:text-2xl font-display font-semibold text-cream leading-tight mb-2">
                Un cours parfaitement adapt\u00e9
              </h3>
              <p className="text-sm text-cream/50 mb-4">
                Personnalis\u00e9 au profil de votre apprenant
              </p>

              <p className="text-xs text-cream/30 italic">
                Cliquez sur une source pour voir la transformation
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OutputIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path
        d="M12 16v36c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4H16c-2.2 0-4 1.8-4 4z"
        fill="#F4F3F0"
        stroke="#2c3d57"
        strokeWidth="2"
      />
      <path d="M20 12v44" stroke="#2c3d57" strokeWidth="2" />
      <path
        d="M26 24h20M26 32h20M26 40h12"
        stroke="#2c3d57"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M48 8l1.5 3.5L53 13l-3.5 1.5L48 18l-1.5-3.5L43 13l3.5-1.5L48 8z"
        fill="#f1d263"
      />
    </svg>
  );
}
