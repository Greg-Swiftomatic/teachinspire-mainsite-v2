import { useState, useCallback, useRef, useEffect } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { SourceCard } from './SourceCard';
import {
  TransformationStage,
  type TransformationStageHandle,
} from './TransformationStage';
import { OutputPreview } from './OutputPreview';
import { useTransformationTimeline } from './useTransformationTimeline';
import { sourceConfigs, sourceOrder, type SourceId } from './sourceConfigs';

type Phase = 'idle' | 'selected' | 'processing' | 'output';

const AUTO_RETURN_MS = 5000;
const MOBILE_AUTO_RETURN_MS = 4000;

export function InteractiveSourceDiagram() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const [activeSource, setActiveSource] = useState<SourceId | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');

  const stageRef = useRef<TransformationStageHandle>(null);
  const autoReturnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { play, kill } = useTransformationTimeline();

  // Clear auto-return timer
  const clearAutoReturn = useCallback(() => {
    if (autoReturnTimer.current) {
      clearTimeout(autoReturnTimer.current);
      autoReturnTimer.current = null;
    }
  }, []);

  // Reset to idle
  const resetToIdle = useCallback(() => {
    clearAutoReturn();
    kill(stageRef.current?.getContainer() ?? null);
    setActiveSource(null);
    setPhase('idle');
  }, [clearAutoReturn, kill]);

  // Schedule auto-return
  const scheduleAutoReturn = useCallback(() => {
    clearAutoReturn();
    const delay = isMobile ? MOBILE_AUTO_RETURN_MS : AUTO_RETURN_MS;
    autoReturnTimer.current = setTimeout(resetToIdle, delay);
  }, [clearAutoReturn, resetToIdle, isMobile]);

  // Handle source card click
  const handleSourceClick = useCallback(
    (sourceId: SourceId) => {
      // If clicking the already active source, reset
      if (sourceId === activeSource) {
        resetToIdle();
        return;
      }

      clearAutoReturn();

      // Kill any running timeline
      kill(stageRef.current?.getContainer() ?? null);

      setActiveSource(sourceId);
      setPhase('selected');

      if (prefersReducedMotion) {
        // Instant transition for reduced motion
        setPhase('output');
        scheduleAutoReturn();
        return;
      }

      if (isMobile) {
        // Simple transition on mobile — skip particles, go straight to output
        setTimeout(() => {
          setPhase('output');
          scheduleAutoReturn();
        }, 300);
        return;
      }

      // Desktop: run the full GSAP particle animation
      const container = stageRef.current?.getContainer();
      if (!container) {
        setPhase('output');
        scheduleAutoReturn();
        return;
      }

      // Small delay to let React render the particles before GSAP targets them
      requestAnimationFrame(() => {
        play(sourceId, container, (nextPhase) => {
          setPhase(nextPhase);
          if (nextPhase === 'output') {
            scheduleAutoReturn();
          }
        });
      });
    },
    [
      activeSource,
      clearAutoReturn,
      kill,
      play,
      prefersReducedMotion,
      isMobile,
      resetToIdle,
      scheduleAutoReturn,
    ]
  );

  // Handle Escape key to reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeSource) {
        resetToIdle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSource, resetToIdle]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAutoReturn();
      kill(stageRef.current?.getContainer() ?? null);
    };
  }, [clearAutoReturn, kill]);

  return (
    <div
      className="w-full py-8 lg:py-12"
      style={{ opacity: prefersReducedMotion && phase === 'idle' ? 1 : undefined }}
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Source cards */}
          <div className="lg:col-span-4 space-y-3">
            {sourceOrder.map((id) => (
              <SourceCard
                key={id}
                id={id}
                label={sourceConfigs[id].label}
                sublabel={sourceConfigs[id].sublabel}
                isActive={activeSource === id}
                isAnyActive={activeSource !== null}
                onClick={() => handleSourceClick(id)}
              />
            ))}
          </div>

          {/* Center: Transformation stage (hidden on mobile when in output phase) */}
          <div className={`lg:col-span-4 flex items-center justify-center py-6 lg:py-0 ${
            isMobile && phase === 'output' ? 'hidden' : ''
          }`}>
            <TransformationStage
              ref={stageRef}
              activeSource={activeSource}
              phase={phase}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Right: Output preview */}
          <div className="lg:col-span-4">
            <OutputPreview
              activeSource={activeSource}
              phase={phase}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveSourceDiagram;
