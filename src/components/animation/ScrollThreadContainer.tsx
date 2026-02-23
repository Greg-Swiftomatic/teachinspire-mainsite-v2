import { useRef, useEffect, useState, type ReactNode } from 'react';
import { ScrollThreadSegment, type ScrollThreadSegmentProps } from './ScrollThreadSegment';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const NAVY = '#2c3d57';
const CREAM = '#f8f7f2';

export interface ThreadConfig extends Omit<ScrollThreadSegmentProps, 'startY' | 'endY'> {
  /** Index of the section where this segment starts (0-based) */
  fromSection: number;
  /** Index of the section where this segment ends (0-based) */
  toSection: number;
}

type PagePreset = 'homepage' | 'formation' | 'about';

const pageThreads: Record<PagePreset, Omit<ThreadConfig, 'startY' | 'endY'>[]> = {
  homepage: [
    // Hero -> Problem
    { fromSection: 0, toSection: 1, direction: 'curve-right', startX: 20, endX: -15, startDot: true, endDot: true, color: NAVY },
    // Problem -> Possibility
    { fromSection: 1, toSection: 2, direction: 'curve-left', startX: -15, endX: 10, endDot: true, color: NAVY },
    // Possibility -> Approach
    { fromSection: 2, toSection: 3, direction: 'wave', startX: 10, endX: -20, endDot: true, color: NAVY },
    // Approach -> Modules
    { fromSection: 3, toSection: 4, direction: 'curve-left', startX: -20, endX: -25, endDot: true, color: NAVY },
    // Modules -> Results
    { fromSection: 4, toSection: 5, direction: 'straight', startX: -25, endX: 15, endDot: true, color: NAVY },
    // Results -> Philosophy (color changes to cream for dark bg)
    { fromSection: 5, toSection: 6, direction: 'curve-right', startX: 15, endX: 0, endDot: true, color: NAVY, opacity: 0.06 },
    // Philosophy -> Founder (cream to navy transition)
    { fromSection: 6, toSection: 7, direction: 'curve-left', startX: 0, endX: -10, startDot: false, endDot: true, color: CREAM, opacity: 0.06 },
    // Founder -> FinalCTA (terminates)
    { fromSection: 7, toSection: 8, direction: 'straight', startX: -10, endX: 0, endDot: true, color: NAVY, opacity: 0.06 },
  ],

  formation: [
    // Hero -> ForWho
    { fromSection: 0, toSection: 1, direction: 'curve-right', startX: 15, endX: -10, startDot: true, endDot: true, color: NAVY },
    // ForWho -> Promise
    { fromSection: 1, toSection: 2, direction: 'curve-left', startX: -10, endX: 10, endDot: true, color: NAVY },
    // Promise -> Modules
    { fromSection: 2, toSection: 3, direction: 'straight', startX: 10, endX: -15, endDot: true, color: NAVY },
    // Modules -> Inclusions
    { fromSection: 3, toSection: 4, direction: 'wave', startX: -15, endX: 10, endDot: true, color: NAVY },
    // Skip to CTA (navy bg)
    { fromSection: 7, toSection: 8, direction: 'straight', startX: 0, endX: 0, endDot: true, color: NAVY, opacity: 0.06 },
  ],

  about: [
    // Hero -> WhoAmI
    { fromSection: 0, toSection: 1, direction: 'curve-right', startX: 10, endX: -15, startDot: true, endDot: true, color: NAVY },
    // WhoAmI -> Declic
    { fromSection: 1, toSection: 2, direction: 'curve-left', startX: -15, endX: 10, endDot: true, color: NAVY },
    // Declic -> Birth
    { fromSection: 2, toSection: 3, direction: 'wave', startX: 10, endX: -10, endDot: true, color: NAVY },
    // Birth -> Timeline
    { fromSection: 3, toSection: 4, direction: 'curve-right', startX: -10, endX: 15, endDot: true, color: NAVY },
    // Timeline -> Philosophy
    { fromSection: 4, toSection: 5, direction: 'curve-left', startX: 15, endX: -10, endDot: true, color: NAVY },
    // Philosophy -> CTA
    { fromSection: 5, toSection: 6, direction: 'straight', startX: -10, endX: 0, endDot: true, color: NAVY, opacity: 0.06 },
  ],
};

interface ScrollThreadContainerProps {
  preset: PagePreset;
  children: ReactNode;
}

/**
 * Page-level overlay container holding all thread segments.
 * Wraps the page content and positions SVG segments between sections.
 * Desktop only (hidden on mobile via CSS).
 */
export function ScrollThreadContainer({ preset, children }: ScrollThreadContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [sectionOffsets, setSectionOffsets] = useState<{ top: number; height: number }[]>([]);

  // Measure section positions
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const sections = container.querySelectorAll(':scope > section');
      const containerRect = container.getBoundingClientRect();

      const offsets = Array.from(sections).map((section) => {
        const rect = section.getBoundingClientRect();
        return {
          top: rect.top - containerRect.top,
          height: rect.height,
        };
      });

      setSectionOffsets(offsets);
    };

    // Measure after layout settles
    const timer = setTimeout(measure, 100);

    // Re-measure on resize
    window.addEventListener('resize', measure);
    window.addEventListener('scroll-thread:remeasure', measure);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll-thread:remeasure', measure);
    };
  }, [prefersReducedMotion]);

  const threads = pageThreads[preset] ?? [];

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Thread overlay — desktop only */}
      {!prefersReducedMotion && sectionOffsets.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-[1] hidden lg:block" aria-hidden="true">
          {threads.map((thread, i) => {
            const fromSection = sectionOffsets[thread.fromSection];
            const toSection = sectionOffsets[thread.toSection];

            if (!fromSection || !toSection) return null;

            const startY = fromSection.top + fromSection.height;
            const endY = toSection.top;

            // Only render if there's meaningful gap
            if (endY - startY < 20) return null;

            return (
              <ScrollThreadSegment
                key={`thread-${preset}-${i}`}
                startY={startY}
                endY={endY}
                startX={thread.startX}
                endX={thread.endX}
                direction={thread.direction}
                color={thread.color}
                opacity={thread.opacity}
                startDot={thread.startDot}
                endDot={thread.endDot}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
