import type { ReactNode } from 'react';
import './home-sections.css';
import './home-quality.css';

const questions = [
  'quelle source utiliser ;',
  'quelles informations conserver ;',
  'comment adapter le contenu au niveau ;',
  'comment construire une progression ;',
  'comment vérifier le résultat ;',
  'comment transformer une sortie IA en véritable support de cours.',
];

const steps = [
  ['01', 'Trouver et analyser la bonne source', "Repérer le vocabulaire, les situations professionnelles et les éléments réellement utiles pour l'apprenant."],
  ['02', 'Définir la destination du cours', "Clarifier le niveau, l'objectif, la tâche finale et les critères de réussite."],
  ['03', "Piloter l'IA avec des critères pédagogiques", 'Donner des instructions plus précises, choisir le bon outil et reprendre la main au bon moment.'],
  ['04', 'Construire la progression', "Créer les étapes nécessaires pour conduire l'apprenant jusqu'à une production réaliste."],
  ['05', 'Produire et vérifier les supports', 'Fiche apprenant, guide formateur, activités, audio, corrigés et documents prêts à être utilisés.'],
];

const gains = [
  'des pratiques plus cohérentes entre formateurs ;',
  'des supports mieux adaptés aux demandes des clients ;',
  'une capacité de production pédagogique plus rapide ;',
  'des critères de qualité partagés ;',
  'une bibliothèque de séquences réutilisables ;',
  "davantage d'autonomie face aux outils qui évoluent.",
];

function SectionHeading({ number, eyebrow, children, intro }: { number: string; eyebrow: string; children: ReactNode; intro?: string }) {
  return <header className="mp-section-heading" data-scroll-reveal="up">
    <span className="mp-section-number">{number}</span>
    <div><p className="mp-section-label">{eyebrow}</p><h2>{children}</h2>{intro && <p className="mp-section-intro">{intro}</p>}</div>
  </header>;
}

export function SituationSection() {
  return <section className="mp-home-section mp-situation" id="situation">
    <div className="mp-section-shell">
      <SectionHeading number="01" eyebrow="La situation">Vos formateurs utilisent déjà l'IA. Chacun construit encore sa <em>propre</em> méthode.</SectionHeading>
      <div className="mp-situation-layout">
        <div className="mp-situation-copy" data-scroll-reveal="left"><p>Certains obtiennent de bons résultats. D'autres accumulent les prompts, changent d'outil chaque semaine ou passent autant de temps à corriger qu'ils espéraient en gagner.</p><p>La difficulté se trouve rarement dans l'accès aux outils. Elle apparaît au moment de décider :</p><p className="mp-situation-conclusion">TeachInspire donne à l'équipe une démarche commune pour répondre à ces questions.</p></div>
        <ol className="mp-question-sheet" data-scroll-reveal="right">{questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, '0')}</span>{question}</li>)}</ol>
        <aside className="mp-margin-note" data-scroll-reveal="scale">Ce n'est pas une question d'outil.<br /><u>C'est une question de méthode.</u></aside>
      </div>
    </div>
  </section>;
}

export function TransformationSection() {
  return <section className="mp-home-section mp-transformation" id="formation">
    <div className="mp-section-shell mp-transform-shell">
      <div className="mp-transform-copy">
        <header className="mp-transform-heading" data-scroll-reveal="up">
          <div className="mp-transform-kicker"><span>02</span><p className="mp-section-label">La transformation</p></div>
          <h2>De la ressource brute au cours <em>prêt pour la classe</em></h2>
          <p className="mp-section-intro">Une interview métier, une vidéo spécialisée ou un document interne contient souvent exactement le contexte dont un apprenant a besoin. Le travail commence lorsqu'il faut transformer cette matière en cours cohérent.</p>
        </header>
        <p className="mp-transform-lead" data-scroll-reveal="up">Avec la méthode TeachInspire, vos formateurs apprennent à :</p>
        <ol className="mp-transform-steps" data-scroll-stagger="75">{steps.map(([number, title, copy]) => <li key={number} data-scroll-item><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
        <p className="mp-transform-result" data-scroll-reveal="up">Une séquence personnalisée qui demandait environ trois heures se prépare, une fois la méthode cadrée, en une trentaine de minutes — relecture comprise.</p>
        <a className="mp-transform-cta" href="/formation" data-scroll-reveal="up">Découvrir le programme de formation <span>→</span></a>
      </div>
      <div className="mp-transform-stage" data-scroll-reveal="right" aria-label="Trois sources réelles passent par la méthode TeachInspire pour devenir une séquence prête pour la classe">
        <div className="mp-transform-grid-paper" aria-hidden="true" />
        <div className="mp-transform-sources">
          <article className="mp-transform-source mp-transform-source--article"><span>ARTICLE MÉTIER</span><b>01</b><i /><i /><i /><i /><em /></article>
          <article className="mp-transform-source mp-transform-source--podcast"><span>PODCAST</span><div className="mp-transform-wave" aria-hidden="true">{[13, 27, 18, 38, 24, 46, 30, 19, 41, 25, 34, 16, 29].map((height, index) => <i key={index} style={{ height }} />)}</div><b>▶</b></article>
          <article className="mp-transform-source mp-transform-source--document"><span>DOCUMENT INTERNE</span><div className="mp-transform-table" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div></article>
        </div>
        <svg className="mp-transform-join" viewBox="0 0 620 92" fill="none" aria-hidden="true"><path d="M74 5C92 47 185 42 274 82M310 5V82M546 5C528 47 435 42 346 82" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M274 82L264 72M274 82L259 82M310 82L301 70M310 82L319 70M346 82L356 72M346 82L361 82" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        <div className="mp-transform-method"><span>MÉTHODE</span><strong>TeachInspire</strong><i /><i /></div>
        <svg className="mp-transform-down" viewBox="0 0 48 78" fill="none" aria-hidden="true"><path d="M22 4C31 27 16 40 24 69M24 69L15 58M24 69L33 57" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="mp-transform-output"><span className="mp-transform-output-tape">SÉQUENCE PRÊTE</span><div className="mp-transform-output-pages"><article><b>FICHE</b><i /><i /><i /></article><article className="mp-transform-output-audio"><div className="mp-transform-wave" aria-hidden="true">{[9, 19, 28, 15, 35, 23, 31, 12, 26].map((height, index) => <i key={index} style={{ height }} />)}</div></article><article><b>GUIDE</b><i /><i /><i /></article></div></div>
      </div>
    </div>
  </section>;
}

export function InstituteResultSection() {
  return <section className="mp-home-section mp-library">
    <div className="mp-section-shell">
      <header className="mp-library-heading" data-scroll-reveal="up">
        <div className="mp-library-anchor"><span>03</span><strong>Ce qui reste<br />après la formation</strong></div>
        <div><p className="mp-section-label">Résultat pour l'institut</p><h2>Une équipe capable de produire, adapter et <em>vérifier</em> ses propres ressources</h2></div>
      </header>
      <div className="mp-library-quiet-layout">
        <div className="mp-library-archive" data-scroll-reveal="left" aria-label="Bibliothèque pédagogique de l'institut, 47 ressources réutilisables">
          <div className="mp-library-files" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index}><span>{String(index + 1).padStart(2, '0')}</span></i>)}</div>
          <div className="mp-library-drawer"><strong>Bibliothèque pédagogique<br />de l'institut</strong><span>47 ressources réutilisables</span></div>
        </div>
        <div className="mp-library-copy" data-scroll-reveal="right"><p>À la fin du parcours, vos formateurs disposent d'un workflow commun. Ils savent créer des cours à partir de sources réelles, y compris lorsqu'ils travaillent avec des secteurs professionnels qu'ils connaissent encore peu.</p><p>L'institut gagne :</p><ul>{gains.map(gain => <li key={gain}><span>✓</span>{gain}</li>)}</ul></div>
      </div>
    </div>
  </section>;
}

const ecosystem = [
  ['teachinspire.me', "Comprendre l'approche et choisir une offre", 'Le site présente la méthode, la formation pour les équipes et le parcours individuel.'],
  ['studio.teachinspire.me', 'Créer des prompts, des écoutes et des documents', 'Trois ateliers spécialisés aident les formateurs à transformer leurs intentions pédagogiques en supports concrets.'],
  ['community.teachinspire.me', 'Continuer à progresser', "L'e-learning, les échanges, les office hours et la veille permettent de rester à jour et de confronter ses pratiques."],
];

const workshops = [
  ['01', 'Prompts · Promptomatik', "Décrivez votre besoin pédagogique : niveau, public, objectif, contexte, type de résultat. Promptomatik pose quelques questions complémentaires, puis construit un prompt clair, structuré et prêt à copier dans ChatGPT, Claude, Gemini ou AI Studio.", 'prompt'],
  ['02', 'Audio', "Créez une écoute adaptée au niveau de vos apprenants. Choisissez les voix, les accents, le rythme, l'intention et le nombre de locuteurs, puis récupérez un fichier MP3 utilisable en classe.", 'audio'],
  ['03', 'Documents', 'Transformez un article, une transcription ou un plan de cours en supports imprimables avec activités, corrigés et export PDF.', 'documents'],
];

export function EcosystemStudioSection() {
  const [promptomatik, audio, documents] = workshops;
  return <section className="mp-home-section mp-system" id="studio"><div className="mp-section-shell mp-system-shell">
    <header className="mp-system-heading" data-scroll-reveal="up"><p className="mp-system-eyebrow"><span>04</span> — L'écosystème</p><h2>La formation transmet la méthode.<br />Le Studio l'installe dans le <em>quotidien</em>.</h2><p>TeachInspire réunit trois espaces complémentaires.</p></header>
    <div className="mp-system-ecosystem" data-scroll-stagger="90">{ecosystem.map(([title, role, copy], index) => <article key={title} data-scroll-item><span>0{index + 1}</span><div><h3>{title}</h3><strong>{role}</strong><p>{copy}</p></div></article>)}</div>
    <div className="mp-studio-panel" id="studio-workshops" data-scroll-reveal="scale">
      <header className="mp-studio-panel-heading"><div><p><span>05</span> — Le Studio</p><h3>Trois ateliers conçus autour des tâches réelles des formateurs</h3></div><a href="https://studio.teachinspire.me">Découvrir TeachInspire Studio <span>→</span></a></header>
      <div className="mp-tool-grid" data-scroll-stagger="110">
        <article className="mp-tool-card mp-tool-card--prompt" data-scroll-item><span className="mp-tool-number">{promptomatik[0]}</span><div className="mp-tool-copy"><h4>{promptomatik[1]}</h4><p>{promptomatik[2]}</p></div><div className="mp-tool-prompt-flow" aria-hidden="true"><span>BESOIN</span><i /><b>→</b><span>PROMPT</span></div><a href="https://studio.teachinspire.me">Essayer Promptomatik gratuitement <span>→</span></a></article>
        <article className="mp-tool-card mp-tool-card--audio" data-scroll-item><span className="mp-tool-number">{audio[0]}</span><div className="mp-tool-copy"><h4>{audio[1]}</h4><p>{audio[2]}</p></div><div className="mp-tool-wave" aria-hidden="true">{[18, 35, 52, 30, 62, 42, 25, 48, 71, 44, 32, 56, 38, 24, 51, 67, 36, 26, 59, 41, 22].map((height, index) => <i key={index} style={{ height }} />)}</div><div className="mp-tool-output" aria-hidden="true"><span>SCRIPT</span><i /><b>→</b><span>MP3</span></div></article>
        <article className="mp-tool-card mp-tool-card--documents" data-scroll-item><span className="mp-tool-number">{documents[0]}</span><div className="mp-tool-copy"><h4>{documents[1]}</h4><p>{documents[2]}</p></div><div className="mp-tool-document-flow" aria-hidden="true"><div><b /><i /><i /><i /><span>SOURCE</span></div><strong>→</strong><div><em>PDF</em><span>PDF</span></div></div></article>
      </div>
    </div>
  </div></section>;
}

const boundaries = [
  ["À déléguer à l'outil", "Transcription, reformulation, adaptation d'un niveau, variantes d'exercices, premiers jets et préparation technique des documents."],
  ['À contrôler', 'Niveau CECRL, registre, progression, charge cognitive, cohérence, exactitude et qualité des consignes.'],
  ['À garder côté formateur', "Diagnostic, objectifs, choix pédagogiques, adaptation fine au groupe, feedback sensible et relation avec l'apprenant."],
];

export function BoundarySection() {
  return <section className="mp-home-section mp-boundary"><div className="mp-section-shell"><p className="mp-section-label" data-scroll-reveal="up">Le cadre pédagogique</p><h2 data-scroll-reveal="up">Ce que l'IA prépare. Ce que le formateur vérifie. Ce qui reste une <em>décision humaine</em>.</h2><p data-scroll-reveal="up">TeachInspire aide chaque équipe à tracer cette frontière.</p><div className="mp-boundary-columns" data-scroll-stagger="100">{boundaries.map(([title, copy], index) => <article key={title} data-scroll-item><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="mp-boundary-conclusion" data-scroll-reveal="up">Les outils évolueront. Le jugement pédagogique restera le point de référence.</p></div></section>;
}

export function ProofSection() {
  return <section className="mp-home-section mp-proof"><div className="mp-section-shell"><p className="mp-section-label" data-scroll-reveal="up">Sur le terrain</p><figure data-scroll-reveal="scale"><span className="mp-quote-mark">“</span><blockquote>Je suis étonnée d'entendre des situations qu'on vit vraiment au travail.</blockquote><figcaption>Retour d'une DRH, après une séquence créée avec la méthode pour un traiteur éthique en pleine internationalisation — un secteur que la formatrice ne connaissait pas.</figcaption><b>TESTÉ EN INSTITUT</b></figure></div></section>;
}

const offers = [
  { eyebrow: 'Découvrir gratuitement', title: 'Promptomatik', copy: 'Testez la méthode de construction des prompts à partir de vos propres besoins pédagogiques.', bullets: ['5 générations par jour', '3 prompts sauvegardés', 'Sans carte bancaire'], cta: 'Essayer gratuitement', href: 'https://studio.teachinspire.me' },
  { eyebrow: 'Se former individuellement', title: 'Parcours formateur indépendant', copy: "Suivez la formation complète en e-learning, accédez aux trois ateliers du Studio pendant 6 mois et participez aux office hours deux fois par mois.", bullets: ['Formation complète en e-learning', 'Studio pendant 6 mois', 'Communauté et office hours pendant 6 mois'], note: 'Cohorte de septembre : 490 € HT en tarif fondateur (590 € ensuite). La formation peut être suivie en français ou en anglais.', cta: "Rejoindre la liste d'attente", href: '/offre' },
  { eyebrow: 'Former une équipe', title: 'Programme institut', copy: 'Installez une méthode commune dans votre équipe avec 6 webinaires dédiés, du coaching sur vos cas réels et un espace privé dans la communauté.', bullets: ['À partir de 4 200 € HT', "Jusqu'à 10 formateurs (au-delà : 250 € HT par formateur supplémentaire)", 'Studio et communauté pendant 12 mois', 'Certifié Qualiopi — financement OPCO'], note: 'La formation peut être animée en français ou en anglais.', cta: 'Réserver un appel découverte', href: 'https://scheduler.zoom.us/greg-le-dall/decouverte' },
];

export function OffersSection() {
  return <section className="mp-home-section mp-offers" id="offres"><div className="mp-section-shell"><SectionHeading number="06" eyebrow="Les offres">Trois façons d'entrer dans l'écosystème <em>TeachInspire</em></SectionHeading><div className="mp-offer-grid" data-scroll-stagger="100">{offers.map((offer, index) => <article key={offer.title} className={index === 2 ? 'mp-offer-featured' : ''} data-scroll-item><span className="mp-offer-index">0{index + 1}</span><p className="mp-offer-eyebrow">{offer.eyebrow}</p><h3>{offer.title}</h3><p>{offer.copy}</p><ul>{offer.bullets.map(item => <li key={item}>✓ {item}</li>)}</ul>{offer.note && <p className="mp-offer-note">{offer.note}</p>}<a href={offer.href}>{offer.cta} <span>→</span></a></article>)}</div></div></section>;
}

function ArchitectureBoard() {
  const wave = [12, 20, 9, 25, 16, 30, 13, 22, 8, 27, 17, 24, 11, 19, 7, 23, 14];
  return <div className="mp-architecture" aria-hidden="true">
    <div className="mp-architecture-backing" />
    <div className="mp-architecture-board">
      <span className="mp-architecture-tab">SUR MESURE <i /></span>
      <svg className="mp-architecture-route" viewBox="0 0 620 650" fill="none"><path d="M220 99C214 138 221 153 270 155C306 157 332 166 332 197L337 297L337 405C337 463 349 481 413 483C474 485 492 492 500 535" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /><path d="M500 535L484 516M500 535L516 514" stroke="currentColor" strokeWidth="8" strokeLinecap="square" /></svg>
      <div className="mp-architecture-stages">
        <section className="mp-architecture-stage"><div className="mp-stage-rail"><b>1</b><strong>ANALYSE</strong><p>Comprendre les besoins et le contexte</p></div><div className="mp-analysis-card"><div className="mp-analysis-icon"><span /><i /></div><div><strong>Analyse des besoins</strong><p>Objectifs, publics, contraintes, enjeux et opportunités</p></div></div></section>
        <section className="mp-architecture-stage"><div className="mp-stage-rail"><b>2</b><strong>ARCHITECTURE</strong><p>Concevoir le parcours et les activités</p></div><div className="mp-module-grid"><article><strong>Parcours pédagogique</strong><div className="mp-module-path"><i /><i /><i /></div></article><article><strong>Activités d'apprentissage</strong><div className="mp-module-checks"><i /><i /><i /></div></article><article><strong>Évaluation et suivi</strong><div className="mp-module-chart"><i /><span /><span /><span /></div></article></div></section>
        <section className="mp-architecture-stage"><div className="mp-stage-rail"><b>3</b><strong>RESSOURCES</strong><p>Produire les contenus et supports</p></div><div className="mp-resource-grid"><article className="mp-resource-sheet"><strong>Fiche d'activité</strong><b /><i /><i /><i /><span>✓</span></article><article className="mp-resource-audio"><strong>Ressource audio</strong><div>{wave.map((height, index) => <i key={index} style={{ height }} />)}</div><b>▶</b></article><article className="mp-resource-guide"><strong>Guide enseignant et scénario</strong><div className="mp-guide-book"><i /><i /><i /></div></article></div></section>
        <section className="mp-architecture-stage"><div className="mp-stage-rail"><b>4</b><strong>DÉPLOIEMENT</strong><p>Déployer et accompagner l'adoption</p></div><div className="mp-deployment-card"><div className="mp-rocket">↗</div><div><strong>Déploiement</strong><p>Intégration, formation, suivi et amélioration continue</p></div></div><div className="mp-team-symbol"><i /><i /><i /></div></section>
      </div>
    </div>
    <div className="mp-architecture-legend"><strong>ANALYSE</strong><span>→ ARCHITECTURE</span><span>→ RESSOURCES</span><span>→ DÉPLOIEMENT</span></div>
  </div>;
}

export function BespokeSection() {
  return <section className="mp-home-section mp-bespoke"><div className="mp-section-shell"><div data-scroll-reveal="left"><ArchitectureBoard /></div><div className="mp-bespoke-copy" data-scroll-reveal="right"><p className="mp-section-label">Sur mesure</p><h2>Vous construisez un parcours ou une solution pédagogique <em>plus large</em> ?</h2><p>TeachInspire accompagne aussi les organismes dans la conception de parcours, de ressources et d'environnements pédagogiques intégrant l'IA.</p><p>Cette offre peut inclure : l'analyse des besoins, l'architecture du parcours, la conception des activités, la production des ressources, l'intégration d'outils IA, la création d'un environnement personnalisé et l'accompagnement au déploiement.</p><a className="mp-link-cta" href="/contact">Parler d'un projet sur mesure <span>→</span></a></div></div></section>;
}

export function FinalCtaSection() {
  return <section className="mp-home-section mp-final" id="contact"><div className="mp-section-shell" data-scroll-stagger="120"><div data-scroll-item><p className="mp-section-label">Dernier appel à l'action</p><h2>Vos outils sont peut-être déjà en place. Il reste à construire la <em>manière</em> de les utiliser.</h2></div><div data-scroll-item><p>Pendant l'appel découverte, nous regardons les pratiques actuelles de votre équipe, les types de cours qu'elle prépare et les résultats que vous souhaitez obtenir. Vous repartez avec une première lecture de la situation, même si nous ne travaillons pas ensemble.</p><a className="mp-primary" href="https://scheduler.zoom.us/greg-le-dall/decouverte">Réserver un appel découverte <span>→</span></a></div></div></section>;
}

export function TeachInspireHomeSections() {
  return <><SituationSection /><TransformationSection /><InstituteResultSection /><EcosystemStudioSection /><BoundarySection /><ProofSection /><OffersSection /><BespokeSection /><FinalCtaSection /></>;
}
