import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn chevron icon
const ChevronDownDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M6 9 Q12 16 18 9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Decorative question mark doodle
const QuestionDoodle = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
    <path
      d="M40 15 Q55 15 55 30 Q55 40 40 45 L40 52"
      stroke="#f1d263"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="40" cy="62" r="4" fill="#f1d263" />
    {/* Decorative dots */}
    <circle cx="20" cy="25" r="3" fill="#85a2a3" opacity="0.5" />
    <circle cx="60" cy="55" r="2" fill="#B7553D" opacity="0.5" />
  </svg>
);

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
  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  // Alternate colors for visual interest
  const colors = ['yellow', 'sage', 'rust'] as const;
  const color = colors[index % 3];
  const colorClasses = {
    yellow: { dot: 'bg-yellow', hover: 'group-hover:text-yellow' },
    sage: { dot: 'bg-sage', hover: 'group-hover:text-sage' },
    rust: { dot: 'bg-rust', hover: 'group-hover:text-rust' },
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={`border-b border-navy/10 last:border-0 ${isOpen ? 'bg-navy/[0.02]' : ''}`}
      style={{ borderRadius: isOpen ? '12px' : '0' }}
    >
      <button
        onClick={onClick}
        className="w-full py-5 px-2 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg"
      >
        <div className="flex items-center gap-3 pr-4">
          <span
            className={`w-2 h-2 ${colorClasses[color].dot} flex-shrink-0`}
            style={{ borderRadius: '50% 40% 60% 45%' }}
            aria-hidden="true"
          />
          <span className={`text-navy font-medium ${colorClasses[color].hover} transition-colors`}>
            {question}
          </span>
        </div>
        <div
          className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all ${
            prefersReducedMotion ? '' : 'duration-300'
          } ${isOpen ? 'rotate-180 bg-navy/5' : ''}`}
          style={{ borderRadius: '10px 6px 12px 8px' }}
        >
          <ChevronDownDoodle className="w-5 h-5 text-navy-light" />
        </div>
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
        <p className="text-navy-light pb-5 pl-7 pr-8 leading-relaxed">{answer}</p>
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
    <section className="bg-cream py-16 lg:py-24 overflow-hidden paper-texture relative">
      <Container>
        <SectionTitle>Questions fréquentes</SectionTitle>

        <div className="max-w-3xl mx-auto relative">
          {/* Decorative question mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-8 -right-4 lg:-right-16 w-20 h-20 lg:w-24 lg:h-24 z-10"
            aria-hidden="true"
          >
            <QuestionDoodle />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="bg-white p-6 md:p-8 border-2 border-navy/10 shadow-sm relative"
            style={{ borderRadius: '24px 16px 26px 18px' }}
          >
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
          </motion.div>

          {/* Bottom decoration */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="text-center text-navy-light text-sm mt-6"
          >
            Une autre question ? <a href="mailto:greg@teachinspire.me" className="text-sage hover:text-sage-light underline underline-offset-2 transition-colors">Écrivez-nous</a>
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
