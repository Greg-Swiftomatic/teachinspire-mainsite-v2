import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

const CALENDLY_URL = 'https://cal.com/greg-teachinspire/decouverte-teachinspire';
const EMAIL = 'greg@teachinspire.me';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function ContactPage() {
  return (
    <section className="bg-cream min-h-screen relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-navy"
            style={{ left: `${(i + 1) * (100 / 12)}%` }}
          />
        ))}
      </div>

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

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy mb-6 leading-[1.1] tracking-tight"
              >
                Parlons de{' '}
                <span className="text-rust">votre projet</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-navy/70 leading-relaxed"
              >
                Vous avez des questions sur la formation ?
                Vous voulez savoir si c'est adapté à votre institut ?
              </motion.p>
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
                  className="bg-white p-8 lg:p-10 border border-navy/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-display font-bold text-navy/10">01</span>
                    <div className="h-px flex-1 bg-navy/10" />
                  </div>

                  <h2 className="text-2xl font-display font-semibold text-navy mb-3">
                    Réserver un appel découverte
                  </h2>

                  <p className="text-navy/70 mb-2">
                    45 minutes pour discuter de vos besoins et voir comment on peut vous aider.
                  </p>

                  <p className="text-sm text-navy/50 mb-6">
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
                  className="bg-white p-8 lg:p-10 border border-navy/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-display font-bold text-navy/10">02</span>
                    <div className="h-px flex-1 bg-navy/10" />
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-navy mb-3">
                    Écrivez-moi directement
                  </h3>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-rust hover:text-rust-dark transition-colors text-lg font-medium block mb-2"
                  >
                    {EMAIL}
                  </a>

                  <p className="text-sm text-navy/50 mb-6">
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
            transition={{ delay: 0.6 }}
            className="mt-20 pt-8 border-t border-navy/10"
          >
            <p className="text-navy/40 text-sm">
              TeachInspire — Formation IA pour l'enseignement des langues
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
