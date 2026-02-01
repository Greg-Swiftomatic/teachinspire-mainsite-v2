import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Self-drawing lightbulb illustration for Hero
export function LightbulbIllustration({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const drawDuration = prefersReducedMotion ? 0 : 3;
  const drawDelay = prefersReducedMotion ? 0 : 0.2;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * drawDelay,
          duration: drawDuration,
          ease: [0.16, 1, 0.3, 1] as const,
        },
        opacity: { delay: i * drawDelay, duration: 0.01 },
      },
    }),
  };

  const fillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: drawDuration + i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 400"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main lightbulb outline - wobbly hand-drawn style */}
      <motion.path
        d="M150 40 C90 40 45 90 45 150 C45 190 65 225 95 255 C105 265 110 280 110 300 L190 300 C190 280 195 265 205 255 C235 225 255 190 255 150 C255 90 210 40 150 40"
        stroke="#2c3d57"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
        style={{ filter: 'url(#wobbly)' }}
      />

      {/* Bulb base lines */}
      <motion.path
        d="M115 310 L185 310"
        stroke="#2c3d57"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={1}
      />
      <motion.path
        d="M120 325 L180 325"
        stroke="#2c3d57"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={1.5}
      />
      <motion.path
        d="M130 340 L170 340"
        stroke="#2c3d57"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={2}
      />

      {/* Screw base */}
      <motion.path
        d="M135 355 C135 365 165 365 165 355"
        stroke="#2c3d57"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={2.5}
      />

      {/* Filament inside */}
      <motion.path
        d="M130 200 Q140 180 150 200 Q160 220 170 200"
        stroke="#f1d263"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={3}
      />

      {/* Glow/rays */}
      <motion.path
        d="M150 5 L150 25"
        stroke="#f1d263"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={3.5}
      />
      <motion.path
        d="M230 60 L215 75"
        stroke="#f1d263"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={3.7}
      />
      <motion.path
        d="M70 60 L85 75"
        stroke="#f1d263"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={3.9}
      />
      <motion.path
        d="M275 150 L255 150"
        stroke="#f1d263"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={4.1}
      />
      <motion.path
        d="M25 150 L45 150"
        stroke="#f1d263"
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={4.3}
      />

      {/* Small idea sparks/stars */}
      <motion.circle
        cx="80"
        cy="100"
        r="6"
        fill="#f1d263"
        variants={fillVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
      />
      <motion.circle
        cx="220"
        cy="100"
        r="4"
        fill="#85a2a3"
        variants={fillVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={1}
      />
      <motion.circle
        cx="200"
        cy="40"
        r="5"
        fill="#B7553D"
        variants={fillVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={2}
      />

      {/* SVG filter for wobbly effect */}
      <defs>
        <filter id="wobbly">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// Doodle icon for clock/time
export function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: 'url(#wobbly-small)' }}
      />
      <path
        d="M24 14 L24 24 L32 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter id="wobbly-small">
          <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// Doodle icon for money/savings
export function CoinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 12 L24 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18 Q24 14 30 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 30 Q24 34 30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Doodle icon for balance/heart
export function HeartBalanceIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 40 L12 28 C6 22 6 14 12 10 C18 6 24 12 24 12 C24 12 30 6 36 10 C42 14 42 22 36 28 L24 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Doodle icon for growth/sprout
export function SproutIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 42 L24 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 28 Q16 24 12 16 Q20 18 24 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 22 Q32 18 36 10 Q28 14 24 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 42 L28 42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Doodle icon for confusion/frustration
export function ConfusionIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 20 Q18 14 24 14 Q30 14 30 20 Q30 24 24 26 L24 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="36" r="2" fill="currentColor" />
    </svg>
  );
}

// Doodle icon for automation/gears
export function GearsIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <path d="M20 12 L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 32 L20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20 L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 20 L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Doodle icon for personalization
export function PersonalizationIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 42 Q10 30 24 30 Q38 30 38 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 10 L38 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 4 L42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Doodle icon for steps/path
export function PathIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M8 40 Q16 32 16 24 Q16 16 24 16 Q32 16 32 24 Q32 32 40 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="40" r="3" fill="currentColor" />
      <circle cx="40" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

// Animated number counter
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(easeOut * value));

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// Decorative squiggle line
export function SquiggleLine({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 20" className={className} preserveAspectRatio="none">
      <path
        d="M0,10 Q25,2 50,10 T100,10 T150,10 T200,10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Decorative arrow
export function DoodleArrow({ className = '', direction = 'right' }: { className?: string; direction?: 'right' | 'down' | 'left' | 'up' }) {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
      fill="none"
    >
      <path
        d="M5,15 Q20,15 35,15 T50,15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M45,8 L55,15 L45,22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
