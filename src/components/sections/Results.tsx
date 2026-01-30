import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { Clock, Globe, CreditCard } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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

const metrics = [
  {
    icon: Clock,
    value: '3h → 30 min',
    label: "Temps de préparation d'un cours personnalisé",
  },
  {
    icon: Globe,
    value: "N'importe quel secteur",
    label: "Aéronautique, juridique, logistique — des contenus sur mesure pour n'importe quel secteur.",
    sublabel: "Vos formateurs n'ont pas besoin d'être experts du domaine pour créer des leçons pertinentes.",
  },
  {
    icon: CreditCard,
    value: '0€/mois',
    label: "Pas d'abonnements. Des outils gratuits, des résultats pro.",
  },
];

export function Results() {
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
                  <Icon className="w-6 h-6 text-yellow" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-navy mb-2">
                  {metric.value}
                </div>
                <p className="text-navy-light text-sm">{metric.label}</p>
                {'sublabel' in metric && metric.sublabel && (
                  <p className="text-navy-light/70 text-xs mt-2">{metric.sublabel}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
