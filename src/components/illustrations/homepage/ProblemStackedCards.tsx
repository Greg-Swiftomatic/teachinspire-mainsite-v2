import { motion } from 'framer-motion';

interface ProblemStackedCardsProps {
  className?: string;
  prefersReducedMotion?: boolean;
}

interface StackState {
  y: number;
  scale: number;
  opacity: number;
  rotate: number;
  zIndex: number;
}

interface CardSpec {
  step: string;
  title: string;
  subtitle: string;
  accent: string;
  rows: Array<{ width: number; tone: 'alert' | 'neutral' | 'warn' }>;
}

const STACK_CYCLE: StackState[] = [
  { y: 74, scale: 1, opacity: 1, rotate: -2, zIndex: 40 },
  { y: -70, scale: 0.84, opacity: 0.68, rotate: 3, zIndex: 20 },
  { y: -2, scale: 0.92, opacity: 0.86, rotate: 0, zIndex: 30 },
  { y: 74, scale: 1, opacity: 1, rotate: -2, zIndex: 40 },
];

const STACK_TIMES = [0, 0.33, 0.66, 1];
const STACK_DURATION = 16;

const CARDS: CardSpec[] = [
  {
    step: '01',
    title: 'Bruit IA',
    subtitle: 'Trop d outils, aucun cadre',
    accent: '#B7553D',
    rows: [
      { width: 0.84, tone: 'alert' },
      { width: 0.65, tone: 'neutral' },
      { width: 0.72, tone: 'warn' },
    ],
  },
  {
    step: '02',
    title: 'Essais Aleatoires',
    subtitle: 'Resultats instables',
    accent: '#F1D263',
    rows: [
      { width: 0.78, tone: 'warn' },
      { width: 0.56, tone: 'neutral' },
      { width: 0.81, tone: 'alert' },
    ],
  },
  {
    step: '03',
    title: 'Temps Perdu',
    subtitle: 'Preparation qui explose',
    accent: '#85A2A3',
    rows: [
      { width: 0.71, tone: 'neutral' },
      { width: 0.9, tone: 'alert' },
      { width: 0.59, tone: 'warn' },
    ],
  },
];

function rotate<T>(arr: T[], shift: number): T[] {
  const n = arr.length;
  const offset = ((shift % n) + n) % n;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

function toneColor(tone: 'alert' | 'neutral' | 'warn'): string {
  if (tone === 'alert') return '#B7553D';
  if (tone === 'warn') return '#F1D263';
  return '#85A2A3';
}

function ProblemCard({ spec }: { spec: CardSpec }) {
  return (
    <svg viewBox="0 0 310 390" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id={`paper-${spec.step}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f4f3f0" />
        </linearGradient>
      </defs>

      <rect
        x="12"
        y="12"
        width="286"
        height="366"
        rx="26"
        fill={`url(#paper-${spec.step})`}
        stroke="rgba(44,61,87,0.12)"
        strokeWidth="2"
      />

      <rect x="32" y="34" width="246" height="1" fill="rgba(44,61,87,0.1)" />

      <circle cx="47" cy="48" r="16" fill={spec.accent} opacity="0.22" />
      <text
        x="47"
        y="53"
        textAnchor="middle"
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 12,
          fontWeight: 700,
          fill: '#2c3d57',
        }}
      >
        {spec.step}
      </text>

      <text
        x="72"
        y="49"
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 22,
          fontWeight: 700,
          fill: '#2c3d57',
        }}
      >
        {spec.title}
      </text>

      <text
        x="72"
        y="70"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.3,
          textTransform: 'uppercase',
          fill: '#788293',
        }}
      >
        {spec.subtitle}
      </text>

      <rect
        x="31"
        y="94"
        width="248"
        height="90"
        rx="18"
        fill="rgba(44,61,87,0.04)"
        stroke="rgba(44,61,87,0.08)"
      />

      {spec.rows.map((row, i) => (
        <g key={`${spec.step}-row-${i}`}>
          <rect
            x="46"
            y={110 + i * 23}
            width="218"
            height="11"
            rx="5.5"
            fill="rgba(44,61,87,0.08)"
          />
          <rect
            x="46"
            y={110 + i * 23}
            width={218 * row.width}
            height="11"
            rx="5.5"
            fill={toneColor(row.tone)}
            opacity="0.72"
          />
        </g>
      ))}

      <rect
        x="31"
        y="205"
        width="248"
        height="140"
        rx="22"
        fill="rgba(44,61,87,0.03)"
        stroke="rgba(44,61,87,0.08)"
      />

      <path
        d="M60 262 C108 228, 144 303, 186 258 S246 258, 251 278"
        fill="none"
        stroke={spec.accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="6 9"
        opacity="0.8"
      />

      <circle cx="60" cy="262" r="6" fill={spec.accent} opacity="0.9" />
      <circle cx="251" cy="278" r="6" fill={spec.accent} opacity="0.9" />

      <rect
        x="80"
        y="314"
        width="150"
        height="16"
        rx="8"
        fill={spec.accent}
        opacity="0.2"
      />
    </svg>
  );
}

function LayeredCard({
  spec,
  shift,
  prefersReducedMotion,
}: {
  spec: CardSpec;
  shift: number;
  prefersReducedMotion: boolean;
}) {
  if (prefersReducedMotion) {
    const staticState = STACK_CYCLE[shift];
    return (
      <motion.div
        className="absolute inset-0"
        style={{
          zIndex: staticState.zIndex,
          transform: `translateY(${staticState.y}px) scale(${staticState.scale}) rotate(${staticState.rotate}deg)`,
          opacity: staticState.opacity,
          filter: shift === 1 ? 'blur(2px)' : shift === 2 ? 'blur(1px)' : 'none',
        }}
      >
        <ProblemCard spec={spec} />
      </motion.div>
    );
  }

  const shifted = rotate(STACK_CYCLE, shift);

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        y: shifted.map((s) => s.y),
        scale: shifted.map((s) => s.scale),
        opacity: shifted.map((s) => s.opacity),
        rotate: shifted.map((s) => s.rotate),
        zIndex: shifted.map((s) => s.zIndex),
      }}
      transition={{
        duration: STACK_DURATION,
        ease: 'linear',
        repeat: Infinity,
        times: STACK_TIMES,
      }}
    >
      <ProblemCard spec={spec} />
    </motion.div>
  );
}

export function ProblemStackedCards({
  className = '',
  prefersReducedMotion = false,
}: ProblemStackedCardsProps) {
  return (
    <div
      className={`relative mt-10 w-full aspect-[402/512] max-w-[320px] hidden lg:block ${className}`}
      role="img"
      aria-label="Trois cartes superposees montrant la surcharge, l essai aleatoire et le temps perdu"
    >
      <LayeredCard spec={CARDS[2]} shift={1} prefersReducedMotion={prefersReducedMotion} />
      <LayeredCard spec={CARDS[1]} shift={2} prefersReducedMotion={prefersReducedMotion} />
      <LayeredCard spec={CARDS[0]} shift={0} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
