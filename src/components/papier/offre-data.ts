// Source unique des chiffres de l'offre (brief marketing du 25 septembre 2026).
// Les pages Formation et Offre lisent toutes les deux ce fichier.

export const PRIX_BASE = 4200;
export const FORMATEURS_INCLUS = 10;
export const PRIX_SUPPLEMENTAIRE = 250;
export const SEUIL_DEDOUBLEMENT = 20;

export function prixEquipe(formateurs: number) {
  return PRIX_BASE + Math.max(0, formateurs - FORMATEURS_INCLUS) * PRIX_SUPPLEMENTAIRE;
}

export function euros(montant: number) {
  return `${Math.round(montant).toLocaleString('fr-FR')}\u00A0€`;
}

export const chiffres = [
  { valeur: 6, suffixe: '', label: 'modules, du besoin au cours validé' },
  { valeur: 25, suffixe: '', label: 'capsules vidéo, environ 3\u00A0h\u00A040' },
  { valeur: 10, suffixe: '\u00A0h', label: "d'ateliers en direct avec votre équipe" },
  { valeur: 12, suffixe: '\u00A0mois', label: "d'accès au campus" },
];

export const publicCible = [
  { avant: 'Vos formateurs passent ', fort: 'des heures', apres: ' à adapter les ressources à chaque apprenant.' },
  { avant: 'Certains ont testé ChatGPT, ', fort: 'sans méthode', apres: ' et sans résultats réguliers.' },
  { avant: 'Vous voulez ', fort: 'une pratique commune', apres: " pour toute l'équipe, pas des bricolages individuels." },
  { avant: 'Vous voulez que vos formateurs ', fort: 'gardent la main', apres: ' sur la qualité pédagogique.' },
];

export type Module = {
  numero: string;
  nom: string;
  resume: string;
  detail: string[];
  remis: string;
};

export const accueil = {
  nom: 'Avant de commencer',
  detail: [
    "Bienvenue, et la logique du parcours : ce que l'on construit, dans quel ordre.",
    "L'environnement de travail : un compte Gemini gratuit suffit, le Studio est inclus.",
    'Premiers pas guidés, pour que chacun arrive au lancement avec ses outils prêts.',
  ],
};

export const modules: Module[] = [
  {
    numero: '01',
    nom: 'Clarifier le besoin',
    resume: "Comprendre qui est l'apprenant : son métier, son niveau, les situations où la langue compte vraiment.",
    detail: [
      "Prise en main de l'IA par un échange guidé : donner du contexte, poser une question, rebondir.",
      "Clarifier la situation de l'apprenant : son travail, ses interlocuteurs, ses besoins prioritaires.",
    ],
    remis: 'une fiche apprenant.',
  },
  {
    numero: '02',
    nom: 'Planifier la formation',
    resume: 'Fixer les objectifs, puis construire le calendrier complet, séance par séance.',
    detail: [
      "Le prompt structuré : rassembler niveau, besoins, volume horaire et résultat attendu dans une seule demande.",
      'Définir les objectifs et la progression, puis le calendrier de toute la formation.',
    ],
    remis: "un brief d'objectifs et un calendrier de formation.",
  },
  {
    numero: '03',
    nom: 'Choisir les sources',
    resume: "Trouver des vidéos et des podcasts authentiques du métier, les transcrire, garder ce qui sert.",
    detail: [
      'Chercher des témoignages et des situations réelles, pas du matériel conçu pour les cours de langue.',
      'Transcrire les sources retenues et en extraire la matière utile à la séance.',
    ],
    remis: 'une sélection de sources, transcrites et commentées.',
  },
  {
    numero: '04',
    nom: 'Concevoir la séance',
    resume: 'Fixer la tâche finale et les critères de réussite, puis créer le support d’entrée en matière.',
    detail: [
      'Définir le cap de la séance : objectif, tâche finale, trois critères observables.',
      'Trier la matière des sources selon ce que la tâche finale demande.',
      "Créer un article semi-authentique illustré, au niveau de l'apprenant, avec ses consignes.",
    ],
    remis: "une fiche de séance et un support d'introduction.",
  },
  {
    numero: '05',
    nom: 'Produire',
    resume: "Écrire le dialogue, générer l'audio, construire tous les exercices jusqu'à la simulation finale.",
    detail: [
      "Écrire le dialogue qui sert l'objectif, puis le relire à voix haute.",
      "Produire l'audio dans le Studio et le contrôler : débit, prononciation, cohérence.",
      "Construire les activités de compréhension, l'entraînement et la simulation finale.",
    ],
    remis: 'un dialogue audio et tous les exercices de la séance.',
  },
  {
    numero: '06',
    nom: 'Vérifier et finaliser',
    resume: "Relire la séance comme pour l'enseigner, corriger, puis exporter le pack final.",
    detail: [
      'Vérifier que chaque critère est préparé, que les réponses sont dans les supports, que tout tient dans le temps.',
      'Préparer le corrigé et le guide du formateur.',
      'Mettre en forme et exporter le pack apprenant et le pack formateur en PDF.',
    ],
    remis: 'le pack final, prêt à enseigner.',
  },
];

export const livrables = [
  { titre: 'Support apprenant', texte: 'Article illustré, activités, supports de la simulation.' },
  { titre: 'Dialogue audio', texte: 'Le dialogue final, à deux voix, et sa transcription exacte.' },
  { titre: 'Guide enseignant', texte: 'Le déroulé, les corrigés, les rôles et la grille de retour.' },
  { titre: 'Plan de cours', texte: 'Objectif, tâche finale, critères, progression et sources retenues.' },
];

export const inclus = [
  {
    groupe: 'Le parcours',
    lignes: [
      { qte: '25', texte: 'capsules vidéo en 6 modules, environ 3\u00A0h\u00A040 au total, à suivre à son rythme' },
      { qte: '6', texte: "mises en pratique, une par module, sur l'apprenant de chaque formateur" },
      { qte: '✓', texte: 'des guides compagnons avec les demandes utilisées dans les démonstrations' },
    ],
  },
  {
    groupe: 'Le direct',
    lignes: [
      { qte: '1\u00A0h', texte: "de lancement avec toute l'équipe" },
      { qte: '6', texte: 'ateliers de 1\u00A0h\u00A030 sur vos cas réels, vos apprenants, vos documents' },
      { qte: '✓', texte: 'les replays dans la communauté, pour ceux qui manquent un atelier' },
    ],
  },
  {
    groupe: 'La plateforme',
    lignes: [
      { qte: '12\u00A0mois', texte: "d'accès au campus : la formation, la communauté et le Studio sous un seul lien" },
    ],
  },
  {
    groupe: 'Le Studio, pendant 6 mois',
    lignes: [
      { qte: '60\u00A0min', texte: 'de synthèse vocale par mois, pour les dialogues audio' },
      { qte: '10\u00A0h', texte: 'de transcription par mois, pour les vidéos et les podcasts' },
      { qte: '✓', texte: 'Prompts en accès libre, et la mise en forme des documents' },
    ],
  },
];

export const garde = [
  { titre: 'La méthode', texte: "Six étapes à refaire pour chaque nouvel apprenant ou chaque nouveau groupe." },
  { titre: 'La chaîne de prompts', texte: 'Les demandes de chaque étape, réutilisables avec n’importe quelle IA.' },
  { titre: 'Un premier cours complet', texte: 'Construit pendant le parcours sur un vrai apprenant, exporté en PDF.' },
];

export const rythmes = {
  intensif: {
    label: 'Intensif',
    duree: '6 semaines',
    semaines: 6,
    ateliers: [1, 2, 3, 4, 5, 6],
    texte: 'Un module et un atelier par semaine. Pour une équipe disponible, sur une période calme.',
  },
  recommande: {
    label: 'Recommandé',
    duree: '3 mois',
    semaines: 12,
    ateliers: [2, 4, 6, 8, 10, 12],
    texte: 'Un module et un atelier toutes les deux semaines. Le rythme qui laisse le temps de pratiquer avec de vrais apprenants.',
  },
} as const;

export const demarches = [
  { titre: 'Un appel de 15 minutes', texte: "Votre équipe, vos apprenants, vos contraintes de calendrier. Vous repartez avec un avis honnête, même si nous ne travaillons pas ensemble." },
  { titre: 'La proposition', texte: 'Le programme, le rythme choisi, le nombre de formateurs et le devis.' },
  { titre: 'Le financement', texte: "La formation est portée par un organisme partenaire certifié Qualiopi, qui fournit les documents de votre demande de prise en charge OPCO. La demande se dépose avant le début de la formation." },
  { titre: 'Le lancement', texte: "Une heure avec toute l'équipe. L'accès au campus et au Studio s'ouvre pour chaque formateur." },
  { titre: 'Le parcours', texte: 'Les capsules, les six ateliers et les mises en pratique, sur 6 semaines à 3 mois.' },
  { titre: 'La fin du parcours', texte: 'Chaque formateur remet son pack final. Vous recevez les documents de fin de formation pour votre OPCO.' },
];

export const conditions = [
  "Prix par institut : 4\u00A0200\u00A0€\u00A0HT jusqu'à 10 formateurs, puis 250\u00A0€\u00A0HT par formateur supplémentaire.",
  "Au-delà d'une vingtaine de formateurs, les ateliers en direct sont dédoublés, sans surcoût.",
  'Réseaux et équipes de plus de 25 formateurs : planning et devis sur mesure.',
  "Accès au campus pendant 12 mois et au Studio pendant 6 mois, à partir du lancement.",
  "Audio supplémentaire à la demande : 9\u00A0€ les 60 minutes ou 24\u00A0€ les 180 minutes. Les crédits achetés n'expirent pas.",
  'Paiement en 3 fois sans frais possible.',
];

export const questions = [
  {
    q: "Mes formateurs n'ont pas le temps.",
    r: "Les capsules sont courtes (3\u00A0h\u00A040 au total) et se suivent entre les ateliers. Le rythme va de 6 semaines à 3 mois, et les replays rattrapent un atelier manqué. Surtout, chaque mise en pratique porte sur un de leurs vrais apprenants : le temps passé sert directement leurs cours.",
  },
  {
    q: 'On utilise déjà ChatGPT.',
    r: "Tant mieux : la formation n'enseigne pas un outil, elle enseigne une méthode. Les démonstrations se font sur Gemini, mais chaque étape marche avec ChatGPT, Claude ou Mistral. Ce qui change, c'est la qualité de ce que vos formateurs demandent, et ce qu'ils vérifient avant d'utiliser le résultat.",
  },
  {
    q: 'Faut-il payer des abonnements IA ?',
    r: "Non. Un compte Gemini gratuit suffit pour tout le parcours, et le Studio est inclus pendant 6 mois pour l'audio, la transcription et la mise en forme.",
  },
  {
    q: 'Pour quelles langues ?',
    r: "Pour toutes les langues que vos formateurs enseignent : la méthode part du besoin de l'apprenant, pas de la langue. Le parcours est en français ; une version en anglais est en préparation.",
  },
  {
    q: "L'OPCO prend-il tout en charge ?",
    r: "Cela dépend de votre OPCO, de votre branche et de vos fonds disponibles. L'organisme partenaire fournit le programme, le devis et la convention ; nous vous aidons à préparer la demande.",
  },
  {
    q: 'Et pour notre certification Qualiopi ?',
    r: "La formation documente le développement des compétences de vos formateurs et leur veille sur les innovations pédagogiques et numériques : deux points que l'auditeur regarde (indicateurs 22 et 25).",
  },
];
