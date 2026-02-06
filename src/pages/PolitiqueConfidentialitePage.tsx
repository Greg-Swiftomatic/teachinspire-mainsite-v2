import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { GridOverlay } from '../components/ui/GridOverlay';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function PolitiqueConfidentialitePage() {
  return (
    <section className="bg-cream min-h-screen relative overflow-hidden">
      <GridOverlay />

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="mb-8">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                Confidentialité
              </span>
              <div className="h-px bg-navy/10 mt-4" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-navy mb-12 leading-[1.1] tracking-tight">
              Politique de confidentialité
            </h1>

            <div className="space-y-12 text-navy/80 leading-relaxed">
              {/* 1. Responsable du traitement */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  1. Responsable du traitement
                </h2>
                <p>
                  Le responsable du traitement des données personnelles collectées
                  sur ce site est :
                </p>
                <ul className="mt-3 space-y-1">
                  <li>Gregory [NOM] — Auto-entrepreneur</li>
                  <li>SIRET : [À COMPLÉTER]</li>
                  <li>Siège social : [À COMPLÉTER]</li>
                  <li>
                    Email :{' '}
                    <a
                      href="mailto:greg@teachinspire.me"
                      className="text-rust hover:underline"
                    >
                      greg@teachinspire.me
                    </a>
                  </li>
                </ul>
              </div>

              {/* 2. Données collectées */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  2. Données collectées
                </h2>
                <p>Dans le cadre de l'utilisation de ce site, les données suivantes peuvent être collectées :</p>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>
                    <strong>Adresse email</strong> — lorsque vous prenez rendez-vous via Cal.com
                  </li>
                  <li>
                    <strong>Adresse IP</strong> — via les journaux serveur (logs) de l'hébergeur
                  </li>
                </ul>
              </div>

              {/* 3. Finalités */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  3. Finalités du traitement
                </h2>
                <p>Les données collectées sont utilisées pour :</p>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>Planifier et gérer les rendez-vous de découverte</li>
                  <li>Répondre à vos demandes de renseignements</li>
                  <li>Assurer la sécurité et le bon fonctionnement du site</li>
                </ul>
              </div>

              {/* 4. Base légale */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  4. Base légale
                </h2>
                <p>Le traitement de vos données repose sur :</p>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>
                    <strong>Votre consentement</strong> (Article 6.1.a du RGPD) — lorsque
                    vous prenez rendez-vous ou nous contactez
                  </li>
                  <li>
                    <strong>L'intérêt légitime</strong> (Article 6.1.f du RGPD) — pour
                    la sécurité du site et l'analyse des journaux serveur
                  </li>
                </ul>
              </div>

              {/* 5. Sous-traitants */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  5. Sous-traitants
                </h2>
                <p>
                  Vos données peuvent être traitées par les sous-traitants suivants :
                </p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <strong>Cal.com</strong> — Gestion des rendez-vous en ligne
                  </li>
                  <li>
                    <strong>Cloudflare, Inc.</strong> — Hébergement du site et réseau de
                    diffusion de contenu (CDN)
                  </li>
                  <li>
                    <strong>Google Fonts</strong> — Chargement des polices de caractères
                    (Fraunces, DM Sans)
                  </li>
                </ul>
              </div>

              {/* 6. Transferts hors UE */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  6. Transferts de données hors de l'Union européenne
                </h2>
                <p>
                  Certains de nos sous-traitants (Cal.com, Cloudflare, Google) sont
                  basés aux États-Unis. Ces transferts sont encadrés par des clauses
                  contractuelles types (CCT) approuvées par la Commission européenne,
                  conformément à l'article 46 du RGPD.
                </p>
              </div>

              {/* 7. Durée de conservation */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  7. Durée de conservation
                </h2>
                <ul className="space-y-1 list-disc list-inside">
                  <li>
                    <strong>Données de contact</strong> — 3 ans à compter du dernier
                    échange
                  </li>
                  <li>
                    <strong>Journaux serveur (logs)</strong> — 12 mois
                  </li>
                </ul>
              </div>

              {/* 8. Vos droits */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  8. Vos droits
                </h2>
                <p>
                  Conformément aux articles 15 à 21 du RGPD, vous disposez des droits
                  suivants :
                </p>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                </ul>
                <p className="mt-3">
                  Pour exercer ces droits, contactez-nous à{' '}
                  <a
                    href="mailto:greg@teachinspire.me"
                    className="text-rust hover:underline"
                  >
                    greg@teachinspire.me
                  </a>
                  . Nous nous engageons à répondre dans un délai de 30 jours.
                </p>
              </div>

              {/* 9. Cookies */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  9. Cookies
                </h2>
                <p>
                  Ce site n'utilise pas de cookies à des fins de suivi ou d'analyse.
                  Le service Google Fonts, utilisé pour le chargement des polices,
                  peut déposer des cookies techniques strictement nécessaires à son
                  fonctionnement.
                </p>
              </div>

              {/* 10. CNIL */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  10. Réclamation auprès de la CNIL
                </h2>
                <p>
                  Si vous estimez que le traitement de vos données ne respecte pas la
                  réglementation en vigueur, vous pouvez introduire une réclamation
                  auprès de la Commission Nationale de l'Informatique et des Libertés
                  (CNIL) :{' '}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rust hover:underline"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </div>

              {/* 11. Mise à jour */}
              <div>
                <h2 className="text-xl font-display font-semibold text-navy mb-4">
                  11. Mise à jour de cette politique
                </h2>
                <p>
                  Cette politique de confidentialité peut être modifiée à tout moment.
                  La date de dernière mise à jour est indiquée ci-dessous. Nous vous
                  invitons à la consulter régulièrement.
                </p>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-16 pt-8 border-t border-navy/10">
              <p className="text-navy/40 text-sm">
                Dernière mise à jour : février 2025
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
