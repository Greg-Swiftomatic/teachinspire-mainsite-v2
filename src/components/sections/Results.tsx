import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { Clock, Globe, CreditCard, X, Check } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const metrics = [
  {
    icon: Clock,
    value: '3h → 30 min',
    label: "Temps de préparation d'un cours personnalisé",
    note: '(Résultat moyen observé sur nos cohortes)',
  },
  {
    icon: Globe,
    value: "N'importe quel secteur",
    label: "Finance, aéronautique, juridique — vos formateurs s'adaptent",
    note: null,
  },
  {
    icon: CreditCard,
    value: '0€/mois',
    label: 'Google AI Studio, transcription, synthèse vocale pro — tout gratuit',
    note: null,
  },
];

export function Results() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
    },
  };

  const getTransition = (delay: number) => ({
    delay: prefersReducedMotion ? 0 : delay,
    duration: prefersReducedMotion ? 0.01 : 0.5,
  });

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>Ce que ça change, concrètement</SectionTitle>

        {/* Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-cream rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-yellow/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-yellow" aria-hidden="true" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-navy mb-2">
                  {metric.value}
                </div>
                <p className="text-navy-light text-sm">{metric.label}</p>
                {metric.note && (
                  <p className="text-navy-light/60 text-xs mt-2">{metric.note}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Before/After Story */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0)}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg text-navy-light mb-6 text-center">
            {"Le problème classique : un formateur doit préparer un cours pour un apprenant dans l'aéronautique. "}
            <span className="text-navy font-medium">{"Il n'y connaît rien."}</span>
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <div className="text-navy-light font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-navy-light" aria-hidden="true" />
                </span>
                Avant
              </div>
              <p className="text-navy-light">
                {"3 heures de recherche frustrante. Contenus recyclés. "}
                <span className="text-navy">
                  {"Un apprenant qui sent que ce n'est pas vraiment pour lui."}
                </span>
              </p>
            </div>

            {/* After */}
            <div className="bg-sage/10 border border-sage/20 rounded-xl p-6">
              <div className="text-sage font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-sage" aria-hidden="true" />
                </span>
                Après TeachInspire
              </div>
              <p className="text-navy-light">
                {"30 minutes. Contenu adapté au secteur, au niveau, aux objectifs. "}
                <span className="text-navy font-medium">
                  Un apprenant qui reconnaît son quotidien.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={getTransition(0.1)}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-navy/5 rounded-2xl p-8">
            <p className="text-navy-light mb-4">
              {"\"Une formatrice devait créer un cours pour une entreprise de traite éthique qui s'internationalise. "}
              <span className="text-navy font-medium">Secteur ultra-niche.</span>
            </p>
            <p className="text-navy-light mb-4">
              Avec la méthode TeachInspire, elle a transformé la documentation métier en conversations réalistes.
            </p>
            <p className="text-navy font-medium italic">
              {"Retour de la DRH : \"Je suis étonnée d'entendre des situations qu'on vit vraiment au travail.\""}
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0.2)}
          className="text-center"
        >
          <p className="text-xl text-navy font-medium mb-6">
            Vous voulez ces résultats pour vos équipes ?
          </p>
          <Button
            variant="primary"
            size="lg"
            href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
          >
            Réserver un appel découverte
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
