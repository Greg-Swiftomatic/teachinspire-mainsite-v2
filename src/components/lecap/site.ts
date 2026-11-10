// One source for the links, the menu and the figures of the offer
// (decisions of 10 November 2026, docs/decisions-refonte-vitrine.md).
export { BOOKING_URL } from '../../assets/assets';

export const CAMPUS_URL = 'https://campus.teachinspire.me';

export const ROUTES = {
  accueil: '/',
  cours: '/cours-de-a-a-z',
  plateforme: '/studio',
  formation: '/formation',
  apropos: '/a-propos',
  contact: '/contact',
} as const;

export const MENU = [
  { label: 'Accueil', href: ROUTES.accueil },
  { label: 'Un cours, de A à Z', href: ROUTES.cours },
  { label: 'La plateforme', href: ROUTES.plateforme },
  { label: 'Formation', href: ROUTES.formation },
  { label: 'À propos', href: ROUTES.apropos },
] as const;

export const CTA_APPEL = 'Réserver 15 minutes';
export const CTA_COURS = 'Voir un cours, de A à Z';

// Prices, excluding tax.
export const PRIX_EQUIPE = 4200;
export const FORMATEURS_INCLUS = 10;
export const PRIX_FORMATEUR_SUPPLEMENTAIRE = 250;
export const PRIX_INDIVIDUEL = 790;

export function prixEquipe(formateurs: number) {
  return PRIX_EQUIPE + Math.max(0, formateurs - FORMATEURS_INCLUS) * PRIX_FORMATEUR_SUPPLEMENTAIRE;
}

export function euros(montant: number) {
  return `${montant.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`;
}

export const MODULES = [
  {
    nom: 'Clarifier',
    texte: 'Qui est l’apprenant : son métier, son niveau, les situations où la langue compte vraiment.',
    remis: 'une fiche apprenant',
  },
  {
    nom: 'Structurer',
    texte: 'Les objectifs, puis le calendrier de toute la formation, séance par séance.',
    remis: 'un calendrier de formation',
  },
  {
    nom: 'Sélectionner',
    texte: 'Des vidéos et des podcasts authentiques du métier, transcrits, dont on garde ce qui sert.',
    remis: 'des sources choisies et transcrites',
  },
  {
    nom: 'Concevoir',
    texte: 'La tâche finale de la séance, puis les étapes pour y amener l’apprenant.',
    remis: 'le plan de la séance',
  },
  {
    nom: 'Produire',
    texte: 'Le support de l’apprenant, les exercices et le dialogue audio.',
    remis: 'le support, les exercices et l’audio',
  },
  {
    nom: 'Finaliser',
    texte: 'Les corrigés, le guide de l’enseignant, la mise en page et la dernière relecture.',
    remis: 'le cours complet, prêt à enseigner',
  },
] as const;

export const OUTILS = [
  { nom: 'Prompts', texte: 'Une demande claire à donner à l’IA', ton: 'prompts' },
  { nom: 'Transcription', texte: 'De l’audio au texte', ton: 'transcription' },
  { nom: 'Audio', texte: 'Des dialogues réalistes, à deux voix', ton: 'audio' },
  { nom: 'Documents', texte: 'Des supports mis en page, en PDF', ton: 'documents' },
] as const;
