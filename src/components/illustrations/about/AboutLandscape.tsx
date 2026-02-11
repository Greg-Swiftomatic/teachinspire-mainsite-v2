/**
 * "The Teacher in the Landscape"
 *
 * A vast horizontal landscape — a thin horizon line at the lower third.
 * Below: subtle crosshatching suggesting earth.
 * At the horizon, a small figure stands facing right.
 * In the distant right, a faint warm light on the horizon.
 * Between figure and light, dotted path lines suggest possible futures.
 *
 * The moment: the beginning of a journey. The future is still just
 * a possibility in the distance.
 */

import { useRef } from 'react';
import { IllustrationWrapper } from '../shared/IllustrationWrapper';
import { useSvgDraw } from '../shared/useSvgDraw';
import { FigureMotif, WarmLightMotif } from '../shared/motifs';

export function AboutLandscape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useSvgDraw(containerRef, {
    triggerStart: 'top 95%',
    baseDuration: 0.6,
    stagger: 0.12,
  });

  return (
    <IllustrationWrapper
      className="absolute inset-0 z-0"
      label="A small figure looking toward a distant light on the horizon"
    >
      <div ref={containerRef} className="absolute right-0 top-[18%] w-[45vw] max-w-[540px] h-[65%]">
        <svg
          viewBox="0 0 500 350"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizon line — the foundational element */}
          <line
            x1="20"
            y1="240"
            x2="480"
            y2="240"
            stroke="#2c3d57"
            strokeWidth="1.5"
            opacity="0.25"
            data-draw
            data-draw-order="1"
          />

          {/* Crosshatching below horizon — earth texture */}
          <g opacity="0.06" stroke="#2c3d57" strokeWidth="0.5">
            {Array.from({ length: 18 }, (_, i) => (
              <line
                key={`earth-${i}`}
                x1={30 + i * 26}
                y1="242"
                x2={38 + i * 26}
                y2="255"
                data-draw
                data-draw-order="2"
              />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={`earth2-${i}`}
                x1={45 + i * 38}
                y1="250"
                x2={50 + i * 38}
                y2="265"
                data-draw
                data-draw-order="2"
              />
            ))}
          </g>

          {/* The figure — standing at horizon, left of center */}
          <FigureMotif pose="standing" x={140} y={228} scale={1.3} />

          {/* Dotted path lines — possible futures */}
          <path
            d="M 170 238 C 230 232, 300 228, 400 236"
            stroke="#2c3d57"
            strokeWidth="0.8"
            strokeDasharray="3 6"
            opacity="0.15"
            data-draw
            data-draw-order="30"
          />
          <path
            d="M 170 234 C 240 220, 320 222, 420 230"
            stroke="#85a2a3"
            strokeWidth="0.8"
            strokeDasharray="3 6"
            opacity="0.12"
            data-draw
            data-draw-order="31"
          />
          <path
            d="M 170 242 C 250 246, 340 240, 430 238"
            stroke="#2c3d57"
            strokeWidth="0.6"
            strokeDasharray="2 8"
            opacity="0.1"
            data-draw
            data-draw-order="32"
          />

          {/* Warm light on the distant horizon — the future */}
          <WarmLightMotif intensity="subtle" x={440} y={234} ambient />
        </svg>
      </div>
    </IllustrationWrapper>
  );
}
