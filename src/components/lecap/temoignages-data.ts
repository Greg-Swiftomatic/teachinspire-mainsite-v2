import type { Testimonial, TestimonialFigure } from './Testimonials';

// The testimonials shown on the home page, in order: the first one is the large one.
// Add an entry only when the person has agreed in writing to the final text and signature;
// copy the words exactly. While this list is empty the section does not appear on the site.
// Cards 1 to 4: agreed by e-mail on 11 November 2026.
const PUBLIES: Testimonial[] = [
  {
    id: 1,
    citation:
      'Maintenant, je crée des séances très personnalisées pour mes apprenants avec de vraies situations concrètes de travail. Grâce à l’IA, je génère des audios qui ressemblent à des audios authentiques et je crée des activités en lien avec ces audios.',
    fort: 'de vraies situations concrètes de travail.',
    ton: 'forest',
    lang: 'fr',
    nom: 'Marion',
    role: 'Formatrice · LM ENGLISH · Fillé-sur-Sarthe',
  },
  {
    id: 2,
    citation:
      'Maintenant je ne propose que des cours liés directement au secteur d’activité de l’apprenant afin qu’il puisse réutiliser dans des situations réelles ce qu’il a appris en cours.',
    fort: 'liés directement au secteur d’activité de l’apprenant',
    ton: 'mint',
    lang: 'fr',
    temps: {
      label: 'Préparer un cours',
      motAvant: 'avant',
      avant: '2 à 3 h',
      motApres: 'aujourd’hui',
      apres: '30 min à 1 h',
    },
    nom: 'Myriam',
    role: '',
  },
  {
    id: 3,
    citation:
      'Ton Studio Audio fait gagner un temps fou. Avant de l’utiliser, je passais des heures à faire des montages audios.',
    fort: 'un temps fou.',
    ton: 'yellow',
    lang: 'fr',
    nom: 'Sébastien Scotto',
    role: 'Professeur d’anglais et ancien responsable des langues (+30 ans d’expérience)',
  },
  {
    id: 4,
    citation:
      'Cette approche des IA, les exemples d’utilisation divers et variés […] ont désinhibé mon usage […] je n’ai plus « peur » de demander des trucs aux IA.',
    fort: 'je n’ai plus « peur »',
    ton: 'sand',
    lang: 'fr',
    nom: 'Valery',
    role: 'Directrice de Kintail',
  },
];
const CHIFFRES_PUBLIES: TestimonialFigure[] = [];

// Cards still waiting for that agreement live in temoignages.local.json, which git ignores.
// They are read on the local development server only, so Greg can see the section with the
// real words; a built site never contains them.
type Local = { temoignages: Testimonial[]; chiffres: TestimonialFigure[] };
const brouillon: Local | undefined = import.meta.env.DEV
  ? Object.values(import.meta.glob<Local>('./temoignages.local.json', { eager: true, import: 'default' }))[0]
  : undefined;

export const TEMOIGNAGES: Testimonial[] = brouillon?.temoignages ?? PUBLIES;
export const CHIFFRES_TEMOIGNAGES: TestimonialFigure[] = brouillon?.chiffres ?? CHIFFRES_PUBLIES;
export const TEMOIGNAGES_EN_ATTENTE = Boolean(brouillon);

// One well-chosen card on each of the other pages, by card number. Like everything here,
// a card only appears once it is in the list above.
export const CARTE_PAR_PAGE: Record<string, number> = {
  '/studio': 3, // the Studio page: a trainer on what the audio tool saves him
  '/a-propos': 6, // about Greg: "a tool thought out by a trainer for trainers"
  '/contact': 7, // before booking: "it is worth it"
  '/cours-de-a-a-z': 5, // the demonstration course: what a learner said of the handouts
};
