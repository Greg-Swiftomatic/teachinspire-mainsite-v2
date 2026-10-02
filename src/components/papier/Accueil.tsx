import { useEffect, useRef, useState } from 'react';
import { BOOKING_URL, HERO_VIDEO_EMBED } from '../../assets/assets';
import { AnimationTrait } from './animations/AnimationTrait';
import { SVG as SVG_COURS, PREFIXE as PREFIXE_COURS } from './animations/coursComplet.svg';
import { SVG as SVG_IA, PREFIXE as PREFIXE_IA } from './animations/iaPrepare.svg';
import { sequenceCoursComplet, sequenceIaPrepare } from './animations/sequences';
import { Dossier, type Etape } from './Dossier';
import { epinglerDossier } from './epinglerDossier';
import { livrables } from './offre-data';
import { AppelFinal, Bouton, Illustration, LienSuite, PrixResume, Questions, Sur, Titre } from './Papier';
import { useAncre } from './useAncre';
import { usePapierMotion } from './usePapierMotion';
import './accueil.css';

// Les quatre étapes de la méthode, sur le dossier de Katrin (les six modules sont sur /formation).
const etapes: Etape[] = [
  {
    num: 'Étape 01',
    nom: 'Le besoin',
    texte: "On clarifie qui est l'apprenant : son métier, son niveau, les situations où la langue compte vraiment.",
    doc: 'fiche',
  },
  {
    num: 'Étape 02',
    nom: 'Le calendrier',
    texte: 'On fixe les objectifs, puis on construit toute la formation, séance par séance.',
    doc: 'calendrier',
  },
  {
    num: 'Étape 03',
    nom: 'Le cours',
    texte: "L'IA prépare la séance à partir de sources authentiques : le support, le dialogue audio, les exercices.",
    doc: 'audio',
  },
  {
    num: 'Étape 04',
    nom: 'La validation',
    texte: "Le formateur relit, adapte et valide. C'est lui qui décide de ce qui entre en classe.",
    doc: 'pack',
  },
];

const constats = [
  {
    titre: 'Les manuels',
    texte: "Le Business English couvre l'entreprise en général, pas les situations de votre apprenant : sa réunion de chantier, son audit qualité, son appel fournisseur.",
  },
  {
    titre: 'Les ressources en ligne',
    texte: 'Elles sont nombreuses, mais il faut les trouver, les vérifier et les ramener au bon niveau.',
  },
  {
    titre: 'Le résultat',
    texte: 'Des heures de préparation pour chaque nouvel apprenant, ou un cours générique faute de temps.',
  },
];

const equipe = [
  { valeur: 25, suffixe: '', label: 'capsules vidéo, à suivre entre les ateliers' },
  { valeur: 10, suffixe: ' h', label: 'en direct : un lancement et 6 ateliers' },
  { valeur: 6, suffixe: '', label: "mises en pratique sur leurs vrais apprenants" },
  { valeur: 12, suffixe: ' mois', label: "d'accès au campus et à la communauté" },
];

// La vidéo s'ouvre au clic, jamais en lecture automatique sur la page.
function Video() {
  const [ouverte, setOuverte] = useState(false);
  const dialogue = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dialogue.current;
    if (!d) return;
    if (ouverte && !d.open) d.showModal();
    if (!ouverte && d.open) d.close();
  }, [ouverte]);

  return (
    <>
      <button type="button" className="ac-video" onClick={() => setOuverte(true)} data-monte>
        <span className="ac-video-image">
          <img
            src="/images/papier/02-cours-complet-1400.webp"
            srcSet="/images/papier/02-cours-complet-800.webp 800w, /images/papier/02-cours-complet-1400.webp 1400w"
            sizes="(min-width: 1000px) 50vw, 100vw"
            width={1448}
            height={1086}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </span>
        <span className="ac-video-lire">
          <span className="ac-video-rond" aria-hidden="true">▶</span>
          <span>
            <strong>Regarder la vidéo</strong>
            <small>La méthode en 90 secondes</small>
          </span>
        </span>
      </button>
      <dialog ref={dialogue} className="ac-dialogue" onClose={() => setOuverte(false)} aria-label="Vidéo de présentation">
        <button type="button" className="ac-dialogue-fermer" onClick={() => setOuverte(false)}>
          Fermer
        </button>
        {ouverte ? (
          <iframe
            src={`${HERO_VIDEO_EMBED}&player[autoplay]=true`}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title="TeachInspire : présentation vidéo"
          />
        ) : null}
      </dialog>
    </>
  );
}

export function Accueil() {
  const ref = useRef<HTMLDivElement>(null);
  usePapierMotion(ref, epinglerDossier);
  useAncre();

  return (
    <div className="pe-page ac" ref={ref}>
      <section className="pe-section ac-hero" aria-labelledby="ac-titre">
        <div className="pe-cadre ac-hero-grille">
          <div>
            <p className="pe-sur">Formation IA pour instituts de langues</p>
            <Titre as="h1" id="ac-titre" texte="Vos formateurs créent des cours sur mesure avec l'IA." souligne={['sur', 'mesure']} immediat />
            <p className="pe-intro" data-monte>
              Une méthode en quatre étapes pour adapter chaque formation au métier de chaque
              apprenant. L&apos;IA prépare, le formateur décide.
            </p>
            <div className="pe-actions" data-monte>
              <Bouton href={BOOKING_URL}>Réserver 15 minutes →</Bouton>
              <Bouton href="#methode" variante="trait">Voir la méthode</Bouton>
            </div>
            <p className="ac-reperes" data-monte>
              Formation d&apos;équipe · 4&nbsp;200&nbsp;€&nbsp;HT jusqu&apos;à 10 formateurs · Finançable OPCO
            </p>
          </div>
          <Video />
        </div>
      </section>

      <section className="pe-section pe-calme ac-probleme" aria-labelledby="ac-probleme-titre">
        <div className="pe-cadre ac-probleme-grille">
          <Illustration nom="01-probleme" alt="Un formateur à son bureau tard le soir, entouré de manuels ouverts, la tête dans la main." />
          <div>
            <Sur>Le problème</Sur>
            <Titre id="ac-probleme-titre" texte="Les ressources existent. Ce qui prend des heures, c'est de les adapter à chaque apprenant." />
            <dl className="ac-constats">
              {constats.map((c) => (
                <div key={c.titre} data-monte>
                  <dt>{c.titre}</dt>
                  <dd>{c.texte}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pe-section pe-sombre ac-principe" data-sombre aria-labelledby="ac-principe-titre">
        <div className="pe-cadre ac-principe-grille">
          <div>
            <Sur>Le principe</Sur>
            <Titre id="ac-principe-titre" texte="L'IA prépare. Le formateur décide." jaune="décide" />
            <p className="pe-intro" data-monte>
              L&apos;IA produit un brouillon de séance. Le formateur le relit, garde ce qui convient,
              l&apos;adapte à son apprenant, puis valide la version qu&apos;il utilisera en cours. Le
              jugement pédagogique reste humain.
            </p>
          </div>
          <AnimationTrait svg={SVG_IA} prefixe={PREFIXE_IA} sequence={sequenceIaPrepare} />
        </div>
      </section>

      <section id="methode" className="pe-section ac-methode" aria-labelledby="ac-methode-titre">
        <div className="pe-cadre">
          <Sur>La méthode</Sur>
          <Titre id="ac-methode-titre" texte="Quatre étapes, un apprenant suivi de bout en bout." />
          <p className="pe-intro" data-monte>
            Voici Katrin, coordinatrice logistique de niveau B1+, qui doit gérer les appels des
            transporteurs. Son dossier se construit étape par étape.
          </p>
        </div>
        <Dossier etapes={etapes} />
        <div className="pe-cadre">
          <LienSuite href="/formation#programme">Voir les six modules de la formation</LienSuite>
        </div>
      </section>

      <section className="pe-section pe-calme ac-obtenu" aria-labelledby="ac-obtenu-titre">
        <div className="pe-cadre ac-obtenu-grille">
          <AnimationTrait svg={SVG_COURS} prefixe={PREFIXE_COURS} sequence={sequenceCoursComplet} />
          <div>
            <Sur>Ce que vous obtenez</Sur>
            <Titre id="ac-obtenu-titre" texte="Pour chaque apprenant, un cours complet." />
            <ul className="ac-livrables">
              {livrables.map((l) => (
                <li key={l.titre} data-monte>
                  <h3>{l.titre}</h3>
                  <p>{l.texte}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pe-section ac-apprenant" aria-labelledby="ac-apprenant-titre">
        <div className="pe-cadre ac-apprenant-grille">
          <div>
            <Sur>Pour l&apos;apprenant</Sur>
            <Titre id="ac-apprenant-titre" texte="Le cours parle de son métier." />
            <p className="pe-intro" data-monte>
              Un chef de chantier n&apos;a pas besoin du même anglais qu&apos;une infirmière. Avec la
              méthode, son cours porte sur son briefing sécurité, ses interlocuteurs, ses mots. Il
              reconnaît sa réalité dès la première séance, et il parle plus vite.
            </p>
          </div>
          <Illustration nom="04-resultat-apprenant" alt="Un formateur et un chef de chantier devant un support de cours sur le briefing sécurité." />
        </div>
      </section>

      <section className="pe-section pe-calme ac-equipe" aria-labelledby="ac-equipe-titre">
        <div className="pe-cadre">
          <Sur>Pour toute l&apos;équipe</Sur>
          <Titre id="ac-equipe-titre" texte="Une formation d'équipe, de 6 semaines à 3 mois." />
          <ul className="pe-chiffres ac-chiffres">
            {equipe.map((c) => (
              <li key={c.label} data-monte>
                <b data-compte={c.valeur} data-suffixe={c.suffixe}>{c.valeur}{c.suffixe}</b>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
          <LienSuite href="/formation">Voir le déroulé de la formation</LienSuite>
        </div>
      </section>

      <section className="pe-section ac-preuve" aria-labelledby="ac-preuve-titre">
        <div className="pe-cadre">
          <Sur>La preuve</Sur>
          <Titre id="ac-preuve-titre" texte="Déjà adoptée par des équipes d'instituts." />
          <div className="ac-preuves">
            <article className="pe-doc" data-monte>
              <h3>Des instituts l&apos;ont adoptée</h3>
              <p>
                Des instituts du réseau des écoles de langues indépendantes forment déjà leurs équipes
                avec la méthode, et une nouvelle cohorte de formateurs la suit en ce moment.
              </p>
            </article>
            <article className="pe-doc" data-monte>
              <h3>Un atout pour Qualiopi</h3>
              <p>
                La formation documente le développement des compétences de vos formateurs et leur veille
                sur les innovations pédagogiques et numériques (indicateurs 22 et 25).
              </p>
            </article>
            <article className="ac-bientot" data-monte>
              <p className="pe-annot">bientôt ici</p>
              <h3>Un cours de démonstration</h3>
              <p>Un cours complet construit avec la méthode, à écouter et à feuilleter, et les témoignages de la cohorte en cours.</p>
            </article>
          </div>
        </div>
      </section>

      <PrixResume />

      <section className="pe-section pe-calme ac-questions" aria-labelledby="ac-questions-titre">
        <div className="pe-cadre ac-questions-grille">
          <div>
            <Sur>Vos questions</Sur>
            <Titre id="ac-questions-titre" texte="Oui, mais…" />
            <LienSuite href="/offre#questions">Toutes les questions</LienSuite>
          </div>
          <Questions indices={[0, 1, 4]} />
        </div>
      </section>

      <AppelFinal lienOffre photo />
    </div>
  );
}
