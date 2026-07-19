import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { HERO_VIDEO_EMBED } from '../../assets/assets';
import { EditorialHighlight } from '../hero/EditorialHighlight';
import { HeroProofStrip } from '../hero/HeroProofStrip';
import { SourceFlowCollage } from '../hero/SourceFlowCollage';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

export function Hero() {
  const [showPlayer, setShowPlayer] = useState(false);
  const playerTriggerRef = useRef<HTMLButtonElement>(null);
  const playerDialogRef = useRef<HTMLDivElement>(null);
  const playerCloseRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const closePlayer = useCallback(() => setShowPlayer(false), []);

  useEffect(() => {
    if (!showPlayer) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => playerCloseRef.current?.focus());

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePlayer();
        return;
      }
      if (event.key !== 'Tab' || !playerDialogRef.current) return;

      const focusable = Array.from(
        playerDialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', keepFocusInside);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', keepFocusInside);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [closePlayer, showPlayer]);

  return (
    <section
      className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-cream"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(circle_at_center,rgba(44,61,87,0.08)_0_0.55px,transparent_0.75px)] [background-size:8px_8px]"
      />

      <Container size="wide" className="py-10 lg:py-12 xl:max-w-[94rem] xl:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-5 xl:gap-8">
          <div className="lg:col-span-5 xl:pr-3">
            <p
              className="relative mb-9 inline-block max-w-sm animate-fade-in-up text-xs font-semibold uppercase leading-[1.55] tracking-[0.16em] text-[var(--ti-sage-ink)] sm:text-sm motion-reduce:animate-none"
            >
              Formation IA et outils<br />de création pour les équipes pédagogiques
              <span className="absolute -bottom-2 left-0 h-px w-40 -rotate-2 bg-[#728878]" aria-hidden="true" />
            </p>

            <h1
              className="relative animate-fade-in-up font-display text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.025em] text-navy [animation-delay:80ms] sm:text-[clamp(3.25rem,4.2vw,4.3rem)] sm:leading-[0.96] motion-reduce:animate-none"
            >
              <svg className="absolute -left-9 top-2 hidden h-12 w-8 text-navy xl:block" viewBox="0 0 32 48" fill="none" aria-hidden="true">
                <path d="M27 7L17 18M29 23L14 25M23 39L11 32" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="block sm:whitespace-nowrap">Donnez à vos</span>
              <span className="block sm:whitespace-nowrap"><EditorialHighlight tone="sage">formateurs</EditorialHighlight></span>
              <span className="block sm:whitespace-nowrap">les moyens</span>
              <span className="block sm:whitespace-nowrap">de créer des cours</span>
              <span className="block sm:whitespace-nowrap">plus <EditorialHighlight tone="rust-underline">précis</EditorialHighlight>,</span>
              <span className="block sm:whitespace-nowrap">plus <EditorialHighlight tone="sage">actuels</EditorialHighlight></span>
              <span className="block sm:whitespace-nowrap">et mieux <EditorialHighlight tone="sage-underline">adaptés</EditorialHighlight></span>
            </h1>

            <p
              className="mt-8 max-w-[36rem] animate-fade-in-up text-base leading-[1.55] text-navy-light [animation-delay:160ms] sm:text-[1.05rem] motion-reduce:animate-none"
            >
              TeachInspire aide les instituts de langues à installer une méthode commune pour
              travailler avec l&apos;IA. Vos formateurs apprennent à transformer une vidéo, un
              podcast, un article ou un document métier en une séquence adaptée au niveau, au
              contexte et aux objectifs de leurs apprenants.
            </p>

            <p
              className="mt-4 max-w-xl animate-fade-in-up font-display text-lg italic leading-relaxed text-navy [animation-delay:220ms] sm:text-xl motion-reduce:animate-none"
            >
              Le temps de préparation diminue.<br />
              La qualité reste une{' '}
              <EditorialHighlight tone="sage">
                décision pédagogique.
              </EditorialHighlight>
            </p>

            <div
              className="mt-8 flex animate-fade-in-up flex-col gap-4 [animation-delay:280ms] sm:flex-row sm:items-center motion-reduce:animate-none"
            >
              <Button
                variant="cta"
                size="lg"
                href="https://scheduler.zoom.us/greg-le-dall/decouverte"
                showArrow
                className="shadow-[0_8px_20px_rgba(181,128,13,0.14)]"
              >
                Réserver un appel découverte
              </Button>
              <button
                ref={playerTriggerRef}
                type="button"
                onClick={() => setShowPlayer(true)}
                className="group inline-flex min-h-11 items-center justify-center gap-3 border-b border-navy/30 text-sm font-semibold text-navy transition-colors hover:border-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:justify-start"
              >
                Découvrir la méthode en 90 secondes
                <span className="grid size-9 place-items-center rounded-full border border-navy/25 transition-colors group-hover:bg-navy group-hover:text-cream">
                  <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
                </span>
              </button>
            </div>

            <div
              className="mt-8 animate-fade-in-up [animation-delay:340ms] motion-reduce:animate-none"
            >
              <HeroProofStrip />
            </div>

            <p
              className="mt-5 animate-fade-in-up text-sm text-navy-light [animation-delay:400ms] motion-reduce:animate-none"
            >
              Formateur indépendant ?{' '}
              <a
                href="/offre"
                className="inline-flex min-h-11 items-center font-semibold text-navy underline decoration-rust/60 underline-offset-4 transition-colors hover:text-rust"
              >
                → Découvrir le parcours individuel
              </a>
            </p>
          </div>

          <div
            className="relative animate-fade-in-up [animation-delay:180ms] lg:col-span-7 lg:-mr-7 lg:mt-4 xl:-mr-3 xl:-mt-1 motion-reduce:animate-none"
          >
            <SourceFlowCollage onPlay={() => setShowPlayer(true)} />
          </div>
        </div>
      </Container>

      {showPlayer && (
          <div
            className="fixed inset-0 z-[80] grid place-items-center bg-navy/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Présentation vidéo TeachInspire"
            aria-labelledby="hero-video-title"
            ref={playerDialogRef}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePlayer();
            }}
          >
            <div
              className="relative w-full max-w-5xl bg-navy"
            >
              <button
                ref={playerCloseRef}
                type="button"
                onClick={closePlayer}
                className="absolute -top-12 right-0 grid size-10 place-items-center text-cream transition-colors hover:text-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                aria-label="Fermer la vidéo"
              >
                <X aria-hidden="true" />
              </button>
              <h2 id="hero-video-title" className="sr-only">La méthode TeachInspire en 90 secondes</h2>
              <iframe
                src={`${HERO_VIDEO_EMBED}&player[autoplay]=true`}
                tabIndex={-1}
                className="aspect-video w-full"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ border: 0 }}
                title="TeachInspire : présentation vidéo"
              />
            </div>
          </div>
      )}
    </section>
  );
}
