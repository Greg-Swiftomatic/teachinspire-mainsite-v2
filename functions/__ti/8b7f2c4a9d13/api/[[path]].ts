type Db = {
  exec: (sql: string) => Promise<unknown>;
  prepare: (sql: string) => { bind: (...args: unknown[]) => { all: () => Promise<{ results: unknown[] }>; first: () => Promise<unknown>; run: () => Promise<unknown> } };
};

type TaskOwner = 'greg' | 'pinch' | 'omar' | 'octo' | 'pearl';
type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'blocked' | 'in_review' | 'done' | 'cancelled';
type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
type TaskType = 'task' | 'milestone' | 'recurring' | 'epic';

type SprintStatus = 'planning' | 'active' | 'review' | 'closed';

type TaskRow = {
  id: string;
  title: string;
  description: string | null;
  owner: TaskOwner;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  sprintId: string | null;
  epicId: string | null;
  tagsJson: string;
  dueDate: string | null;
  waitingOn: string | null;
  deliverableUrl: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  archivedAt: string | null;
};

type SprintRow = {
  id: string;
  name: string;
  goal: string | null;
  startDate: string | null;
  endDate: string | null;
  status: SprintStatus;
  retrospectiveJson: string;
  metricsJson: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

type EpicStatus = 'active' | 'completed' | 'paused';
type EpicRow = {
  id: string;
  title: string;
  description: string | null;
  owner: TaskOwner;
  status: EpicStatus;
  targetDate: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

type GrowthMetrics = {
  leadsGenerated: number;
  leadsQualified: number;
  outreachSent: number;
  responsesReceived: number;
  meetingsBooked: number;
  contentPublished: number;
  linkedinImpressions: number;
  linkedinEngagement: number;
  websiteVisitors: number;
  emailSubscribers: number;
  revenue: number;
  pipelineValue: number;
};

type MetricsRow = {
  id: string;
  weekOf: string; // ISO date (YYYY-MM-DD recommended)
  sprintId: string | null;
  metricsJson: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

let didInit = false;
async function initDb(db: Db): Promise<void> {
  if (didInit) return;
  // Note: D1 can be finicky about multi-statement exec depending on runtime/version.
  // Execute one statement at a time and only mark init as done if all succeed.
  const stmts = [
    `CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      owner TEXT NOT NULL,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      type TEXT NOT NULL,
      sprintId TEXT,
      epicId TEXT,
      tagsJson TEXT NOT NULL,
      dueDate TEXT,
      waitingOn TEXT,
      deliverableUrl TEXT,
      estimatedHours REAL,
      actualHours REAL,
      notes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      completedAt TEXT,
      archivedAt TEXT
    )`,
    `CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)`,
    `CREATE INDEX IF NOT EXISTS idx_tasks_owner ON tasks(owner)`,
    `CREATE INDEX IF NOT EXISTS idx_tasks_sprintId ON tasks(sprintId)`,

    `CREATE TABLE IF NOT EXISTS sprints (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      goal TEXT,
      startDate TEXT,
      endDate TEXT,
      status TEXT NOT NULL,
      retrospectiveJson TEXT NOT NULL,
      metricsJson TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      archivedAt TEXT
    )`,
    `CREATE INDEX IF NOT EXISTS idx_sprints_status ON sprints(status)`,

    `CREATE TABLE IF NOT EXISTS epics (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      owner TEXT NOT NULL,
      status TEXT NOT NULL,
      targetDate TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      archivedAt TEXT
    )`,
    `CREATE INDEX IF NOT EXISTS idx_epics_status ON epics(status)`,
    `CREATE INDEX IF NOT EXISTS idx_epics_owner ON epics(owner)`,

    `CREATE TABLE IF NOT EXISTS metrics (
      id TEXT PRIMARY KEY,
      weekOf TEXT NOT NULL,
      sprintId TEXT,
      metricsJson TEXT NOT NULL,
      notes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      archivedAt TEXT
    )`,
    // Cleanup old unique index (if it ever existed).
    `DROP INDEX IF EXISTS idx_metrics_weekOf_unique`,
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_metrics_weekOf_active_unique ON metrics(weekOf) WHERE archivedAt IS NULL`,
    `CREATE INDEX IF NOT EXISTS idx_metrics_sprintId ON metrics(sprintId)`,
  ];

  try {
    // Use prepare().run() for DDL so we get consistent behavior across D1 runtimes.
    for (const s of stmts) await db.prepare(s).bind().run();
    didInit = true;
  } catch (e) {
    // Ensure we retry init on the next request.
    didInit = false;
    throw e;
  }
}

function json(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=UTF-8');
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  return new Response(JSON.stringify(data), { ...init, headers });
}

function err(status: number, message: string): Response {
  return json({ error: message }, { status });
}

function nowIso(): string {
  return new Date().toISOString();
}

function asArrayOfStrings(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map(String).map((s) => s.trim()).filter(Boolean);
}

function safeParseJson<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

function ownerLabel(owner: TaskOwner): string {
  if (owner === 'greg') return 'Greg';
  if (owner === 'pinch') return 'Pinch';
  if (owner === 'omar') return 'Omar';
  if (owner === 'octo') return 'Octo';
  return 'Pearl';
}

function baseInternalUrlFromRequest(requestUrl: string): string {
  // requestUrl points to /__ti/<token>/api/..., derive /__ti/<token>
  const url = new URL(requestUrl);
  const parts = url.pathname.split('/').filter(Boolean);
  const idx = parts.indexOf('__ti');
  if (idx < 0 || parts.length < idx + 2) return url.origin;
  return `${url.origin}/__ti/${parts[idx + 1]}`;
}

async function postDiscordWebhook(env: Record<string, unknown>, content: string): Promise<void> {
  const hook = (env.TI_DISCORD_WEBHOOK_URL as string | undefined) ?? '';
  if (!hook) return;
  try {
    await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
  } catch {
    // Don't block core operations on Discord failures.
  }
}

function isNotifySuppressed(request: Request): boolean {
  const v = (request.headers.get('X-TI-Suppress-Notify') || '').trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

function actorFromRequest(request: Request): string | null {
  const v = (request.headers.get('X-TI-Actor') || '').trim();
  if (!v) return null;
  return v.slice(0, 64);
}

function normalizeOwner(v: unknown): TaskOwner {
  const s = String(v || '').toLowerCase();
  if (s === 'greg' || s === 'pinch' || s === 'omar' || s === 'octo' || s === 'pearl') return s;
  return 'pinch';
}

function normalizeStatus(v: unknown): TaskStatus {
  const s = String(v || '').toLowerCase();
  if (s === 'backlog' || s === 'todo' || s === 'in_progress' || s === 'blocked' || s === 'in_review' || s === 'done' || s === 'cancelled') return s;
  return 'backlog';
}

function normalizePriority(v: unknown): TaskPriority {
  const s = String(v || '').toLowerCase();
  if (s === 'critical' || s === 'high' || s === 'medium' || s === 'low') return s;
  return 'medium';
}

function normalizeType(v: unknown): TaskType {
  const s = String(v || '').toLowerCase();
  if (s === 'task' || s === 'milestone' || s === 'recurring' || s === 'epic') return s;
  return 'task';
}

function normalizeSprintStatus(v: unknown): SprintStatus {
  const s = String(v || '').toLowerCase();
  if (s === 'planning' || s === 'active' || s === 'review' || s === 'closed') return s;
  return 'planning';
}

function normalizeEpicStatus(v: unknown): EpicStatus {
  const s = String(v || '').toLowerCase();
  if (s === 'active' || s === 'completed' || s === 'paused') return s;
  return 'active';
}

function taskRowToApi(row: TaskRow) {
  const tags = safeParseJson<string[]>(row.tagsJson, []);
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    owner: row.owner,
    status: row.status,
    priority: row.priority,
    type: row.type,
    sprintId: row.sprintId,
    epicId: row.epicId,
    tags,
    dueDate: row.dueDate,
    waitingOn: row.waitingOn,
    deliverableUrl: row.deliverableUrl,
    estimatedHours: row.estimatedHours,
    actualHours: row.actualHours,
    notes: row.notes,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    completedAt: row.completedAt,
    archivedAt: row.archivedAt,
  };
}

function sprintRowToApi(row: SprintRow) {
  const retrospective = safeParseJson(row.retrospectiveJson, { whatWorked: '', whatDidnt: '', nextActions: '' });
  const metrics = safeParseJson(row.metricsJson, { tasksPlanned: 0, tasksCompleted: 0, tasksCarriedOver: 0, velocity: 0 });
  return {
    id: row.id,
    name: row.name,
    goal: row.goal,
    startDate: row.startDate,
    endDate: row.endDate,
    status: row.status,
    retrospective,
    metrics,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    archivedAt: row.archivedAt,
  };
}

function epicRowToApi(row: EpicRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    owner: row.owner,
    status: row.status,
    targetDate: row.targetDate,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    archivedAt: row.archivedAt,
  };
}

function metricsRowToApi(row: MetricsRow) {
  const metrics = safeParseJson<GrowthMetrics>(row.metricsJson, {
    leadsGenerated: 0,
    leadsQualified: 0,
    outreachSent: 0,
    responsesReceived: 0,
    meetingsBooked: 0,
    contentPublished: 0,
    linkedinImpressions: 0,
    linkedinEngagement: 0,
    websiteVisitors: 0,
    emailSubscribers: 0,
    revenue: 0,
    pipelineValue: 0,
  });
  return {
    id: row.id,
    weekOf: row.weekOf,
    sprintId: row.sprintId,
    metrics,
    notes: row.notes,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    archivedAt: row.archivedAt,
  };
}

async function selectTaskFullById(db: Db, id: string): Promise<TaskRow | null> {
  const row = await db
    .prepare(
      `SELECT
        id, title, description, owner, status, priority, type,
        sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
        estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
       FROM tasks WHERE id = ?`
    )
    .bind(id)
    .first();
  return (row as TaskRow | null) || null;
}

async function createTaskFromBody(
  db: Db,
  env: Record<string, unknown>,
  requestUrl: string,
  request: Request,
  body: Record<string, unknown>,
  forcedId?: string
): Promise<ReturnType<typeof taskRowToApi>> {
  const title = String(body.title || '').trim();
  if (!title) throw new Error('title is required');

  const idNew = forcedId || crypto.randomUUID();
  const createdAt = nowIso();
  const updatedAt = createdAt;

  const owner = normalizeOwner(body.owner);
  const status = normalizeStatus(body.status);
  const priority = normalizePriority(body.priority);
  const type = normalizeType(body.type);
  const sprintId = body.sprintId ? String(body.sprintId) : null;
  const epicId = body.epicId ? String(body.epicId) : null;
  const tagsJson = JSON.stringify(asArrayOfStrings(body.tags));
  const dueDate = body.dueDate ? String(body.dueDate) : null;
  const waitingOn = body.waitingOn ? String(body.waitingOn) : null;
  const deliverableUrl = body.deliverableUrl ? String(body.deliverableUrl) : null;
  const estimatedHours = body.estimatedHours == null ? null : Number(body.estimatedHours);
  const actualHours = body.actualHours == null ? null : Number(body.actualHours);
  const description = body.description == null ? null : String(body.description);
  const notes = body.notes == null ? null : String(body.notes);
  const completedAt = status === 'done' ? createdAt : null;

  await db
    .prepare(
      `INSERT INTO tasks (
        id, title, description, owner, status, priority, type,
        sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
        estimatedHours, actualHours, notes,
        createdAt, updatedAt, completedAt, archivedAt
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NULL)`
    )
    .bind(
      idNew,
      title,
      description,
      owner,
      status,
      priority,
      type,
      sprintId,
      epicId,
      tagsJson,
      dueDate,
      waitingOn,
      deliverableUrl,
      Number.isFinite(estimatedHours as number) ? estimatedHours : null,
      Number.isFinite(actualHours as number) ? actualHours : null,
      notes,
      createdAt,
      updatedAt,
      completedAt
    )
    .run();

  const created = await selectTaskFullById(db, idNew);
  if (!created) throw new Error('Failed to load created task');

  const createdApi = taskRowToApi(created);
  if (!isNotifySuppressed(request)) {
    const internalBase = baseInternalUrlFromRequest(requestUrl);
    const actor = actorFromRequest(request);
    const by = actor ? `\nby: ${actor}` : '';
    await postDiscordWebhook(env, `🆕 [${ownerLabel(createdApi.owner)}] New task: ${createdApi.title}\n${internalBase}/board${by}`);
  }

  return createdApi;
}

async function readBodyJson(request: Request): Promise<unknown> {
  const text = await request.text();
  if (!text) return {};
  return JSON.parse(text) as unknown;
}

function getDb(context: { env: unknown }): Db | null {
  const env = context.env as Record<string, unknown>;
  const db = env.TI_GROWTH_BOARD_DB as Db | undefined;
  return db || null;
}

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Determine path under .../api/...
  const marker = '/api';
  const idx = url.pathname.indexOf(marker);
  if (idx < 0) return err(404, 'Not found');
  const rest = url.pathname.slice(idx + marker.length); // "" or "/..."
  const segs = rest.split('/').filter(Boolean);

  const db = getDb(context as unknown as { env: unknown });
  if (!db) return err(500, 'Missing D1 binding: TI_GROWTH_BOARD_DB');
  await initDb(db);

  if (context.request.method === 'OPTIONS') return new Response(null, { status: 204 });

  const [resource, id] = segs;
  const action = segs[2] || '';

  if (!resource) {
    return json({
      ok: true,
      resources: ['tasks', 'sprints', 'epics', 'metrics', 'dashboard'],
    });
  }

  if (resource === 'tasks') {
    // /tasks/bulk
    if (id === 'bulk') {
      if (context.request.method !== 'POST') return err(405, 'Method not allowed');

      let bodyUnknown: unknown;
      try {
        bodyUnknown = await readBodyJson(context.request);
      } catch {
        return err(400, 'Invalid JSON');
      }

      const items: unknown[] = Array.isArray(bodyUnknown)
        ? bodyUnknown
        : Array.isArray((bodyUnknown as Record<string, unknown> | null)?.items)
          ? (((bodyUnknown as Record<string, unknown>).items as unknown[]) || [])
          : [];

      if (!items.length) return err(400, 'items must be a non-empty array');

      const created: Array<ReturnType<typeof taskRowToApi>> = [];
      const updated: Array<ReturnType<typeof taskRowToApi>> = [];
      const errors: Array<{ index: number; id?: string; error: string }> = [];

      for (let i = 0; i < items.length; i++) {
        const raw = items[i];
        if (!raw || typeof raw !== 'object') {
          errors.push({ index: i, error: 'item must be an object' });
          continue;
        }

        const item = raw as Record<string, unknown>;
        const forcedId = item.id ? String(item.id) : undefined;

        try {
          if (!forcedId) {
            created.push(
              await createTaskFromBody(
                db,
                context.env as Record<string, unknown>,
                context.request.url,
                context.request,
                item
              )
            );
            continue;
          }

          const prev = await db.prepare('SELECT id, status FROM tasks WHERE id = ?').bind(forcedId).first();
          if (!prev) {
            created.push(
              await createTaskFromBody(
                db,
                context.env as Record<string, unknown>,
                context.request.url,
                context.request,
                item,
                forcedId
              )
            );
            continue;
          }
          const prevStatus = String((prev as { status: string }).status || '');

          // Patch semantics: only provided fields are updated.
          const updatedAt = nowIso();

          const title = item.title == null ? null : String(item.title).trim();
          if (title !== null && !title) throw new Error('title cannot be empty');

          const owner = item.owner == null ? null : normalizeOwner(item.owner);
          const status = item.status == null ? null : normalizeStatus(item.status);
          const priority = item.priority == null ? null : normalizePriority(item.priority);
          const type = item.type == null ? null : normalizeType(item.type);
          const sprintId = item.sprintId === undefined ? null : (item.sprintId ? String(item.sprintId) : null);
          const epicId = item.epicId === undefined ? null : (item.epicId ? String(item.epicId) : null);
          const tagsJson = item.tags == null ? null : JSON.stringify(asArrayOfStrings(item.tags));
          const dueDate = item.dueDate === undefined ? null : (item.dueDate ? String(item.dueDate) : null);
          const waitingOn = item.waitingOn === undefined ? null : (item.waitingOn ? String(item.waitingOn) : null);
          const deliverableUrl = item.deliverableUrl === undefined ? null : (item.deliverableUrl ? String(item.deliverableUrl) : null);
          const estimatedHours = item.estimatedHours === undefined ? null : (item.estimatedHours == null ? null : Number(item.estimatedHours));
          const actualHours = item.actualHours === undefined ? null : (item.actualHours == null ? null : Number(item.actualHours));
          const description = item.description === undefined ? null : (item.description == null ? null : String(item.description));
          const notes = item.notes === undefined ? null : (item.notes == null ? null : String(item.notes));
          const archivedAt = item.archivedAt === undefined ? undefined : (item.archivedAt == null ? null : String(item.archivedAt));

          const completedAt =
            status === 'done'
              ? updatedAt
              : status && status !== 'done'
                ? null
                : undefined;

          const sets: string[] = [];
          const binds: unknown[] = [];
          function addSet(col: string, val: unknown) {
            sets.push(`${col} = ?`);
            binds.push(val);
          }

          if (title !== null) addSet('title', title);
          if (owner !== null) addSet('owner', owner);
          if (status !== null) addSet('status', status);
          if (priority !== null) addSet('priority', priority);
          if (type !== null) addSet('type', type);
          if (item.sprintId !== undefined) addSet('sprintId', sprintId);
          if (item.epicId !== undefined) addSet('epicId', epicId);
          if (tagsJson !== null) addSet('tagsJson', tagsJson);
          if (item.dueDate !== undefined) addSet('dueDate', dueDate);
          if (item.waitingOn !== undefined) addSet('waitingOn', waitingOn);
          if (item.deliverableUrl !== undefined) addSet('deliverableUrl', deliverableUrl);
          if (item.estimatedHours !== undefined) addSet('estimatedHours', Number.isFinite(estimatedHours as number) ? estimatedHours : null);
          if (item.actualHours !== undefined) addSet('actualHours', Number.isFinite(actualHours as number) ? actualHours : null);
          if (item.description !== undefined) addSet('description', description);
          if (item.notes !== undefined) addSet('notes', notes);
          if (archivedAt !== undefined) addSet('archivedAt', archivedAt);
          addSet('updatedAt', updatedAt);
          if (completedAt !== undefined) addSet('completedAt', completedAt);

          if (sets.length) {
            await db.prepare(`UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`).bind(...binds, forcedId).run();
          }

          const row = await selectTaskFullById(db, forcedId);
          if (!row) throw new Error('Failed to load updated task');
          const updatedApi = taskRowToApi(row);

          // If you want to keep bulk quiet, send header X-TI-Suppress-Notify: 1.
          if (!isNotifySuppressed(context.request) && status !== null && status !== prevStatus) {
            const internalBase = baseInternalUrlFromRequest(context.request.url);
            const who = ownerLabel(updatedApi.owner);
            const actor = actorFromRequest(context.request);
            const by = actor ? `\nby: ${actor}` : '';
            if (updatedApi.status === 'blocked') {
              const waiting = updatedApi.waitingOn ? ` — waiting on: ${updatedApi.waitingOn}` : '';
              await postDiscordWebhook(context.env as Record<string, unknown>, `🚫 [${who}] Blocked: ${updatedApi.title}${waiting}\n${internalBase}/board${by}`);
            } else if (updatedApi.status === 'done') {
              await postDiscordWebhook(context.env as Record<string, unknown>, `✅ [${who}] Completed: ${updatedApi.title}\n${internalBase}/board${by}`);
            } else {
              await postDiscordWebhook(context.env as Record<string, unknown>, `🔁 [${who}] Status: ${prevStatus} → ${updatedApi.status} — ${updatedApi.title}\n${internalBase}/board${by}`);
            }
          }

          updated.push(updatedApi);
        } catch (e) {
          errors.push({ index: i, id: forcedId, error: e instanceof Error ? e.message : 'Unknown error' });
        }
      }

      return json({ created, updated, errors });
    }

    // /tasks/mine/:owner
    if (id === 'mine') {
      if (context.request.method !== 'GET') return err(405, 'Method not allowed');
      const ownerPath = segs[2] || '';
      const owner = normalizeOwner(ownerPath);

      const status = url.searchParams.get('status');
      const sprintId = url.searchParams.get('sprintId');
      const epicId = url.searchParams.get('epicId');
      const tag = url.searchParams.get('tag');
      const q = (url.searchParams.get('q') || '').trim().toLowerCase();
      const includeArchived = url.searchParams.get('includeArchived') === '1' || url.searchParams.get('includeArchived') === 'true';

      const where: string[] = [];
      const binds: unknown[] = [];

      if (!includeArchived) where.push('archivedAt IS NULL');
      where.push('owner = ?');
      binds.push(owner);

      if (status) {
        where.push('status = ?');
        binds.push(status);
      }
      if (sprintId) {
        where.push('sprintId = ?');
        binds.push(sprintId);
      }
      if (epicId) {
        where.push('epicId = ?');
        binds.push(epicId);
      }
      if (tag) {
        where.push('tagsJson LIKE ?');
        binds.push(`%${JSON.stringify(String(tag))}%`);
      }
      if (q) {
        where.push('(LOWER(title) LIKE ? OR LOWER(COALESCE(description, \'\')) LIKE ? OR LOWER(COALESCE(notes, \'\')) LIKE ? OR LOWER(tagsJson) LIKE ?)');
        binds.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
      }

      const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
      const { results } = await db
        .prepare(
          `SELECT
            id, title, description, owner, status, priority, type,
            sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
            estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
           FROM tasks
           ${whereSql}
           ORDER BY updatedAt DESC`
        )
        .bind(...binds)
        .all();

      return json({ owner, items: (results as TaskRow[]).map(taskRowToApi) });
    }

    if (!id) {
      if (context.request.method === 'GET') {
        const owner = url.searchParams.get('owner');
        const status = url.searchParams.get('status');
        const sprintId = url.searchParams.get('sprintId');
        const epicId = url.searchParams.get('epicId');
        const tag = url.searchParams.get('tag');
        const q = (url.searchParams.get('q') || '').trim().toLowerCase();
        const includeArchived = url.searchParams.get('includeArchived') === '1' || url.searchParams.get('includeArchived') === 'true';

        const where: string[] = [];
        const binds: unknown[] = [];

        if (!includeArchived) where.push('archivedAt IS NULL');
        if (owner) {
          where.push('owner = ?');
          binds.push(owner);
        }
        if (status) {
          where.push('status = ?');
          binds.push(status);
        }
        if (sprintId) {
          where.push('sprintId = ?');
          binds.push(sprintId);
        }
        if (epicId) {
          where.push('epicId = ?');
          binds.push(epicId);
        }
        if (tag) {
          where.push("tagsJson LIKE ?");
          binds.push(`%${JSON.stringify(String(tag))}%`);
        }
        if (q) {
          where.push('(LOWER(title) LIKE ? OR LOWER(COALESCE(description, \'\')) LIKE ? OR LOWER(COALESCE(notes, \'\')) LIKE ? OR LOWER(tagsJson) LIKE ?)');
          binds.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
        }

        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
        const { results } = await db
          .prepare(
            `SELECT
              id, title, description, owner, status, priority, type,
              sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
              estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
             FROM tasks
             ${whereSql}
             ORDER BY updatedAt DESC`
          )
          .bind(...binds)
          .all();

        return json({ items: (results as TaskRow[]).map(taskRowToApi) });
      }

      if (context.request.method === 'POST') {
        let body: Record<string, unknown>;
        try {
          body = (await readBodyJson(context.request)) as Record<string, unknown>;
        } catch {
          return err(400, 'Invalid JSON');
        }
        try {
          const createdApi = await createTaskFromBody(
            db,
            context.env as Record<string, unknown>,
            context.request.url,
            context.request,
            body
          );
          return json({ item: createdApi }, { status: 201 });
        } catch (e) {
          return err(400, e instanceof Error ? e.message : 'Invalid request');
        }
      }

      return err(405, 'Method not allowed');
    }

    // /tasks/:id
    if (context.request.method === 'GET') {
      const row = await db
        .prepare(
          `SELECT
            id, title, description, owner, status, priority, type,
            sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
            estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
           FROM tasks WHERE id = ?`
        )
        .bind(id)
        .first();
      if (!row) return err(404, 'Not found');
      return json({ item: taskRowToApi(row as TaskRow) });
    }

    if (context.request.method === 'PATCH') {
      let body: Record<string, unknown>;
      try {
        body = (await readBodyJson(context.request)) as Record<string, unknown>;
      } catch {
        return err(400, 'Invalid JSON');
      }

      const existing = await db
        .prepare('SELECT id, title, owner, status, waitingOn, archivedAt FROM tasks WHERE id = ?')
        .bind(id)
        .first();
      if (!existing) return err(404, 'Not found');
      const existingRow = existing as Pick<TaskRow, 'id' | 'title' | 'owner' | 'status' | 'waitingOn' | 'archivedAt'>;

      const title = body.title == null ? null : String(body.title).trim();
      if (title !== null && !title) return err(400, 'title cannot be empty');

      const owner = body.owner == null ? null : normalizeOwner(body.owner);
      const status = body.status == null ? null : normalizeStatus(body.status);
      const priority = body.priority == null ? null : normalizePriority(body.priority);
      const type = body.type == null ? null : normalizeType(body.type);
      const sprintId = body.sprintId === undefined ? null : (body.sprintId ? String(body.sprintId) : null);
      const epicId = body.epicId === undefined ? null : (body.epicId ? String(body.epicId) : null);
      const tagsJson = body.tags == null ? null : JSON.stringify(asArrayOfStrings(body.tags));
      const dueDate = body.dueDate === undefined ? null : (body.dueDate ? String(body.dueDate) : null);
      const waitingOn = body.waitingOn === undefined ? null : (body.waitingOn ? String(body.waitingOn) : null);
      const deliverableUrl = body.deliverableUrl === undefined ? null : (body.deliverableUrl ? String(body.deliverableUrl) : null);
      const estimatedHours = body.estimatedHours === undefined ? null : (body.estimatedHours == null ? null : Number(body.estimatedHours));
      const actualHours = body.actualHours === undefined ? null : (body.actualHours == null ? null : Number(body.actualHours));
      const description = body.description === undefined ? null : (body.description == null ? null : String(body.description));
      const notes = body.notes === undefined ? null : (body.notes == null ? null : String(body.notes));
      const archivedAt = body.archivedAt === undefined ? undefined : (body.archivedAt == null ? null : String(body.archivedAt));

      const updatedAt = nowIso();
      const completedAt =
        status === 'done'
          ? updatedAt
          : status && status !== 'done'
            ? null
            : undefined; // unchanged

      const sets: string[] = [];
      const binds: unknown[] = [];

      function addSet(col: string, val: unknown) {
        sets.push(`${col} = ?`);
        binds.push(val);
      }

      if (title !== null) addSet('title', title);
      if (owner !== null) addSet('owner', owner);
      if (status !== null) addSet('status', status);
      if (priority !== null) addSet('priority', priority);
      if (type !== null) addSet('type', type);
      if (body.sprintId !== undefined) addSet('sprintId', sprintId);
      if (body.epicId !== undefined) addSet('epicId', epicId);
      if (tagsJson !== null) addSet('tagsJson', tagsJson);
      if (body.dueDate !== undefined) addSet('dueDate', dueDate);
      if (body.waitingOn !== undefined) addSet('waitingOn', waitingOn);
      if (body.deliverableUrl !== undefined) addSet('deliverableUrl', deliverableUrl);
      if (body.estimatedHours !== undefined) addSet('estimatedHours', Number.isFinite(estimatedHours as number) ? estimatedHours : null);
      if (body.actualHours !== undefined) addSet('actualHours', Number.isFinite(actualHours as number) ? actualHours : null);
      if (body.description !== undefined) addSet('description', description);
      if (body.notes !== undefined) addSet('notes', notes);
      if (archivedAt !== undefined) addSet('archivedAt', archivedAt);

      addSet('updatedAt', updatedAt);

      if (completedAt !== undefined) addSet('completedAt', completedAt);

      if (!sets.length) return json({ ok: true });

      await db
        .prepare(`UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`)
        .bind(...binds, id)
        .run();

      const row = await db
        .prepare(
          `SELECT
            id, title, description, owner, status, priority, type,
            sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
            estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
           FROM tasks WHERE id = ?`
        )
        .bind(id)
        .first();

      const updatedApi = taskRowToApi(row as TaskRow);

      // Discord notifications on status changes.
      if (!isNotifySuppressed(context.request) && status !== null && status !== existingRow.status) {
        const internalBase = baseInternalUrlFromRequest(context.request.url);
        const who = ownerLabel(updatedApi.owner);
        const actor = actorFromRequest(context.request);
        const by = actor ? `\nby: ${actor}` : '';
        if (updatedApi.status === 'blocked') {
          const waiting = updatedApi.waitingOn ? ` — waiting on: ${updatedApi.waitingOn}` : '';
          await postDiscordWebhook(context.env as Record<string, unknown>, `🚫 [${who}] Blocked: ${updatedApi.title}${waiting}\n${internalBase}/board${by}`);
        } else if (updatedApi.status === 'done') {
          await postDiscordWebhook(context.env as Record<string, unknown>, `✅ [${who}] Completed: ${updatedApi.title}\n${internalBase}/board${by}`);
        } else {
          await postDiscordWebhook(
            context.env as Record<string, unknown>,
            `🔁 [${who}] Status: ${existingRow.status} → ${updatedApi.status} — ${updatedApi.title}\n${internalBase}/board${by}`
          );
        }
      }

      return json({ item: updatedApi });
    }

    if (context.request.method === 'DELETE') {
      const archivedAt = nowIso();
      await db.prepare('UPDATE tasks SET archivedAt = ?, updatedAt = ? WHERE id = ?').bind(archivedAt, archivedAt, id).run();
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
    }

    return err(405, 'Method not allowed');
  }

  if (resource === 'sprints') {
    // /sprints/current
    if (id === 'current') {
      if (context.request.method !== 'GET') return err(405, 'Method not allowed');
      const row = await db
        .prepare(
          "SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt FROM sprints WHERE status = 'active' AND archivedAt IS NULL ORDER BY updatedAt DESC LIMIT 1"
        )
        .bind()
        .first();
      return json({ item: row ? sprintRowToApi(row as SprintRow) : null });
    }

    if (!id) {
      if (context.request.method === 'GET') {
        const includeArchived = url.searchParams.get('includeArchived') === '1' || url.searchParams.get('includeArchived') === 'true';
        const where = includeArchived ? '' : 'WHERE archivedAt IS NULL';
        const { results } = await db
          .prepare(
            `SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt
             FROM sprints ${where}
             ORDER BY (CASE status WHEN 'active' THEN 0 WHEN 'planning' THEN 1 WHEN 'review' THEN 2 ELSE 3 END), startDate DESC, createdAt DESC`
          )
          .bind()
          .all();
        return json({ items: (results as SprintRow[]).map(sprintRowToApi) });
      }

      if (context.request.method === 'POST') {
        let body: Record<string, unknown>;
        try {
          body = (await readBodyJson(context.request)) as Record<string, unknown>;
        } catch {
          return err(400, 'Invalid JSON');
        }

        const name = String(body.name || '').trim();
        if (!name) return err(400, 'name is required');

        const idNew = crypto.randomUUID();
        const createdAt = nowIso();
        const updatedAt = createdAt;

        const goal = body.goal == null ? null : String(body.goal);
        const startDate = body.startDate == null ? null : String(body.startDate);
        const endDate = body.endDate == null ? null : String(body.endDate);
        const status = normalizeSprintStatus(body.status);
        const retrospectiveJson = JSON.stringify(body.retrospective || { whatWorked: '', whatDidnt: '', nextActions: '' });
        const metricsJson = JSON.stringify(body.metrics || { tasksPlanned: 0, tasksCompleted: 0, tasksCarriedOver: 0, velocity: 0 });

        if (status === 'active') {
          const t = nowIso();
          await db
            .prepare("UPDATE sprints SET status = 'review', updatedAt = ? WHERE status = 'active' AND archivedAt IS NULL")
            .bind(t)
            .run();
        }

        await db
          .prepare(
            `INSERT INTO sprints (
              id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt
            ) VALUES (?,?,?,?,?,?,?,?,?,?,NULL)`
          )
          .bind(idNew, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt)
          .run();

        const row = await db
          .prepare('SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt FROM sprints WHERE id = ?')
          .bind(idNew)
          .first();

        const createdApi = sprintRowToApi(row as SprintRow);
        if (!isNotifySuppressed(context.request) && createdApi.status === 'active') {
          const internalBase = baseInternalUrlFromRequest(context.request.url);
          const actor = actorFromRequest(context.request);
          const by = actor ? `\nby: ${actor}` : '';
          await postDiscordWebhook(
            context.env as Record<string, unknown>,
            `🏃 Sprint started: '${createdApi.name}' — 0 tasks\n${internalBase}/board${by}`
          );
        }

        return json({ item: sprintRowToApi(row as SprintRow) }, { status: 201 });
      }

      return err(405, 'Method not allowed');
    }

    // /sprints/:id/close
    if (action === 'close') {
      if (context.request.method !== 'POST') return err(405, 'Method not allowed');

      const sprint = await db
        .prepare('SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt FROM sprints WHERE id = ?')
        .bind(id)
        .first();
      if (!sprint) return err(404, 'Not found');

      const { results } = await db
        .prepare(`SELECT status FROM tasks WHERE sprintId = ? AND archivedAt IS NULL`)
        .bind(id)
        .all();

      const statuses = results as Array<Pick<TaskRow, 'status'>>;
      const tasksPlanned = statuses.length;
      const tasksCompleted = statuses.filter((t) => t.status === 'done').length;
      const tasksCarriedOver = statuses.filter((t) => t.status !== 'done' && t.status !== 'cancelled').length;
      const velocity = tasksCompleted;

      const t = nowIso();
      await db
        .prepare('UPDATE sprints SET status = ?, metricsJson = ?, updatedAt = ? WHERE id = ?')
        .bind(
          'closed',
          JSON.stringify({ tasksPlanned, tasksCompleted, tasksCarriedOver, velocity }),
          t,
          id
        )
        .run();

      // Carry over incomplete tasks by removing their sprintId (so they can be planned into the next sprint).
      await db
        .prepare(`UPDATE tasks SET sprintId = NULL, updatedAt = ? WHERE sprintId = ? AND archivedAt IS NULL AND status NOT IN ('done','cancelled')`)
        .bind(t, id)
        .run();

      if (!isNotifySuppressed(context.request)) {
        const internalBase = baseInternalUrlFromRequest(context.request.url);
        const sprintApi = sprintRowToApi(sprint as SprintRow);
        const actor = actorFromRequest(context.request);
        const by = actor ? `\nby: ${actor}` : '';
        await postDiscordWebhook(
          context.env as Record<string, unknown>,
          `📊 Sprint closed: '${sprintApi.name}' — ${tasksCompleted}/${tasksPlanned} done, velocity ${velocity}, ${tasksCarriedOver} carried\n${internalBase}/board${by}`
        );
      }

      return json({
        ok: true,
        sprintId: id,
        metrics: { tasksPlanned, tasksCompleted, tasksCarriedOver, velocity },
      });
    }

    // /sprints/:id
    if (context.request.method === 'GET') {
      const sprint = await db
        .prepare('SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt FROM sprints WHERE id = ?')
        .bind(id)
        .first();
      if (!sprint) return err(404, 'Not found');

      const { results } = await db
        .prepare(
          `SELECT
            id, title, description, owner, status, priority, type,
            sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
            estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
           FROM tasks WHERE sprintId = ? AND archivedAt IS NULL
           ORDER BY updatedAt DESC`
        )
        .bind(id)
        .all();

      return json({ item: sprintRowToApi(sprint as SprintRow), tasks: (results as TaskRow[]).map(taskRowToApi) });
    }

    if (context.request.method === 'PATCH') {
      let body: Record<string, unknown>;
      try {
        body = (await readBodyJson(context.request)) as Record<string, unknown>;
      } catch {
        return err(400, 'Invalid JSON');
      }

      const sets: string[] = [];
      const binds: unknown[] = [];

      function addSet(col: string, val: unknown) {
        sets.push(`${col} = ?`);
        binds.push(val);
      }

      if (body.name !== undefined) {
        const name = String(body.name || '').trim();
        if (!name) return err(400, 'name cannot be empty');
        addSet('name', name);
      }
      if (body.goal !== undefined) addSet('goal', body.goal == null ? null : String(body.goal));
      if (body.startDate !== undefined) addSet('startDate', body.startDate == null ? null : String(body.startDate));
      if (body.endDate !== undefined) addSet('endDate', body.endDate == null ? null : String(body.endDate));
      const prev = await db
        .prepare('SELECT id, name, status FROM sprints WHERE id = ?')
        .bind(id)
        .first();
      if (!prev) return err(404, 'Not found');
      const prevRow = prev as Pick<SprintRow, 'id' | 'name' | 'status'>;

      const nextStatus = body.status !== undefined ? normalizeSprintStatus(body.status) : null;
      if (nextStatus) addSet('status', nextStatus);
      if (body.retrospective !== undefined) addSet('retrospectiveJson', JSON.stringify(body.retrospective || { whatWorked: '', whatDidnt: '', nextActions: '' }));
      if (body.metrics !== undefined) addSet('metricsJson', JSON.stringify(body.metrics || { tasksPlanned: 0, tasksCompleted: 0, tasksCarriedOver: 0, velocity: 0 }));

      addSet('updatedAt', nowIso());

      if (!sets.length) return json({ ok: true });

      await db.prepare(`UPDATE sprints SET ${sets.join(', ')} WHERE id = ?`).bind(...binds, id).run();

      if (nextStatus === 'active') {
        const t = nowIso();
        await db
          .prepare("UPDATE sprints SET status = 'review', updatedAt = ? WHERE status = 'active' AND id != ? AND archivedAt IS NULL")
          .bind(t, id)
          .run();
      }

      const row = await db
        .prepare('SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt FROM sprints WHERE id = ?')
        .bind(id)
        .first();

      if (!row) return err(404, 'Not found');

      // Discord notifications for sprint state changes.
      if (!isNotifySuppressed(context.request) && nextStatus && nextStatus !== prevRow.status) {
        const internalBase = baseInternalUrlFromRequest(context.request.url);
        const sprintApi = sprintRowToApi(row as SprintRow);
        const actor = actorFromRequest(context.request);
        const by = actor ? `\nby: ${actor}` : '';

        if (nextStatus === 'active') {
          const { results } = await db
            .prepare(`SELECT COUNT(*) as c FROM tasks WHERE sprintId = ? AND archivedAt IS NULL`)
            .bind(id)
            .all();
          const count = Number((results as Array<{ c: number }>)[0]?.c ?? 0);
          await postDiscordWebhook(
            context.env as Record<string, unknown>,
            `🏃 Sprint started: '${sprintApi.name}' — ${count} tasks\n${internalBase}/board${by}`
          );
        }

        if (nextStatus === 'closed') {
          const { results } = await db
            .prepare(`SELECT status FROM tasks WHERE sprintId = ? AND archivedAt IS NULL`)
            .bind(id)
            .all();
          const statuses = results as Array<Pick<TaskRow, 'status'>>;
          const tasksPlanned = statuses.length;
          const tasksCompleted = statuses.filter((t) => t.status === 'done').length;
          const tasksCarriedOver = statuses.filter((t) => t.status !== 'done' && t.status !== 'cancelled').length;
          const velocity = tasksCompleted;
          await postDiscordWebhook(
            context.env as Record<string, unknown>,
            `📊 Sprint closed: '${sprintApi.name}' — ${tasksCompleted}/${tasksPlanned} done, velocity ${velocity}, ${tasksCarriedOver} carried\n${internalBase}/board${by}`
          );
        }
      }

      return json({ item: sprintRowToApi(row as SprintRow) });
    }

    if (context.request.method === 'DELETE') {
      const archivedAt = nowIso();
      await db.prepare('UPDATE sprints SET archivedAt = ?, updatedAt = ? WHERE id = ?').bind(archivedAt, archivedAt, id).run();
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
    }

    return err(405, 'Method not allowed');
  }

  if (resource === 'epics') {
    if (!id) {
      if (context.request.method === 'GET') {
        const includeArchived = url.searchParams.get('includeArchived') === '1' || url.searchParams.get('includeArchived') === 'true';
        const owner = url.searchParams.get('owner');
        const status = url.searchParams.get('status');

        const where: string[] = [];
        const binds: unknown[] = [];
        if (!includeArchived) where.push('archivedAt IS NULL');
        if (owner) {
          where.push('owner = ?');
          binds.push(owner);
        }
        if (status) {
          where.push('status = ?');
          binds.push(status);
        }

        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
        const { results } = await db
          .prepare(
            `SELECT id, title, description, owner, status, targetDate, createdAt, updatedAt, archivedAt
             FROM epics
             ${whereSql}
             ORDER BY updatedAt DESC`
          )
          .bind(...binds)
          .all();

        return json({ items: (results as EpicRow[]).map(epicRowToApi) });
      }

      if (context.request.method === 'POST') {
        let body: Record<string, unknown>;
        try {
          body = (await readBodyJson(context.request)) as Record<string, unknown>;
        } catch {
          return err(400, 'Invalid JSON');
        }

        const title = String(body.title || '').trim();
        if (!title) return err(400, 'title is required');

        const idNew = crypto.randomUUID();
        const createdAt = nowIso();
        const updatedAt = createdAt;

        const description = body.description == null ? null : String(body.description);
        const owner = normalizeOwner(body.owner);
        const status = normalizeEpicStatus(body.status);
        const targetDate = body.targetDate == null ? null : String(body.targetDate);

        await db
          .prepare(
            `INSERT INTO epics (
              id, title, description, owner, status, targetDate, createdAt, updatedAt, archivedAt
            ) VALUES (?,?,?,?,?,?,?,?,NULL)`
          )
          .bind(idNew, title, description, owner, status, targetDate, createdAt, updatedAt)
          .run();

        const row = await db
          .prepare('SELECT id, title, description, owner, status, targetDate, createdAt, updatedAt, archivedAt FROM epics WHERE id = ?')
          .bind(idNew)
          .first();

        return json({ item: epicRowToApi(row as EpicRow) }, { status: 201 });
      }

      return err(405, 'Method not allowed');
    }

    if (context.request.method === 'GET') {
      const epic = await db
        .prepare('SELECT id, title, description, owner, status, targetDate, createdAt, updatedAt, archivedAt FROM epics WHERE id = ?')
        .bind(id)
        .first();
      if (!epic) return err(404, 'Not found');

      const { results } = await db
        .prepare(
          `SELECT
            id, title, description, owner, status, priority, type,
            sprintId, epicId, tagsJson, dueDate, waitingOn, deliverableUrl,
            estimatedHours, actualHours, notes, createdAt, updatedAt, completedAt, archivedAt
           FROM tasks WHERE epicId = ? AND archivedAt IS NULL
           ORDER BY updatedAt DESC`
        )
        .bind(id)
        .all();

      return json({ item: epicRowToApi(epic as EpicRow), tasks: (results as TaskRow[]).map(taskRowToApi) });
    }

    if (context.request.method === 'PATCH') {
      let body: Record<string, unknown>;
      try {
        body = (await readBodyJson(context.request)) as Record<string, unknown>;
      } catch {
        return err(400, 'Invalid JSON');
      }

      const sets: string[] = [];
      const binds: unknown[] = [];

      function addSet(col: string, val: unknown) {
        sets.push(`${col} = ?`);
        binds.push(val);
      }

      if (body.title !== undefined) {
        const title = String(body.title || '').trim();
        if (!title) return err(400, 'title cannot be empty');
        addSet('title', title);
      }
      if (body.description !== undefined) addSet('description', body.description == null ? null : String(body.description));
      if (body.owner !== undefined) addSet('owner', normalizeOwner(body.owner));
      if (body.status !== undefined) addSet('status', normalizeEpicStatus(body.status));
      if (body.targetDate !== undefined) addSet('targetDate', body.targetDate == null ? null : String(body.targetDate));

      addSet('updatedAt', nowIso());

      if (!sets.length) return json({ ok: true });

      await db.prepare(`UPDATE epics SET ${sets.join(', ')} WHERE id = ?`).bind(...binds, id).run();

      const row = await db
        .prepare('SELECT id, title, description, owner, status, targetDate, createdAt, updatedAt, archivedAt FROM epics WHERE id = ?')
        .bind(id)
        .first();

      if (!row) return err(404, 'Not found');
      return json({ item: epicRowToApi(row as EpicRow) });
    }

    if (context.request.method === 'DELETE') {
      const archivedAt = nowIso();
      await db.prepare('UPDATE epics SET archivedAt = ?, updatedAt = ? WHERE id = ?').bind(archivedAt, archivedAt, id).run();
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
    }

    return err(405, 'Method not allowed');
  }

  if (resource === 'metrics') {
    // /metrics/latest and /metrics/trends are modeled as /metrics/:id for routing simplicity.
    if (id === 'latest') {
      if (context.request.method !== 'GET') return err(405, 'Method not allowed');

      // Prefer "current week (Monday)" if present; otherwise return the latest snapshot.
      const today = new Date();
      const day = today.getUTCDay(); // 0=Sun..6=Sat
      const diffToMonday = (day + 6) % 7;
      const monday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - diffToMonday));
      const weekOf = monday.toISOString().slice(0, 10);

      const current = await db
        .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE weekOf = ? AND archivedAt IS NULL')
        .bind(weekOf)
        .first();
      if (current) return json({ item: metricsRowToApi(current as MetricsRow) });

      const latest = await db
        .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE archivedAt IS NULL ORDER BY weekOf DESC LIMIT 1')
        .bind()
        .first();
      if (!latest) return json({ item: null });
      return json({ item: metricsRowToApi(latest as MetricsRow) });
    }

    if (id === 'trends') {
      if (context.request.method !== 'GET') return err(405, 'Method not allowed');
      const weeksRaw = Number(url.searchParams.get('weeks') || 12);
      const weeks = Number.isFinite(weeksRaw) ? Math.max(1, Math.min(104, Math.floor(weeksRaw))) : 12;

      const { results } = await db
        .prepare(
          `SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt
           FROM metrics
           WHERE archivedAt IS NULL
           ORDER BY weekOf DESC
           LIMIT ?`
        )
        .bind(weeks)
        .all();

      const items = (results as MetricsRow[]).map(metricsRowToApi).reverse();
      return json({ items });
    }

    if (!id) {
      if (context.request.method === 'GET') {
        const includeArchived = url.searchParams.get('includeArchived') === '1' || url.searchParams.get('includeArchived') === 'true';
        const sprintId = url.searchParams.get('sprintId');
        const limitRaw = Number(url.searchParams.get('limit') || 26);
        const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(260, Math.floor(limitRaw))) : 26;

        const where: string[] = [];
        const binds: unknown[] = [];
        if (!includeArchived) where.push('archivedAt IS NULL');
        if (sprintId) {
          where.push('sprintId = ?');
          binds.push(sprintId);
        }

        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
        const { results } = await db
          .prepare(
            `SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt
             FROM metrics
             ${whereSql}
             ORDER BY weekOf DESC
             LIMIT ?`
          )
          .bind(...binds, limit)
          .all();

        return json({ items: (results as MetricsRow[]).map(metricsRowToApi) });
      }

      if (context.request.method === 'POST') {
        let body: Record<string, unknown>;
        try {
          body = (await readBodyJson(context.request)) as Record<string, unknown>;
        } catch {
          return err(400, 'Invalid JSON');
        }

        const weekOfRaw = String(body.weekOf || '').trim();
        if (!weekOfRaw) return err(400, 'weekOf is required');
        const weekOf = weekOfRaw.includes('T') ? weekOfRaw.slice(0, 10) : weekOfRaw;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(weekOf)) return err(400, 'weekOf must be YYYY-MM-DD');

        const sprintId = body.sprintId ? String(body.sprintId) : null;
        const notes = body.notes == null ? null : String(body.notes);

        const m = (body.metrics || {}) as Record<string, unknown>;
        const metrics: GrowthMetrics = {
          leadsGenerated: Number(m.leadsGenerated || 0),
          leadsQualified: Number(m.leadsQualified || 0),
          outreachSent: Number(m.outreachSent || 0),
          responsesReceived: Number(m.responsesReceived || 0),
          meetingsBooked: Number(m.meetingsBooked || 0),
          contentPublished: Number(m.contentPublished || 0),
          linkedinImpressions: Number(m.linkedinImpressions || 0),
          linkedinEngagement: Number(m.linkedinEngagement || 0),
          websiteVisitors: Number(m.websiteVisitors || 0),
          emailSubscribers: Number(m.emailSubscribers || 0),
          revenue: Number(m.revenue || 0),
          pipelineValue: Number(m.pipelineValue || 0),
        };

        const existing = await db
          .prepare('SELECT id FROM metrics WHERE weekOf = ? AND archivedAt IS NULL')
          .bind(weekOf)
          .first();

        const t = nowIso();
        if (existing) {
          const idExisting = (existing as { id: string }).id;
          await db
            .prepare('UPDATE metrics SET sprintId = ?, metricsJson = ?, notes = ?, updatedAt = ? WHERE id = ?')
            .bind(sprintId, JSON.stringify(metrics), notes, t, idExisting)
            .run();

          const row = await db
            .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE id = ?')
            .bind(idExisting)
            .first();

          if (!isNotifySuppressed(context.request)) {
            const internalBase = baseInternalUrlFromRequest(context.request.url);
            const actor = actorFromRequest(context.request);
            const by = actor ? `\nby: ${actor}` : '';
            await postDiscordWebhook(
              context.env as Record<string, unknown>,
              `📈 Metrics updated — Week of ${weekOf}: ${metrics.leadsGenerated} leads, ${metrics.leadsQualified} qualified, ${metrics.meetingsBooked} meetings\n${internalBase}/board${by}`
            );
          }

          return json({ item: metricsRowToApi(row as MetricsRow) });
        }

        const idNew = crypto.randomUUID();
        await db
          .prepare('INSERT INTO metrics (id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt) VALUES (?,?,?,?,?,?,?,NULL)')
          .bind(idNew, weekOf, sprintId, JSON.stringify(metrics), notes, t, t)
          .run();

        const row = await db
          .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE id = ?')
          .bind(idNew)
          .first();

        if (!isNotifySuppressed(context.request)) {
          const internalBase = baseInternalUrlFromRequest(context.request.url);
          const actor = actorFromRequest(context.request);
          const by = actor ? `\nby: ${actor}` : '';
          await postDiscordWebhook(
            context.env as Record<string, unknown>,
            `📈 Metrics posted — Week of ${weekOf}: ${metrics.leadsGenerated} leads, ${metrics.leadsQualified} qualified, ${metrics.meetingsBooked} meetings\n${internalBase}/board${by}`
          );
        }

        return json({ item: metricsRowToApi(row as MetricsRow) }, { status: 201 });
      }

      return err(405, 'Method not allowed');
    }

    // /metrics/:id
    if (context.request.method === 'GET') {
      const row = await db
        .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE id = ?')
        .bind(id)
        .first();
      if (!row) return err(404, 'Not found');
      return json({ item: metricsRowToApi(row as MetricsRow) });
    }

    if (context.request.method === 'PATCH') {
      let body: Record<string, unknown>;
      try {
        body = (await readBodyJson(context.request)) as Record<string, unknown>;
      } catch {
        return err(400, 'Invalid JSON');
      }

      const existing = await db
        .prepare('SELECT id, weekOf FROM metrics WHERE id = ? AND archivedAt IS NULL')
        .bind(id)
        .first();
      if (!existing) return err(404, 'Not found');
      const weekOf = (existing as { weekOf: string }).weekOf;

      const sprintId = body.sprintId === undefined ? undefined : (body.sprintId ? String(body.sprintId) : null);
      const notes = body.notes === undefined ? undefined : (body.notes == null ? null : String(body.notes));

      const sets: string[] = [];
      const binds: unknown[] = [];
      function addSet(col: string, val: unknown) {
        sets.push(`${col} = ?`);
        binds.push(val);
      }

      if (sprintId !== undefined) addSet('sprintId', sprintId);
      if (notes !== undefined) addSet('notes', notes);

      if (body.metrics !== undefined) {
        const m = (body.metrics || {}) as Record<string, unknown>;
        const metrics: GrowthMetrics = {
          leadsGenerated: Number(m.leadsGenerated || 0),
          leadsQualified: Number(m.leadsQualified || 0),
          outreachSent: Number(m.outreachSent || 0),
          responsesReceived: Number(m.responsesReceived || 0),
          meetingsBooked: Number(m.meetingsBooked || 0),
          contentPublished: Number(m.contentPublished || 0),
          linkedinImpressions: Number(m.linkedinImpressions || 0),
          linkedinEngagement: Number(m.linkedinEngagement || 0),
          websiteVisitors: Number(m.websiteVisitors || 0),
          emailSubscribers: Number(m.emailSubscribers || 0),
          revenue: Number(m.revenue || 0),
          pipelineValue: Number(m.pipelineValue || 0),
        };
        addSet('metricsJson', JSON.stringify(metrics));
      }

      addSet('updatedAt', nowIso());
      if (!sets.length) return json({ ok: true });

      await db.prepare(`UPDATE metrics SET ${sets.join(', ')} WHERE id = ?`).bind(...binds, id).run();

      const row = await db
        .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE id = ?')
        .bind(id)
        .first();
      if (!row) return err(404, 'Not found');

      const updatedApi = metricsRowToApi(row as MetricsRow);
      if (!isNotifySuppressed(context.request)) {
        const internalBase = baseInternalUrlFromRequest(context.request.url);
        const actor = actorFromRequest(context.request);
        const by = actor ? `\nby: ${actor}` : '';
        await postDiscordWebhook(
          context.env as Record<string, unknown>,
          `📈 Metrics updated — Week of ${weekOf}: ${updatedApi.metrics.leadsGenerated} leads, ${updatedApi.metrics.leadsQualified} qualified, ${updatedApi.metrics.meetingsBooked} meetings\n${internalBase}/board${by}`
        );
      }

      return json({ item: updatedApi });
    }

    if (context.request.method === 'DELETE') {
      const archivedAt = nowIso();
      await db.prepare('UPDATE metrics SET archivedAt = ?, updatedAt = ? WHERE id = ?').bind(archivedAt, archivedAt, id).run();
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
    }

    return err(405, 'Method not allowed');
  }

  if (resource === 'dashboard') {
    if (context.request.method !== 'GET') return err(405, 'Method not allowed');

    const active = await db
      .prepare("SELECT id, name, goal, startDate, endDate, status, retrospectiveJson, metricsJson, createdAt, updatedAt, archivedAt FROM sprints WHERE status = 'active' AND archivedAt IS NULL ORDER BY updatedAt DESC LIMIT 1")
      .bind()
      .first();

    const activeSprint = active ? sprintRowToApi(active as SprintRow) : null;
    const scopeSprintId = activeSprint?.id ?? null;

    const whereTask = scopeSprintId ? 'WHERE archivedAt IS NULL AND sprintId = ?' : 'WHERE archivedAt IS NULL';
    const binds = scopeSprintId ? [scopeSprintId] : [];

    const { results: byStatusRows } = await db
      .prepare(`SELECT status, COUNT(*) as c FROM tasks ${whereTask} GROUP BY status`)
      .bind(...binds)
      .all();

    const { results: byOwnerRows } = await db
      .prepare(`SELECT owner, COUNT(*) as c FROM tasks ${whereTask} GROUP BY owner`)
      .bind(...binds)
      .all();

    const tasksByStatus: Record<string, number> = {};
    for (const r of byStatusRows as Array<{ status: string; c: number | string }>) tasksByStatus[r.status] = Number(r.c);

    const tasksByOwner: Record<string, number> = {};
    for (const r of byOwnerRows as Array<{ owner: string; c: number | string }>) tasksByOwner[r.owner] = Number(r.c);

    const latest = await db
      .prepare('SELECT id, weekOf, sprintId, metricsJson, notes, createdAt, updatedAt, archivedAt FROM metrics WHERE archivedAt IS NULL ORDER BY weekOf DESC LIMIT 1')
      .bind()
      .first();

    return json({
      scope: { sprintId: scopeSprintId },
      activeSprint,
      tasksByStatus,
      tasksByOwner,
      latestMetrics: latest ? metricsRowToApi(latest as MetricsRow) : null,
    });
  }

  return err(404, 'Not found');
};
