import { useEffect, useRef, useState } from 'react';
import { Words, order, useMotion } from './motion';
import { LecteurAudio } from './LecteurAudio';
import { MODULES } from './site';
import './pages.css';
import './cours.css';

// The demonstration course (decisions 7, 8 and 17 of 10 November 2026). Thomas is a
// fictional learner. Every document below was laid out by the Studio; the files live in
// /public/cours-demo and the source text in the Studio repository (docs/cours-demo).
const FICHIERS = '/cours-demo';
const AUDIO = `${FICHIERS}/monday-meeting.mp3`;
const SOURCE = {
  titre: 'How to make meetings worthwhile and productive … for everyone involved',
  auteur: 'Francisco J. Pérez Latre',
  media: 'The Conversation',
  date: '2 octobre 2024',
  url: 'https://theconversation.com/how-to-make-meetings-worthwhile-and-productive-for-everyone-involved-240061',
};

type Doc = { fichier: string; nom: string; pour: string; pages: number; langue: string };

const nombre = (n: number) => `${n} page${n > 1 ? 's' : ''}`;

type Etape = {
  id: string;
  titre: string;
  fait: string;
  pourquoi: string;
  place: string;
  docs: Doc[];
};

// One entry per module of the method, in the order and under the names of MODULES (site.ts).
const etapes: Etape[] = [
  {
    id: 'clarifier',
    titre: 'D’abord, qui est Thomas.',
    fait: 'Le formateur met par écrit ce que Thomas a dit à l’entretien de démarrage : son métier, son niveau, la réunion du lundi qu’il doit animer, ce qui le bloque.',
    pourquoi: 'Tout le cours part de cette situation réelle. Rien n’est tiré d’un manuel ou d’un programme.',
    place: 'C’est le point de départ. La fiche apprenant sert à tous les modules suivants.',
    docs: [
      { fichier: '1-profil-apprenant', nom: 'Fiche apprenant', pour: 'Pour le formateur', pages: 2, langue: 'en français' },
    ],
  },
  {
    id: 'structurer',
    titre: 'Ensuite, les objectifs, écrits pour lui.',
    fait: 'Le formateur transforme le besoin en objectifs concrets : ce que Thomas saura faire, et comment il saura que c’est réussi.',
    pourquoi: 'Thomas lit ses objectifs et les valide avant de commencer. Si l’objectif est flou ici, tout le cours le sera.',
    place: 'Dans une formation longue, on pose ensuite le calendrier, séance par séance. Ici, la formation tient en une séance de 90 minutes.',
    docs: [
      { fichier: '2-course-brief', nom: 'Objectifs de la formation', pour: 'Pour Thomas', pages: 1, langue: 'en anglais' },
    ],
  },
  {
    id: 'selectionner',
    titre: 'Puis une source authentique, choisie pour lui.',
    fait: 'Le formateur retient un article écrit pour de vrais lecteurs, pas pour des apprenants : court, bien découpé, avec cinq règles pour une réunion utile.',
    pourquoi: 'Thomas lira ce genre de texte au travail. L’article est cité par son lien, jamais recopié : il le lit en ligne.',
    place: 'Ici, la source est un texte. Une vidéo ou un podcast serait d’abord transcrit, pour n’en garder que ce qui sert.',
    docs: [],
  },
  {
    id: 'concevoir',
    titre: 'La tâche finale, puis les étapes pour y arriver.',
    fait: 'Le formateur fixe la tâche finale : Thomas anime sa propre réunion du lundi. Il écrit ensuite le plan de la séance, étape par étape, jusqu’à cette tâche.',
    pourquoi: 'On part de la fin. Une activité n’entre dans le plan que si elle prépare Thomas à sa réunion.',
    place: 'Le plan dit ce qu’il reste à fabriquer : un support, des exercices, un audio.',
    docs: [
      { fichier: '3-plan-de-seance', nom: 'Plan de la séance', pour: 'Pour le formateur', pages: 2, langue: 'en français' },
      { fichier: '5-role-cards', nom: 'Cartes de rôle de la tâche finale', pour: 'Pour Thomas et le formateur', pages: 1, langue: 'en anglais' },
    ],
  },
  {
    id: 'produire',
    titre: 'Le support, les exercices et le dialogue audio.',
    fait: 'Le formateur écrit les exercices, puis une réunion de deux minutes qui applique les règles de l’article. Le Studio donne deux voix au dialogue et met le support en page.',
    pourquoi: 'Le texte reste celui du formateur : l’outil Audio ne l’écrit pas, l’outil Documents ne change pas un mot.',
    place: 'C’est ici que le Studio sert. Il reste les corrigés, le guide et la relecture.',
    docs: [
      { fichier: '4-learner-handout', nom: 'Support de l’apprenant', pour: 'Pour Thomas', pages: 5, langue: 'en anglais' },
      { fichier: '6-meeting-script', nom: 'Transcription du dialogue', pour: 'Remise après l’écoute', pages: 1, langue: 'en anglais' },
    ],
  },
  {
    id: 'finaliser',
    titre: 'Enfin, les corrigés, le guide et la dernière relecture.',
    fait: 'Le formateur rédige le guide de l’enseignant avec les corrigés, relit tout avec une liste de contrôle, et prépare la carte que Thomas gardera près de son clavier.',
    pourquoi: 'C’est à la relecture qu’on attrape le lien mort ou la réponse qui ne correspond plus à l’audio. Et le cours se juge dans la vraie réunion.',
    place: 'Dernier module : le cours est complet, prêt à enseigner, par ce formateur ou par un collègue.',
    docs: [
      { fichier: '8-guide-enseignant', nom: 'Guide de l’enseignant et corrigés', pour: 'Pour le formateur', pages: 3, langue: 'en français' },
      { fichier: '7-liste-de-controle', nom: 'Liste de contrôle', pour: 'Pour le formateur', pages: 2, langue: 'en français' },
      { fichier: '9-monday-meeting-card', nom: 'Carte mémo', pour: 'Pour Thomas, le lundi', pages: 1, langue: 'en anglais' },
    ],
  },
];

const regles = [
  { regle: 'Fixer l’objectif', audio: 'La réunion s’ouvre par son but.' },
  { regle: 'Suivre un ordre du jour', audio: 'Trois points annoncés ; une question est reportée à plus tard.' },
  { regle: 'Les bonnes personnes, chacune avec un rôle', audio: 'Chaque point a son responsable.' },
  { regle: 'Envoyer les conclusions', audio: 'Un résumé est promis par e-mail.' },
  { regle: 'Faire court', audio: 'Vingt minutes, annoncées dès l’ouverture.' },
];

const script: [string, string][] = [
  ['Rachel', 'Good morning, everyone. Let’s get started. It’s nine thirty, and we finish at ten to ten. The aim today is simple. We check last week’s actions, and we decide the priorities for this week. There are three points on the agenda. The client demo, the testing, and the holiday plan. Ben, can you start with the demo, please?'],
  ['Ben', 'Sure. The demo is ready. We showed it to the sales team on Friday, and they liked it. But there is one problem. The login page is still slow.'],
  ['Rachel', 'OK. How slow is it?'],
  ['Ben', 'About five seconds. I think we can fix it by Wednesday.'],
  ['Rachel', 'Good. So, if I understand correctly, the demo is ready, and the login page will be faster by Wednesday. Is that right?'],
  ['Ben', 'Yes, that’s right.'],
  ['Rachel', 'Thanks, Ben. Let’s move on to the testing. Sofia is with the client this morning, so she sent her update by email. The tests are finished, and there are two small bugs.'],
  ['Ben', 'Can I ask a question about the bugs?'],
  ['Rachel', 'Is it a quick one? If not, let’s talk after the meeting, so we finish on time.'],
  ['Ben', 'No problem. It can wait.'],
  ['Rachel', 'Great. Last point, the holiday plan. Please add your dates to the shared calendar before Friday. So, to sum up. The demo is ready, and the tests are finished. We have two action points. Ben, you fix the login page by Wednesday. And everyone adds their holiday dates by Friday. Do we all agree?'],
  ['Ben', 'Yes, agreed.'],
  ['Rachel', 'Perfect. I’ll send a short summary by email this morning. Thanks, everyone. Have a good week.'],
];

function Lecteur({ doc, onClose }: { doc: Doc | null; onClose: () => void }) {
  const dialogue = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogue.current;
    if (!d) return;
    if (doc && !d.open) d.showModal();
    if (!doc && d.open) d.close();
  }, [doc]);

  const pdf = doc ? `${FICHIERS}/${doc.fichier}.pdf` : '';
  return (
    <dialog
      ref={dialogue}
      className="lc lc-reader"
      aria-label={doc ? doc.nom : 'Document'}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogue.current) onClose();
      }}
    >
      {doc ? (
        <div className="lc-reader-box">
          <div className="lc-reader-bar">
            <p>
              <strong>{doc.nom}</strong>
              <span>{doc.pour} · {nombre(doc.pages)}, {doc.langue}</span>
            </p>
            <a className="lc-btn lc-btn--line lc-btn--small" href={pdf} target="_blank" rel="noreferrer">
              Télécharger le PDF
            </a>
            <button type="button" className="lc-btn lc-btn--ink lc-btn--small" onClick={onClose}>
              Fermer
            </button>
          </div>
          <div className="lc-reader-pages" tabIndex={0}>
            {Array.from({ length: doc.pages }, (_, k) => (
              <img
                key={k}
                src={`${FICHIERS}/${doc.fichier}-p${k + 1}.webp`}
                alt={`${doc.nom}, page ${k + 1} sur ${doc.pages}`}
                width={910}
                height={1287}
                loading={k === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

function Carte({ doc, n, ouvrir }: { doc: Doc; n: number; ouvrir: (doc: Doc) => void }) {
  return (
    <li data-rise style={order(n)}>
      <button type="button" className="lc-sheet" onClick={() => ouvrir(doc)}>
        <img src={`${FICHIERS}/${doc.fichier}.webp`} alt="" width={496} height={702} loading="lazy" decoding="async" />
        <span className="lc-sheet-text">
          <strong>{doc.nom}</strong>
          <span>{doc.pour} · {nombre(doc.pages)}, {doc.langue}</span>
          <span className="lc-sheet-go">Ouvrir le document</span>
        </span>
      </button>
    </li>
  );
}

export function Cours() {
  const page = useRef<HTMLDivElement>(null);
  useMotion(page);
  const [ouvert, setOuvert] = useState<Doc | null>(null);
  const [ici, setIci] = useState(etapes[0].id);

  // The step in view lights up in the step bar.
  useEffect(() => {
    const root = page.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIci(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    root.querySelectorAll('.lc-step').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lc lc-page lc-cours" ref={page}>
      <section className="lc-wrap" aria-labelledby="cours-titre">
        <div className="lc-green lc-hero lc-hero--formation" data-surface="green" data-reveal>
          <div className="lc-hero-text">
            <p className="lc-hero-kicker">Un cours, de A à Z</p>
            <h1 id="cours-titre">
              <Words text="Suivez un vrai cours, du besoin de l’apprenant aux documents imprimés." under="un vrai cours" />
            </h1>
            <p className="lc-hero-lead">
              Les six modules de la méthode, dans l’ordre. À chacun, vous lisez ce qui a été fait
              pour Thomas et pourquoi, et vous ouvrez le document produit.
            </p>
            <div className="lc-hero-actions">
              <a className="lc-btn lc-btn--yellow" href="#clarifier">Commencer par le module 1</a>
            </div>
            <p className="lc-hero-note">Thomas est un apprenant fictif, créé pour cette démonstration.</p>
          </div>
          <ul className="lc-hero-panel lc-cours-panel">
            <li data-rise style={order(0)}><span>L’apprenant</span><strong>Thomas</strong><span>chef de projet</span></li>
            <li data-rise style={order(1)}><span>Son niveau en anglais</span><strong>B1</strong></li>
            <li data-rise style={order(2)}><span>Son objectif</span><strong className="est-phrase">Animer en anglais la réunion d’équipe du lundi matin</strong></li>
            <li data-rise style={order(3)}><span>Le cours</span><strong className="est-phrase">Une séance de 90 minutes</strong></li>
          </ul>
        </div>
      </section>

      <nav className="lc-wrap lc-steps" aria-label="Les six modules de la méthode">
        <ol>
          {etapes.map((etape, n) => (
            <li key={etape.id}>
              <a href={`#${etape.id}`} aria-current={ici === etape.id ? 'step' : undefined}>
                <b>{n + 1}</b>
                <span>{MODULES[n].nom}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {etapes.map((etape, n) => (
        <section key={etape.id} id={etape.id} className="lc-wrap lc-step" aria-labelledby={`${etape.id}-titre`}>
          <div className="lc-step-head" data-reveal>
            <p className="lc-step-num"><b>{n + 1}</b> Module {n + 1} sur 6 · {MODULES[n].nom}</p>
            <h2 className="lc-h2" id={`${etape.id}-titre`}><Words text={etape.titre} /></h2>
            <p className="lc-step-method">
              <span>Dans la méthode</span> {MODULES[n].texte} On en repart avec {MODULES[n].remis}.
            </p>
          </div>

          <div className="lc-step-body">
            <dl className="lc-step-why" data-reveal>
              <div data-rise style={order(0)}><dt>Pour Thomas</dt><dd>{etape.fait}</dd></div>
              <div data-rise style={order(1)}><dt>Pourquoi</dt><dd>{etape.pourquoi}</dd></div>
              <div data-rise style={order(2)}><dt>Où on en est</dt><dd>{etape.place}</dd></div>
            </dl>

            <div className="lc-step-out" data-reveal>
              {etape.id === 'selectionner' ? (
                <div className="lc-source" data-rise>
                  <p className="lc-source-label">La source retenue</p>
                  <h3>{SOURCE.titre}</h3>
                  <p>{SOURCE.auteur} · {SOURCE.media} · {SOURCE.date}</p>
                  <p className="lc-source-note">
                    Environ 650 mots, en accès libre. La version anglaise est la traduction, publiée
                    par {SOURCE.media}, d’un article d’abord paru en espagnol.
                  </p>
                  <a className="lc-btn lc-btn--ink" href={SOURCE.url} target="_blank" rel="noreferrer">
                    Lire l’article sur {SOURCE.media}
                  </a>
                </div>
              ) : null}

              {etape.id === 'produire' ? (
                <div className="lc-listen" data-rise>
                  <p className="lc-source-label">Le dialogue audio</p>
                  <h3>Le dialogue audio : une réunion du lundi, deux voix, 1 min 37</h3>
                  <LecteurAudio src={AUDIO} script={script} />
                  <p className="lc-source-note">
                    Texte écrit par le formateur, voix produites par l’outil Audio du Studio.
                    Dans le script, touchez une réplique pour l’écouter.
                  </p>
                </div>
              ) : null}

              {etape.docs.length > 0 ? (
                <ul className="lc-sheets">
                  {etape.docs.map((doc, k) => (
                    <Carte key={doc.fichier} doc={doc} n={k} ouvrir={setOuvert} />
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {etape.id === 'produire' ? (
            <div className="lc-table lc-rules" data-reveal>
              <table>
                <caption>De l’article à l’audio : les cinq idées, et ce qu’on en entend.</caption>
                <thead>
                  <tr><th scope="col">Dans l’article</th><th scope="col">Dans la réunion enregistrée</th></tr>
                </thead>
                <tbody>
                  {regles.map((ligne) => (
                    <tr key={ligne.regle}><th scope="row">{ligne.regle}</th><td>{ligne.audio}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}

      <section className="lc-wrap" aria-labelledby="bilan-titre">
        <div className="lc-tile lc-tile--sand lc-bilan" data-reveal>
          <h2 className="lc-h2" id="bilan-titre"><Words text="Un besoin, six modules, neuf documents et un audio." mark="neuf documents et un audio" /></h2>
          <p className="lc-lead">
            C’est ce parcours que chaque formateur refait pendant la formation, avec un de ses
            vrais apprenants.
          </p>
        </div>
      </section>

      <Lecteur doc={ouvert} onClose={() => setOuvert(null)} />
    </div>
  );
}
