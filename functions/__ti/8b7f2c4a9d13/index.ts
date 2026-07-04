const TITLE = 'TeachInspire Internal';

function htmlPage(body: string): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${TITLE}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap" rel="stylesheet" />
    <style>
      :root { --navy:#2c3d57; --cream:#F4F3F0; --sage:#85a2a3; --rust:#B7553D; --yellow:#f1d263; }
      * { box-sizing: border-box; }
      body { margin:0; font-family: "DM Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: var(--cream); color: var(--navy); }
      a { color: var(--rust); text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 960px; margin: 0 auto; padding: 40px 20px; }
      .top { display:flex; justify-content: space-between; align-items: baseline; gap: 12px; border-bottom: 1px solid rgba(44,61,87,0.12); padding-bottom: 16px; }
      h1 { font-family: "Fraunces", serif; font-size: 34px; margin: 0; letter-spacing: -0.02em; }
      .meta { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(44,61,87,0.6); }
      .card { margin-top: 24px; background: white; border: 1px solid rgba(44,61,87,0.12); padding: 18px; }
      .list { display:grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
      .item { display:flex; justify-content: space-between; gap: 12px; align-items: center; padding: 14px 14px; border: 1px solid rgba(44,61,87,0.12); background: rgba(244,243,240,0.5); }
      .item strong { font-weight: 700; }
      .pill { font-size: 12px; padding: 4px 10px; border: 1px solid rgba(44,61,87,0.18); background: rgba(241,210,99,0.18); }
      .note { margin-top: 14px; font-size: 13px; color: rgba(44,61,87,0.7); line-height: 1.5; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="top">
        <div>
          <div class="meta">Internal</div>
          <h1>TeachInspire Docs</h1>
        </div>
        <div class="meta">Edge protected</div>
      </div>
      ${body}
    </div>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  });
}

export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const base = url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;

  return htmlPage(`
    <div class="card">
      <ul class="list">
        <li class="item">
          <div>
            <strong>Growth Board</strong><br />
            <span class="meta">Kanban + CRUD + D1</span>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="pill">App</span>
            <a href="${base}/board">Open</a>
          </div>
        </li>
        <li class="item">
          <div>
            <strong>PRD: TeachInspire Growth Board</strong><br />
            <span class="meta">Draft · 2026-02-05</span>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="pill">PRD</span>
            <a href="${base}/growth-board">Open</a>
          </div>
        </li>
      </ul>
      <div class="note">
        This directory is intentionally not linked from the public site. If you need to rotate the route, rename
        <code>functions/__ti/8b7f2c4a9d13</code> and update <code>functions/_middleware.ts</code>.
      </div>
    </div>
  `);
};
