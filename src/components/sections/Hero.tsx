/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Homepage Hero
 *
 * Read top-to-bottom. Each `at` value is ms after mount.
 *
 *    0ms   Grid overlay visible (static)
 *  120ms   Category label slides from left
 *  180ms   Decorative "01" materializes
 *  240ms   Headline fades in with restrained editorial motion
 *  460ms   Rust accent line fades in
 *  620ms   Subheadline fades up
 *  780ms   CTA buttons slide up (staggered 100ms)
 *  920ms   Video player enters from right
 * ───────────────────────────────────────────────────────── */

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { HERO_VIDEO_EMBED, HERO_VIDEO_POSTER } from '../../assets/assets';

/* ── Timing ─────────────────────────────────────────────── */
const TIMING = {
  grid:       0,      // squares background immediate
  label:      120,    // category label slides in
  number:     180,    // decorative "01" fades
  headline:   240,    // headline begins
  accent:     460,    // rust accent headline
  sub:        620,    // subheadline fades up
  ctas:       780,    // buttons slide up
  card:       920,    // info card enters
};

/* ── Element Configs ────────────────────────────────────── */
const LABEL = {
  offsetX: -20,       // px slide from left
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

const NUMBER = {
  initialOpacity: 0,
  finalOpacity: 1,
  spring: { type: 'spring' as const, stiffness: 200, damping: 25 },
};

const SUB = {
  offsetY: 15,        // px slide up from
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

const CTAS = {
  offsetY: 20,        // px slide up from
  stagger: 0.1,       // seconds between buttons
  spring: { type: 'spring' as const, stiffness: 350, damping: 28 },
};

const VIDEO = {
  offsetX: 40,        // px slide from right
  spring: { type: 'spring' as const, stiffness: 250, damping: 28 },
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ── Component ──────────────────────────────────────────── */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [stage, setStage] = useState(() => (prefersReducedMotion ? 8 : 0));
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      const reducedMotionFrame = window.requestAnimationFrame(() => setStage(8));
      return () => window.cancelAnimationFrame(reducedMotionFrame);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage(0), 0));

    timers.push(setTimeout(() => setStage(1), TIMING.label));
    timers.push(setTimeout(() => setStage(2), TIMING.number));
    timers.push(setTimeout(() => setStage(3), TIMING.headline));
    timers.push(setTimeout(() => setStage(4), TIMING.accent));
    timers.push(setTimeout(() => setStage(5), TIMING.sub));
    timers.push(setTimeout(() => setStage(6), TIMING.ctas));
    timers.push(setTimeout(() => setStage(7), TIMING.card));

    return () => timers.forEach(clearTimeout);
  }, [isInView, prefersReducedMotion]);

  return (
    <section ref={ref} className="bg-cream min-h-[90vh] relative overflow-hidden">
      <GridOverlay />

      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-center py-24">
          {/* Left column — main content */}
          <div className="lg:col-span-6">
            {/* Category label */}
            <motion.div
              initial={{ opacity: 0, x: LABEL.offsetX }}
              animate={{
                opacity: stage >= 1 ? 1 : 0,
                x: stage >= 1 ? 0 : LABEL.offsetX,
              }}
              transition={LABEL.spring}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-12 h-px bg-rust" />
              <span className="text-rust font-medium text-sm tracking-wide">
                Formation IA · Instituts de langues
              </span>
            </motion.div>

            {/* Headline */}
            <div className="relative">
              {/* Large decorative number */}
              <motion.span
                initial={{ opacity: NUMBER.initialOpacity }}
                animate={{ opacity: stage >= 2 ? NUMBER.finalOpacity : NUMBER.initialOpacity }}
                transition={NUMBER.spring}
                className="absolute -left-4 -top-16 text-[12rem] font-display font-bold text-sage/10 leading-none select-none pointer-events-none hidden lg:block"
                aria-hidden="true"
              >
                01
              </motion.span>

              <div className="relative z-10">
                {stage >= 3 && (
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1]">
                    <motion.span
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: EASE_OUT }}
                      className="block text-navy"
                    >
                      Formez vos équipes à créer des cours IA
                    </motion.span>
                    {stage >= 4 && (
                      <motion.span
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: EASE_OUT }}
                        className="mt-1 block text-rust"
                      >
                        à partir de sources réelles
                      </motion.span>
                    )}
                  </h1>
                )}
                {stage < 3 && (
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-navy/0 leading-[1.1]" aria-hidden="true">
                    Formez vos équipes à créer des cours IA à partir de sources réelles
                  </h1>
                )}
              </div>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: SUB.offsetY }}
              animate={{
                opacity: stage >= 5 ? 1 : 0,
                y: stage >= 5 ? 0 : SUB.offsetY,
              }}
              transition={SUB.spring}
              className="text-xl text-navy-light mt-8 max-w-xl leading-relaxed"
            >
              À partir d'un podcast, d'un article ou d'un document métier, vos formateurs apprennent à produire une séquence exploitable, relue et adaptée avant la classe.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: SUB.offsetY }}
              animate={{
                opacity: stage >= 5 ? 1 : 0,
                y: stage >= 5 ? 0 : SUB.offsetY,
              }}
              transition={{ ...SUB.spring, delay: 0.05 }}
              className="mt-4 text-lg font-display font-semibold text-rust"
            >
              Le gain de temps reste sous contrôle pédagogique.
            </motion.p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <motion.div
                initial={{ opacity: 0, y: CTAS.offsetY }}
                animate={{
                  opacity: stage >= 6 ? 1 : 0,
                  y: stage >= 6 ? 0 : CTAS.offsetY,
                }}
                transition={{ ...CTAS.spring, delay: 0 }}
              >
                <Button variant="primary" size="lg" href="https://cal.com/teachinspire.me" showArrow>
                  Cadrer l'usage IA de mon équipe
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: CTAS.offsetY }}
                animate={{
                  opacity: stage >= 6 ? 1 : 0,
                  y: stage >= 6 ? 0 : CTAS.offsetY,
                }}
                transition={{ ...CTAS.spring, delay: CTAS.stagger }}
              >
                <Button variant="secondary" size="lg" href="#methode">
                  Voir la méthode
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right column — video showcase */}
          <motion.div
            initial={{ opacity: 0, x: VIDEO.offsetX }}
            animate={{
              opacity: stage >= 7 ? 1 : 0,
              x: stage >= 7 ? 0 : VIDEO.offsetX,
            }}
            transition={VIDEO.spring}
            className="lg:col-span-6"
          >
            <div className="relative border border-navy/10 overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-rust z-10" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-rust z-10" />

              {showPlayer ? (
                /* Cloudinary Video Player iframe — loaded on click */
                <iframe
                  src={`${HERO_VIDEO_EMBED}&player[autoplay]=true`}
                  className="w-full aspect-video"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  style={{ border: 0 }}
                  title="TeachInspire — présentation vidéo"
                />
              ) : (
                /* Thumbnail with play button — click to load player */
                <button
                  type="button"
                  className="relative group cursor-pointer w-full text-left"
                  onClick={() => setShowPlayer(true)}
                  aria-label="Lancer la vidéo de présentation"
                >
                  <img
                    src={HERO_VIDEO_POSTER}
                    alt="TeachInspire — présentation vidéo"
                    width={1920}
                    height={1080}
                    loading="eager"
                    decoding="async"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/5 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-yellow flex items-center justify-center group-hover:bg-yellow/90 transition-colors duration-150">
                      <svg className="w-5 h-5 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-navy/80 backdrop-blur-sm text-cream text-xs font-medium tracking-wide px-2.5 py-1 rounded-sm">
                      1:28
                    </span>
                  </div>
                </button>
              )}
            </div>
            <p className="text-xs text-navy-light/60 mt-4 tracking-wide uppercase">
              Découvrez TeachInspire en 90 secondes
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
