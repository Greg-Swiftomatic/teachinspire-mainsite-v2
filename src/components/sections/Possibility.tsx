import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { PremiumSourceDiagram } from '../ui/PremiumSourceDiagram';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';

const capabilities = [
  'Extraire le vocabulaire clé',
  'Simplifier pour n\'importe quel niveau (A2, B1, B2...)',
  'Générer des exercices ciblés',
  'Créer des audios naturels pour la compréhension orale',
];

export function Possibility() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-cream py-20 lg:py-28 overflow-hidden relative">
      <GridOverlay />

      <Container>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-rust" />
            <span className="text-rust font-medium text-sm tracking-wide uppercase">
              La transformation
            </span>
            <div className="w-12 h-px bg-rust" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight max-w-3xl mx-auto">
            Et si n'importe quelle source devenait{' '}
            <span className="text-rust">votre matière première</span> ?
          </h2>
        </motion.div>

        {/* Premium diagram */}
        <div className="mb-12 lg:mb-16">
          <PremiumSourceDiagram />
        </div>

        {/* Capabilities list */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <p className="text-sm text-navy/50 uppercase tracking-wider">
              Ce que ça permet
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-3 mb-8">
              {capabilities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3 py-3 border-b border-navy/10"
                >
                  <span className="text-rust font-display font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-navy/70">{cap}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="p-6 bg-navy/5"
            >
              <p className="text-navy font-medium">
                Le contenu parfait pour votre apprenant existe déjà quelque part.
              </p>
              <p className="text-rust mt-1">
                Vous apprenez à le transformer.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
