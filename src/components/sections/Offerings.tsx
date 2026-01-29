import { motion } from 'framer-motion';
import { GraduationCap, Monitor } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { MagicCard } from '../ui/MagicCard';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const offerings = [
  {
    icon: GraduationCap,
    badge: 'FORMATION IA',
    title: 'Maîtrisez la création sur-mesure',
    description:
      "Vos formateurs apprennent à transformer n'importe quelle source en cours adapté — niveau, secteur, objectifs.",
    details: '3 modules progressifs. Cadence recommandée : 3 mois. Planning flexible adapté à vos contraintes.',
    cta: {
      label: 'Découvrir la formation',
      href: '/formation',
      variant: 'primary' as const,
    },
    glowColor: '#f1d263',
    highlighted: true,
  },
  {
    icon: Monitor,
    badge: "PLATEFORME D'APPRENTISSAGE",
    title: 'Votre solution en marque blanche',
    description:
      'Des parcours personnalisés pour vos apprenants, intégrés à votre institut. Votre outil, votre marque.',
    details: 'Installation et personnalisation comprises. Disponible en anglais et FLE.',
    cta: {
      label: 'En savoir plus',
      href: '/plateforme',
      variant: 'secondary' as const,
    },
    glowColor: '#85a2a3',
    highlighted: false,
  },
];

export function Offerings() {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionTitle>Deux façons de travailler ensemble</SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          {offerings.map((offering) => (
            <motion.div key={offering.title} variants={cardVariants}>
              <MagicCard
                className={`h-full ${offering.highlighted ? 'bg-cream ring-2 ring-yellow/30' : 'bg-cream'}`}
                gradientColor={offering.glowColor}
                gradientOpacity={0.2}
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      offering.highlighted ? 'bg-yellow/20' : 'bg-sage/20'
                    }`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <offering.icon
                      className={`w-7 h-7 ${offering.highlighted ? 'text-yellow' : 'text-sage'}`}
                      aria-hidden="true"
                    />
                  </motion.div>
                  <Badge variant={offering.highlighted ? 'yellow' : 'sage'}>
                    {offering.badge}
                  </Badge>
                </div>

                <h3 className="text-2xl font-semibold font-display text-navy mb-3">
                  {offering.title}
                </h3>

                <p className="text-navy-light mb-4">{offering.description}</p>

                <p className="text-sm text-navy-light/80 mb-8">{offering.details}</p>

                <Button
                  variant={offering.cta.variant}
                  size="lg"
                  href={offering.cta.href}
                  className="w-full justify-center"
                >
                  {offering.cta.label}
                </Button>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
