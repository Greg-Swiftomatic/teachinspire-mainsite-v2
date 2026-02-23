import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SpriteAnimationProps {
  /** Path to the sprite sheet image */
  src: string;
  /** Number of columns in the sprite grid */
  columns: number;
  /** Number of rows in the sprite grid */
  rows: number;
  /** Total number of frames (defaults to columns × rows) */
  totalFrames?: number;
  /** Duration each frame is visible in ms (includes crossfade time) */
  frameDuration?: number;
  /** Duration of the crossfade between frames in ms */
  crossfadeDuration?: number;
  /** Play only once (true) or loop (false) */
  playOnce?: boolean;
  /** Percentage of element visible before triggering (0-1) */
  threshold?: number;
  /** Additional CSS classes for the container */
  className?: string;
  /** Accessible label describing the animation */
  alt?: string;
}

export function SpriteAnimation({
  src,
  columns,
  rows,
  totalFrames,
  frameDuration = 400,
  crossfadeDuration = 300,
  playOnce = true,
  threshold = 0.6,
  className = '',
  alt,
}: SpriteAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const frames = totalFrames ?? columns * rows;

  const setFramePosition = useCallback(
    (el: HTMLDivElement, frame: number) => {
      const container = containerRef.current;
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const col = frame % columns;
      const row = Math.floor(frame / columns);
      el.style.backgroundSize = `${columns * w}px ${rows * h}px`;
      el.style.backgroundPosition = `-${col * w}px -${row * h}px`;
    },
    [columns, rows]
  );

  // Intersection Observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !(playOnce && hasPlayed)) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, playOnce, hasPlayed]);

  // Crossfade animation loop
  useEffect(() => {
    const a = layerARef.current;
    const b = layerBRef.current;
    if (!a || !b) return;

    // Set initial state: layer A shows frame 0, fully visible
    setFramePosition(a, prefersReducedMotion ? frames - 1 : 0);
    setFramePosition(b, prefersReducedMotion ? frames - 1 : 0);
    a.style.opacity = '1';
    b.style.opacity = '0';
    a.style.transition = '';
    b.style.transition = '';

    if (!isVisible || prefersReducedMotion) return;

    let currentFrame = 0;
    let frontIsA = true;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      currentFrame++;

      if (currentFrame >= frames) {
        if (playOnce) {
          setHasPlayed(true);
          setIsVisible(false);
          return;
        }
        currentFrame = 0;
      }

      const front = frontIsA ? a : b;
      const back = frontIsA ? b : a;

      // Set next frame on the hidden back layer (no transition)
      back.style.transition = '';
      setFramePosition(back, currentFrame);

      // Force reflow so the position change applies before we fade
      void back.offsetHeight;

      // Crossfade: fade back layer in, front layer out
      const fadeDuration = `${crossfadeDuration}ms`;
      back.style.transition = `opacity ${fadeDuration} ease-in-out`;
      front.style.transition = `opacity ${fadeDuration} ease-in-out`;
      back.style.opacity = '1';
      front.style.opacity = '0';

      frontIsA = !frontIsA;

      timer = setTimeout(step, frameDuration);
    };

    // Start after showing frame 0 for one cycle
    timer = setTimeout(step, frameDuration);

    return () => clearTimeout(timer);
  }, [isVisible, prefersReducedMotion, frames, frameDuration, crossfadeDuration, playOnce, setFramePosition]);

  const layerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`relative ${className}`}
    >
      <div ref={layerARef} style={layerStyle} />
      <div ref={layerBRef} style={layerStyle} />
    </div>
  );
}
