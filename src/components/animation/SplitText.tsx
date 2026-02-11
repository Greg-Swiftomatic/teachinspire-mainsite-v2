import { type ElementType, useMemo } from 'react';
import { cn } from '../../lib/utils';

export interface SplitTextProps {
  children: string;
  as?: ElementType;
  split?: 'words' | 'chars';
  className?: string;
}

/**
 * DOM utility — splits text into <span> words/chars for GSAP animation targeting.
 * No animation built in. Screen readers see the container as one text block via role="text".
 *
 * Each word gets: data-word-index, class "split-word", wrapped in overflow-hidden mask.
 * Each char gets: data-char-index, class "split-char", wrapped in overflow-hidden mask.
 */
export function SplitText({
  children,
  as: Tag = 'span',
  split = 'words',
  className,
}: SplitTextProps) {
  const elements = useMemo(() => {
    if (split === 'chars') {
      return children.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="split-char inline-block"
            data-char-index={i}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ));
    }

    // split === 'words'
    const words = children.split(/(\s+)/);
    let wordIndex = 0;

    return words.map((segment, i) => {
      // Whitespace segments render as-is
      if (/^\s+$/.test(segment)) {
        return <span key={`ws-${i}`}>{' '}</span>;
      }

      const idx = wordIndex++;
      return (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="split-word inline-block"
            data-word-index={idx}
          >
            {segment}
          </span>
        </span>
      );
    });
  }, [children, split]);

  return (
    <Tag className={cn('inline', className)} role="text">
      {elements}
    </Tag>
  );
}
