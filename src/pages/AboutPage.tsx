import { useRef } from 'react';
import { PageMeta } from '../components/seo/PageMeta';
import { Words, order, useMotion } from '../components/lecap/motion';
import '../components/lecap/pages.css';
import '../components/lecap/simple.css';

const contraintes = [
  { titre: 'Le temps', texte: 'préparer une seule leçon personnalisée peut prendre des heures.' },
  { titre: 'La diversité des besoins', texte: 'chaque apprenant a un profil professionnel différent.' },
  { titre: 'Mes propres limites', texte: 'je ne suis pas expert de tous les domaines techniques.' },
];

const dates = [
  { annee: '2016', titre: 'Formation CELTA', texte: 'Cambridge, Université de Solihull, Birmingham' },
  { annee: '2016 – 2022', titre: 'Enseignement FLE et anglais', texte: 'Cours individuels et collectifs' },
  { annee: '2022', titre: 'Découverte de l’IA générative', texte: 'Premiers essais sur mes propres cours' },
  { annee: '2023', titre: 'Expérience aux États-Unis', texte: 'Travail avec une équipe qui créait du contenu à partir de podcasts' },
  { annee: '2024', titre: 'Création de TeachInspire', texte: 'Lancement de la première formation' },
  { annee: '2025', titre: 'Ouverture aux instituts', texte: 'La formation s’adresse aussi aux équipes' },
];

const gardeFous = [
  {
    titre: 'L’IA est un assistant, pas un remplaçant',
    texte: 'Gagner du temps sans perdre le métier : l’IA accélère certaines tâches, elle ne décide pas à la place du formateur.',
  },
  {
    titre: 'Comprendre les familles d’outils',
    texte: 'Texte, transcription, synthèse vocale : quand on comprend la brique, on change d’outil plus facilement.',
  },
  {
    titre: 'Garder sa liberté de choix',
    texte: 'Si un meilleur outil sort demain, vous savez quoi tester, quoi vérifier et quoi ignorer.',
  },
  {
    titre: 'Rester à jour grâce à la communauté',
    texte: 'Les outils changent trop vite pour rester seul dans son coin. La communauté sert à comparer les essais et à faire le tri.',
  },
];

export function AboutPage() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);

  return (
    <div className="lc lc-page" ref={page}>
      <PageMeta
        title="À propos : Grégory, formateur de langues et fondateur de TeachInspire"
        description="TeachInspire est né d’une pratique de terrain : utiliser l’IA pour préparer plus vite, tout en gardant le jugement pédagogique côté formateur."
        path="/a-propos"
      />

      <section className="lc-wrap" aria-labelledby="apropos-titre">
        <div className="lc-green lc-intro" data-surface="green" data-reveal>
          <div className="lc-intro-text">
            <p className="lc-hero-kicker">À propos</p>
            <h1 id="apropos-titre">
              <Words text="Garder le métier au centre, même avec l’IA." under="le métier" />
            </h1>
            <p className="lc-hero-lead" data-rise style={order(4)}>
              Avant de former des équipes à l’IA, j’ai passé des années à préparer des cours pour des
              apprenants très différents. Ça rend assez méfiant devant les solutions trop propres.
            </p>
          </div>
          <figure className="lc-intro-photo" data-rise style={order(3)}>
            <img
              src="/images/greg/greg-bureau-1000.webp"
              srcSet="/images/greg/greg-bureau-600.webp 600w, /images/greg/greg-bureau-1000.webp 1000w"
              sizes="(max-width: 1000px) 420px, 520px"
              alt="Grégory à son bureau, devant son ordinateur, près d’une fenêtre."
              width={1000}
              height={1000}
              fetchPriority="high"
            />
            <figcaption>Grégory, fondateur de TeachInspire</figcaption>
          </figure>
        </div>
      </section>

      <section className="lc-wrap lc-story" aria-labelledby="fondateur-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Le fondateur</p>
          <h2 className="lc-h2" id="fondateur-titre"><Words text="Je m’appelle Grégory." /></h2>
          <p className="lc-lead">Formateur de langues depuis 2016.</p>
        </div>
        <div className="lc-story-body" data-reveal>
          <p>
            Tout a commencé pendant ma formation CELTA à Birmingham. On nous encourageait à créer
            nos propres ressources, adaptées à nos vrais élèves. J’ai adoré ça.
          </p>
          <p>
            Puis la réalité m’a rattrapé : 30 heures de cours par semaine, 8 étudiants avec des
            besoins complètement différents. Des profils techniques, des secteurs que je ne
            maîtrisais pas, des contextes culturels variés, un temps limité pour atteindre leurs
            objectifs. <strong>À un moment, on revient aux manuels standards. Même quand on sait que
            ce n’est pas idéal.</strong>
          </p>
          <ul className="lc-constraints">
            {contraintes.map((c, n) => (
              <li key={c.titre} data-rise style={order(n)}>
                <strong>{c.titre}</strong>
                {c.texte}
              </li>
            ))}
          </ul>
          <p><strong>J’ai accepté ce compromis plus longtemps que je n’aurais voulu.</strong></p>
        </div>
      </section>

      <section className="lc-wrap lc-story" aria-labelledby="declic-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Le déclic</p>
          <h2 className="lc-h2" id="declic-titre"><Words text="Fin 2022." /></h2>
        </div>
        <div className="lc-story-body" data-reveal>
          <p>
            Novembre 2022. ChatGPT sort. Un ami m’envoie une vidéo. <strong>Je vois tout de suite ce
            que ça peut changer dans la préparation.</strong>
          </p>
          <p>
            Transcrire une vidéo, extraire du vocabulaire, adapter un texte, créer des dialogues,
            produire des variantes d’exercices : toutes ces petites tâches qui grignotent une soirée
            entière.
          </p>
          <p className="lc-story-key">
            Mais je vois aussi le piège : une sortie bien écrite peut donner une impression de
            qualité alors qu’elle reste trop générale, mal calibrée ou pédagogiquement fragile.
          </p>
          <p>
            TeachInspire vient de là : réduire le travail autour du cours, tout en gardant la
            décision pédagogique dans les mains du formateur. Et, franchement, retrouver le plaisir
            de créer des leçons pour des contextes très précis.
          </p>
        </div>
      </section>

      <section className="lc-wrap lc-story" aria-labelledby="naissance-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">La naissance</p>
          <h2 className="lc-h2" id="naissance-titre"><Words text="De l’exploration à TeachInspire." /></h2>
        </div>
        <div className="lc-story-body" data-reveal>
          <p>
            En partageant mes essais, des collègues enseignants commencent à me demander comment
            faire pareil. Les mêmes questions reviennent.
          </p>
          <p><strong>D’abord une formation. Puis une communauté. Puis quelques outils maison.</strong></p>
          <p>Ce qui était au départ une manière de tenir mes propres cours a pris plus de place.</p>
          <p className="lc-story-key">
            L’objectif reste simple : aider les formateurs à gagner du temps avec des objectifs
            clairs, des supports relus et une vraie liberté face aux outils qui changent.
          </p>
        </div>
      </section>

      <section className="lc-wrap" aria-labelledby="parcours-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Parcours</p>
          <h2 className="lc-h2" id="parcours-titre"><Words text="Les étapes clés." /></h2>
        </div>
        <ol className="lc-dates" data-reveal>
          {dates.map((d, n) => (
            <li key={d.annee} data-rise style={order(n)}>
              <span>{d.annee}</span>
              <h3>{d.titre}</h3>
              <p>{d.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="lc-wrap" aria-labelledby="garde-fous-titre">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Philosophie</p>
          <h2 className="lc-h2" id="garde-fous-titre"><Words text="Mes garde-fous." /></h2>
        </div>
        <ol className="lc-rules" data-reveal>
          {gardeFous.map((g, n) => (
            <li key={g.titre} data-rise style={order(n)}>
              <span className="lc-path-num" aria-hidden="true">{n + 1}</span>
              <h3>{g.titre}</h3>
              <p>{g.texte}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
