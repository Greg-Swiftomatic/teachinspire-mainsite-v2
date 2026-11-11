"""Trial sheet: three illustrations in the Le cap charter, shown in their Campus context.

Run: python3 build.py  ->  writes connexion.svg, formations.svg, studio.svg and planche.html
The drawings are plain SVG (flat colour, no people). One hand for all three:
objects standing on a sand board, one line weight, and the yellow point of the logo
appearing once per image, where the eye should land.
"""
import math, os

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.abspath(os.path.join(here, '..', '..'))
FONTS = os.path.join(root, 'node_modules', '@fontsource-variable')
LOGO = os.path.join(root, 'public', 'brand', 'lockup-horizontal-on-green.svg')

GREEN, GREEN2, GREEN3, DEEP = '#0f3b2e', '#164a3a', '#2f6652', '#0b2e24'
MINT, MINT2, SAND, SAND2, PAPER = '#ddeedf', '#bfd8cc', '#efebdd', '#e3dfd0', '#fcfbf7'
YELLOW, TANG, INK, PEACH, GOLD = '#ffd23f', '#f2622e', '#10231c', '#fde3d7', '#fff1bf'
NUM = 'font-family="Bricolage, sans-serif" font-weight="800"'


def svg(w, h, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img">{body}</svg>'


# ---------------------------------------------------------------- 1. Connexion
# "Retrouvez vos formations, le Studio, vos replays et vos échanges."
# A shelf where your things wait for you, in the order of the sentence.
def connexion():
    o = []
    S = 452  # top of the board
    o.append(f'<path d="M96 {S}a354 354 0 0 1 708 0Z" fill="{GREEN2}"/>')
    o.append(f'<rect x="56" y="{S + 20}" width="788" height="14" rx="7" fill="{DEEP}"/>')
    o.append(f'<rect x="16" y="{S}" width="868" height="24" rx="12" fill="{SAND}"/>')

    # 1. vos formations: six modules as six books; the one in progress leans, with the yellow point
    books = [(62, 36, 204, MINT, INK), (102, 30, 240, TANG, PAPER), (136, 42, 178, PAPER, INK),
             (182, 32, 222, MINT2, INK), (218, 38, 192, SAND2, INK)]
    for n, (x, w, h, fill, ink) in enumerate(books, 1):
        y = S - h
        o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="{fill}"/>')
        o.append(f'<rect x="{x + 7}" y="{y + 20}" width="{w - 14}" height="7" rx="3.5" fill="{ink}" opacity="0.3"/>')
        o.append(f'<text x="{x + w / 2}" y="{S - 18}" text-anchor="middle" font-size="23" fill="{ink}" {NUM}>{n}</text>')
    o.append(f'<g transform="rotate(-15 306 {S})"><rect x="306" y="{S - 214}" width="38" height="214" rx="7" fill="{MINT}"/>'
             f'<text x="325" y="{S - 18}" text-anchor="middle" font-size="23" fill="{INK}" {NUM}>6</text>'
             f'<circle cx="325" cy="{S - 150}" r="12" fill="{YELLOW}"/></g>')

    # 2. le Studio: the page (documents) and the headphones with the sound between them (audio)
    o.append(f'<g transform="rotate(6 560 {S})"><rect x="498" y="{S - 196}" width="128" height="196" rx="12" fill="{PAPER}"/>'
             f'<rect x="516" y="{S - 172}" width="62" height="11" rx="5.5" fill="{INK}"/>'
             f'<rect x="516" y="{S - 146}" width="92" height="54" rx="10" fill="{MINT}"/>'
             + ''.join(f'<rect x="516" y="{S - 76 + k * 19}" width="{92 - (k % 2) * 22}" height="7" rx="3.5" fill="{INK}" opacity="0.26"/>' for k in range(3)) + '</g>')
    o.append(f'<path d="M388 {S - 60}v-24a66 66 0 0 1 132 0v24" fill="none" stroke="{SAND}" stroke-width="13" stroke-linecap="round"/>')
    for x in (366, 498):
        o.append(f'<rect x="{x}" y="{S - 80}" width="44" height="80" rx="17" fill="{TANG}"/>')
    o.append(f'<rect x="403" y="{S - 66}" width="11" height="52" rx="5.5" fill="{PAPER}"/><rect x="494" y="{S - 66}" width="11" height="52" rx="5.5" fill="{PAPER}"/>')
    for k, hgt in enumerate((16, 36, 24, 46, 20)):
        o.append(f'<rect x="{427 + k * 12.5}" y="{S - 36 - hgt / 2}" width="6.5" height="{hgt}" rx="3.25" fill="{MINT}"/>')

    # 3. vos replays: a screen, play, and the arrow that turns back
    o.append(f'<g transform="rotate(-5 690 {S})"><path d="M662 {S}l12-26h44l12 26Z" fill="{SAND2}"/>'
             f'<rect x="610" y="{S - 150}" width="172" height="124" rx="18" fill="{PAPER}"/>'
             f'<rect x="622" y="{S - 138}" width="148" height="100" rx="10" fill="{GREEN3}"/>'
             f'<path d="M726 {S - 88}a30 30 0 1 1-10-22" fill="none" stroke="{PAPER}" stroke-width="7" stroke-linecap="round"/>'
             f'<path d="M703 {S - 122}l15 11-17 7Z" fill="{PAPER}" stroke="{PAPER}" stroke-width="4" stroke-linejoin="round"/>'
             f'<path d="M688 {S - 101}v26l21-13Z" fill="{PAPER}" stroke="{PAPER}" stroke-width="5" stroke-linejoin="round"/></g>')

    # 4. vos échanges: two cups, and the steam that turns into talk
    o.append(f'<path d="M800 {S - 70}c-11-14 11-24 0-39s11-24 0-37" fill="none" stroke="{PAPER}" stroke-width="6" stroke-linecap="round"/>')
    o.append(f'<path d="M856 {S - 70}c-11-15 11-26 0-42s11-27 0-43s10-26 2-40s6-22 0-32" fill="none" stroke="{PAPER}" stroke-width="6" stroke-linecap="round"/>')
    o.append(f'<path d="M776 {S - 48}a14 14 0 0 0 0 28" fill="none" stroke="{MINT}" stroke-width="8" stroke-linecap="round"/>'
             f'<path d="M776 {S - 58}h50v34a24 24 0 0 1-24 24h-2a24 24 0 0 1-24-24Z" fill="{MINT}"/>')
    o.append(f'<path d="M882 {S - 48}a14 14 0 0 1 0 28" fill="none" stroke="{SAND2}" stroke-width="8" stroke-linecap="round"/>'
             f'<path d="M832 {S - 58}h50v34a24 24 0 0 1-24 24h-2a24 24 0 0 1-24-24Z" fill="{SAND2}"/>')
    o.append(f'<path d="M716 {S - 232}h92a26 26 0 0 1 26 26v12a26 26 0 0 1-26 26h-4l-4 16-14-16h-70a26 26 0 0 1-26-26v-12a26 26 0 0 1 26-26Z" fill="{PAPER}"/>'
             + ''.join(f'<circle cx="{738 + k * 24}" cy="{S - 200}" r="7" fill="{INK}"/>' for k in range(3)))
    o.append(f'<path d="M800 {S - 344}h64a24 24 0 0 1 24 24v10a24 24 0 0 1-24 24h-2l-6 15-12-15h-44a24 24 0 0 1-24-24v-10a24 24 0 0 1 24-24Z" fill="{MINT2}"/>'
             f'<rect x="798" y="{S - 326}" width="68" height="8" rx="4" fill="{INK}"/><rect x="798" y="{S - 310}" width="44" height="8" rx="4" fill="{INK}"/>')
    return svg(900, 500, ''.join(o))


def smooth(pts, n=16):
    out = []
    for i in range(len(pts) - 1):
        p0, p1, p2, p3 = pts[max(0, i - 1)], pts[i], pts[i + 1], pts[min(len(pts) - 1, i + 2)]
        for k in range(n):
            t = k / n
            out.append(tuple(0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t * t
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t ** 3) for j in (0, 1)))
    out.append(pts[-1])
    return 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in out)


# ---------------------------------------------------------------- 2. Formations
# "Gérez vos formations et vos groupes. Créez vos parcours, organisez les modules et accompagnez vos groupes."
# A course laid like the path of a board game: numbered modules, the last one being put down,
# groups moving along it as points, and the yellow point leading them.
def formations():
    o = []
    C = [(96, 404), (214, 384), (322, 318), (430, 246), (546, 196), (668, 178)]
    R = [-4, -18, -30, -28, -14, -4]
    o.append(f'<circle cx="400" cy="300" r="292" fill="{GREEN2}"/>')
    o.append(f'<path d="{smooth([(40, 412)] + C)}" fill="none" stroke="{GREEN3}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>')
    fills = [(MINT, INK), (PAPER, INK), (MINT2, INK), (SAND, INK), (PAPER, INK)]

    def tile(n, fill, ink, extra=''):
        cx, cy = C[n]
        return (f'<g transform="translate({cx} {cy}) rotate({R[n]}) {extra}"><rect x="-58" y="-46" width="116" height="92" rx="22" fill="{fill}"/>'
                f'<text x="-40" y="-2" font-size="40" fill="{ink}" {NUM}>{n + 1}</text>'
                f'<rect x="-40" y="14" width="52" height="7" rx="3.5" fill="{ink}" opacity="0.24"/><rect x="-40" y="27" width="34" height="7" rx="3.5" fill="{ink}" opacity="0.24"/></g>')

    for n, (fill, ink) in enumerate(fills):
        o.append(tile(n, fill, ink))
    # the place kept for the sixth module, and the module on its way there
    cx, cy = C[5]
    o.append(f'<g transform="translate({cx} {cy}) rotate({R[5]})"><rect x="-58" y="-46" width="116" height="92" rx="22" fill="none" stroke="{MINT2}" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/></g>')
    o.append(f'<path d="M{cx - 4} {cy - 64}q-14 16-12 34M{cx + 34} {cy - 74}q-12 14-10 30" fill="none" stroke="{MINT2}" stroke-width="5" stroke-linecap="round"/>')
    o.append(f'<g transform="translate(46 -108)">{tile(5, TANG, PAPER, "rotate(13)")}</g>')
    o.append(f'<path transform="translate({cx + 86} {cy - 104}) scale(2)" d="M3 3L3 27L9.2 21.2L13.4 30.8L17.6 29L13.4 19.4L22 19.4Z" fill="{PAPER}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')

    # the groups: points travelling together; dotted hops show the way they came
    def hop(a, b, lift):
        return f'<path d="M{a[0]} {a[1]}Q{(a[0] + b[0]) / 2} {min(a[1], b[1]) - lift} {b[0]} {b[1]}" fill="none" stroke="{PAPER}" stroke-width="5" stroke-dasharray="1 13" stroke-linecap="round"/>'
    o.append(hop((C[0][0] + 30, C[0][1] - 40), (C[1][0] + 34, C[1][1] - 52), 56))
    o.append(hop((C[2][0] + 34, C[2][1] - 44), (C[3][0] + 30, C[3][1] - 62), 54))
    o.append(hop((C[3][0] + 54, C[3][1] - 66), (C[4][0] + 26, C[4][1] - 50), 50))

    def group(c, dots):
        return ''.join(f'<circle cx="{c[0] + dx}" cy="{c[1] + dy}" r="{r}" fill="{f}" stroke="{GREEN}" stroke-width="3"/>' for dx, dy, r, f in dots)
    o.append(group(C[1], [(18, -30, 14, MINT), (44, -22, 13, SAND), (30, -52, 13, MINT2), (56, -46, 12, PAPER)]))
    o.append(group(C[3], [(14, -34, 14, PAPER), (40, -30, 13, MINT), (26, -58, 13, SAND), (52, -54, 13, MINT2), (38, -80, 12, PAPER)]))
    gx, gy = C[4]
    o.append(f'<circle cx="{gx + 26}" cy="{gy - 26}" r="22" fill="{YELLOW}" stroke="{GREEN}" stroke-width="3"/>')
    return svg(820, 500, ''.join(o))


# ---------------------------------------------------------------- 3. Studio
# "Qu'allez-vous créer aujourd'hui ?"
# A request becomes sound, the sound becomes text, the text becomes a page.
def studio():
    o = []
    o.append(f'<circle cx="520" cy="290" r="270" fill="{GREEN2}"/>')
    px, py, pw, ph = 500, 96, 286, 388
    o.append(f'<rect x="{px + 26}" y="{py - 8}" width="{pw}" height="{ph}" rx="24" fill="{SAND2}" transform="rotate(7 {px + pw / 2} {py + ph / 2})"/>')
    o.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="24" fill="{PAPER}"/>')
    o.append(f'<rect x="{px + 30}" y="{py + 34}" width="140" height="16" rx="8" fill="{INK}"/>')
    o.append(f'<rect x="{px + 30}" y="{py + 72}" width="{pw - 60}" height="104" rx="16" fill="{MINT}"/>')
    for k, hgt in enumerate((22, 48, 30, 64, 36, 54, 24, 42, 18)):
        o.append(f'<rect x="{px + 58}" y="{py + 124 - hgt / 2}" width="9" height="{hgt}" rx="4.5" fill="{GREEN}" transform="translate({k * 18} 0)"/>')
    o.append(f'<circle cx="{px + pw - 58}" cy="{py + 124}" r="18" fill="{TANG}"/>')

    # the request
    o.append(f'<path d="M58 40h170a36 36 0 0 1 36 36v44a36 36 0 0 1-36 36H122l-30 32 4-32H58a36 36 0 0 1-36-36V76a36 36 0 0 1 36-36Z" fill="{PAPER}"/>')
    o.append(f'<rect x="54" y="74" width="140" height="12" rx="6" fill="{INK}"/><rect x="54" y="102" width="88" height="12" rx="6" fill="{INK}"/>'
             f'<rect x="156" y="94" width="8" height="28" rx="4" fill="{TANG}"/>')

    # the thread: sound that settles into a line of text
    x0, x1 = 266, px + 30
    y0, y1 = 98, py + 222
    pts, steps = [], 320
    for i in range(steps + 1):
        t = i / steps
        x = x0 + (x1 - x0) * t
        base = y0 + (y1 - y0) * (t * t * (3 - 2 * t))
        amp = 84 * math.sin(math.pi * t) ** 1.3 * (1 - t) ** 0.25
        pts.append((x, base + amp * math.sin(2 * math.pi * 5.5 * t)))
    end = px + pw - 30
    d = 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + f'L{end} {y1}'
    o.append(f'<path d="{d}" fill="none" stroke="{PAPER}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>')
    o.append(f'<clipPath id="page"><rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="24"/></clipPath>')
    o.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#page)"/>')
    o.append(f'<path d="M{x1} {y1 + 42}H{end - 40}M{x1} {y1 + 84}H{end - 12}M{x1} {y1 + 126}H{x1 + 104}" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>')
    o.append(f'<circle cx="{x1 + 134}" cy="{y1 + 126}" r="20" fill="{YELLOW}"/>')
    return svg(820, 500, ''.join(o))


DRAWINGS = {'connexion': connexion(), 'formations': formations(), 'studio': studio()}
for name, code in DRAWINGS.items():
    open(os.path.join(here, f'{name}.svg'), 'w').write(code)

CSS = f'''
@font-face {{ font-family: "Bricolage"; src: url("file://{FONTS}/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2") format("woff2"); font-weight: 200 800; }}
@font-face {{ font-family: "Onest"; src: url("file://{FONTS}/onest/files/onest-latin-wght-normal.woff2") format("woff2"); font-weight: 100 900; }}
* {{ box-sizing: border-box; margin: 0; }}
body {{ width: 1600px; padding: 56px; background: {PAPER}; color: {INK}; font-family: "Onest", sans-serif; display: grid; gap: 48px; }}
h1 {{ font-family: "Bricolage"; font-size: 54px; font-weight: 700; letter-spacing: -0.02em; }}
.label {{ font-size: 20px; font-weight: 600; color: #2f4a40; margin-bottom: 14px; }}
.row {{ display: grid; grid-template-columns: 800px 1fr; gap: 56px; align-items: start; }}
.rules {{ display: grid; gap: 22px; padding-top: 44px; }}
.rules h2 {{ font-family: "Bricolage"; font-size: 34px; font-weight: 700; letter-spacing: -0.02em; }}
.rules li {{ list-style: none; padding: 20px 24px; background: {SAND}; border-radius: 22px; font-size: 21px; line-height: 1.4; }}
.rules li strong {{ display: block; font-family: "Bricolage"; font-size: 25px; letter-spacing: -0.01em; }}
.swatches {{ display: flex; gap: 10px; }}
.swatches i {{ width: 54px; height: 54px; border-radius: 50%; border: 2px solid {SAND2}; }}
.green {{ position: relative; overflow: hidden; background: {GREEN}; color: #fff; border-radius: 40px; }}
.login {{ display: flex; flex-direction: column; min-height: 940px; padding: 52px 56px 60px; }}
.login-top {{ display: flex; align-items: center; gap: 16px; }}
.login-top img {{ height: 44px; }}
.chip {{ padding: 7px 18px; border-radius: 999px; background: {GREEN2}; font-size: 18px; font-weight: 600; }}
.login svg {{ width: calc(100% + 60px); margin: auto -30px; }}
.login p {{ font-family: "Bricolage"; font-size: 58px; font-weight: 700; line-height: 1.04; letter-spacing: -0.02em; }}
.banner {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; padding: 40px 30px 40px 84px; min-height: 540px; }}
.banner small {{ color: {YELLOW}; font-size: 22px; font-weight: 600; }}
.banner h2 {{ font-family: "Bricolage"; font-size: 72px; font-weight: 700; line-height: 1.03; letter-spacing: -0.02em; margin: 14px 0 18px; }}
.banner p {{ color: {MINT2}; font-size: 24px; line-height: 1.4; }}
.btn {{ display: inline-flex; align-items: center; margin-top: 30px; min-height: 72px; padding: 0 36px; border-radius: 999px; background: {YELLOW}; color: {INK}; font-size: 23px; font-weight: 700; }}
.banner svg {{ width: 100%; overflow: visible; }}
'''

page = f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Illustrations, planche d'essai</title><style>{CSS}</style></head><body>
<h1>Illustrations : planche d’essai</h1>
<div class="row">
  <div><p class="label">1. Écran de connexion, avec le logo complet</p>
    <div class="green login"><div class="login-top"><img src="file://{LOGO}" alt=""><span class="chip">Campus</span></div>
    {DRAWINGS['connexion']}
    <p>Retrouvez vos formations, le Studio, vos replays et vos échanges.</p></div></div>
  <ul class="rules">
    <h2>Le parti pris</h2>
    <li><strong>Le dessin dit la phrase.</strong>Chaque image reprend les mots du texte qu’elle accompagne, dans le même ordre.</li>
    <li><strong>Des objets, jamais de personnage.</strong>Les personnes sont des points ; le point jaune du logo, c’est vous.</li>
    <li><strong>Une seule main.</strong>Aplats, coins ronds, une épaisseur de trait, pas d’ombre floue ni de dégradé.</li>
    <li><strong>Peu de couleurs.</strong>Papier, menthe, sable et mandarine sur le vert ; le jaune une seule fois, là où l’œil doit se poser.
      <span class="swatches" style="margin-top:14px"><i style="background:{PAPER}"></i><i style="background:{MINT}"></i><i style="background:{SAND2}"></i><i style="background:{TANG}"></i><i style="background:{YELLOW}"></i><i style="background:{GREEN}"></i></span></li>
  </ul>
</div>
<div><p class="label">2. Bannière de l’accueil, côté administrateur</p>
  <div class="green banner"><div><small>Mercredi 11 novembre · Bonjour, Greg</small><h2>Gérez vos formations et vos groupes.</h2>
  <p>Créez vos parcours, organisez les modules et accompagnez vos groupes.</p><span class="btn">Gérer mes formations →</span></div>
  {DRAWINGS['formations']}</div></div>
<div><p class="label">3. Bannière du Studio</p>
  <div class="green banner"><div><small>Votre espace TeachInspire</small><h2>Qu’allez-vous créer aujourd’hui ?</h2>
  <p>Des cours adaptés à vos apprenants. L’IA vous aide, vous gardez la main.</p><span class="btn">Ouvrir le Studio →</span></div>
  {DRAWINGS['studio']}</div></div>
</body></html>'''
open(os.path.join(here, 'planche.html'), 'w').write(page)
print('ok')
