import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Phone, Video, Target, Users } from 'lucide-react';

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
    transition: { staggerChildren: 0.2 },
  },
};

const steps = [
  {
    number: '1',
    icon: Phone,
    title: 'Appel découverte',
    description: 'On échange sur vos besoins, votre contexte, vos objectifs. Pas de pitch commercial — juste une conversation.',
    duration: '15 min, gratuit',
  },
  {
    number: '2',
    icon: Video,
    title: 'Formation hybride',
    description: 'Modules vidéo (20 min chacun) + sessions live. Vos formateurs avancent à leur rythme, avec un point régulier.',
    duration: '12 semaines',
  },
  {
    number: '3',
    icon: Target,
    title: 'Mise en pratique',
    description: 'Pas de théorie abstraite. Chaque module se termine par une application concrète avec leurs vrais apprenants.',
    duration: null,
  },
  {
    number: '4',
    icon: Users,
    title: 'Communauté',
    description: 'Accès à la communauté TeachInspire pendant 1 an. Questions, mises à jour sur les outils, entraide entre instituts.',
    duration: null,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>Un parcours structuré pour vos équipes</SectionTitle>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="relative"
              >
                {/* Connecting line */}
                {!isLast && (
                  <div className="absolute left-6 top-20 w-0.5 h-16 bg-navy/10 hidden md:block" />
                )}

                <div className="flex gap-6 mb-8">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-yellow text-navy flex items-center justify-center font-display font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-2xl p-6 flex-1 border border-navy/5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-sage" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-navy mb-2">
                          {step.title}
                        </h3>
                        <p className="text-navy-light mb-2">{step.description}</p>
                        {step.duration && (
                          <span className="inline-block text-sm text-sage font-medium bg-sage/10 px-3 py-1 rounded-full">
                            {step.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
