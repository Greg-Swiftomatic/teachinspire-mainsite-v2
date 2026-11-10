// Testimonial cards. Not mounted on any page yet: there is no approved content.
// Mount <Testimonials items={…} /> on the home page once Greg supplies quotes
// with a written authorisation. Never fill it with invented quotes, names or figures.
export type Testimonial = {
  /** The exact words of the person, without quotation marks. */
  citation: string;
  /** Name as the person agreed to see it published. */
  nom: string;
  /** Role and institute, e.g. « Formatrice d’anglais, institut X ». */
  role: string;
};

export function TestimonialCard({ citation, nom, role }: Testimonial) {
  return (
    <figure className="lc-tile lc-tile--sand lc-quote">
      <blockquote>
        <p>«&nbsp;{citation}&nbsp;»</p>
      </blockquote>
      <figcaption>
        <strong>{nom}</strong>
        <span>{role}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className="lc-wrap" aria-labelledby="lc-temoignages-titre">
      <div className="lc-head">
        <h2 className="lc-h2" id="lc-temoignages-titre">Ce qu’en disent les formateurs.</h2>
      </div>
      <div className="lc-quotes">
        {items.map((item) => (
          <TestimonialCard key={`${item.nom}-${item.citation.slice(0, 24)}`} {...item} />
        ))}
      </div>
    </section>
  );
}
