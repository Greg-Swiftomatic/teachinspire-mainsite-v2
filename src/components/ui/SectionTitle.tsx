import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  children,
  subtitle,
  centered = true,
  className = '',
}: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <h2 className="text-4xl font-bold font-display text-navy mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-navy-light max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
