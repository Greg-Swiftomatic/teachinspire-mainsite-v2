# PRD: TeachInspire Growth Board

**Product:** TeachInspire Growth Kanban & Sprint Management System
**Author:** Pinch 🦀 (GM)
**Date:** 2026-02-05
**Status:** Draft — awaiting Greg's review
**Reference:** YBH Kanban (https://master.pulse-ybh.pages.dev/kanban)

---

## 1. Overview

A project management board and API for TeachInspire's growth team — a coordinator (Pinch) managing three AI specialist agents (Omar, Octo, Pearl) plus the human founder (Greg). The system must support weekly sprints, task assignment per agent, performance tracking, and integration with Discord for notifications.

**This is NOT a clone of YBH Kanban.** It extends the pattern with sprint management, agent-specific workflows, recurring task automation, and growth metrics.

---

## 2. Users & Roles

| Role | User | Permissions |
|------|-------|-------------|
| **Owner** | Greg | Full CRUD, approve strategy, override priorities |
| **GM / Coordinator** | Pinch 🦀 | Full CRUD, assign tasks, run sprints, post reviews |
| **Content Lead** | Omar 🦞 | Read all, CRUD own tasks, submit deliverables |
| **Prospecting Lead** | Octo 🐙 | Read all, CRUD own tasks, submit deliverables |
| **Sales Lead** | Pearl 🦪 | Read all, CRUD own tasks, submit deliverables |

Authentication: API key (same pattern as YBH). One key for now, role passed as parameter.

---

## 3. Data Model

### 3.1 Task

```json
{
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
}
```

### 3.2 Sprint

```json
{
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
}
```

### 3.3 Epic

```json
{
  "id": "uuid",
  "title": "string (e.g., 'LinkedIn Content Engine')",
  "description": "string",
  "owner": "enum (same as task)",
  "status": "enum: active | completed | paused",
  "targetDate": "ISO-8601 | null",
  "tasks": ["task_id"],
  "createdAt": "ISO-8601"
}
```

### 3.4 Growth Metrics (Weekly Snapshot)

```json
{
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
}
```

---

## 4. API Endpoints

**Base URL:** `https://api.teachinspire.me/api` (or similar)
**Auth:** `X-API-Key` header

### 4.1 Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | List tasks (filter by owner, status, sprint, tag, epic) |
| `GET` | `/tasks/:id` | Get single task |
| `POST` | `/tasks` | Create task |
| `PATCH` | `/tasks/:id` | Update task |
| `DELETE` | `/tasks/:id` | Archive task (soft delete) |
| `POST` | `/tasks/bulk` | Batch create/update |
| `GET` | `/tasks/mine/:owner` | Get tasks for a specific agent |

### 4.2 Sprints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/sprints` | List all sprints |
| `GET` | `/sprints/current` | Get active sprint |
| `GET` | `/sprints/:id` | Get sprint + its tasks |
| `POST` | `/sprints` | Create sprint |
| `PATCH` | `/sprints/:id` | Update sprint (including retrospective) |
| `POST` | `/sprints/:id/close` | Close sprint, carry over incomplete tasks |

### 4.3 Epics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/epics` | List epics |
| `GET` | `/epics/:id` | Get epic + tasks |
| `POST` | `/epics` | Create epic |
| `PATCH` | `/epics/:id` | Update epic |

### 4.4 Metrics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/metrics` | List weekly snapshots |
| `GET` | `/metrics/latest` | Current week |
| `POST` | `/metrics` | Record weekly snapshot |
| `GET` | `/metrics/trends` | Aggregated trends (last N weeks) |

### 4.5 Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard` | Summary: active sprint, tasks by status/owner, key metrics |

---

## 5. Frontend — Board UI

### 5.1 Views

1. **Kanban Board** (default)
   - Columns: Backlog → Todo → In Progress → Blocked → In Review → Done
   - Cards show: title, owner avatar/emoji, priority badge, due date, tags
   - Filter by: owner, sprint, epic, tag
   - Drag-and-drop between columns

2. **Sprint View**
   - Current sprint goal + progress bar
   - Tasks grouped by owner (swimlanes)
   - Burndown or task completion chart
   - Sprint history with retrospectives

3. **Agent View**
   - One column per agent showing their active tasks
   - Workload visualization (how loaded is each agent?)

4. **Metrics Dashboard**
   - Weekly growth metrics charts (line/bar)
   - Sprint velocity over time
   - Pipeline funnel: leads → qualified → outreach → response → meeting → close
   - Content performance: posts → impressions → engagement

5. **Timeline/Roadmap** (nice-to-have)
   - Epics on a timeline
   - Milestones marked

### 5.2 Tech Stack Recommendation

Match YBH stack for consistency:
- **Frontend:** React/Next.js or plain HTML + Cloudflare Pages
- **Backend:** Cloudflare Workers + D1 (SQLite) or KV
- **Auth:** API key (simple, same as YBH)
- **Hosting:** Cloudflare Pages + Workers

---

## 6. Discord Integration

### 6.1 Webhook Notifications

The API should support an optional Discord webhook URL. Events that trigger notifications:

| Event | Channel | Message |
|-------|---------|---------|
| Task created | #dashboard | "🆕 [Omar] New task: Write LinkedIn post about X" |
| Task status changed | #dashboard | "✅ [Octo] Completed: Research Institut Français Lyon" |
| Task blocked | #dashboard | "🚫 [Pearl] Blocked: Follow-up with X — waiting on response" |
| Sprint started | #dashboard | "🏃 Sprint 3 started: 'Scale Outreach' — 12 tasks, 5 days" |
| Sprint closed | #dashboard | "📊 Sprint 3 closed: 10/12 done, velocity 10, 2 carried over" |
| Weekly metrics posted | #dashboard | "📈 Week of Feb 10: 15 leads, 8 qualified, 3 meetings" |

### 6.2 Discord Bot Commands (Phase 2)

Optional slash commands for quick actions from Discord:
- `/task add [title] [owner]` — quick task creation
- `/task list [owner]` — show my tasks
- `/sprint status` — current sprint summary
- `/metrics` — this week's numbers

---

## 7. Sprint Rhythm

| Day | Activity | Owner |
|-----|----------|-------|
| **Monday** | Sprint planning: set goal, assign tasks, post to #dashboard | Pinch |
| **Tue–Thu** | Async standup: agents log progress in #standup | All agents |
| **Wednesday** | Mid-week check: blocked items review, reprioritize if needed | Pinch |
| **Friday** | Sprint review: summarize results, post metrics, retrospective | Pinch |
| **Friday** | Greg review: Greg approves/adjusts next sprint direction | Greg |

---

## 8. Recurring Automated Tasks

Pinch manages these via cron/heartbeat:

| Task | Frequency | Agent |
|------|-----------|-------|
| Post sprint standup prompt | Daily (Mon-Fri 9AM) | Pinch |
| Check blocked tasks | Daily | Pinch |
| Compile weekly metrics | Friday | Pinch |
| Post sprint review | Friday | Pinch |
| LinkedIn content publish | 3x/week | Omar (spawned) |
| Lead research batch | 2x/week | Octo (spawned) |
| Follow-up check | Daily | Pearl (spawned) |

---

## 9. Success Criteria

### MVP (Week 1)
- [ ] API deployed with task + sprint CRUD
- [ ] Basic Kanban board UI (drag-and-drop)
- [ ] Sprint view with current sprint
- [ ] Discord webhook notifications working
- [ ] Pinch can create/update tasks via API

### V1 (Week 2-3)
- [ ] Agent swimlane view
- [ ] Metrics dashboard with charts
- [ ] Growth metrics tracking
- [ ] Sprint retrospective flow
- [ ] Automated sprint reports

### V2 (Month 2)
- [ ] Discord slash commands
- [ ] Timeline/roadmap view
- [ ] Velocity trending
- [ ] Pipeline funnel visualization
- [ ] Email notifications

---

## 10. Open Questions

1. **Domain:** Deploy on teachinspire.me subdomain (e.g., board.teachinspire.me)?
2. **Access:** Just API key, or add login for Greg?
3. **Existing data:** Any current leads/prospects to import?
4. **Budget:** Any constraints on hosting/infra?

---

*This PRD is a living document. Greg approves direction, Pinch manages updates.*
