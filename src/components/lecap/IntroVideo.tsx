import { useEffect, useRef, useState } from 'react';

const VIDEO = '/videos/introduction-teachinspire.mp4';
const POSTER = '/videos/introduction-teachinspire-poster.webp';

// The introduction video. Nothing loads or plays until the visitor presses the button;
// it then opens over the page and closes with the button, Escape or a click outside.
export function IntroVideo() {
  const [ouverte, setOuverte] = useState(false);
  const dialogue = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const d = dialogue.current;
    if (!d) return;
    if (ouverte && !d.open) {
      d.showModal();
      void video.current?.play().catch(() => undefined);
    }
    if (!ouverte && d.open) d.close();
  }, [ouverte]);

  return (
    <>
      <button type="button" className="lc-video" onClick={() => setOuverte(true)}>
        <img src={POSTER} alt="" width={1280} height={720} fetchPriority="high" decoding="async" />
        <span className="lc-video-label">
          <span className="lc-video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span>
            <strong>Regarder la vidéo</strong>
            <small>La méthode expliquée par Greg, en 90&nbsp;secondes</small>
          </span>
        </span>
      </button>

      <dialog
        ref={dialogue}
        className="lc-video-dialog"
        aria-label="Vidéo de présentation de TeachInspire"
        onClose={() => setOuverte(false)}
        onClick={(event) => {
          if (event.target === dialogue.current) setOuverte(false);
        }}
      >
        <button type="button" className="lc-btn lc-btn--yellow lc-btn--small lc-video-close" onClick={() => setOuverte(false)}>
          Fermer la vidéo
        </button>
        {ouverte ? (
          <video ref={video} src={VIDEO} poster={POSTER} controls playsInline preload="auto" width={1280} height={720} />
        ) : null}
      </dialog>
    </>
  );
}
