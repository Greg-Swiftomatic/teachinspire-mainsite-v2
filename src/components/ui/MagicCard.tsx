import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

// Card with mouse-following gradient glow effect
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = '#f1d263',
  gradientOpacity = 0.15,
}: MagicCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl border border-navy/10 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg',
        className
      )}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnable?: boolean;
}

// 3D tilt effect card
export function TiltCard({
  children,
  className,
  tiltAmount = 10,
  glareEnable = true,
}: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -tiltAmount;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * tiltAmount;
    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl border border-navy/10 bg-white p-8 shadow-sm',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: x,
        rotateY: y,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {glareEnable && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity"
          style={{
            opacity: useMotionTemplate`${x}` ? 0.3 : 0,
          }}
        />
      )}
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}

interface BorderGlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

// Card with animated border glow
export function BorderGlowCard({
  children,
  className,
  glowColor = '#f1d263',
}: BorderGlowCardProps) {
  return (
    <div className={cn('group relative', className)}>
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, #85a2a3, ${glowColor})`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative rounded-xl border border-navy/10 bg-white p-8 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        {children}
      </div>
    </div>
  );
}
