import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { AnimatedCounter, ClockIcon, CoinIcon, PathIcon } from '../ui/HandDrawnIllustrations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const metrics = [
  {
    icon: ClockIcon,
    displayValue: <><AnimatedCounter value={3} suffix="h" /> → <AnimatedCounter value={30} suffix=" min" /></>,
    label: "Temps de préparation d'un cours personnalisé",
    note: null,
    color: 'yellow',
  },
  {
    icon: PathIcon,
    displayValue: "N'importe quel secteur",
    label: "Aéronautique, juridique, logistique — des contenus sur mesure. Vos formateurs n'ont pas besoin d'être experts du domaine.",
    note: null,
    color: 'sage',
  },
  {
    icon: CoinIcon,
    displayValue: <><AnimatedCounter value={0} prefix="" suffix="€" />/mois</>,
    label: "Pas d'abonnements. Des outils gratuits, des résultats pro.",
    note: null,
    color: 'rust',
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
    <section className="bg-white py-16 lg:py-24 overflow-hidden paper-texture relative">
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
            const colorClasses = {
              yellow: { bg: 'bg-yellow/15', text: 'text-yellow' },
              sage: { bg: 'bg-sage/15', text: 'text-sage' },
              rust: { bg: 'bg-rust/15', text: 'text-rust' },
            };
            const colors = colorClasses[metric.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: prefersReducedMotion ? 0 : -4 }}
                className="bg-cream rounded-2xl p-8 text-center border border-navy/5 hover:border-navy/10 transition-all shadow-sm hover:shadow-md"
                style={{ borderRadius: '22px 16px 24px 14px' }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${colors.bg} flex items-center justify-center`} style={{ borderRadius: '16px 12px 18px 10px' }}>
                  <div className={`w-10 h-10 ${colors.text}`}>
                    <Icon className="w-full h-full" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-display font-bold text-navy mb-3">
                  {metric.displayValue}
                </div>
                <p className="text-navy-light text-sm leading-relaxed">{metric.label}</p>
                {metric.note && (
                  <p className="text-navy-light/60 text-xs mt-2">{metric.note}</p>
                )}
              </motion.div>
            );
          })}
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
          <HandDrawnButton
            variant="primary"
            size="lg"
            href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
          >
            Réserver un appel découverte
          </HandDrawnButton>
        </motion.div>
      </Container>
    </section>
  );
}
