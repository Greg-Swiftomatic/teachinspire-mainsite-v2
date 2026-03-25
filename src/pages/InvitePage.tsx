import { motion } from 'framer-motion';
import { Play, Check, ArrowRight } from 'lucide-react';
import { PageMeta } from '../components/seo/PageMeta';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CALENDLY_URL = 'https://cal.com/teachinspire.me';
const VIDEO_URL = 'https://customer-y3j8jz0c4eop5wt4.cloudflarestream.com/eaa14f9ff1fc5d4e87fe22ae3f932d6f/watch';

const previewPoints = [
  'Le ton et la pédagogie de la formation',
  'La manière dont chaque vidéo est structurée',
  'Le niveau de précision attendu dans le programme complet',
];

const courseIncludes = [
  '15 tutoriels vidéo pour donner des bases solides à vos formateurs',
  '6 à 8 sessions live adaptées à votre équipe et à vos cas concrets',
  'Une méthode transférable, pensée pour rester utile malgré l’évolution rapide des outils',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
        {children}
      </span>
      <div className="flex-1 h-px bg-navy/10" />
    </div>
  );
}

export function InvitePage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  return (
    <main className="bg-cream min-h-screen relative overflow-hidden">
      <PageMeta
        title="Aperçu privé — TeachInspire"
        description="Premier aperçu vidéo non listé de la formation TeachInspire pour instituts de langues."
        path="/invite"
        noindex
      />
      <GridOverlay />

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16"
          >
            <div className="lg:col-span-5">
              <motion.div variants={fadeInUp}>
                <SectionLabel>Aperçu privé</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy leading-[1.05] tracking-tight mb-6"
              >
                Un premier extrait du{' '}
                <span className="text-rust">programme complet</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-navy/70 leading-relaxed mb-6"
              >
                Cette page vous permet de voir le tout premier module vidéo et d’évaluer
                le niveau, le ton et la clarté de la formation.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="border border-navy/10 bg-white p-6 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-5 h-5 text-rust" aria-hidden="true" />
                  <p className="text-sm uppercase tracking-[0.18em] text-rust font-medium">
                    Ce que vous verrez dans cette vidéo
                  </p>
                </div>

                <ul className="space-y-3">
                  {previewPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-navy/75">
                      <span className="text-sage mt-0.5">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" href="/formation" showArrow>
                  Voir le programme complet
                </Button>
                <Button variant="secondary" size="lg" href={CALENDLY_URL} showArrow>
                  Réserver un appel
                </Button>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <div className="bg-white border border-navy/10 p-3 sm:p-4">
                <div className="aspect-video bg-navy/5 border border-navy/10 overflow-hidden">
                  <iframe
                    src={VIDEO_URL}
                    title="TeachInspire — aperçu privé de la formation"
                    className="w-full h-full"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <section className="mb-16">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <SectionLabel>Dans la suite</SectionLabel>
                <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
                  Ce que contient la formation complète
                </h2>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
                className="lg:col-span-8 space-y-4"
              >
                {courseIncludes.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-5 border border-navy/10 bg-white"
                  >
                    <span className="text-rust font-display text-lg font-semibold flex-shrink-0 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-navy/80">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="bg-navy text-cream p-8 lg:p-10 relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-yellow block mb-5">
                  Prochaine étape
                </span>
                <h2 className="text-3xl lg:text-4xl font-display font-semibold leading-tight mb-4">
                  Si cet aperçu vous parle, le plus simple est d’en discuter.
                </h2>
                <p className="text-cream/70 text-lg leading-relaxed max-w-2xl">
                  Je peux vous montrer comment la formation s’adapte à votre équipe,
                  à vos contraintes et à vos objectifs pédagogiques.
                </p>
              </div>

              <div className="lg:col-span-5 lg:pl-6">
                <div className="border border-cream/10 bg-cream/5 p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-cream/80">
                      Appel découverte de 15 minutes pour voir si la formation est adaptée
                      à votre institut.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                  <Button variant="cta" size="lg" href={CALENDLY_URL} showArrow>
                    Réserver un appel découverte
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact" className="border-cream/20 text-cream hover:bg-cream/10 hover:border-cream/40 focus-visible:ring-cream focus-visible:ring-offset-navy">
                    Poser une question
                  </Button>
                </div>

                <a
                  href="/formation"
                  className="inline-flex items-center gap-2 text-cream/70 hover:text-yellow transition-colors mt-6"
                >
                  <span>Consulter la page formation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
