import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { BorderGlowCard } from '../ui/MagicCard';

const testimonials = [
  {
    quote:
      "J'ai divisé mon temps de préparation par 4. Mes élèves ont des contenus vraiment adaptés à leur secteur.",
    name: 'Marie L.',
    role: 'Formatrice FLE, Paris',
    initials: 'ML',
  },
  {
    quote:
      'Enfin une formation IA qui comprend les vrais besoins des profs de langues. Pas du blabla tech.',
    name: 'Thomas R.',
    role: "Prof d'anglais, Lyon",
    initials: 'TR',
  },
  {
    quote:
      'Les ateliers live font toute la différence. On pratique ensemble, on partage nos prompts.',
    name: 'Sophie M.',
    role: 'Formatrice espagnol, Bordeaux',
    initials: 'SM',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const quoteIconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
};

export function Testimonials() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle subtitle="Des enseignants qui ont transformé leur pratique">
          Ce qu'ils en disent
        </SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="relative"
            >
              {/* Animated Quote icon */}
              <motion.div
                className="absolute -top-3 left-6 z-20"
                variants={quoteIconVariants}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-navy" />
                </div>
              </motion.div>

              <BorderGlowCard className="h-full" glowColor="#f1d263">
                <div className="pt-4">
                  <motion.p
                    className="text-navy mb-6 italic leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>

                  <div className="flex items-center gap-3">
                    {/* Animated Avatar with initials */}
                    <motion.div
                      className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <span className="text-sage font-semibold">
                        {testimonial.initials}
                      </span>
                    </motion.div>

                    <div>
                      <p className="font-semibold text-navy">{testimonial.name}</p>
                      <p className="text-sm text-navy-light">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </BorderGlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
