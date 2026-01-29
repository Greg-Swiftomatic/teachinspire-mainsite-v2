
Project OverviewName: TeachInspire
Type: Marketing landing page + Formation website
Language: French (primary), English (technical terms)
Domain: AI training for language teachersCore Message: "L'IA comme assistant, pas comme remplaçant"Target Audience:

Language teachers (FLE, English, Spanish)
Language training institutes
Independent trainers
Tech StackLayerTechnologyFrameworkReact 18+ with TypeScriptBuildViteStylingTailwind CSS 3.xAnimationsFramer MotionIconsLucide ReactFontsGoogle Fonts (Fraunces, DM Sans, Caveat)Quick Startbash# Create project
npm create vite@latest teachinspire -- --template react-ts
cd teachinspire

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install framer-motion lucide-react

# Init Tailwind
npx tailwindcss init -p

# Run dev server
npm run devDesign SystemColorsjavascript// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: '#2c3d57',
        cream: '#f8f7f2',
        sage: '#85a2a3',
        yellow: '#f1d263',
        'navy-light': '#4a5568',
        'sage-light': '#a8c5c6',
      }
    }
  }
}ColorHexUsageNavy#2c3d57Text, headings, dark backgroundsCream#f8f7f2Page backgroundSage#85a2a3Secondary accent, illustrationsYellow#f1d263Primary CTA, highlightsTypographycss/* src/styles/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap');RoleFontTailwind ClassDisplay/H1Frauncesfont-displayBody/UIDM Sansfont-sansHandwritten accentsCaveatfont-handwrittenjavascript// tailwind.config.js
fontFamily: {
  display: ['Fraunces', 'serif'],
  sans: ['DM Sans', 'sans-serif'],
  handwritten: ['Caveat', 'cursive'],
}Typography ScaleElementSizeWeightClassH1 (Hero)3.5rem / 56px700text-5xl font-bold font-displayH2 (Section)2.25rem / 36px700text-4xl font-bold font-displayH3 (Card)1.5rem / 24px600text-2xl font-semiboldBody1.125rem / 18px400text-lgSmall0.875rem / 14px400text-smSpacingBase unit: 8px. Use Tailwind spacing scale (4 = 16px, 8 = 32px, etc.)TokenValueUsagep-416pxComponent paddingp-832pxCard paddingpy-1664pxSection vertical paddingpy-2496pxLarge section paddinggap-624pxGrid gapsBorder Radius
Buttons: rounded-lg (8px)
Cards: rounded-xl (12px)
Badges: rounded-full
Project Structureteachinspire/
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
    ├── App.tsx
    │
    ├── assets/
    │   ├── illustrations/         ← SVGs (when ready)
    │   │   └── .gitkeep
    │   ├── images/
    │   │   └── .gitkeep
    │   └── assets.ts              ← URLs & placeholders
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Container.tsx
    │   │
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Problem.tsx
    │   │   ├── Approach.tsx
    │   │   ├── Offerings.tsx
    │   │   ├── Modules.tsx
    │   │   ├── Results.tsx
    │   │   ├── Testimonials.tsx
    │   │   ├── Philosophy.tsx
    │   │   ├── Founder.tsx
    │   │   └── FinalCTA.tsx
    │   │
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Badge.tsx
    │       ├── SectionTitle.tsx
    │       └── AnimatedSection.tsx
    │
    ├── pages/
    │   ├── Home.tsx
    │   ├── Formation.tsx
    │   ├── About.tsx
    │   └── Contact.tsx
    │
    ├── hooks/
    │   └── useScrollReveal.ts
    │
    ├── utils/
    │   └── constants.ts
    │
    └── styles/
        └── globals.cssAssets Configurationsrc/assets/assets.tstypescript// ===== CLOUDINARY =====
export const CLOUDINARY_BASE = "https://res.cloudinary.com/ducvoebot";

// Logo (already hosted)
export const LOGO = `${CLOUDINARY_BASE}/image/upload/v1747991665/Teachinspire_logo_transparent_yjt3uf.png`;

// Hero video (upload to Cloudinary when ready)
export const HERO_VIDEO = ""; // TODO: Add Cloudinary URL
export const HERO_VIDEO_POSTER = "https://placehold.co/600x400/f1d263/2c3d57?text=Hero+Video";

// ===== PLACEHOLDERS (replace with real URLs as illustrations are created) =====
export const ILLUSTRATIONS = {
  // Homepage
  heroPuzzle: "https://placehold.co/500x500/f1d263/2c3d57?text=Hero+Puzzle",
  iconFormation: "https://placehold.co/128x128/85a2a3/ffffff?text=Formation",
  iconPlatform: "https://placehold.co/128x128/85a2a3/ffffff?text=Platform",
  beforeAfter: "https://placehold.co/400x200/f1d263/2c3d57?text=Before+After",
  
  // Formation page
  module1Toolbox: "https://placehold.co/200x200/f1d263/2c3d57?text=Module+1",
  module2Prompt: "https://placehold.co/200x200/85a2a3/ffffff?text=Module+2",
  module3Workflow: "https://placehold.co/200x200/f1d263/2c3d57?text=Module+3",
  resultsThreeWins: "https://placehold.co/500x200/85a2a3/ffffff?text=Results",
  
  // About page
  portraitGregory: "https://placehold.co/300x400/85a2a3/ffffff?text=Gregory",
  timelineMilestones: "https://placehold.co/700x180/f1d263/2c3d57?text=Timeline",
  
  // Contact page
  contactConnection: "https://placehold.co/350x350/85a2a3/ffffff?text=Contact",
  
  // Decorative (sets)
  arrowsSet: "https://placehold.co/300x100/f1d263/2c3d57?text=Arrows",
  doodlesSet: "https://placehold.co/300x200/85a2a3/ffffff?text=Doodles",
  underlinesSet: "https://placehold.co/300x80/f1d263/2c3d57?text=Underlines",
} as const;

// Type helper
export type IllustrationKey = keyof typeof ILLUSTRATIONS;Site ArchitecturePagesRoutePagePurpose/HomeMain landing page/formationFormationDetailed program, modules, pricing/a-proposAboutBio, timeline, philosophy/contactContactForm + Calendly embedHomepage Sections (in order)
Hero — Value proposition + CTA + illustration/video
Problem — Pain points (3h prep time, generic content)
Approach — Solution preview (AI as assistant)
Offerings — Two cards (Formation / Plateforme)
Modules — 3 modules overview
Results — Concrete benefits (time, quality, balance)
Testimonials — Social proof
Philosophy — "L'IA comme assistant, pas comme remplaçant"
Founder — Brief intro to Gregory
FinalCTA — Closing call-to-action
Component PatternsButton Componenttsx// src/components/ui/Button.tsx
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200";
  
  const variants = {
    primary: "bg-yellow text-navy hover:bg-yellow/90 hover:-translate-y-0.5 shadow-lg hover:shadow-xl",
    secondary: "bg-transparent border-2 border-navy text-navy hover:bg-navy hover:text-cream",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <a href={href} className={styles}>{children}</a>;
  }

  return <button onClick={onClick} className={styles}>{children}</button>;
}Container Componenttsx// src/components/layout/Container.tsx
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}Section Title Componenttsx// src/components/ui/SectionTitle.tsx
import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({ children, subtitle, centered = true, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-4xl font-bold font-display text-navy mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-navy-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}Animated Section (Framer Motion)tsx// src/components/ui/AnimatedSection.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}Animation GuidelinesFramer Motion Variantstypescript// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Stagger children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};TimingAnimation TypeDurationMicro (hover)150-200msSection reveal500-600msPage transition400msRules
Use transform and opacity only (GPU accelerated)
Trigger on scroll when 20% visible
Play once (viewport: { once: true })
Respect prefers-reduced-motion
Content GuidelinesTone
Direct — No fluff, get to the point
Warm — Friendly but professional
Expert — Confident without being arrogant
Honest — Acknowledge AI limitations
Forbidden Words/Phrases❌ Never use:

"Révolutionnez", "Transformez", "Boostez"
"Magie", "Super-pouvoirs", "Miraculeux"
"Libérez le potentiel", "Passez au niveau supérieur"
Generic tech buzzwords
✅ Prefer:

Concrete metrics: "3h → 30min"
"L'IA vous assiste", not "L'IA remplace"
"Comprendre les fondamentaux"
Specific, measurable outcomes
Key CopyTagline:

"L'IA comme assistant, pas comme remplaçant"
Value Proposition:

"Créez des cours sur-mesure en temps record. Sans sacrifier votre pédagogie."
Philosophy Statement:

"Votre expertise pédagogique reste irremplaçable. L'IA vient simplement démultiplier votre impact."
Illustration StyleStyle: Clean Doodle — Bold black outlines + Flat solid fills
Reference: Notion, Linear, Figma style illustrations
Colors: Yellow #f1d263 + Sage #85a2a3 + Black + White
Characters: Faceless when present (hair yes, facial features no)Priority IllustrationsPriorityIllustrationUsage🔴 Highhero-puzzle-lightbulbHero section🔴 Highicon-formationOfferings card🔴 Highicon-platformOfferings card🟡 Mediummodule-1-toolboxFormation page🟡 Mediummodule-2-promptFormation page🟡 Mediummodule-3-workflowFormation page🟡 Mediumportrait-gregoryAbout page🟡 Mediumcontact-connectionContact pageExternal Links
Calendly: https://cal.com/greg-teachinspire/decouverte-teachinspire
Email: greg@teachinspire.me
Community: Skool (link TBD)
Quality ChecklistBefore committing:
 All text is in French (except technical terms)
 No forbidden buzzwords
 Colors match brand palette exactly
 Mobile responsive (test at 375px)
 Animations are subtle, not flashy
 All CTAs have hover states
 Links work correctly
 Images have alt text
 Console has no errors
Git Workflowbash# Feature branch
git checkout -b feat/section-name

# Commit convention
git commit -m "feat: add Hero section"
git commit -m "fix: button hover state"
git commit -m "style: adjust spacing"
git commit -m "refactor: extract Card component"

# Merge to main
git checkout main
git merge feat/section-nameTeachInspire — CLAUDE.md v1.0
Last updated: December 2024