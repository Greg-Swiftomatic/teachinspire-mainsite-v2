import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';

const sources = [
  { label: 'Vidéo YouTube', icon: '▶' },
  { label: 'Podcast', icon: '◉' },
  { label: 'Article de presse', icon: '◻' },
  { label: 'Extrait de film', icon: '▷' },
];

const outputs = [
  'Fiche vocabulaire contextualisée',
  'Exercices de compréhension ciblés',
  'Audio adapté au niveau',
  'Séquence pédagogique complète',
];

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
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-rust" />
            <span className="text-rust font-medium text-sm tracking-wide uppercase">
              La transformation
            </span>
            <div className="w-12 h-px bg-rust" />
          </motion.div>

          <KineticHeading
            variant="cascade"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight max-w-3xl mx-auto"
          >
            Et si n'importe quelle source devenait
          </KineticHeading>
          <KineticHeading
            variant="slide-from-sides"
            as="span"
            className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight mt-1"
            delay={0.3}
          >
            votre matière première ?
          </KineticHeading>
        </div>

        {/* Source → Output editorial flow */}
        <div className="grid lg:grid-cols-12 gap-px bg-navy/10 mb-16">
          {/* Sources column */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 bg-cream p-8 lg:p-10"
          >
            <span className="text-sm text-navy/50 uppercase tracking-wider block mb-6">
              Sources
            </span>
            <div className="space-y-4">
              {sources.map((source, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-navy/5 text-navy/40 text-sm" aria-hidden="true">
                    {source.icon}
                  </span>
                  <span className="text-navy font-medium">{source.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow / transformation column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 bg-navy text-cream p-8 lg:p-10 flex flex-col items-center justify-center"
          >
            <span className="text-5xl font-display font-bold text-cream/10 mb-4" aria-hidden="true">
              IA
            </span>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-cream/30" />
              <ArrowRight className="w-5 h-5 text-yellow" />
              <div className="w-8 h-px bg-cream/30" />
            </div>
            <p className="text-cream/70 text-sm text-center leading-relaxed">
              Votre méthode + l'IA comme assistant = contenu sur mesure
            </p>
          </motion.div>

          {/* Outputs column */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4 bg-cream p-8 lg:p-10"
          >
            <span className="text-sm text-navy/50 uppercase tracking-wider block mb-6">
              Résultats
            </span>
            <div className="space-y-4">
              {outputs.map((output, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-rust font-display font-semibold text-sm mt-0.5" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-navy/80">{output}</span>
                </div>
              ))}
            </div>
          </motion.div>
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
