import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Brain, Wallet, Shield } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const pillars = [
  {
    icon: Brain,
    title: "Penser avant d'utiliser",
    description:
      "Une approche structurée pour évaluer, choisir et adapter les outils IA à chaque contexte d'enseignement.",
    color: 'sage',
  },
  {
    icon: Wallet,
    title: 'Gratuit ou presque',
    description:
      'Google AI Studio, transcription en 30 secondes, synthèse vocale pro — des outils puissants à 0€/mois.',
    color: 'yellow',
  },
  {
    icon: Shield,
    title: 'Pas de dépendance',
    description:
      "Vos formateurs apprennent à s'adapter, pas à suivre un mode d'emploi qui sera obsolète dans 6 mois.",
    color: 'navy',
  },
];

const benefits = [
  "Évaluer n'importe quel outil IA",
  'Comprendre ses forces et limites',
  "L'adapter à son contexte pédagogique",
  'Garder le contrôle sur sa pratique',
];

export function Approach() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
    },
  };

  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>
          {"On n'enseigne pas un outil."}
          <br />
          <span className="text-sage">{"On enseigne à penser l'IA."}</span>
        </SectionTitle>

        {/* Main text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <motion.p variants={fadeInUp} className="text-lg text-navy-light mb-6">
            La plupart des formations IA vous apprennent à utiliser ChatGPT.
            <br />
            {"Problème : quand ChatGPT change (ou qu'un meilleur outil arrive), vous repartez de zéro."}
          </motion.p>

          <motion.p variants={fadeInUp} className="text-xl text-navy font-medium mb-8">
            {"TeachInspire enseigne une "}
            <span className="relative inline-block">
              <span className="relative z-10">méthode transférable</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-yellow"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,4 Q50,0 100,4 T200,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {" :"}
          </motion.p>

          {/* Benefits list */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-8">
            {benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-navy border border-navy/10"
              >
                <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {benefit}
              </span>
            ))}
          </motion.div>

          <motion.p variants={fadeInUp} className="text-lg text-navy font-medium">
            {"Vos formateurs deviennent "}
            <span className="text-sage">autonomes</span> — pas utilisateurs captifs.
          </motion.p>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const colorClasses = {
              sage: 'bg-sage/10 border-sage/20 text-sage',
              yellow: 'bg-yellow/10 border-yellow/40 text-yellow',
              navy: 'bg-navy/5 border-navy/10 text-navy',
            };
            const iconBgClasses = {
              sage: 'bg-sage/20',
              yellow: 'bg-yellow/30',
              navy: 'bg-navy/10',
            };

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className={`rounded-2xl p-6 border-2 ${colorClasses[pillar.color as keyof typeof colorClasses]} bg-white`}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${iconBgClasses[pillar.color as keyof typeof iconBgClasses]} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-display font-bold text-navy mb-3">{pillar.title}</h3>
                <p className="text-navy-light">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
