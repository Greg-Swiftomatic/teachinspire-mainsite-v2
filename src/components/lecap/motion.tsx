import { useLayoutEffect, type CSSProperties, type RefObject } from 'react';
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
