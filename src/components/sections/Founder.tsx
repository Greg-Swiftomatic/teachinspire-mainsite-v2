import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { HandDrawnButton } from '../ui/HandDrawnButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Hand-drawn style icons
const ClockIconDoodle = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7 L12 12 L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AwardIconDoodle = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14 L6 22 L12 19 L18 22 L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CpuIconDoodle = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 2 L9 5 M15 2 L15 5 M9 19 L9 22 M15 19 L15 22 M2 9 L5 9 M2 15 L5 15 M19 9 L22 9 M19 15 L22 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Doodle-style portrait illustration
const FounderPortrait = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    {/* Head outline - wobbly */}
    <path
      d="M100 30 C140 30 165 60 165 100 C165 145 140 170 100 170 C60 170 35 145 35 100 C35 60 60 30 100 30"
      stroke="#2c3d57"
      strokeWidth="3"
      strokeLinecap="round"
      fill="#F4F3F0"
    />
    {/* Hair - sketchy lines */}
    <path d="M55 70 Q70 45 100 40 Q130 45 145 70" stroke="#2c3d57" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M60 65 Q80 50 100 48" stroke="#2c3d57" strokeWidth="2" strokeLinecap="round" />
    <path d="M140 65 Q120 50 100 48" stroke="#2c3d57" strokeWidth="2" strokeLinecap="round" />
    {/* Glasses frames */}
    <ellipse cx="75" cy="95" rx="18" ry="15" stroke="#2c3d57" strokeWidth="2.5" fill="none" />
    <ellipse cx="125" cy="95" rx="18" ry="15" stroke="#2c3d57" strokeWidth="2.5" fill="none" />
    <path d="M93 95 L107 95" stroke="#2c3d57" strokeWidth="2" strokeLinecap="round" />
    <path d="M57 92 L50 88" stroke="#2c3d57" strokeWidth="2" strokeLinecap="round" />
    <path d="M143 92 L150 88" stroke="#2c3d57" strokeWidth="2" strokeLinecap="round" />
    {/* Smile */}
    <path d="M80 125 Q100 140 120 125" stroke="#2c3d57" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Collar/shoulders hint */}
    <path d="M60 165 Q100 175 140 165" stroke="#2c3d57" strokeWidth="2" strokeLinecap="round" />
    {/* Decorative elements */}
    <circle cx="170" cy="50" r="4" fill="#f1d263" />
    <circle cx="30" cy="140" r="3" fill="#85a2a3" />
    <path d="M175 140 L185 145 L175 150" stroke="#B7553D" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const credentials = [
  {
    icon: ClockIconDoodle,
    value: '9 000+',
    label: "heures d'enseignement",
    color: 'yellow',
  },
  {
    icon: AwardIconDoodle,
    value: 'CELTA',
    label: 'avec mention',
    color: 'sage',
  },
  {
    icon: CpuIconDoodle,
    value: '3 ans',
    label: 'AI Specialist',
    color: 'rust',
  },
];

export function Founder() {
  const prefersReducedMotion = useReducedMotion();

  const colorClasses = {
    yellow: { bg: 'bg-yellow/20', text: 'text-yellow' },
    sage: { bg: 'bg-sage/20', text: 'text-sage' },
    rust: { bg: 'bg-rust/20', text: 'text-rust' },
  };

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden paper-texture relative">
      <Container>
        <SectionTitle>Qui est derrière TeachInspire ?</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="grid md:grid-cols-5 gap-8 items-start"
          >
            {/* Doodle Portrait */}
            <div className="md:col-span-2">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl bg-cream border-2 border-navy/10 p-6 flex items-center justify-center"
                style={{ borderRadius: '28px 20px 32px 18px' }}
              >
                <FounderPortrait />
              </motion.div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <h3 className="text-2xl font-display font-bold text-navy mb-4">
                Greg Le Dall
              </h3>

              {/* Credentials */}
              <div className="flex flex-wrap gap-3 mb-6">
                {credentials.map((cred, idx) => {
                  const Icon = cred.icon;
                  const colors = colorClasses[cred.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 ${colors.bg} px-4 py-2`}
                      style={{ borderRadius: '10px 6px 12px 4px' }}
                    >
                      <div className={`w-5 h-5 ${colors.text}`}>
                        <Icon />
                      </div>
                      <span className="text-navy font-medium text-sm">{cred.value}</span>
                      <span className="text-navy-light text-sm">{cred.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bio */}
              <div className="space-y-4 text-navy-light mb-8 leading-relaxed">
                <p>
                  "J'ai passé des années à enseigner l'anglais à des pros dans des secteurs que je ne connaissais pas. L'aéronautique, la logistique, le juridique...
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
              <HandDrawnButton
                variant="primary"
                size="lg"
                href="https://cal.com/greg-teachinspire/decouverte-teachinspire"
              >
                Réserver un appel avec Greg
              </HandDrawnButton>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
