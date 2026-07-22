import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Clock3,
  CreditCard,
  FileCheck2,
  Play,
  SlidersHorizontal,
  Target,
  X,
  type LucideIcon,
} from 'lucide-react';
import { HERO_VIDEO_EMBED, BOOKING_URL } from '../../assets/assets';
import { Button } from '../ui/Button';
import './approved-home.css';
import './approved-home-sections.css';
import './approved-home-responsive.css';

interface VideoDialogProps {
  open: boolean;
  onClose: () => void;
}

interface IconItem {
  icon: LucideIcon;
  tone: 'sage' | 'yellow' | 'rust';
  title: string;
  text: string;
}

const responsibilities: IconItem[] = [
  {
    icon: Target,
    tone: 'sage',
    title: 'Cadrer',
    text: "Définir l'objectif, le contexte et les consignes.",
  },
  {
    icon: FileCheck2,
    tone: 'yellow',
    title: 'Vérifier',
    text: 'Contrôler les sources, les faits et la pertinence.',
  },
  {
    icon: SlidersHorizontal,
    tone: 'rust',
    title: 'Adapter',
    text: 'Ajuster au niveau, au temps et à la réalité de la classe.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Source réelle',
    text: "Podcast, article ou document métier : vous partez d'un contenu authentique.",
  },
  {
    number: '02',
    title: 'Traitement cadré',
    text: "L'IA transforme l'idée en structure de cours selon vos objectifs, contexte et consignes.",
  },
  {
    number: '03',
    title: 'Support exploitable',
    text: 'Vous obtenez une séquence claire, adaptée et prête à animer.',
  },
];

const weeklyResults: IconItem[] = [
  {
    icon: Clock3,
    tone: 'sage',
    title: 'Moins de temps sur la préparation',
    text: 'Plusieurs heures récupérées chaque semaine.',
  },
  {
    icon: BookOpen,
    tone: 'yellow',
    title: 'Des cours plus spécialisés',
    text: 'Des séquences mieux connectées aux besoins réels des apprenants.',
  },
  {
    icon: CreditCard,
    tone: 'rust',
    title: "Moins d'outils, plus d'impact",
    text: "Moins d'abonnements inutiles, plus de clarté pour l'équipe.",
  },
];

function VideoDialog({ open, onClose }: VideoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="ref-video-dialog"
      aria-labelledby="ref-video-title"
      onClose={onClose}
      onCancel={onClose}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="ref-video-frame">
        <button
          type="button"
          className="ref-video-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Fermer la vidéo"
        >
          <X aria-hidden="true" />
        </button>
        <h2 id="ref-video-title" className="sr-only">
          La méthode TeachInspire en 90 secondes
        </h2>
        {open && (
          <iframe
            src={`${HERO_VIDEO_EMBED}&player[autoplay]=true`}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title="TeachInspire : présentation vidéo"
          />
        )}
      </div>
    </dialog>
  );
}

function IconList({ items, className }: { items: IconItem[]; className: string }) {
  return (
    <div className={className}>
      {items.map(({ icon: Icon, tone, title, text }) => (
        <article key={title}>
          <span className={`ref-icon ref-icon--${tone}`} aria-hidden="true">
            <Icon />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ApprovedHome() {
  const [videoOpen, setVideoOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeVideo() {
    setVideoOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <section className="ref-hero" aria-labelledby="ref-hero-title">
        <div className="ref-shell ref-hero-grid">
          <div className="ref-hero-copy" data-scroll-reveal="left">
            <p className="ref-eyebrow"><span aria-hidden="true" />Formation IA · Instituts de langues</p>
            <h1 id="ref-hero-title">
              Formez vos équipes à créer des cours IA{' '}
              <em>à partir de sources réelles</em>
            </h1>
            <p className="ref-hero-intro">
              À partir d&apos;un podcast, d&apos;un article ou d&apos;un document métier, vos formateurs apprennent à produire une séquence exploitable, relue et adaptée avant la classe.
            </p>
            <p className="ref-promise">Le gain de temps reste sous contrôle pédagogique.</p>
            <div className="ref-actions">
              <Button variant="primary" size="lg" href={BOOKING_URL} showArrow>
                Cadrer l&apos;usage IA de mon équipe
              </Button>
              <Button variant="secondary" size="lg" href="#methode">
                Voir la méthode
              </Button>
            </div>
          </div>

          <figure className="ref-hero-art" data-scroll-reveal="right">
            <button
              ref={triggerRef}
              type="button"
              className="ref-video-trigger-zone"
              onClick={() => setVideoOpen(true)}
              aria-label="Regarder la vidéo de présentation (90 secondes)"
            >
              <picture>
                <source
                  srcSet="/images/homepage/hero-collage-alpha-900.webp 900w, /images/homepage/hero-collage-alpha-1536.webp 1536w"
                  sizes="(max-width: 900px) 96vw, 62vw"
                  type="image/webp"
                />
                <img
                  src="/images/homepage/hero-collage-alpha-1536.webp"
                  width="1536"
                  height="1024"
                  alt=""
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <span className="ref-hero-label ref-hero-label--one" aria-hidden="true">Objectif</span>
              <span className="ref-hero-label ref-hero-label--two" aria-hidden="true">Contexte</span>
              <span className="ref-hero-label ref-hero-label--three" aria-hidden="true">Consigne</span>
              <span className="ref-video-trigger" aria-hidden="true">
                <Play />
                <span className="ref-video-trigger-copy">
                  <strong>Regarder la vidéo</strong>
                  <small>La méthode en 90 secondes</small>
                </span>
              </span>
            </button>
            <div className="ref-hero-mobile-tags" aria-label="La méthode cadre trois éléments">
              <span>Objectif</span>
              <span>Contexte</span>
              <span>Consigne</span>
            </div>
            <figcaption>Découvrez TeachInspire en 90 secondes</figcaption>
          </figure>
        </div>
      </section>

      <section className="ref-boundary" aria-labelledby="ref-boundary-title">
        <div className="ref-boundary-grid">
          <article className="ref-boundary-problem" data-scroll-reveal="left">
            <div className="ref-boundary-inner">
              <h2 id="ref-boundary-title">La frontière à garder en tête</h2>
              <p className="ref-section-lead">L&apos;IA propose. L&apos;humain décide.</p>
              <figure className="ref-problem-art">
                <picture>
                  <source
                    srcSet="/images/homepage/problem-collage-alpha-800.webp 800w, /images/homepage/problem-collage-alpha-1448.webp 1448w"
                    sizes="(max-width: 820px) 96vw, 48vw"
                    type="image/webp"
                  />
                  <img
                    src="/images/homepage/problem-collage-alpha-1448.webp"
                    width="1448"
                    height="1086"
                    alt="Une génération automatique entourée de documents dispersés et non vérifiés"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="ref-note ref-note--one">Contenus<br />génériques</span>
                <span className="ref-note ref-note--two">Consignes<br />floues</span>
                <span className="ref-note ref-note--three">Ressources<br />non vérifiées</span>
                <span className="ref-note ref-note--four">Plans<br />passe-partout</span>
                <span className="ref-note ref-note--five">Pas d&apos;adaptation<br />au niveau</span>
                <ul className="ref-problem-mobile-notes" aria-label="Risques sans cadre humain">
                  <li>Contenus génériques</li>
                  <li>Consignes floues</li>
                  <li>Ressources non vérifiées</li>
                  <li>Plans passe-partout</li>
                  <li>Pas d&apos;adaptation au niveau</li>
                </ul>
                <figcaption>Sans cadre humain, le résultat est bruyant, générique et peu exploitable.</figcaption>
              </figure>
            </div>
          </article>

          <article className="ref-boundary-human" data-scroll-reveal="right">
            <div className="ref-boundary-inner">
              <h2>De la source au cours complet, avec validation humaine.</h2>
              <p className="ref-section-lead">Trois responsabilités clés restent humaines.</p>
              <IconList items={responsibilities} className="ref-responsibility-list" />
            </div>
          </article>
          <div className="ref-torn-seam" aria-hidden="true" />
        </div>
      </section>

      <section className="ref-process" id="methode" aria-labelledby="ref-process-title">
        <div className="ref-shell">
          <h2 id="ref-process-title" data-scroll-reveal="up">Comment ça fonctionne</h2>
          <picture className="ref-process-art" data-scroll-reveal="scale" aria-hidden="true">
            <source
              srcSet="/images/homepage/method-blended-alpha-1024.webp 1024w, /images/homepage/method-blended-alpha-2048.webp 2048w"
              sizes="94vw"
              type="image/webp"
            />
            <img src="/images/homepage/method-blended-alpha-2048.webp" width="2048" height="768" alt="" loading="lazy" decoding="async" />
          </picture>
          <div className="ref-process-grid" data-scroll-stagger="90">
            {processSteps.map((step, index) => (
              <article key={step.number} data-scroll-item>
                <div className={`ref-process-step-art ref-process-step-art--${index + 1}`} aria-hidden="true">
                  <img
                    src="/images/homepage/method-blended-alpha-1024.webp"
                    width="1024"
                    height="384"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ref-results" aria-labelledby="ref-results-title">
        <div className="ref-shell ref-results-grid">
          <div data-scroll-reveal="left">
            <h2 id="ref-results-title">Ce que ça change dans la semaine</h2>
            <IconList items={weeklyResults} className="ref-results-list" />
          </div>
          <picture className="ref-results-art" data-scroll-reveal="right">
            <source
              srcSet="/images/homepage/results-blended-alpha-900.webp 900w, /images/homepage/results-blended-alpha-1672.webp 1672w"
              sizes="(max-width: 820px) 96vw, 58vw"
              type="image/webp"
            />
            <img
              src="/images/homepage/results-blended-alpha-1672.webp"
              width="1672"
              height="941"
              alt="Un planning hebdomadaire avec des supports prêts et du temps de préparation récupéré"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </section>

      <section className="ref-conviction" aria-labelledby="ref-conviction-title">
        <div className="ref-shell" data-scroll-reveal="up">
          <h2 id="ref-conviction-title">L&apos;IA comme <em>assistant,</em>{' '}<br />pas comme remplaçant.</h2>
          <p>Le cœur du métier reste humain : comprendre, choisir, adapter, accompagner.</p>
          <span aria-hidden="true" />
        </div>
      </section>

      <section className="ref-final" aria-labelledby="ref-final-title">
        <div className="ref-shell ref-final-grid" data-scroll-stagger="100">
          <div data-scroll-item>
            <h2 id="ref-final-title">Prêt à former vos équipes&nbsp;?</h2>
            <p>Réservez un appel de 15&nbsp;minutes pour en parler et voir si TeachInspire est fait pour vous.</p>
          </div>
          <div className="ref-actions" data-scroll-item>
            <Button variant="primary" size="lg" href={BOOKING_URL} showArrow>
              Cadrer l&apos;usage IA de mon équipe
            </Button>
            <Button variant="secondary" size="lg" href="#methode">
              Voir la méthode
            </Button>
          </div>
        </div>
      </section>

      <VideoDialog open={videoOpen} onClose={closeVideo} />
    </>
  );
}
