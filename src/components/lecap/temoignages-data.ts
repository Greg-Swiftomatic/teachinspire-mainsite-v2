import type { Testimonial, TestimonialFigure } from './Testimonials';

// The testimonials shown on the home page, in order: the first one is the large one.
// Empty on purpose. Add an entry only when the person has agreed in writing to the final
// text and signature; copy the words exactly. While this list is empty the section does
// not appear on the site.
const PUBLIES: Testimonial[] = [];
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
