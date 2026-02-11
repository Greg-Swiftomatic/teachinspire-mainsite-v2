import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import CountUp from '../reactbits/CountUp';

const credentials = [
  {
    value: '9 000+',
    label: "heures d'enseignement",
  },
  {
    value: 'CELTA',
    label: 'avec mention',
  },
  {
    value: '3 ans',
    label: 'AI Specialist',
  },
];

export function Founder() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay />
      <GeometricAccentGroup preset="founder" />

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
            <div className="w-12 h-px bg-rust" />
            <span className="text-rust font-medium text-sm tracking-wide uppercase">
              Le fondateur
            </span>
          </motion.div>

          <KineticHeading
            variant="cascade"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
          >
            Qui est derrière
          </KineticHeading>
          <KineticHeading
            variant="assemble"
            as="span"
            className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight mt-2"
            delay={0.25}
          >
            TeachInspire ?
          </KineticHeading>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="aspect-[3/4] bg-sage/10 flex items-center justify-center" aria-hidden="true">
              {/* Placeholder for photo */}
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-navy/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-navy/30">GL</span>
                </div>
                <p className="text-sm text-navy/40">Photo à venir</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Bio */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-navy mb-6">
              Greg Le Dall
            </h3>

            {/* Credentials */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-navy/10">
              {/* 9 000+ with spring CountUp */}
              <div>
                <div className="text-2xl font-display font-bold text-sage">
                  <CountUp to={9000} separator=" " duration={2.5} className="text-2xl font-display font-bold text-sage" />
                  <span className="text-2xl font-display font-bold text-sage">+</span>
                </div>
                <p className="text-sm text-navy-light">heures d'enseignement</p>
              </div>
              {/* Text-based credentials */}
              {credentials.slice(1).map((cred, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-display font-bold text-sage">
                    <KineticHeading
                      variant="counter-roll"
                      as="span"
                      className="text-2xl font-display font-bold text-sage"
                      delay={0.5 + idx * 0.1}
                    >
                      {cred.value}
                    </KineticHeading>
                  </div>
                  <p className="text-sm text-navy-light">{cred.label}</p>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-4 text-navy-light leading-relaxed mb-8">
              <p>
                "J'ai passé des années à enseigner l'anglais à des pros dans des secteurs
                que je ne connaissais pas. L'aéronautique, la logistique, le juridique...
              </p>
              <p>
                Quand l'IA générative est arrivée, j'ai vu le potentiel immédiatement.{' '}
                <span className="text-navy font-medium">
                  Pas pour remplacer ce qu'on fait — pour amplifier notre capacité à
                  personnaliser.
                </span>
              </p>
              <p>
                Mais j'ai aussi vu le piège : devenir dépendant d'un outil qu'on ne
                comprend pas.{' '}
                <span className="text-navy font-medium">
                  C'est pour ça que TeachInspire enseigne une méthode, pas un mode
                  d'emploi."
                </span>
              </p>
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              showArrow
            >
              Réserver un appel avec Greg
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
