import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type HighlightTone = 'sage' | 'yellow' | 'rust-underline' | 'sage-underline';

interface EditorialHighlightProps {
  children: ReactNode;
  className?: string;
  tone: HighlightTone;
}

const toneStyles: Record<HighlightTone, string> = {
  sage: 'bg-sage/45 px-[0.12em] -mx-[0.04em]',
  yellow: 'bg-yellow px-[0.12em] -mx-[0.04em]',
  'rust-underline': 'editorial-underline editorial-underline-rust',
  'sage-underline': 'editorial-underline editorial-underline-sage',
};

export function EditorialHighlight({
  children,
  className,
  tone,
}: EditorialHighlightProps) {
  return (
    <span className={cn('relative inline-block isolate', toneStyles[tone], className)}>
      {children}
    </span>
  );
}
