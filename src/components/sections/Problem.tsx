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

const risks = [
  {
    icon: '🔗',
    text: "Dépendants d'outils qu'ils ne maîtrisent pas",
  },
  {
    icon: '🔄',
    text: "Incapables de s'adapter quand l'outil change",
  },
  {
    icon: '⏳',
    text: "Dépassés par ceux qui ont compris la méthode",
  },
];

export function Problem() {
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
              <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow/40 -z-0"></span>
            </span>
            {" — pendant que d'autres prennent de l'avance."}
          </motion.p>
        </motion.div>

        {/* Three risks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <p className="text-navy font-semibold text-lg mb-6 text-center">
            Points à éviter :
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {risks.map((risk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-cream rounded-xl p-6 text-center border border-navy/5"
              >
                <div className="text-3xl mb-3">{risk.icon}</div>
                <p className="text-sm text-navy-light">{risk.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow/20 via-sage/10 to-yellow/20 rounded-2xl blur-xl opacity-60" />
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

      </Container>
    </section>
  );
}
