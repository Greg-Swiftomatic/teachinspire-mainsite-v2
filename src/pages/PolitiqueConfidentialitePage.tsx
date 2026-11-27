import { PageMeta } from '../components/seo/PageMeta';
import { EDITEUR, Editeur, LegalPage } from '../components/lecap/legal';

export function PolitiqueConfidentialitePage() {
  const mail = <a href={`mailto:${EDITEUR.email}`}>{EDITEUR.email}</a>;

  return (
    <>
      <PageMeta
        title="Politique de confidentialité | TeachInspire"
        description="Politique de confidentialité de TeachInspire : données collectées, finalités, durée de conservation et vos droits."
        path="/confidentialite"
        noindex
      />
      <LegalPage kicker="Vos données" titre="Politique de confidentialité">
        <section>
          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
          <Editeur />
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>Dans le cadre de l’utilisation de ce site, les données suivantes peuvent être collectées :</p>
          <ul>
            <li><strong>Adresse e-mail</strong> : lorsque vous prenez rendez-vous via Zoom Scheduler</li>
            <li><strong>Adresse IP</strong> : via les journaux serveur (logs) de l’hébergeur</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalités du traitement</h2>
          <p>Les données collectées sont utilisées pour :</p>
          <ul>
            <li>Planifier et gérer les rendez-vous de découverte</li>
            <li>Répondre à vos demandes de renseignements</li>
            <li>Assurer la sécurité et le bon fonctionnement du site</li>
          </ul>
        </section>

        <section>
          <h2>4. Base légale</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li>
              <strong>Votre consentement</strong> (article 6.1.a du RGPD) : lorsque vous prenez
              rendez-vous ou nous contactez
            </li>
            <li>
              <strong>L’intérêt légitime</strong> (article 6.1.f du RGPD) : pour la sécurité du site
              et l’analyse des journaux serveur
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Sous-traitants</h2>
          <p>Vos données peuvent être traitées par les sous-traitants suivants :</p>
          <ul>
            <li><strong>Zoom Video Communications, Inc.</strong> : gestion des rendez-vous en ligne via Zoom Scheduler</li>
            <li><strong>Cloudflare, Inc.</strong> : hébergement du site et réseau de diffusion de contenu (CDN)</li>
          </ul>
          <p>Les polices de caractères sont hébergées avec le site : aucun service tiers n’est appelé pour les afficher.</p>
        </section>

        <section>
          <h2>6. Transferts de données hors de l’Union européenne</h2>
          <p>
            Nos sous-traitants (Zoom, Cloudflare) sont basés aux États-Unis. Ces transferts sont
            encadrés par des clauses contractuelles types (CCT) approuvées par la Commission
            européenne, conformément à l’article 46 du RGPD.
          </p>
        </section>

        <section>
          <h2>7. Durée de conservation</h2>
          <ul>
            <li><strong>Données de contact</strong> : 3 ans à compter du dernier échange</li>
            <li><strong>Journaux serveur (logs)</strong> : 12 mois</li>
          </ul>
        </section>

        <section>
          <h2>8. Vos droits</h2>
          <p>Conformément aux articles 15 à 21 du RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d’accès à vos données personnelles</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d’opposition au traitement</li>
          </ul>
          <p>
            Pour exercer ces droits, écrivez-nous à {mail}. Nous nous engageons à répondre dans un
            délai de 30 jours.
          </p>
        </section>

        <section>
          <h2>9. Cookies</h2>
          <p>Ce site n’utilise pas de cookies à des fins de suivi ou d’analyse.</p>
        </section>

        <section>
          <h2>10. Réclamation auprès de la CNIL</h2>
          <p>
            Si vous estimez que le traitement de vos données ne respecte pas la réglementation en
            vigueur, vous pouvez introduire une réclamation auprès de la Commission nationale de
            l’informatique et des libertés (CNIL) :{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
          </p>
        </section>

        <section>
          <h2>11. Campus et le Studio</h2>
          <p>
            Campus et le Studio sont réservés aux participants de la formation. Pour les faire
            fonctionner, nous traitons votre compte (nom, adresse e-mail, mot de passe, jamais
            stocké en clair), vos travaux et vos échanges dans Campus, et les contenus que vous
            créez dans le Studio : demandes, textes, documents et audios.
          </p>
          <p>
            <strong>Aucune donnée personnelle d’apprenant.</strong> Le Studio sert à préparer des
            cours. Décrivez le poste, le secteur et le niveau de l’apprenant, jamais son nom, ses
            coordonnées ni un document confidentiel de son entreprise. Cette règle est rappelée dans
            le Studio, sous les champs concernés.
          </p>
          <p>Les services d’intelligence artificielle utilisés :</p>
          <ul>
            <li>
              <strong>OpenRouter</strong> (États-Unis) transmet les demandes aux modèles d’IA. Nous
              lui imposons de n’utiliser que des fournisseurs qui ne conservent pas les contenus et
              ne s’en servent pas pour entraîner leurs modèles. Pour les modèles de Google, cela
              passe par Google Vertex : Google peut garder jusqu’à 90 jours une demande signalée
              par ses filtres de sécurité, uniquement pour lutter contre les abus, jamais pour
              l’entraînement. En secours, nous utilisons Mistral AI, entreprise française.
            </li>
            <li><strong>Google (API Gemini)</strong> : voix des dialogues audio.</li>
            <li>
              <strong>Deepgram</strong> et <strong>AssemblyAI</strong> : transcription, sur leurs
              serveurs situés dans l’Union européenne. <strong>Groq</strong> (États-Unis) :
              transcription des audios à une seule voix.
            </li>
          </ul>
          <p>
            Les autres services : Cloudflare (hébergement et stockage), Resend (envoi des e-mails),
            Bunny.net (vidéos des leçons et des replays) et Stripe (paiements en ligne).
          </p>
        </section>

        <section>
          <h2>12. Mise à jour de cette politique</h2>
          <p>
            Cette politique de confidentialité peut être modifiée à tout moment. La date de dernière
            mise à jour est indiquée ci-dessous. Nous vous invitons à la consulter régulièrement.
          </p>
        </section>
      </LegalPage>
    </>
  );
}
