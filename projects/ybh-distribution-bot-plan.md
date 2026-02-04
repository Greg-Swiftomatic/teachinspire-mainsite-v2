# YBH Distribution Bot — Architecture Plan

## 🎯 Objective
Create an autonomous agent that manages post-production distribution of YBH episodes:
- Guest coordination (automated emails)
- Sales rep coordination (Zoom Chat)
- Multi-platform distribution calendar
- Publication tracking
- Automated reminders

---

## ✅ Feasibility — What's POSSIBLE

### 1. Zoom Chat Integration
Status: ✅ FEASIBLE
- Zoom Team Chat API allows creating chatbots
- Bot can receive messages and respond
- Can send proactive notifications to channels/DMs
- Required: Zoom Marketplace App (OAuth 2.0)

### 2. Email Automation (Guests)
Status: ✅ FEASIBLE
Options:
- Resend/Sendgrid API — transactional emails with templates
- Gmail API — send from @youvebeenheard.com address
- Direct SMTP — via any provider

The bot can:
- Send personalized emails with templates
- Track sends (who received what, when)
- Schedule sends (D-1 before release, etc.)

### 3. Distribution Calendar
Status: ✅ FEASIBLE
- Already being built in Pulse → perfect
- Bot can read calendar via Sanity API
- Send reminders based on dates
- Track what's done vs. to-do

### 4. Published URL Tracking
Status: ✅ FEASIBLE
- Simple database (in Sanity or separate)
- Bot records each published URL
- Can generate recaps per episode/guest

### 5. Automated Reminders
Status: ✅ FEASIBLE
- Cron jobs that check the calendar
- Daily/weekly Zoom Chat notifications
- Personalized by sales rep / episode

---

## ⚠️ Limitations & Constraints

### Zoom Chat
- Review process: Zoom App must be approved (can take a few days)
- Scopes: need chat:write, chat:read permissions
- Workspace: all users must be in the same Zoom workspace

### Social Media Publishing
- NOT automated: the bot does NOT post directly to LinkedIn/YouTube/etc.
- Workflow: Bot REMINDS humans to post, then TRACKS the URLs they provide
- (Direct LinkedIn automation is risky — account ban)

### Guest Communication
- Bot SENDS emails
- Guest replies → either ignored or forwarded to a human
- No automated bidirectional conversation with guests

---

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         PULSE                                │
│            (Sanity CMS - Episodes, Calendar, Guests)         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ Webhook: "Episode validated"
                          │ API: Read calendar, episodes
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 YBH DISTRIBUTION BOT                         │
│              (Dedicated Clawdbot instance)                    │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Scheduler   │  │   Email     │  │   Tracker   │         │
│  │ (cron jobs)  │  │  Templates  │  │   (URLs)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │           State Management                    │            │
│  │  - Episodes status                           │            │
│  │  - Distribution calendar                     │            │
│  │  - Sales rep assignments                     │            │
│  │  - Sent emails log                          │            │
│  │  - Published URLs                           │            │
│  └─────────────────────────────────────────────┘            │
└───────────┬─────────────────────────────┬───────────────────┘
            │                             │
            ▼                             ▼
┌───────────────────┐     ┌───────────────────────┐
│    ZOOM CHAT      │     │        EMAIL           │
│                   │     │  (Resend/Sendgrid)     │
│ - Sales reps      │     │                        │
│ - Daily briefs    │     │ - Guest outreach        │
│ - Reminders       │     │ - Publication recap     │
│ - Status checks   │     │                        │
└───────────────────┘     └───────────────────────┘
```

---

## 📋 Required Data

### In Pulse/Sanity (to create or already existing)

| Data | Exists? | Description |
|------|---------|-------------|
| Episodes | ✅ Yes | List of episodes with status |
| Guests | ✅ Yes | Guest info (name, email, LinkedIn) |
| Distribution Calendar | 🔄 In progress | Publication dates by episode/platform |
| Sales Rep Assignments | ❓ To create | Which sales rep manages which guest |
| Published URLs | ❓ To create | Publication tracking |

### In the Bot (internal state)

| Data | Description |
|------|-------------|
| Email logs | Who received which email, when |
| Reminder state | Which reminders have been sent |
| URL tracking | URLs published per episode/platform |

---

## 📧 Email Templates

### Template 1: Pre-Release (D-1)
Subject: Your episode drops tomorrow! 🎙️

### Template 2: Post-Publication Recap
Subject: Here's what we published about you 📣

### Template 3: Re-engagement (Week 2+)
Subject: Your episode is still getting traction!

---

## 🔄 Automated Workflows

1. **Episode Validated** → Webhook → Zoom notification → Schedule D-1 email
2. **Daily Brief (9 AM)** → Cron → Check calendar → Zoom Chat summary
3. **Publication Tracking** → Rep posts URL in Zoom → Bot parses & records
4. **Guest Email** → D-1 trigger → Send template → Log → Notify Zoom

---

## 🛠️ Implementation Phases

- Phase 1: Foundation (1-2 days) — Zoom App, OAuth, Email API
- Phase 2: Core Bot (2-3 days) — Sanity integration, commands, tracking
- Phase 3: Automation (1-2 days) — Webhooks, crons, auto-emails
- Phase 4: Polish (1 day) — Error handling, logs, docs

**Total: 5-8 days**

---

## 🎮 Zoom Commands

| Command | Description |
|---------|-------------|
| /ep {num} | Episode distribution status |
| /today | What to post today |
| /week | This week's schedule |
| /track {ep} {url} | Record a published URL |
| /guest {ep} | Guest info + email history |
| /email {ep} {template} | Send email to guest |
| /recap {ep} | All published URLs for an episode |

---

## ❓ Open Questions

1. How many sales reps? (for assignment system)
2. Which platforms exactly? (LinkedIn, YouTube, IG, FB, TikTok?)
3. Re-engagement frequency?
4. Existing email provider?
5. Pulse calendar format?

*Document created by Pinch 🦀 — 2026-02-02*
