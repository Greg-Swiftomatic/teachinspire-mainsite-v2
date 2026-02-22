import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Check,
  FileText,
  Layers,
  Link as LinkIcon,
  LoaderCircle,
  MessageSquare,
  Podcast,
  Youtube,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Container } from '../layout/Container';

const LETTERPRESS = { textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)' } as const;
const PAPER_NOISE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')";

export function Possibility() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  const drawPath = (delay: number) => ({
    initial: prefersReducedMotion ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 0.4 },
    viewport: { once: true, amount: 0.8 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 1.5, delay, ease: 'easeInOut' as const },
  });

  const revealArrowHead = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 6 },
    whileInView: { opacity: 0.6, y: 0 },
    viewport: { once: true, amount: 0.8 },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay },
  });

  return (
    <section className="relative overflow-hidden bg-[#f5f1ed] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: PAPER_NOISE }}
        />
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-white/50 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-[#e8cdae]/30 blur-[120px]" />
      </div>

      <Container size="wide" className="relative z-10 max-w-[1440px]">
        <motion.div className="mx-auto mb-16 max-w-3xl text-center lg:mb-24" {...reveal(0.1)}>
          <span
            className="mb-8 inline-block rounded-full border border-white/40 bg-[#f5f1ed] px-6 py-2 text-sm font-bold uppercase tracking-[0.2em] text-rust shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]"
            style={LETTERPRESS}
          >
            La Méthode TeachInspire
          </span>
          <h2
            className="mb-6 text-[clamp(2rem,5vw,3rem)] font-display font-bold leading-[1.2] text-navy"
            style={LETTERPRESS}
          >
            De la source au{' '}
            <span className="relative inline-block text-rust">
              cours complet
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full opacity-40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,5 Q50,9 100,2" fill="none" stroke="#b7553d" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>{' '}
            en quelques secondes.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#788293]" style={LETTERPRESS}>
            Ne dépendez plus d&apos;un outil aveugle. Notre approche vous apprend à orchestrer l&apos;IA
            pour extraire la valeur pédagogique de n&apos;importe quel contenu brut.
          </p>
        </motion.div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-stretch justify-between gap-8 lg:flex-row">
          <motion.article
            className="group relative flex flex-1 flex-col rounded-[24px] border border-white/60 bg-[#faf8f5] p-8 shadow-[12px_12px_24px_#d9d4d0,-12px_-12px_24px_#ffffff] transition-all duration-500 hover:-translate-y-2 hover:shadow-[16px_16px_32px_#d0ccc9,-16px_-16px_32px_#ffffff]"
            {...reveal(0.25)}
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-[#faf8f5] text-navy shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-colors duration-500 group-hover:text-yellow">
                <Podcast className="h-6 w-6" />
              </div>
              <div className="relative flex h-14 w-14 rotate-[6deg] items-center justify-center rounded-full bg-yellow font-display text-2xl font-bold text-navy shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-transform duration-500 group-hover:rotate-0">
                <div className="absolute inset-1 flex items-center justify-center rounded-full border border-black/5 shadow-[inset_2px_2px_4px_rgba(180,140,40,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]">
                  <span style={LETTERPRESS}>01</span>
                </div>
              </div>
            </div>

            <div className="mb-8 flex-1">
              <h3 className="mb-3 text-xl font-display font-bold text-navy" style={LETTERPRESS}>
                Source Unique
              </h3>
              <p className="text-base leading-relaxed text-[#788293]" style={LETTERPRESS}>
                Commencez avec la matière première idéale pour vos apprenants : une vidéo YouTube
                pertinente, un article d&apos;actualité, ou un épisode de podcast.
              </p>
            </div>

            <div className="relative mt-auto overflow-hidden rounded-xl border border-white/40 bg-[#f5f1ed] p-4 shadow-[inset_4px_4px_8px_#d9d4d0,inset_-4px_-4px_8px_#ffffff]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#faf8f5] shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff]">
                  <Youtube className="h-4 w-4 text-[#e23f3f]" />
                </div>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e8e4e0] p-[1px] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]">
                  <div className="h-full w-1/3 rounded-full bg-yellow shadow-[1px_1px_2px_rgba(0,0,0,0.15)]" />
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/50 bg-[#faf8f5] px-3 py-2 text-sm text-[#788293] shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff]">
                <LinkIcon className="h-4 w-4 text-navy" />
                <span className="truncate">youtube.com/watch?v=apprendre...</span>
              </div>
            </div>
          </motion.article>

          <div className="absolute left-[32%] top-[45%] z-20 hidden w-[6%] -translate-y-1/2 items-center justify-center lg:flex">
            <svg className="h-12 w-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <motion.path
                d="M0,15 Q45,20 90,15"
                fill="none"
                stroke="#b7553d"
                strokeWidth="2.5"
                strokeDasharray="6,8,4,6"
                strokeLinecap="round"
                {...drawPath(0.75)}
              />
              <motion.path
                d="M86,9 Q91,15 86,21"
                fill="none"
                stroke="#b7553d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...revealArrowHead(1.15)}
              />
            </svg>
          </div>

          <motion.article
            className="group relative flex flex-1 flex-col rounded-[24px] border border-white/60 bg-[#faf8f5] p-8 shadow-[12px_12px_24px_#d9d4d0,-12px_-12px_24px_#ffffff] transition-all duration-500 hover:-translate-y-2 hover:shadow-[16px_16px_32px_#d0ccc9,-16px_-16px_32px_#ffffff]"
            {...reveal(0.4)}
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-[#faf8f5] text-navy shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-colors duration-500 group-hover:text-rust">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div className="relative flex h-14 w-14 rotate-[-6deg] items-center justify-center rounded-full bg-rust font-display text-2xl font-bold text-[#faf8f5] shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-transform duration-500 group-hover:rotate-0">
                <div className="absolute inset-1 flex items-center justify-center rounded-full border border-black/10 shadow-[inset_2px_2px_4px_rgba(100,30,20,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.2)]">
                  <span className="drop-shadow-sm">02</span>
                </div>
              </div>
            </div>

            <div className="mb-8 flex-1">
              <h3 className="mb-3 text-xl font-display font-bold text-navy" style={LETTERPRESS}>
                Traitement IA Ciblé
              </h3>
              <p className="text-base leading-relaxed text-[#788293]" style={LETTERPRESS}>
                Appliquez notre méthode. L&apos;IA ne crée pas au hasard, elle analyse la transcription
                pour extraire le vocabulaire clé, la grammaire en contexte et les thèmes de discussion.
              </p>
            </div>

            <div className="relative mt-auto overflow-hidden rounded-xl border border-white/40 bg-[#f5f1ed] p-4 font-mono text-[12px] text-[#788293] shadow-[inset_4px_4px_8px_#d9d4d0,inset_-4px_-4px_8px_#ffffff]">
              {!prefersReducedMotion && (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 h-[30%] bg-gradient-to-b from-transparent via-rust/5 to-transparent"
                  initial={{ y: '-100%' }}
                  whileInView={{ y: '200%' }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              )}

              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#faf8f5] shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff]">
                    <Check className="h-[10px] w-[10px] text-rust" />
                  </div>
                  <span className="truncate">Extraction transcription... [OK]</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/30 bg-[#f5f1ed] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]">
                    <LoaderCircle className="h-[10px] w-[10px] animate-spin text-yellow" />
                  </div>
                  <span className="truncate font-medium text-navy">Analyse niveau B2 (CECRL)...</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="h-5 w-5 shrink-0 rounded-full border border-white/30 bg-[#f5f1ed] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]" />
                  <span className="truncate">Génération liste vocabulaire...</span>
                </div>
              </div>
            </div>
          </motion.article>

          <div className="absolute right-[32%] top-[45%] z-20 hidden w-[6%] -translate-y-1/2 items-center justify-center lg:flex">
            <svg className="h-12 w-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <motion.path
                d="M0,15 Q45,10 90,15"
                fill="none"
                stroke="#b7553d"
                strokeWidth="2.5"
                strokeDasharray="5,7,8,4"
                strokeLinecap="round"
                {...drawPath(0.95)}
              />
              <motion.path
                d="M86,9 Q91,15 86,21"
                fill="none"
                stroke="#b7553d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...revealArrowHead(1.3)}
              />
            </svg>
          </div>

          <motion.article
            className="group relative flex flex-1 flex-col rounded-[24px] border border-white/60 bg-[#faf8f5] p-8 shadow-[12px_12px_24px_#d9d4d0,-12px_-12px_24px_#ffffff] transition-all duration-500 hover:-translate-y-2 hover:shadow-[16px_16px_32px_#d0ccc9,-16px_-16px_32px_#ffffff]"
            {...reveal(0.55)}
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-[#faf8f5] text-navy shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-colors duration-500 group-hover:text-yellow">
                <Layers className="h-6 w-6" />
              </div>
              <div className="relative flex h-14 w-14 rotate-[4deg] items-center justify-center rounded-full bg-yellow font-display text-2xl font-bold text-navy shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-transform duration-500 group-hover:rotate-0">
                <div className="absolute inset-1 flex items-center justify-center rounded-full border border-black/5 shadow-[inset_2px_2px_4px_rgba(180,140,40,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]">
                  <span style={LETTERPRESS}>03</span>
                </div>
              </div>
            </div>

            <div className="mb-8 flex-1">
              <h3 className="mb-3 text-xl font-display font-bold text-navy" style={LETTERPRESS}>
                Matériel Prêt à l&apos;Emploi
              </h3>
              <p className="text-base leading-relaxed text-[#788293]" style={LETTERPRESS}>
                Obtenez instantanément un plan de cours structuré, des fiches apprenants, des
                exercices de compréhension et des amorces de débat.
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3 p-1">
              <div className="flex items-center gap-3 rounded-lg border border-white/50 bg-[#faf8f5] p-3 shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-shadow group-hover:shadow-[8px_8px_16px_#e1ddd9,-8px_-8px_16px_#ffffff]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f1ed] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]">
                  <FileText className="h-4 w-4 text-navy" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 h-2 w-24 rounded-full bg-[#ebe7e3] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]" />
                  <div className="h-1.5 w-16 rounded-full bg-[#ebe7e3] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]" />
                </div>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#faf8f5] shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff]">
                  <Check className="h-3 w-3 text-[#65a363]" />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-white/50 bg-[#faf8f5] p-3 shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff] transition-shadow group-hover:shadow-[8px_8px_16px_#e1ddd9,-8px_-8px_16px_#ffffff]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f1ed] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]">
                  <MessageSquare className="h-4 w-4 text-navy" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 h-2 w-20 rounded-full bg-[#ebe7e3] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]" />
                  <div className="h-1.5 w-12 rounded-full bg-[#ebe7e3] shadow-[inset_2px_2px_4px_#e1ddd9,inset_-2px_-2px_4px_#ffffff]" />
                </div>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#faf8f5] shadow-[4px_4px_8px_#e1ddd9,-4px_-4px_8px_#ffffff]">
                  <Check className="h-3 w-3 text-[#65a363]" />
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        <motion.div className="mt-16 text-center lg:mt-20" {...reveal(0.75)}>
          <Link
            id="cta-discover-method"
            to="/formation"
            className="group inline-flex items-center gap-3 rounded-xl border border-white/50 bg-yellow px-8 py-4 text-base font-bold text-navy shadow-[6px_6px_12px_#d9d4d0,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:translate-y-[2px] hover:shadow-[2px_2px_4px_#d9d4d0,-2px_-2px_4px_#ffffff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
          >
            Découvrir la méthode
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15),inset_-1px_-1px_3px_rgba(255,255,255,0.4)]">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
