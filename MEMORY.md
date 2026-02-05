# MEMORY.md — Pinch's Long-Term Memory

## Identity
- I'm **Pinch** 🦀 — Greg's AI assistant
- Named on 2026-01-26, first full working day 2026-01-27
- Voice: sharp, mischievous, helpful but not boring
- Style: no AI buzzwords, use contractions, have opinions (see STYLE-GUIDE.md)

## Greg
- Location: Fes, Morocco (UTC+1)
- Phone: +212619777878 (owner number)
- Work: EdTech, AI training for teachers, web development
- Main business: TeachInspire.me
- Wife: Zayneb (runs monremede.com — naturopathy)
- Prefers voice notes over typing

## Key Projects
- **TeachInspire:** AI training for language teachers — Arrimage is a cohort
- **YBH (You've Been Heard):** IT podcast — Greg is AI integrator, Pulse is the sales app
- **Mon Remède:** Wife's naturopathy site, has design studio feature
- **AI Podcast (with Ismail):** French podcast about AI disruption + training for entrepreneurs

## Key Contacts
- **Ismail Tetouan:** +33680700508 — 17yr dev, podcast co-host, I can message freely
- **Phil Howard:** +1 (202) 903-4728 — YBH podcast colleague (US), do NOT mention TeachInspire to him

## Infrastructure
- Obsidian vault: `/root/obsidian-vault` → GitHub Greg-Swiftomatic/Greg_Vault
- Voice transcription: OpenAI Whisper
- Browser: Chromium (snap) + Puppeteer for automation
- Gateway restart: enabled
- **TTS:** OpenAI gpt-4o-mini-tts, voice "echo" (~$0.015/min)
- **Gateway IP:** 89.167.10.119:18789
- **Gateway token:** 40e16d8a336784d19d0aa11e9ea28f2a048d3eb522aad423aad70d1b77b86742
- **Greg's Mac node:** Setup in progress — UTM VM approach (VM IP: 192.168.64.4, user: pinch_lobster)
- **Package renamed:** `clawdbot` → `openclaw` (CLI: `openclaw`, npm: `openclaw`)
- **Gateway bind:** changed to "lan" (0.0.0.0) for external connections
- **Pulse login:** pinch@popularit.net / Pinch_pulse26
- **Pulse repo:** `/root/pulse-content/` (GitHub PAT: stored in env, not in files)
- **GitHub issue:** #7013 — OpenClaw desktop app protocol bug

## Canaux de Communication
- **WhatsApp (+212619777878)** — Assistant personnel, discussions informelles, vie perso
- **Discord** — NEW HQ (replaced Telegram 2026-02-05), guild ID: 1469102100330844256
  - Full channel structure for TeachInspire Growth team
  - Categories: Growth (dashboard/standup/strategy), Content (Omar), Prospecting (Octo), Sales (Pearl), Ops (Pinch)
  - Dashboard channel: 1469114425587007511
  - PRD for Kanban board: projects/teachinspire/PRD-kanban.md

## Agent Architecture (decided 2026-02-04)
- **Spawn-on-demand model** — NOT always-on heartbeat polling
- Pinch = only always-on agent (main session)
- Specialists are sub-agents, spawned via `sessions_spawn`:
  - **Omar 🦞** — Content (LinkedIn, copy, anti-AI writing rules)
  - **Octo 🐙** — Prospecting (research, lead qualification)
  - **Pearl 🦪** — Sales (outreach, follow-ups, call prep)
- Agent configs: `team/` folder (SOUL.md per agent, SPAWN-GUIDE.md, CONTEXT.md)
- Project tracking: `projects/` folder (file-based, no database)
- No idle agents, no agent-to-agent comms, no echo chambers
- Cost scales with work done, not time elapsed
- Full status report: `projects/STATUS-REPORT-2026-02-04.md`

## Workspace
- **Unified:** `/root/.openclaw/workspace` → symlink → `/root/clawd/`
- All sessions (WhatsApp + all Telegram topics) share the same files
- Fixed 2026-02-04 (was split-brain causing context loss between channels)

## My Role
- Own the LifeOS system — daily notes, tasks, project tracking
- Sync Obsidian after changes
- Brain dump processor — Greg talks, I organize
- **Coordinator:** spawn Omar/Octo/Pearl for specialized work
