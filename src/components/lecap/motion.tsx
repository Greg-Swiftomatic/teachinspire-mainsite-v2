import { useLayoutEffect, type CSSProperties, type ReactNode, type RefObject } from 'react';
import './motion.css';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Turns motion on for everything under `ref`: each [data-reveal] block plays once, when it
// enters the view. Without JavaScript, or with reduced motion, the page is simply all there.
export function useMotion(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced()) return;
    root.classList.add('lc-anim');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

// ---------- Drawings that advance with the scroll ----------
// One listener for the whole page. Each registered block gets a number from 0 to 1 in a CSS
// variable as it travels up the window; the drawing inside reads it (see .lc-sd in motion.css).
// The page is never held or moved: the visitor scrolls, the drawing follows.
type Track = {
  el: HTMLElement;
  /** Where the top of the block is when the number is 0, and when it is 1 (share of the window height). */
  start: number;
  end: number;
  /** Share of the block's own height added to the distance (1 for a long list read line by line). */
  span: number;
  prop: string;
  last: number;
  onChange?: (p: number) => void;
};
const tracks = new Set<Track>();
let frame = 0;
const measure = () => {
  frame = 0;
  const vh = window.innerHeight;
  tracks.forEach((track) => {
    const r = track.el.getBoundingClientRect();
    const distance = vh * (track.start - track.end) + r.height * track.span;
    const p = Math.min(1, Math.max(0, (vh * track.start - r.top) / Math.max(1, distance)));
    const rounded = Math.round(p * 1000) / 1000;
    if (rounded === track.last) return;
    track.last = rounded;
    track.el.style.setProperty(track.prop, String(rounded));
    track.onChange?.(rounded);
  });
};
const schedule = () => {
  if (!frame) frame = requestAnimationFrame(measure);
};

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { start = 0.92, end = 0.4, span = 0, prop = '--p', onChange }: Partial<Omit<Track, 'el' | 'last'>> = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      // Reduced motion: the finished drawing, and the last step for whoever listens.
      if (prop === '--p') onChange?.(1);
      return;
    }
    const track: Track = { el, start, end, span, prop, last: -1, onChange };
    if (tracks.size === 0) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    tracks.add(track);
    measure();
    return () => {
      tracks.delete(track);
      el.style.removeProperty(prop);
      if (tracks.size === 0) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
    // The options are constants at each call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

/** One part of a drawing: it plays between `f` and `f + s` of its block's progress. */
export function S({ k, f, s, d, gx, gy, children }: { k: string; f: number; s: number; d?: number; gx?: number; gy?: number; children: ReactNode }) {
  const style = {
    '--from': f,
    '--span': s,
    ...(d !== undefined ? { '--d': `${d}px` } : {}),
    ...(gx !== undefined ? { '--gx': `${gx}px`, '--gy': `${gy ?? 0}px` } : {}),
  } as CSSProperties;
  return <g className={`lc-sd lc-sd--${k}`} style={style}>{children}</g>;
}

const i = (n: number) => ({ '--i': n }) as CSSProperties;
export { i as order };

const Stroke = () => (
  <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
    <path d="M4 12C70 3 150 17 296 7" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" pathLength={1} vectorEffect="non-scaling-stroke" />
  </svg>
);

// A headline revealed word by word from a mask, as in the introduction video.
// `mark` puts the yellow marker behind a group of words, `under` draws a line under one,
// `dot` ends the sentence on the yellow point of the logo. Screen readers get the plain sentence.
export function Words({ text, mark, under, dot = false }: { text: string; mark?: string; under?: string; dot?: boolean }) {
  const tokens: { t: string; kind?: 'mark' | 'under' }[] = [];
  const push = (part: string, kind?: 'mark' | 'under') => {
    if (kind === 'under') tokens.push({ t: part.trim(), kind });
    else part.split(' ').filter(Boolean).forEach((t) => tokens.push({ t, kind }));
  };
  const special = under ?? mark;
  const kind = under ? 'under' : 'mark';
  const at = special ? text.indexOf(special) : -1;
  if (special && at >= 0) {
    push(text.slice(0, at));
    push(special, kind);
    const rest = text.slice(at + special.length);
    // Punctuation right after the highlighted words stays attached to them.
    const glued = rest.match(/^[^\s]+/)?.[0] ?? '';
    if (glued) tokens[tokens.length - 1].t += `⁠${glued}`;
    push(rest.slice(glued.length));
  } else push(text);

  const last = tokens.length - 1;
  return (
    <>
      <span className="lc-sr">{text}</span>
      <span aria-hidden="true">
        {tokens.map((token, n) => {
          const [word, tail = ''] = token.t.split('⁠');
          const end = dot && n === last;
          return (
            <span key={n}>
              <span className="lc-w">
                <span style={i(n)}>
                  <span className={token.kind ? `lc-${token.kind}` : undefined}>
                    {end ? word.replace(/\.$/, '') : word}
                    {token.kind === 'under' ? <Stroke /> : null}
                  </span>
                  {tail}
                  {end ? <i className="lc-point" /> : null}
                </span>
              </span>{' '}
            </span>
          );
        })}
      </span>
    </>
  );
}
