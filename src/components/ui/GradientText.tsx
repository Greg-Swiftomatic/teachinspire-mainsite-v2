import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

// Animated gradient text with smooth color transitions
export function GradientText({
  children,
  className,
  colors = ['#f1d263', '#85a2a3', '#f1d263'],
  animationSpeed = 3,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `gradient ${animationSpeed}s ease-in-out infinite`,
  };

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0%, 100% { background-position: 0% center; }
            50% { background-position: 100% center; }
          }
        `}
      </style>
      <span className={cn('inline-block', className)} style={gradientStyle}>
        {children}
      </span>
    </>
  );
}

interface ShimmerTextProps {
  children: string;
  className?: string;
  shimmerWidth?: number;
}

// Shimmer effect on text
export function ShimmerText({
  children,
  className,
  shimmerWidth = 100,
}: ShimmerTextProps) {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -${shimmerWidth}% 0; }
            100% { background-position: ${shimmerWidth}% 0; }
          }
        `}
      </style>
      <span
        className={cn('inline-block', className)}
        style={{
          background: `linear-gradient(
            90deg,
            #2c3d57 0%,
            #2c3d57 40%,
            #f1d263 50%,
            #2c3d57 60%,
            #2c3d57 100%
          )`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 3s linear infinite',
        }}
      >
        {children}
      </span>
    </>
  );
}

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
  delay?: number;
}

// Text with animated underline highlight
export function HighlightText({
  children,
  className,
  highlightColor = '#f1d263',
  delay = 0,
}: HighlightTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[0.15em] w-full origin-left"
        style={{ backgroundColor: highlightColor }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      />
    </span>
  );
}
