import { motion } from 'framer-motion';
import {
  Monitor,
  Palette,
  BarChart3,
  Settings,
  Users,
  Clock,
  Headphones,
  CheckCircle,
  ArrowRight,
  Calendar,
  Sparkles,
  Building,
  GraduationCap,
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MagicCard, TiltCard } from '../components/ui/MagicCard';

const CALENDLY_URL = 'https://cal.com/greg-teachinspire/decouverte-teachinspire';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Data
const whiteLabelFeatures = [
  {
    icon: Palette,
    text: 'Intégration en marque blanche (votre logo, vos couleurs)',
  },
  {
    icon: Settings,
    text: 'Installation et personnalisation comprises',
  },
  {
    icon: BarChart3,
    text: 'Tableau de bord pour suivre la progression',
  },
  {
    icon: Sparkles,
    text: 'Possibilité de customiser les programmes',
  },
];

const languages = [
  { name: 'Anglais', flag: '🇬🇧' },
  { name: 'Français Langue Étrangère (FLE)', flag: '🇫🇷' },
];

const institutBenefits = [
  { icon: Settings, text: 'Installation et personnalisation comprises' },
  { icon: CheckCircle, text: "Pas d'abonnement mensuel fixe" },
  { icon: BarChart3, text: 'Tableau de bord de suivi' },
  { icon: Headphones, text: 'Support dédié' },
];

const learnerBenefits = [
  { icon: GraduationCap, text: "Accès jusqu'à complétion du niveau" },
  { icon: Clock, text: 'Progression à leur rythme, 24/7' },
  { icon: Sparkles, text: 'Contenu professionnel et engageant' },
];

// Components
function HeroSection() {
  return (
    <section className="bg-cream pt-32 pb-16 lg:pb-24 overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="sage" className="mb-6">
              Plateforme d'apprentissage
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
          >
            Une plateforme d'apprentissage{' '}
            <span className="text-sage">en marque blanche</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy-light mb-8 max-w-3xl mx-auto"
          >
            Enrichissez votre offre digitale avec des parcours complets
            pour vos apprenants. <strong className="text-navy">Votre outil, votre marque.</strong>
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button variant="primary" size="lg" href={CALENDLY_URL}>
              <Calendar className="w-5 h-5 mr-2" />
              Demander une démo
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function ConceptSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>L'apprentissage personnalisé, à grande échelle</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-lg text-navy-light"
        >
          <p>
            Et si vos apprenants avaient accès à des contenus
            créés spécialement pour eux ? Adaptés à leur niveau,
            leur secteur, leurs objectifs ?
          </p>

          <p className="text-navy font-medium">
            C'est exactement ce que permet notre plateforme.
          </p>

          <p>
            Elle est la suite logique de ce qu'on sait maintenant faire
            en personnalisation pédagogique : textes adaptés, audios naturels,
            exercices ciblés — générés avec l'IA, structurés par des pédagogues.
          </p>

          <div className="p-6 bg-sage/10 rounded-xl border border-sage/20">
            <p className="text-navy font-medium">
              Un complément à vos cours, pas un remplacement.
            </p>
            <p className="text-navy-light mt-2">
              Vos formateurs restent au cœur de l'accompagnement.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function WhiteLabelSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle>Votre plateforme, votre identité</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {whiteLabelFeatures.map((feature, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <TiltCard className="h-full bg-white" tiltAmount={5}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-sage" />
                  </div>
                  <p className="text-navy-light">{feature.text}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function LanguagesSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Langues disponibles</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 mb-8"
        >
          {languages.map((lang, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              className="flex items-center gap-4 p-4 bg-cream rounded-xl"
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="text-navy font-medium">{lang.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-navy-light text-sm"
        >
          D'autres langues peuvent être développées selon vos besoins.
        </motion.p>
      </Container>
    </section>
  );
}

function ModelSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle>Comment ça fonctionne</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For Institute */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MagicCard className="h-full bg-white" gradientColor="#85a2a3" gradientOpacity={0.15}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center">
                  <Building className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-semibold font-display text-navy">
                  Pour votre institut
                </h3>
              </div>

              <ul className="space-y-4">
                {institutBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-sage flex-shrink-0" />
                    <span className="text-navy-light">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </MagicCard>
          </motion.div>

          {/* For Learners */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <MagicCard className="h-full bg-white" gradientColor="#f1d263" gradientOpacity={0.15}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow" />
                </div>
                <h3 className="text-xl font-semibold font-display text-navy">
                  Pour vos apprenants
                </h3>
              </div>

              <ul className="space-y-4">
                {learnerBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-yellow flex-shrink-0" />
                    <span className="text-navy-light">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </MagicCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function OriginSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Née d'un besoin réel</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="bg-cream rounded-2xl p-8">
            <p className="text-navy-light mb-4">
              Cette plateforme n'est pas née dans un laboratoire.
            </p>

            <p className="text-navy font-medium mb-4">
              Elle est la suite logique de tout ce qu'on sait maintenant faire
              en matière de personnalisation pédagogique grâce à l'IA.
            </p>

            <div className="space-y-3 my-6 pl-4 border-l-2 border-sage">
              <p className="text-navy-light">
                Des textes adaptés au niveau, au secteur, aux objectifs de l'apprenant.
              </p>
              <p className="text-navy-light">
                Des audios naturels générés en quelques minutes.
              </p>
              <p className="text-navy-light">
                Des exercices ciblés sur les vrais besoins.
              </p>
            </div>

            <p className="text-navy-light mb-4">
              Il fallait un endroit pour déployer tout ça.
            </p>

            <div className="p-4 bg-sage/10 rounded-xl">
              <p className="text-navy">
                Cette plateforme combine ce que les pédagogues savent faire
                — comprendre les besoins, structurer l'apprentissage, créer du sens —
                avec ce que l'IA permet — <strong>personnaliser à grande échelle,
                sans compromis sur la qualité</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="bg-navy py-16 lg:py-24">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-cream mb-4">
            Intéressé par la plateforme ?
          </h2>

          <p className="text-xl text-cream/80 mb-8">
            On vous montre le produit en 20 minutes.
          </p>

          <Button variant="primary" size="lg" href={CALENDLY_URL}>
            <Monitor className="w-5 h-5 mr-2" />
            Demander une démo
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Component
export function PlateformePage() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <WhiteLabelSection />
      <LanguagesSection />
      <ModelSection />
      <OriginSection />
      <FinalCTASection />
    </>
  );
}
