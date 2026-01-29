import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Badge } from '../ui/Badge';
import { TiltCard } from '../ui/MagicCard';
import { Button } from '../ui/Button';

const modules = [
  {
    number: 1,
    period: 'Mois 1',
    title: 'Panorama des Outils IA',
    description:
      "Se familiariser avec les briques essentielles : modèles de langage, transcription automatique, synthèse vocale. Comprendre ce que chaque type d'outil permet de créer.",
  },
  {
    number: 2,
    period: 'Mois 2',
    title: 'Prompt Engineering',
    description:
      "Apprendre à formuler des instructions claires pour obtenir des résultats précis et exploitables. La clé pour transformer n'importe quel contenu.",
  },
  {
    number: 3,
    period: 'Mois 3',
    title: 'Workflows Complets',
    description:
      "Partir d'une ressource authentique (vidéo, podcast, article) et en faire une séquence pédagogique complète et imprimable.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 },
  },
};

export function Modules() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle subtitle="Cadence recommandée : 3 mois. Adaptable selon vos contraintes.">
          Un parcours progressif en 3 étapes
        </SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mt-12"
        >
          {/* Animated connection line (desktop only) */}
          <motion.div
            variants={lineVariants}
            className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-yellow via-sage to-yellow -translate-y-1/2 z-0 origin-left rounded-full"
          />

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {modules.map((module) => (
              <motion.div
                key={module.number}
                variants={cardVariants}
                className="relative"
                style={{ perspective: 1000 }}
              >
                {/* Animated number badge */}
                <motion.div
                  className="absolute -top-4 left-6 w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-navy shadow-lg z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 + module.number * 0.15,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    boxShadow: '0 10px 30px rgba(241, 210, 99, 0.4)',
                  }}
                >
                  {module.number}
                </motion.div>

                <TiltCard className="h-full bg-white p-6" tiltAmount={8}>
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="sage">Module {module.number}</Badge>
                      <span className="text-sm text-navy-light">{module.period}</span>
                    </div>

                    <h3 className="text-xl font-semibold font-display text-navy mb-3">
                      {module.title}
                    </h3>

                    <p className="text-navy-light">{module.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="secondary" size="lg" href="/formation">
            Voir le programme détaillé
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
