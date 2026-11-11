"""Writes src/components/lecap/Illustrations.tsx: the drawings of the marketing site.

Same hand as the trial sheet (build.py), but every part of a drawing is wrapped in <S>, so it
plays as the visitor scrolls (see useScrollProgress and .lc-sd in the lecap folder).
Run: python3 vitrine.py
"""
import os

here = os.path.dirname(os.path.abspath(__file__))
out_path = os.path.abspath(os.path.join(here, '..', '..', 'src', 'components', 'lecap', 'Illustrations.tsx'))

v = lambda name: f'var(--lc-{name})'
GREEN, GREEN2, GREEN3, DEEP = v('green'), v('green-2'), v('green-3'), v('deep')
MINT, MINT2, SAND, SAND2, PAPER = v('mint'), v('mint-2'), v('sand'), v('sand-2'), v('paper')
YELLOW, TANG, INK = v('yellow'), v('tangerine'), v('ink')
NUM = 'className="lc-il-num"'


def S(body, kind, f, s, **extra):
    props = ''.join(f' {k}={{{val}}}' for k, val in extra.items())
    return f'<S k="{kind}" f={{{round(f, 3)}}} s={{{round(s, 3)}}}{props}>{body}</S>'


# ------------------------------------------------------------------ the shelf (Campus)
def shelf():
    o = []
    B = 452  # top of the board
    o.append(S(f'<path d="M96 {B}a354 354 0 0 1 708 0Z" fill="{GREEN2}" />', 'pop', 0, 0.2))
    o.append(S(f'<rect x="56" y="{B + 20}" width="788" height="14" rx="7" fill="{DEEP}" /><rect x="16" y="{B}" width="868" height="24" rx="12" fill="{SAND}" />', 'growx', 0.02, 0.2))
    books = [(62, 36, 204, MINT, INK), (102, 30, 240, TANG, PAPER), (136, 42, 178, PAPER, INK), (182, 32, 222, MINT2, INK), (218, 38, 192, SAND2, INK)]
    for n, (x, w, h, fill, ink) in enumerate(books, 1):
        y = B - h
        o.append(S(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="{fill}" />'
                   f'<rect x="{x + 7}" y="{y + 20}" width="{w - 14}" height="7" rx="3.5" fill="{ink}" opacity="0.3" />'
                   f'<text x="{x + w / 2}" y="{B - 18}" textAnchor="middle" fontSize="23" fill="{ink}" {NUM}>{n}</text>', 'drop', 0.1 + n * 0.04, 0.12, d=150))
    o.append(S(f'<g transform="rotate(-15 306 {B})"><rect x="306" y="{B - 214}" width="38" height="214" rx="7" fill="{MINT}" />'
               f'<text x="325" y="{B - 18}" textAnchor="middle" fontSize="23" fill="{INK}" {NUM}>6</text>'
               + S(f'<circle cx="325" cy="{B - 150}" r="12" fill="{YELLOW}" />', 'pop', 0.46, 0.08) + '</g>', 'drop', 0.34, 0.12, d=150))
    o.append(S(f'<g transform="rotate(6 560 {B})"><rect x="498" y="{B - 196}" width="128" height="196" rx="12" fill="{PAPER}" />'
               f'<rect x="516" y="{B - 172}" width="62" height="11" rx="5.5" fill="{INK}" /><rect x="516" y="{B - 146}" width="92" height="54" rx="10" fill="{MINT}" />'
               + ''.join(f'<rect x="516" y="{B - 76 + k * 19}" width="{92 - (k % 2) * 22}" height="7" rx="3.5" fill="{INK}" opacity="0.26" />' for k in range(3)) + '</g>', 'rise', 0.44, 0.12, d=90))
    o.append(S(f'<path d="M388 {B - 60}v-24a66 66 0 0 1 132 0v24" fill="none" stroke="{SAND}" strokeWidth="13" strokeLinecap="round" />'
               + ''.join(f'<rect x="{x}" y="{B - 80}" width="44" height="80" rx="17" fill="{TANG}" />' for x in (366, 498))
               + f'<rect x="403" y="{B - 66}" width="11" height="52" rx="5.5" fill="{PAPER}" /><rect x="494" y="{B - 66}" width="11" height="52" rx="5.5" fill="{PAPER}" />', 'drop', 0.5, 0.12, d=140))
    for k, hgt in enumerate((16, 36, 24, 46, 20)):
        o.append(S(f'<rect x="{427 + k * 12.5}" y="{B - 36 - hgt / 2}" width="6.5" height="{hgt}" rx="3.25" fill="{MINT}" />', 'growy', 0.6 + k * 0.012, 0.07))
    o.append(S(f'<g transform="rotate(-5 690 {B})"><path d="M662 {B}l12-26h44l12 26Z" fill="{SAND2}" />'
               f'<rect x="610" y="{B - 150}" width="172" height="124" rx="18" fill="{PAPER}" /><rect x="622" y="{B - 138}" width="148" height="100" rx="10" fill="{GREEN3}" />'
               f'<path d="M726 {B - 88}a30 30 0 1 1-10-22" fill="none" stroke="{PAPER}" strokeWidth="7" strokeLinecap="round" />'
               f'<path d="M703 {B - 122}l15 11-17 7Z" fill="{PAPER}" stroke="{PAPER}" strokeWidth="4" strokeLinejoin="round" />'
               f'<path d="M688 {B - 101}v26l21-13Z" fill="{PAPER}" stroke="{PAPER}" strokeWidth="5" strokeLinejoin="round" /></g>', 'pop', 0.62, 0.12))
    o.append(S(f'<path d="M776 {B - 48}a14 14 0 0 0 0 28" fill="none" stroke="{MINT}" strokeWidth="8" strokeLinecap="round" />'
               f'<path d="M776 {B - 58}h50v34a24 24 0 0 1-24 24h-2a24 24 0 0 1-24-24Z" fill="{MINT}" />'
               f'<path d="M882 {B - 48}a14 14 0 0 1 0 28" fill="none" stroke="{SAND2}" strokeWidth="8" strokeLinecap="round" />'
               f'<path d="M832 {B - 58}h50v34a24 24 0 0 1-24 24h-2a24 24 0 0 1-24-24Z" fill="{SAND2}" />', 'side', 0.7, 0.1, d=90))
    o.append(S(f'<path d="M800 {B - 70}c-11-14 11-24 0-39s11-24 0-37" fill="none" stroke="{PAPER}" strokeWidth="6" strokeLinecap="round" pathLength={{1}} />'
               f'<path d="M856 {B - 70}c-11-15 11-26 0-42s11-27 0-43s10-26 2-40s6-22 0-32" fill="none" stroke="{PAPER}" strokeWidth="6" strokeLinecap="round" pathLength={{1}} />', 'draw', 0.78, 0.12))
    o.append(S(f'<path d="M716 {B - 232}h92a26 26 0 0 1 26 26v12a26 26 0 0 1-26 26h-4l-4 16-14-16h-70a26 26 0 0 1-26-26v-12a26 26 0 0 1 26-26Z" fill="{PAPER}" />'
               + ''.join(f'<circle cx="{738 + k * 24}" cy="{B - 200}" r="7" fill="{INK}" />' for k in range(3)), 'pop', 0.86, 0.08))
    o.append(S(f'<path d="M800 {B - 344}h64a24 24 0 0 1 24 24v10a24 24 0 0 1-24 24h-2l-6 15-12-15h-44a24 24 0 0 1-24-24v-10a24 24 0 0 1 24-24Z" fill="{MINT2}" />'
               f'<rect x="798" y="{B - 326}" width="68" height="8" rx="4" fill="{INK}" /><rect x="798" y="{B - 310}" width="44" height="8" rx="4" fill="{INK}" />', 'pop', 0.92, 0.08))
    return '0 0 900 500', ''.join(o)


# ------------------------------------------------------------------ the folder that grows (Formation)
def doc(n, fill, ink, body):
    return (f'<rect width="230" height="300" rx="18" fill="{fill}" />'
            f'<text x="22" y="54" fontSize="40" fill="{ink}" {NUM}>{n}</text>{body}')


def dossier():
    bar = lambda x, y, w, h=8, fill=INK, op=None: f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h / 2}" fill="{fill}"' + (f' opacity="{op}"' if op else '') + ' />'
    docs = []
    # 1. the learner's sheet: who they are (a point, never a face), and three facts
    b = f'<circle cx="184" cy="42" r="22" fill="{MINT2}" />' + bar(22, 78, 124, 12) + bar(22, 100, 84, 8, INK, 0.28)
    for k in range(3):
        y = 128 + k * 46
        b += f'<rect x="22" y="{y}" width="186" height="34" rx="11" fill="{MINT}" />' + bar(34, y + 13, 46, 8, INK, 0.35) + bar(92, y + 13, (96, 70, 104)[k], 8)
    docs.append((1, PAPER, INK, b))
    # 2. the calendar of the course
    b = bar(22, 72, 186, 14)
    marks = {(1, 0): GREEN, (3, 0): GREEN, (0, 1): GREEN, (2, 1): GREEN, (4, 1): GREEN, (1, 2): GREEN, (3, 2): TANG, (0, 3): GREEN}
    for r in range(4):
        for c in range(5):
            b += f'<rect x="{22 + c * 39}" y="{104 + r * 44}" width="30" height="30" rx="9" fill="{marks.get((c, r), PAPER)}" />'
    docs.append((2, MINT, INK, b))
    # 3. the sources: a real video, its sound, its words
    b = f'<rect x="22" y="72" width="186" height="96" rx="14" fill="{GREEN3}" /><path d="M104 102v36l30-18Z" fill="{PAPER}" stroke="{PAPER}" strokeWidth="5" strokeLinejoin="round" />'
    for k, hgt in enumerate((12, 26, 18, 34, 22, 30, 14, 28, 20, 32, 16, 24)):
        b += f'<rect x="{24 + k * 15.4}" y="{200 - hgt / 2}" width="7" height="{hgt}" rx="3.5" fill="{INK}" />'
    b += bar(22, 236, 186, 8, INK, 0.3) + bar(22, 256, 128, 8, INK, 0.3)
    docs.append((3, SAND2, INK, b))
    # 4. the plan of the session: steps towards the final task
    b = f'<path d="M40 88V256" fill="none" stroke="{INK}" strokeWidth="4" strokeLinecap="round" />'
    for k, y in enumerate((88, 144, 200, 256)):
        last = k == 3
        b += (f'<circle cx="40" cy="{y}" r="13" fill="{TANG}" />' if last else f'<circle cx="40" cy="{y}" r="11" fill="{PAPER}" stroke="{INK}" strokeWidth="4" />')
        b += bar(66, y - 9, (128, 104, 118, 136)[k], 10) + bar(66, y + 8, (84, 70, 92, 60)[k], 7, INK, 0.3)
    docs.append((4, MINT2, INK, b))
    # 5. the handout, the exercises and the audio
    b = f'<rect x="22" y="72" width="186" height="70" rx="14" fill="{MINT}" /><circle cx="56" cy="107" r="18" fill="{TANG}" /><path d="M50 98v18l15-9Z" fill="{PAPER}" />'
    for k, hgt in enumerate((14, 30, 20, 38, 24, 32, 16, 26)):
        b += f'<rect x="{88 + k * 14}" y="{107 - hgt / 2}" width="6.5" height="{hgt}" rx="3.25" fill="{GREEN}" />'
    for k in range(3):
        y = 162 + k * 36
        b += (f'<rect x="22" y="{y}" width="20" height="20" rx="6" fill="{GREEN}" /><path d="M27 {y + 10}l4 4 7-8" fill="none" stroke="{PAPER}" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />' if k < 2
              else f'<rect x="23.5" y="{y + 1.5}" width="17" height="17" rx="5" fill="none" stroke="{INK}" strokeWidth="3" />')
        b += bar(54, y + 6, (150, 118, 136)[k], 9, INK, 0.32)
    docs.append((5, PAPER, INK, b))
    # 6. the whole course, ready to teach
    b = (f'<rect x="22" y="76" width="186" height="66" rx="14" fill="{PAPER}" />' + bar(38, 94, 120, 12) + bar(38, 116, 82, 8, INK, 0.3)
         + bar(22, 162, 186, 8, PAPER, 0.6) + bar(22, 182, 150, 8, PAPER, 0.6) + bar(22, 202, 170, 8, PAPER, 0.6)
         + S(f'<circle cx="176" cy="250" r="30" fill="{YELLOW}" /><path d="M162 250l10 10 18-20" fill="none" stroke="{INK}" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />', 'pop', 0.93, 0.06))
    docs.append((6, TANG, PAPER, b))

    place = [(52, 168, -13), (100, 140, -8), (148, 120, -3), (196, 110, 3), (244, 114, 8), (290, 130, 13)]
    o = [f'<circle cx="290" cy="290" r="262" fill="{GREEN2}" />']
    for (n, fill, ink, body), (x, y, a) in zip(docs, place):
        o.append(S(f'<g transform="translate({x} {y}) rotate({a} 115 150)">{doc(n, fill, ink, body)}</g>', 'land', (n - 1) / 6, 0.1))
    return '0 0 580 540', ''.join(o)


# ------------------------------------------------------------------ fifteen minutes, a conversation (closing call)
def conversation():
    o = []
    cx, cy, r = 104, 108, 80
    clock = (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{PAPER}" />'
             + S(f'<circle cx="{cx}" cy="{cy}" r="{r / 2 - 4}" fill="none" stroke="{YELLOW}" strokeWidth="{r - 8}" transform="rotate(-90 {cx} {cy})" />', 'wedge', 0.14, 0.5)
             + ''.join(f'<rect x="{cx - 3}" y="{cy - r + 8}" width="6" height="12" rx="3" fill="{INK}" transform="rotate({a} {cx} {cy})" />' for a in (0, 90, 180, 270))
             + f'<path d="M{cx} {cy}L{cx - 26} {cy - 22}" stroke="{INK}" strokeWidth="8" strokeLinecap="round" />'
             + f'<g className="lc-sd lc-sd--hand" style={{{{ "--from": 0.14, "--span": 0.5, transformOrigin: "{cx}px {cy}px" }} as CSSProperties}}>'
               f'<path d="M{cx} {cy}V{cy - r + 26}" stroke="{INK}" strokeWidth="8" strokeLinecap="round" /></g>'
             + f'<circle cx="{cx}" cy="{cy}" r="9" fill="{INK}" />')
    o.append(S(clock, 'pop', 0, 0.18))
    o.append(S(f'<rect x="170" y="292" width="196" height="10" rx="5" fill="{DEEP}" /><rect x="150" y="276" width="236" height="18" rx="9" fill="{SAND}" />', 'growx', 0.22, 0.16))
    o.append(S(f'<path d="M176 232a13 13 0 0 0 0 26" fill="none" stroke="{MINT}" strokeWidth="8" strokeLinecap="round" />'
               f'<path d="M176 222h50v32a22 22 0 0 1-22 22h-6a22 22 0 0 1-22-22Z" fill="{MINT}" />', 'side', 0.34, 0.14, d=-70))
    o.append(S(f'<path d="M350 232a13 13 0 0 1 0 26" fill="none" stroke="{SAND2}" strokeWidth="8" strokeLinecap="round" />'
               f'<path d="M300 222h50v32a22 22 0 0 1-22 22h-6a22 22 0 0 1-22-22Z" fill="{SAND2}" />', 'side', 0.4, 0.14, d=70))
    o.append(S(f'<path d="M201 212c-8-8 8-12 10-20" fill="none" stroke="{PAPER}" strokeWidth="6" strokeLinecap="round" pathLength={{1}} />'
               f'<path d="M325 212c-10-13 10-22 0-36s10-24 0-38s8-20 5-30" fill="none" stroke="{PAPER}" strokeWidth="6" strokeLinecap="round" pathLength={{1}} />', 'draw', 0.54, 0.18))
    o.append(S(f'<path d="M210 118h66a24 24 0 0 1 24 24v10a24 24 0 0 1-24 24h-48l-14 16 2-16h-6a24 24 0 0 1-24-24v-10a24 24 0 0 1 24-24Z" fill="{PAPER}" />'
               + ''.join(f'<circle cx="{219 + k * 24}" cy="147" r="7" fill="{INK}" />' for k in range(3)), 'pop', 0.7, 0.1))
    o.append(S(f'<path d="M310 34h60a24 24 0 0 1 24 24v6a24 24 0 0 1-24 24h-28l-12 16 0-16h-20a24 24 0 0 1-24-24v-6a24 24 0 0 1 24-24Z" fill="{MINT2}" />'
               f'<rect x="308" y="50" width="64" height="8" rx="4" fill="{INK}" /><rect x="308" y="66" width="40" height="8" rx="4" fill="{INK}" />', 'pop', 0.82, 0.1))
    return '0 0 400 310', ''.join(o)


# ------------------------------------------------------------------ the two doors: a team, and one trainer
def team():
    dots = [(40, 70, 10, MINT), (60, 78, 9, PAPER), (80, 68, 10, MINT2), (48, 50, 9, SAND), (72, 48, 9, PAPER), (58, 32, 8, MINT)]
    o = [f'<circle cx="60" cy="60" r="56" fill="{GREEN}" />']
    for x, y, rad, fill in dots:
        o.append(S(f'<circle cx="{x}" cy="{y}" r="{rad}" fill="{fill}" />', 'gather', 0, 0.85, gx=round((x - 60) * 1.5), gy=round((y - 60) * 1.5)))
    o.append(S(f'<circle cx="60" cy="60" r="13" fill="{YELLOW}" stroke="{GREEN}" strokeWidth="3" />', 'pop', 0.5, 0.4))
    return '0 0 120 120', ''.join(o)


def solo():
    o = [f'<circle cx="60" cy="60" r="56" fill="{GREEN}" />',
         f'<path d="M30 80Q60 10 90 60" fill="none" stroke="{MINT2}" strokeWidth="4" strokeDasharray="1 10" strokeLinecap="round" />',
         f'<circle cx="30" cy="80" r="5" fill="{MINT2}" />',
         S(f'<circle cx="30" cy="80" r="13" fill="{YELLOW}" />', 'hop', 0, 0.9, gx=60, gy=-20)]
    return '0 0 120 120', ''.join(o)


DRAWINGS = [
    ('ShelfIllustration', 'Campus: a shelf where the things of the training wait. Books 1 to 6 are the six modules,\n * the headphones and the page are the Studio, the screen is the replays, the two cups are the exchanges.', shelf()),
    ('DossierIllustration', 'The Formation page: at each module one more document lands on the pile, until the whole course is ready.', dossier()),
    ('ConversationIllustration', 'The closing call: a quarter of an hour on the clock, two cups, a conversation.', conversation()),
    ('TeamIllustration', 'An institute: the trainers gather, the yellow point among them.', team()),
    ('SoloIllustration', 'An independent trainer: one point, on its own way.', solo()),
]

head = '''import type { CSSProperties } from 'react';
import { S } from './motion';

// The drawings of the marketing site. Written by docs/illustrations-essai/vitrine.py: change the
// drawing there and run it again, rather than editing the shapes by hand.
// Flat shapes, one line weight, no people (persons are points). Every part sits in an <S>, which
// plays it between two moments of its block's scroll progress; without script or with reduced
// motion the finished drawing is shown. All of them are decorative for assistive technology.
'''
parts = [head]
for name, docstring, (vb, body) in DRAWINGS:
    body = body.replace('><', '>\n      <')
    parts.append(f'''
/** {docstring} */
export function {name}() {{
  return (
    <svg className="lc-il" viewBox="{vb}" aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}}
''')
open(out_path, 'w').write(''.join(parts))
print('written', out_path, len(''.join(parts)))
