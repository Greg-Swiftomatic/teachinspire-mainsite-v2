import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export type GeometricShape = 'circle' | 'line' | 'rectangle' | 'cross' | 'dot-grid' | 'arc';
export type AnimationType = 'parallax' | 'rotate' | 'ambient';

export interface GeometricAccentProps {
  shape: GeometricShape;
  size?: number;
  color?: string;
  opacity?: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  animation?: {
    type: AnimationType;
    speed?: number;
    range?: number;
  };
  className?: string;
  /** Stroke width for SVG shapes */
  strokeWidth?: number;
}

// Shape renderers (stroke-only, editorial style)
function renderShape(shape: GeometricShape, size: number, color: string, strokeWidth: number) {
  const half = size / 2;

  switch (shape) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle cx={half} cy={half} r={half - strokeWidth} stroke={color} strokeWidth={strokeWidth} />
        </svg>
      );

    case 'line':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <line x1="0" y1={half} x2={size} y2={half} stroke={color} strokeWidth={strokeWidth} />
        </svg>
      );

    case 'rectangle':
      return (
        <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`} fill="none">
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={size - strokeWidth}
            height={size * 0.6 - strokeWidth}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </svg>
      );

    case 'cross':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <line x1={half} y1={size * 0.15} x2={half} y2={size * 0.85} stroke={color} strokeWidth={strokeWidth} />
          <line x1={size * 0.15} y1={half} x2={size * 0.85} y2={half} stroke={color} strokeWidth={strokeWidth} />
        </svg>
      );

    case 'dot-grid': {
      const cols = 4;
      const rows = 4;
      const gap = size / (cols + 1);
      const dotR = strokeWidth * 0.8;

      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          {Array.from({ length: rows * cols }).map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            return (
              <circle
                key={i}
                cx={gap + col * gap}
                cy={gap + row * gap}
                r={dotR}
                fill={color}
              />
            );
          })}
        </svg>
      );
    }

    case 'arc':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M ${size * 0.1} ${size * 0.8} Q ${half} ${size * -0.1} ${size * 0.9} ${size * 0.8}`}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function GeometricAccent({
  shape,
  size = 120,
  color = '#2c3d57',
  opacity = 0.08,
  position,
  animation = { type: 'parallax', speed: 30 },
  className,
  strokeWidth = 1.5,
}: GeometricAccentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Mobile: reduce size by 30%
  const effectiveSize = isMobile ? Math.round(size * 0.7) : size;

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    // Mobile: simple fade only, no parallax
    if (isMobile) return;

    const el = ref.current;
    const { type, speed = 30, range = 360 } = animation;
    let ctx: gsap.Context;

    switch (type) {
      case 'parallax':
        ctx = gsap.context(() => {
          gsap.to(el, {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
        break;

      case 'rotate':
        ctx = gsap.context(() => {
          gsap.to(el, {
            rotation: range,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
        break;

      case 'ambient':
        ctx = gsap.context(() => {
          gsap.to(el, {
            y: speed * 0.3,
            rotation: range * 0.05,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
        break;
    }

    return () => ctx?.revert();
  }, [prefersReducedMotion, isMobile, animation.type, animation.speed, animation.range]);

  return (
    <div
      ref={ref}
      className={cn('absolute pointer-events-none z-0', className)}
      style={{
        ...position,
        opacity,
        willChange: prefersReducedMotion || isMobile ? 'auto' : 'transform',
      }}
      aria-hidden="true"
    >
      {renderShape(shape, effectiveSize, color, strokeWidth)}
    </div>
  );
}
