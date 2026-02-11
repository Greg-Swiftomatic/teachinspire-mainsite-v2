/**
 * Reusable SVG motif fragments for the contemplative illustration system.
 * Each returns a <g> group that can be composed into larger scenes.
 *
 * All strokes: navy #2c3d57 (on cream bg) or cream #f8f7f2 (on navy bg).
 * Warm light: fill #f1d263.
 */

import type { FigurePose, LightIntensity, CurveStyle } from './types';

const NAVY = '#2c3d57';
const YELLOW = '#f1d263';
const SAGE = '#85a2a3';

// ─────────────────────────────────────────────
// THE FIGURE — small, faceless, universal
// ─────────────────────────────────────────────

interface FigureProps {
  pose: FigurePose;
  x?: number;
  y?: number;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
}

export function FigureMotif({
  pose,
  x = 0,
  y = 0,
  scale = 1,
  stroke = NAVY,
  strokeWidth = 1.5,
}: FigureProps) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <circle cx="0" cy="-22" r="5" data-draw data-draw-order="2" />

      {pose === 'seated' && (
        <>
          {/* Torso — slightly forward lean */}
          <path d="M 0 -17 L -2 -4" data-draw data-draw-order="3" />
          {/* Arms resting forward */}
          <path d="M -2 -12 L -8 -6" data-draw data-draw-order="4" />
          <path d="M -1 -12 L 6 -7" data-draw data-draw-order="4" />
          {/* Legs — seated angle */}
          <path d="M -2 -4 L -7 4 L -10 12" data-draw data-draw-order="5" />
          <path d="M -2 -4 L 3 4 L 6 12" data-draw data-draw-order="5" />
        </>
      )}

      {pose === 'standing' && (
        <>
          {/* Torso — upright */}
          <path d="M 0 -17 L 0 -2" data-draw data-draw-order="3" />
          {/* Arms relaxed at sides */}
          <path d="M 0 -12 L -6 -4" data-draw data-draw-order="4" />
          <path d="M 0 -12 L 6 -4" data-draw data-draw-order="4" />
          {/* Legs */}
          <path d="M 0 -2 L -4 12" data-draw data-draw-order="5" />
          <path d="M 0 -2 L 4 12" data-draw data-draw-order="5" />
        </>
      )}

      {pose === 'walking' && (
        <>
          {/* Torso — slight forward lean */}
          <path d="M 0 -17 L 1 -2" data-draw data-draw-order="3" />
          {/* Arms in motion */}
          <path d="M 0 -12 L -7 -6" data-draw data-draw-order="4" />
          <path d="M 0 -12 L 5 -2" data-draw data-draw-order="4" />
          {/* Legs — stride */}
          <path d="M 1 -2 L -5 10" data-draw data-draw-order="5" />
          <path d="M 1 -2 L 7 10" data-draw data-draw-order="5" />
        </>
      )}

      {pose === 'hunched' && (
        <>
          {/* Torso — rounded forward */}
          <path d="M 0 -17 L -3 -6" data-draw data-draw-order="3" />
          {/* Arms hanging or hugging self */}
          <path d="M -2 -12 L -8 -8 L -6 -3" data-draw data-draw-order="4" />
          <path d="M -1 -12 L 4 -8 L 2 -3" data-draw data-draw-order="4" />
          {/* Legs */}
          <path d="M -3 -6 L -6 8" data-draw data-draw-order="5" />
          <path d="M -3 -6 L 2 8" data-draw data-draw-order="5" />
        </>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// THE WARM LIGHT — knowledge arriving gently
// ─────────────────────────────────────────────

interface WarmLightProps {
  intensity?: LightIntensity;
  x?: number;
  y?: number;
  /** Enables continuous pulsing via data-ambient */
  ambient?: boolean;
}

export function WarmLightMotif({
  intensity = 'medium',
  x = 0,
  y = 0,
  ambient = false,
}: WarmLightProps) {
  const opacityMap: Record<LightIntensity, number> = {
    subtle: 0.2,
    medium: 0.4,
    bright: 0.6,
  };
  const radiusMap: Record<LightIntensity, number> = {
    subtle: 3,
    medium: 4,
    bright: 5,
  };

  const r = radiusMap[intensity];
  const op = opacityMap[intensity];

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Core glow */}
      <circle
        cx="0"
        cy="0"
        r={r}
        fill={YELLOW}
        opacity={op}
        data-glow
        data-glow-opacity={String(op)}
        {...(ambient ? { 'data-ambient': true, 'data-ambient-type': 'pulse' } : {})}
      />
      {/* Radiating arcs */}
      <path
        d={`M ${-r - 3} 0 A ${r + 3} ${r + 3} 0 0 1 0 ${-(r + 3)}`}
        fill="none"
        stroke={YELLOW}
        strokeWidth="0.8"
        opacity={op * 0.6}
        data-draw
        data-draw-order="90"
      />
      <path
        d={`M ${r + 5} 0 A ${r + 5} ${r + 5} 0 0 0 0 ${r + 5}`}
        fill="none"
        stroke={YELLOW}
        strokeWidth="0.5"
        opacity={op * 0.4}
        data-draw
        data-draw-order="91"
      />
    </g>
  );
}

// ─────────────────────────────────────────────
// DRIFTING SHAPES — unprocessed ideas floating
// ─────────────────────────────────────────────

interface DriftingShapesProps {
  count?: number;
  spread?: number;
  cx?: number;
  cy?: number;
  stroke?: string;
}

export function DriftingShapes({
  count = 5,
  spread = 80,
  cx = 0,
  cy = 0,
  stroke = NAVY,
}: DriftingShapesProps) {
  // Deterministic pseudo-random positions based on index
  const shapes = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + 0.3;
    const dist = spread * 0.4 + (i % 3) * spread * 0.2;
    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist;
    const shapeType = i % 3; // 0=circle, 1=rect, 2=triangle
    const size = 4 + (i % 4) * 2;
    return { px, py, shapeType, size, i };
  });

  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      opacity="0.25"
    >
      {shapes.map(({ px, py, shapeType, size, i }) => {
        const order = 10 + i;
        if (shapeType === 0) {
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={size / 2}
              data-draw
              data-draw-order={String(order)}
              data-ambient
              data-ambient-type="drift"
            />
          );
        }
        if (shapeType === 1) {
          return (
            <rect
              key={i}
              x={px - size / 2}
              y={py - size / 2}
              width={size}
              height={size}
              data-draw
              data-draw-order={String(order)}
              data-ambient
              data-ambient-type="drift"
            />
          );
        }
        // triangle
        const half = size / 2;
        return (
          <path
            key={i}
            d={`M ${px} ${py - half} L ${px + half} ${py + half} L ${px - half} ${py + half} Z`}
            data-draw
            data-draw-order={String(order)}
            data-ambient
            data-ambient-type="drift"
          />
        );
      })}
    </g>
  );
}

// ─────────────────────────────────────────────
// THREAD LINE — connection between ideas
// ─────────────────────────────────────────────

interface ThreadLineProps {
  from: [number, number];
  to: [number, number];
  curve?: CurveStyle;
  stroke?: string;
  strokeWidth?: number;
  drawOrder?: number;
  /** Add subtle crosshatching at midpoint */
  crosshatch?: boolean;
}

export function ThreadLine({
  from,
  to,
  curve = 'gentle',
  stroke = NAVY,
  strokeWidth = 1,
  drawOrder = 20,
  crosshatch = false,
}: ThreadLineProps) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  let d: string;
  if (curve === 'straight') {
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
  } else if (curve === 'arc') {
    d = `M ${x1} ${y1} Q ${mx} ${my - 30} ${x2} ${y2}`;
  } else {
    // gentle S-curve
    const cx1 = x1 + (x2 - x1) * 0.3;
    const cy1 = y1;
    const cx2 = x1 + (x2 - x1) * 0.7;
    const cy2 = y2;
    d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity="0.3"
        data-draw
        data-draw-order={String(drawOrder)}
      />
      {crosshatch && (
        <g opacity="0.15" stroke={stroke} strokeWidth="0.5">
          <line
            x1={mx - 4}
            y1={my - 4}
            x2={mx + 4}
            y2={my + 4}
            data-draw
            data-draw-order={String(drawOrder + 1)}
          />
          <line
            x1={mx - 4}
            y1={my + 4}
            x2={mx + 4}
            y2={my - 4}
            data-draw
            data-draw-order={String(drawOrder + 1)}
          />
        </g>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// SIMPLE DESK — for seated figure scenes
// ─────────────────────────────────────────────

interface DeskProps {
  x?: number;
  y?: number;
  width?: number;
  stroke?: string;
}

export function DeskMotif({
  x = 0,
  y = 0,
  width = 40,
  stroke = NAVY,
}: DeskProps) {
  const legH = 20;
  return (
    <g
      transform={`translate(${x}, ${y})`}
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {/* Desktop surface */}
      <line
        x1={-width / 2}
        y1="0"
        x2={width / 2}
        y2="0"
        data-draw
        data-draw-order="1"
      />
      {/* Left leg */}
      <line
        x1={-width / 2 + 4}
        y1="0"
        x2={-width / 2 + 4}
        y2={legH}
        data-draw
        data-draw-order="1"
      />
      {/* Right leg */}
      <line
        x1={width / 2 - 4}
        y1="0"
        x2={width / 2 - 4}
        y2={legH}
        data-draw
        data-draw-order="1"
      />
    </g>
  );
}

export { NAVY, YELLOW, SAGE };
