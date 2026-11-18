import { Words, order } from './motion';

// What Qualiopi asks of a certified institute, and how the course helps it show it.
// Source: the ministry's reading guide of the Référentiel national qualité, V.10 (November 2026),
// indicators 22 and 25 (summary in ~/Documents/Teachinspire/strategy/veille-qualiopi.md).
// Never write "conforme" or "garantit": the auditor judges the whole file, and the referential
// itself forbids misleading communication.
export const GUIDE_QUALIOPI_URL = 'https://travail-emploi.gouv.fr/referentiel-national-qualite-guide-de-lecture-qualiopi';

const indicateurs = [
  {
    numero: 'Indicateur 22',
    titre: 'Les compétences de l’équipe',
    attendu: 'Le référentiel demande d’entretenir et de développer les compétences de vos salariés, adaptées aux formations que vous proposez.',
    parcours:
      'Le parcours forme toute l’équipe à l’IA appliquée à la pédagogie, avec des ateliers en direct et des échanges entre formateurs.',
  },
  {
    numero: 'Indicateur 25',
    titre: 'La veille, et ce qu’elle change',
    attendu:
      'Le référentiel demande une veille sur les innovations pédagogiques et technologiques qui permette de faire évoluer vos formations, et d’en exploiter les enseignements.',
    parcours:
      'Chaque formateur repart avec un cours construit pour un de ses apprenants, et l’équipe avec des outils qu’elle utilise au quotidien : une trace concrète de ce qui a changé.',
  },
];

export function Qualiopi() {
  return (
    <section className="lc-wrap" id="qualiopi" aria-labelledby="qualiopi-titre">
      <div className="lc-qualiopi">
        <div className="lc-head" data-reveal>
          <p className="lc-kicker">Pour les instituts certifiés Qualiopi</p>
          <h2 className="lc-h2" id="qualiopi-titre">
            <Words text="Former l’équipe à l’IA, c’est aussi nourrir votre veille." mark="nourrir votre veille" />
          </h2>
          <p className="lc-lead">
            Un institut certifié doit montrer qu’il développe les compétences de son équipe et qu’il
            suit les innovations pédagogiques et technologiques, puis qu’il en tire parti. Le
            parcours vous aide à le documenter.
          </p>
        </div>
        <ul className="lc-indicateurs" data-reveal>
          {indicateurs.map((ind, n) => (
            <li key={ind.numero} className="lc-indicateur" data-rise style={order(n)}>
              <p className="lc-indicateur-num">{ind.numero}</p>
              <h3>{ind.titre}</h3>
              <p>{ind.attendu}</p>
              <p className="lc-indicateur-nous">{ind.parcours}</p>
            </li>
          ))}
        </ul>
        <p className="lc-qualiopi-note">
          L’auditeur juge l’ensemble de votre dossier : la formation y contribue, elle ne garantit
          pas la certification. Source :{' '}
          <a href={GUIDE_QUALIOPI_URL} target="_blank" rel="noopener noreferrer">
            guide de lecture du Référentiel national qualité
          </a>
          , ministère du Travail, version de novembre 2026.
        </p>
      </div>
    </section>
  );
}
