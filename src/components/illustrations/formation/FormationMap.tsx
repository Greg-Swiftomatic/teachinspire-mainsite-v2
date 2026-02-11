/**
 * "The Unfolding Map"
 *
 * A partially unrolled scroll/map viewed from above.
 * Grid pattern on its surface with 3 module icons.
 * Warm light illuminates the unrolled portion.
 * Drifting shapes surround — sources waiting to be processed.
 *
 * The moment: a structured plan being revealed.
 */

import { useRef } from 'react';
import { IllustrationWrapper } from '../shared/IllustrationWrapper';
import { useSvgDraw } from '../shared/useSvgDraw';
import { WarmLightMotif, DriftingShapes } from '../shared/motifs';

export function FormationMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useSvgDraw(containerRef, {
    triggerStart: 'top 95%',
    baseDuration: 0.5,
    stagger: 0.1,
  });

  return (
    <IllustrationWrapper
      className="absolute inset-0 z-0"
      label="An unfolding map revealing the formation plan"
    >
      <div ref={containerRef} className="absolute right-0 top-[12%] w-[45vw] max-w-[520px] h-[75%]">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scroll body — main rectangle with curved right edge */}
          <path
            d="M 120 140 L 380 140 L 380 380 L 120 380 Z"
            stroke="#2c3d57"
            strokeWidth="1.5"
            opacity="0.25"
            data-draw
            data-draw-order="1"
          />

          {/* Scroll curl — right edge */}
          <path
            d="M 380 140 C 400 140, 410 155, 405 170 C 400 185, 385 185, 380 180"
            stroke="#2c3d57"
            strokeWidth="1.5"
            opacity="0.2"
            data-draw
            data-draw-order="2"
          />
          <path
            d="M 380 380 C 400 380, 410 365, 405 350"
            stroke="#2c3d57"
            strokeWidth="1"
            opacity="0.15"
            data-draw
            data-draw-order="2"
          />

          {/* Grid pattern on scroll surface */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`h-${i}`}
              x1="140"
              y1={180 + i * 50}
              x2="360"
              y2={180 + i * 50}
              stroke="#2c3d57"
              strokeWidth="0.5"
              opacity="0.08"
              data-draw
              data-draw-order="3"
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`v-${i}`}
              x1={180 + i * 55}
              y1="155"
              x2={180 + i * 55}
              y2="365"
              stroke="#2c3d57"
              strokeWidth="0.5"
              opacity="0.08"
              data-draw
              data-draw-order="3"
            />
          ))}

          {/* Module icon 1: Lens/Telescope (Panorama) */}
          <g data-draw data-draw-order="5">
            <circle cx="190" cy="210" r="10" stroke="#2c3d57" strokeWidth="1.2" opacity="0.3" />
            <line x1="197" y1="217" x2="208" y2="228" stroke="#2c3d57" strokeWidth="1.2" opacity="0.3" />
          </g>

          {/* Module icon 2: Pen nib (Prompt Engineering) */}
          <g data-draw data-draw-order="6">
            <path
              d="M 260 260 L 270 248 L 276 254 L 266 266 Z"
              stroke="#2c3d57"
              strokeWidth="1.2"
              opacity="0.3"
            />
            <path
              d="M 260 266 C 258 270, 256 272, 254 270"
              stroke="#2c3d57"
              strokeWidth="1"
              opacity="0.25"
            />
          </g>

          {/* Module icon 3: Flow arrows (Workflows) */}
          <g data-draw data-draw-order="7">
            <circle cx="330" cy="310" r="4" stroke="#2c3d57" strokeWidth="1" opacity="0.3" />
            <line x1="334" y1="310" x2="348" y2="310" stroke="#2c3d57" strokeWidth="1" opacity="0.3" />
            <circle cx="352" cy="310" r="4" stroke="#2c3d57" strokeWidth="1" opacity="0.3" />
            <line x1="352" y1="306" x2="352" y2="290" stroke="#2c3d57" strokeWidth="1" opacity="0.3" />
            <circle cx="352" cy="286" r="4" stroke="#2c3d57" strokeWidth="1" opacity="0.3" />
          </g>

          {/* Warm light on the unrolled portion */}
          <WarmLightMotif intensity="medium" x={250} y={260} ambient />

          {/* Drifting shapes around the scroll */}
          <DriftingShapes count={5} spread={100} cx={80} cy={260} />

          {/* A few more shapes on the right side */}
          <g opacity="0.2" stroke="#85a2a3" strokeWidth="1">
            <circle cx="440" cy="200" r="5" data-draw data-draw-order="12" data-ambient data-ambient-type="drift" />
            <rect x="420" y="330" width="8" height="8" data-draw data-draw-order="13" data-ambient data-ambient-type="drift" />
          </g>
        </svg>
      </div>
    </IllustrationWrapper>
  );
}
