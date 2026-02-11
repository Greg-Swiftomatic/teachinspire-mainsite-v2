import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';

const modules = [
  {
    number: '01',
    period: 'Mois 1',
    title: 'Panorama des Outils IA',
    description:
      "Se familiariser avec les briques essentielles : modèles de langage, transcription automatique, synthèse vocale. Comprendre ce que chaque type d'outil permet de créer.",
    color: 'yellow' as const,
  },
  {
    number: '02',
    period: 'Mois 2',
    title: 'Prompt Engineering',
    description:
      "Apprendre à formuler des instructions claires pour obtenir des résultats précis et exploitables. La clé pour transformer n'importe quel contenu.",
    color: 'sage' as const,
  },
  {
    number: '03',
    period: 'Mois 3',
    title: 'Workflows Complets',
    description:
      "Partir d'une ressource authentique (vidéo, podcast, article) et en faire une séquence pédagogique complète et imprimable.",
    color: 'rust' as const,
  },
];

export function Modules() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const accentColors = {
    yellow: 'text-yellow/20',
    sage: 'text-sage/20',
    rust: 'text-rust/20',
  };

  return (
    <section className="bg-white py-20 lg:py-32 relative overflow-hidden">
      <GridOverlay />
      <GeometricAccentGroup preset="modules" />

      <Container>
        {/* Section header — asymmetric grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-sage" />
              <span className="text-sage font-medium text-sm tracking-wide uppercase">
                Le programme
              </span>
            </motion.div>

            <KineticHeading
              variant="cascade"
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight [text-wrap:balance]"
            >
              Un parcours progressif
            </KineticHeading>
            <div className="flex items-baseline gap-3 mt-2">
              <KineticHeading
                variant="cascade"
                as="span"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight"
                delay={0.2}
              >
                en
              </KineticHeading>
              <KineticHeading
                variant="counter-roll"
                as="span"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight"
                delay={0.3}
              >
                3
              </KineticHeading>
              <KineticHeading
                variant="cascade"
                as="span"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight"
                delay={0.35}
              >
                étapes
              </KineticHeading>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-navy-light leading-relaxed"
            >
              Cadence recommandée : 3 mois. Adaptable selon vos contraintes.
              De la découverte des outils à la création de séquences complètes.
            </motion.p>
          </div>
        </div>

        {/* Module cards — editorial grid with separator pattern */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-px bg-navy/10 mb-16"
        >
          {modules.map((module) => (
            <motion.div
              key={module.number}
              variants={itemVariants}
            >
              <SpotlightCard
                className="bg-white p-8 lg:p-10 h-full"
                spotlightColor="rgba(133, 162, 163, 0.10)"
              >
                {/* Large faded number */}
                <span className={`text-6xl font-display font-bold ${accentColors[module.color]} block mb-6`} aria-hidden="true">
                  {module.number}
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={module.color === 'yellow' ? 'yellow' : module.color === 'sage' ? 'sage' : 'default'}>
                    Module {module.number}
                  </Badge>
                  <span className="text-sm text-navy-light">{module.period}</span>
                </div>

                <h3 className="text-xl font-display font-bold text-navy mb-3">
                  <DecryptedText
                    text={module.title}
                    animateOn="hover"
                    speed={30}
                    maxIterations={8}
                    className="text-xl font-display font-bold text-navy"
                    encryptedClassName="text-xl font-display font-bold text-navy/40"
                  />
                </h3>

                <p className="text-navy-light leading-relaxed">{module.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center"
        >
          <Button variant="secondary" size="lg" href="/formation" showArrow>
            Voir le programme détaillé
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
