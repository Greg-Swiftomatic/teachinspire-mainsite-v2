import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout/Container';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';

const testimonials = [
  {
    quote:
      "Celui qui ne prend pas le train de l'IA maintenant, il est en train de se faire dépasser. Je vois déjà les équipes qui travaillent avec ça. C'est incroyable.",
    author: 'Directrice',
    company: 'Kintail',
    initial: 'D',
  },
  {
    quote:
      "Je ne pensais pas qu'on pouvait faire tout ça. Maintenant je crée des cours sur des secteurs que je ne connaissais pas du tout.",
    author: 'Formatrice',
    company: 'Cohorte 1',
    initial: 'F',
  },
];

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-cream py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay />

      <Container>
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-sage" />
            <span className="text-sage font-medium text-sm tracking-wide uppercase">
              Témoignages
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
          >
            Ce qu'en disent
            <span className="block text-rust mt-2">ceux qui l'ont vécu</span>
          </motion.h2>
        </div>

        {/* Testimonial */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Navigation */}
              <div className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-white border border-navy/10 flex items-center justify-center text-navy hover:bg-navy hover:text-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-white border border-navy/10 flex items-center justify-center text-navy hover:bg-navy hover:text-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Quote card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                  className="bg-navy text-cream p-8 lg:p-12 ml-8 lg:ml-0"
                >
                  {/* Large quote mark */}
                  <span
                    className="text-8xl font-display text-cream/10 leading-none block mb-4"
                    aria-hidden="true"
                  >
                    "
                  </span>

                  <p className="text-xl lg:text-2xl font-display leading-relaxed mb-8">
                    {currentTestimonial.quote}
                  </p>

                  <div className="flex items-center gap-4 border-t border-cream/10 pt-6">
                    <div className="w-12 h-12 bg-cream/10 flex items-center justify-center">
                      <span className="text-yellow font-display font-bold text-lg">
                        {currentTestimonial.initial}
                      </span>
                    </div>
                    <div>
                      <p className="text-cream font-semibold">{currentTestimonial.author}</p>
                      <p className="text-cream/60 text-sm">{currentTestimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots indicator — accessible touch targets */}
              <div className="flex gap-2 mt-6 ml-8 lg:ml-0">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                    aria-label={`Aller au témoignage ${idx + 1}`}
                  >
                    <span
                      className={`block h-1 transition-all duration-200 ${
                        idx === currentIndex ? 'bg-navy w-8' : 'bg-navy/20 w-4 hover:bg-navy/40'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social proof sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 h-full"
            >
              <p className="text-sm text-navy/50 uppercase tracking-wider mb-6">
                Ils nous font confiance
              </p>

              <div className="space-y-4">
                <div className="py-4 border-b border-navy/10">
                  <span className="text-xl font-display font-bold text-navy">Kintail</span>
                </div>
                <div className="py-4 border-b border-navy/10">
                  <span className="text-xl font-display font-bold text-navy">Arrimage</span>
                </div>
              </div>

              <p className="text-navy-light text-sm mt-6">
                Premiers instituts accompagnés en 2025
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
