# TeachInspire — CLAUDE.md v2.0

> Last updated: February 2025

---

## Project Overview

| Field | Value |
|-------|-------|
| **Name** | TeachInspire |
| **Type** | B2B Marketing website + Formation landing |
| **Language** | French (primary), English (technical terms) |
| **Domain** | AI training for language teaching institutes |
| **Core Message** | "L'IA comme assistant, pas comme remplaçant" |

### Target Audience

**Primary:** B2B decision-makers
- Institute directors
- Training managers
- Language school owners

**Secondary:**
- Independent language trainers
- FLE/English/Spanish teachers

---

## Design Philosophy

### Editorial Collage Aesthetic

The canonical direction is the **July 2026 TeachInspire reference charter**: a calm, precise editorial collage system that makes the pedagogical transformation visible. Swiss editorial structure still informs the grid and typography, but documentary fragments, paper material, arrows, and occasional handwritten annotations are now intentional brand elements.

**Design Principles:**
- Show a legible `source → method → result` transformation in every major visual
- Keep 60–70% of the composition calm or empty, with one dominant movement
- Use real-looking documentary fragments, simplified interfaces, and modular CSS/SVG objects
- Reserve golden yellow for one focal decision, validation, or primary CTA
- Use Fraunces and DM Sans for the interface; handwritten type is limited to short collage annotations
- Prefer sharp or subtly softened corners, light printed shadows, asymmetric layouts, and clear editorial numbering

**NOT this style:**
- ❌ Futuristic AI imagery, robots, holograms, glowing brains, or generic gradients
- ❌ Decorative scrapbooking where paper and texture do not explain a transformation
- ❌ Cold interchangeable SaaS dashboards or repeated generic card grids
- ❌ Childish classroom imagery, caricatures, or playful doodles
- ❌ Front-facing generated portraits or corporate stock photography

---

## Design Context

### Users
TeachInspire primarily serves B2B decision-makers in language education: institute directors, pedagogical managers, and language-school owners responsible for helping teaching teams adopt generative AI without lowering pedagogical standards. They often scan the site between operational tasks and need to understand the offer, its institutional value, and its safeguards quickly enough to decide whether to book a discovery call. Independent FLE, English, and Spanish trainers are a secondary audience evaluating whether the individual pathway and Studio fit their own preparation workflow.

### Brand Personality
Editorial, documentary, precise. The experience should evoke confidence, calm control, and professional momentum rather than hype, technological anxiety, or artificial urgency. TeachInspire should feel independent of short-lived tools: the teacher remains visibly responsible for selecting, structuring, verifying, and using the result.

### Aesthetic Direction
The approved direction is a light, magazine-like digital editorial collage inspired by contemporary visual journalism, Vox, Medium editorial illustration, and New York Times visual storytelling, with the modular clarity of Notion and Linear. Use Fraunces for campaign headlines, quotations, and editorial numbers; use DM Sans for navigation, body copy, labels, buttons, and interfaces. The core palette is off-white `#F8F7F2`, deep navy `#2C3D57`, sage `#85A2A3`, ink `#24344D`, and a maximum 5% golden yellow `#F1D263`; rust may appear sparingly in editorial emphasis and short annotations. The default experience is light with deliberate navy contrast sections, not a separate dark-mode theme. Paper, tape, grids, arrows, and handwritten annotations are welcome only when they make `source → selection → method → decision → result` easier to understand. Anti-references are futuristic AI imagery, cold SaaS dashboards, decorative scrapbooking, generic card grids, childish school imagery, glassmorphism, corporate stock photography, and visible faces.

### Design Principles
1. **Make transformation visible.** Every major illustration must identify the source, show the organising method, and end in a usable pedagogical result; collage material never exists as decoration alone.
2. **Balance density with calm.** Preserve 60–70% breathing room, alternate quiet editorial sections with denser documentary moments, and allow only one clear movement and one yellow focal point per composition.
3. **Keep the system modular and reproducible.** Build cards, documents, labels, and lesson packs in HTML/CSS; use SVG for arrows, connectors, and annotations; reserve image assets for genuine paper or print texture.
4. **Keep pedagogical judgment central.** The interface should communicate that AI assists while the formateur selects, verifies, and decides. Concrete proof such as `3h → 30 min`, real sources, outputs, pricing, and institutional capital should remain easy to scan.
5. **Earn trust through usability.** Maintain WCAG AA contrast for meaningful text, 44px touch targets, complete mobile navigation, visible focus states, semantic structure, reduced-motion support, functional CTAs, and readable diagrams without microtext.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18+ with TypeScript |
| Build | Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS 3.x |
| Animations | Framer Motion + **GSAP** |
| Icons | Lucide React |
| Fonts | Google Fonts (Fraunces, DM Sans) |

### Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Design System

### Colors

```javascript
// tailwind.config.js
colors: {
  navy: '#2c3d57',      // Text, headings, dark backgrounds
  cream: '#f8f7f2',     // Page background (also #F4F3F0)
  sage: '#85a2a3',      // Secondary accent, subtle elements
  yellow: '#f1d263',    // Primary CTA, highlights
  rust: '#B7553D',      // Heading accents, emphasis
  'navy-light': '#4a5568',
  'sage-light': '#a8c5c6',
}
```

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#2c3d57` | Text, headings, dark backgrounds |
| Cream | `#f8f7f2` | Page background |
| Sage | `#85a2a3` | Secondary accent, subtle elements |
| Yellow | `#f1d263` | Primary CTA buttons, highlights |
| **Rust** | `#B7553D` | **Heading accents, emphasis words** |

### Typography

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap');
```

| Role | Font | Tailwind Class |
|------|------|----------------|
| Display/Headings | Fraunces | `font-display` |
| Body/UI | DM Sans | `font-sans` |

```javascript
// tailwind.config.js
fontFamily: {
  display: ['Fraunces', 'serif'],
  sans: ['DM Sans', 'sans-serif'],
}
```

### Typography Scale

| Element | Size | Weight | Class |
|---------|------|--------|-------|
| H1 (Hero) | 3.5rem / 56px | 600-700 | `text-5xl lg:text-6xl font-semibold font-display` |
| H2 (Section) | 2.25rem / 36px | 600-700 | `text-3xl lg:text-4xl font-semibold font-display` |
| H3 (Card) | 1.5rem / 24px | 600 | `text-xl lg:text-2xl font-semibold` |
| Body | 1.125rem / 18px | 400 | `text-lg` |
| Small/Label | 0.75rem / 12px | 500 | `text-xs font-medium tracking-widest uppercase` |

### Spacing

Base unit: 8px. Use Tailwind spacing scale.

| Token | Value | Usage |
|-------|-------|-------|
| `p-4` | 16px | Component padding |
| `p-6` to `p-10` | 24-40px | Card padding |
| `py-20` | 80px | Section vertical padding |
| `py-28` | 112px | Large section padding |
| `gap-6` | 24px | Grid gaps |

### Border Radius

**Swiss Editorial = Sharp corners**

| Element | Radius |
|---------|--------|
| Buttons | `rounded-sm` or none |
| Cards | None (sharp corners) |
| Badges | `rounded-sm` |
| Inputs | `rounded-sm` |

---

## Project Structure

```
teachinspire/
├── CLAUDE.md                 ← This file
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.tsx
    ├── router.tsx            ← React Router config
    │
    ├── assets/
    │   ├── illustrations/
    │   ├── images/
    │   └── assets.ts
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Container.tsx
    │   │
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Problem.tsx
    │   │   ├── Possibility.tsx
    │   │   ├── Approach.tsx
    │   │   ├── Modules.tsx
    │   │   ├── Results.tsx
    │   │   ├── Philosophy.tsx
    │   │   ├── Founder.tsx
    │   │   └── FinalCTA.tsx
    │   │
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Badge.tsx
    │       └── PremiumSourceDiagram.tsx  ← GSAP animated diagram
    │
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── FormationPage.tsx
    │   ├── AboutPage.tsx
    │   └── ContactPage.tsx
    │
    ├── hooks/
    │   └── useReducedMotion.ts
    │
    └── styles/
        └── globals.css
```

---

## Site Architecture

### Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | HomePage | Main landing page |
| `/formation` | FormationPage | Detailed program, modules, pricing |
| `/a-propos` | AboutPage | Bio, timeline, philosophy |
| `/contact` | ContactPage | Zoom Scheduler + email |

**Note:** Plateforme page has been removed. Focus is solely on Formation.

### Homepage Sections (in order)

1. **Hero** — Value proposition + CTA
2. **Problem** — Pain points (3h prep time, generic content)
3. **Possibility** — Source transformation diagram (GSAP animated)
4. **Approach** — Solution preview (AI as assistant)
5. **Modules** — 3 modules overview
6. **Results** — Concrete benefits
7. **Philosophy** — "L'IA comme assistant, pas comme remplaçant"
8. **Founder** — Brief intro to Gregory
9. **FinalCTA** — Closing call-to-action

---

## Component Patterns

### Section Label Pattern

Used consistently across all pages for Swiss editorial feel:

```tsx
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
        {children}
      </span>
      <div className="flex-1 h-px bg-navy/10" />
    </div>
  );
}
```

### 12-Column Grid Overlay

Subtle grid visible on sections:

```tsx
<div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
  {[...Array(12)].map((_, i) => (
    <div
      key={i}
      className="absolute top-0 bottom-0 w-px bg-navy"
      style={{ left: `${(i + 1) * (100 / 12)}%` }}
    />
  ))}
</div>
```

### Decorative Numbers

Large faded numbers for lists:

```tsx
<span className="text-5xl font-display font-bold text-navy/10">01</span>
```

---

## Animation Guidelines

### GSAP (Premium animations)

Used for complex, scroll-triggered sequences:

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Timeline with scroll trigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
});

tl.fromTo('.element',
  { opacity: 0, x: -40 },
  { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
);
```

### Framer Motion (Simple animations)

Used for fade-in, hover states:

```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

### Timing

| Animation Type | Duration |
|----------------|----------|
| Micro (hover) | 150-200ms |
| Section reveal | 500-600ms |
| Stagger delay | 100-150ms |

### Rules

- Use `transform` and `opacity` only (GPU accelerated)
- Trigger on scroll when 80% visible
- Play once (`viewport: { once: true }`)
- **Always respect `prefers-reduced-motion`**

---

## Content Guidelines

### Tone

- **Direct** — No fluff, get to the point
- **Authoritative** — Confident, expert positioning
- **Professional** — B2B appropriate, not casual
- **Honest** — Acknowledge AI limitations

### Forbidden Words/Phrases

❌ Never use:
- "Révolutionnez", "Transformez", "Boostez"
- "Magie", "Super-pouvoirs", "Miraculeux"
- "Libérez le potentiel", "Passez au niveau supérieur"
- Generic tech buzzwords
- Overly casual/playful language

✅ Prefer:
- Concrete metrics: "3h → 30min"
- "L'IA vous assiste", not "L'IA remplace"
- "Comprendre les fondamentaux"
- Specific, measurable outcomes
- Professional, confident statements

### Key Copy

**Tagline:**
> "L'IA comme assistant, pas comme remplaçant"

**Value Proposition:**
> "Formez vos équipes à créer des leçons à partir de n'importe quelle source"

**Subheadline:**
> "La méthode IA pour vos formateurs de langues — sans expertise, sans budget."

---

## External Links

| Resource | URL |
|----------|-----|
| Zoom Scheduler | `https://scheduler.zoom.us/greg-le-dall/decouverte` |
| Email | `greg@teachinspire.me` |

---

## Quality Checklist

Before committing:

- [ ] All text is in French (except technical terms)
- [ ] No forbidden buzzwords
- [ ] Colors match brand palette exactly
- [ ] **Rust accent on heading keywords**
- [ ] Mobile responsive (test at 375px)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Sharp corners (Swiss editorial style)
- [ ] Section labels with horizontal rules
- [ ] All CTAs have hover states
- [ ] Console has no errors

---

## Git Workflow

```bash
# Feature branch
git checkout -b feat/section-name

# Commit convention
git commit -m "feat: add Hero section"
git commit -m "fix: button hover state"
git commit -m "style: adjust spacing"
git commit -m "refactor: extract Card component"

# Merge to main
git checkout main
git merge feat/section-name
```

---

*TeachInspire — CLAUDE.md v2.0*
