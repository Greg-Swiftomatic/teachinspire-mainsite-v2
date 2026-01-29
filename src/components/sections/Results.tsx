import { motion } from 'framer-motion';
import { Video, FileText, Headphones, Clock } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';

const results = [
  {
    icon: Video,
    text: 'Une vidéo YouTube → un cours complet adapté au niveau',
  },
  {
    icon: FileText,
    text: 'Un article technique → du vocabulaire ciblé + exercices',
  },
  {
    icon: Headphones,
    text: "N'importe quel podcast → une compréhension orale sur-mesure",
  },
  {
    icon: Clock,
    text: 'Le tout en quelques minutes, pas en quelques heures',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Results() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Ce que ça change concrètement</SectionTitle>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {results.map((result, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-center gap-4 group"
            >
              <motion.div
                className="w-12 h-12 bg-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <result.icon className="w-6 h-6 text-yellow" />
              </motion.div>
              <span className="text-lg text-navy group-hover:text-sage transition-colors duration-200">
                {result.text}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
