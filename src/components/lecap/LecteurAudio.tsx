import { useRef, useState, type CSSProperties } from 'react';

// The meeting audio of the demonstration course, with its own player: the shape of the
// recording, who is speaking, and the script that follows along. PEAKS and the start of
// each turn were measured on the file itself (96 slices; seconds).
const DUREE = 96.72;
const PEAKS = [0.67, 0.57, 0.41, 0.62, 0.64, 0.48, 0.41, 0.66, 0.42, 0.56, 0.52, 0.57, 0.66, 0.51, 0.58, 0.4, 0.56, 0.41, 0.49, 0.54, 0.58, 0.75, 0.37, 0.73, 0.54, 0.63, 0.62, 0.52, 0.65, 0.64, 0.49, 0.62, 0.58, 0.6, 0.72, 0.44, 0.63, 0.47, 0.57, 0.83, 0.6, 0.78, 0.79, 0.58, 0.79, 0.53, 0.61, 0.56, 0.62, 0.72, 0.61, 0.75, 0.58, 0.55, 0.47, 0.48, 0.63, 0.76, 0.68, 0.56, 0.61, 0.67, 0.7, 1.0, 0.68, 0.6, 0.56, 0.5, 0.47, 0.65, 0.69, 0.41, 0.63, 0.65, 0.53, 0.59, 0.63, 0.63, 0.49, 0.37, 0.59, 0.34, 0.58, 0.6, 0.48, 0.6, 0.7, 0.56, 0.41, 0.58, 0.4, 0.71, 0.73, 0.57, 0.54, 0.53];
const DEBUTS = [0.36, 23.14, 31.99, 34.54, 38.64, 46.8, 47.85, 59.91, 62.22, 67.11, 69.28, 90.61, 91.75];

const VOIX = [
  { nom: 'Rachel', role: 'anime la réunion' },
  { nom: 'Ben', role: 'fait le point' },
];

const minutes = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const hauteur = (p: number) => ({ '--h': (0.18 + 0.82 * ((p - 0.34) / 0.66)).toFixed(2) }) as CSSProperties;

export function LecteurAudio({ src, script }: { src: string; script: [string, string][] }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [joue, setJoue] = useState(false);
  const [t, setT] = useState(0);

  const tour = DEBUTS.reduce((trouve, debut, k) => (t >= debut ? k : trouve), -1);
  const quiParle = joue && tour >= 0 ? script[tour][0] : null;

  const basculer = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => undefined);
    else a.pause();
  };
  const aller = (seconde: number) => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = seconde;
    setT(seconde);
  };

  return (
    <div className="lc-player">
      <audio
        ref={audio}
        src={src}
        preload="none"
        onPlay={() => setJoue(true)}
        onPause={() => setJoue(false)}
        onEnded={() => setJoue(false)}
        onTimeUpdate={(event) => setT(event.currentTarget.currentTime)}
      />

      <div className="lc-player-top">
        <button type="button" className="lc-player-play" onClick={basculer} aria-label={joue ? 'Mettre en pause' : 'Écouter la réunion'}>
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            {joue ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /> : <path d="M8 5v14l11-7z" fill="currentColor" />}
          </svg>
        </button>

        <div className="lc-player-main">
          <div className="lc-player-wave">
            <div className="lc-player-bars" aria-hidden="true">
              {PEAKS.map((p, k) => (
                <i key={k} style={hauteur(p)} className={(k + 0.5) / PEAKS.length <= t / DUREE ? 'est-joue' : undefined} />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={DUREE}
              step={0.1}
              value={t}
              onChange={(event) => aller(Number(event.target.value))}
              aria-label="Position dans l’audio"
              aria-valuetext={`${minutes(t)} sur ${minutes(DUREE)}`}
            />
          </div>
          <p className="lc-player-time"><span>{minutes(t)}</span><span>{minutes(DUREE)}</span></p>
        </div>
      </div>

      <ul className="lc-player-voices">
        {VOIX.map((voix) => (
          <li key={voix.nom} className={quiParle === voix.nom ? 'est-actif' : undefined}>
            <i aria-hidden="true"><b /><b /><b /></i>
            <span><strong>{voix.nom}</strong> {voix.role}</span>
          </li>
        ))}
      </ul>

      <details>
        <summary>Lire le script<span aria-hidden="true" /></summary>
        <ol className="lc-script" lang="en">
          {script.map(([qui, texte], k) => (
            <li key={k} className={tour === k && t > 0 ? 'est-ici' : undefined}>
              <button type="button" onClick={() => { aller(DEBUTS[k]); if (audio.current?.paused) basculer(); }}>
                <strong>{qui}</strong>
                <span>{texte}</span>
              </button>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
