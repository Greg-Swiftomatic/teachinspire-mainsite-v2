# Internal Admin Pages (Edge Protected)

This repo includes Cloudflare Pages Functions that serve internal docs under a less-guessable route and protect them with HTTP Basic Auth at the edge.

## Routes

- Index: `/__ti/8b7f2c4a9d13/`
- PRD: `/__ti/8b7f2c4a9d13/growth-board`
- Board UI: `/__ti/8b7f2c4a9d13/board`
- Board API: `/__ti/8b7f2c4a9d13/api/*`

Current API resources:

- `/tasks`
- `/tasks/bulk` (POST: batch create/upsert/patch)
- `/tasks/mine/:owner` (GET)
- `/sprints`
- `/sprints/current` (GET)
- `/epics`
- `/metrics`
- `/dashboard`

Metrics helpers:

- `/metrics/latest`
- `/metrics/trends?weeks=12`

## Cloudflare Pages Settings

Set these environment variables in Cloudflare Pages (Project Settings -> Environment variables):

- `TI_ADMIN_BASIC_USER`
- `TI_ADMIN_BASIC_PASS`
- `TI_GROWTH_API_KEY` (recommended; enables `X-API-Key` auth for `/__ti/.../api/*`)
- `TI_DISCORD_WEBHOOK_URL` (optional, for notifications)

If either is missing, the protected routes will return 404 (fail closed).

## D1 Database

The Growth Board uses a D1 (SQLite) database. Bind it in Cloudflare Pages:

- D1 binding name: `TI_GROWTH_BOARD_DB`

On first request, the API auto-creates its tables (via `CREATE TABLE IF NOT EXISTS ...`).

## Bot Access (Pinch)

Pinch should use the API with `X-API-Key` (do not share Basic Auth credentials).

Pinch needs:

- `BASE` URL (includes the unguessable token): `https://<your-site>/__ti/8b7f2c4a9d13/api`
- `TI_GROWTH_API_KEY` value
- Optional: set `X-TI-Actor: pinch` for attribution in Discord notifications
- Optional: set `X-TI-Suppress-Notify: 1` to avoid Discord spam for bulk operations

Example:

```bash
BASE="https://<your-site>/__ti/8b7f2c4a9d13/api"

curl -H "X-API-Key: $TI_GROWTH_API_KEY" "$BASE/dashboard"

curl -H "X-API-Key: $TI_GROWTH_API_KEY" -H "Content-Type: application/json" \
  -d '{"title":"Write LinkedIn post about X","owner":"omar","status":"todo","priority":"high","type":"task","tags":["content","linkedin"]}' \
  "$BASE/tasks"

# Update any fields (PATCH semantics: only provided fields change)
curl -H "X-API-Key: $TI_GROWTH_API_KEY" -H "X-TI-Actor: pinch" -H "Content-Type: application/json" \
  -X PATCH -d '{"status":"blocked","waitingOn":"Need Greg approval","dueDate":"2026-02-10","deliverableUrl":"https://..."}' \
  "$BASE/tasks/<task_id>"

# Soft-delete (archive) and restore
curl -H "X-API-Key: $TI_GROWTH_API_KEY" -X DELETE "$BASE/tasks/<task_id>"
curl -H "X-API-Key: $TI_GROWTH_API_KEY" -H "Content-Type: application/json" -X PATCH -d '{"archivedAt":null}' "$BASE/tasks/<task_id>"

# Bulk create/upsert/patch (set X-TI-Suppress-Notify to keep Discord quiet)
curl -H "X-API-Key: $TI_GROWTH_API_KEY" -H "X-TI-Actor: pinch" -H "X-TI-Suppress-Notify: 1" -H "Content-Type: application/json" \
  -d '{"items":[{"title":"Draft post A","owner":"omar","status":"todo","priority":"high","type":"task"},{"id":"<existing_task_id>","status":"done"}]}' \
  "$BASE/tasks/bulk"

# My tasks
curl -H "X-API-Key: $TI_GROWTH_API_KEY" "$BASE/tasks/mine/omar?status=in_progress"

# Current sprint
curl -H "X-API-Key: $TI_GROWTH_API_KEY" "$BASE/sprints/current"
```

## Rotate The Route

To change the unguessable prefix:

1. Rename the folder `functions/__ti/8b7f2c4a9d13` to a new random token.
2. Update `protectedPrefix` in `functions/_middleware.ts` to match.
