import { PageMeta } from '../components/seo/PageMeta';
import { EDITEUR, Editeur, LegalPage } from '../components/lecap/legal';

export function MentionsLegalesPage() {
  return (
    <>
      <PageMeta
        title="Mentions légales | TeachInspire"
        description="Mentions légales de TeachInspire : éditeur, hébergeur et propriété intellectuelle."
        path="/mentions-legales"
        noindex
      />
      <LegalPage kicker="Informations légales" titre="Mentions légales">
        <section>
          <h2>Éditeur du site</h2>
          <p>Le site <strong>teachinspire.me</strong> est édité par :</p>
          <Editeur />
        </section>

        <section>
          <h2>Directeur de la publication</h2>
          <p>{EDITEUR.nom}</p>
        </section>

        <section>
          <h2>Hébergeur</h2>
          <ul>
            <li>Cloudflare, Inc.</li>
            <li>101 Townsend Street, San Francisco, CA 94107, USA</li>
            <li>Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">cloudflare.com</a></li>
          </ul>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu de ce site (textes, images, logos, mise en page) est la propriété
            exclusive de TeachInspire, sauf mention contraire. Toute reproduction, représentation,
            modification ou adaptation, totale ou partielle, est interdite sans autorisation écrite
            préalable.
          </p>
        </section>

        <section>
          <h2>Crédits</h2>
          <ul>
            <li>Polices : Bricolage Grotesque et Onest, hébergées avec le site</li>
            <li>Icônes : Lucide</li>
          </ul>
        </section>
      </LegalPage>
    </>
  );
}
