import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { Clock, Award, Cpu } from 'lucide-react';

const credentials = [
  {
    icon: Clock,
    value: '9 000+',
    label: "heures d'enseignement en ligne",
  },
  {
    icon: Award,
    value: 'CELTA',
    label: 'avec mention (2016)',
  },
  {
    icon: Cpu,
    value: '3 ans',
    label: 'AI Integration Specialist',
  },
];

export function Founder() {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <SectionTitle>Qui est derrière TeachInspire ?</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-8 items-start"
          >
            {/* Photo placeholder */}
            <div className="md:col-span-2">
              <div className="aspect-square rounded-2xl bg-navy/5 border-2 border-dashed border-navy/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sage/20 flex items-center justify-center">
                    <span className="text-sage font-display font-bold text-3xl">G</span>
                  </div>
                  <p className="text-navy-light text-sm">Photo</p>
                  <p className="text-navy-light/60 text-xs">(placeholder)</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <h3 className="text-2xl font-display font-bold text-navy mb-4">
                Greg Le Dall
              </h3>

              {/* Credentials */}
              <div className="flex flex-wrap gap-4 mb-6">
                {credentials.map((cred, idx) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-cream px-3 py-2 rounded-lg"
                    >
                      <Icon className="w-4 h-4 text-sage" />
                      <span className="text-navy font-medium text-sm">{cred.value}</span>
                      <span className="text-navy-light text-sm">{cred.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bio */}
              <div className="space-y-4 text-navy-light mb-8">
                <p>
                  "J'ai passé des années à enseigner l'anglais à des pros dans des secteurs que je ne connaissais pas. L'aéronautique, la finance, le juridique...
                </p>
                <p>
                  Quand l'IA générative est arrivée, j'ai vu le potentiel immédiatement.{' '}
                  <span className="text-navy font-medium">
                    Pas pour remplacer ce qu'on fait — pour amplifier notre capacité à personnaliser.
                  </span>
                </p>
                <p>
                  Mais j'ai aussi vu le piège : devenir dépendant d'un outil qu'on ne comprend pas.{' '}
                  <span className="text-navy font-medium">
                    C'est pour ça que TeachInspire enseigne une méthode, pas un mode d'emploi."
                  </span>
                </p>
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              >
                Réserver un appel avec Greg
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
