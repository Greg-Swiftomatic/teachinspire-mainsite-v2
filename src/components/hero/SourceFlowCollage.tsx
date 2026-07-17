import type { CSSProperties, ReactNode } from 'react';
import { Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Annotation } from './Annotation';
import './SourceFlowCollage.css';

type TapeTone = 'sage' | 'yellow' | 'paper';

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  label: string;
  stacked?: boolean;
  tapeClassName?: string;
  tapeTone?: TapeTone;
}

const tapeStyles: Record<TapeTone, string> = {
  sage: 'bg-[#aebfb3]',
  yellow: 'bg-yellow',
  paper: 'bg-[#e6d7bf]',
};

export function PaperCard({
  children,
  className,
  label,
  stacked = false,
  tapeClassName,
  tapeTone = 'paper',
}: PaperCardProps) {
  return (
    <div className={cn('collage-card collage-float absolute', className)}>
      {stacked && <span className="collage-sheet-behind" aria-hidden="true" />}
      <article className="collage-paper relative h-full w-full p-[7%] pt-[11%] text-navy">
        {children}
      </article>
      <div
        className={cn(
          'collage-tape collage-card-label absolute left-[8%] right-[8%] top-0 z-10 py-[4%] text-center text-[clamp(0.5rem,1vw,0.78rem)] font-semibold uppercase tracking-[0.06em]',
          tapeStyles[tapeTone],
          tapeClassName,
        )}
      >
        {label}
      </div>
    </div>
  );
}

interface WaveformProps {
  className?: string;
  compact?: boolean;
}

const waveform = [11, 18, 8, 22, 30, 13, 34, 24, 40, 16, 28, 36, 12, 25, 41, 21, 32, 15, 35, 27, 10, 31, 18, 38, 23, 13, 29, 20, 35, 12, 26, 39, 17, 33, 9, 24, 37, 15, 29, 19];

export function Waveform({ className, compact = false }: WaveformProps) {
  return (
    <svg className={cn('w-full', className)} viewBox="0 0 220 54" role="img" aria-label="Forme d'onde audio">
      <line x1="2" y1="27" x2="218" y2="27" stroke="currentColor" strokeOpacity="0.18" />
      {waveform.map((height, index) => (
        <line
          key={`${height}-${index}`}
          x1={5 + index * 5.35}
          x2={5 + index * 5.35}
          y1={27 - (compact ? height * 0.42 : height * 0.55)}
          y2={27 + (compact ? height * 0.42 : height * 0.55)}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.15}
        />
      ))}
    </svg>
  );
}

function RuledLines({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-[6%]" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="h-px bg-navy/70"
          style={{ width: `${96 - ((index * 9) % 28)}%` }}
        />
      ))}
    </div>
  );
}

interface SourceFlowCollageProps {
  className?: string;
  onPlay?: () => void;
}

export function SourceFlowCollage({ className, onPlay }: SourceFlowCollageProps) {
  return (
    <div
      className={cn('source-flow-collage relative mx-auto aspect-[1.03] w-full max-w-[820px]', className)}
      aria-label="Des sources réelles deviennent des supports de cours avec la méthode TeachInspire"
    >
      <div className="collage-dot-paper absolute left-[1%] top-[2%] h-[12%] w-[12%] opacity-65" aria-hidden="true" />
      <div className="collage-grid-paper absolute left-[9%] top-[32%] h-[21%] w-[10%] -rotate-3 opacity-45" aria-hidden="true" />
      <div className="collage-dot-paper absolute bottom-[5%] right-[1%] h-[18%] w-[11%] opacity-60" aria-hidden="true" />
      <div className="collage-kraft-paper" aria-hidden="true" />
      <div className="collage-paper-fragment" aria-hidden="true" />
      <svg className="collage-magnifier" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <circle cx="23" cy="22" r="14" stroke="currentColor" strokeWidth="1.6" />
        <path d="M33 33L49 48M19 9C14 11 11 15 10 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <svg className="pointer-events-none absolute inset-0 z-[1] size-full text-navy" viewBox="0 0 820 796" fill="none" aria-hidden="true">
        <g className="collage-arrow" style={{ '--arrow-delay': '80ms' } as CSSProperties}>
          <path pathLength="1" d="M214 264C225 279 237 287 254 300" />
          <path pathLength="1" d="M254 300L244 297M254 300L250 290" />
        </g>
        <g className="collage-arrow" style={{ '--arrow-delay': '160ms' } as CSSProperties}>
          <path pathLength="1" d="M410 251C407 268 408 283 411 300" />
          <path pathLength="1" d="M411 300L405 291M411 300L416 290" />
        </g>
        <g className="collage-arrow" style={{ '--arrow-delay': '240ms' } as CSSProperties}>
          <path pathLength="1" d="M619 267C606 281 595 291 577 302" />
          <path pathLength="1" d="M577 302L582 292M577 302L588 301" />
        </g>
        <g className="collage-arrow" style={{ '--arrow-delay': '520ms' } as CSSProperties}>
          <path pathLength="1" d="M298 478C277 492 260 505 246 525" />
          <path pathLength="1" d="M246 525L248 514M246 525L257 520" />
        </g>
        <g className="collage-arrow" style={{ '--arrow-delay': '600ms' } as CSSProperties}>
          <path pathLength="1" d="M411 476C409 493 410 509 412 528" />
          <path pathLength="1" d="M412 528L406 518M412 528L418 518" />
        </g>
        <g className="collage-arrow" style={{ '--arrow-delay': '680ms' } as CSSProperties}>
          <path pathLength="1" d="M534 478C558 490 578 506 594 526" />
          <path pathLength="1" d="M594 526L584 521M594 526L591 515" />
        </g>
      </svg>

      <PaperCard label="Vidéo / Podcast" tapeTone="sage" tapeClassName="-rotate-[2deg] -translate-x-[2%]" className="collage-card--video">
        <button
          type="button"
          onClick={onPlay}
          className="collage-media-panel group relative block h-[70%] min-h-11 w-full bg-navy px-[5%] py-[4%] text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2"
          aria-label="Découvrir la méthode en vidéo"
        >
          <Waveform compact />
          <span className="absolute -bottom-[12%] left-[5%] grid size-[22%] min-h-7 min-w-7 place-items-center rounded-full bg-white text-navy shadow-md transition-transform group-hover:scale-105">
            <Play className="ml-[8%] size-[45%] fill-current" aria-hidden="true" />
          </span>
          <span className="collage-progress"><i /></span>
        </button>
        <div className="mt-[9%] space-y-[5%]" aria-hidden="true"><RuledLines count={2} /></div>
      </PaperCard>

      <PaperCard label="Article" tapeClassName="rotate-[2deg] translate-x-[3%]" className="collage-card--article">
        <span className="collage-article-number">01</span>
        <div className="collage-article-copy"><RuledLines count={6} /><i /></div>
        <svg className="collage-halftone-disc" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {Array.from({ length: 13 }, (_, index) => (
            <circle key={index} cx="40" cy="40" r={4 + index * 2.7} stroke="currentColor" strokeWidth="0.65" opacity={0.72 - index * 0.035} />
          ))}
        </svg>
      </PaperCard>

      <PaperCard label="Document métier" tapeTone="sage" tapeClassName="-rotate-[2.5deg] -translate-x-[3%]" stacked className="collage-card--document">
        <div className="collage-document-table" aria-hidden="true">
          {Array.from({ length: 20 }, (_, index) => (
            <span key={index} className={index === 6 || index === 13 ? 'is-filled' : ''} />
          ))}
        </div>
        <span className="collage-folded-corner" aria-hidden="true" />
      </PaperCard>

      <div className="collage-method absolute left-[29%] top-[38%] z-20 grid h-[20%] w-[43%] place-items-center overflow-hidden bg-[#9cad9f] px-[8%] text-center text-navy">
        <p className="font-display text-[clamp(1rem,2.2vw,2rem)] font-semibold leading-[1.05]">
          Méthode<br />TeachInspire
        </p>
        <svg className="collage-method-signature" viewBox="0 0 150 18" fill="none" aria-hidden="true">
          <path d="M7 6C41 4 76 8 143 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M20 12C59 10 93 15 132 11" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" opacity="0.72" />
        </svg>
      </div>

      <PaperCard label="Fiche apprenant" tapeTone="yellow" tapeClassName="rotate-[1.5deg] translate-x-[2%]" stacked className="collage-card--learner">
        <div className="space-y-[6%]" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex items-center gap-[7%]">
              <span className="grid size-[9%] aspect-square place-items-center border border-navy/60 font-display italic">{index < 2 ? '✓' : ''}</span>
              <span className="h-px flex-1 bg-navy/60" />
            </div>
          ))}
        </div>
      </PaperCard>

      <PaperCard label="Audio personnalisé" tapeClassName="-rotate-[1deg]" className="collage-card--audio">
        <button
          type="button"
          onClick={onPlay}
          className="collage-audio-panel group relative block h-[72%] min-h-11 w-full bg-navy px-[5%] text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2"
          aria-label="Écouter un exemple audio personnalisé"
        >
          <span className="collage-double-wave"><Waveform compact /><Waveform compact /></span>
          <span className="absolute bottom-[7%] left-[5%] grid size-[21%] min-h-7 min-w-7 place-items-center rounded-full bg-white text-navy transition-transform group-hover:scale-105">
            <Play className="ml-[8%] size-[45%] fill-current" aria-hidden="true" />
          </span>
          <span className="absolute bottom-[14%] left-[31%] right-[8%] h-px bg-white/55"><i className="block h-1.5 w-1.5 -translate-y-[3px] rounded-full bg-white" /></span>
        </button>
      </PaperCard>

      <PaperCard label="Fiche formateur" tapeTone="sage" tapeClassName="rotate-[2deg] translate-x-[3%]" className="collage-card--trainer">
        <div className="collage-trainer-content" aria-hidden="true">
          <strong>Objectifs</strong>
          <span><i />Compréhension</span>
          <span><i />Production</span>
          <strong>Déroulé</strong>
          <span><i />Mise en route</span>
          <span><i />Activité guidée</span>
        </div>
      </PaperCard>

      <Annotation className="collage-source-annotation" direction="left" rotation={-2}>
        De la source à un cours prêt pour la classe.
      </Annotation>

      <aside className="collage-note absolute bottom-[-3%] right-[1%] z-20 w-[26%] rotate-[1deg] px-[4%] py-[3%] leading-relaxed text-navy">
        <span className="collage-note-tape" aria-hidden="true" />
        Méthode. Studio. Communauté.<br />
        <span className="collage-note-underline mt-[3%] inline-block">Un écosystème pensé</span><br />
        pour les formateurs.
      </aside>
    </div>
  );
}
