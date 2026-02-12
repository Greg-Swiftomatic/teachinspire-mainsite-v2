import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import SpotlightCard from '../reactbits/SpotlightCard';

const metrics = [
  {
    value: '3h → 30min',
    label: "Temps de préparation d'un cours personnalisé",
    accent: 'yellow',
  },
  {
    value: 'Tous secteurs',
    label: "Aéronautique, juridique, logistique — contenus sur mesure sans expertise préalable",
    accent: 'sage',
  },
  {
    value: '0€/mois',
    label: "Pas d'abonnements. Des outils gratuits, des résultats pro.",
    accent: 'rust',
  },
];

export function Results() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay />
      <GeometricAccentGroup preset="results" />

      <Container>
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-yellow" />
            <span className="text-yellow font-medium text-sm tracking-wide uppercase">
              Résultats
            </span>
          </motion.div>

          <KineticHeading
            variant="slide-from-sides"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
          >
            Ce que ça change,
          </KineticHeading>
          <KineticHeading
            variant="slide-from-sides"
            as="span"
            className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight mt-2"
            delay={0.15}
          >
            concrètement
          </KineticHeading>
        </div>

        {/* Metrics grid — counter-roll for numeric values */}
        <div className="grid lg:grid-cols-3 gap-px bg-navy/10 mb-16">
          {metrics.map((metric, idx) => {
            const accentColorMap: Record<string, string> = {
              yellow: 'text-yellow',
              sage: 'text-sage',
              rust: 'text-rust',
            };
            const colorClass = accentColorMap[metric.accent] ?? 'text-navy';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <SpotlightCard
                  className="bg-white p-8 lg:p-10 h-full"
                  spotlightColor="rgba(133, 162, 163, 0.12)"
                >
                  <div className="mb-4">
                    <KineticHeading
                      variant="counter-roll"
                      as="span"
                      className={`text-4xl lg:text-5xl font-display font-bold ${colorClass}`}
                      delay={0.3 + idx * 0.15}
                    >
                      {metric.value}
                    </KineticHeading>
                  </div>
                  <p className="text-navy-light leading-relaxed">{metric.label}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Case study */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-12 gap-8 mb-16"
        >
          <div className="lg:col-span-4">
            <span className="text-sm text-navy/50 uppercase tracking-wider">
              Étude de cas
            </span>
          </div>
          <div className="lg:col-span-8">
            <div className="border-l-2 border-sage pl-8">
              <p className="text-lg text-navy-light mb-4">
                Une formatrice devait créer un cours pour une entreprise de traite
                éthique qui s'internationalise.{' '}
                <span className="text-navy font-medium">Secteur ultra-niche.</span>
              </p>
              <p className="text-lg text-navy-light mb-4">
                Avec la méthode TeachInspire, elle a transformé la documentation
                métier en conversations réalistes.
              </p>
              <p className="text-navy font-medium italic">
                Retour de la DRH : "Je suis étonnée d'entendre des situations
                qu'on vit vraiment au travail."
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <p className="text-xl text-navy font-medium">
            Vous voulez ces résultats pour vos équipes ?
          </p>
          <Button
            variant="primary"
            size="lg"
            href="https://cal.com/teachinspire.me"
            showArrow
          >
            Réserver un appel
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
