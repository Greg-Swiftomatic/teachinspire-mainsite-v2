import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileText, ListChecks, Podcast } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Container } from '../layout/Container';
import { GridOverlay } from '../ui/GridOverlay';

const FORMATION_BOUNDARY_ILLUSTRATION = '/illustrations/formation-boundary.png';

const steps = [
  {
    number: '01',
    title: 'Source réelle',
    text: 'Vidéo, podcast, article ou document métier. On part du matériau réel des apprenants.',
    icon: Podcast,
    detail: 'Transcription · contexte · vocabulaire',
  },
  {
    number: '02',
    title: 'Traitement cadré',
    text: "L'IA propose. Le formateur contrôle le niveau, les objectifs, la progression et les erreurs possibles.",
    icon: ListChecks,
    detail: 'CECRL · registre · charge cognitive',
  },
  {
    number: '03',
    title: 'Support exploitable',
    text: 'La séquence finale reste relue, adaptée et validée avant d’arriver en classe.',
    icon: FileText,
    detail: 'Fiche prof · fiche élève · audio',
  },
];

export function Possibility() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: {
            duration: 0.45,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section id="methode" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <GridOverlay />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div className="lg:col-span-5" {...reveal(0)}>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-rust" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-rust">
                La méthode TeachInspire
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
              De la source au <span className="text-rust">cours complet</span>,
              avec validation humaine.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-light">
              L'IA trie, reformule et propose. Le formateur garde les critères :
              niveau, progression, erreurs possibles, contexte métier.
            </p>

            <motion.img
              src={FORMATION_BOUNDARY_ILLUSTRATION}
              alt=""
              width={1536}
              height={1024}
              className="mt-10 hidden w-full max-w-[420px] object-contain lg:block"
              aria-hidden="true"
              loading="lazy"
              {...reveal(0.12)}
            />
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid gap-px bg-navy/10 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.number}
                    className="bg-white p-6 lg:p-8"
                    {...reveal(0.12 + index * 0.08)}
                  >
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="font-display text-5xl font-bold leading-none text-navy/10">
                        {step.number}
                      </span>
                      <Icon className="mt-1 h-5 w-5 text-rust" aria-hidden="true" />
                    </div>

                    <h3 className="font-display text-xl font-semibold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-navy-light">
                      {step.text}
                    </p>

                    <div className="mt-8 border-t border-navy/10 pt-4">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy/60">
                        {step.detail}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              className="mt-8 border-l-2 border-rust bg-white p-6 lg:p-8"
              {...reveal(0.35)}
            >
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-rust">
                    Le garde-fou
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold leading-tight text-navy">
                    L'IA accélère la conception. Le formateur valide la qualité.
                  </p>
                </div>

                <Link
                  to="/formation"
                  className="inline-flex min-h-11 items-center justify-center gap-3 border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
                >
                  Voir le programme
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-6 grid gap-px bg-navy/10 sm:grid-cols-3">
                {['Déléguer', 'Contrôler', 'Valider'].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-cream px-4 py-3">
                    <Check className="h-4 w-4 text-rust" aria-hidden="true" />
                    <span className="text-sm font-medium text-navy">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
