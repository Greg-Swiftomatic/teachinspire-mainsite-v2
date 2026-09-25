/**
 * Page de suivi des réponses, pour Greg. Protégée par functions/_middleware.ts
 * (Basic Auth admin), comme /api/responses et /api/export.
 *
 * Rendue côté serveur, sans JavaScript : une page lisible sur téléphone, qui
 * montre d'abord qui a répondu et ce qui est publiable, puis chaque réponse.
 */

import { attributionOf, consentSummary, label } from './lib/labels';

interface Env {
  DB: D1Database;
}

type Row = Record<string, unknown>;

const esc = (v: unknown): string =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const para = (v: unknown): string =>
  typeof v === 'string' && v.trim()
    ? esc(v.trim()).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>')
    : '<span class="muted">Non renseigné</span>';

const date = (v: unknown): string => {
  const d = new Date(String(v ?? ''));
  return isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', timeZone: 'Europe/Paris' });
};

const FILTERS: Record<string, { title: string; where: string }> = {
  tous: { title: 'Toutes', where: '1=1' },
  publiables: { title: 'Publiables', where: 'consent_publish = 1' },
  video: { title: 'Partants pour une vidéo', where: 'willing_video = 1' },
  reseau: { title: 'Mise en relation possible', where: "intro_ok IN ('oui','peut_etre')" },
};

function card(r: Row): string {
  const name = [r.first_name, r.last_name].filter(Boolean).join(' ');
  const badges = [
    r.consent_publish ? '<span class="badge ok">Publiable</span>' : '<span class="badge">Interne</span>',
    r.willing_video ? '<span class="badge ok">Vidéo</span>' : '',
    r.willing_linkedin_post ? '<span class="badge ok">Post LinkedIn</span>' : '',
    r.intro_ok === 'oui' ? '<span class="badge ok">Mise en relation</span>'
      : r.intro_ok === 'peut_etre' ? '<span class="badge">Mise en relation : peut-être</span>' : '',
    r.credited_at ? '' : '<span class="badge warn">Crédits à faire</span>',
  ].filter(Boolean).join('');

  const score = typeof r.recommend_score === 'number'
    ? `<div class="score"><strong>${r.recommend_score}</strong>/10</div>` : '';

  return `
  <article class="card">
    <header>
      <div>
        <h2>${esc(name)}</h2>
        <p class="meta">${esc(label(r.role))} · ${esc(r.institute)}${r.city ? `, ${esc(r.city)}` : ''} · ${esc(date(r.submitted_at))}</p>
        <p class="meta">${esc(r.studio_email)}${r.languages ? ` · ${esc(r.languages)}` : ''}${r.learner_sectors ? ` · apprenants : ${esc(r.learner_sectors)}` : ''}</p>
      </div>
      ${score}
    </header>
    <div class="badges">${badges}</div>

    <dl class="facts">
      <div><dt>Au départ</dt><dd>${esc(label(r.initial_reaction))}${r.initial_reaction_other ? ` (${esc(r.initial_reaction_other)})` : ''}</dd></div>
      <div><dt>Temps de préparation</dt><dd>${esc(label(r.prep_time_before))} → <strong>${esc(label(r.prep_time_now))}</strong></dd></div>
      <div><dt>Usage</dt><dd>${esc(label(r.usage_frequency))}</dd></div>
    </dl>

    <section>
      <h3>Ce qui a changé</h3>
      <blockquote><p>${para(r.what_changed)}</p></blockquote>
    </section>
    <section>
      <h3>À un collègue ou un directeur qui hésite</h3>
      <blockquote><p>${para(r.to_a_skeptic)}</p></blockquote>
    </section>

    <details>
      <summary>Toutes les réponses</summary>
      <h3>Ce qu'il ou elle a créé</h3><p>${para(r.first_artifact)}</p>
      <h3>Réaction d'un apprenant</h3><p>${para(r.learner_feedback)}</p>
      <h3>À garder</h3><p>${para(r.keep_one)}</p>
      <h3>Ce qui manque</h3><p>${para(r.what_was_missing)}</p>
      <h3>Instituts</h3><p>${para(r.institutes_worked_with)}</p>
      <h3>Mise en relation</h3><p>${esc(label(r.intro_ok))}</p>
    </details>

    <footer>
      <p><strong>Publication :</strong> ${esc(consentSummary(r))}</p>
      ${r.consent_publish ? `<p><strong>Signature :</strong> ${esc(attributionOf(r))}</p>` : ''}
      ${r.linkedin_url ? `<p><a href="${esc(r.linkedin_url)}" rel="noreferrer" target="_blank">Profil LinkedIn</a></p>` : ''}
    </footer>
  </article>`;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const key = FILTERS[url.searchParams.get('f') ?? ''] ? (url.searchParams.get('f') as string) : 'tous';

  const [list, stats, pending] = await Promise.all([
    context.env.DB
      .prepare(`SELECT * FROM responses WHERE ${FILTERS[key].where} ORDER BY submitted_at DESC LIMIT 200`)
      .all<Row>(),
    context.env.DB.prepare(`
      SELECT
        (SELECT COUNT(*) FROM responses) AS total,
        (SELECT COUNT(*) FROM responses WHERE consent_publish = 1) AS publiables,
        (SELECT COUNT(*) FROM responses WHERE willing_video = 1) AS video,
        (SELECT COUNT(*) FROM responses WHERE intro_ok IN ('oui','peut_etre')) AS reseau,
        (SELECT COUNT(*) FROM invites) AS invites,
        (SELECT ROUND(AVG(recommend_score), 1) FROM responses WHERE recommend_score IS NOT NULL) AS score
    `).first<Record<string, number | null>>(),
    context.env.DB
      .prepare('SELECT first_name, email FROM invites WHERE responded_at IS NULL ORDER BY first_name')
      .all<{ first_name: string | null; email: string | null }>(),
  ]);

  const s = stats ?? {};
  const rows = list.results ?? [];
  const waiting = pending.results ?? [];

  const tabs = Object.entries(FILTERS)
    .map(([k, f]) => `<a href="?f=${k}" ${k === key ? 'aria-current="page"' : ''}>${esc(f.title)}</a>`)
    .join('');

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Suivi des témoignages | TeachInspire</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet">
<style>
  :root { --navy:#2c3d57; --cream:#f7f3eb; --rust:#b7553d; --sage:#85a2a3; --line:rgba(44,61,87,.12); }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--cream); color:var(--navy); font:15px/1.55 'DM Sans', system-ui, sans-serif; }
  .wrap { max-width: 860px; margin: 0 auto; padding: 32px 16px 64px; }
  h1, h2 { font-family: Fraunces, Georgia, serif; font-weight: 600; margin: 0; }
  h1 { font-size: 32px; line-height: 1.15; }
  .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--rust); margin: 0 0 10px; }
  .muted { color: rgba(44,61,87,.5); }
  .stats { display:grid; grid-template-columns: repeat(auto-fit, minmax(130px,1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); margin: 24px 0; }
  .stats div { background: #fff; padding: 14px 16px; }
  .stats strong { display:block; font-family: Fraunces, Georgia, serif; font-size: 28px; font-variant-numeric: tabular-nums; }
  .stats span { font-size: 13px; color: rgba(44,61,87,.6); }
  nav { display:flex; flex-wrap:wrap; gap: 8px; align-items:center; margin-bottom: 24px; }
  nav a { padding: 8px 14px; border: 1px solid var(--line); background:#fff; color: var(--navy); text-decoration:none; font-weight:500; font-size:14px; }
  nav a[aria-current] { background: var(--navy); color: var(--cream); border-color: var(--navy); }
  nav .export { margin-left:auto; color: var(--rust); border-color: rgba(183,85,61,.35); }
  .card { background:#fff; border:1px solid var(--line); padding: 22px; margin-bottom: 16px; }
  .card header { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
  .card h2 { font-size: 22px; }
  .meta { margin: 4px 0 0; font-size: 13.5px; color: rgba(44,61,87,.62); }
  .score { text-align:right; font-size: 13px; color: rgba(44,61,87,.6); white-space:nowrap; }
  .score strong { font-family: Fraunces, Georgia, serif; font-size: 26px; color: var(--navy); }
  .badges { display:flex; flex-wrap:wrap; gap:6px; margin: 14px 0; }
  .badge { font-size: 12px; font-weight:600; padding: 3px 9px; border:1px solid var(--line); color: rgba(44,61,87,.7); }
  .badge.ok { border-color: rgba(133,162,163,.6); background: rgba(133,162,163,.14); color: var(--navy); }
  .badge.warn { border-color: rgba(183,85,61,.45); background: rgba(183,85,61,.08); color: var(--rust); }
  .facts { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 12px; margin: 0 0 16px; }
  .facts dt { font-size: 11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color: rgba(44,61,87,.5); }
  .facts dd { margin: 2px 0 0; }
  h3 { font-size: 11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color: var(--rust); margin: 16px 0 6px; }
  blockquote { margin:0; padding-left: 14px; border-left: 2px solid var(--sage); font-size: 16px; }
  blockquote p, details p { margin: 0; }
  details { margin-top: 16px; border-top: 1px solid var(--line); padding-top: 12px; }
  summary { cursor:pointer; font-weight:600; }
  .card footer { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--line); font-size: 14px; }
  .card footer p { margin: 2px 0; }
  a { color: var(--rust); }
  .empty { background:#fff; border:1px dashed var(--line); padding: 32px; text-align:center; color: rgba(44,61,87,.6); }
  .pending { margin-top: 40px; }
  .pending ul { padding-left: 18px; columns: 2; font-size: 14px; }
  @media (max-width: 560px) { .card header { flex-direction: column; } .score { text-align:left; } .pending ul { columns: 1; } }
</style>
</head>
<body>
<div class="wrap">
  <p class="eyebrow">TeachInspire · Témoignages</p>
  <h1>Suivi des réponses</h1>

  <div class="stats">
    <div><strong>${s.total ?? 0}</strong><span>réponses${s.invites ? ` sur ${s.invites} invitations` : ''}</span></div>
    <div><strong>${s.publiables ?? 0}</strong><span>publiables</span></div>
    <div><strong>${s.video ?? 0}</strong><span>partants pour une vidéo</span></div>
    <div><strong>${s.reseau ?? 0}</strong><span>mises en relation possibles</span></div>
    <div><strong>${s.score == null ? '–' : String(s.score).replace('.', ',')}</strong><span>recommandation moyenne /10</span></div>
  </div>

  <nav>${tabs}<a class="export" href="/api/export">Exporter en CSV</a></nav>

  ${rows.length ? rows.map(card).join('') : '<p class="empty">Aucune réponse dans cette vue pour l’instant.</p>'}

  ${waiting.length ? `
  <section class="pending">
    <p class="eyebrow">À relancer (${waiting.length})</p>
    <ul>${waiting.map((w) => `<li>${esc(w.first_name ?? '')} <span class="muted">${esc(w.email ?? '')}</span></li>`).join('')}</ul>
  </section>` : ''}
</div>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
};
