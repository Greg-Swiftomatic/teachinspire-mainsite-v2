import { Fragment, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BOOKING_URL } from '../../assets/assets';
import { FORMATEURS_INCLUS, PRIX_BASE, PRIX_SUPPLEMENTAIRE, modules, questions, rythmes } from './offre-data';
import './papier.css';

// Un titre dont les mots montent un par un. `jaune` met un mot en valeur
// (la seule touche de jaune de l'écran), `souligne` lui ajoute le trait rouille.
export function Titre({
  as: Balise = 'h2',
  texte,
  jaune,
  souligne,
  immediat = false,
  className = '',
  id,
}: {
  as?: 'h1' | 'h2' | 'h3';
  texte: string;
  jaune?: string | string[];
  souligne?: string | string[];
  immediat?: boolean;
  className?: string;
  id?: string;
}) {
  const mots = texte.split(' ');
  const enJaune = ([] as string[]).concat(jaune ?? []);
  const soulignes = ([] as string[]).concat(souligne ?? []);
  return (
    <Balise id={id} className={className} data-mots={immediat ? 'immediat' : ''}>
      {mots.map((mot, i) => {
        const propre = mot.replace(/[.,:;!?]$/, '');
        const classes = ['pe-w', enJaune.includes(propre) ? 'pe-jaune' : '', soulignes.includes(propre) ? 'pe-souligne' : '']
          .filter(Boolean)
          .join(' ');
        return (
          <Fragment key={`${mot}-${i}`}>
            <span className="pe-m">
              <span className={classes}>{mot}</span>
            </span>
            {i < mots.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </Balise>
  );
}

export function Sur({ children }: { children: ReactNode }) {
  return <p className="pe-sur" data-monte>{children}</p>;
}

export function Illustration({
  nom,
  alt,
  className = '',
  eager = false,
}: {
  nom: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`pe-ill ${className}`} data-devoile>
      <img
        src={`/images/papier/${nom}-1400.webp`}
        srcSet={`/images/papier/${nom}-800.webp 800w, /images/papier/${nom}-1400.webp 1400w`}
        sizes="(min-width: 1000px) 50vw, 100vw"
        width={1448}
        height={1086}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  );
}

export function Bouton({
  href,
  children,
  variante = 'plein',
}: {
  href: string;
  children: ReactNode;
  variante?: 'plein' | 'trait' | 'clair';
}) {
  const classe = `pe-btn pe-btn-${variante}`;
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classe}>
        {children}
      </Link>
    );
  }
  const externe = href.startsWith('http');
  return (
    <a href={href} className={classe} {...(externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

export function LienSuite({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link to={href} className="pe-lien" data-monte>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

// Le prix en résumé, sur fond marine : l'accueil et Formation renvoient vers l'Offre.
export function PrixResume() {
  return (
    <section className="pe-section pe-sombre pe-prix" data-sombre aria-labelledby="pe-prix-titre">
      <div className="pe-cadre pe-prix-grille">
        <div>
          <Sur>Le prix</Sur>
          <Titre id="pe-prix-titre" texte="Un prix par institut, pas par formateur." />
        </div>
        <div>
          <p className="pe-prix-montant">
            <span data-compte={PRIX_BASE}>{PRIX_BASE.toLocaleString('fr-FR')}</span>&nbsp;€&nbsp;HT
            <small>jusqu&apos;à {FORMATEURS_INCLUS} formateurs</small>
          </p>
          <ul className="pe-prix-points">
            <li data-monte>Puis {PRIX_SUPPLEMENTAIRE}&nbsp;€&nbsp;HT par formateur supplémentaire.</li>
            <li data-monte>Finançable par votre OPCO, avec le portage administratif d&apos;un organisme partenaire certifié Qualiopi.</li>
            <li data-monte>Paiement en 3 fois sans frais possible.</li>
          </ul>
          <div className="pe-actions" data-monte>
            <Bouton href="/offre" variante="clair">Voir l&apos;offre détaillée →</Bouton>
            <Bouton href={BOOKING_URL} variante="trait">Réserver 15 minutes</Bouton>
          </div>
        </div>
      </div>
    </section>
  );
}

// Les deux rythmes possibles, sur une même frise : le lancement, les six
// modules et les six ateliers. Le bouton change l'espacement des ateliers.
export function Rythme({ detaille = false }: { detaille?: boolean }) {
  const [choix, setChoix] = useState<keyof typeof rythmes>('recommande');
  const r = rythmes[choix];
  const semaines = Array.from({ length: r.semaines }, (_, i) => i + 1);

  return (
    <div className="pe-rythme" data-monte>
      <div className="pe-rythme-choix" role="radiogroup" aria-label="Rythme du parcours">
        {(Object.keys(rythmes) as (keyof typeof rythmes)[]).map((cle) => (
          <button
            key={cle}
            type="button"
            role="radio"
            aria-checked={choix === cle}
            className={choix === cle ? 'est-choisi' : ''}
            onClick={() => setChoix(cle)}
          >
            <strong>{rythmes[cle].label}</strong>
            <span>{rythmes[cle].duree}</span>
          </button>
        ))}
      </div>
      <p className="pe-rythme-texte">{r.texte}</p>

      <ol className="pe-frise" style={{ ['--semaines' as string]: r.semaines + 1 }}>
        <li className="pe-frise-lancement">
          <span className="pe-frise-sem">Sem. 0</span>
          <span className="pe-frise-pastille" aria-hidden="true" />
          <span className="pe-frise-quoi">Lancement, 1&nbsp;h</span>
        </li>
        {semaines.map((s) => {
          const atelier = (r.ateliers as readonly number[]).indexOf(s);
          const mod = atelier >= 0 ? modules[atelier] : undefined;
          return (
            <li key={`${choix}-${s}`} className={mod ? 'a-atelier' : ''} style={{ ['--i' as string]: s }}>
              <span className="pe-frise-sem">Sem. {s}</span>
              <span className="pe-frise-pastille" aria-hidden="true" />
              {mod ? (
                <span className="pe-frise-quoi">
                  <b>Atelier {atelier + 1}</b>
                  {detaille ? <em>{mod.nom}</em> : null}
                </span>
              ) : (
                <span className="pe-frise-quoi pe-frise-calme">capsules et pratique</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Questions({ indices }: { indices?: number[] }) {
  const liste = indices ? indices.map((i) => questions[i]) : questions;
  return (
    <div className="pe-questions">
      {liste.map((item) => (
        <details key={item.q} data-monte>
          <summary>
            {item.q}
            <span aria-hidden="true" />
          </summary>
          <p>{item.r}</p>
        </details>
      ))}
    </div>
  );
}

export function AppelFinal({ lienOffre = false, photo = false }: { lienOffre?: boolean; photo?: boolean }) {
  return (
    <section className="pe-section pe-appel" aria-labelledby="pe-appel-titre">
      <div className="pe-cadre pe-appel-cadre">
        {photo ? (
          <figure className="pe-appel-photo" data-monte>
            <img
              src="/images/papier/greg-bureau-1000.webp"
              srcSet="/images/papier/greg-bureau-600.webp 600w, /images/papier/greg-bureau-1000.webp 1000w"
              sizes="320px"
              width={1000}
              height={1000}
              alt="Greg Le Dall, fondateur de TeachInspire, à son bureau devant son ordinateur"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="pe-annot">Greg, qui animera vos ateliers</figcaption>
          </figure>
        ) : null}
        <Titre id="pe-appel-titre" texte="Quinze minutes, un avis honnête." souligne="minutes" />
        <p data-monte>
          Vous repartez avec une idée précise de ce que la méthode peut apporter à votre équipe,
          que vous travailliez avec nous ou non.
        </p>
        <div className="pe-actions" data-monte>
          <Bouton href={BOOKING_URL}>Réserver 15 minutes →</Bouton>
          {lienOffre ? <Bouton href="/offre" variante="trait">Voir l&apos;offre détaillée</Bouton> : null}
        </div>
        <p className="pe-appel-mail" data-monte>
          Ou écrivez-moi : <a href="mailto:greg@teachinspire.me">greg@teachinspire.me</a> · Réponse sous 24&nbsp;h
        </p>
      </div>
    </section>
  );
}
