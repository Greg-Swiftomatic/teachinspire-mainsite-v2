export { BOOKING_URL as CAL_URL } from '../../assets/assets';

export const audienceItems = [
  {
    before: 'Vos formateurs passent ',
    emphasis: 'des heures',
    after: ' à préparer des cours sur mesure.',
  },
  {
    before: 'Certains ont testé ChatGPT, ',
    emphasis: 'sans méthode',
    after: ' et sans résultats réguliers.',
  },
  {
    before: 'Vous voulez ',
    emphasis: 'une pratique commune',
    after: " pour toute l'équipe, pas des bricolages individuels.",
  },
  {
    before: 'Vous voulez que vos formateurs ',
    emphasis: 'gardent la main',
    after: ' sur la qualité pédagogique.',
  },
];

export const programme = [
  {
    number: '01',
    month: 'Mois 1',
    title: 'Prendre en main les outils',
    text: "Vos formateurs apprennent les trois briques de base : dialoguer avec une IA, transcrire n'importe quel audio ou vidéo, et générer des voix naturelles. L'audio se règle en langage d'enseignant (niveau, rythme, accent), pas en paramètres techniques.",
    outcome:
      "un premier exercice d'écoute créé à partir d'une ressource authentique, avec son script et son audio.",
    image: 'formation-month-1',
    tone: 'sage',
  },
  {
    number: '02',
    month: 'Mois 2',
    title: 'Écrire des consignes qui donnent le bon résultat',
    text: "Vos formateurs apprennent à structurer leurs demandes : objectif, niveau, format, contraintes. Ils relisent le résultat avec un œil de pédagogue, puis le transforment en document prêt à imprimer.",
    outcome:
      "une méthode pour obtenir un résultat exploitable du premier coup, une bibliothèque de prompts qui s'enrichit à chaque cours préparé, et un premier support d'élève au format professionnel.",
    image: 'formation-month-2',
    tone: 'yellow',
  },
  {
    number: '03',
    month: 'Mois 3',
    title: "Construire un cours complet à partir d'une source réelle",
    text: "Vos formateurs partent chacun d'une source réelle : une vidéo, un podcast ou un document métier. Ils définissent la tâche finale, construisent la progression, puis produisent tous les supports : lecture, exercices, guide de l'enseignant, plan de cours.",
    outcome:
      "la capacité de refaire ce parcours en autonomie, sur n'importe quelle source. Le premier pack de cours (lecture, exercices, guide, plan) est construit pendant le module.",
    image: 'formation-month-3',
    tone: 'rust',
  },
] as const;

export const tools = [
  {
    name: 'Prompts.',
    tone: 'sage',
    text: "Décrivez votre besoin, obtenez un prompt structuré. Il se copie dans l'IA de votre choix.",
  },
  {
    name: 'Audio.',
    tone: 'yellow',
    text: "Collez un script, choisissez le niveau, le rythme et l'accent. Des dialogues fiables à deux voix, sans réglages techniques. Les outils professionnels équivalents coûtent au moins 20\u00A0€ par mois pour des crédits limités. Ici, vos formateurs peuvent réessayer jusqu'à obtenir le bon résultat.",
  },
  {
    name: 'Documents.',
    tone: 'rust',
    text: "Collez votre contenu, choisissez le type de support : lecture, exercices, guide de l'enseignant ou plan de cours. Prêt à imprimer.",
  },
] as const;

export const deliveryFormats = [
  {
    title: 'Des tutoriels vidéo à suivre à son rythme.',
    text: '15\u00A0tutoriels courts, organisés en trois modules. Chaque formateur avance entre les sessions, sur son propre temps.',
    tone: 'sage',
  },
  {
    title: 'Des sessions live avec votre équipe.',
    text: '6 à 8\u00A0webinaires de travail. On ne répète pas les vidéos : on applique la méthode sur vos cas réels, vos apprenants, vos documents.',
    tone: 'yellow',
  },
  {
    title: 'Des exercices avec de vrais livrables.',
    text: 'Chaque module se termine par une production concrète : un audio, un support, un cours complet. Pas de quiz, des matériaux utilisables en classe.',
    tone: 'rust',
  },
  {
    title: "Un espace d'équipe.",
    text: 'Replays, partages de créations et questions entre les sessions.',
    tone: 'navy',
  },
] as const;

export const prices = [
  {
    number: '01',
    name: 'Formule Standard',
    audience: '1 à 15\u00A0formateurs',
    price: '4\u00A0200\u00A0€\u00A0HT',
    detail: '280\u00A0€ par formateur',
    text: 'Formation complète, sessions live en groupe unique, Studio inclus, accès communauté 1 an.',
    tone: 'sage',
  },
  {
    number: '02',
    name: 'Formule Étendue',
    audience: '16 à 25\u00A0formateurs',
    price: '4\u00A0200\u00A0€\u00A0HT +',
    detail: '250\u00A0€ par formateur supplémentaire',
    text: 'Sessions live en deux groupes, coordination renforcée.',
    tone: 'yellow',
  },
  {
    number: '03',
    name: 'Formule Sur-Mesure',
    audience: '25\u00A0formateurs et plus',
    price: 'Sur devis',
    detail: '',
    text: "Planning adapté à vos contraintes, formation d'ambassadeurs internes.",
    tone: 'rust',
  },
] as const;
