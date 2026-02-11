import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SvgDrawOptions {
  /** ScrollTrigger start position. Default: 'top 80%' */
  triggerStart?: string;
  /** Use scrub mode — ties drawing to scroll position */
  scrub?: boolean | number;
  /** Base duration for drawing a single path. Default: 0.5 */
  baseDuration?: number;
  /** Stagger between sequential paths. Default: 0.1 */
  stagger?: number;
  /** Additional timeline setup after paths are drawn */
  onAfterDraw?: (tl: gsap.core.Timeline, container: HTMLElement) => void;
}

/**
 * Core hook for animating SVG illustrations with stroke-dashoffset line drawing.
 *
 * Usage: Add `data-draw` to any SVG element you want animated.
 * Optional attributes:
 *   - `data-draw-order="N"` — lower numbers draw first (default: DOM order)
 *   - `data-draw-delay="0.2"` — extra delay in seconds
 *   - `data-glow` — element fades in after all lines are drawn
 *   - `data-ambient` — element gets continuous subtle animation (yoyo loop)
 *
 * Pattern reuses: ScrollThreadSegment.tsx stroke-dashoffset technique
 *                 + useGsapContext cleanup pattern.
 */
export function useSvgDraw(
  containerRef: React.RefObject<HTMLElement | null>,
  options: SvgDrawOptions = {}
) {
  const {
    triggerStart = 'top 80%',
    scrub = false,
    baseDuration = 0.5,
    stagger = 0.1,
    onAfterDraw,
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Collect all drawable elements
    const drawables = Array.from(
      container.querySelectorAll<SVGElement>('[data-draw]')
    );
    const glowElements = Array.from(
      container.querySelectorAll<SVGElement>('[data-glow]')
    );
    const ambientElements = Array.from(
      container.querySelectorAll<SVGElement>('[data-ambient]')
    );

    if (!drawables.length && !glowElements.length) return;

    // Sort by data-draw-order (lower first), falling back to DOM order
    drawables.sort((a, b) => {
      const orderA = parseInt(a.dataset.drawOrder ?? '999', 10);
      const orderB = parseInt(b.dataset.drawOrder ?? '999', 10);
      return orderA - orderB;
    });

    // If reduced motion: show everything in final state immediately
    if (prefersReducedMotion) {
      drawables.forEach((el) => {
        el.style.opacity = '1';
        el.style.strokeDasharray = 'none';
        el.style.strokeDashoffset = '0';
      });
      glowElements.forEach((el) => {
        el.style.opacity = el.dataset.glowOpacity ?? '0.4';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          ...(scrub
            ? { end: 'bottom 20%', scrub: typeof scrub === 'number' ? scrub : 1 }
            : { toggleActions: 'play none none none' }),
        },
      });

      // Animate each drawable path with stroke-dashoffset
      drawables.forEach((el, i) => {
        // Measure path length
        let length = 200; // fallback for non-path elements
        if ('getTotalLength' in el && typeof (el as SVGPathElement).getTotalLength === 'function') {
          length = (el as SVGPathElement).getTotalLength();
        } else if (el.tagName === 'line') {
          const line = el as unknown as SVGLineElement;
          const dx = line.x2.baseVal.value - line.x1.baseVal.value;
          const dy = line.y2.baseVal.value - line.y1.baseVal.value;
          length = Math.sqrt(dx * dx + dy * dy);
        } else if (el.tagName === 'circle') {
          const circle = el as unknown as SVGCircleElement;
          length = 2 * Math.PI * circle.r.baseVal.value;
        } else if (el.tagName === 'rect') {
          const rect = el as unknown as SVGRectElement;
          length = 2 * (rect.width.baseVal.value + rect.height.baseVal.value);
        }

        const delay = parseFloat(el.dataset.drawDelay ?? '0');

        // Set initial state
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });

        // Animate draw
        tl.to(
          el,
          {
            strokeDashoffset: 0,
            duration: baseDuration,
            ease: 'power3.out',
            delay,
          },
          i === 0 ? undefined : `-=${baseDuration - stagger}`
        );
      });

      // Glow elements fade in after all draws complete
      if (glowElements.length) {
        glowElements.forEach((el) => {
          gsap.set(el, { opacity: 0 });
        });
        tl.to(glowElements, {
          opacity: (i: number) =>
            parseFloat(glowElements[i].dataset.glowOpacity ?? '0.4'),
          duration: 0.3,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }

      // After-draw callback for custom extensions
      if (onAfterDraw) {
        onAfterDraw(tl, container);
      }

      // Ambient animations (continuous, after initial draw)
      if (ambientElements.length) {
        ambientElements.forEach((el) => {
          const ambientType = el.dataset.ambientType ?? 'pulse';

          if (ambientType === 'drift') {
            gsap.to(el, {
              y: '+=6',
              x: '+=3',
              duration: 3 + Math.random() * 2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 2,
            });
          } else {
            // pulse (default)
            gsap.to(el, {
              opacity: parseFloat(el.dataset.glowOpacity ?? '0.4') * 1.3,
              scale: 1.08,
              duration: 2.5 + Math.random() * 1.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              transformOrigin: 'center center',
            });
          }
        });
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, triggerStart, scrub, baseDuration, stagger]);
}
