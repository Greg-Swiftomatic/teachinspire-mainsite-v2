import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { BOOKING_URL } from '../../assets/assets';
import { AppelFinal, Bouton, Questions, Rythme, Sur, Titre } from './Papier';
import {
  FORMATEURS_INCLUS,
  PRIX_BASE,
  PRIX_SUPPLEMENTAIRE,
  SEUIL_DEDOUBLEMENT,
  accueil,
  conditions,
  demarches,
  euros,
  inclus,
  livrables,
  modules,
  prixEquipe,
} from './offre-data';
import { usePapierMotion } from './usePapierMotion';
import './offre.css';

const proposition = [
  ['Formation', 'Créez des Cours Sur-Mesure'],
  ['Pour', "l'équipe pédagogique d'un institut de langues"],
  ['Contenu', '25 capsules · 10 h en direct · 6 mises en pratique'],
  ['Durée', '6 semaines à 3 mois, selon votre rythme'],
  ['Accès', 'campus 12 mois · Studio 6 mois'],
  ['Prix', "4 200 € HT jusqu'à 10 formateurs"],
  ['Financement', 'OPCO, via un organisme partenaire certifié Qualiopi'],
];

// Le total suit le curseur en comptant, comme sur une calculatrice.
function Montant({ valeur }: { valeur: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const affiche = useRef(valeur);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const etat = { v: affiche.current };
    const tween = gsap.to(etat, {
      v: valeur,
      duration: reduit ? 0 : 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        affiche.current = etat.v;
        el.textContent = euros(etat.v);
      },
    });
    return () => {
      tween.kill();
    };
  }, [valeur]);
  return <span ref={ref}>{euros(valeur)}</span>;
}

function Calculateur() {
  const [n, setN] = useState(FORMATEURS_INCLUS);
  const total = prixEquipe(n);
  const supplementaires = Math.max(0, n - FORMATEURS_INCLUS);
  const groupes = n > SEUIL_DEDOUBLEMENT ? 2 : 1;

  return (
    <div className="of-calcul" data-monte>
      <div className="of-calcul-choix">
        <label htmlFor="of-formateurs">Nombre de formateurs</label>
        <output htmlFor="of-formateurs" className="of-calcul-n">{n}</output>
        <input
          id="of-formateurs"
          type="range"
          min={1}
          max={30}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ ['--rempli' as string]: `${((n - 1) / 29) * 100}%` }}
        />
        <div className="of-calcul-bornes" aria-hidden="true"><span>1</span><span>10</span><span>20</span><span>30</span></div>
      </div>

      <div className="of-devis" aria-live="polite">
        <p className="pe-doc-type">Votre estimation</p>
        <dl>
          <div>
            <dt>Forfait institut, jusqu&apos;à {FORMATEURS_INCLUS} formateurs</dt>
            <dd>{euros(PRIX_BASE)}</dd>
          </div>
          <div className={supplementaires ? '' : 'of-devis-vide'}>
            <dt>{supplementaires} formateur{supplementaires > 1 ? 's' : ''} supplémentaire{supplementaires > 1 ? 's' : ''} × {euros(PRIX_SUPPLEMENTAIRE)}</dt>
            <dd>{euros(supplementaires * PRIX_SUPPLEMENTAIRE)}</dd>
          </div>
          <div className="of-devis-total">
            <dt>Total HT</dt>
            <dd><Montant valeur={total} /></dd>
          </div>
        </dl>
        <ul className="of-devis-notes">
          <li>Soit <b>{euros(total / n)} HT par formateur</b>.</li>
          <li>Ateliers en direct : {groupes === 1 ? 'un seul groupe' : 'deux groupes, dédoublés sans surcoût'}.</li>
          {n > 25 ? <li>Au-delà de 25 formateurs, nous construisons un planning et un devis sur mesure.</li> : null}
        </ul>
      </div>
    </div>
  );
}

export function Offre() {
  const ref = useRef<HTMLDivElement>(null);
  usePapierMotion(ref);

  return (
    <div className="pe-page of" ref={ref}>
      <section className="pe-section of-hero" aria-labelledby="of-titre">
        <div className="pe-cadre of-hero-grille">
          <div>
            <p className="pe-sur">L&apos;offre</p>
            <Titre as="h1" id="of-titre" texte="Tout ce que comprend la formation, en détail." souligne="détail." immediat />
            <p className="pe-intro" data-monte>
              Pour un institut de langues qui veut former toute son équipe à créer des cours sur
              mesure avec l&apos;IA. Le prix, le contenu, le rythme et le financement : tout est sur
              cette page.
            </p>
            <div className="pe-actions" data-monte>
              <Bouton href={BOOKING_URL}>Réserver 15 minutes →</Bouton>
              <Bouton href="#prix" variante="trait">Calculer le prix</Bouton>
            </div>
          </div>
          <div className="pe-doc of-proposition">
            <p className="pe-doc-type">Proposition de formation</p>
            <dl>
              {proposition.map(([cle, valeur]) => (
                <div key={cle} data-monte>
                  <dt>{cle}</dt>
                  <dd>{valeur}</dd>
                </div>
              ))}
            </dl>
            <p className="pe-annot of-proposition-note" data-monte>tout est détaillé ci-dessous ↓</p>
          </div>
        </div>
      </section>

      <section id="prix" className="pe-section pe-sombre of-prix" data-sombre aria-labelledby="of-prix-titre">
        <div className="pe-cadre">
          <Sur>Le prix</Sur>
          <Titre id="of-prix-titre" texte="Combien pour votre équipe ?" />
          <p className="pe-intro" data-monte>
            Un prix par institut, pas par formateur : jusqu&apos;à 10 formateurs, le prix ne bouge
            pas. Faites glisser le curseur.
          </p>
          <Calculateur />
        </div>
      </section>

      <section className="pe-section of-inclus" aria-labelledby="of-inclus-titre">
        <div className="pe-cadre">
          <Sur>Le contenu</Sur>
          <Titre id="of-inclus-titre" texte="Ce qui est inclus." />
          <div className="of-inventaire">
            {inclus.map((g) => (
              <div className="of-groupe" key={g.groupe} data-monte>
                <h3>{g.groupe}</h3>
                <ul>
                  {g.lignes.map((l) => (
                    <li key={l.texte}>
                      <b>{l.qte}</b>
                      <span>{l.texte}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pe-section pe-calme of-programme" aria-labelledby="of-programme-titre">
        <div className="pe-cadre of-programme-grille">
          <div className="of-programme-tete">
            <Sur>Le programme</Sur>
            <Titre id="of-programme-titre" texte="Module par module." />
            <p className="pe-intro" data-monte>
              Les démonstrations suivent un cas de bout en bout : Katrin, coordinatrice logistique de
              niveau B1+, qui doit gérer les appels des transporteurs. Chaque module se termine par
              une mise en pratique sur l&apos;apprenant de chaque formateur.
            </p>
          </div>
          <div className="of-modules">
            <details data-monte>
              <summary>
                <span className="of-modules-num">00</span>
                <span className="of-modules-nom">{accueil.nom}</span>
                <i aria-hidden="true" />
              </summary>
              <ul>{accueil.detail.map((d) => <li key={d}>{d}</li>)}</ul>
            </details>
            {modules.map((m, i) => (
              <details key={m.numero} open={i === 0} data-monte>
                <summary>
                  <span className="of-modules-num">{m.numero}</span>
                  <span className="of-modules-nom">{m.nom}<small>{m.resume}</small></span>
                  <i aria-hidden="true" />
                </summary>
                <ul>{m.detail.map((d) => <li key={d}>{d}</li>)}</ul>
                <p className="of-remis"><b>Chaque formateur remet :</b> {m.remis}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="pe-cadre">
          <p className="of-livrables-titre" data-monte>À la fin du parcours, chaque formateur a un premier cours complet :</p>
          <ul className="of-livrables">
            {livrables.map((l) => (
              <li className="pe-doc" key={l.titre} data-monte>
                <h3>{l.titre}</h3>
                <p>{l.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pe-section of-rythme" aria-labelledby="of-rythme-titre">
        <div className="pe-cadre">
          <Sur>Le calendrier</Sur>
          <Titre id="of-rythme-titre" texte="Deux rythmes possibles." />
          <p className="pe-intro" data-monte>
            Le lancement réunit toute l&apos;équipe. Ensuite, chaque module se termine par un atelier
            en direct de 1&nbsp;h&nbsp;30. Les capsules se suivent entre deux ateliers.
          </p>
          <Rythme detaille />
        </div>
      </section>

      <section className="pe-section pe-sombre of-demarches" data-sombre aria-labelledby="of-demarches-titre">
        <div className="pe-cadre of-demarches-grille">
          <div className="of-demarches-tete">
            <Sur>Les démarches</Sur>
            <Titre id="of-demarches-titre" texte="De l'appel à la fin du parcours." />
            <p className="pe-intro" data-monte>
              Le portage administratif est assuré par un organisme partenaire certifié Qualiopi :
              vous n&apos;avez pas de dossier à monter seul.
            </p>
          </div>
          <div className="of-etapes-zone" data-trace-zone>
            <svg className="of-etapes-trait" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M1 0 V100" pathLength={1} data-trace />
            </svg>
            <ol className="of-etapes">
              {demarches.map((d, i) => (
                <li key={d.titre} data-monte>
                  <span className="of-etapes-num">{i + 1}</span>
                  <h3>{d.titre}</h3>
                  <p>{d.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="pe-section of-conditions" aria-labelledby="of-conditions-titre">
        <div className="pe-cadre of-conditions-grille">
          <div>
            <Sur>Les conditions</Sur>
            <Titre id="of-conditions-titre" texte="Ce qu'il faut savoir avant de signer." />
          </div>
          <ul className="of-conditions-liste">
            {conditions.map((c) => (
              <li key={c} data-monte>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pe-section pe-calme of-questions" aria-labelledby="of-questions-titre">
        <div className="pe-cadre of-questions-grille">
          <div>
            <Sur>Vos questions</Sur>
            <Titre id="of-questions-titre" texte="Oui, mais…" />
          </div>
          <Questions />
        </div>
      </section>

      <AppelFinal />
    </div>
  );
}
