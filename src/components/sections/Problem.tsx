import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import { ProblemDecisionMaze } from '../illustrations/homepage/ProblemDecisionMaze';
import ScrollReveal from '../reactbits/ScrollReveal';

const risks = [
  {
    number: '01',
    text: "Dépendants d'outils qu'ils ne maîtrisent pas",
  },
  {
    number: '02',
    text: "Incapables de s'adapter quand l'outil change",
  },
  {
    number: '03',
    text: 'Dépassés par ceux qui ont compris la méthode',
  },
];

export function Problem() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay />
      <GeometricAccentGroup preset="problem" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column - section label and title */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-rust" />
              <span className="text-rust font-medium text-sm tracking-wide uppercase">
                Le contexte
              </span>
            </motion.div>

            <KineticHeading
              variant="word-reveal"
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
            >
              Vos formateurs entendent parler d'IA partout.
            </KineticHeading>
            <KineticHeading
              variant="assemble"
              as="span"
              className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight mt-2"
              delay={0.3}
            >
              Et après ?
            </KineticHeading>

            {/* Animated branching flow — confusion without method */}
            <ProblemDecisionMaze prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* Right column - content */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 mb-12"
            >
              <p className="text-lg text-navy-light leading-relaxed">
                Certains bricolent avec ChatGPT — résultats aléatoires.
                D'autres attendent, sceptiques ou débordés.
                Pendant ce temps, d'autres instituts forment déjà leurs équipes.
              </p>

              <p className="text-xl text-navy font-medium">
                Le vrai risque ? Ce n'est pas que l'IA remplace vos formateurs.
                C'est qu'ils se retrouvent{' '}
                <span className="text-rust">largués</span> — pendant que d'autres
                prennent de l'avance.
              </p>
            </motion.div>

            {/* Three risks */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-sm text-navy/60 uppercase tracking-wider mb-6">
                Trois scénarios à éviter
              </p>

              <div className="space-y-4">
                {risks.map((risk, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-6 py-4 border-b border-navy/10"
                  >
                    <span className="text-3xl font-display font-bold text-navy/10" aria-hidden="true">
                      {risk.number}
                    </span>
                    <p className="text-navy-light">{risk.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key insight box */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-navy text-cream p-8"
            >
              <ScrollReveal
                as="p"
                containerClassName="text-xl font-display mb-2"
                textClassName="text-xl font-display"
                enableBlur
                blurStrength={3}
                baseOpacity={0.15}
                wordAnimationEnd="center center"
              >
                L'IA évolue vite. Les outils d'aujourd'hui seront obsolètes demain.
              </ScrollReveal>
              <p className="text-cream/70">
                Ce qui reste ? La capacité à{' '}
                <span className="text-yellow font-semibold">penser l'IA</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
