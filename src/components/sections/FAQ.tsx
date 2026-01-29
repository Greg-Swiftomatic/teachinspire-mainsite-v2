import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const faqs = [
  {
    question: "Mes formateurs ne sont pas à l'aise avec la tech",
    answer:
      "La formation est progressive et part de zéro. Pas besoin de compétences techniques préalables. On utilise des outils conçus pour être accessibles.",
  },
  {
    question: 'Ça va coûter cher en abonnements ?',
    answer:
      "Non. On utilise principalement Google AI Studio — gratuit et quasi-illimité, même pour la synthèse vocale pro. Pas d'abonnements qui s'empilent.",
  },
  {
    question: "J'ai testé ChatGPT, les résultats étaient moyens",
    answer:
      "Normal. Sans méthode structurée, les résultats sont aléatoires. C'est précisément ce qu'on enseigne : comment obtenir des résultats consistants, pas des coups de chance.",
  },
  {
    question: "On n'a pas le temps",
    answer:
      "Les modules font 20 minutes et s'intègrent dans le planning. Format pensé pour des formateurs en activité, pas des étudiants à temps plein.",
  },
  {
    question: 'Et si les outils changent ?',
    answer:
      "Ils vont changer, c'est certain. C'est pour ça qu'on enseigne une méthode transférable, pas un mode d'emploi spécifique. Vos formateurs sauront s'adapter.",
  },
  {
    question: "C'est finançable par OPCO ?",
    answer:
      "Oui, la formation est éligible au financement OPCO. On vous accompagne dans les démarches si besoin.",
  },
  {
    question: 'Combien ça coûte ?',
    answer:
      "Le tarif dépend de la taille de votre équipe. Standard (≤10 formateurs) : à partir de 4 200€ HT. On en parle lors de l'appel découverte — sans engagement.",
  },
  {
    question: 'Et si ça ne correspond pas à nos besoins ?',
    answer:
      "On le saura dès l'appel découverte. Pas de pression, pas de relance. Si ce n'est pas un fit, on vous le dira.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  prefersReducedMotion,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  prefersReducedMotion: boolean;
}) {
  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div variants={fadeInUp} className="border-b border-navy/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
      >
        <span className="text-navy font-medium pr-4 group-hover:text-sage transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-navy-light flex-shrink-0 transition-transform ${
            prefersReducedMotion ? '' : 'duration-300'
          } ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-navy-light pb-5 pr-8">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>Questions fréquentes</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-8 border border-navy/5"
        >
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
