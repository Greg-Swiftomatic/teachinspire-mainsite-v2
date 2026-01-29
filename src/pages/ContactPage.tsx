import { motion } from 'framer-motion';
import { Calendar, Mail, MessageSquare, Clock } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MagicCard } from '../components/ui/MagicCard';

const CALENDLY_URL = 'https://cal.com/greg-teachinspire/decouverte-teachinspire';
const EMAIL = 'greg@teachinspire.me';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ContactPage() {
  return (
    <section className="bg-cream min-h-screen pt-32 pb-16 lg:pb-24">
      <Container size="narrow">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="sage" className="mb-6">
              Contact
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
          >
            Parlons de <span className="text-sage">votre projet</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy-light max-w-xl mx-auto"
          >
            Vous avez des questions sur la formation ou la plateforme ?
            Vous voulez savoir si c'est adapté à votre institut ?
          </motion.p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <MagicCard
            className="bg-white text-center"
            gradientColor="#f1d263"
            gradientOpacity={0.15}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-yellow/20 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Calendar className="w-10 h-10 text-yellow" />
            </motion.div>

            <h2 className="text-2xl font-bold font-display text-navy mb-3">
              Réserver un appel découverte
            </h2>

            <p className="text-navy-light mb-2">
              45 minutes pour discuter de vos besoins et voir comment on peut vous aider.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-navy-light/70 mb-6">
              <Clock className="w-4 h-4" />
              <span>Sans engagement</span>
            </div>

            <Button variant="primary" size="lg" href={CALENDLY_URL}>
              <Calendar className="w-5 h-5 mr-2" />
              Réserver un appel (45 min)
            </Button>
          </MagicCard>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 my-8"
        >
          <div className="flex-1 h-px bg-navy/10" />
          <span className="text-navy-light text-sm">ou</span>
          <div className="flex-1 h-px bg-navy/10" />
        </motion.div>

        {/* Email Alternative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MagicCard
            className="bg-white"
            gradientColor="#85a2a3"
            gradientOpacity={0.1}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-sage/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-8 h-8 text-sage" />
              </div>

              <div className="text-center sm:text-left flex-grow">
                <h3 className="text-lg font-semibold font-display text-navy mb-1">
                  Écrivez-moi directement
                </h3>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sage hover:text-sage-light transition-colors text-lg font-medium"
                >
                  {EMAIL}
                </a>
                <p className="text-navy-light text-sm mt-2">
                  Je réponds généralement sous 24h.
                </p>
              </div>

              <Button
                variant="secondary"
                size="md"
                href={`mailto:${EMAIL}`}
                className="flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Envoyer un email
              </Button>
            </div>
          </MagicCard>
        </motion.div>

        {/* Reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-navy-light/70 text-sm mt-12"
        >
          TeachInspire — Formation IA pour l'enseignement des langues
        </motion.p>
      </Container>
    </section>
  );
}
