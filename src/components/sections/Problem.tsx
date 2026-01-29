import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Link, RefreshCw, Clock } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const risks = [
  {
    icon: Link,
    text: "Dépendants d'outils qu'ils ne maîtrisent pas",
  },
  {
    icon: RefreshCw,
    text: "Incapables de s'adapter quand l'outil change",
  },
  {
    icon: Clock,
    text: 'Dépassés par ceux qui ont compris la méthode',
  },
];

export function Problem() {
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
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  const getTransition = (delay: number) => ({
    delay: prefersReducedMotion ? 0 : delay,
    duration: prefersReducedMotion ? 0.01 : 0.5,
  });

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>
          {"Vos formateurs entendent parler d'IA partout."}
          <br />
          <span className="text-sage">Et après ?</span>
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
            Certains bricolent avec ChatGPT — résultats aléatoires.
            <br />
            D'autres attendent, sceptiques ou débordés.
            <br />
            {"Pendant ce temps, d'autres instituts forment déjà leurs équipes."}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy font-medium mb-8"
          >
            {"Le vrai risque ? Ce n'est pas que l'IA remplace vos formateurs."}
            <br />
            {"C'est qu'ils se retrouvent "}
            <span className="relative inline-block">
              <span className="relative z-10">largués</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow/40 -z-0" aria-hidden="true"></span>
            </span>
            {" — pendant que d'autres prennent de l'avance."}
          </motion.p>
        </motion.div>

        {/* Three risks */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0.2)}
          className="max-w-3xl mx-auto mb-10"
        >
          <p className="text-navy font-semibold text-lg mb-6 text-center">
            Trois scénarios à éviter :
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {risks.map((risk, idx) => {
              const Icon = risk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={getTransition(0.3 + idx * 0.1)}
                  className="bg-cream rounded-xl p-6 text-center border border-navy/5"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-navy/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-navy" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-navy-light">{risk.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={getTransition(0.4)}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow/20 via-sage/10 to-yellow/20 rounded-2xl blur-xl opacity-60" aria-hidden="true" />
            <div className="relative bg-navy text-cream rounded-2xl p-8 text-center">
              <p className="text-xl font-display font-medium mb-2">
                {"L'IA évolue vite. Les outils d'aujourd'hui seront obsolètes demain."}
              </p>
              <p className="text-cream/80">
                {"Ce qui reste ? La capacité à "}
                <span className="text-yellow font-semibold">{"penser l'IA"}</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0.5)}
          className="max-w-2xl mx-auto"
        >
          <blockquote className="border-l-4 border-yellow pl-6 py-2">
            <p className="text-lg text-navy italic mb-2">
              {"\"Celui qui ne prend pas le train de l'IA maintenant, il est en train de se faire dépasser.\""}
            </p>
            <footer className="text-sm text-navy-light">
              {"— Directrice d'institut, après notre formation"}
            </footer>
          </blockquote>
        </motion.div>
      </Container>
    </section>
  );
}
