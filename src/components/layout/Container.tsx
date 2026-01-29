import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
}
