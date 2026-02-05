import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';

const steps = [
  {
    number: '01',
    title: 'Appel découverte',
    description:
      'On échange sur vos besoins, votre contexte, vos objectifs. Pas de pitch commercial — juste une conversation.',
    duration: '15 min, gratuit',
  },
  {
    number: '02',
    title: 'Formation hybride',
    description:
      'Modules vidéo (20 min chacun) + sessions live. Vos formateurs avancent à leur rythme, avec un point régulier.',
    duration: '12 semaines',
  },
  {
    number: '03',
    title: 'Mise en pratique',
    description:
      'Pas de théorie abstraite. Chaque module se termine par une application concrète avec leurs vrais apprenants.',
    duration: null,
  },
  {
    number: '04',
    title: 'Communauté',
    description:
      'Accès à la communauté TeachInspire pendant 1 an. Questions, mises à jour sur les outils, entraide entre instituts.',
    duration: null,
  },
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-cream py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay />

      <Container>
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-navy" />
              <span className="text-navy font-medium text-sm tracking-wide uppercase">
                Le parcours
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
            >
              Un parcours structuré
              <span className="block text-rust mt-2">pour vos équipes</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-7 lg:pt-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-navy-light leading-relaxed"
            >
              Format groupe (10-25 formateurs) pour que toute l'équipe avance ensemble.
              Espace dédié pour votre institut dans la communauté.
            </motion.p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="grid lg:grid-cols-12 gap-8 py-8 border-b border-navy/10"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="text-6xl lg:text-7xl font-display font-bold text-sage/20">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="lg:col-span-7">
                <h3 className="text-2xl font-display font-bold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-navy-light leading-relaxed">{step.description}</p>
              </div>

              {/* Duration */}
              <div className="lg:col-span-3 lg:text-right">
                {step.duration && (
                  <span className="inline-block px-4 py-2 bg-navy/5 text-navy text-sm font-medium">
                    {step.duration}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
