import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import type { SourceId } from './sourceConfigs';
import { sourceConfigs } from './sourceConfigs';

export interface TransformationStageHandle {
  getContainer: () => HTMLDivElement | null;
}

interface TransformationStageProps {
  activeSource: SourceId | null;
  phase: 'idle' | 'selected' | 'processing' | 'output';
  prefersReducedMotion: boolean;
}

/**
 * Premium center column — SVG-based transformation visualization.
 *
 * Layers (back → front):
 *   1. Grid dot pattern (CSS background)
 *   2. Flow paths with animated stroke-dashoffset
 *   3. Source-specific SVG fragments
 *   4. Concentric processing ring
 *   5. Output assembly bars
 */
export const TransformationStage = forwardRef<
  TransformationStageHandle,
  TransformationStageProps
>(function TransformationStage({ activeSource, phase, prefersReducedMotion }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getContainer: () => containerRef.current,
  }));

  // --- Idle animation: flowing dots along paths + rotating ring ---
  useEffect(() => {
    if (phase !== 'idle' || prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const paths = containerRef.current!.querySelectorAll('.flow-path');
      const ringArcs = containerRef.current!.querySelectorAll('.ring-arc');

      // Animate flowing dots along each path
      paths.forEach((path, i) => {
        const length = (path as SVGPathElement).getTotalLength?.() || 200;
        gsap.set(path, {
          strokeDasharray: `4 ${length * 0.15}`,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 3 + i * 0.4,
          ease: 'none',
          repeat: -1,
        });
      });

      // Rotate concentric ring arcs
      ringArcs.forEach((arc, i) => {
        gsap.to(arc, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 8 + i * 4,
          ease: 'none',
          repeat: -1,
          transformOrigin: 'center center',
        });
      });

      // Pulse the ring glow
      gsap.to(containerRef.current!.querySelector('.ring-glow'), {
        opacity: 0.4,
        scale: 1.15,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [phase, prefersReducedMotion]);

  const config = activeSource ? sourceConfigs[activeSource] : null;
  const showFragments =
    activeSource && (phase === 'selected' || phase === 'processing');

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center"
      style={{
        // Subtle dot grid background
        backgroundImage:
          'radial-gradient(circle, rgba(44,61,87,0.06) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Layer 1: SVG canvas */}
      <svg
        viewBox="0 0 280 280"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradient for flow paths */}
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#85a2a3" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#2c3d57" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f1d263" stopOpacity="0.6" />
          </linearGradient>

          {/* Gradient for processing ring */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1d263" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B7553D" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradient for output bars */}
          <linearGradient id="outputBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f1d263" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2c3d57" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Flow paths — 4 curves from left edge to center */}
        <g className="flow-paths-group">
          {[0, 1, 2, 3].map((i) => {
            const startY = 60 + i * 50;
            return (
              <path
                key={`flow-${i}`}
                className="flow-path"
                d={`M 10 ${startY} C 60 ${startY}, 100 ${140 + (i % 2 === 0 ? -15 : 15)}, 140 140`}
                fill="none"
                stroke="url(#flowGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.6}
              />
            );
          })}
        </g>

        {/* Concentric processing ring */}
        <g className="ring-group" transform="translate(140, 140)">
          {/* Glow behind ring */}
          <circle
            className="ring-glow"
            cx="0"
            cy="0"
            r="28"
            fill="none"
            stroke="#f1d263"
            strokeWidth="8"
            opacity="0.15"
            style={{ filter: 'blur(8px)' }}
          />

          {/* Arc 1 — outer, slow */}
          <path
            className="ring-arc"
            d="M -24 0 A 24 24 0 0 1 0 -24"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Arc 2 — middle, medium speed */}
          <path
            className="ring-arc"
            d="M 0 18 A 18 18 0 0 1 -18 0"
            fill="none"
            stroke="#f1d263"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Arc 3 — inner, fast */}
          <path
            className="ring-arc"
            d="M 12 0 A 12 12 0 0 1 0 12"
            fill="none"
            stroke="#85a2a3"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Center dot */}
          <circle cx="0" cy="0" r="3" fill="#f1d263" opacity="0.7" />
        </g>

        {/* Output assembly bars — drawn on during compose phase */}
        <g className="output-bars-group">
          {[0, 1, 2].map((i) => (
            <g key={`bar-${i}`}>
              <rect
                className="output-bar"
                x="165"
                y={115 + i * 22}
                width="90"
                height="10"
                rx="0"
                fill="none"
                stroke="url(#outputBarGrad)"
                strokeWidth="1.5"
                opacity="0"
              />
              {/* Leading dot */}
              <circle
                className="output-dot"
                cx="165"
                cy={120 + i * 22}
                r="3"
                fill="#f1d263"
                opacity="0"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Layer 2: Source-specific SVG fragments */}
      {config && showFragments && (
        <svg
          viewBox={`0 0 ${config.decomposition.viewBox.width} ${config.decomposition.viewBox.height}`}
          className="absolute"
          style={{
            left: '8%',
            top: '22%',
            width: '38%',
            height: '38%',
            overflow: 'visible',
          }}
        >
          {config.decomposition.elements.map((el, i) => {
            const key = `${activeSource}-frag-${i}`;
            if (el.type === 'rect') {
              return (
                <rect
                  key={key}
                  className="tf-fragment"
                  x={Number(el.attrs.x)}
                  y={Number(el.attrs.y)}
                  width={Number(el.attrs.width)}
                  height={Number(el.attrs.height)}
                  rx={Number(el.attrs.rx ?? 0)}
                  fill={el.color}
                  opacity="0"
                  style={{ willChange: 'transform, opacity' }}
                />
              );
            }
            if (el.type === 'circle') {
              return (
                <circle
                  key={key}
                  className="tf-fragment"
                  cx={Number(el.attrs.cx)}
                  cy={Number(el.attrs.cy)}
                  r={Number(el.attrs.r)}
                  fill={el.color}
                  opacity="0"
                  style={{ willChange: 'transform, opacity' }}
                />
              );
            }
            // line
            return (
              <line
                key={key}
                className="tf-fragment"
                x1={Number(el.attrs.x1)}
                y1={Number(el.attrs.y1)}
                x2={Number(el.attrs.x2)}
                y2={Number(el.attrs.y2)}
                stroke={el.color}
                strokeWidth={Number(el.attrs.strokeWidth ?? 2)}
                opacity="0"
                style={{ willChange: 'transform, opacity' }}
              />
            );
          })}
        </svg>
      )}

      {/* Subtle phase label */}
      {phase === 'processing' && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-navy/25 tracking-[0.15em] uppercase font-medium">
          Transformation
        </span>
      )}
    </div>
  );
});
