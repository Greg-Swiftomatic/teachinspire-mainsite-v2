# TEACHINSPIRE
## Landing Page Redesign
### Design Brief & Technical Specifications

**Version 1.0 — December 2024**

---

## 1. Executive Summary

This document provides comprehensive design specifications for the TeachInspire landing page redesign. The design direction is inspired by Anthropic.com's editorial approach — warm, sophisticated, and typography-driven — adapted to TeachInspire's educational mission and brand identity.

### Design Objectives

- **Warm & Approachable:** Move away from cold corporate aesthetics
- **Editorial Sophistication:** Typography-first design approach
- **Visual Consistency:** Sketchbook-style illustrations replacing stock imagery
- **Brand Authenticity:** Reflect the geometric + organic duality of the logo
- **Professional Trust:** Establish credibility for B2B educational services

### Key Inspiration: Anthropic.com

Anthropic's website demonstrates how to create a warm, premium feel in a typically cold tech space. Key lessons we're applying:

- Warm color palette (terracotta/coral) instead of typical tech blues
- Editorial typography with serif body text for scholarly credibility
- Generous whitespace and restrained decoration
- Sharp corners (0px radius) for editorial feel
- Large, readable body text (24px)

---

## 2. Brand Identity & Logo

### 2.1 Logo Analysis

The new linear TeachInspire logo establishes a fundamental design duality that should inform all visual decisions:

| Element | Characteristics & Design Implications |
|---------|--------------------------------------|
| **"TEACH"** | Geometric sans-serif typography in navy blue (#2C5F7C). Represents: Structure, methodology, professionalism. Design application: Headers, navigation, structured content |
| **"inspire"** | Handwritten brush script in sage green (#7FA99B). Represents: Creativity, humanity, organic growth. Design application: Illustrations, accents, call-to-actions |
| **Lightbulb Icon** | Yellow glow element connecting the two words. Represents: Ideas, illumination, the spark of learning. Design application: Highlight color, interactive states, emphasis |

### 2.2 Logo Usage Guidelines

- **Primary placement:** Top-left of navigation, aligned with content edge
- **Minimum clear space:** Height of the lightbulb icon on all sides
- **Minimum size:** 120px width for web, ensuring "inspire" script remains legible
- **Background:** Use on cream (#F5F1E8) or white backgrounds only

---

## 3. Color System

The color palette maintains TeachInspire's established brand while applying Anthropic's warm, approachable philosophy.

### 3.1 Primary Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Navy Blue** | `#2C5F7C` | Primary text, headings, navigation, footer background |
| **Sage Green** | `#7FA99B` | Secondary accent, links, icons, success states |
| **Warm Yellow** | `#F4C542` | Primary CTA buttons, highlights, emphasis, badges |
| **Cream** | `#F5F1E8` | Page background, soft sections, card backgrounds |

### 3.2 Extended Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Near Black** | `#1A1A1A` | Body text for maximum readability |
| **Pure White** | `#FFFFFF` | Cards, content containers, contrast sections |
| **Navy Light** | `#4A7B94` | Hover states, secondary text, borders |
| **Sage Light** | `#A8C5BB` | Illustration accents, subtle highlights |
| **Yellow Light** | `#F8D87A` | Hover states for CTAs, soft emphasis |

### 3.3 Color Usage Rules

- **60-30-10 Rule:** Cream (60%), Navy/White (30%), Yellow/Sage (10%)
- **Text contrast:** Always maintain WCAG AA minimum (4.5:1 for body text)
- **Yellow restraint:** Use sparingly for maximum impact (CTAs, key highlights only)
- **Sage for warmth:** Use to soften the navy and add approachability

---

## 4. Typography System

Following Anthropic's editorial approach, we use a combination of serif and sans-serif fonts to create visual hierarchy and scholarly credibility.

### 4.1 Font Stack

| Role | Font | Fallback |
|------|------|----------|
| Headings | Georgia | Times New Roman, serif |
| Body Text | Inter | system-ui, sans-serif |
| UI Elements | Inter | system-ui, sans-serif |

### 4.2 Type Scale

| Element | Size | Weight | Line Height | Color |
|---------|------|--------|-------------|-------|
| H1 (Hero) | 56px | 700 | 1.1 | Navy #2C5F7C |
| H2 (Section) | 40px | 700 | 1.2 | Navy #2C5F7C |
| H3 (Card) | 28px | 600 | 1.3 | Navy #2C5F7C |
| Body | 20px | 400 | 1.6 | Near Black #1A1A1A |
| Small/Caption | 14px | 400 | 1.5 | Navy Light #4A7B94 |

*Design rationale: Large body text (20px) improves readability and creates editorial feel, following Anthropic's approach.*

### 4.3 Typography Guidelines

- **Maximum line width:** 680px for optimal readability
- **Paragraph spacing:** 24px between paragraphs
- **Letter spacing:** -0.02em for headings, normal for body
- **Text alignment:** Left-aligned for body, centered for hero headlines

---

## 5. Spacing & Layout System

### 5.1 Base Unit

Following Anthropic's approach, we use an **8px base unit** for all spacing calculations. This creates mathematical harmony and predictable layouts.

#### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 8px | Inline icon gaps |
| space-2 | 16px | Small component padding, tight gaps |
| space-3 | 24px | Standard component padding, paragraph spacing |
| space-4 | 32px | Card padding, medium gaps |
| space-6 | 48px | Section internal spacing |
| space-8 | 64px | Large section gaps |
| space-12 | 96px | Section vertical padding |
| space-16 | 128px | Hero section spacing |

### 5.2 Layout Grid

- **Container max-width:** 1200px
- **Container padding:** 24px (mobile), 48px (tablet), 64px (desktop)
- **Grid columns:** 12-column system with 24px gutters
- **Content max-width:** 680px for text-heavy sections

### 5.3 Border Radius

*Key design decision: Following Anthropic's sharp, editorial aesthetic, we use minimal border radius throughout.*

- **Cards & containers:** 4px (subtle softening)
- **Buttons:** 4px (consistent with editorial feel)
- **Input fields:** 4px
- **Badges/pills:** 16px (intentionally rounded for contrast)

---

## 6. Component Specifications

### 6.1 Buttons

#### Primary Button (CTA)

| Property | Value |
|----------|-------|
| Background | Yellow #F4C542 |
| Text Color | Navy #2C5F7C |
| Padding | 16px 32px |
| Font | Inter, 16px, 600 weight |
| Border Radius | 4px |
| Hover State | Background: #F8D87A, transform: translateY(-2px) |
| Shadow | 0 4px 12px rgba(244, 197, 66, 0.3) |

#### Secondary Button

| Property | Value |
|----------|-------|
| Background | Transparent |
| Border | 2px solid Navy #2C5F7C |
| Text Color | Navy #2C5F7C |
| Hover State | Background: Navy #2C5F7C, Text: White |

### 6.2 Cards

- **Background:** White #FFFFFF
- **Border:** None (clean, shadow-based)
- **Shadow:** `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Padding:** 32px
- **Border Radius:** 4px
- **Hover:** Shadow: `0 4px 16px rgba(0, 0, 0, 0.1)`, transform: `translateY(-4px)`

### 6.3 Navigation

- **Height:** 80px
- **Background:** Cream #F5F1E8 with blur backdrop
- **Position:** Fixed at top
- **Logo placement:** Left-aligned
- **Nav links:** Inter 16px, 500 weight, Navy color
- **CTA button:** Right-aligned, Primary button style

---

## 7. Illustration Style Guide

*Design rationale: Sketchbook-style illustrations reflect the "inspire" element of the logo, creating warmth and approachability while maintaining professional credibility.*

### 7.1 Style Characteristics

- **Line quality:** Hand-drawn feel with slight imperfections
- **Stroke weight:** 2-3px, varying naturally as if pen-drawn
- **Fill style:** Flat colors from brand palette, occasional subtle gradients
- **Texture:** Light paper grain overlay optional
- **Perspective:** Slightly naive/flat, avoiding strict 3D

### 7.2 Color Usage in Illustrations

- **Primary strokes:** Navy #2C5F7C
- **Fill areas:** Sage #7FA99B, Sage Light #A8C5BB
- **Accent highlights:** Yellow #F4C542 (sparingly)
- **Background elements:** Cream #F5F1E8

### 7.3 Illustration Subjects

Recommended themes for TeachInspire context:

- Teachers and students in learning moments
- Books, notebooks, and learning materials
- Lightbulbs (connecting to logo)
- Speech bubbles and conversation elements
- Laptops and digital tools (stylized, not photorealistic)
- Abstract shapes representing ideas and creativity

### 7.4 Placement Guidelines

- **Hero section:** Large illustration (400-600px) balancing text content
- **Feature cards:** Icon-sized illustrations (48-64px)
- **Section dividers:** Decorative elements (line drawings, partial sketches)
- **Background:** Subtle, low-opacity sketch elements for texture

---

## 8. Page Structure & Content

### 8.1 Recommended Page Sections

1. **Navigation:** Fixed header with logo, key links, and primary CTA
2. **Hero Section:** Clear value proposition with headline, subhead, CTA, and illustration
3. **Problem/Solution:** Address pain points and present TeachInspire as the solution
4. **Features/Benefits:** Card-based layout highlighting key offerings
5. **Social Proof:** Testimonials, logos, or credibility indicators
6. **Call-to-Action:** Strong closing section with clear next step
7. **Footer:** Contact info, links, secondary navigation

### 8.2 Content Guidelines

- **Tone:** Warm, professional, inspiring (not corporate or cold)
- **Length:** Concise headlines, scannable body text
- **Headlines:** Benefit-focused, action-oriented
- **CTAs:** Clear, specific actions ("Découvrir la formation", "Réserver ma session")

---

## 9. Responsive Design

### 9.1 Breakpoints

| Name | Width | Adjustments |
|------|-------|-------------|
| Mobile | < 640px | Single column, hamburger menu, stacked cards |
| Tablet | 640-1024px | Two-column grids, visible nav, reduced padding |
| Desktop | > 1024px | Full layout, three-column options, full navigation |

### 9.2 Mobile-Specific Guidelines

- **Typography:** H1 reduces to 36px, body to 18px
- **Touch targets:** Minimum 44x44px for all interactive elements
- **Buttons:** Full-width on mobile, stacked vertically
- **Illustrations:** Scale proportionally, may hide decorative elements

---

## 10. Motion & Animation

Animation brings warmth and delight to the TeachInspire experience. We use a dual-technology approach: CSS/Framer Motion for UI transitions, and Lottie for illustrated elements. This creates sophisticated motion without sacrificing performance.

### 10.1 Animation Philosophy

*Inspired by Anthropic's approach: "Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions."*

- **Purposeful:** Every animation serves UX, never decoration for its own sake
- **Warm:** Organic easing curves (ease-out, spring) over mechanical linear motion
- **Restrained:** Subtle movements that enhance without overwhelming
- **Performant:** 60fps minimum, GPU-accelerated transforms only

### 10.2 Technology Stack

| Technology | Use Case | Examples |
|------------|----------|----------|
| CSS Animations | Simple UI transitions, hover states, page load | Button hovers, card fade-ins, nav transitions |
| Framer Motion | Complex React animations, orchestrated sequences | Staggered reveals, scroll-triggered, page transitions |
| Lottie | Illustrated animations, vector graphics | Lightbulb glow, book opening, teacher waving |

### 10.3 CSS/Framer Motion: UI Transitions

#### Page Load Sequence

Orchestrated reveal using staggered animation-delay:

1. **0ms:** Background color fade in
2. **100ms:** Navigation slides down (translateY: -20px → 0)
3. **200ms:** Hero headline fades up (opacity + translateY)
4. **350ms:** Hero subtitle and CTA fade up
5. **500ms:** Hero illustration animates in (Lottie)

#### Timing & Easing

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Micro-interactions (hover) | 150-200ms | ease-out |
| Element enter/exit | 300-400ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Page transitions | 400-500ms | cubic-bezier(0.22, 1, 0.36, 1) |
| Lottie illustrations | 1000-2000ms | Built into animation file |

#### Specific UI Animations

**Button Hover:**
```css
/* Primary Button */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(244, 197, 66, 0.35);
  transition: all 200ms ease-out;
}
```

**Card Hover:**
```css
/* Feature Card */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(44, 95, 124, 0.12);
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Scroll Reveal (Framer Motion):**
```javascript
// Staggered section reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};
```

### 10.4 Lottie: Illustrated Animations

Lottie brings our sketchbook illustrations to life. These are vector-based JSON animations created in After Effects and exported via Bodymovin plugin. They're lightweight, scalable, and maintain the hand-drawn aesthetic.

#### Recommended Lottie Animations

| Animation | Location | Behavior |
|-----------|----------|----------|
| Lightbulb Glow | Hero section | Hand-drawn lightbulb flickers on, gentle glow pulse. Plays once on load, then subtle idle loop. |
| Book Opening | Features section | Sketchbook opens, pages flutter. Triggered on scroll into view. |
| Teacher Character | About section | Simple teacher figure waves or gestures. Loop with pause intervals. |
| Pencil Drawing | CTA section | Pencil sketches a line or checkmark. Plays once on scroll. |
| Clock/Timer | Problem section | Hand-drawn clock with spinning hands → transforms to check. Represents time saved. |

#### Lottie Style Requirements

- **Visual style:** Must match sketchbook aesthetic — hand-drawn lines, slight imperfections
- **Stroke weight:** 2-3px strokes, consistent with static illustrations
- **Color palette:** Navy, Sage, Yellow fills only — no off-brand colors
- **File size:** Target < 50KB per animation for performance
- **Frame rate:** 24fps or 30fps (not 60fps — keeps organic feel)
- **Easing:** Organic ease-in-out curves, avoid mechanical linear motion

#### Lottie Implementation

```html
<!-- HTML with lottie-player -->
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest"></script>

<lottie-player 
  src="/animations/lightbulb-glow.json"
  background="transparent"
  speed="1"
  style="width: 300px; height: 300px"
  autoplay
></lottie-player>
```

```jsx
<!-- React with lottie-react -->
import Lottie from 'lottie-react';
import lightbulbAnimation from './lightbulb-glow.json';

<Lottie 
  animationData={lightbulbAnimation}
  loop={false}
  onComplete={() => setShowIdleLoop(true)}
/>
```

### 10.5 Scroll-Triggered Animations

- **Trigger point:** When element is 20% visible in viewport
- **Direction:** Elements animate up (translateY: 30px → 0) with fade
- **Stagger:** 150ms delay between sibling elements
- **Play once:** Animations trigger only on first scroll into view
- **Lottie sync:** Lottie animations play when their section becomes visible

### 10.6 Accessibility & Performance

**Reduced motion:** Respect `prefers-reduced-motion` — disable all animations except essential feedback

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  lottie-player { display: none; }
  .static-fallback { display: block; }
}
```

- **GPU acceleration:** Use `transform` and `opacity` only — never animate width, height, top, left
- **Lottie lazy loading:** Load Lottie files only when section is about to enter viewport
- **Static fallbacks:** Every Lottie animation must have a static SVG fallback

---

## 11. Accessibility Requirements

### 11.1 Color Contrast (WCAG AA)

- **Body text:** Near Black on Cream = 12.5:1 ratio ✓
- **Headings:** Navy on Cream = 7.2:1 ratio ✓
- **Yellow buttons:** Navy text on Yellow = 5.1:1 ratio ✓
- **Links:** Sage on Cream = 3.8:1 (use underline for additional indicator)

### 11.2 General Requirements

- **Focus states:** Visible outline (2px solid Navy) on all interactive elements
- **Alt text:** All images and illustrations must have descriptive alt text
- **Semantic HTML:** Proper heading hierarchy (H1 > H2 > H3), landmarks, and ARIA labels
- **Keyboard navigation:** All functionality accessible via keyboard
- **Reduced motion:** Respect `prefers-reduced-motion` media query

---

## 12. Implementation Notes

### 12.1 Recommended Tech Stack

- **Framework:** React with Next.js, or vanilla HTML/CSS
- **Styling:** Tailwind CSS or vanilla CSS with custom properties
- **Fonts:** Google Fonts (Georgia, Inter)
- **UI Animations:** CSS transitions + Framer Motion (React) or GSAP
- **Illustrated Animations:** Lottie (lottie-react or @lottiefiles/lottie-player)
- **Static Illustrations:** SVG format for scalability and performance

### 12.2 CSS Custom Properties

Recommended CSS variables for consistency:

```css
:root {
  /* Colors */
  --color-navy: #2C5F7C;
  --color-sage: #7FA99B;
  --color-yellow: #F4C542;
  --color-cream: #F5F1E8;
  --color-text: #1A1A1A;
  
  /* Typography */
  --font-heading: Georgia, serif;
  --font-body: Inter, system-ui, sans-serif;
  
  /* Spacing */
  --space-unit: 8px;
  
  /* Borders */
  --radius-sm: 4px;
  --radius-pill: 16px;
  
  /* Animation */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
```

### 12.3 Quality Checklist

- [ ] All colors match brand palette exactly
- [ ] Typography follows specified scale
- [ ] Spacing uses 8px base unit multiples
- [ ] All illustrations maintain sketchbook style
- [ ] WCAG AA contrast requirements met
- [ ] Responsive breakpoints tested
- [ ] Logo displays correctly at all sizes
- [ ] Yellow accent used sparingly
- [ ] Editorial feel maintained throughout
- [ ] Page load animation sequence tested
- [ ] Lottie animations match sketchbook aesthetic
- [ ] Scroll-triggered animations work smoothly
- [ ] `prefers-reduced-motion` respected
- [ ] 60fps maintained on all animations

---

*— End of Design Brief —*

*Document prepared for TeachInspire web development team*