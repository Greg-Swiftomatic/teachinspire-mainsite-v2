import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Word-by-word reveal with elegant mask animation
export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });
  const words = children.split(' ');

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * 0.08,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

// Blur-to-focus text reveal
export function BlurReveal({
  children,
  className,
  delay = 0,
  once = true,
}: BlurRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={
        isInView
          ? { filter: 'blur(0px)', opacity: 1 }
          : { filter: 'blur(10px)', opacity: 0 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.span>
  );
}

interface LetterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

// Letter-by-letter staggered reveal
export function LetterReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: LetterRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const letters = children.split('');

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}
