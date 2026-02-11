import { GeometricAccent, type GeometricAccentProps } from './GeometricAccent';

type SectionPreset =
  | 'hero'
  | 'problem'
  | 'possibility'
  | 'approach'
  | 'modules'
  | 'results'
  | 'philosophy'
  | 'founder'
  | 'final-cta'
  // Formation page
  | 'formation-hero'
  | 'formation-modules'
  | 'formation-approach'
  | 'formation-cta'
  // About page
  | 'about-hero'
  | 'about-declic'
  | 'about-timeline'
  | 'about-cta'
  // Contact page
  | 'contact-hero';

const NAVY = '#2c3d57';
const SAGE = '#85a2a3';
const YELLOW = '#f1d263';
const RUST = '#B7553D';
const CREAM = '#f8f7f2';

type PresetConfig = Omit<GeometricAccentProps, 'className'>[];

const presets: Record<SectionPreset, PresetConfig> = {
  // Homepage sections
  hero: [
    {
      shape: 'circle',
      size: 160,
      color: SAGE,
      opacity: 0.07,
      position: { top: '10%', right: '5%' },
      animation: { type: 'parallax', speed: 40 },
    },
    {
      shape: 'line',
      size: 200,
      color: NAVY,
      opacity: 0.05,
      position: { bottom: '15%', left: '3%' },
      animation: { type: 'rotate', speed: 20, range: 15 },
      strokeWidth: 1,
    },
    {
      shape: 'dot-grid',
      size: 100,
      color: SAGE,
      opacity: 0.06,
      position: { top: '40%', right: '12%' },
      animation: { type: 'parallax', speed: 20 },
    },
  ],

  problem: [
    {
      shape: 'rectangle',
      size: 140,
      color: RUST,
      opacity: 0.06,
      position: { top: '8%', left: '2%' },
      animation: { type: 'parallax', speed: 25 },
    },
    {
      shape: 'arc',
      size: 180,
      color: SAGE,
      opacity: 0.05,
      position: { bottom: '10%', right: '4%' },
      animation: { type: 'parallax', speed: 35 },
    },
  ],

  possibility: [
    {
      shape: 'cross',
      size: 80,
      color: NAVY,
      opacity: 0.06,
      position: { top: '12%', left: '6%' },
      animation: { type: 'rotate', speed: 15, range: 90 },
    },
    {
      shape: 'circle',
      size: 100,
      color: YELLOW,
      opacity: 0.07,
      position: { bottom: '15%', right: '8%' },
      animation: { type: 'parallax', speed: 30 },
    },
  ],

  approach: [
    {
      shape: 'line',
      size: 220,
      color: SAGE,
      opacity: 0.05,
      position: { top: '5%', right: '3%' },
      animation: { type: 'rotate', speed: 10, range: 20 },
      strokeWidth: 1,
    },
    {
      shape: 'dot-grid',
      size: 80,
      color: NAVY,
      opacity: 0.04,
      position: { bottom: '20%', left: '5%' },
      animation: { type: 'ambient', speed: 15 },
    },
  ],

  modules: [
    {
      shape: 'rectangle',
      size: 120,
      color: NAVY,
      opacity: 0.05,
      position: { top: '5%', left: '2%' },
      animation: { type: 'parallax', speed: 20 },
    },
    {
      shape: 'line',
      size: 160,
      color: SAGE,
      opacity: 0.04,
      position: { bottom: '8%', right: '5%' },
      animation: { type: 'rotate', speed: 10, range: 10 },
      strokeWidth: 1,
    },
  ],

  results: [
    {
      shape: 'circle',
      size: 130,
      color: YELLOW,
      opacity: 0.06,
      position: { top: '15%', right: '6%' },
      animation: { type: 'parallax', speed: 35 },
    },
    {
      shape: 'arc',
      size: 150,
      color: SAGE,
      opacity: 0.05,
      position: { bottom: '10%', left: '4%' },
      animation: { type: 'parallax', speed: 25 },
    },
  ],

  philosophy: [
    {
      shape: 'circle',
      size: 140,
      color: CREAM,
      opacity: 0.04,
      position: { top: '20%', left: '5%' },
      animation: { type: 'parallax', speed: 30 },
    },
    {
      shape: 'line',
      size: 180,
      color: YELLOW,
      opacity: 0.04,
      position: { bottom: '15%', right: '6%' },
      animation: { type: 'rotate', speed: 10, range: 15 },
      strokeWidth: 1,
    },
  ],

  founder: [
    {
      shape: 'dot-grid',
      size: 120,
      color: SAGE,
      opacity: 0.05,
      position: { top: '10%', left: '8%' },
      animation: { type: 'parallax', speed: 20 },
    },
    {
      shape: 'rectangle',
      size: 100,
      color: NAVY,
      opacity: 0.04,
      position: { bottom: '12%', right: '5%' },
      animation: { type: 'parallax', speed: 30 },
    },
  ],

  'final-cta': [
    {
      shape: 'dot-grid',
      size: 100,
      color: CREAM,
      opacity: 0.04,
      position: { top: '10%', left: '8%' },
      animation: { type: 'ambient', speed: 10 },
    },
    {
      shape: 'cross',
      size: 60,
      color: CREAM,
      opacity: 0.04,
      position: { top: '15%', right: '10%' },
      animation: { type: 'rotate', speed: 10, range: 45 },
    },
    {
      shape: 'cross',
      size: 50,
      color: CREAM,
      opacity: 0.03,
      position: { bottom: '15%', left: '12%' },
      animation: { type: 'rotate', speed: 8, range: -30 },
    },
  ],

  // Formation page
  'formation-hero': [
    {
      shape: 'circle',
      size: 140,
      color: SAGE,
      opacity: 0.06,
      position: { top: '15%', right: '6%' },
      animation: { type: 'parallax', speed: 30 },
    },
    {
      shape: 'line',
      size: 180,
      color: NAVY,
      opacity: 0.04,
      position: { bottom: '20%', left: '3%' },
      animation: { type: 'rotate', speed: 10, range: 10 },
      strokeWidth: 1,
    },
  ],

  'formation-modules': [
    {
      shape: 'rectangle',
      size: 110,
      color: NAVY,
      opacity: 0.04,
      position: { top: '5%', right: '4%' },
      animation: { type: 'parallax', speed: 20 },
    },
  ],

  'formation-approach': [
    {
      shape: 'cross',
      size: 70,
      color: SAGE,
      opacity: 0.05,
      position: { top: '10%', left: '5%' },
      animation: { type: 'rotate', speed: 10, range: 60 },
    },
  ],

  'formation-cta': [
    {
      shape: 'dot-grid',
      size: 80,
      color: CREAM,
      opacity: 0.04,
      position: { top: '15%', right: '8%' },
      animation: { type: 'ambient', speed: 10 },
    },
    {
      shape: 'cross',
      size: 50,
      color: CREAM,
      opacity: 0.03,
      position: { bottom: '20%', left: '10%' },
      animation: { type: 'rotate', speed: 8, range: 45 },
    },
  ],

  // About page
  'about-hero': [
    {
      shape: 'circle',
      size: 130,
      color: SAGE,
      opacity: 0.06,
      position: { top: '15%', right: '8%' },
      animation: { type: 'parallax', speed: 25 },
    },
  ],

  'about-declic': [
    {
      shape: 'arc',
      size: 160,
      color: YELLOW,
      opacity: 0.05,
      position: { top: '10%', right: '5%' },
      animation: { type: 'parallax', speed: 30 },
    },
  ],

  'about-timeline': [
    {
      shape: 'dot-grid',
      size: 100,
      color: NAVY,
      opacity: 0.04,
      position: { top: '5%', left: '3%' },
      animation: { type: 'parallax', speed: 15 },
    },
    {
      shape: 'line',
      size: 160,
      color: SAGE,
      opacity: 0.04,
      position: { bottom: '10%', right: '5%' },
      animation: { type: 'rotate', speed: 8, range: 12 },
      strokeWidth: 1,
    },
  ],

  'about-cta': [
    {
      shape: 'cross',
      size: 60,
      color: CREAM,
      opacity: 0.04,
      position: { top: '20%', right: '10%' },
      animation: { type: 'rotate', speed: 8, range: 45 },
    },
  ],

  // Contact page
  'contact-hero': [
    {
      shape: 'circle',
      size: 120,
      color: SAGE,
      opacity: 0.05,
      position: { top: '20%', right: '8%' },
      animation: { type: 'parallax', speed: 25 },
    },
    {
      shape: 'line',
      size: 160,
      color: NAVY,
      opacity: 0.04,
      position: { bottom: '25%', left: '5%' },
      animation: { type: 'rotate', speed: 8, range: 10 },
      strokeWidth: 1,
    },
  ],
};

interface GeometricAccentGroupProps {
  preset: SectionPreset;
}

export function GeometricAccentGroup({ preset }: GeometricAccentGroupProps) {
  const configs = presets[preset];
  if (!configs) return null;

  return (
    <>
      {configs.map((config, i) => (
        <GeometricAccent key={`${preset}-${i}`} {...config} />
      ))}
    </>
  );
}
