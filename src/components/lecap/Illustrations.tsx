import type { CSSProperties } from 'react';
import { S } from './motion';

// The drawings of the marketing site. Written by docs/illustrations-essai/vitrine.py: change the
// drawing there and run it again, rather than editing the shapes by hand.
// Flat shapes, one line weight, no people (persons are points). Every part sits in an <S>, which
// plays it between two moments of its block's scroll progress; without script or with reduced
// motion the finished drawing is shown. All of them are decorative for assistive technology.

/** Campus: a shelf where the things of the training wait. Books 1 to 6 are the six modules,
 * the headphones and the page are the Studio, the screen is the replays, the two cups are the exchanges. */
export function ShelfIllustration() {
  return (
    <svg className="lc-il" viewBox="0 0 900 500" aria-hidden="true" focusable="false">
      <S k="pop" f={0} s={0.2}>
      <path d="M96 452a354 354 0 0 1 708 0Z" fill="var(--lc-green-2)" />
      </S>
      <S k="growx" f={0.02} s={0.2}>
      <rect x="56" y="472" width="788" height="14" rx="7" fill="var(--lc-deep)" />
      <rect x="16" y="452" width="868" height="24" rx="12" fill="var(--lc-sand)" />
      </S>
      <S k="drop" f={0.14} s={0.12} d={150}>
      <rect x="62" y="248" width="36" height="204" rx="7" fill="var(--lc-mint)" />
      <rect x="69" y="268" width="22" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <text x="80.0" y="434" textAnchor="middle" fontSize="23" fill="var(--lc-ink)" className="lc-il-num">1</text>
      </S>
      <S k="drop" f={0.18} s={0.12} d={150}>
      <rect x="102" y="212" width="30" height="240" rx="7" fill="var(--lc-tangerine)" />
      <rect x="109" y="232" width="16" height="7" rx="3.5" fill="var(--lc-paper)" opacity="0.3" />
      <text x="117.0" y="434" textAnchor="middle" fontSize="23" fill="var(--lc-paper)" className="lc-il-num">2</text>
      </S>
      <S k="drop" f={0.22} s={0.12} d={150}>
      <rect x="136" y="274" width="42" height="178" rx="7" fill="var(--lc-paper)" />
      <rect x="143" y="294" width="28" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <text x="157.0" y="434" textAnchor="middle" fontSize="23" fill="var(--lc-ink)" className="lc-il-num">3</text>
      </S>
      <S k="drop" f={0.26} s={0.12} d={150}>
      <rect x="182" y="230" width="32" height="222" rx="7" fill="var(--lc-mint-2)" />
      <rect x="189" y="250" width="18" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <text x="198.0" y="434" textAnchor="middle" fontSize="23" fill="var(--lc-ink)" className="lc-il-num">4</text>
      </S>
      <S k="drop" f={0.3} s={0.12} d={150}>
      <rect x="218" y="260" width="38" height="192" rx="7" fill="var(--lc-sand-2)" />
      <rect x="225" y="280" width="24" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <text x="237.0" y="434" textAnchor="middle" fontSize="23" fill="var(--lc-ink)" className="lc-il-num">5</text>
      </S>
      <S k="drop" f={0.34} s={0.12} d={150}>
      <g transform="rotate(-15 306 452)">
      <rect x="306" y="238" width="38" height="214" rx="7" fill="var(--lc-mint)" />
      <text x="325" y="434" textAnchor="middle" fontSize="23" fill="var(--lc-ink)" className="lc-il-num">6</text>
      <S k="pop" f={0.46} s={0.08}>
      <circle cx="325" cy="302" r="12" fill="var(--lc-yellow)" />
      </S>
      </g>
      </S>
      <S k="rise" f={0.44} s={0.12} d={90}>
      <g transform="rotate(6 560 452)">
      <rect x="498" y="256" width="128" height="196" rx="12" fill="var(--lc-paper)" />
      <rect x="516" y="280" width="62" height="11" rx="5.5" fill="var(--lc-ink)" />
      <rect x="516" y="306" width="92" height="54" rx="10" fill="var(--lc-mint)" />
      <rect x="516" y="376" width="92" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.26" />
      <rect x="516" y="395" width="70" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.26" />
      <rect x="516" y="414" width="92" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.26" />
      </g>
      </S>
      <S k="drop" f={0.5} s={0.12} d={140}>
      <path d="M388 392v-24a66 66 0 0 1 132 0v24" fill="none" stroke="var(--lc-sand)" strokeWidth="13" strokeLinecap="round" />
      <rect x="366" y="372" width="44" height="80" rx="17" fill="var(--lc-tangerine)" />
      <rect x="498" y="372" width="44" height="80" rx="17" fill="var(--lc-tangerine)" />
      <rect x="403" y="386" width="11" height="52" rx="5.5" fill="var(--lc-paper)" />
      <rect x="494" y="386" width="11" height="52" rx="5.5" fill="var(--lc-paper)" />
      </S>
      <S k="growy" f={0.6} s={0.07}>
      <rect x="427.0" y="408.0" width="6.5" height="16" rx="3.25" fill="var(--lc-mint)" />
      </S>
      <S k="growy" f={0.612} s={0.07}>
      <rect x="439.5" y="398.0" width="6.5" height="36" rx="3.25" fill="var(--lc-mint)" />
      </S>
      <S k="growy" f={0.624} s={0.07}>
      <rect x="452.0" y="404.0" width="6.5" height="24" rx="3.25" fill="var(--lc-mint)" />
      </S>
      <S k="growy" f={0.636} s={0.07}>
      <rect x="464.5" y="393.0" width="6.5" height="46" rx="3.25" fill="var(--lc-mint)" />
      </S>
      <S k="growy" f={0.648} s={0.07}>
      <rect x="477.0" y="406.0" width="6.5" height="20" rx="3.25" fill="var(--lc-mint)" />
      </S>
      <S k="pop" f={0.62} s={0.12}>
      <g transform="rotate(-5 690 452)">
      <path d="M662 452l12-26h44l12 26Z" fill="var(--lc-sand-2)" />
      <rect x="610" y="302" width="172" height="124" rx="18" fill="var(--lc-paper)" />
      <rect x="622" y="314" width="148" height="100" rx="10" fill="var(--lc-green-3)" />
      <path d="M726 364a30 30 0 1 1-10-22" fill="none" stroke="var(--lc-paper)" strokeWidth="7" strokeLinecap="round" />
      <path d="M703 330l15 11-17 7Z" fill="var(--lc-paper)" stroke="var(--lc-paper)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M688 351v26l21-13Z" fill="var(--lc-paper)" stroke="var(--lc-paper)" strokeWidth="5" strokeLinejoin="round" />
      </g>
      </S>
      <S k="side" f={0.7} s={0.1} d={90}>
      <path d="M776 404a14 14 0 0 0 0 28" fill="none" stroke="var(--lc-mint)" strokeWidth="8" strokeLinecap="round" />
      <path d="M776 394h50v34a24 24 0 0 1-24 24h-2a24 24 0 0 1-24-24Z" fill="var(--lc-mint)" />
      <path d="M882 404a14 14 0 0 1 0 28" fill="none" stroke="var(--lc-sand-2)" strokeWidth="8" strokeLinecap="round" />
      <path d="M832 394h50v34a24 24 0 0 1-24 24h-2a24 24 0 0 1-24-24Z" fill="var(--lc-sand-2)" />
      </S>
      <S k="draw" f={0.78} s={0.12}>
      <path d="M800 382c-11-14 11-24 0-39s11-24 0-37" fill="none" stroke="var(--lc-paper)" strokeWidth="6" strokeLinecap="round" pathLength={1} />
      <path d="M856 382c-11-15 11-26 0-42s11-27 0-43s10-26 2-40s6-22 0-32" fill="none" stroke="var(--lc-paper)" strokeWidth="6" strokeLinecap="round" pathLength={1} />
      </S>
      <S k="pop" f={0.86} s={0.08}>
      <path d="M716 220h92a26 26 0 0 1 26 26v12a26 26 0 0 1-26 26h-4l-4 16-14-16h-70a26 26 0 0 1-26-26v-12a26 26 0 0 1 26-26Z" fill="var(--lc-paper)" />
      <circle cx="738" cy="252" r="7" fill="var(--lc-ink)" />
      <circle cx="762" cy="252" r="7" fill="var(--lc-ink)" />
      <circle cx="786" cy="252" r="7" fill="var(--lc-ink)" />
      </S>
      <S k="pop" f={0.92} s={0.08}>
      <path d="M800 108h64a24 24 0 0 1 24 24v10a24 24 0 0 1-24 24h-2l-6 15-12-15h-44a24 24 0 0 1-24-24v-10a24 24 0 0 1 24-24Z" fill="var(--lc-mint-2)" />
      <rect x="798" y="126" width="68" height="8" rx="4" fill="var(--lc-ink)" />
      <rect x="798" y="142" width="44" height="8" rx="4" fill="var(--lc-ink)" />
      </S>
    </svg>
  );
}

/** The Formation page: at each module one more document lands on the pile, until the whole course is ready. */
export function DossierIllustration() {
  return (
    <svg className="lc-il" viewBox="0 0 580 540" aria-hidden="true" focusable="false">
      <circle cx="290" cy="290" r="262" fill="var(--lc-green-2)" />
      <S k="land" f={0.0} s={0.1}>
      <g transform="translate(52 168) rotate(-13 115 150)">
      <rect width="230" height="300" rx="18" fill="var(--lc-paper)" />
      <text x="22" y="54" fontSize="40" fill="var(--lc-ink)" className="lc-il-num">1</text>
      <circle cx="184" cy="42" r="22" fill="var(--lc-mint-2)" />
      <rect x="22" y="78" width="124" height="12" rx="6.0" fill="var(--lc-ink)" />
      <rect x="22" y="100" width="84" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.28" />
      <rect x="22" y="128" width="186" height="34" rx="11" fill="var(--lc-mint)" />
      <rect x="34" y="141" width="46" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.35" />
      <rect x="92" y="141" width="96" height="8" rx="4.0" fill="var(--lc-ink)" />
      <rect x="22" y="174" width="186" height="34" rx="11" fill="var(--lc-mint)" />
      <rect x="34" y="187" width="46" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.35" />
      <rect x="92" y="187" width="70" height="8" rx="4.0" fill="var(--lc-ink)" />
      <rect x="22" y="220" width="186" height="34" rx="11" fill="var(--lc-mint)" />
      <rect x="34" y="233" width="46" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.35" />
      <rect x="92" y="233" width="104" height="8" rx="4.0" fill="var(--lc-ink)" />
      </g>
      </S>
      <S k="land" f={0.167} s={0.1}>
      <g transform="translate(100 140) rotate(-8 115 150)">
      <rect width="230" height="300" rx="18" fill="var(--lc-mint)" />
      <text x="22" y="54" fontSize="40" fill="var(--lc-ink)" className="lc-il-num">2</text>
      <rect x="22" y="72" width="186" height="14" rx="7.0" fill="var(--lc-ink)" />
      <rect x="22" y="104" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="61" y="104" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="100" y="104" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="139" y="104" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="178" y="104" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="22" y="148" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="61" y="148" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="100" y="148" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="139" y="148" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="178" y="148" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="22" y="192" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="61" y="192" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="100" y="192" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="139" y="192" width="30" height="30" rx="9" fill="var(--lc-tangerine)" />
      <rect x="178" y="192" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="22" y="236" width="30" height="30" rx="9" fill="var(--lc-green)" />
      <rect x="61" y="236" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="100" y="236" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="139" y="236" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      <rect x="178" y="236" width="30" height="30" rx="9" fill="var(--lc-paper)" />
      </g>
      </S>
      <S k="land" f={0.333} s={0.1}>
      <g transform="translate(148 120) rotate(-3 115 150)">
      <rect width="230" height="300" rx="18" fill="var(--lc-sand-2)" />
      <text x="22" y="54" fontSize="40" fill="var(--lc-ink)" className="lc-il-num">3</text>
      <rect x="22" y="72" width="186" height="96" rx="14" fill="var(--lc-green-3)" />
      <path d="M104 102v36l30-18Z" fill="var(--lc-paper)" stroke="var(--lc-paper)" strokeWidth="5" strokeLinejoin="round" />
      <rect x="24.0" y="194.0" width="7" height="12" rx="3.5" fill="var(--lc-ink)" />
      <rect x="39.4" y="187.0" width="7" height="26" rx="3.5" fill="var(--lc-ink)" />
      <rect x="54.8" y="191.0" width="7" height="18" rx="3.5" fill="var(--lc-ink)" />
      <rect x="70.2" y="183.0" width="7" height="34" rx="3.5" fill="var(--lc-ink)" />
      <rect x="85.6" y="189.0" width="7" height="22" rx="3.5" fill="var(--lc-ink)" />
      <rect x="101.0" y="185.0" width="7" height="30" rx="3.5" fill="var(--lc-ink)" />
      <rect x="116.4" y="193.0" width="7" height="14" rx="3.5" fill="var(--lc-ink)" />
      <rect x="131.8" y="186.0" width="7" height="28" rx="3.5" fill="var(--lc-ink)" />
      <rect x="147.2" y="190.0" width="7" height="20" rx="3.5" fill="var(--lc-ink)" />
      <rect x="162.6" y="184.0" width="7" height="32" rx="3.5" fill="var(--lc-ink)" />
      <rect x="178.0" y="192.0" width="7" height="16" rx="3.5" fill="var(--lc-ink)" />
      <rect x="193.4" y="188.0" width="7" height="24" rx="3.5" fill="var(--lc-ink)" />
      <rect x="22" y="236" width="186" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.3" />
      <rect x="22" y="256" width="128" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.3" />
      </g>
      </S>
      <S k="land" f={0.5} s={0.1}>
      <g transform="translate(196 110) rotate(3 115 150)">
      <rect width="230" height="300" rx="18" fill="var(--lc-mint-2)" />
      <text x="22" y="54" fontSize="40" fill="var(--lc-ink)" className="lc-il-num">4</text>
      <path d="M40 88V256" fill="none" stroke="var(--lc-ink)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="88" r="11" fill="var(--lc-paper)" stroke="var(--lc-ink)" strokeWidth="4" />
      <rect x="66" y="79" width="128" height="10" rx="5.0" fill="var(--lc-ink)" />
      <rect x="66" y="96" width="84" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <circle cx="40" cy="144" r="11" fill="var(--lc-paper)" stroke="var(--lc-ink)" strokeWidth="4" />
      <rect x="66" y="135" width="104" height="10" rx="5.0" fill="var(--lc-ink)" />
      <rect x="66" y="152" width="70" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <circle cx="40" cy="200" r="11" fill="var(--lc-paper)" stroke="var(--lc-ink)" strokeWidth="4" />
      <rect x="66" y="191" width="118" height="10" rx="5.0" fill="var(--lc-ink)" />
      <rect x="66" y="208" width="92" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      <circle cx="40" cy="256" r="13" fill="var(--lc-tangerine)" />
      <rect x="66" y="247" width="136" height="10" rx="5.0" fill="var(--lc-ink)" />
      <rect x="66" y="264" width="60" height="7" rx="3.5" fill="var(--lc-ink)" opacity="0.3" />
      </g>
      </S>
      <S k="land" f={0.667} s={0.1}>
      <g transform="translate(244 114) rotate(8 115 150)">
      <rect width="230" height="300" rx="18" fill="var(--lc-paper)" />
      <text x="22" y="54" fontSize="40" fill="var(--lc-ink)" className="lc-il-num">5</text>
      <rect x="22" y="72" width="186" height="70" rx="14" fill="var(--lc-mint)" />
      <circle cx="56" cy="107" r="18" fill="var(--lc-tangerine)" />
      <path d="M50 98v18l15-9Z" fill="var(--lc-paper)" />
      <rect x="88" y="100.0" width="6.5" height="14" rx="3.25" fill="var(--lc-green)" />
      <rect x="102" y="92.0" width="6.5" height="30" rx="3.25" fill="var(--lc-green)" />
      <rect x="116" y="97.0" width="6.5" height="20" rx="3.25" fill="var(--lc-green)" />
      <rect x="130" y="88.0" width="6.5" height="38" rx="3.25" fill="var(--lc-green)" />
      <rect x="144" y="95.0" width="6.5" height="24" rx="3.25" fill="var(--lc-green)" />
      <rect x="158" y="91.0" width="6.5" height="32" rx="3.25" fill="var(--lc-green)" />
      <rect x="172" y="99.0" width="6.5" height="16" rx="3.25" fill="var(--lc-green)" />
      <rect x="186" y="94.0" width="6.5" height="26" rx="3.25" fill="var(--lc-green)" />
      <rect x="22" y="162" width="20" height="20" rx="6" fill="var(--lc-green)" />
      <path d="M27 172l4 4 7-8" fill="none" stroke="var(--lc-paper)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="54" y="168" width="150" height="9" rx="4.5" fill="var(--lc-ink)" opacity="0.32" />
      <rect x="22" y="198" width="20" height="20" rx="6" fill="var(--lc-green)" />
      <path d="M27 208l4 4 7-8" fill="none" stroke="var(--lc-paper)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="54" y="204" width="118" height="9" rx="4.5" fill="var(--lc-ink)" opacity="0.32" />
      <rect x="23.5" y="235.5" width="17" height="17" rx="5" fill="none" stroke="var(--lc-ink)" strokeWidth="3" />
      <rect x="54" y="240" width="136" height="9" rx="4.5" fill="var(--lc-ink)" opacity="0.32" />
      </g>
      </S>
      <S k="land" f={0.833} s={0.1}>
      <g transform="translate(290 130) rotate(13 115 150)">
      <rect width="230" height="300" rx="18" fill="var(--lc-tangerine)" />
      <text x="22" y="54" fontSize="40" fill="var(--lc-paper)" className="lc-il-num">6</text>
      <rect x="22" y="76" width="186" height="66" rx="14" fill="var(--lc-paper)" />
      <rect x="38" y="94" width="120" height="12" rx="6.0" fill="var(--lc-ink)" />
      <rect x="38" y="116" width="82" height="8" rx="4.0" fill="var(--lc-ink)" opacity="0.3" />
      <rect x="22" y="162" width="186" height="8" rx="4.0" fill="var(--lc-paper)" opacity="0.6" />
      <rect x="22" y="182" width="150" height="8" rx="4.0" fill="var(--lc-paper)" opacity="0.6" />
      <rect x="22" y="202" width="170" height="8" rx="4.0" fill="var(--lc-paper)" opacity="0.6" />
      <S k="pop" f={0.93} s={0.06}>
      <circle cx="176" cy="250" r="30" fill="var(--lc-yellow)" />
      <path d="M162 250l10 10 18-20" fill="none" stroke="var(--lc-ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </S>
      </g>
      </S>
    </svg>
  );
}

/** The closing call: a quarter of an hour on the clock, two cups, a conversation. */
export function ConversationIllustration() {
  return (
    <svg className="lc-il" viewBox="0 0 400 310" aria-hidden="true" focusable="false">
      <S k="pop" f={0} s={0.18}>
      <circle cx="104" cy="108" r="80" fill="var(--lc-paper)" />
      <S k="wedge" f={0.14} s={0.5}>
      <circle cx="104" cy="108" r="36.0" fill="none" stroke="var(--lc-yellow)" strokeWidth="72" transform="rotate(-90 104 108)" />
      </S>
      <rect x="101" y="36" width="6" height="12" rx="3" fill="var(--lc-ink)" transform="rotate(0 104 108)" />
      <rect x="101" y="36" width="6" height="12" rx="3" fill="var(--lc-ink)" transform="rotate(90 104 108)" />
      <rect x="101" y="36" width="6" height="12" rx="3" fill="var(--lc-ink)" transform="rotate(180 104 108)" />
      <rect x="101" y="36" width="6" height="12" rx="3" fill="var(--lc-ink)" transform="rotate(270 104 108)" />
      <path d="M104 108L78 86" stroke="var(--lc-ink)" strokeWidth="8" strokeLinecap="round" />
      <g className="lc-sd lc-sd--hand" style={{ "--from": 0.14, "--span": 0.5, transformOrigin: "104px 108px" } as CSSProperties}>
      <path d="M104 108V54" stroke="var(--lc-ink)" strokeWidth="8" strokeLinecap="round" />
      </g>
      <circle cx="104" cy="108" r="9" fill="var(--lc-ink)" />
      </S>
      <S k="growx" f={0.22} s={0.16}>
      <rect x="170" y="292" width="196" height="10" rx="5" fill="var(--lc-deep)" />
      <rect x="150" y="276" width="236" height="18" rx="9" fill="var(--lc-sand)" />
      </S>
      <S k="side" f={0.34} s={0.14} d={-70}>
      <path d="M176 232a13 13 0 0 0 0 26" fill="none" stroke="var(--lc-mint)" strokeWidth="8" strokeLinecap="round" />
      <path d="M176 222h50v32a22 22 0 0 1-22 22h-6a22 22 0 0 1-22-22Z" fill="var(--lc-mint)" />
      </S>
      <S k="side" f={0.4} s={0.14} d={70}>
      <path d="M350 232a13 13 0 0 1 0 26" fill="none" stroke="var(--lc-sand-2)" strokeWidth="8" strokeLinecap="round" />
      <path d="M300 222h50v32a22 22 0 0 1-22 22h-6a22 22 0 0 1-22-22Z" fill="var(--lc-sand-2)" />
      </S>
      <S k="draw" f={0.54} s={0.18}>
      <path d="M201 212c-8-8 8-12 10-20" fill="none" stroke="var(--lc-paper)" strokeWidth="6" strokeLinecap="round" pathLength={1} />
      <path d="M325 212c-10-13 10-22 0-36s10-24 0-38s8-20 5-30" fill="none" stroke="var(--lc-paper)" strokeWidth="6" strokeLinecap="round" pathLength={1} />
      </S>
      <S k="pop" f={0.7} s={0.1}>
      <path d="M210 118h66a24 24 0 0 1 24 24v10a24 24 0 0 1-24 24h-48l-14 16 2-16h-6a24 24 0 0 1-24-24v-10a24 24 0 0 1 24-24Z" fill="var(--lc-paper)" />
      <circle cx="219" cy="147" r="7" fill="var(--lc-ink)" />
      <circle cx="243" cy="147" r="7" fill="var(--lc-ink)" />
      <circle cx="267" cy="147" r="7" fill="var(--lc-ink)" />
      </S>
      <S k="pop" f={0.82} s={0.1}>
      <path d="M310 34h60a24 24 0 0 1 24 24v6a24 24 0 0 1-24 24h-28l-12 16 0-16h-20a24 24 0 0 1-24-24v-6a24 24 0 0 1 24-24Z" fill="var(--lc-mint-2)" />
      <rect x="308" y="50" width="64" height="8" rx="4" fill="var(--lc-ink)" />
      <rect x="308" y="66" width="40" height="8" rx="4" fill="var(--lc-ink)" />
      </S>
    </svg>
  );
}

/** An institute: the trainers gather, the yellow point among them. */
export function TeamIllustration() {
  return (
    <svg className="lc-il" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="56" fill="var(--lc-green)" />
      <S k="gather" f={0} s={0.85} gx={-30} gy={15}>
      <circle cx="40" cy="70" r="10" fill="var(--lc-mint)" />
      </S>
      <S k="gather" f={0} s={0.85} gx={0} gy={27}>
      <circle cx="60" cy="78" r="9" fill="var(--lc-paper)" />
      </S>
      <S k="gather" f={0} s={0.85} gx={30} gy={12}>
      <circle cx="80" cy="68" r="10" fill="var(--lc-mint-2)" />
      </S>
      <S k="gather" f={0} s={0.85} gx={-18} gy={-15}>
      <circle cx="48" cy="50" r="9" fill="var(--lc-sand)" />
      </S>
      <S k="gather" f={0} s={0.85} gx={18} gy={-18}>
      <circle cx="72" cy="48" r="9" fill="var(--lc-paper)" />
      </S>
      <S k="gather" f={0} s={0.85} gx={-3} gy={-42}>
      <circle cx="58" cy="32" r="8" fill="var(--lc-mint)" />
      </S>
      <S k="pop" f={0.5} s={0.4}>
      <circle cx="60" cy="60" r="13" fill="var(--lc-yellow)" stroke="var(--lc-green)" strokeWidth="3" />
      </S>
    </svg>
  );
}

/** An independent trainer: one point, on its own way. */
export function SoloIllustration() {
  return (
    <svg className="lc-il" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="56" fill="var(--lc-green)" />
      <path d="M30 80Q60 10 90 60" fill="none" stroke="var(--lc-mint-2)" strokeWidth="4" strokeDasharray="1 10" strokeLinecap="round" />
      <circle cx="30" cy="80" r="5" fill="var(--lc-mint-2)" />
      <S k="hop" f={0} s={0.9} gx={60} gy={-20}>
      <circle cx="30" cy="80" r="13" fill="var(--lc-yellow)" />
      </S>
    </svg>
  );
}
