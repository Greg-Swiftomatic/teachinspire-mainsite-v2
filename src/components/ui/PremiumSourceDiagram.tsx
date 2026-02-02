import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Source data
const sources = [
  {
    id: 'video',
    label: 'Interview YouTube',
    sublabel: 'sur le secteur de votre apprenant',
  },
  {
    id: 'podcast',
    label: 'Podcast',
    sublabel: 'sur sa passion',
  },
  {
    id: 'article',
    label: 'Article technique',
    sublabel: 'de son domaine',
  },
  {
    id: 'report',
    label: 'Rapport annuel',
    sublabel: 'de son entreprise',
  },
];

export function PremiumSourceDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline for the entire animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate source cards
      tl.fromTo(
        '.source-card',
        {
          opacity: 0,
          x: -40,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // Animate flow lines
      tl.fromTo(
        '.flow-line',
        {
          strokeDashoffset: 200,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.inOut',
        },
        '-=0.3'
      );

      // Animate convergence point
      tl.fromTo(
        '.convergence-point',
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      );

      // Animate output arrow
      tl.fromTo(
        '.output-arrow',
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.1'
      );

      // Animate output card
      tl.fromTo(
        '.output-card',
        {
          opacity: 0,
          x: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      // Subtle pulse on the output icon
      gsap.to('.output-glow', {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full py-8 lg:py-12"
      style={{ opacity: prefersReducedMotion ? 1 : undefined }}
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Grid layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Left: Sources */}
          <div className="col-span-12 lg:col-span-4 space-y-3">
            {sources.map((source) => (
              <div
                key={source.id}
                className="source-card group"
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
                style={{ opacity: prefersReducedMotion ? 1 : undefined }}
              >
                <div
                  className={`
                    flex items-center gap-4 p-4
                    bg-white border border-navy/10
                    transition-all duration-300 ease-out
                    ${hoveredSource === source.id ? 'border-navy/30 shadow-lg -translate-y-0.5' : 'shadow-sm'}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      flex-shrink-0 w-12 h-12 flex items-center justify-center
                      transition-all duration-300
                      ${hoveredSource === source.id ? 'scale-110' : ''}
                    `}
                  >
                    <SourceIcon type={source.id} isHovered={hoveredSource === source.id} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{source.label}</p>
                    <p className="text-xs text-navy/50 truncate">{source.sublabel}</p>
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className={`
                      flex-shrink-0 w-6 h-6 flex items-center justify-center
                      text-navy/30 transition-all duration-300
                      ${hoveredSource === source.id ? 'text-rust translate-x-1' : ''}
                    `}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center: Flow visualization */}
          <div className="col-span-12 lg:col-span-4 flex items-center justify-center py-8 lg:py-0">
            <FlowVisualization prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* Right: Output */}
          <div className="col-span-12 lg:col-span-4">
            <div
              className="output-card bg-navy text-cream p-6 lg:p-8 relative overflow-hidden"
              style={{ opacity: prefersReducedMotion ? 1 : undefined }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-50" />

              {/* Glow effect */}
              <div
                className="output-glow absolute -top-10 -right-10 w-40 h-40 bg-yellow/20 rounded-full blur-3xl"
                style={{ opacity: prefersReducedMotion ? 0.3 : undefined }}
              />

              <div className="relative z-10">
                {/* Output icon */}
                <div className="w-16 h-16 mb-6 relative">
                  <OutputIcon />
                </div>

                {/* Label */}
                <div className="space-y-2">
                  <p className="text-xs font-medium tracking-widest uppercase text-cream/50">
                    Résultat
                  </p>
                  <h3 className="text-xl lg:text-2xl font-display font-semibold text-cream leading-tight">
                    Un cours parfaitement adapté
                  </h3>
                  <p className="text-sm text-cream/60">
                    Personnalisé au profil de votre apprenant
                  </p>
                </div>

                {/* Quality badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-yellow/20 rounded-sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-yellow"
                  >
                    <path
                      d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-xs font-medium text-yellow">
                    Qualité professionnelle
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Flow visualization component
function FlowVisualization({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <div className="relative w-full max-w-[200px] lg:max-w-[240px]">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        {/* Definitions for gradients */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#85a2a3" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#2c3d57" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2c3d57" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Flow lines - curved paths converging */}
        {[0, 1, 2, 3].map((i) => {
          const startY = 25 + i * 50;
          const controlX1 = 60;
          const controlY1 = startY;
          const controlX2 = 120;
          const controlY2 = 100;
          const endX = 150;
          const endY = 100;

          return (
            <path
              key={i}
              className="flow-line"
              d={`M 10 ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="200"
              style={{
                opacity: prefersReducedMotion ? 1 : undefined,
                strokeDashoffset: prefersReducedMotion ? 0 : undefined,
              }}
            />
          );
        })}

        {/* Convergence point */}
        <g
          className="convergence-point"
          style={{ opacity: prefersReducedMotion ? 1 : undefined }}
        >
          {/* Outer glow */}
          <circle cx="150" cy="100" r="20" fill="#f1d263" opacity="0.2" filter="url(#glow)" />
          {/* Inner circle */}
          <circle cx="150" cy="100" r="12" fill="#f1d263" />
          {/* Center icon - merge symbol */}
          <path
            d="M145 100h10M150 95v10"
            stroke="#2c3d57"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Output arrow */}
        <g
          className="output-arrow"
          style={{
            transformOrigin: '160px 100px',
            opacity: prefersReducedMotion ? 1 : undefined,
          }}
        >
          <line
            x1="165"
            y1="100"
            x2="190"
            y2="100"
            stroke="#2c3d57"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon points="188,95 198,100 188,105" fill="#2c3d57" />
        </g>
      </svg>

      {/* Decorative dots */}
      <div className="absolute top-1/2 left-0 w-2 h-2 bg-sage/50 rounded-full -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-2 h-2 bg-navy rounded-full -translate-y-1/2" />
    </div>
  );
}

// Source icons - clean, minimal style
function SourceIcon({ type, isHovered }: { type: string; isHovered: boolean }) {
  const baseColor = isHovered ? '#B7553D' : '#2c3d57';
  const bgColor = isHovered ? '#B7553D10' : '#85a2a320';

  return (
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {type === 'video' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke={baseColor}
            strokeWidth="1.5"
          />
          <path d="M10 9l5 3-5 3V9z" fill={baseColor} />
        </svg>
      )}
      {type === 'podcast' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="9"
            y="3"
            width="6"
            height="10"
            rx="3"
            stroke={baseColor}
            strokeWidth="1.5"
          />
          <path
            d="M5 11v1a7 7 0 0014 0v-1"
            stroke={baseColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 18v3M9 21h6"
            stroke={baseColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'article' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="3"
            width="16"
            height="18"
            rx="2"
            stroke={baseColor}
            strokeWidth="1.5"
          />
          <path
            d="M8 7h8M8 11h8M8 15h5"
            stroke={baseColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'report' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke={baseColor}
            strokeWidth="1.5"
          />
          <path d="M7 14v2M11 11v5M15 8v8" stroke={baseColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

// Output icon - book with sparkle
function OutputIcon() {
  return (
    <div className="relative">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        {/* Book */}
        <path
          d="M12 16v36c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4H16c-2.2 0-4 1.8-4 4z"
          fill="#F4F3F0"
          stroke="#2c3d57"
          strokeWidth="2"
        />
        {/* Book spine */}
        <path d="M20 12v44" stroke="#2c3d57" strokeWidth="2" />
        {/* Page lines */}
        <path
          d="M26 24h20M26 32h20M26 40h12"
          stroke="#2c3d57"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Sparkle */}
        <path
          d="M48 8l1.5 3.5L53 13l-3.5 1.5L48 18l-1.5-3.5L43 13l3.5-1.5L48 8z"
          fill="#f1d263"
        />
      </svg>
    </div>
  );
}

export default PremiumSourceDiagram;
