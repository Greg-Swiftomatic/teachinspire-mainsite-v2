import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  showArrow = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream group';

  const variants = {
    primary: 'bg-navy text-cream hover:bg-navy/90',
    secondary: 'border border-navy/20 text-navy hover:border-navy hover:bg-navy/5',
    ghost: 'text-navy hover:text-navy/70 underline underline-offset-4',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-3',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span
          className={`${variant === 'primary' ? 'text-yellow' : ''} group-hover:translate-x-1 transition-transform`}
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {content}
    </button>
  );
}
