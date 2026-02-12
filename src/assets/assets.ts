// ===== CLOUDINARY =====
export const CLOUDINARY_BASE = "https://res.cloudinary.com/ducvoebot";

// Logo (already hosted)
export const LOGO = `${CLOUDINARY_BASE}/image/upload/v1747991665/Teachinspire_logo_transparent_yjt3uf.png`;

// Hero video — Cloudinary Video Player embed
const VIDEO_CLOUD = "dsps9ydcp";
const VIDEO_ID = "teachinspire_qloczl";
const VIDEO_COLORS = {
  accent: "f1d263",  // gold
  base: "2c3d57",    // navy
  text: "F4F3F0",    // cream
};

export const HERO_VIDEO_EMBED = [
  `https://player.cloudinary.com/embed/`,
  `?cloud_name=${VIDEO_CLOUD}`,
  `&public_id=${VIDEO_ID}`,
  `&player[colors][accent]=${VIDEO_COLORS.accent}`,
  `&player[colors][base]=${VIDEO_COLORS.base}`,
  `&player[colors][text]=${VIDEO_COLORS.text}`,
  `&player[showLogo]=true`,
  `&player[logoImageUrl]=${encodeURIComponent(LOGO)}`,
  `&player[logoOnclickUrl]=${encodeURIComponent("https://teachinspire.com")}`,
  `&player[fluid]=true`,
  // Hide title/description/subtitle metadata overlays
  `&source[info][title]=`,
  `&source[info][subtitle]=`,
  `&source[info][description]=`,
  `&source[poster][publicId]=${VIDEO_ID}`,
].join("");

export const HERO_VIDEO_POSTER = "/video-thumbnail.png";

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
export type IllustrationKey = keyof typeof ILLUSTRATIONS;
