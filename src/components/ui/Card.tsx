import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl p-8 shadow-sm ${className}`}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
