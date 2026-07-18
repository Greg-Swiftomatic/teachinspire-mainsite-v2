import type { CSSProperties, ComponentType, SVGProps } from 'react';
import {
  CalendarDays,
  CirclePlay,
  FileCheck2,
  FileText,
  FolderOpen,
  MessageSquareText,
  Mic2,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import { Button } from '../ui/Button';
import {
  audienceItems,
  CAL_URL,
  deliveryFormats,
  prices,
  programme,
  tools,
} from './formation-content';
import './approved-formation.css';
import './approved-formation-sections.css';
import './approved-formation-responsive.css';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const toolIcons: Icon[] = [MessageSquareText, Mic2, FileText];
const deliveryIcons: Icon[] = [CirclePlay, UsersRound, FileCheck2, FolderOpen];

const tutorialMarkers = [11, 15, 20, 24, 29, 38, 42, 47, 51, 55, 64, 68, 73, 77, 81];
const liveMarkers = [14, 28, 41, 53, 66, 76, 86];
const deliverableMarkers = [30, 58, 86];

function ArtPicture({
  name,
  small,
  large,
  width,
  height,
  eager = false,
}: {
  name: string;
  small: number;
  large: number;
  width: number;
  height: number;
  eager?: boolean;
}) {
  return (
    <picture>
      <source
        srcSet={`/images/formation/${name}-${small}.webp ${small}w, /images/formation/${name}-${large}.webp ${large}w`}
        sizes="(max-width: 900px) 96vw, 58vw"
        type="image/webp"
      />
      <img
        src={`/images/formation/${name}-${large}.webp`}
        width={width}
        height={height}
        alt=""
        aria-hidden="true"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

function HeroSection() {
  return (
    <section className="form-hero" aria-labelledby="form-hero-title">
      <div className="form-shell form-hero-grid">
        <div className="form-hero-copy" data-scroll-reveal="left">
          <p className="form-eyebrow"><span aria-hidden="true" />Formation IA pour instituts · 3 mois</p>
          <h1 id="form-hero-title">
            N&apos;importe quelle vidéo, podcast ou document devient{' '}
            <em>un cours sur mesure.</em>
          </h1>
          <p className="form-hero-intro">
            En 3 mois, vos formateurs maîtrisent une méthode complète : choisir une source
            authentique, l&apos;adapter au niveau de l&apos;apprenant, produire tous les supports.
            Avec n&apos;importe quelle IA.
          </p>
          <p className="form-proof">
            <strong>15 tutoriels vidéo</strong><span aria-hidden="true">·</span>
            <strong>6 à 8 sessions live</strong><span aria-hidden="true">·</span>
            <strong>TeachInspire Studio inclus</strong>
          </p>
          <div className="form-actions">
            <Button variant="primary" size="lg" href="#programme" showArrow>
              Voir le programme
            </Button>
            <Button variant="secondary" size="lg" href={CAL_URL}>
              Parler de votre équipe
            </Button>
          </div>
          <p className="form-practical">À partir de 4&nbsp;200&nbsp;€&nbsp;HT · Financement OPCO possible</p>
        </div>

        <figure className="form-hero-art" data-scroll-reveal="right">
          <ArtPicture
            name="formation-hero"
            small={900}
            large={1536}
            width={1536}
            height={1024}
            eager
          />
        </figure>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="form-audience" aria-labelledby="form-audience-title">
      <div className="form-shell form-audience-grid">
        <div className="form-section-heading" data-scroll-reveal="left">
          <span className="form-rule" aria-hidden="true" />
          <h2 id="form-audience-title">Cette formation est faite pour votre équipe si…</h2>
        </div>
        <ul className="form-audience-list" data-scroll-reveal="right">
          {audienceItems.map((item, index) => (
            <li key={item.emphasis}>
              <span className={`form-arrow form-tone-${['sage', 'yellow', 'rust', 'navy'][index]}`} aria-hidden="true">→</span>
              <p>{item.before}<strong>{item.emphasis}</strong>{item.after}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProgrammeSection() {
  return (
    <section id="programme" className="form-programme" aria-labelledby="form-programme-title">
      <div className="form-shell">
        <div className="form-programme-heading" data-scroll-reveal="up">
          <span className="form-rule" aria-hidden="true" />
          <h2 id="form-programme-title">Le programme, mois par mois</h2>
        </div>
        <div className="form-programme-list">
          {programme.map((module, index) => (
            <article
              className={`form-module form-module-${module.tone}`}
              data-reverse={index % 2 === 1 ? 'true' : undefined}
              key={module.number}
            >
              <div className="form-module-copy" data-scroll-reveal={index % 2 ? 'right' : 'left'}>
                <p className="form-module-kicker"><span>{module.number}</span>{module.month}</p>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <p className="form-outcome"><strong>Ils repartent avec :</strong> {module.outcome}</p>
              </div>
              <figure className="form-module-art" data-scroll-reveal={index % 2 ? 'left' : 'right'}>
                <ArtPicture
                  name={module.image}
                  small={720}
                  large={1200}
                  width={1200}
                  height={800}
                />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="form-tools" aria-labelledby="form-tools-title">
      <div className="form-shell">
        <div className="form-tools-heading" data-scroll-reveal="up">
          <span className="form-rule" aria-hidden="true" />
          <h2 id="form-tools-title">Les outils inclus dans la formation</h2>
          <p>
            La méthode s&apos;apprend sur des IA ouvertes (Gemini, ChatGPT, Claude) et s&apos;applique
            dans n&apos;importe laquelle. Pour la production, vos formateurs utilisent TeachInspire
            Studio : trois ateliers construits pour les cas d&apos;usage réels d&apos;un enseignant.
          </p>
        </div>
        <div className="form-tools-grid">
          <figure className="form-studio-shot" data-scroll-reveal="left">
            <picture>
              <source
                srcSet="/images/formation/formation-studio-800.webp 800w, /images/formation/formation-studio-1400.webp 1400w"
                sizes="(max-width: 900px) 96vw, 58vw"
                type="image/webp"
              />
              <img
                src="/images/formation/formation-studio-1400.webp"
                width="1400"
                height="894"
                alt="Le tableau de bord TeachInspire Studio avec les ateliers Prompts, Audio et Documents"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>
          <div className="form-tool-list" data-scroll-reveal="right">
            {tools.map((tool, index) => {
              const ToolIcon = toolIcons[index];
              return (
                <article key={tool.name}>
                  <span className={`form-tool-icon form-tone-${tool.tone}`} aria-hidden="true"><ToolIcon /></span>
                  <div><h3>{tool.name}</h3><p>{tool.text}</p></div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="form-tools-close">
          Des outils équivalents existent, et on vous les montre. Le Studio reste le chemin le
          plus simple : une infrastructure stable, qui ne change pas d&apos;interface au milieu de
          votre formation, et vos contenus restent les vôtres.
        </p>
        <aside className="form-audio-included">
          <span>Inclus</span>
          <p><strong>60&nbsp;minutes de génération audio par mois, pendant 6&nbsp;mois.</strong><br />Au-delà, des crédits supplémentaires sont disponibles à 9&nbsp;€ les 60&nbsp;minutes.</p>
        </aside>
      </div>
    </section>
  );
}

function Marker({ x, type }: { x: number; type: 'tutorial' | 'live' | 'deliverable' }) {
  const Icon = type === 'tutorial' ? CirclePlay : type === 'live' ? UsersRound : FileText;
  return (
    <span
      className={`form-marker form-marker-${type}`}
      style={{ '--marker-x': `${x}%` } as CSSProperties}
      aria-hidden="true"
    ><Icon /></span>
  );
}

function DeliverySection() {
  return (
    <section className="form-delivery" aria-labelledby="form-delivery-title">
      <div className="form-shell">
        <h2 id="form-delivery-title" data-scroll-reveal="up">Comment la formation se déroule</h2>
        <ul className="form-delivery-legend" aria-label="15 tutoriels, 6 à 8 sessions live, 3 livrables et 1 espace d'équipe">
          {[[CirclePlay, '15 tutoriels', 'sage'], [UsersRound, '6 à 8 sessions live', 'yellow'], [FileText, '3 livrables', 'rust'], [FolderOpen, "1 espace d'équipe", 'navy']].map(([LegendIcon, label, tone]) => {
            const IconComponent = LegendIcon as Icon;
            return <li key={label as string}><i className={`form-tone-${tone}`} aria-hidden="true"><IconComponent /></i>{label as string}</li>;
          })}
        </ul>
        <figure className="form-schedule" data-scroll-reveal="up">
          <ArtPicture name="formation-schedule" small={900} large={1600} width={1600} height={800} />
          {tutorialMarkers.map((x) => <Marker key={`t-${x}`} x={x} type="tutorial" />)}
          {liveMarkers.map((x) => <Marker key={`l-${x}`} x={x} type="live" />)}
          {deliverableMarkers.map((x) => <Marker key={`d-${x}`} x={x} type="deliverable" />)}
        </figure>
        <div className="form-delivery-grid">
          {deliveryFormats.map((item, index) => {
            const DeliveryIcon = deliveryIcons[index];
            return (
              <article key={item.title}>
                <span className={`form-delivery-icon form-tone-${item.tone}`} aria-hidden="true"><DeliveryIcon /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PriceSection() {
  return (
    <section className="form-pricing" aria-labelledby="form-pricing-title">
      <div className="form-shell">
        <span className="form-rule" aria-hidden="true" />
        <h2 id="form-pricing-title">Le prix</h2>
        <div className="form-price-ledger">
          {prices.map((price) => (
            <article className={`form-price form-price-${price.tone}`} key={price.name}>
              <p className="form-price-number" aria-hidden="true">{price.number}<span /></p>
              <h3>{price.name}</h3>
              <p className="form-price-audience">{price.audience}</p>
              <p className="form-price-value">{price.price}</p>
              {price.detail && <p className="form-price-detail">{price.detail}</p>}
              <p className="form-price-text">{price.text}</p>
            </article>
          ))}
        </div>
        <div className="form-modalities">
          <p><CalendarDays aria-hidden="true" />Paiement en 3 fois sans frais.</p>
          <p><WalletCards aria-hidden="true" />Éligible budget formation et OPCO.</p>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="form-final" aria-labelledby="form-final-title">
      <div className="form-shell form-final-grid">
        <div className="form-final-copy">
          <span className="form-rule" aria-hidden="true" />
          <h2 id="form-final-title">On en parle ?</h2>
          <p>
            Un appel découverte de 15&nbsp;minutes, gratuit et sans engagement. Vous repartez avec un
            avis honnête sur ce que l&apos;IA peut apporter à votre équipe, que vous travailliez avec
            nous ou non.
          </p>
        </div>
        <div className="form-final-action">
          <p className="form-call-length"><CalendarDays aria-hidden="true" />15&nbsp;min</p>
          <Button variant="cta" size="lg" href={CAL_URL} showArrow>
            Réserver un appel découverte
          </Button>
          <p>Ou écrivez-moi : <a href="mailto:greg@teachinspire.me">greg@teachinspire.me</a> · Réponse sous 24&nbsp;h</p>
        </div>
      </div>
    </section>
  );
}

export function ApprovedFormation() {
  return (
    <div className="form-page">
      <HeroSection />
      <AudienceSection />
      <ProgrammeSection />
      <ToolsSection />
      <DeliverySection />
      <PriceSection />
      <FinalCTASection />
    </div>
  );
}
