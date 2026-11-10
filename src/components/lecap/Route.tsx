import { useEffect, useRef, useState } from 'react';
import { MODULES } from './site';

// Six points on a zigzag, as in the video: the line first lies in a tangle, straightens into
// the route when the section enters the view, then lights up as the visitor scrolls.
// Nothing is pinned and scrolling is never taken over.
const X = (n: number) => 100 + n * 200;
const Y = (n: number) => (n % 2 ? 62 : 178);
const ROUTE = MODULES.map((_, n) => (n === 0 ? `M${X(0)} ${Y(0)}` : `C${X(n) - 100} ${Y(n - 1)} ${X(n) - 100} ${Y(n)} ${X(n)} ${Y(n)}`)).join(' ');
const TANGLE = 'M100 178 C760 -40 180 300 420 120 C700 -60 860 300 500 150 C120 0 300 290 700 110 C1010 -30 520 300 880 150 C1120 40 900 300 1100 62';

export function Route() {
  const box = useRef<HTMLDivElement>(null);
  const lit = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      setStep(MODULES.length - 1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.72 - r.top) / (r.height * 0.82)));
      el.style.setProperty('--p', p.toFixed(4));
      const path = lit.current;
      if (path && dot.current && path.getTotalLength) {
        const point = path.getPointAtLength(path.getTotalLength() * p);
        dot.current.setAttribute('cx', String(point.x));
        dot.current.setAttribute('cy', String(point.y));
      }
      setStep(Math.floor(p * (MODULES.length - 1) + 0.04));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="lc-route" ref={box} data-reveal>
      <svg className="lc-route-map" viewBox="0 0 1200 240" aria-hidden="true">
        <path className="lc-route-base" d={ROUTE} style={{ ['--tangle' as string]: `path('${TANGLE}')`, ['--route' as string]: `path('${ROUTE}')` }} />
        <path className="lc-route-lit" ref={lit} d={ROUTE} pathLength={1} />
        {MODULES.map((m, n) => (
          <g key={m.nom} className={n <= step ? 'lc-node is-on' : 'lc-node'} style={{ ['--i' as string]: n }} transform={`translate(${X(n)} ${Y(n)})`}>
            <circle className="lc-node-ring" r="24" />
            <circle className="lc-node-disc" r="24" />
            <text y="9" textAnchor="middle">{n + 1}</text>
          </g>
        ))}
        <circle className="lc-route-dot" ref={dot} cx={X(0)} cy={Y(0)} r="10" />
      </svg>
      <ol className="lc-route-steps">
        {MODULES.map((m, n) => (
          <li key={m.nom} className={n <= step ? 'is-on' : undefined} style={{ ['--i' as string]: n }}>
            <span className="lc-route-num" aria-hidden="true">{n + 1}</span>
            <h3>{m.nom}</h3>
            <p>{m.texte}</p>
            <p className="lc-route-out"><span>Il repart avec</span> {m.remis}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
