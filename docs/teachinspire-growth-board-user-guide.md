# TeachInspire Growth Board (User Guide)

Internal project management system for the TeachInspire growth team. Includes:

- A protected admin UI (Kanban + management modals)
- A bot-friendly JSON API (for Pinch to create/update tasks, sprints, epics, and weekly metrics)
- Optional Discord notifications (via webhook)

This guide is written for:

- Greg (Owner)
- Pinch (GM/coordinator bot)
- Omar / Octo / Pearl (specialist agents)

---

## 1. Quick Start

### 1.1 URLs (Internal)

All internal pages live under a less-guessable prefix:

- Index: `/__ti/8b7f2c4a9d13/`
- PRD page: `/__ti/8b7f2c4a9d13/growth-board`
- Board UI: `/__ti/8b7f2c4a9d13/board`
- API base: `/__ti/8b7f2c4a9d13/api`

If you rotate the token (recommended occasionally), all these URLs change accordingly.

### 1.2 Access Control

- UI pages require HTTP Basic Auth.
- API endpoints accept either:
  - HTTP Basic Auth, or
  - `X-API-Key` header for bot/service access

### 1.3 What To Give Pinch (Bot)

Pinch needs only:

- `BASE` (API base URL including token): `https://<your-site>/__ti/8b7f2c4a9d13/api`
- `TI_GROWTH_API_KEY` (secret value to send as `X-API-Key`)

Recommended headers for Pinch:

- `X-TI-Actor: pinch` (attribution in Discord messages)
- `X-TI-Suppress-Notify: 1` (prevents Discord spam for bulk operations)

---

## 2. Core Concepts

### 2.1 Tasks

Tasks are the primary work items on the Kanban board. Each task can be edited at any time and soft-deleted (archived) if needed.

Key fields:

- `title` (required)
- `owner`: `greg | pinch | omar | octo | pearl`
- `status`: `backlog | todo | in_progress | blocked | in_review | done | cancelled`
- `priority`: `critical | high | medium | low`
- `type`: `task | milestone | recurring | epic`
- `sprintId`: optional; attach a task to a sprint
- `epicId`: optional; attach a task to an epic
- `tags`: list of strings
- `dueDate`: ISO-8601 string (commonly `YYYY-MM-DD`)
- `waitingOn`: free text describing blockers
- `deliverableUrl`: link to output (doc, notion, github, etc.)
- `estimatedHours`, `actualHours`: numbers (optional)
- `description`, `notes`: markdown-friendly text

Archiving:

- Deleting a task does not permanently remove it. It sets `archivedAt`.
- Archived tasks can be restored (set `archivedAt` back to `null`).

### 2.2 Sprints

Sprints are weekly cycles with a goal and a status:

- `planning | active | review | closed`

Each sprint can store:

- Retrospective: `whatWorked`, `whatDidnt`, `nextActions`
- Metrics: `tasksPlanned`, `tasksCompleted`, `tasksCarriedOver`, `velocity`

Close sprint behavior:

- Closing computes metrics based on tasks currently assigned to that sprint.
- Incomplete tasks (not `done` or `cancelled`) are "carried over" by clearing their `sprintId` so they can be planned again.

### 2.3 Epics

Epics group tasks under larger initiatives. Fields:

- `title`, `description`
- `owner`
- `status`: `active | completed | paused`
- `targetDate`

### 2.4 Weekly Growth Metrics

Weekly snapshots track growth outcomes.

Important notes:

- `weekOf` should be a Monday date in `YYYY-MM-DD`.
- `/metrics/latest` prefers "this week's Monday (UTC)" snapshot if present; otherwise returns the latest snapshot.
- Posting metrics for an existing `weekOf` updates the existing record (upsert).

---

## 3. Using The Board UI

Open: `/__ti/8b7f2c4a9d13/board`

### 3.1 The Kanban Board

Columns:

- Backlog
- Todo
- In Progress
- Blocked
- In Review
- Done

Typical flow:

1. Draft tasks in Backlog
2. Pull into Todo for sprint planning
3. Move into In Progress while actively working
4. Use Blocked with `waitingOn` filled in
5. Use In Review for deliverable check
6. Move to Done when complete

### 3.2 Drag-and-Drop

You can drag a task card between columns to change its status.

Notes:

- The status update is immediate and saved via the API.
- If Discord notifications are enabled, status changes post to Discord.

### 3.3 Filters (Top Bar)

Filters are designed to answer "what should we do next" quickly:

- Owner filter: show tasks for a specific person/agent
- Sprint filter: scope to a sprint
- Epic filter: focus by initiative
- Search: matches title, description, notes, tags
- Archived toggle: include archived tasks when needed

Filters sync to the URL query string, so you can bookmark a filtered view.

### 3.4 Creating and Editing Tasks

Use the UI actions to create a new task or open an existing task.

Everything is manually editable:

- Title, owner, status, priority, type
- Sprint, epic
- Tags, due date
- Blocker (`waitingOn`)
- Deliverable URL
- Estimate/actual hours
- Description/notes

### 3.5 Archiving and Restoring Tasks

- Archive a task when it's obsolete, duplicated, or no longer relevant.
- Toggle "Archived" to locate archived tasks.
- Restore sets the task back to active (clears `archivedAt`).

### 3.6 Sprint Manager (UI)

Use Sprint Manager to:

- Create and edit sprints (name, dates, goal, status)
- Mark a sprint active
- Close a sprint (computes sprint metrics, carries incomplete tasks over)

### 3.7 Epic Manager (UI)

Use Epic Manager to:

- Create, edit, and archive epics
- Assign tasks to an epic via the task edit modal

### 3.8 Metrics Manager (UI)

Use Metrics Manager to:

- Create or update weekly snapshots (weekOf + numbers)
- Archive old/incorrect snapshots if needed

---

## 4. Bot/API Usage (Pinch)

API base:

- `https://<your-site>/__ti/8b7f2c4a9d13/api`

Auth:

- Header: `X-API-Key: <TI_GROWTH_API_KEY>`

Recommended headers:

- `X-TI-Actor: pinch`
- `X-TI-Suppress-Notify: 1` (for bulk actions)

Content type:

- `Content-Type: application/json` for POST/PATCH

### 4.1 Common Workflows

Create a task:

```bash
curl -H "X-API-Key: $KEY" -H "X-TI-Actor: pinch" -H "Content-Type: application/json" \
  -d '{"title":"Research district partnerships","owner":"octo","status":"todo","priority":"high","type":"task","tags":["prospecting"]}' \
  "$BASE/tasks"
```

Update a task (PATCH semantics):

- Only the fields you include will change.

```bash
curl -H "X-API-Key: $KEY" -H "X-TI-Actor: pinch" -H "Content-Type: application/json" \
  -X PATCH -d '{"status":"blocked","waitingOn":"Need contact email"}' \
  "$BASE/tasks/<task_id>"
```

Mark done and attach a deliverable:

```bash
curl -H "X-API-Key: $KEY" -H "X-TI-Actor: pinch" -H "Content-Type: application/json" \
  -X PATCH -d '{"status":"done","deliverableUrl":"https://docs.google.com/..."}' \
  "$BASE/tasks/<task_id>"
```

Archive and restore:

```bash
curl -H "X-API-Key: $KEY" -X DELETE "$BASE/tasks/<task_id>"

curl -H "X-API-Key: $KEY" -H "Content-Type: application/json" -X PATCH -d '{"archivedAt":null}' \
  "$BASE/tasks/<task_id>"
```

Bulk create/upsert/patch:

- If `id` is missing: creates a new task.
- If `id` exists and matches a task: patches that task.
- If `id` exists but does not exist in DB: creates with that id.

```bash
curl -H "X-API-Key: $KEY" -H "X-TI-Actor: pinch" -H "X-TI-Suppress-Notify: 1" -H "Content-Type: application/json" \
  -d '{"items":[{"title":"Draft post A","owner":"omar","status":"todo","priority":"high","type":"task"},{"id":"<existing_task_id>","status":"done"}]}' \
  "$BASE/tasks/bulk"
```

### 4.2 Tasks Endpoints

List tasks:

- `GET /tasks`
- Filters (query params):
  - `owner`, `status`, `sprintId`, `epicId`, `tag`, `q`
  - `includeArchived=1`

Get one task:

- `GET /tasks/:id`

Create:

- `POST /tasks`

Update:

- `PATCH /tasks/:id`

Archive:

- `DELETE /tasks/:id` (soft delete)

Bulk:

- `POST /tasks/bulk`

Per-owner convenience:

- `GET /tasks/mine/:owner`

### 4.3 Sprints Endpoints

List:

- `GET /sprints?includeArchived=1`

Current active sprint:

- `GET /sprints/current`

Get sprint with tasks:

- `GET /sprints/:id`

Create:

- `POST /sprints`

Update:

- `PATCH /sprints/:id`

Close:

- `POST /sprints/:id/close`

Archive:

- `DELETE /sprints/:id`

### 4.4 Epics Endpoints

List:

- `GET /epics?owner=omar&status=active&includeArchived=1`

Get epic with tasks:

- `GET /epics/:id`

Create:

- `POST /epics`

Update:

- `PATCH /epics/:id`

Archive:

- `DELETE /epics/:id`

### 4.5 Metrics Endpoints

List:

- `GET /metrics?limit=26&sprintId=<id>&includeArchived=1`

Latest:

- `GET /metrics/latest`

Trends:

- `GET /metrics/trends?weeks=12`

Create or upsert by week:

- `POST /metrics`

Update by id:

- `PATCH /metrics/:id`

Archive:

- `DELETE /metrics/:id`

### 4.6 Dashboard Endpoint

Summary for automation/UI:

- `GET /dashboard`

Includes:

- Active sprint (if any)
- Task counts by status and owner (scoped to active sprint when present)
- Latest metrics snapshot

---

## 5. Discord Notifications

If `TI_DISCORD_WEBHOOK_URL` is set, the API posts messages for:

- Task created
- Task status changes (including blocked/done)
- Sprint started/closed (and some status transitions)
- Metrics posted/updated

To suppress notifications for a call:

- Set header `X-TI-Suppress-Notify: 1`

To attribute actions:

- Set header `X-TI-Actor: <name>`

---

## 6. Admin Setup (Cloudflare Pages)

### 6.1 Required Environment Variables

Set in Cloudflare Pages project settings:

- `TI_ADMIN_BASIC_USER`
- `TI_ADMIN_BASIC_PASS`
- `TI_GROWTH_API_KEY` (recommended for bot access)
- `TI_DISCORD_WEBHOOK_URL` (optional)

### 6.2 D1 Database Binding

Bind a D1 database:

- Binding name: `TI_GROWTH_BOARD_DB`

The API creates tables automatically on first request.

---

## 7. Troubleshooting

### 7.1 "Unauthorized" (401)

- UI: Basic Auth credentials are wrong or missing.
- API: `X-API-Key` is missing/wrong, or Basic Auth not provided.

### 7.2 "Not found" (404) on internal routes

Common causes:

- The token prefix changed (rotated) and you are using an old URL.
- Admin Basic Auth env vars were not set (system fails closed).

### 7.3 Discord is too noisy

Use suppression for automation runs:

- `X-TI-Suppress-Notify: 1`

Also consider only notifying on major transitions (done/blocked) from the bot side.

### 7.4 Metrics "latest" doesn’t match expectations

`/metrics/latest` prefers "this week Monday (UTC)" if it exists. If you post a `weekOf` that is not a Monday, you may confuse your own reporting.

Recommendation:

- Always use a Monday `weekOf` date (UTC).

---

## 8. Appendix: Reference Enums

Owners:

- `greg`, `pinch`, `omar`, `octo`, `pearl`

Task statuses:

- `backlog`, `todo`, `in_progress`, `blocked`, `in_review`, `done`, `cancelled`

Priorities:

- `critical`, `high`, `medium`, `low`

Task types:

- `task`, `milestone`, `recurring`, `epic`

Sprint statuses:

- `planning`, `active`, `review`, `closed`

Epic statuses:

- `active`, `completed`, `paused`

