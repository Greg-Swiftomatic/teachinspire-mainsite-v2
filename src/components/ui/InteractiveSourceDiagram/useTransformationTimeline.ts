import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import type { SourceId } from './sourceConfigs';
import { sourceConfigs } from './sourceConfigs';

/**
 * Factory hook that creates, plays, and cleans up GSAP timelines
 * for the premium source → lesson transformation animation.
 *
 * 4-phase structure:
 *   1. Decompose  — source SVG fragments appear + break apart
 *   2. Transit    — fragments travel curved paths toward center ring
 *   3. Compose    — output bars draw on from center rightward
 *   4. Settle     — ring returns to idle, handoff to OutputPreview
 */
export function useTransformationTimeline() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const kill = useCallback((container: HTMLElement | null) => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (container) {
      // Reset all animated elements
      gsap.set(container.querySelectorAll('.tf-fragment'), {
        clearProps: 'all',
      });
      gsap.set(container.querySelectorAll('.output-bar'), {
        clearProps: 'all',
        opacity: 0,
      });
      gsap.set(container.querySelectorAll('.output-dot'), {
        clearProps: 'all',
        opacity: 0,
      });
    }
  }, []);

  const play = useCallback(
    (
      sourceId: SourceId,
      container: HTMLElement,
      onPhaseChange: (phase: 'processing' | 'output') => void
    ): Promise<void> => {
      kill(container);

      const config = sourceConfigs[sourceId];
      const fragments = container.querySelectorAll('.tf-fragment');
      const ringArcs = container.querySelectorAll('.ring-arc');
      const ringGlow = container.querySelector('.ring-glow');
      const outputBars = container.querySelectorAll('.output-bar');
      const outputDots = container.querySelectorAll('.output-dot');
      const flowPaths = container.querySelectorAll('.flow-path');

      if (!fragments.length) return Promise.resolve();

      const tl = gsap.timeline({
        onComplete: () => onPhaseChange('output'),
      });
      tlRef.current = tl;

      // ========================================
      // Phase 1 — DECOMPOSE (0 → 0.6s)
      // Fragments appear in assembled formation,
      // then break apart with source-specific motion.
      // ========================================

      // Fragments fade in with slight scale
      tl.fromTo(
        fragments,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: 'power2.out',
        }
      );

      // Source-specific breakapart
      const breakapartOffsets = getBreakApartOffsets(sourceId, config.decomposition.elements.length);
      tl.to(fragments, {
        x: (i: number) => breakapartOffsets[i]?.dx ?? 0,
        y: (i: number) => breakapartOffsets[i]?.dy ?? 0,
        rotation: (i: number) => breakapartOffsets[i]?.rot ?? 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.out',
      });

      // Flow paths glow brighter during decompose
      tl.to(
        flowPaths,
        { opacity: 0.9, duration: 0.3, ease: 'power2.out' },
        '-=0.3'
      );

      // ========================================
      // Phase 2 — TRANSIT (0.6 → 1.4s)
      // Fragments travel curved paths toward center ring.
      // Ring arcs speed up. Fragments shrink + color-shift.
      // ========================================

      onPhaseChange('processing');

      // Speed up ring rotation
      tl.to(ringArcs, {
        rotation: '+=180',
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
      });

      // Fragments move toward center with curved trajectories
      tl.to(
        fragments,
        {
          // Curved path: move rightward and toward vertical center
          x: (i: number) => {
            const baseX = 80 + i * 5; // converge toward center-right
            return baseX + Math.sin(i * 1.2) * 8; // slight wave
          },
          y: (i: number) => {
            const targetY = 0; // center
            const currentOffset = breakapartOffsets[i]?.dy ?? 0;
            return targetY - currentOffset * 0.3;
          },
          scale: 0.3,
          opacity: 0.4,
          rotation: (i: number) => (i % 2 === 0 ? 15 : -15),
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.inOut',
        },
        '-=0.6'
      );

      // Ring glow pulses on arrival
      if (ringGlow) {
        tl.to(ringGlow, {
          opacity: 0.7,
          scale: 1.4,
          duration: 0.3,
          ease: 'power2.out',
        });
        tl.to(ringGlow, {
          opacity: 0.2,
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }

      // Fade out fragments as they reach the ring
      tl.to(
        fragments,
        {
          opacity: 0,
          scale: 0.1,
          duration: 0.2,
          stagger: 0.02,
          ease: 'power2.in',
        },
        '-=0.4'
      );

      // ========================================
      // Phase 3 — COMPOSE (1.4 → 2.2s)
      // Output bars draw on rightward from center.
      // Leading dots travel along each bar.
      // ========================================

      // Output bars appear with stroke-dashoffset draw-on effect
      outputBars.forEach((bar, i) => {
        const width = 90;
        tl.set(bar, {
          strokeDasharray: width,
          strokeDashoffset: width,
          opacity: 1,
        }, i === 0 ? undefined : undefined);

        tl.to(bar, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: 'power2.out',
        }, `-=${i > 0 ? 0.2 : 0}`);
      });

      // Leading dots travel along bars
      outputDots.forEach((dot) => {
        tl.fromTo(
          dot,
          { cx: 165, opacity: 0 },
          {
            cx: 255,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          `-=${outputDots.length > 1 ? 0.25 : 0}`
        );
        // Dot fades at end of bar
        tl.to(dot, {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in',
        }, `-=0.1`);
      });

      // Fill bars after stroke draws
      tl.to(outputBars, {
        fill: 'rgba(241, 210, 99, 0.08)',
        duration: 0.2,
        stagger: 0.06,
        ease: 'power2.out',
      });

      // ========================================
      // Phase 4 — SETTLE (2.2 → 2.5s)
      // Ring returns to normal, flow paths dim.
      // OutputPreview component takes over.
      // ========================================

      // Dim flow paths back to idle
      tl.to(flowPaths, {
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      // Fade out output bars (OutputPreview takes over)
      tl.to(
        [outputBars, outputDots],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      );

      return new Promise((resolve) => {
        tl.eventCallback('onComplete', () => resolve());
      });
    },
    [kill]
  );

  return { play, kill };
}

/**
 * Source-specific breakapart offsets for Phase 1.
 * Each source type has a characteristic decomposition pattern.
 */
interface BreakOffset {
  dx: number;
  dy: number;
  rot: number;
}

function getBreakApartOffsets(
  sourceId: SourceId,
  count: number
): BreakOffset[] {
  switch (sourceId) {
    case 'video':
      // Filmstrip frames slide out + slight rotation
      return Array.from({ length: count }, (_, i) => ({
        dx: (i % 3 - 1) * 12 + (Math.random() - 0.5) * 6,
        dy: (Math.floor(i / 3) - 0.5) * 14,
        rot: (i % 2 === 0 ? 1 : -1) * (5 + i * 2),
      }));

    case 'podcast':
      // Waveform bars scatter horizontally
      return Array.from({ length: count }, (_, i) => ({
        dx: (i - count / 2) * 4 + (Math.random() - 0.5) * 8,
        dy: (Math.random() - 0.5) * 20,
        rot: (Math.random() - 0.5) * 10,
      }));

    case 'article':
      // Text lines split vertically apart
      return Array.from({ length: count }, (_, i) => ({
        dx: (Math.random() - 0.5) * 10,
        dy: (i - count / 2) * 10,
        rot: 0, // text stays horizontal
      }));

    case 'report':
      // Chart columns collapse down then scatter
      return Array.from({ length: count }, (_, i) => ({
        dx: (i - count / 2) * 8,
        dy: 15 + Math.random() * 10,
        rot: (Math.random() - 0.5) * 15,
      }));
  }
}
