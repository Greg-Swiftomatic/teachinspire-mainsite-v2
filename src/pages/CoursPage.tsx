import { PageMeta } from '../components/seo/PageMeta';
import '../components/lecap/pages.css';

// Holding page: the demonstration course is written in a separate piece of work
// and replaces this component. Kept out of search engines until then.
export function CoursPage() {
  return (
    <>
      <PageMeta
        title="Un cours, de A à Z | TeachInspire"
        description="Un cours complet construit avec la méthode TeachInspire, à ouvrir document par document."
        path="/cours-de-a-a-z"
        noindex
      />
      <div className="lc lc-page">
        <section className="lc-wrap" aria-labelledby="cours-titre">
          <div className="lc-tile lc-tile--sand lc-holding">
            <h1 id="cours-titre">Un cours, de A à Z</h1>
            <p className="lc-lead">Cette page est en préparation. Le cours de démonstration arrive ici.</p>
          </div>
        </section>
      </div>
    </>
  );
}
