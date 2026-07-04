const TITLE = 'PRD: TeachInspire Growth Board';

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function codeBlock(label: string, json: string): string {
  return `
    <div class="block">
      <div class="blockHead">${escapeHtml(label)}</div>
      <pre class="code"><code>${escapeHtml(json)}</code></pre>
    </div>
  `;
}

function table(headers: string[], rows: string[][]): string {
  const thead = `<tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr>`;
  const tbody = rows
    .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`)
    .join('');
  return `
    <div class="tableWrap">
      <table>
        <thead>${thead}</thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>
  `;
}

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
      :root { --navy:#2c3d57; --cream:#F4F3F0; --sage:#85a2a3; --rust:#B7553D; --yellow:#f1d263; --ink: rgba(44,61,87,0.78); }
      * { box-sizing: border-box; }
      body { margin:0; font-family: "DM Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: var(--cream); color: var(--navy); }
      a { color: var(--rust); text-decoration: none; }
      a:hover { text-decoration: underline; }
      code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .wrap { max-width: 1060px; margin: 0 auto; padding: 36px 20px 80px; }
      .top { display:flex; gap: 18px; align-items: flex-start; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid rgba(44,61,87,0.12); }
      h1 { font-family: "Fraunces", serif; font-size: 40px; letter-spacing: -0.02em; margin: 0; line-height: 1.05; }
      .kicker { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(44,61,87,0.6); }
      .sub { margin-top: 10px; color: var(--ink); line-height: 1.55; }
      .pillRow { display:flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
      .pill { font-size: 12px; padding: 6px 10px; border: 1px solid rgba(44,61,87,0.16); background: rgba(255,255,255,0.65); }
      .nav { margin-top: 18px; display:flex; flex-wrap: wrap; gap: 10px; }
      .nav a { font-size: 13px; color: rgba(44,61,87,0.74); padding: 6px 10px; border: 1px solid rgba(44,61,87,0.12); background: rgba(255,255,255,0.6); }
      .nav a:hover { color: var(--navy); text-decoration: none; border-color: rgba(44,61,87,0.22); }
      h2 { font-family: "Fraunces", serif; font-size: 24px; margin: 30px 0 10px; }
      h3 { font-family: "Fraunces", serif; font-size: 18px; margin: 18px 0 10px; }
      p { margin: 10px 0; color: var(--ink); line-height: 1.65; }
      .callout { border-left: 3px solid var(--sage); padding: 10px 14px; background: rgba(133,162,163,0.12); color: rgba(44,61,87,0.86); margin: 12px 0; }
      .grid2 { display:grid; grid-template-columns: 1fr; gap: 16px; }
      @media (min-width: 900px) { .grid2 { grid-template-columns: 1.1fr 0.9fr; } }
      .card { background: white; border: 1px solid rgba(44,61,87,0.12); padding: 16px; }
      .block { border: 1px solid rgba(44,61,87,0.12); background: #1f2b40; color: #f6f3ea; overflow: hidden; }
      .blockHead { padding: 10px 12px; border-bottom: 1px solid rgba(246,243,234,0.14); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(246,243,234,0.72); }
      .code { margin: 0; padding: 12px; overflow:auto; font-size: 12px; line-height: 1.45; }
      .tableWrap { overflow:auto; border: 1px solid rgba(44,61,87,0.12); background: white; }
      table { width: 100%; border-collapse: collapse; min-width: 760px; }
      th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid rgba(44,61,87,0.10); vertical-align: top; }
      thead th { background: rgba(244,243,240,0.65); }
      tbody tr:nth-child(even) td { background: rgba(244,243,240,0.35); }
      ul { margin: 8px 0 0; padding-left: 18px; color: var(--ink); }
      li { margin: 6px 0; line-height: 1.6; }
      .foot { margin-top: 34px; font-size: 12px; color: rgba(44,61,87,0.62); }
    </style>
  </head>
  <body>
    <div class="wrap">
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
  const parent = url.pathname.replace(/\/[^/]*$/, '');

  const taskJson = `{
  "id": "uuid",
  "title": "string (required)",
  "description": "string (markdown supported)",
  "owner": "enum: greg | pinch | omar | octo | pearl",
  "status": "enum: backlog | todo | in_progress | blocked | in_review | done | cancelled",
  "priority": "enum: critical | high | medium | low",
  "type": "enum: task | milestone | recurring | epic",
  "sprintId": "uuid | null",
  "epicId": "uuid | null (parent epic)",
  "tags": ["string"],
  "dueDate": "ISO-8601 | null",
  "waitingOn": "string | null (who/what is blocking)",
  "deliverableUrl": "string | null (link to output)",
  "estimatedHours": "number | null",
  "actualHours": "number | null",
  "notes": "string (markdown)",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "completedAt": "ISO-8601 | null"
}`;

  const sprintJson = `{
  "id": "uuid",
  "name": "string (e.g., 'Sprint 1 — Foundation')",
  "goal": "string (one-liner objective)",
  "startDate": "ISO-8601",
  "endDate": "ISO-8601",
  "status": "enum: planning | active | review | closed",
  "retrospective": {
    "whatWorked": "string",
    "whatDidnt": "string",
    "nextActions": "string"
  },
  "metrics": {
    "tasksPlanned": "number",
    "tasksCompleted": "number",
    "tasksCarriedOver": "number",
    "velocity": "number (story points or task count)"
  }
}`;

  const epicJson = `{
  "id": "uuid",
  "title": "string (e.g., 'LinkedIn Content Engine')",
  "description": "string",
  "owner": "enum (same as task)",
  "status": "enum: active | completed | paused",
  "targetDate": "ISO-8601 | null",
  "tasks": ["task_id"],
  "createdAt": "ISO-8601"
}`;

  const metricsJson = `{
  "id": "uuid",
  "weekOf": "ISO-8601 (Monday)",
  "sprintId": "uuid",
  "metrics": {
    "leadsGenerated": "number",
    "leadsQualified": "number",
    "outreachSent": "number",
    "responsesReceived": "number",
    "meetingsBooked": "number",
    "contentPublished": "number",
    "linkedinImpressions": "number",
    "linkedinEngagement": "number",
    "websiteVisitors": "number",
    "emailSubscribers": "number",
    "revenue": "number",
    "pipelineValue": "number"
  },
  "notes": "string"
}`;

  const body = `
    <div class="top">
      <div>
        <div class="kicker">PRD</div>
        <h1>TeachInspire Growth Board</h1>
        <div class="sub">
          <div><strong>Product:</strong> TeachInspire Growth Kanban &amp; Sprint Management System</div>
          <div><strong>Author:</strong> Pinch (GM)</div>
          <div><strong>Date:</strong> 2026-02-05</div>
          <div><strong>Status:</strong> Draft (awaiting Greg&apos;s review)</div>
          <div><strong>Reference:</strong> <a href="https://master.pulse-ybh.pages.dev/kanban" target="_blank" rel="noreferrer">YBH Kanban</a></div>
        </div>
        <div class="pillRow">
          <span class="pill">Owner: Greg</span>
          <span class="pill">GM: Pinch 🦀</span>
          <span class="pill">Agents: Omar 🦞 · Octo 🐙 · Pearl 🦪</span>
        </div>
        <div class="nav">
          <a href="#overview">Overview</a>
          <a href="#roles">Users &amp; Roles</a>
          <a href="#data-model">Data Model</a>
          <a href="#api">API</a>
          <a href="#frontend">Frontend</a>
          <a href="#discord">Discord</a>
          <a href="#rhythm">Sprint Rhythm</a>
          <a href="#recurring">Recurring Tasks</a>
          <a href="#success">Success Criteria</a>
          <a href="#questions">Open Questions</a>
          <a href="${parent}">Back</a>
        </div>
      </div>
      <div class="card" style="min-width: 260px;">
        <div class="kicker">Note</div>
        <p class="callout" style="margin: 10px 0 0;">
          This is not a clone of YBH Kanban. It extends the pattern with sprints, agent workflows, recurring automation, and growth metrics.
        </p>
      </div>
    </div>

    <h2 id="overview">1. Overview</h2>
    <p>
      A project management board and API for TeachInspire&apos;s growth team: a coordinator (Pinch) managing three AI specialist agents (Omar, Octo, Pearl)
      plus the human founder (Greg). The system supports weekly sprints, task assignment per agent, performance tracking, and Discord notifications.
    </p>

    <h2 id="roles">2. Users &amp; Roles</h2>
    ${table(
      ['Role', 'User', 'Permissions'],
      [
        ['Owner', 'Greg', 'Full CRUD, approve strategy, override priorities'],
        ['GM / Coordinator', 'Pinch 🦀', 'Full CRUD, assign tasks, run sprints, post reviews'],
        ['Content Lead', 'Omar 🦞', 'Read all, CRUD own tasks, submit deliverables'],
        ['Prospecting Lead', 'Octo 🐙', 'Read all, CRUD own tasks, submit deliverables'],
        ['Sales Lead', 'Pearl 🦪', 'Read all, CRUD own tasks, submit deliverables'],
      ]
    )}
    <p><strong>Authentication:</strong> API key (same pattern as YBH). One key for now, role passed as parameter.</p>

    <h2 id="data-model">3. Data Model</h2>
    <h3>3.1 Task</h3>
    ${codeBlock('Task (JSON)', taskJson)}
    <h3>3.2 Sprint</h3>
    ${codeBlock('Sprint (JSON)', sprintJson)}
    <h3>3.3 Epic</h3>
    ${codeBlock('Epic (JSON)', epicJson)}
    <h3>3.4 Growth Metrics (Weekly Snapshot)</h3>
    ${codeBlock('Growth Metrics (JSON)', metricsJson)}

    <h2 id="api">4. API Endpoints</h2>
    <p><strong>Base URL:</strong> <code>https://api.teachinspire.me/api</code> (or similar) &nbsp; <strong>Auth:</strong> <code>X-API-Key</code> header</p>
    <h3>4.1 Tasks</h3>
    ${table(
      ['Method', 'Endpoint', 'Description'],
      [
        ['GET', '/tasks', 'List tasks (filter by owner, status, sprint, tag, epic)'],
        ['GET', '/tasks/:id', 'Get single task'],
        ['POST', '/tasks', 'Create task'],
        ['PATCH', '/tasks/:id', 'Update task'],
        ['DELETE', '/tasks/:id', 'Archive task (soft delete)'],
        ['POST', '/tasks/bulk', 'Batch create/update'],
        ['GET', '/tasks/mine/:owner', 'Get tasks for a specific agent'],
      ]
    )}
    <h3>4.2 Sprints</h3>
    ${table(
      ['Method', 'Endpoint', 'Description'],
      [
        ['GET', '/sprints', 'List all sprints'],
        ['GET', '/sprints/current', 'Get active sprint'],
        ['GET', '/sprints/:id', 'Get sprint + its tasks'],
        ['POST', '/sprints', 'Create sprint'],
        ['PATCH', '/sprints/:id', 'Update sprint (including retrospective)'],
        ['POST', '/sprints/:id/close', 'Close sprint, carry over incomplete tasks'],
      ]
    )}
    <h3>4.3 Epics</h3>
    ${table(
      ['Method', 'Endpoint', 'Description'],
      [
        ['GET', '/epics', 'List epics'],
        ['GET', '/epics/:id', 'Get epic + tasks'],
        ['POST', '/epics', 'Create epic'],
        ['PATCH', '/epics/:id', 'Update epic'],
      ]
    )}
    <h3>4.4 Metrics</h3>
    ${table(
      ['Method', 'Endpoint', 'Description'],
      [
        ['GET', '/metrics', 'List weekly snapshots'],
        ['GET', '/metrics/latest', 'Current week'],
        ['POST', '/metrics', 'Record weekly snapshot'],
        ['GET', '/metrics/trends', 'Aggregated trends (last N weeks)'],
      ]
    )}
    <h3>4.5 Dashboard</h3>
    ${table(['Method', 'Endpoint', 'Description'], [['GET', '/dashboard', 'Summary: active sprint, tasks by status/owner, key metrics']])}

    <h2 id="frontend">5. Frontend — Board UI</h2>
    <div class="grid2">
      <div class="card">
        <h3>Kanban Board (default)</h3>
        <ul>
          <li>Columns: Backlog → Todo → In Progress → Blocked → In Review → Done</li>
          <li>Cards: title, owner avatar/emoji, priority badge, due date, tags</li>
          <li>Filter by: owner, sprint, epic, tag</li>
          <li>Drag-and-drop between columns</li>
        </ul>
      </div>
      <div class="card">
        <h3>Sprint View</h3>
        <ul>
          <li>Current sprint goal + progress bar</li>
          <li>Tasks grouped by owner (swimlanes)</li>
          <li>Burndown or completion chart</li>
          <li>Sprint history with retrospectives</li>
        </ul>
      </div>
      <div class="card">
        <h3>Agent View</h3>
        <ul>
          <li>One column per agent showing their active tasks</li>
          <li>Workload visualization (how loaded is each agent?)</li>
        </ul>
      </div>
      <div class="card">
        <h3>Metrics Dashboard</h3>
        <ul>
          <li>Weekly growth metrics charts (line/bar)</li>
          <li>Sprint velocity over time</li>
          <li>Pipeline funnel: leads → qualified → outreach → response → meeting → close</li>
          <li>Content performance: posts → impressions → engagement</li>
        </ul>
      </div>
    </div>
    <div class="card" style="margin-top:16px;">
      <h3>Nice-to-have: Timeline/Roadmap</h3>
      <ul>
        <li>Epics on a timeline</li>
        <li>Milestones marked</li>
      </ul>
    </div>
    <div class="card" style="margin-top:16px;">
      <h3>Tech Stack Recommendation</h3>
      <p>Match YBH stack for consistency:</p>
      <ul>
        <li>Frontend: React/Next.js or plain HTML + Cloudflare Pages</li>
        <li>Backend: Cloudflare Workers + D1 (SQLite) or KV</li>
        <li>Auth: API key (simple, same as YBH)</li>
        <li>Hosting: Cloudflare Pages + Workers</li>
      </ul>
    </div>

    <h2 id="discord">6. Discord Integration</h2>
    <h3>6.1 Webhook Notifications</h3>
    ${table(
      ['Event', 'Channel', 'Message'],
      [
        ['Task created', '#dashboard', '🆕 [Omar] New task: Write LinkedIn post about X'],
        ['Task status changed', '#dashboard', '✅ [Octo] Completed: Research Institut Français Lyon'],
        ['Task blocked', '#dashboard', '🚫 [Pearl] Blocked: Follow-up with X — waiting on response'],
        ['Sprint started', '#dashboard', "🏃 Sprint 3 started: 'Scale Outreach' — 12 tasks, 5 days"],
        ['Sprint closed', '#dashboard', '📊 Sprint 3 closed: 10/12 done, velocity 10, 2 carried over'],
        ['Weekly metrics posted', '#dashboard', '📈 Week of Feb 10: 15 leads, 8 qualified, 3 meetings'],
      ]
    )}
    <h3>6.2 Discord Bot Commands (Phase 2)</h3>
    <ul>
      <li><code>/task add [title] [owner]</code> — quick task creation</li>
      <li><code>/task list [owner]</code> — show my tasks</li>
      <li><code>/sprint status</code> — current sprint summary</li>
      <li><code>/metrics</code> — this week&apos;s numbers</li>
    </ul>

    <h2 id="rhythm">7. Sprint Rhythm</h2>
    ${table(
      ['Day', 'Activity', 'Owner'],
      [
        ['Monday', 'Sprint planning: set goal, assign tasks, post to #dashboard', 'Pinch'],
        ['Tue–Thu', 'Async standup: agents log progress in #standup', 'All agents'],
        ['Wednesday', 'Mid-week check: blocked items review, reprioritize if needed', 'Pinch'],
        ['Friday', 'Sprint review: summarize results, post metrics, retrospective', 'Pinch'],
        ['Friday', 'Greg review: Greg approves/adjusts next sprint direction', 'Greg'],
      ]
    )}

    <h2 id="recurring">8. Recurring Automated Tasks</h2>
    ${table(
      ['Task', 'Frequency', 'Agent'],
      [
        ['Post sprint standup prompt', 'Daily (Mon-Fri 9AM)', 'Pinch'],
        ['Check blocked tasks', 'Daily', 'Pinch'],
        ['Compile weekly metrics', 'Friday', 'Pinch'],
        ['Post sprint review', 'Friday', 'Pinch'],
        ['LinkedIn content publish', '3x/week', 'Omar (spawned)'],
        ['Lead research batch', '2x/week', 'Octo (spawned)'],
        ['Follow-up check', 'Daily', 'Pearl (spawned)'],
      ]
    )}

    <h2 id="success">9. Success Criteria</h2>
    <div class="grid2">
      <div class="card">
        <h3>MVP (Week 1)</h3>
        <ul>
          <li>API deployed with task + sprint CRUD</li>
          <li>Basic Kanban board UI (drag-and-drop)</li>
          <li>Sprint view with current sprint</li>
          <li>Discord webhook notifications working</li>
          <li>Pinch can create/update tasks via API</li>
        </ul>
      </div>
      <div class="card">
        <h3>V1 (Week 2-3)</h3>
        <ul>
          <li>Agent swimlane view</li>
          <li>Metrics dashboard with charts</li>
          <li>Growth metrics tracking</li>
          <li>Sprint retrospective flow</li>
          <li>Automated sprint reports</li>
        </ul>
      </div>
      <div class="card">
        <h3>V2 (Month 2)</h3>
        <ul>
          <li>Discord slash commands</li>
          <li>Timeline/roadmap view</li>
          <li>Velocity trending</li>
          <li>Pipeline funnel visualization</li>
          <li>Email notifications</li>
        </ul>
      </div>
    </div>

    <h2 id="questions">10. Open Questions</h2>
    <ul>
      <li><strong>Domain:</strong> Deploy on teachinspire.me subdomain (e.g., board.teachinspire.me)?</li>
      <li><strong>Access:</strong> Just API key, or add login for Greg?</li>
      <li><strong>Existing data:</strong> Any current leads/prospects to import?</li>
      <li><strong>Budget:</strong> Any constraints on hosting/infra?</li>
    </ul>

    <div class="foot">
      This PRD is a living document. Greg approves direction, Pinch manages updates.
    </div>
  `;

  return htmlPage(body);
};
