/** Pose variants for the reusable figure motif */
export type FigurePose = 'seated' | 'standing' | 'walking' | 'hunched';

/** Glow intensity for the warm light motif */
export type LightIntensity = 'subtle' | 'medium' | 'bright';

/** Curve style for thread lines */
export type CurveStyle = 'gentle' | 'arc' | 'straight';

/** Common SVG position props */
export interface SvgPosition {
  x?: number;
  y?: number;
  scale?: number;
}

/** Props for data-draw attribute-based animation */
export interface DrawablePathProps {
  /** Controls draw order — lower numbers draw first */
  drawOrder?: number;
  /** Extra delay in seconds before this element starts drawing */
  drawDelay?: number;
}
