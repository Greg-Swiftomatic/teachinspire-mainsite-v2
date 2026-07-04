import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GridOverlay } from '../ui/GridOverlay';
import { KineticHeading } from '../animation/KineticHeading';
import { GeometricAccentGroup } from '../animation/GeometricAccentGroup';
import CountUp from '../reactbits/CountUp';
import { ArrowUpRight, Linkedin } from 'lucide-react';

const credentials = [
  {
    value: '9 000+',
    label: "heures d'enseignement",
  },
  {
    value: 'CELTA',
    label: 'avec mention',
  },
  {
    value: '3 ans',
    label: 'AI Specialist',
  },
];

export function Founder() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden relative">
      <GridOverlay />
      <GeometricAccentGroup preset="founder" />

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
            <div className="w-12 h-px bg-rust" />
            <span className="text-rust font-medium text-sm tracking-wide uppercase">
              Le fondateur
            </span>
          </motion.div>

          <KineticHeading
            variant="cascade"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight"
          >
            Qui est derrière
          </KineticHeading>
          <KineticHeading
            variant="assemble"
            as="span"
            className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-rust leading-tight mt-2"
            delay={0.25}
          >
            TeachInspire ?
          </KineticHeading>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - LinkedIn link */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <a
              href="https://www.linkedin.com/in/greg-teachinspire/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir le profil LinkedIn de Greg Le Dall"
              className="group block border border-navy/15 bg-cream p-6 transition-colors duration-200 hover:border-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:p-7"
            >
              <span className="flex items-center gap-4">
                <span className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-navy/15 bg-white p-1 transition-colors duration-200 group-hover:border-rust">
                  <img
                    src="/greg-linkedin-profile.webp"
                    alt="Portrait de Greg Le Dall"
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-rust">
                    LinkedIn
                  </span>
                  <span className="block text-xl font-display font-semibold leading-tight text-navy">
                    Greg Le Dall
                  </span>
                  <span className="mt-1 block text-sm text-navy-light">
                    Fondateur de TeachInspire
                  </span>
                </span>
                <span className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center border border-navy/15 text-navy transition-colors duration-200 group-hover:border-rust group-hover:text-rust">
                  <Linkedin size={21} aria-hidden="true" />
                </span>
              </span>
              <span className="mt-6 flex items-center justify-between gap-4 border-t border-navy/10 pt-5">
                <span className="text-sm font-semibold text-navy transition-colors duration-200 group-hover:text-rust">
                  Voir le profil LinkedIn
                </span>
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-rust transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </a>
          </motion.div>

          {/* Right - Bio */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-navy mb-6">
              Greg Le Dall
            </h3>

            {/* Credentials */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-navy/10">
              {/* 9 000+ with spring CountUp */}
              <div>
                <div className="text-2xl font-display font-bold text-sage">
                  <CountUp to={9000} separator=" " duration={2.5} className="text-2xl font-display font-bold text-sage" />
                  <span className="text-2xl font-display font-bold text-sage">+</span>
                </div>
                <p className="text-sm text-navy-light">heures d'enseignement</p>
              </div>
              {/* Text-based credentials */}
              {credentials.slice(1).map((cred, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-display font-bold text-sage">
                    <KineticHeading
                      variant="counter-roll"
                      as="span"
                      className="text-2xl font-display font-bold text-sage"
                      delay={0.5 + idx * 0.1}
                    >
                      {cred.value}
                    </KineticHeading>
                  </div>
                  <p className="text-sm text-navy-light">{cred.label}</p>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-4 text-navy-light leading-relaxed mb-8">
              <p>
                "J'ai passé des années à enseigner l'anglais à des pros dans des secteurs
                que je ne connaissais pas. L'aéronautique, la logistique, le juridique...
              </p>
              <p>
                Quand l'IA générative est arrivée, j'ai vu le potentiel immédiatement.{' '}
                <span className="text-navy font-medium">
                  On pouvait enfin préparer des supports vraiment proches du terrain.
                </span>
              </p>
              <p>
                Mais j'ai aussi vu le piège : devenir dépendant d'un outil qu'on ne
                comprend pas.{' '}
                <span className="text-navy font-medium">
                  TeachInspire part de là : une méthode d'abord, les outils ensuite."
                </span>
              </p>
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              href="https://cal.com/teachinspire.me"
              showArrow
            >
              Réserver un appel avec Greg
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
