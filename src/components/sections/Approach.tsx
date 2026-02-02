import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const pillars = [
  {
    number: '01',
    title: "Penser avant d'utiliser",
    description:
      "Une approche structurée pour évaluer, choisir et adapter les outils IA à chaque contexte d'enseignement.",
  },
  {
    number: '02',
    title: 'Gratuit ou presque',
    description:
      'Google AI Studio, transcription en 30 secondes, synthèse vocale pro — des outils puissants à 0€/mois.',
  },
  {
    number: '03',
    title: 'Pas de dépendance',
    description:
      "Vos formateurs apprennent à s'adapter, pas à suivre un mode d'emploi qui sera obsolète dans 6 mois.",
  },
];

export function Approach() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-cream py-20 lg:py-32 overflow-hidden relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-navy"
            style={{ left: `${(i + 1) * (100 / 12)}%` }}
          />
        ))}
      </div>

      <Container>
        {/* Section header */}
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
                Notre approche
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
            >
              On n'enseigne pas un outil.
              <span className="block text-rust mt-2">On enseigne à penser l'IA.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-7 lg:pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-navy-light leading-relaxed">
                La plupart des formations IA vous apprennent à utiliser ChatGPT.
                Problème : quand ChatGPT change (ou qu'un meilleur outil arrive),
                vous repartez de zéro.
              </p>
              <p className="text-xl text-navy font-medium">
                TeachInspire enseigne une <span className="text-sage">méthode transférable</span>.
                Vos formateurs deviennent autonomes — pas utilisateurs captifs.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Key quote */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-navy text-cream p-8 lg:p-12 mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl lg:text-3xl font-display font-bold leading-relaxed">
              L'IA comme <span className="text-yellow">assistant</span>, pas comme{' '}
              <span className="text-cream/50 line-through">remplaçant</span>.
            </p>
          </div>
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-navy/10 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              className="bg-white p-8 lg:p-10"
            >
              <span className="text-5xl font-display font-bold text-sage/20 mb-4 block">
                {pillar.number}
              </span>
              <h3 className="text-xl font-display font-bold text-navy mb-3">
                {pillar.title}
              </h3>
              <p className="text-navy-light leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
