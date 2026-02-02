import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout/Container';
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
  index,
  prefersReducedMotion,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-navy/10"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
      >
        <span className="text-navy font-medium pr-4 group-hover:text-sage transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-navy/40 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
        className="overflow-hidden"
      >
        <p className="text-navy-light pb-6 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Section header */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-yellow" />
              <span className="text-yellow font-medium text-sm tracking-wide uppercase">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight mb-8"
            >
              Questions
              <span className="block text-rust mt-2">fréquentes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-navy-light"
            >
              Une autre question ?{' '}
              <a
                href="mailto:greg@teachinspire.me"
                className="text-navy hover:text-sage underline underline-offset-4 transition-colors"
              >
                Écrivez-nous
              </a>
            </motion.p>
          </div>

          {/* Right - FAQ items */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 lg:p-10">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  index={idx}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
