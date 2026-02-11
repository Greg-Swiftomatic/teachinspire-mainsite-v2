import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export type ThreadDirection = 'curve-right' | 'curve-left' | 'straight' | 'wave';

export interface ScrollThreadSegmentProps {
  /** Start vertical position from container top (px) */
  startY: number;
  /** End vertical position from container top (px) */
  endY: number;
  /** Horizontal start offset from center (px, negative = left) */
  startX?: number;
  /** Horizontal end offset from center (px, negative = left) */
  endX?: number;
  /** Path curve style */
  direction?: ThreadDirection;
  /** Stroke color */
  color?: string;
  /** Stroke opacity */
  opacity?: number;
  /** Show dot node at start */
  startDot?: boolean;
  /** Show dot node at end */
  endDot?: boolean;
}

function buildPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  direction: ThreadDirection,
  width: number
): string {
  const midY = (startY + endY) / 2;
  const cx = width / 2;
  const sx = cx + startX;
  const ex = cx + endX;

  switch (direction) {
    case 'curve-right':
      return `M ${sx} ${startY} C ${sx + 60} ${midY}, ${ex + 60} ${midY}, ${ex} ${endY}`;
    case 'curve-left':
      return `M ${sx} ${startY} C ${sx - 60} ${midY}, ${ex - 60} ${midY}, ${ex} ${endY}`;
    case 'wave':
      return `M ${sx} ${startY} C ${sx + 40} ${startY + (endY - startY) * 0.25}, ${ex - 40} ${startY + (endY - startY) * 0.75}, ${ex} ${endY}`;
    case 'straight':
    default:
      return `M ${sx} ${startY} L ${ex} ${endY}`;
  }
}

export function ScrollThreadSegment({
  startY,
  endY,
  startX = 0,
  endX = 0,
  direction = 'straight',
  color = '#2c3d57',
  opacity = 0.08,
  startDot = false,
  endDot = false,
}: ScrollThreadSegmentProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [pathLength, setPathLength] = useState(0);

  const width = 200;
  const height = Math.abs(endY - startY);
  const localStartY = 10; // padding
  const localEndY = height - 10;
  const d = buildPath(startX, localStartY, endX, localEndY, direction, width);

  const cx = width / 2;

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    setPathLength(length);
  }, [d]);

  useEffect(() => {
    if (prefersReducedMotion || !pathRef.current || !svgRef.current || pathLength === 0) return;

    const path = pathRef.current;

    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion, pathLength]);

  if (prefersReducedMotion) return null;

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height + 20}
      viewBox={`0 0 ${width} ${height + 20}`}
      fill="none"
      className="absolute pointer-events-none"
      style={{
        top: startY,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={d}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={opacity}
        style={{
          strokeDasharray: prefersReducedMotion ? 'none' : pathLength,
          strokeDashoffset: prefersReducedMotion ? 0 : pathLength,
        }}
      />

      {startDot && (
        <circle
          cx={cx + startX}
          cy={localStartY}
          r={3}
          fill={color}
          opacity={opacity * 1.5}
        />
      )}

      {endDot && (
        <circle
          cx={cx + endX}
          cy={localEndY}
          r={3}
          fill={color}
          opacity={opacity * 1.5}
        />
      )}
    </svg>
  );
}
