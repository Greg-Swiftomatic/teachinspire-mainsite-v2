import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const testimonials = [
  {
    quote:
      "Celui qui ne prend pas le train de l'IA maintenant, il est en train de se faire dépasser. Je vois déjà les équipes qui travaillent avec ça. C'est incroyable.",
    author: 'Directrice',
    company: 'Kintail',
    initial: 'D',
    color: 'yellow',
  },
  {
    quote:
      "Je ne pensais pas qu'on pouvait faire tout ça. Maintenant je crée des cours sur des secteurs que je ne connaissais pas du tout.",
    author: 'Formatrice',
    company: 'Cohorte 1',
    initial: 'F',
    color: 'sage',
  },
];

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorClasses = {
    yellow: { bg: 'bg-yellow/20', text: 'text-yellow', border: 'border-yellow/30' },
    sage: { bg: 'bg-sage/20', text: 'text-sage', border: 'border-sage/30' },
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];
  const colors = colorClasses[currentTestimonial.color as keyof typeof colorClasses];

  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden paper-texture relative">
      <Container>
        <SectionTitle>Ce qu'en disent ceux qui l'ont vécu</SectionTitle>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-navy hover:bg-navy hover:text-cream transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              style={{ borderRadius: '50% 45% 55% 48%' }}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-navy hover:bg-navy hover:text-cream transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              style={{ borderRadius: '48% 55% 45% 50%' }}
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Testimonial card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-2xl p-8 lg:p-10 border-2 ${colors.border} relative shadow-sm`}
                style={{ borderRadius: '24px 18px 26px 16px' }}
              >
                {/* Decorative quote marks */}
                <div className="absolute -top-4 left-8 text-6xl font-display leading-none opacity-20" style={{ color: currentTestimonial.color === 'yellow' ? '#f1d263' : '#85a2a3' }} aria-hidden="true">
                  "
                </div>

                {/* Quote text */}
                <p className="text-navy text-xl lg:text-2xl leading-relaxed mb-8 font-display relative z-10">
                  "{currentTestimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 ${colors.bg} flex items-center justify-center`}
                    style={{ borderRadius: '50% 45% 55% 48%' }}
                  >
                    <span className={`${colors.text} font-display font-bold text-xl`}>
                      {currentTestimonial.initial}
                    </span>
                  </div>
                  <div>
                    <p className="text-navy font-semibold text-lg">{currentTestimonial.author}</p>
                    <p className="text-navy-light">{currentTestimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-navy w-6' : 'bg-navy/20 hover:bg-navy/40'
                  }`}
                  aria-label={`Aller au témoignage ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center"
        >
          <p className="text-navy font-medium mb-4">
            Ils ont formé leurs équipes avec TeachInspire :
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {/* Logo placeholders with hand-drawn style */}
            <div className="bg-white px-6 py-3 border-2 border-navy/10 shadow-sm" style={{ borderRadius: '12px 8px 14px 6px' }}>
              <span className="text-navy font-display font-bold">Kintail</span>
            </div>
            <div className="bg-white px-6 py-3 border-2 border-navy/10 shadow-sm" style={{ borderRadius: '8px 12px 6px 14px' }}>
              <span className="text-navy font-display font-bold">Arrimage</span>
            </div>
          </div>
          <p className="text-navy-light text-sm mt-4">
            (2 instituts formés depuis 2025)
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
