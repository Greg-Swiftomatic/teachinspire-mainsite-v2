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
**Status: ✅ FEASIBLE**

- Zoom Team Chat API allows creating chatbots
- Bot can receive messages and respond
- Can send proactive notifications to channels/DMs
- **Required:** Zoom Marketplace App (OAuth 2.0)

### 2. Email Automation (Guests)
**Status: ✅ FEASIBLE**

Options:
- **Resend/Sendgrid API** — transactional emails with templates
- **Gmail API** — send from @youvebeenheard.com address
- **Direct SMTP** — via any provider

The bot can:
- Send personalized emails with templates
- Track sends (who received what, when)
- Schedule sends (D-1 before release, etc.)

### 3. Distribution Calendar
**Status: ✅ FEASIBLE**

- Already being built in Pulse → perfect
- Bot can read calendar via Sanity API
- Send reminders based on dates
- Track what's done vs. to-do

### 4. Published URL Tracking
**Status: ✅ FEASIBLE**

- Simple database (in Sanity or separate)
- Bot records each published URL
- Can generate recaps per episode/guest

### 5. Automated Reminders
**Status: ✅ FEASIBLE**

- Cron jobs that check the calendar
- Daily/weekly Zoom Chat notifications
- Personalized by sales rep / episode

---

## ⚠️ Limitations & Constraints

### Zoom Chat
- **Review process**: Zoom App must be approved (can take a few days)
- **Scopes**: need `chat:write`, `chat:read` permissions
- **Workspace**: all users must be in the same Zoom workspace

### Social Media Publishing
- **NOT automated**: the bot does NOT post directly to LinkedIn/YouTube/etc.
- **Workflow**: Bot REMINDS humans to post, then TRACKS the URLs they provide
- (Direct LinkedIn automation is risky — account ban)

### Guest Communication
- Bot SENDS emails
- Guest replies → either ignored or forwarded to a human
- No automated bidirectional conversation with guests

---

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         PULSE                               │
│  (Sanity CMS - Episodes, Calendar, Guests)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ 
                          │ Webhook: "Episode validated"
                          │ API: Read calendar, episodes
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  YBH DISTRIBUTION BOT                       │
│  (Dedicated Clawdbot instance)                              │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Scheduler   │  │ Email       │  │ Tracker     │         │
│  │ (cron jobs) │  │ Templates   │  │ (URLs)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │              State Management               │           │
│  │  - Episodes status                          │           │
│  │  - Distribution calendar                    │           │
│  │  - Sales rep assignments                    │           │
│  │  - Sent emails log                          │           │
│  │  - Published URLs                           │           │
│  └─────────────────────────────────────────────┘           │
└───────────┬─────────────────────────────┬───────────────────┘
            │                             │
            ▼                             ▼
┌───────────────────┐          ┌───────────────────────┐
│    ZOOM CHAT      │          │      EMAIL            │
│                   │          │  (Resend/Sendgrid)    │
│  - Sales reps     │          │                       │
│  - Daily briefs   │          │  - Guest outreach     │
│  - Reminders      │          │  - Publication recap  │
│  - Status checks  │          │                       │
└───────────────────┘          └───────────────────────┘
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

## 📧 Email Templates (to create)

### Template 1: Pre-Release (D-1)
```
Subject: Your episode drops tomorrow! 🎙️

Hi {guest_name},

Your episode of You've Been Heard is releasing tomorrow!

Episode: {episode_title}
Release Date: {release_date}

Would you help us spread the word? A LinkedIn post from you 
would mean a lot. Feel free to share your thoughts on the 
conversation we had.

We'll send you links to everything we publish about your episode.

Thanks for being part of YBH!

— The YBH Team
```

### Template 2: Post-Publication Recap
```
Subject: Here's what we published about you 📣

Hi {guest_name},

Your episode is live! Here's everything we've published:

🎧 Episode: {episode_url}

📱 Social Posts:
{url_list}

Feel free to like, comment, and share any of these. 
Your engagement helps us reach more IT leaders!

Thanks again,
— The YBH Team
```

### Template 3: Re-engagement (Week 2+)
```
Subject: Your episode is still getting traction! 

Hi {guest_name},

Quick update — we're continuing to share content from 
your episode:

{new_url_list}

If you have a moment, your engagement really helps!

— The YBH Team
```

---

## 🔄 Automated Workflows

### Workflow 1: Episode Validated
```
TRIGGER: Zuber marks episode "validated" in Pulse

1. Bot receives webhook
2. Bot checks distribution calendar
3. Bot notifies on Zoom: 
   "✅ EP {num} - {guest} validated! Distribution scheduled: {date}"
4. Bot schedules D-1 reminder for guest email
```

### Workflow 2: Daily Brief (9 AM every day)
```
TRIGGER: Cron job 9 AM

1. Bot checks today's calendar
2. Bot generates brief:
   "📅 Today's Distribution:
    - EP 391: LinkedIn Post #2 (Devon J. Delano)
    - EP 389: Quote Card Instagram
    @{sales_rep} — your guest needs follow-up"
3. Sends to Zoom Chat channel
```

### Workflow 3: Publication Tracking
```
TRIGGER: Sales rep posts URL on Zoom Chat

User: "Posted EP 391 on LinkedIn: https://linkedin.com/post/..."

1. Bot parses URL and episode
2. Bot records in tracker
3. Bot confirms: "✅ Recorded! EP 391 now has 3 posts."
4. If all today's publications are done:
   Bot: "🎉 Today's distribution complete!"
```

### Workflow 4: Guest Email (automatic)
```
TRIGGER: D-1 before release date

1. Bot retrieves guest email from Pulse
2. Bot generates email with template + data
3. Bot sends via email API
4. Bot logs the send
5. Bot notifies Zoom: "📧 D-1 email sent to {guest}"
```

---

## 🛠️ Implementation — Steps

### Phase 1: Foundation (1-2 days)
- [ ] Create Zoom App on marketplace.zoom.us
- [ ] Configure OAuth + Zoom webhooks
- [ ] Create dedicated YBH Clawdbot instance
- [ ] Setup email API (Resend or Sendgrid)

### Phase 2: Core Bot (2-3 days)
- [ ] Sanity API integration (read episodes, calendar)
- [ ] Basic Zoom commands (/status, /today, /track)
- [ ] URL tracking system
- [ ] Email templates in bot

### Phase 3: Automation (1-2 days)
- [ ] Pulse → Bot webhooks
- [ ] Cron jobs for daily briefs
- [ ] Automated D-1 emails
- [ ] Personalized reminders

### Phase 4: Polish (1 day)
- [ ] Error handling
- [ ] Logs and monitoring
- [ ] Team documentation

**Total estimate: 5-8 days of dev**

---

## 🎮 Proposed Zoom Commands

| Command | Description |
|---------|-------------|
| `/status {ep}` | Episode status (distribution progress) |
| `/today` | What to post today |
| `/week` | This week's schedule |
| `/track {ep} {url}` | Record a published URL |
| `/guest {ep}` | Guest info + email history |
| `/email {ep} {template}` | Send email to guest |
| `/recap {ep}` | All published URLs for an episode |

---

## ❓ Open Questions

1. **How many sales reps?** (for the assignment system)
2. **Which platforms exactly?** (LinkedIn, YouTube, IG, FB, TikTok, others?)
3. **Re-engagement frequency?** (1x/week? 2x/week?)
4. **Existing email provider?** (Gmail workspace? Other?)
5. **Pulse calendar format?** (I can explore if you want)

---

## 📊 Summary

| Aspect | Status |
|--------|--------|
| Overall feasibility | ✅ 100% feasible |
| Complexity | ⚠️ Medium (multiple integrations) |
| Timeline | 5-8 days |
| Dependencies | Zoom App approval, Email API, Sanity access |
| Maintenance | Low once setup |

**Recommendation:** Start with Phase 1 (Zoom App + Email setup) while you finalize the calendar in Pulse. Then we wire everything together.

---

*Document created by Pinch 🦀 — 2026-02-02*
