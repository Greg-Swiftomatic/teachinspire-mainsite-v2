import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Download,
  FastForward,
  FileAudio2,
  Mic2,
  Play,
  Podcast,
  Rewind,
  Trophy,
  Workflow,
  Youtube,
} from 'lucide-react';
import './FormationPipelineWorkbench.css';

interface FormationPipelineWorkbenchProps {
  prefersReducedMotion: boolean;
}

function SourceCard({ isFocused, isDimmed }: { isFocused: boolean; isDimmed: boolean }) {
  return (
    <article
      className={[
        'fwb-card fwb-card-source',
        isFocused ? 'card-focus' : '',
        isDimmed ? 'is-dimmed' : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <div className="fwb-card-header">
        <div className="fwb-seal seal-gold">01</div>
        <div>
          <h3 className="fwb-card-title">Source</h3>
          <p className="fwb-card-subtitle">Entrée du pipeline</p>
        </div>
      </div>

      <div className="fwb-card-body">
        <div className="fwb-source-grid">
          <div className="fwb-source-tile" aria-label="Source YouTube">
            <Youtube size={28} />
            <span>YouTube</span>
          </div>
          <div className="fwb-source-tile" aria-label="Source Spotify">
            <Podcast size={28} />
            <span>Spotify</span>
          </div>
        </div>

        <div className="fwb-file-pill">
          <div className="fwb-file-icon">
            <FileAudio2 size={18} />
          </div>
          <div>
            <p className="fwb-file-name">Conference_B1.mp3</p>
            <p className="fwb-file-state">Pret pour analyse</p>
          </div>
        </div>

        <div className="fwb-secondary-btn">Changer de source</div>
      </div>
    </article>
  );
}

function PipelineCard({ isFocused, isDimmed }: { isFocused: boolean; isDimmed: boolean }) {
  return (
    <article
      className={[
        'fwb-card fwb-card-pipeline',
        isFocused ? 'card-focus' : '',
        isDimmed ? 'is-dimmed' : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <div className="fwb-card-header">
        <div className="fwb-seal seal-rust">02</div>
        <div>
          <h3 className="fwb-card-title">AI Pipeline</h3>
          <p className="fwb-card-subtitle">Moteur neuronal</p>
        </div>
        <Workflow className="fwb-header-icon" size={20} />
      </div>

      <div className="fwb-card-body fwb-pipeline-body">
        <div className="fwb-meter-group">
          <div className="fwb-meter-row">
            <div>
              <span>Transcription</span>
              <strong>100%</strong>
            </div>
            <div className="fwb-meter-track">
              <div className="fwb-meter-fill w-100" />
            </div>
          </div>
          <div className="fwb-meter-row">
            <div>
              <span>Analyse pedagogique</span>
              <strong>85%</strong>
            </div>
            <div className="fwb-meter-track">
              <div className="fwb-meter-fill w-85" />
            </div>
          </div>
          <div className="fwb-meter-row">
            <div>
              <span>Generation de contenu</span>
              <strong>40%</strong>
            </div>
            <div className="fwb-meter-track">
              <div className="fwb-meter-fill w-40" />
            </div>
          </div>
        </div>

        <div className="fwb-terminal" role="status" aria-live="polite">
          <p className="log-ok">&gt; [SYSTEM] Extraction terminologique…</p>
          <p>&gt; [AI] Mapping lexical niveau B1/B2…</p>
          <p className="log-pulse">&gt; [GENERATION] Structuration exercices…</p>
        </div>
      </div>
    </article>
  );
}

function OutputCard({ isFocused, isDimmed }: { isFocused: boolean; isDimmed: boolean }) {
  return (
    <article
      className={[
        'fwb-card fwb-card-output',
        isFocused ? 'card-focus' : '',
        isDimmed ? 'is-dimmed' : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <div className="fwb-card-header">
        <div className="fwb-seal seal-gold">03</div>
        <div>
          <h3 className="fwb-card-title">Resultat</h3>
          <p className="fwb-card-subtitle">Sortie etudiante</p>
        </div>
        <Trophy className="fwb-header-icon" size={20} />
      </div>

      <div className="fwb-card-body fwb-output-body">
        <div className="fwb-player">
          <p className="fwb-player-title">Lecon: Expressions idiomatiques</p>

          <div className="fwb-player-scrub">
            <div className="fwb-player-progress" />
            <span className="fwb-player-thumb" />
          </div>

          <div className="fwb-player-controls">
            <Rewind size={18} />
            <span className="fwb-play-btn" aria-hidden="true">
              <Play size={18} />
            </span>
            <FastForward size={18} />
          </div>
        </div>

        <div className="fwb-downloads">
          <div className="fwb-download-btn">
            <Download size={14} />
            <span>Lexique.pdf</span>
          </div>
          <div className="fwb-download-btn">
            <Download size={14} />
            <span>Pratique.pdf</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FormationPipelineWorkbench({
  prefersReducedMotion,
}: FormationPipelineWorkbenchProps) {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  });
  const [focusedCard, setFocusedCard] = useState<1 | 2 | 3 | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    clearTimer();
    setFocusedCard(null);
    setShowStatus(false);
  }, [clearTimer]);

  const setAutoResume = useCallback(() => {
    clearTimer();
    resumeTimer.current = window.setTimeout(() => {
      setFocusedCard(null);
      setShowStatus(false);
      resumeTimer.current = null;
    }, 5000);
  }, [clearTimer]);

  useEffect(() => {
    const onResize = () => {
      const nextIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(nextIsDesktop);

      if (!nextIsDesktop) {
        clearTimer();
        setFocusedCard(null);
        setShowStatus(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const shouldLoop = isDesktop && !prefersReducedMotion;

  const wrapperClasses = useMemo(
    () =>
      [
        'fwb-wrapper',
        shouldLoop ? 'is-looping' : '',
        focusedCard !== null && shouldLoop ? 'is-paused' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [focusedCard, shouldLoop]
  );

  const onCardActivate = useCallback(
    (cardId: 1 | 2 | 3) => {
      if (!shouldLoop) return;

      if (focusedCard === cardId) {
        resume();
        return;
      }

      setFocusedCard(cardId);
      setShowStatus(true);
      setAutoResume();
    },
    [focusedCard, resume, setAutoResume, shouldLoop]
  );

  return (
    <div className="fwb-shell" aria-label="Pipeline de transformation interactive">
      <div className={wrapperClasses}>
        <button
          type="button"
          className="fwb-hitbox hitbox-1"
          onClick={() => onCardActivate(1)}
          aria-label="Etape 1: Source"
          aria-pressed={focusedCard === 1}
        >
          <span className="sr-only">Focus carte Source</span>
        </button>

        <button
          type="button"
          className="fwb-hitbox hitbox-2"
          onClick={() => onCardActivate(2)}
          aria-label="Etape 2: AI Pipeline"
          aria-pressed={focusedCard === 2}
        >
          <span className="sr-only">Focus carte AI Pipeline</span>
        </button>

        <button
          type="button"
          className="fwb-hitbox hitbox-3"
          onClick={() => onCardActivate(3)}
          aria-label="Etape 3: Resultat"
          aria-pressed={focusedCard === 3}
        >
          <span className="sr-only">Focus carte Resultat</span>
        </button>

        <div id="fwb-card-1" className="fwb-card-wrap">
          <SourceCard isFocused={focusedCard === 1} isDimmed={focusedCard !== null && focusedCard !== 1} />
        </div>

        <div id="fwb-card-2" className="fwb-card-wrap">
          <PipelineCard isFocused={focusedCard === 2} isDimmed={focusedCard !== null && focusedCard !== 2} />
        </div>

        <div id="fwb-card-3" className="fwb-card-wrap">
          <OutputCard isFocused={focusedCard === 3} isDimmed={focusedCard !== null && focusedCard !== 3} />
        </div>
      </div>

      <p className={`fwb-status ${showStatus ? 'is-visible' : ''}`}>
        Animation en pause. Reprise automatique dans 5s.
      </p>

      <div className="fwb-workbench-meta" aria-hidden="true">
        <div>
          <Mic2 size={15} />
          <span>15 modules</span>
        </div>
        <div>
          <Workflow size={15} />
          <span>-90% prep</span>
        </div>
        <div>
          <Trophy size={15} />
          <span>OPCO</span>
        </div>
      </div>
    </div>
  );
}
