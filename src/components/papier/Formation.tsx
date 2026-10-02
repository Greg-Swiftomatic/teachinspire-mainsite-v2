import { useRef } from 'react';
import { BOOKING_URL } from '../../assets/assets';
import { AppelFinal, Bouton, Illustration, PrixResume, Rythme, Sur, Titre } from './Papier';
import { chiffres, garde, livrables, modules, publicCible } from './offre-data';
import { Dossier, type DocType } from './Dossier';
import { epinglerDossier } from './epinglerDossier';
import { useAncre } from './useAncre';
import { usePapierMotion } from './usePapierMotion';
import './formation.css';

const DOCS_MODULES: DocType[] = ['fiche', 'calendrier', 'sources', 'seance', 'audio', 'pack'];

export function Formation() {
  const ref = useRef<HTMLDivElement>(null);
  usePapierMotion(ref, epinglerDossier);
  useAncre();

  return (
    <div className="pe-page fo" ref={ref}>
      <section className="pe-section fo-hero" aria-labelledby="fo-titre">
        <div className="pe-cadre fo-hero-grille">
          <div>
            <p className="pe-sur">La formation · Créez des Cours Sur-Mesure</p>
            <Titre as="h1" id="fo-titre" texte="Du besoin de l'apprenant au cours validé, en six modules." souligne="validé" immediat />
            <p className="pe-intro" data-monte>
              Un parcours pour toute l&apos;équipe. Chaque formateur part d&apos;un vrai apprenant et
              repart avec son cours complet, et une méthode à refaire pour le suivant. L&apos;IA
              prépare, le formateur décide.
            </p>
            <div className="pe-actions" data-monte>
              <Bouton href={BOOKING_URL}>Réserver 15 minutes →</Bouton>
              <Bouton href="#programme" variante="trait">Voir le programme</Bouton>
            </div>
            <p className="fo-pratique" data-monte>
              4&nbsp;200&nbsp;€&nbsp;HT jusqu&apos;à 10 formateurs · Finançable par votre OPCO
            </p>
          </div>
          <div className="fo-hero-visuel">
            <Illustration nom="02-cours-complet" alt="Un cours complet posé sur un bureau : support apprenant, guide enseignant, plan de cours et dialogue audio." eager />
            <p className="pe-annot fo-hero-note" data-monte>un cours complet, à la fin du parcours ↑</p>
          </div>
        </div>
        <div className="pe-cadre">
          <ul className="pe-chiffres fo-chiffres">
            {chiffres.map((c) => (
              <li key={c.label} data-monte>
                <b data-compte={c.valeur} data-suffixe={c.suffixe}>{c.valeur}{c.suffixe}</b>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pe-section pe-calme fo-public" aria-labelledby="fo-public-titre">
        <div className="pe-cadre fo-public-grille">
          <Titre id="fo-public-titre" texte="Cette formation est pour votre équipe si…" />
          <ul>
            {publicCible.map((item) => (
              <li key={item.fort} data-monte>
                <span aria-hidden="true">→</span>
                <p>{item.avant}<strong>{item.fort}</strong>{item.apres}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="programme" className="pe-section fo-programme" aria-labelledby="fo-programme-titre">
        <div className="pe-cadre">
          <Sur>Le programme</Sur>
          <Titre id="fo-programme-titre" texte="Un vrai apprenant, suivi de bout en bout." />
          <p className="pe-intro" data-monte>
            Dans les démonstrations, vous suivez Katrin, coordinatrice logistique de niveau B1+, qui
            doit gérer les appels des transporteurs. Dans les mises en pratique, chaque formateur
            suit son propre apprenant. À chaque module, son dossier s&apos;enrichit d&apos;un document.
          </p>
        </div>
        <Dossier
          etapes={modules.map((m, i) => ({
            num: `Module ${m.numero}`,
            nom: m.nom,
            texte: m.resume,
            remis: m.remis,
            doc: DOCS_MODULES[i],
          }))}
        />
      </section>

      <section className="pe-section pe-calme fo-garde" aria-labelledby="fo-garde-titre">
        <div className="pe-cadre">
          <Sur>À la fin du parcours</Sur>
          <Titre id="fo-garde-titre" texte="Ce que chaque formateur garde." />
          <ol className="fo-garde-liste">
            {garde.map((g, i) => (
              <li key={g.titre} data-monte>
                <span className="fo-garde-num">{i + 1}</span>
                <h3>{g.titre}</h3>
                <p>{g.texte}</p>
              </li>
            ))}
          </ol>
          <p className="fo-livrables-titre" data-monte>Le premier cours complet contient :</p>
          <ul className="fo-livrables">
            {livrables.map((l) => (
              <li className="pe-doc" key={l.titre} data-monte>
                <h3>{l.titre}</h3>
                <p>{l.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pe-section fo-outils" aria-labelledby="fo-outils-titre">
        <div className="pe-cadre">
          <Sur>Les outils</Sur>
          <Titre id="fo-outils-titre" texte="N'importe quelle IA, et le Studio inclus." />
          <p className="pe-intro" data-monte>
            Les démonstrations se font sur Gemini, avec un compte gratuit. La méthode marche aussi
            avec ChatGPT, Claude ou Mistral : elle ne dépend pas d&apos;un outil. Pour la
            production, le Studio est inclus pendant 6&nbsp;mois.
          </p>
          <ul className="fo-studio">
            <li data-monte><b>Prompts</b><span>en accès libre</span></li>
            <li data-monte><b>Audio</b><span>60&nbsp;min de synthèse vocale par mois</span></li>
            <li data-monte><b>Transcription</b><span>10&nbsp;h par mois</span></li>
            <li data-monte><b>Documents</b><span>mise en forme et export PDF</span></li>
          </ul>
          <div className="fo-decide" data-monte>
            <p>À chaque étape, l&apos;IA prépare et le formateur décide :</p>
            <ul>
              <li><b>Il cadre</b> le contexte, l&apos;objectif et le niveau.</li>
              <li><b>Il vérifie</b> chaque résultat contre les sources.</li>
              <li><b>Il adapte</b>, puis valide la version qu&apos;il utilisera en cours.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pe-section pe-calme fo-deroule" aria-labelledby="fo-deroule-titre">
        <div className="pe-cadre">
          <div className="fo-deroule-grille">
            <div>
              <Sur>Le déroulé</Sur>
              <Titre id="fo-deroule-titre" texte="Une formation d'équipe, à votre rythme." />
              <div className="fo-formats">
                <article data-monte>
                  <h3>25 capsules vidéo</h3>
                  <p>Courtes, environ 3&nbsp;h&nbsp;40 au total. Chaque formateur avance entre les ateliers, sur son propre temps.</p>
                </article>
                <article data-monte>
                  <h3>10&nbsp;h en direct</h3>
                  <p>Un lancement d&apos;1&nbsp;h, puis 6 ateliers de 1&nbsp;h&nbsp;30 sur vos cas réels. Les replays restent dans la communauté.</p>
                </article>
                <article data-monte>
                  <h3>6 mises en pratique</h3>
                  <p>Une par module, sur l&apos;apprenant de chaque formateur. Pas de quiz : des documents utilisables en classe.</p>
                </article>
                <article data-monte>
                  <h3>Un campus pendant 12 mois</h3>
                  <p>La formation, la communauté et le Studio sous un seul lien, pour partager les créations de l&apos;équipe.</p>
                </article>
              </div>
            </div>
            <Illustration nom="05-equipe-B" alt="Un atelier en direct sur un ordinateur portable : le calendrier de formation à l'écran, l'équipe de l'institut connectée." />
          </div>
          <Rythme />
        </div>
      </section>

      <PrixResume />

      <AppelFinal lienOffre />
    </div>
  );
}
