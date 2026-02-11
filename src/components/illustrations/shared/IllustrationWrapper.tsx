import type { ReactNode } from 'react';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface IllustrationWrapperProps {
  children: ReactNode;
  className?: string;
  /** Hide below this breakpoint (default 1024) */
  hideBelow?: number;
  /** Accessible label describing the illustration for screen readers */
  label?: string;
}

/**
 * Shared wrapper for all contemplative illustrations.
 * - Hidden on mobile (below hideBelow breakpoint)
 * - aria-hidden for screen readers (decorative)
 * - pointer-events-none so it never interferes with interactive elements
 * - On reduced motion: renders children in final state (no animation)
 */
export function IllustrationWrapper({
  children,
  className = '',
  hideBelow = 1024,
  label,
}: IllustrationWrapperProps) {
  const isMobile = useIsMobile(hideBelow);
  const prefersReducedMotion = useReducedMotion();

  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      aria-label={label}
      className={`pointer-events-none select-none ${className}`}
      data-reduced-motion={prefersReducedMotion ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
