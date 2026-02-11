// Per-source configuration for the interactive transformation demo.

export type SourceId = 'video' | 'podcast' | 'article' | 'report';

export interface DecompositionElement {
  type: 'rect' | 'line' | 'circle';
  /** SVG attributes for the element's initial (assembled) state */
  attrs: Record<string, number | string>;
  /** Fill or stroke color */
  color: string;
}

export interface SourceConfig {
  id: SourceId;
  label: string;
  sublabel: string;
  /** SVG elements that represent the source visually before decomposition */
  decomposition: {
    elements: DecompositionElement[];
    /** viewBox dimensions for the source SVG group */
    viewBox: { width: number; height: number };
  };
  /** What appears in the output card after transformation */
  output: {
    title: string;
    items: string[];
  };
}

const navy = '#2c3d57';
const sage = '#85a2a3';
const rust = '#B7553D';

export const sourceConfigs: Record<SourceId, SourceConfig> = {
  video: {
    id: 'video',
    label: 'Interview YouTube',
    sublabel: 'sur le secteur de votre apprenant',
    decomposition: {
      viewBox: { width: 120, height: 80 },
      elements: [
        // Filmstrip: 6 frames in 2 rows x 3 cols
        { type: 'rect', attrs: { x: 4, y: 4, width: 34, height: 32, rx: 0 }, color: navy },
        { type: 'rect', attrs: { x: 42, y: 4, width: 34, height: 32, rx: 0 }, color: `${navy}cc` },
        { type: 'rect', attrs: { x: 80, y: 4, width: 34, height: 32, rx: 0 }, color: sage },
        { type: 'rect', attrs: { x: 4, y: 42, width: 34, height: 32, rx: 0 }, color: `${navy}88` },
        { type: 'rect', attrs: { x: 42, y: 42, width: 34, height: 32, rx: 0 }, color: sage },
        { type: 'rect', attrs: { x: 80, y: 42, width: 34, height: 32, rx: 0 }, color: `${rust}88` },
      ],
    },
    output: {
      title: 'Cours \u00e0 partir de la vid\u00e9o',
      items: [
        'Vocabulaire cl\u00e9 extrait',
        'Compr\u00e9hension orale cibl\u00e9e',
        'Exercices adapt\u00e9s au niveau',
      ],
    },
  },
  podcast: {
    id: 'podcast',
    label: 'Podcast',
    sublabel: 'sur sa passion',
    decomposition: {
      viewBox: { width: 120, height: 80 },
      elements: [
        // Waveform: 8 vertical bars of varying heights
        { type: 'rect', attrs: { x: 6, y: 40, width: 8, height: 30 }, color: navy },
        { type: 'rect', attrs: { x: 20, y: 20, width: 8, height: 50 }, color: sage },
        { type: 'rect', attrs: { x: 34, y: 10, width: 8, height: 60 }, color: navy },
        { type: 'rect', attrs: { x: 48, y: 25, width: 8, height: 45 }, color: `${navy}cc` },
        { type: 'rect', attrs: { x: 62, y: 15, width: 8, height: 55 }, color: sage },
        { type: 'rect', attrs: { x: 76, y: 30, width: 8, height: 40 }, color: `${rust}88` },
        { type: 'rect', attrs: { x: 90, y: 22, width: 8, height: 48 }, color: navy },
        { type: 'rect', attrs: { x: 104, y: 35, width: 8, height: 35 }, color: `${navy}88` },
      ],
    },
    output: {
      title: 'S\u00e9quence \u00e0 partir du podcast',
      items: [
        'Transcription structur\u00e9e',
        'Points de langue identifi\u00e9s',
        'Audio de synth\u00e8se pour exercices',
      ],
    },
  },
  article: {
    id: 'article',
    label: 'Article technique',
    sublabel: 'de son domaine',
    decomposition: {
      viewBox: { width: 120, height: 80 },
      elements: [
        // Text lines: 5 horizontal lines of varying width
        { type: 'rect', attrs: { x: 4, y: 8, width: 100, height: 6 }, color: navy },
        { type: 'rect', attrs: { x: 4, y: 22, width: 80, height: 6 }, color: `${navy}cc` },
        { type: 'rect', attrs: { x: 4, y: 36, width: 110, height: 6 }, color: navy },
        { type: 'rect', attrs: { x: 4, y: 50, width: 70, height: 6 }, color: `${navy}88` },
        { type: 'rect', attrs: { x: 4, y: 64, width: 90, height: 6 }, color: sage },
      ],
    },
    output: {
      title: 'Le\u00e7on \u00e0 partir de l\u2019article',
      items: [
        'Termes sp\u00e9cialis\u00e9s extraits',
        'Texte simplifi\u00e9 au niveau cible',
        'QCM et exercices de vocabulaire',
      ],
    },
  },
  report: {
    id: 'report',
    label: 'Rapport annuel',
    sublabel: 'de son entreprise',
    decomposition: {
      viewBox: { width: 120, height: 80 },
      elements: [
        // Bar chart: 5 columns of varying height, aligned to bottom
        { type: 'rect', attrs: { x: 8, y: 40, width: 16, height: 36 }, color: navy },
        { type: 'rect', attrs: { x: 30, y: 14, width: 16, height: 62 }, color: sage },
        { type: 'rect', attrs: { x: 52, y: 28, width: 16, height: 48 }, color: `${navy}cc` },
        { type: 'rect', attrs: { x: 74, y: 8, width: 16, height: 68 }, color: rust },
        { type: 'rect', attrs: { x: 96, y: 34, width: 16, height: 42 }, color: `${navy}88` },
      ],
    },
    output: {
      title: 'Support \u00e0 partir du rapport',
      items: [
        'Donn\u00e9es cl\u00e9s vulgarisées',
        'Vocabulaire financier cibl\u00e9',
        'Mise en situation professionnelle',
      ],
    },
  },
};

export const sourceOrder: SourceId[] = ['video', 'podcast', 'article', 'report'];
