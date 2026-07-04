import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import { ProblemFlowCard } from '../illustrations/homepage/ProblemFlowCard';

const boundaries = [
  {
    number: '01',
    title: 'À déléguer',
    text: 'Transcrire, reformuler, adapter un niveau, générer des variantes, produire un premier jet de fiche.',
  },
  {
    number: '02',
    title: 'À contrôler',
    text: 'Le niveau CECRL, le registre, la progression, la charge cognitive et les erreurs invisibles.',
  },
  {
    number: '03',
    title: 'À garder humain',
    text: "Le diagnostic, les objectifs, l'adaptation fine au groupe, le feedback sensible et la relation apprenant.",
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
                La frontière
              </span>
            </motion.div>

            <KineticHeading
              variant="word-reveal"
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
            >
              La frontière à garder
            </KineticHeading>
            <KineticHeading
              variant="assemble"
              as="span"
              className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight mt-2"
              delay={0.3}
            >
              en tête
            </KineticHeading>

            {/* Animated branching flow — confusion without method */}
            <ProblemFlowCard prefersReducedMotion={prefersReducedMotion} />
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
                L'IA peut accélérer la préparation de cours. Elle peut aussi créer
                de la dépendance, des supports trop lisses, des erreurs invisibles
                et une pression implicite à produire toujours plus vite.
              </p>

              <p className="text-xl text-navy font-medium">
                Le risque commence quand l'IA entre dans les pratiques{' '}
                <span className="text-rust">sans méthode</span>, sans critères de
                qualité, sans personne pour relire ce qui arrive devant les apprenants.
              </p>
            </motion.div>

            {/* Human boundaries */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-sm text-navy/60 uppercase tracking-wider mb-6">
                À déléguer à l'outil. À garder côté formateur.
              </p>

              <div className="space-y-4">
                {boundaries.map((boundary, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-6 py-4 border-b border-navy/10"
                  >
                    <span className="text-3xl font-display font-bold text-navy/10" aria-hidden="true">
                      {boundary.number}
                    </span>
                    <div>
                      <p className="font-medium text-navy">{boundary.title}</p>
                      <p className="text-navy-light">{boundary.text}</p>
                    </div>
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
              <p className="text-xl font-display mb-2">
                Les outils vont changer. Le jugement pédagogique restera.
              </p>
              <p className="text-cream/70">
                TeachInspire donne à vos équipes une manière de tracer cette frontière
                à chaque support : ce que l'IA prépare, ce que le formateur vérifie.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
