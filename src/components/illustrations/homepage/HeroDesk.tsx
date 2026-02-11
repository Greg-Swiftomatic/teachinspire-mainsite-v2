/**
 * "The Quiet Desk"
 *
 * A small figure sits at a desk in vast cream space.
 * Warm light above a sheet of paper. Geometric shapes drift nearby.
 * One thread connects the nearest shape to the paper.
 *
 * The moment: a teacher at their desk, surrounded by possibilities,
 * with the first thread of transformation beginning.
 */

import { useRef } from 'react';
import { IllustrationWrapper } from '../shared/IllustrationWrapper';
import { useSvgDraw } from '../shared/useSvgDraw';
import {
  FigureMotif,
  WarmLightMotif,
  DriftingShapes,
  ThreadLine,
  DeskMotif,
} from '../shared/motifs';

export function HeroDesk() {
  const containerRef = useRef<HTMLDivElement>(null);

  useSvgDraw(containerRef, {
    triggerStart: 'top 95%',
    baseDuration: 0.5,
    stagger: 0.12,
  });

  return (
    <IllustrationWrapper
      className="absolute inset-0 z-0"
      label="A teacher at their desk, contemplating possibilities"
    >
      <div ref={containerRef} className="absolute right-0 top-[12%] w-[45vw] max-w-[580px] h-[70%]">
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Desk in lower-right area */}
          <DeskMotif x={340} y={300} width={80} />

          {/* Figure seated at desk */}
          <FigureMotif pose="seated" x={330} y={290} scale={1.2} />

          {/* Paper on desk */}
          <rect
            x="350"
            y="290"
            width="18"
            height="24"
            stroke="#2c3d57"
            strokeWidth="1"
            opacity="0.3"
            data-draw
            data-draw-order="6"
          />

          {/* Warm light above the paper */}
          <WarmLightMotif intensity="medium" x={360} y={270} ambient />

          {/* Drifting geometric shapes — the sources out there */}
          <DriftingShapes count={6} spread={120} cx={180} cy={180} />

          {/* Thread from nearest shape toward paper */}
          <ThreadLine
            from={[230, 220]}
            to={[348, 288]}
            curve="gentle"
            drawOrder={25}
            crosshatch
          />

          {/* Subtle crosshatching on desk surface */}
          <g opacity="0.08" stroke="#2c3d57" strokeWidth="0.5">
            {[0, 1, 2, 3].map((i) => (
              <line
                key={`hatch-${i}`}
                x1={305 + i * 8}
                y1={300}
                x2={309 + i * 8}
                y2={295}
                data-draw
                data-draw-order="7"
              />
            ))}
          </g>
        </svg>
      </div>
    </IllustrationWrapper>
  );
}
