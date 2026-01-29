import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
  suffix = '',
  prefix = '',
}: NumberTickerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(direction === 'up' ? 0 : value, {
    stiffness: 100,
    damping: 30,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest)
  );

  const [currentValue, setCurrentValue] = useState(direction === 'up' ? 0 : value);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => {
        springValue.set(direction === 'up' ? value : 0);
        setHasAnimated(true);
      }, delay * 1000);
    }
  }, [isInView, hasAnimated, springValue, value, direction, delay]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setCurrentValue(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {currentValue}
      {suffix}
    </span>
  );
}

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  className,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);

        // Easing function (ease-out-expo)
        const eased = 1 - Math.pow(2, -10 * progress);
        const current = Math.round(from + (to - from) * eased);

        setCount(current);

        if (now < endTime) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, from, to, duration, delay]);

  return (
    <motion.span
      ref={ref}
      className={cn('tabular-nums', className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  );
}
