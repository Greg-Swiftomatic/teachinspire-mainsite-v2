import { OUTILS } from './site';

// Small product windows drawn in HTML, as in the video: they play once when they enter the view.
const Pointer = ({ className }: { className: string }) => (
  <svg className={`lc-pointer ${className}`} viewBox="0 0 26 34" width="30" height="40" aria-hidden="true">
    <path d="M3 3L3 27L9.2 21.2L13.4 30.8L17.6 29L13.4 19.4L22 19.4Z" fill="var(--lc-ink)" stroke="var(--lc-white)" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const Bar = ({ title }: { title: string }) => (
  <div className="lc-win-bar"><i /><i /><i /><span>{title}</span></div>
);

// The principle, shown: the trainer asks, the AI prepares, the trainer decides.
export function ChatWindow() {
  return (
    <div className="lc-win lc-chatwin" data-reveal aria-hidden="true">
      <Bar title="Un assistant IA" />
      <div className="lc-chat">
        <p className="lc-chat-ask"><span>Pour Thomas, chef de projet, B1&nbsp;: animer la réunion du lundi.</span></p>
        <div className="lc-chat-answer">
          <strong>Séance&nbsp;: animer la réunion d’équipe</strong>
          <i /><i /><i />
        </div>
        <div className="lc-chat-foot">
          <span className="lc-chat-tag">L’IA prépare</span>
          <span className="lc-chat-ok">
            <b>Valider</b>
            <b>Validé par le formateur</b>
          </span>
        </div>
      </div>
      <Pointer className="lc-pointer--chat" />
    </div>
  );
}

function ToolArt({ ton }: { ton: (typeof OUTILS)[number]['ton'] }) {
  if (ton === 'prompts') return <span className="lc-ta lc-ta--prompts" aria-hidden="true"><i /><i /><i /></span>;
  if (ton === 'transcription') {
    return (
      <span className="lc-ta lc-ta--wave" aria-hidden="true">
        {[12, 26, 16, 32, 20, 28, 14, 24].map((h, n) => <i key={n} style={{ height: h, ['--i' as string]: n }} />)}
        <b>→</b><em />
      </span>
    );
  }
  if (ton === 'audio') {
    return (
      <span className="lc-ta lc-ta--voices" aria-hidden="true">
        <b>A</b><i /><b>B</b><i />
      </span>
    );
  }
  return <span className="lc-ta lc-ta--page" aria-hidden="true"><i /><b /><i /><i /></span>;
}

// The Studio and its four tools, each one at work.
export function StudioWindow() {
  return (
    <div className="lc-win lc-studiowin" data-reveal>
      <Bar title="TeachInspire Studio" />
      <ul>
        {OUTILS.map((outil, n) => (
          <li key={outil.nom} className={`lc-tool lc-tool--${outil.ton}`} style={{ ['--i' as string]: n }}>
            <strong>{outil.nom}</strong>
            <span>{outil.texte}</span>
            <ToolArt ton={outil.ton} />
          </li>
        ))}
      </ul>
      <Pointer className="lc-pointer--studio" />
    </div>
  );
}
