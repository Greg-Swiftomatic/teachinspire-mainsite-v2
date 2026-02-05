import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout/Container';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';

const faqs = [
  {
    id: 'faq-0',
    question: "Mes formateurs ne sont pas à l'aise avec la tech",
    answer:
      "La formation est progressive et part de zéro. Pas besoin de compétences techniques préalables. On utilise des outils conçus pour être accessibles.",
  },
  {
    id: 'faq-1',
    question: 'Ça va coûter cher en abonnements ?',
    answer:
      "Non. On utilise principalement Google AI Studio — gratuit et quasi-illimité, même pour la synthèse vocale pro. Pas d'abonnements qui s'empilent.",
  },
  {
    id: 'faq-2',
    question: "J'ai testé ChatGPT, les résultats étaient moyens",
    answer:
      "Normal. Sans méthode structurée, les résultats sont aléatoires. C'est précisément ce qu'on enseigne : comment obtenir des résultats consistants, pas des coups de chance.",
  },
  {
    id: 'faq-3',
    question: "On n'a pas le temps",
    answer:
      "Les modules font 20 minutes et s'intègrent dans le planning. Format pensé pour des formateurs en activité, pas des étudiants à temps plein.",
  },
  {
    id: 'faq-4',
    question: 'Et si les outils changent ?',
    answer:
      "Ils vont changer, c'est certain. C'est pour ça qu'on enseigne une méthode transférable, pas un mode d'emploi spécifique. Vos formateurs sauront s'adapter.",
  },
  {
    id: 'faq-5',
    question: "C'est finançable par OPCO ?",
    answer:
      "Oui, la formation est éligible au financement OPCO. On vous accompagne dans les démarches si besoin.",
  },
  {
    id: 'faq-6',
    question: 'Combien ça coûte ?',
    answer:
      "Le tarif dépend de la taille de votre équipe. Standard (≤10 formateurs) : à partir de 4 200€ HT. On en parle lors de l'appel découverte — sans engagement.",
  },
  {
    id: 'faq-7',
    question: 'Et si ça ne correspond pas à nos besoins ?',
    answer:
      "On le saura dès l'appel découverte. Pas de pression, pas de relance. Si ce n'est pas un fit, on vous le dira.",
  },
];

function FAQItem({
  id,
  question,
  answer,
  isOpen,
  onClick,
  index,
  prefersReducedMotion,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const questionId = `${id}-question`;
  const answerId = `${id}-answer`;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-navy/10"
    >
      <button
        id={questionId}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="w-full py-6 flex items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
      >
        <span className="text-navy font-medium pr-4 group-hover:text-sage transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-navy/40 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <motion.div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
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
      <GridOverlay />

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
              style={{ textWrap: 'balance' }}
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
                className="text-navy hover:text-sage underline underline-offset-4 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
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
                  key={faq.id}
                  id={faq.id}
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
