import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

// Card with mouse-following gradient glow effect — Swiss editorial version
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = '#f1d263',
  gradientOpacity = 0.1,
}: MagicCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`
    radial-gradient(
      ${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor}${Math.round(gradientOpacity * 255).toString(16).padStart(2, '0')},
      transparent 80%
    )
  `;

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-navy/10 bg-white p-8 cursor-pointer',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnable?: boolean;
}

// Swiss editorial card — no 3D tilt, clean hover
export function TiltCard({
  children,
  className,
}: TiltCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border border-navy/10 bg-white p-8 cursor-pointer transition-colors duration-200 hover:bg-cream/50',
        className
      )}
    >
      <div>{children}</div>
    </div>
  );
}

interface BorderGlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

// Card with subtle border hover — no infinite animation
export function BorderGlowCard({
  children,
  className,
}: BorderGlowCardProps) {
  return (
    <div
      className={cn(
        'relative border border-navy/10 bg-white p-8 cursor-pointer transition-colors duration-200 hover:border-navy/30',
        className
      )}
    >
      {children}
    </div>
  );
}
