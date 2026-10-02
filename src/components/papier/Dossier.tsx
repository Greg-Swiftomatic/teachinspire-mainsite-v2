import './dossier.css';

// Le dossier de Katrin : un document par étape, avec son vrai contenu.
export type DocType = 'fiche' | 'calendrier' | 'sources' | 'seance' | 'audio' | 'pack';

function DocKatrin({ type }: { type: DocType }) {
  switch (type) {
    case 'fiche':
      return (
        <>
          <p className="pe-doc-type">Fiche apprenant</p>
          <h4>Katrin V.</h4>
          <dl className="ds-fiche">
            <dt>Métier</dt><dd>Coordinatrice logistique</dd>
            <dt>Niveau</dt><dd>B1+ en français</dd>
            <dt>Situations</dt><dd>Appels de transporteurs, retards, réclamations</dd>
          </dl>
          <p className="pe-annot ds-note">son vrai besoin&nbsp;!</p>
        </>
      );
    case 'calendrier':
      return (
        <>
          <p className="pe-doc-type">Calendrier · 8 semaines · 24&nbsp;h</p>
          <ol className="ds-calendrier">
            <li><b>S1</b> Se présenter, présenter son poste</li>
            <li><b>S2</b> Suivre une commande</li>
            <li className="ds-cible"><b>S3</b> Prendre un appel, clarifier un retard</li>
            <li><b>S4</b> Négocier un nouveau créneau</li>
          </ol>
          <p className="pe-annot ds-note">séance choisie</p>
        </>
      );
    case 'sources':
      return (
        <>
          <p className="pe-doc-type">Sources retenues</p>
          <ul className="ds-sources">
            <li><span>▶</span>Vlog d&apos;un chauffeur routier : les temps de conduite</li>
            <li><span>▶</span>Témoignage : une tournée pleine d&apos;imprévus</li>
          </ul>
          <p className="ds-petit">Transcrites, passages utiles repérés</p>
        </>
      );
    case 'seance':
      return (
        <>
          <p className="pe-doc-type">Fiche de séance 3 · 90&nbsp;min</p>
          <p className="ds-tache"><b>Tâche finale :</b> simuler l&apos;appel d&apos;un transporteur qui annonce un retard.</p>
          <ul className="ds-criteres">
            <li>comprend le problème</li>
            <li>demande une précision utile</li>
            <li>confirme la suite</li>
          </ul>
        </>
      );
    case 'audio':
      return (
        <>
          <p className="pe-doc-type">Dialogue audio · 2 voix</p>
          <div className="ds-onde" aria-hidden="true">
            {Array.from({ length: 34 }, (_, k) => (
              <i key={k} style={{ height: `${18 + Math.round(Math.abs(Math.sin(k * 1.7)) * 26)}px` }} />
            ))}
          </div>
          <p className="ds-replique">« Je vous appelle pour la livraison de jeudi… »</p>
          <p className="ds-petit">+ exercices de compréhension, entraînement, simulation</p>
        </>
      );
    default:
      return (
        <>
          <p className="pe-doc-type">Pack final</p>
          <ul className="ds-pack">
            <li>Support apprenant</li>
            <li>Dialogue audio</li>
            <li>Guide enseignant</li>
            <li>Plan de cours</li>
          </ul>
          <span className="pe-tampon ds-tampon">validé</span>
        </>
      );
  }
}

export type Etape = { num: string; nom: string; texte: string; remis?: string; doc: DocType };

export function Dossier({ etapes }: { etapes: Etape[] }) {
  return (
    <div className="pe-cadre ds-sequence">
      <span className="ds-rail" aria-hidden="true"><i /></span>
      <ol className="ds-etapes">
        {etapes.map((e) => (
          <li className="ds-etape" key={e.num}>
            <div className="ds-texte" data-monte>
              <p className="ds-num">{e.num}</p>
              <h3>{e.nom}</h3>
              <div className="ds-corps">
                <div>
                  <p>{e.texte}</p>
                  {e.remis ? <p className="ds-remis"><b>Chaque formateur remet :</b> {e.remis}</p> : null}
                </div>
              </div>
            </div>
            <div className="pe-doc ds-doc" data-monte>
              <DocKatrin type={e.doc} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
