import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { MagicCard } from '../ui/MagicCard';

const capabilities = [
  'Extraire le vocabulaire clé',
  'Simplifier pour n\'importe quel niveau (A2, B1, B2...)',
  'Générer des exercices ciblés',
  'Créer des audios naturels pour la compréhension orale',
];

export function Possibility() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle>
          Et si n'importe quelle source devenait votre matière&nbsp;première&nbsp;?
        </SectionTitle>

        {/* Illustration des sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <img
            src="/icons/illustration-source.png"
            alt="Sources variées : vidéos YouTube, podcasts, articles techniques, rapports d'entreprise"
            className="max-w-2xl lg:max-w-3xl w-full h-auto rounded-2xl"
          />
        </motion.div>

        {/* Ce que l'IA permet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <MagicCard
            className="bg-white"
            gradientColor="#85a2a3"
            gradientOpacity={0.15}
          >
            <p className="text-navy mb-6 font-medium">
              Avec les bonnes méthodes IA, tout cela devient exploitable :
            </p>

            <div className="space-y-3 mb-8">
              {capabilities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-sage font-bold">→</span>
                  <p className="text-navy-light">{cap}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="pt-6 border-t border-navy/10"
            >
              <p className="text-navy font-medium text-lg">
                Le contenu parfait pour votre apprenant existe déjà quelque part.
                <br />
                <span className="text-sage">Vous apprenez à le transformer.</span>
              </p>
            </motion.div>
          </MagicCard>
        </motion.div>
      </Container>
    </section>
  );
}
