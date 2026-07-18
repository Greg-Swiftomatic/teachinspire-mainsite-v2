import { motion } from 'framer-motion';
import { PageMeta } from '../components/seo/PageMeta';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { GeometricAccentGroup } from '../components/animation/GeometricAccentGroup';
import { useReducedMotion } from '../hooks/useReducedMotion';

import { BOOKING_URL } from '../assets/assets';

const CALENDLY_URL = BOOKING_URL;
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
        description="Parlons de vos formateurs, de vos contraintes et de la place que l'IA peut prendre dans votre institut de langues."
        path="/contact"
      />
      <GridOverlay />
      <GeometricAccentGroup preset="contact-hero" />

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid w-full max-w-full gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column - Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full max-w-[calc(100vw-2rem)] min-w-0 lg:col-span-5 lg:max-w-none"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                  Contact
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-3xl min-[390px]:text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy mb-6 leading-[1.1] tracking-tight break-words"
              >
                Parlons de votre{' '}
                <span className="block sm:inline">projet</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="max-w-[calc(100vw-2rem)] break-words text-lg leading-relaxed text-navy/70 sm:text-xl lg:max-w-xl"
              >
                Vous voulez cadrer l'IA.
                <br />
                Parlons de votre équipe.
              </motion.p>

              <motion.img
                variants={fadeInUp}
                src={CONTACT_CONVERSATION_ILLUSTRATION}
                alt=""
                width={1536}
                height={1024}
                className="mt-10 w-full max-w-[calc(100vw-2rem)] object-contain lg:mt-14 lg:max-w-[520px]"
                aria-hidden="true"
                loading="eager"
              />
            </motion.div>

            {/* Right Column - Contact Options */}
            <div className="w-full max-w-[calc(100vw-2rem)] min-w-0 lg:col-span-7 lg:max-w-none">
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
                    15 minutes.
                    <br />
                    Vos outils et vos cours.
                  </p>

                  <p className="text-sm text-navy-light mb-6">
                    Sans engagement. Sans relance insistante.
                  </p>

                  <Button variant="primary" size="lg" href={CALENDLY_URL} showArrow>
                    Réserver un appel (15 min)
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
              TeachInspire, formation IA pour formateurs de langues
            </p>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
