import { motion } from 'framer-motion';
import { PageMeta } from '../components/seo/PageMeta';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { KineticHeading } from '../components/animation/KineticHeading';
import { GeometricAccentGroup } from '../components/animation/GeometricAccentGroup';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CALENDLY_URL = 'https://cal.com/teachinspire.me';
const EMAIL = 'greg@teachinspire.me';
const CONTACT_CONVERSATION_ILLUSTRATION = '/illustrations/contact-conversation.png';

export function ContactPage() {
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
        title="Contactez TeachInspire | Réserver un appel"
        description="Discutons de vos besoins en formation IA pour votre institut de langues. Réservez un appel gratuit ou envoyez-nous un message."
        path="/contact"
      />
      <GridOverlay />
      <GeometricAccentGroup preset="contact-hero" />

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column - Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-5"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                  Contact
                </span>
              </motion.div>

              <KineticHeading
                variant="cascade"
                as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy mb-6 leading-[1.1] tracking-tight"
              >
                Parlons de votre projet
              </KineticHeading>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-navy/70 leading-relaxed"
              >
                Vous avez des questions sur la formation ?
                Vous voulez savoir si c'est adapté à votre institut ?
              </motion.p>

              <motion.img
                variants={fadeInUp}
                src={CONTACT_CONVERSATION_ILLUSTRATION}
                alt=""
                width={1536}
                height={1024}
                className="mt-10 w-full max-w-[520px] object-contain lg:mt-14"
                aria-hidden="true"
                loading="eager"
              />
            </motion.div>

            {/* Right Column - Contact Options */}
            <div className="lg:col-span-7">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Main CTA Card */}
                <motion.div
                  variants={fadeInUp}
                  className="border-l-2 border-rust py-8 pl-8 lg:py-10 lg:pl-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-display font-bold text-navy/10" aria-hidden="true">01</span>
                    <div className="h-px flex-1 bg-navy/10" />
                  </div>

                  <h2 className="text-2xl font-display font-semibold text-navy mb-3">
                    Réserver un appel découverte
                  </h2>

                  <p className="text-navy/70 mb-2">
                    45 minutes pour discuter de vos besoins et voir comment on peut vous aider.
                  </p>

                  <p className="text-sm text-navy-light mb-6">
                    Sans engagement
                  </p>

                  <Button variant="primary" size="lg" href={CALENDLY_URL} showArrow>
                    Réserver un appel (45 min)
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1 h-px bg-navy/10" />
                  <span className="text-navy/40 text-sm">ou</span>
                  <div className="flex-1 h-px bg-navy/10" />
                </motion.div>

                {/* Email Alternative */}
                <motion.div
                  variants={fadeInUp}
                  className="border-l-2 border-sage py-8 pl-8 lg:py-10 lg:pl-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-display font-bold text-navy/10" aria-hidden="true">02</span>
                    <div className="h-px flex-1 bg-navy/10" />
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-navy mb-3">
                    Écrivez-moi directement
                  </h3>

                  <a
                    href={`mailto:${EMAIL}`}
                  className="mb-2 inline-flex min-h-11 items-center text-lg font-medium text-rust transition-colors hover:text-rust-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    {EMAIL}
                  </a>

                  <p className="text-sm text-navy-light mb-6">
                    Je réponds généralement sous 24h.
                  </p>

                  <Button
                    variant="secondary"
                    size="md"
                    href={`mailto:${EMAIL}`}
                    showArrow
                  >
                    Envoyer un email
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
            className="mt-20 pt-8 border-t border-navy/10"
          >
            <p className="text-sm text-navy-light">
              TeachInspire — Formation IA pour l'enseignement des langues
            </p>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
