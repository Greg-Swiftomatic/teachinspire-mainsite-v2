import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HandDrawnButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'rust';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function HandDrawnButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: HandDrawnButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-colors duration-200 relative overflow-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

  const variants = {
    primary:
      'bg-yellow text-navy hover:bg-yellow/90 shadow-lg hover:shadow-xl',
    secondary:
      'bg-transparent border-2 border-navy text-navy hover:bg-navy hover:text-cream',
    rust:
      'bg-rust text-cream hover:bg-rust-dark shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const borderRadii = {
    sm: '10px 8px 12px 6px',
    md: '14px 10px 16px 8px',
    lg: '16px 12px 18px 10px',
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;

  // Hand-drawn border path
  const BorderSVG = () => (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ left: '-4px', top: '-4px', width: 'calc(100% + 8px)', height: 'calc(100% + 8px)' }}
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      <motion.rect
        x="2"
        y="2"
        width="calc(100% - 4px)"
        height="calc(100% - 4px)"
        rx="12"
        ry="12"
        fill="none"
        stroke={variant === 'primary' ? '#2c3d57' : variant === 'rust' ? '#8B3D2B' : '#2c3d57'}
        strokeWidth="2"
        strokeDasharray="8 4"
        initial={{ pathLength: 0, rotate: 0 }}
        whileHover={{
          pathLength: 1,
          rotate: prefersReducedMotion ? 0 : -1,
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          filter: 'url(#hand-drawn-filter)',
        }}
      />
      <defs>
        <filter id="hand-drawn-filter">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </motion.svg>
  );

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      className={styles}
      style={{ borderRadius: borderRadii[size] }}
      whileHover={{ y: prefersReducedMotion ? 0 : -2, scale: prefersReducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <BorderSVG />
      <span className="relative z-10">{children}</span>
    </MotionComponent>
  );
}
