import { useRef, useEffect, useMemo, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export type KineticVariant =
  | 'cascade'
  | 'word-reveal'
  | 'slide-from-sides'
  | 'assemble'
  | 'counter-roll'
  | 'typewriter';

export interface KineticHeadingProps {
  children: string;
  variant?: KineticVariant;
  as?: ElementType;
  /** Indices of words to highlight (0-based). These receive the highlightClassName. */
  highlightWords?: number[];
  /** CSS class for highlighted words. Defaults to "text-rust". */
  highlightClassName?: string;
  delay?: number;
  className?: string;
  /** ScrollTrigger start position. Defaults to 'top 80%'. */
  triggerStart?: string;
}

/**
 * Animated heading with 6 GSAP-powered variants.
 * Uses SplitText-style DOM splitting internally.
 * Respects prefers-reduced-motion and simplifies on mobile.
 */
export function KineticHeading({
  children,
  variant = 'cascade',
  as: Tag = 'h2',
  highlightWords,
  highlightClassName = 'text-rust',
  delay = 0,
  className,
  triggerStart = 'top 80%',
}: KineticHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // On mobile, simplify complex variants to cascade
  const effectiveVariant = useMemo(() => {
    if (isMobile && (variant === 'assemble' || variant === 'slide-from-sides')) {
      return 'cascade';
    }
    return variant;
  }, [variant, isMobile]);

  // Split mode: chars for typewriter, words for everything else
  const splitMode = effectiveVariant === 'typewriter' ? 'chars' : 'words';

  // Parse text into segments
  const segments = useMemo(() => {
    if (splitMode === 'chars') {
      return children.split('').map((char, i) => ({
        text: char === ' ' ? '\u00A0' : char,
        index: i,
        isHighlight: false,
      }));
    }

    const words = children.split(/\s+/);
    return words.map((word, i) => ({
      text: word,
      index: i,
      isHighlight: highlightWords?.includes(i) ?? false,
    }));
  }, [children, splitMode, highlightWords]);

  // GSAP animation
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const selector = splitMode === 'chars' ? '.k-char' : '.k-word';
    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      });

      switch (effectiveVariant) {
        case 'cascade':
          gsap.set(elements, { y: '110%', opacity: 0 });
          tl.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            delay,
          });
          break;

        case 'word-reveal':
          gsap.set(elements, { opacity: 0, filter: 'blur(4px)' });
          tl.to(elements, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            delay,
          });
          break;

        case 'slide-from-sides':
          elements.forEach((el, i) => {
            const fromX = i % 2 === 0 ? -60 : 60;
            gsap.set(el, { x: fromX, opacity: 0 });
          });
          tl.to(elements, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            delay,
          });
          break;

        case 'assemble':
          elements.forEach((el) => {
            gsap.set(el, {
              x: (Math.random() - 0.5) * 120,
              y: (Math.random() - 0.5) * 80,
              rotation: (Math.random() - 0.5) * 20,
              opacity: 0,
            });
          });
          tl.to(elements, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
            delay,
          });
          break;

        case 'counter-roll': {
          // Numbers roll odometer-style, text fades normally
          const numberEls: Element[] = [];
          const textEls: Element[] = [];

          elements.forEach((el) => {
            if (/\d/.test(el.textContent || '')) {
              numberEls.push(el);
            } else {
              textEls.push(el);
            }
          });

          // Text: simple fade up
          if (textEls.length > 0) {
            gsap.set(textEls, { y: '110%', opacity: 0 });
            tl.to(textEls, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
              delay,
            });
          }

          // Numbers: roll from top
          if (numberEls.length > 0) {
            gsap.set(numberEls, { y: '-110%', opacity: 0 });
            tl.to(
              numberEls,
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: 'back.out(1.2)',
                delay,
              },
              '<'
            );
          }
          break;
        }

        case 'typewriter':
          gsap.set(elements, { opacity: 0 });
          tl.to(elements, {
            opacity: 1,
            duration: 0.02,
            stagger: 0.03,
            ease: 'none',
            delay,
          });
          break;
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, effectiveVariant, splitMode, delay, triggerStart]);

  // Reduced motion: render final state without splitting
  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {highlightWords && highlightWords.length > 0
          ? children.split(/\s+/).map((word, i) => (
              <span key={i}>
                {i > 0 && ' '}
                <span className={highlightWords.includes(i) ? highlightClassName : undefined}>
                  {word}
                </span>
              </span>
            ))
          : children}
      </Tag>
    );
  }

  return (
    <div ref={containerRef}>
      <Tag className={className} role="text">
        {splitMode === 'chars'
          ? segments.map((seg, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="k-char inline-block">{seg.text}</span>
              </span>
            ))
          : segments.map((seg, i) => (
              <span key={i}>
                {i > 0 && ' '}
                <span className="inline-block overflow-hidden">
                  <span
                    className={cn(
                      'k-word inline-block',
                      seg.isHighlight && highlightClassName
                    )}
                  >
                    {seg.text}
                  </span>
                </span>
              </span>
            ))}
        {/* Typewriter cursor */}
        {effectiveVariant === 'typewriter' && (
          <span className="k-cursor inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse" aria-hidden="true" />
        )}
      </Tag>
    </div>
  );
}
