import { Fragment } from 'react';
import './ProblemDecisionMaze.css';

interface ProblemDecisionMazeProps {
  className?: string;
  prefersReducedMotion?: boolean;
}

const decisionNodes = [
  { id: 'tool', label: 'Quel outil choisir ?', left: '37%', top: '13.46%' },
  { id: 'prompt', label: 'Comment lui parler ?', left: '37%', top: '32.69%' },
  { id: 'adapt', label: "Comment l'adapter à mes élèves ?", left: '37%', top: '51.92%' },
  { id: 'course', label: 'Comment en faire un vrai cours ?', left: '37%', top: '69.23%' },
];

const deadEnds = [
  {
    id: 'd1',
    label: "On passe plus de temps à tester qu'à enseigner",
    left: '71.66%',
    top: '13.46%',
    pulse: 'p1' as const,
  },
  {
    id: 'd2',
    label: "Le résultat ne correspond jamais à ce qu'on veut",
    left: '71.66%',
    top: '32.69%',
    pulse: 'p2' as const,
  },
  {
    id: 'd3',
    label: 'Exercice trop facile, trop dur, hors-sujet',
    left: '71.66%',
    top: '51.92%',
    pulse: undefined,
  },
  {
    id: 'd4',
    label: 'Du contenu brut inutilisable en classe',
    left: '71.66%',
    top: '69.23%',
    pulse: 'p3' as const,
  },
];

const wrapperBase =
  'pdm-wrapper mt-10 w-full overflow-hidden rounded-[2rem] border border-white bg-[#fcfbf9] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.1)]';

export function ProblemDecisionMaze({
  className = '',
  prefersReducedMotion = false,
}: ProblemDecisionMazeProps) {
  return (
    <div
      className={`${wrapperBase} ${className} flex flex-col ${prefersReducedMotion ? 'reduced-motion' : ''}`}
    >
      {/* Texture overlay */}
      <div className="pdm-texture" />

      {/* Header */}
      <div className="relative z-20 bg-gradient-to-r from-navy to-[#3a506e] px-6 py-5 sm:py-6">
        <p className="text-center font-display text-[17px] font-semibold tracking-wide text-[#fcfbf9] sm:text-[19px]">
          IA partout. Et ensuite ?
        </p>
      </div>

      {/* Main flowchart area */}
      <div className="relative z-10 flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Desktop SVG flow lines — hidden on mobile */}
        <svg
          className="pdm-flow-svg pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
          viewBox="0 0 1000 520"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          {/* Start node → first decision */}
          <g className="pdm-flow-line">
            <path d="M 370 20 L 370 50" />
          </g>

          {/* Vertical spine between decisions */}
          <g className="pdm-flow-line">
            <path d="M 370 90 L 370 150" />
            <path d="M 370 190 L 370 250" />
            <path d="M 370 290 L 370 340" />
          </g>

          {/* Horizontal branches → dead-ends */}
          <g className="pdm-flow-line">
            <path d="M 470 70 L 570 70" />
            <path d="M 470 170 L 570 170" />
            <path d="M 470 270 L 570 270" />
            <path d="M 470 360 L 570 360" />
          </g>

          {/* Loop-back curve (On recommence) */}
          <g className="pdm-flow-loop">
            <path d="M 370 380 C 370 420, 200 420, 200 360 C 200 200, 200 100, 280 50" />
            <polygon points="280,45 290,50 280,55" fill="#b7553d" opacity="0.6" />
          </g>

          {/* Method branch (dashed sage) */}
          <g className="pdm-flow-method">
            <path d="M 370 380 L 370 440 L 450 440" />
          </g>

          {/* Animated travelling dots */}
          {!prefersReducedMotion && (
            <>
              <circle className="pdm-anim-dot" r="3" fill="#b7553d" opacity="0.7">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 370 380 C 370 420, 200 420, 200 360 C 200 200, 200 100, 280 50"
                />
              </circle>
              <circle className="pdm-anim-dot" r="2.5" fill="#2c3d57" opacity="0.4">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 370 50 L 370 380" />
              </circle>
            </>
          )}
        </svg>

        {/* Content — stacked on mobile, absolute-positioned on lg */}
        <div className="pdm-content relative z-20 flex flex-col gap-1 lg:aspect-[1.9/1] lg:min-h-[480px]">
          {/* Starting node: "IA partout" */}
          <div className="pdm-node-start flex items-center justify-center" style={{ left: '37%', top: '3.8%' }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-5 py-2 shadow-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-navy" />
              <span className="font-display text-[14px] font-semibold text-navy sm:text-[15px]">
                IA partout
              </span>
            </div>
          </div>

          {/* Mobile flow line */}
          <div className="mx-auto mb-2 mt-2 h-8 w-[2px] border-l-2 border-dashed border-navy/20 lg:hidden" />

          {/* Decision + dead-end rows */}
          {decisionNodes.map((node, idx) => (
            <Fragment key={node.id}>
              <div className="flex flex-col gap-3 lg:contents">
                {/* Decision question */}
                <div
                  className="pdm-decision flex w-full items-center justify-center rounded-xl border border-navy/15 bg-white px-4 py-4 shadow-sm"
                  style={{ left: node.left, top: node.top }}
                >
                  <span className="text-center font-display text-[15px] font-semibold leading-snug text-navy lg:text-[14px]">
                    {node.label}
                  </span>
                </div>

                {/* Dead-end outcome */}
                <div
                  className="pdm-deadend flex items-center gap-4 rounded-xl border border-rust/20 bg-white/60 p-4 shadow-sm"
                  style={{ left: deadEnds[idx].left, top: deadEnds[idx].top }}
                >
                  <div
                    className={[
                      'h-3.5 w-3.5 shrink-0 rounded-full bg-rust lg:h-2.5 lg:w-2.5',
                      deadEnds[idx].pulse ? `pdm-${deadEnds[idx].pulse}` : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                  <span className="font-sans text-[14px] font-medium leading-tight text-rust lg:w-[140px] lg:text-[13px]">
                    {deadEnds[idx].label}
                  </span>
                </div>
              </div>

              {/* Mobile connector between rows */}
              {idx < decisionNodes.length - 1 && (
                <div className="mx-auto my-2 h-8 w-[2px] border-l-2 border-dashed border-navy/20 lg:hidden" />
              )}
            </Fragment>
          ))}

          {/* Loop-back label: On recommence */}
          <div className="mx-auto my-2 h-6 w-[2px] border-l-2 border-dashed border-rust/30 lg:hidden" />
          <div
            className="pdm-loopback flex items-center gap-4 rounded-xl border border-rust/20 bg-white/60 p-4 shadow-sm"
            style={{ left: '20%', top: '50%' }}
          >
            <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-rust lg:h-2.5 lg:w-2.5" />
            <span className="font-display text-[14px] font-medium leading-tight text-rust lg:w-[140px] lg:text-[13px]">
              On recommence
            </span>
          </div>

          {/* Mobile connector to method */}
          <div className="mx-auto my-2 h-8 w-[2px] border-l-2 border-dashed border-[#7a9177]/40 lg:hidden" />

          {/* Method branch */}
          <div className="flex flex-col gap-3 lg:contents">
            <div
              className="pdm-method flex w-full items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#7a9177] bg-[#f0f4f1] px-4 py-4 shadow-sm"
              style={{ left: '45%', top: '84.61%' }}
            >
              <span className="text-center font-display text-[15px] font-bold leading-snug text-[#7a9177] lg:text-[13px]">
                Méthode pédagogique
              </span>
            </div>

            <div
              className="pdm-method-end flex items-center gap-4 rounded-xl border border-dashed border-[#7a9177]/30 bg-[#f0f4f1] p-4 shadow-sm"
              style={{ left: '71.66%', top: '84.61%' }}
            >
              <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#7a9177] opacity-80 lg:h-2.5 lg:w-2.5" />
              <span className="font-display text-[14px] italic leading-tight text-[#7a9177] opacity-80 lg:w-[140px] lg:text-[13px]">
                Progression guidée
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 mt-auto bg-navy px-6 py-6 text-center sm:py-8">
        <p className="font-display text-[15px] font-medium tracking-wide text-[#fcfbf9] sm:text-[17px]">
          Sans méthode, on tourne en rond.
        </p>
      </div>
    </div>
  );
}
