import { useRef } from 'react';
import { Words, order, useMotion } from './motion';
import './pages.css';

// Testimonials. The home page mounts this section with the list in temoignages-data.ts;
// while that list is empty, nothing is rendered. Only real answers go in, once the person
// has agreed in writing to the final text. Never an invented quote, name or figure.
export type Testimonial = {
  /** Number of the card: the places where a card is shown alone name it by this number. */
  id?: number;
  /** The exact words of the person, without quotation marks. */
  citation: string;
  /** Consecutive words of the quote that go under the marker (optional). */
  fort?: string;
  /** Signature, limited to what the person ticked. */
  nom: string;
  /** Role, institute, town: only the parts the person ticked. */
  role: string;
  /** The colour of the card. */
  ton: 'forest' | 'mint' | 'yellow' | 'sand';
  lang?: 'fr' | 'en';
  /** Time to prepare a lesson, before and now, as answered. */
  temps?: { label: string; motAvant: string; avant: string; motApres: string; apres: string };
  /** No name box ticked: the role stands as the signature, with a plain dot. */
  sansNom?: boolean;
};

export type TestimonialFigure = { valeur: string; suffixe?: string; label: string };

/** How many cards the home page shows, the first one being the centrepiece. */
const SUR_L_ACCUEIL = 7;

function Quote({ item, animated }: { item: Testimonial; animated: boolean }) {
  if (!item.citation) {
    return <span className="lc-quote-lines" aria-hidden="true"><i /><i /><i /><i /></span>;
  }
  if (animated) return <p><Words text={item.citation} mark={item.fort} /></p>;
  const at = item.fort ? item.citation.indexOf(item.fort) : -1;
  if (!item.fort || at < 0) return <p>{item.citation}</p>;
  return (
    <p>
      {item.citation.slice(0, at)}
      <mark>{item.fort}</mark>
      {item.citation.slice(at + item.fort.length)}
    </p>
  );
}

export function TestimonialCard({ item, lead = false, index = 0 }: { item: Testimonial; lead?: boolean; index?: number }) {
  const n = item.citation.length;
  const size = n < 60 ? 'xl' : n < 120 ? 'l' : n < 190 ? 'm' : 's';
  const t = item.temps;
  return (
    <figure
      className={`lc-tm lc-tm--${item.ton} lc-tm--${size}${lead ? ' lc-tm--lead' : ''}`}
      lang={item.lang === 'en' ? 'en' : undefined}
      {...(lead ? { 'data-reveal': true } : { 'data-rise': true, style: order(index) })}
    >
      <span className="lc-tm-shape lc-tm-shape--a" aria-hidden="true" />
      <span className="lc-tm-shape lc-tm-shape--b" aria-hidden="true" />
      <span className="lc-tm-sign" aria-hidden="true">«</span>
      <blockquote><Quote item={item} animated={lead} /></blockquote>
      {t ? (
        <p className="lc-tm-times">
          <span className="lc-tm-times-label">{t.label}</span>
          <span className="lc-tm-pill lc-tm-pill--before"><small>{t.motAvant}</small>{t.avant}</span>
          <svg viewBox="0 0 56 24" aria-hidden="true">
            <path d="M2 12h48M40 3l10 9-10 9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="lc-tm-pill lc-tm-pill--after"><small>{t.motApres}</small>{t.apres}</span>
        </p>
      ) : null}
      <figcaption>
        <span className={item.sansNom ? 'lc-tm-badge lc-tm-badge--plain' : 'lc-tm-badge'} aria-hidden="true">
          {item.sansNom ? '' : item.nom.trim().charAt(0)}
        </span>
        <span className="lc-tm-who">
          <strong>{item.nom}</strong>
          {item.role ? <span>{item.role}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}

// The first testimonial is the centrepiece, full width; the others sit in two columns under it.
export function Testimonials({ items, chiffres = [], brouillon = false, sauf = [] }: { items: Testimonial[]; chiffres?: TestimonialFigure[]; brouillon?: boolean; /** Cards already shown alone on the same page. */ sauf?: number[] }) {
  // The site is in French: answers given in English wait for a translation approved by the person.
  const visibles = items.filter((item) => item.lang !== 'en' && !(item.id && sauf.includes(item.id))).slice(0, SUR_L_ACCUEIL);
  if (visibles.length === 0) return null;
  const [premier, ...autres] = visibles;
  return (
    <section className="lc-wrap" id="temoignages" aria-labelledby="lc-temoignages-titre">
      <div className="lc-head" data-reveal>
        {brouillon ? <p className="lc-draft">Aperçu local : textes en attente de l’accord de chaque personne</p> : null}
        <p className="lc-kicker">Ils suivent la formation</p>
        <h2 className="lc-h2 lc-h2--big" id="lc-temoignages-titre">
          <Words text="Ce qu’en disent les formateurs." mark="les formateurs" />
        </h2>
      </div>
      <TestimonialCard item={premier} lead />
      {autres.length ? (
        <div className="lc-tm-grid" data-reveal>
          {autres.map((item, n) => (
            <TestimonialCard key={`${item.nom}-${n}`} item={item} index={n} />
          ))}
        </div>
      ) : null}
      {chiffres.length ? (
        <ul className="lc-quote-figures" data-reveal>
          {chiffres.map((c, n) => (
            <li key={c.label} data-rise style={order(n)}>
              <strong>{c.valeur}{c.suffixe ? <small>{c.suffixe}</small> : null}</strong>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

// One card on its own, placed beside the part of the page it speaks about. Like the section,
// it shows nothing until the card with this number is in the list (that is, approved).
export function TestimonialSpot({ items, id, cote = 'droite' }: { items: Testimonial[]; id: number; cote?: 'gauche' | 'droite' }) {
  const item = items.find((candidate) => candidate.id === id);
  if (!item) return null;
  return (
    <aside className={`lc-wrap lc-tm-spot lc-tm-spot--${cote}`} data-reveal>
      <TestimonialCard item={item} />
    </aside>
  );
}

// The same single card on a page that is not rebuilt in the charter yet: it brings its own
// frame, and sits at the end of the page, just above the closing call.
export function TestimonialBand({ items, id }: { items: Testimonial[]; id: number }) {
  const band = useRef<HTMLDivElement>(null);
  useMotion(band);
  if (!items.some((item) => item.id === id)) return null;
  return (
    <div className="lc lc-band" ref={band}>
      <TestimonialSpot items={items} id={id} />
    </div>
  );
}
