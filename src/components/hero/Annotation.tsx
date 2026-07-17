import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import './Annotation.css';

interface AnnotationProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'none';
  rotation?: number;
}

export function Annotation({
  children,
  className,
  direction = 'none',
  rotation = -2,
}: AnnotationProps) {
  const style = { '--annotation-rotation': `${rotation}deg` } as CSSProperties;

  return (
    <span className={cn('hero-annotation', className)} style={style} aria-hidden="true">
      {direction === 'left' && <AnnotationArrow direction="left" />}
      <span className="hero-annotation-text">{children}</span>
      {direction === 'right' && <AnnotationArrow direction="right" />}
    </span>
  );
}

function AnnotationArrow({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left'
    ? 'M46 4C34 6 18 8 6 16M6 16L13 12.5M6 16L12 20'
    : 'M2 4C14 6 30 8 42 16M42 16L35 12.5M42 16L36 20';

  return (
    <svg className="hero-annotation-arrow" viewBox="0 0 48 24" width="48" height="24" fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
