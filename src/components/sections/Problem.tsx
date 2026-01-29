import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';

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
    transition: { staggerChildren: 0.1 },
  },
};

const challenges = [
  {
    image: '/icons/challenge-1.png',
    text: 'Des apprenants dans des secteurs que vous ne maîtrisez pas',
  },
  {
    image: '/icons/challenge-2.png',
    text: 'L\'aéronautique, la finance, la logistique, le juridique...',
  },
  {
    image: '/icons/challenge-3.png',
    text: 'On se rabat sur ce qu\'on connaît',
  },
];

export function Problem() {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>
          Vous êtes limité par ce qui existe déjà.
        </SectionTitle>

        {/* Main text content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto mb-12"
        >
          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy-light mb-6"
          >
            Les manuels sont trop génériques. Les ressources toutes faites 
            ne correspondent jamais vraiment au niveau ou aux objectifs.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy-light mb-6"
          >
            Vous aimeriez utiliser cette{' '}
            <span className="text-navy font-medium">vidéo YouTube parfaite</span>{' '}
            pour votre apprenant. Ou ce{' '}
            <span className="text-navy font-medium">podcast sur son secteur</span>. 
            Ou cet{' '}
            <span className="text-navy font-medium">article technique</span>.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy-light"
          >
            Mais adapter tout ça au bon niveau ?{' '}
            <span className="text-navy font-medium">Trop long.</span>
          </motion.p>
        </motion.div>

        {/* Challenges section with illustrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <p className="text-navy font-semibold text-lg mb-8 text-center">
            Et puis il y a les domaines que vous ne maîtrisez pas :
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            {challenges.map((challenge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 mb-4">
                  <img
                    src={challenge.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-navy-light">{challenge.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key insight - highlighted */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            {/* Decorative background blob */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow/20 via-sage/10 to-yellow/20 rounded-2xl blur-xl opacity-60" />

            <div className="relative bg-navy text-cream rounded-2xl p-8 text-center">
              <p className="text-xl font-display font-medium mb-2">
                Résultat : on reste dans les sentiers battus.
              </p>
              <p className="text-cream/80">
                Les apprenants reçoivent des cours génériques alors qu'ils ont des besoins spécifiques.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
