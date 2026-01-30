import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Quote } from 'lucide-react';

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
    transition: { staggerChildren: 0.15 },
  },
};

const testimonials = [
  {
    quote:
      "Celui qui ne prend pas le train de l'IA maintenant, il est en train de se faire dépasser. Je vois déjà les équipes qui travaillent avec ça. C'est incroyable.",
    author: 'Directrice',
    company: 'Kintail',
    avatar: null, // Placeholder
  },
  {
    quote:
      "Je ne pensais pas qu'on pouvait faire tout ça. Maintenant je crée des cours sur des secteurs que je ne connaissais pas du tout.",
    author: 'Formatrice',
    company: 'Cohorte 1',
    avatar: null, // Placeholder
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>Ce qu'en disent ceux qui l'ont vécu</SectionTitle>

        {/* Testimonials grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 border border-navy/5 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 rounded-full bg-yellow flex items-center justify-center">
                  <Quote className="w-4 h-4 text-navy" />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-navy-light text-lg leading-relaxed mb-6 pt-4">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <span className="text-sage font-medium text-sm">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-navy font-medium">{testimonial.author}</p>
                  <p className="text-navy-light text-sm">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-navy font-medium mb-4">
            Ils ont formé leurs équipes avec TeachInspire :
          </p>
          <div className="flex items-center justify-center gap-8">
            {/* Logo placeholders */}
            <div className="bg-white px-6 py-3 rounded-lg border border-navy/10">
              <span className="text-navy font-display font-bold">Kintail</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg border border-navy/10">
              <span className="text-navy font-display font-bold">Arrimage</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
