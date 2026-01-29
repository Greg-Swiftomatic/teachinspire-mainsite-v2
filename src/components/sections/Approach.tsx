import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { BlurReveal } from '../ui/TextReveal';
import { MagicCard } from '../ui/MagicCard';

const solutions = [
  {
    problem: 'Apprenant dans un secteur technique que vous ne maîtrisez pas',
    solution: "Transformer n'importe quel contenu de son domaine en leçon adaptée",
    icon: '/icons/approach-1.png',
  },
  {
    problem: 'Ressource authentique parfaite mais trop complexe',
    solution: "L'adapter au bon niveau en quelques minutes",
    icon: '/icons/approach-2.png',
  },
  {
    problem: '20h de formation avec objectifs très spécifiques',
    solution: 'Créer des contenus ciblés au lieu de rester dans les généralités',
    icon: '/icons/approach-3.png',
  },
  {
    problem: 'Envie de sortir des manuels',
    solution: 'Utiliser podcasts, vidéos, articles comme matière première',
    icon: '/icons/approach-4.png',
  },
  {
    problem: "Besoin d'audios réalistes",
    solution: 'Générer dialogues et monologues avec des voix naturelles',
    icon: '/icons/approach-5.png',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function Approach() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle>
          On ne vous apprend pas un outil. On vous apprend à créer.
        </SectionTitle>

        {/* Solutions table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4 mb-12"
        >
          {solutions.map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <MagicCard
                className="bg-white"
                gradientColor="#f1d263"
                gradientOpacity={0.15}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-navy-light">{item.problem}</p>
                  </div>
                  <div className="w-16 h-16 flex-shrink-0 hidden md:block">
                    <img src={item.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-navy font-medium">{item.solution}</p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Explanation text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-navy/5 rounded-2xl p-8 space-y-4 text-navy-light">
            <BlurReveal delay={0.1}>
              <p>
                L'IA évolue vite. Très vite. De nouvelles solutions apparaissent
                chaque mois, de plus en plus performantes, de moins en moins chères.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.2}>
              <p className="font-medium text-navy">
                Dans ce contexte, s'attacher à un seul outil serait une erreur.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.3}>
              <p>
                Notre approche : vous apprendre à maîtriser chaque <strong className="text-navy">TYPE d'outil</strong> —
                génération de texte, transcription, synthèse vocale —
                pour que vous puissiez créer ce que vous voulez, avec les solutions du moment.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.4}>
              <p className="text-navy font-medium">
                Vous repartez avec une compétence. Pas avec une dépendance.
              </p>
            </BlurReveal>
            {/* Document icon in bottom right */}
            <img
              src="/icons/approach-6.png"
              alt=""
              className="absolute -bottom-8 -right-8 w-24 h-24 opacity-80 hidden md:block"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
