# YBH Distribution System — Setup Roadmap & Scaling Plan

## What We Have (✅ Working)

| Component | Status | Details |
|-----------|--------|---------|
| Pulse Studio | ✅ In dev | PRF, hooks, LinkedIn posts, metadata, design studio |
| Sanity CMS | ✅ Live | Episodes, guests, metadata, generated assets |
| kie.ai integration | ✅ Working | Infographics, quote cards, career timelines, thumbnails |
| Video clips | 🔄 Being built | 3 clips per episode (1:1 + 9:16) |
| Brand Kit pages | ✅ Working | Landing pages per guest with download kit |
| Zoom Workplace | ✅ Working | Production doc tracking (upload date + release date) |
| Adobe Podcast | ✅ Working | Zubair edits audio/video |
| Fillout quizzes | ✅ Working | 3 IT questions for guests |
| Circle community | ✅ Live | 181+ members, events for recordings |
| getLater.dev | ✅ Connected | Social media scheduler (backup) |

---

## What's Missing (❌ To Build)

### PRIORITY 1: Distribution Engine (Week 1-2)

#### 1.1 Social Media API Access
**Why:** Direct posting with guest tagging (getLater can't tag)

| Platform | What to Do | Who | Time |
|----------|-----------|-----|------|
| **LinkedIn** | Create app at linkedin.com/developers. Link to YBH Company Page. Add Community Management API product. Fill access form with business details + @youvebeenheard.com email. Super admin (Phil) must verify app. | Greg + Phil | 10 min setup, 2-7 days approval |
| **YouTube** | Go to console.cloud.google.com. Create project. Enable YouTube Data API v3. Create OAuth credentials. Connect to YBH YouTube channel. | Greg | 30 min |
| **Instagram** | Go to developers.facebook.com. Create app (Business type). Add Instagram Graph API. Connect YBH Instagram business account. Requires Facebook Page linked to IG. | Greg | 30 min |
| **TikTok** | Go to developers.tiktok.com. Apply for Content Posting API. Connect YBH TikTok account. | Greg | 15 min setup, few days approval |
| **Facebook** | Same Meta app as Instagram. Add Pages API permissions. Connect YBH Facebook Page. | Greg | Done with Instagram |

**Credentials needed (store in .dev.vars):**
```
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_ACCESS_TOKEN=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=
META_APP_ID=
META_APP_SECRET=
META_PAGE_ACCESS_TOKEN=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TIKTOK_ACCESS_TOKEN=
```

#### 1.2 Email System
**Why:** Automated guest emails (D-1 through D+60)

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Resend** (recommended) | Simple API, great deliverability, templates | Newer | Free up to 3K/month |
| Sendgrid | Established, powerful | Complex setup | Free up to 100/day |
| Gmail API | Sends from @youvebeenheard.com | Rate limits, setup complexity | Free |

**To set up Resend:**
1. Sign up at resend.com
2. Add youvebeenheard.com domain (DNS records)
3. Create API key
4. Build email templates (6 templates needed)

**Email templates to create:**

| Template | Trigger | Subject Line |
|----------|---------|-------------|
| Pre-release (D-1) | 1 day before release date | "Your episode drops tomorrow 🎙️" |
| Live (D+0) | Release day | "You're live! Here's your Brand Kit" |
| Recap (D+3) | 3 days after | "Here's what we published about you 📣" |
| Traction (D+14) | 2 weeks after | "Your episode is still getting traction!" |
| Advisory (D+30) | 1 month after | "Quick question about your tech stack" |
| Contract (D+60) | 2 months after | "Checking in" (only if renewal mentioned) |

#### 1.3 Distribution Calendar Engine
**Why:** Automates what gets posted where and when

**What it does:**
- Reads episode release date from Sanity
- Generates full 7-day distribution schedule (D-1 to D+6)
- Maps each asset to the right platform + format
- Handles overlapping episodes (2-3/week)
- Max 2 posts per platform per day rule
- Queues posts with scheduled times

**Where it lives:** Cloudflare Worker (cron triggers) or extension of Pulse

**Data model (new Sanity schema):**
```
distributionSchedule {
  episodeRef -> episode
  releaseDate: date
  posts: [
    {
      day: number (D-1, D+0, D+1...)
      platform: 'linkedin' | 'youtube' | 'instagram' | 'tiktok' | 'facebook'
      assetType: 'release_post' | 'video_clip' | 'infographic' | 'quote_card' | 'short' | 'reel'
      assetRef -> generatedAsset
      caption: text
      status: 'scheduled' | 'posted' | 'failed'
      postedUrl: url
      postedAt: datetime
    }
  ]
  emails: [
    {
      template: string
      scheduledDate: date
      status: 'pending' | 'sent' | 'failed'
      sentAt: datetime
    }
  ]
}
```

#### 1.4 Zoom Chat Bot (Team Notifications)
**Why:** Keep reps informed, daily briefs, track URLs

**To set up:**
1. Go to marketplace.zoom.us
2. Create Team Chat App (OAuth 2.0)
3. Add scopes: chat:write, chat:read
4. Submit for approval
5. Install in YBH Zoom workspace

**Or alternative:** Use a Telegram group/topic instead (faster to set up, we already have the infrastructure). Could use this exact Shell group with a dedicated topic.

---

### PRIORITY 2: PRF CTAs (Week 2-3)

#### 2.1 Add 7 Sidebar CTAs to Brand Kit Pages
**Why:** Biggest missed opportunity per Phil's strategy. Zero CTAs currently.

**What to build in Pulse:**
- CTA component for Brand Kit landing page
- Rotation logic: show 3-4 per page view
- Always show CTA 1 (case study) + CTA 7 (community)
- Rotate CTAs 2-6 based on guest's Casefuel intake data from Sanity
- Click tracking (which CTAs get clicked)

**CTA destinations to create:**
| CTA | Destination | Exists? |
|-----|------------|---------|
| Case study | Website advisory page with Trinity Health numbers | ❌ Need to build |
| Cyber Sleep Score | Fillout scorecard | ❌ Need to build |
| Microsoft Health Check | Fillout scorecard | ❌ Need to build |
| Vendor Reality Check | Fillout scorecard (was broken, rebuild) | ❌ Need to rebuild |
| Community invite | Circle join link | ✅ Exists |
| Phil 1:1 booking | Calendly or similar | ❓ Check with Phil |
| Vendor Reality Brief | PDF download behind form | ❌ Need to create |

#### 2.2 Fix Website Advisory Link
**Why:** Currently 404. People are hitting a dead end.

- Either rebuild at current URL
- Or redirect to a new landing page
- Add real case studies (Trinity Health $1.872M)
- Working CTA (1:1 booking or scorecard)

---

### PRIORITY 3: Post-Episode Automation (Week 3-4)

#### 3.1 Webhook: Pulse → Distribution Bot
**Why:** When episode is marked "ready," distribution starts automatically

**Flow:**
1. Zubair marks episode as validated in Zoom Workplace doc
2. Greg uploads transcript to Pulse
3. Pulse generates all assets
4. Greg (or auto) marks episode "ready for distribution"
5. Webhook fires to Distribution Bot
6. Bot generates full calendar based on release date
7. Bot starts scheduling posts + emails

#### 3.2 URL Tracking System
**Why:** Know what's been published, generate recaps for guests

**What to build:**
- New Sanity schema: `publishedContent { episodeRef, platform, url, postedAt }`
- Bot records URL after each successful post
- Dashboard view: per episode, see all published URLs
- Auto-generates recap for guest emails (D+3, D+14)

#### 3.3 350 Guest Re-engagement Campaign
**Why:** 45% open rate. Warm leads sitting untouched.

**What's needed:**
- Export guest list from CRM/GHL
- 5-email sequence (per Phil's strategy)
- Segment by vertical if possible (cybersecurity, Microsoft, etc.)
- Can use Resend or GHL for this

---

### PRIORITY 4: Scaling & Optimization (Week 5-8)

#### 4.1 GHL Pipeline Setup
- Pipeline 1: Podcast Recruitment (13 stages)
- Pipeline 2: Advisory Leads (8 stages)
- Pipeline 3: Content Nurture (5 stages)
- Lead scoring model (0-100 based on engagement)
- Webhooks: Fillout → GHL, CTA clicks → GHL

#### 4.2 Vertical Landing Pages
- One page per vertical (Cybersecurity, Microsoft, Network, Telecom, Mobile, Cloud)
- Each has: hook, brief download, case study, scorecard CTA, 1:1 booking
- Traffic from PRF CTAs, emails, LinkedIn posts

#### 4.3 Phil's Playbook Extraction
- Start recording Phil's 1:1 calls (Zoom transcription)
- AI analysis: extract language patterns, question sequences, objection handling
- Build "Phil's Playbook" document for reps
- Ongoing: each new call adds to the library

#### 4.4 Backlog Processing
- Process 390+ past episodes through Pulse
- Priority: most recent 50 first
- Need transcripts (generate from audio if needed)
- Each processed episode feeds the content engine

---

## Scaling to 3 Episodes/Week

**What changes:**
- Release days: Tue + Thu + Sat (or Mon + Wed + Fri)
- Three overlapping distribution calendars
- Calendar engine already handles this with the overlap logic
- Max 2 posts per platform per day still applies

**What's needed:**
- Zubair capacity: Can he edit 3 episodes/week? (currently 2)
- Pulse processing: Already automated, can handle more
- Distribution bot: Calendar logic scales automatically
- Social media fatigue: Monitor engagement. If it drops, adjust cadence.

**The math at 3/week:**
| Metric | 2/week | 3/week |
|--------|--------|--------|
| Assets produced | ~30 | ~45 |
| Distribution touchpoints | ~56 | ~84 |
| Guest emails | 12 | 18 |
| LinkedIn posts | ~14 | ~21 |
| YouTube uploads | 8 | 12 |
| Instagram posts | 12 | 18 |

---

## Immediate Action Items (This Week)

| # | Task | Owner | Time | Blocked By |
|---|------|-------|------|------------|
| 1 | Apply for LinkedIn Community Management API | Greg + Phil (super admin) | 10 min | Phil's approval |
| 2 | Create YouTube Data API project | Greg | 30 min | Nothing |
| 3 | Create Meta (IG + FB) developer app | Greg | 30 min | Need IG business account |
| 4 | Apply for TikTok Content Posting API | Greg | 15 min | Nothing |
| 5 | Sign up for Resend + verify domain | Greg | 20 min | DNS access for youvebeenheard.com |
| 6 | Decide: Zoom Chat bot or Telegram topic for team comms? | Greg + Phil | Discussion | Nothing |
| 7 | Fix broken advisory link on website | Greg | 1-2 hours | Access to website code |
| 8 | Share Pulse .dev.vars with Pinch | Greg | 5 min | Nothing |

**Once APIs are approved (within 1 week):**

| # | Task | Owner | Time |
|---|------|-------|------|
| 9 | Build distribution calendar engine | Pinch | 2-3 days |
| 10 | Build email templates (6) | Pinch + Phil (copy review) | 1 day |
| 11 | Build social posting workers (per platform) | Pinch | 2-3 days |
| 12 | Build URL tracking system | Pinch | 1 day |
| 13 | Wire Pulse → Distribution webhook | Pinch | 0.5 day |
| 14 | Test with 1 episode end-to-end | Greg + Pinch | 1 day |

---

## Dependencies Map

```
LinkedIn API approval ──┐
YouTube API setup ──────┤
Meta API setup ─────────┼──→ Build posting workers ──→ Distribution Bot live
TikTok API approval ────┤
Resend domain verify ───┘──→ Build email templates ──→ Email automation live

Pulse .dev.vars ──→ Pinch understands Pulse code ──→ PRF CTAs built

Phil reviews email copy ──→ Email templates finalized
Phil super admin verify ──→ LinkedIn API approved

Fix website 404 ──→ PRF CTAs can link somewhere

Fillout scorecards built ──→ PRF CTAs have destinations
```

---

*Document by Pinch 🦀 — February 3, 2026*
