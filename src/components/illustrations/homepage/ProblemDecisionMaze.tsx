import './ProblemDecisionMaze.css';

interface ProblemDecisionMazeProps {
  className?: string;
  prefersReducedMotion?: boolean;
}

interface DecisionNode {
  id: string;
  label: string;
  left: string;
  top: string;
}

interface DeadEndNode {
  id: string;
  label: string;
  left: string;
  top: string;
  pulse?: 'p1' | 'p2' | 'p3';
}

const decisionNodes: DecisionNode[] = [
  { id: 'tool', label: 'Quel outil choisir ?', left: '34%', top: '13.46%' },
  { id: 'prompt', label: 'Comment lui parler ?', left: '34%', top: '32.69%' },
  { id: 'adapt', label: "Comment l'adapter à mes élèves ?", left: '34%', top: '51.92%' },
  { id: 'course', label: 'Comment en faire un vrai cours ?', left: '34%', top: '69.23%' },
];

const deadEnds: DeadEndNode[] = [
  {
    id: 'd1',
    label: "On passe plus de temps à tester qu'à enseigner",
    left: '58%',
    top: '13.46%',
    pulse: 'p1',
  },
  {
    id: 'd2',
    label: "Le résultat ne correspond jamais à ce qu'on veut",
    left: '58%',
    top: '32.69%',
    pulse: 'p2',
  },
  {
    id: 'd3',
    label: 'Exercice trop facile, trop dur, hors-sujet',
    left: '58%',
    top: '51.92%',
  },
  {
    id: 'd4',
    label: 'Du contenu brut inutilisable en classe',
    left: '58%',
    top: '69.23%',
    pulse: 'p3',
  },
];

const wrapperBase =
  'pdm-wrapper mt-10 w-full overflow-hidden rounded-[2rem] border border-white bg-[#fcfbf9] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.1)]';

export function ProblemDecisionMaze({
  className = '',
  prefersReducedMotion = false,
}: ProblemDecisionMazeProps) {
  const rootClasses = [wrapperBase, className].filter(Boolean).join(' ');
  const motionClass = prefersReducedMotion ? 'reduced-motion' : '';

  return (
    <div
      className={`${rootClasses} hidden lg:flex lg:flex-col ${motionClass}`.trim()}
      role="img"
      aria-label="Organigramme de décisions IA montrant une escalade de frustration et une sortie positive par la méthode"
    >
      <div className="pdm-texture" />

      <div className="relative z-20 bg-gradient-to-b from-[#f5f1ed]/80 to-transparent px-6 py-8 text-center">
        <h3 className="font-display text-[24px] font-bold leading-tight text-navy sm:text-[28px]">
          IA partout. Et ensuite ?
        </h3>
        <div className="mx-auto mt-5 h-[2px] w-10 rounded-full bg-navy/20" />
      </div>

      <div className="relative mb-8 w-full aspect-[600/520]">
        <svg
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
          viewBox="0 0 600 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="pdm-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g className="pdm-flow-line">
            <path d="M 70 70 L 130 70" />
            <path d="M 130 70 L 205 70" />
            <path d="M 205 70 L 205 360" />

            <path d="M 270 70 L 338 70" />
            <path d="M 270 170 L 338 170" />
            <path d="M 270 270 L 338 270" />
            <path d="M 270 360 L 338 360" />
          </g>

          <g className="pdm-flow-method">
            <path d="M 205 360 L 205 440 L 338 440" />
          </g>

          {!prefersReducedMotion && (
            <>
              <circle className="pdm-anim-dot" r="4.5" fill="#f1d263" filter="url(#pdm-dot-glow)">
                <animateMotion begin="0s" dur="7s" repeatCount="indefinite" path="M 70 70 L 205 70 L 338 70" />
                <animate
                  attributeName="opacity"
                  begin="0s"
                  values="0;1;1;0;0"
                  keyTimes="0;0.05;0.95;0.99;1"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle className="pdm-anim-dot" r="4.5" fill="#f1d263" filter="url(#pdm-dot-glow)">
                <animateMotion begin="2.3s" dur="7s" repeatCount="indefinite" path="M 70 70 L 205 70 L 205 170 L 338 170" />
                <animate
                  attributeName="opacity"
                  begin="2.3s"
                  values="0;1;1;0;0"
                  keyTimes="0;0.05;0.95;0.99;1"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle className="pdm-anim-dot" r="4.5" fill="#f1d263" filter="url(#pdm-dot-glow)">
                <animateMotion
                  begin="4.6s"
                  dur="7s"
                  repeatCount="indefinite"
                  path="M 70 70 L 205 70 L 205 170 L 205 270 L 205 360 L 338 360"
                />
                <animate
                  attributeName="opacity"
                  begin="4.6s"
                  values="0;1;1;0;0"
                  keyTimes="0;0.05;0.95;0.99;1"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </svg>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-navy bg-white px-3 py-2 text-center shadow-sm sm:px-4 sm:py-2.5"
            style={{ left: '11.66%', top: '13.46%' }}
          >
            <span className="whitespace-nowrap font-sans text-[12px] font-bold tracking-wide text-navy sm:text-[14px] md:text-[15px]">
              IA partout
            </span>
          </div>

          {decisionNodes.map((node) => (
            <div
              key={node.id}
              className="absolute flex w-[160px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-navy/15 bg-white px-3 py-3 shadow-sm sm:w-[200px] sm:py-3.5 md:w-[230px]"
              style={{ left: node.left, top: node.top }}
            >
              <span className="text-center font-display text-[11px] font-semibold leading-snug text-navy sm:text-[13px] md:text-[14px]">
                {node.label}
              </span>
            </div>
          ))}

          {deadEnds.map((node) => (
            <div key={node.id}>
              <div
                className={[
                  'absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust sm:h-3 sm:w-3',
                  node.pulse ? `pdm-${node.pulse}` : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ left: node.left, top: node.top }}
              />
              <div
                className="absolute -translate-y-1/2 font-sans text-[11px] font-medium leading-[1.35] text-rust sm:text-[12px] md:text-[13px]"
                style={{ right: '2.5%', top: node.top, width: '41%' }}
              >
                {node.label}
              </div>
            </div>
          ))}

          <div
            className="absolute flex w-[130px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-[1.5px] border-dashed border-[#7a9177] bg-[#f0f4f1] px-2 py-2 shadow-sm sm:w-[170px] sm:py-3 md:w-[190px]"
            style={{ left: '34%', top: '84.61%' }}
          >
            <span className="text-center font-display text-[10px] font-bold leading-snug text-[#7a9177] sm:text-[12px] md:text-[13px]">
              Méthode pédagogique
            </span>
          </div>

          <div
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7a9177] opacity-80 sm:h-2.5 sm:w-2.5"
            style={{ left: '58%', top: '84.61%' }}
          />
          <div
            className="absolute -translate-y-1/2 font-sans text-[11px] italic leading-[1.35] text-[#7a9177] opacity-90 sm:text-[12px] md:text-[13px]"
            style={{ right: '2.5%', top: '84.61%', width: '41%' }}
          >
            Progression guidée
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-auto bg-navy px-6 py-6 text-center sm:py-8">
        <p className="font-display text-[15px] font-medium tracking-wide text-[#fcfbf9] sm:text-[17px]">
          Sans méthode, on tourne en rond.
        </p>
      </div>
    </div>
  );
}
