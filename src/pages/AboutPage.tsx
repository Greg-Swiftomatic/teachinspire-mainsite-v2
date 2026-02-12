import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ILLUSTRATIONS } from '../assets/assets';
import { GridOverlay } from '../components/ui/GridOverlay';
import { KineticHeading } from '../components/animation/KineticHeading';
import { GeometricAccentGroup } from '../components/animation/GeometricAccentGroup';
import { ScrollThreadContainer } from '../components/animation/ScrollThreadContainer';
import { AboutLandscape } from '../components/illustrations/about/AboutLandscape';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import BlurText from '../components/reactbits/BlurText';

const CALENDLY_URL = 'https://cal.com/teachinspire.me';

function useAnimationVariants(prefersReducedMotion: boolean) {
  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  return { fadeInUp, staggerContainer };
}

// Timeline data
const timeline = [
  {
    year: '2016',
    title: 'Formation CELTA',
    description: 'Cambridge, Université de Solihull, Birmingham',
  },
  {
    year: '2016—2022',
    title: 'Enseignement FLE/Anglais',
    description: 'Cours individuels et collectifs',
  },
  {
    year: '2022',
    title: "Découverte de l'IA générative",
    description: "Début de l'exploration et des expérimentations",
  },
  {
    year: '2023',
    title: 'Expérience aux États-Unis',
    description: "Intégration d'une équipe utilisant l'IA pour automatiser la création de contenu à partir de podcasts",
  },
  {
    year: '2024',
    title: 'Création de TeachInspire',
    description: 'Lancement de la première formation',
  },
  {
    year: '2025',
    title: 'Ouverture aux instituts',
    description: 'Expansion de la formation aux équipes',
  },
];

// Philosophy points
const philosophyPoints = [
  {
    number: '01',
    title: "L'IA est un assistant, pas un remplaçant",
    description:
      "Vous restez le pédagogue. L'IA vous fait gagner du temps, elle ne décide pas à votre place.",
  },
  {
    number: '02',
    title: "Maîtriser les types d'outils, pas un outil en particulier",
    description:
      "L'IA évolue vite. Très vite. On vous apprend à comprendre chaque brique (génération de texte, transcription, synthèse vocale) pour que vous puissiez vous adapter, quel que soit l'outil du moment.",
  },
  {
    number: '03',
    title: "Ne pas rester prisonnier d'une seule solution",
    description:
      "Si demain un meilleur outil sort, vous aurez les compétences pour l'évaluer et l'adopter. C'est ça, l'autonomie.",
  },
  {
    number: '04',
    title: 'Rester à jour grâce à la communauté',
    description:
      "Dans un domaine qui évolue aussi vite, on ne peut pas apprendre une fois et s'arrêter là. La communauté permet de faire une veille ensemble, de partager ce qui fonctionne, d'échanger sur nos expérimentations.",
  },
];

// Section Label Component
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
        {children}
      </span>
      <div className="flex-1 h-px bg-navy/10" />
    </div>
  );
}

// Hero Section
function HeroSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { fadeInUp, staggerContainer } = useAnimationVariants(prefersReducedMotion);

  return (
    <section className="bg-cream min-h-[60vh] relative overflow-hidden">
      <GridOverlay />
      <GeometricAccentGroup preset="about-hero" />
      <AboutLandscape />

      <Container>
        <div className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            {/* Label */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                À propos
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6">
              <BlurText
                text="Derrière"
                delay={100}
                animateBy="words"
                direction="bottom"
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy leading-[1.1] tracking-tight"
                stepDuration={0.4}
              />
              <BlurText
                text="TeachInspire"
                delay={80}
                animateBy="letters"
                direction="bottom"
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-rust leading-[1.1] tracking-tight"
                stepDuration={0.35}
              />
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-navy/70 max-w-2xl leading-relaxed"
            >
              L'histoire d'un formateur de langues qui a découvert comment l'IA
              pouvait transformer sa pratique — et qui veut partager ça avec vous.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Who Am I Section
function WhoAmISection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { fadeInUp, staggerContainer } = useAnimationVariants(prefersReducedMotion);

  return (
    <section className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            className="lg:col-span-4"
          >
            <div className="aspect-[3/4] bg-sage/20 border border-navy/10 overflow-hidden">
              <img
                src={ILLUSTRATIONS.portraitGregory}
                alt="Grégory - Fondateur de TeachInspire"
                width={400}
                height={533}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-navy/50 mt-3 tracking-wider uppercase">
              Grégory · Fondateur
            </p>
          </motion.div>

          {/* Text Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-8 space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Le fondateur</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy mb-2">
                Je m'appelle Grégory.
              </h2>
              <p className="text-navy/60 text-lg">
                Formateur de langues depuis 2016.
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-navy/70 leading-relaxed">
              Tout a commencé pendant ma formation CELTA à Birmingham.
              On nous encourageait à créer nos propres ressources,
              adaptées à nos vrais élèves. J'ai adoré ça.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-navy/70 leading-relaxed">
              Puis la réalité m'a rattrapé : 30 heures de cours par semaine,
              8 étudiants avec des besoins complètement différents.
              Des profils techniques, des secteurs que je ne maîtrisais pas,
              des contextes culturels variés, un temps limité pour atteindre leurs objectifs.
              <strong className="text-navy"> Impossible de tout personnaliser. Retour aux manuels standards.</strong>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="p-6 bg-cream/50 border-l-2 border-sage"
            >
              <div className="space-y-2 text-sm text-navy/70">
                <p><strong className="text-navy">Le temps :</strong> préparer une seule leçon personnalisée peut prendre des heures.</p>
                <p><strong className="text-navy">La diversité des besoins :</strong> chaque apprenant a un profil professionnel différent.</p>
                <p><strong className="text-navy">Mes propres limites :</strong> je ne suis pas expert de tous les domaines techniques.</p>
              </div>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-navy font-medium">
              Comme tant d'autres enseignants, j'ai fini par accepter ce compromis qualité-temps.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Déclic Section
function DeclicSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-cream py-20 lg:py-28 relative overflow-hidden">
      <GeometricAccentGroup preset="about-declic" />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Label */}
          <div className="lg:col-span-4">
            <SectionLabel>Le déclic</SectionLabel>
            <KineticHeading
              variant="cascade"
              as="h2"
              className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight"
            >
              Fin 2022
            </KineticHeading>
          </div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 lg:p-10 border border-navy/10">
              <p className="text-navy/70 mb-6 leading-relaxed">
                Novembre 2022. ChatGPT sort. Un ami m'envoie une vidéo.
                <strong className="text-navy"> Le potentiel est évident.</strong>
              </p>

              <p className="text-navy/70 mb-6 leading-relaxed">
                J'expérimente. Je teste. Je découvre une communauté active
                qui partage ses astuces sur le "prompting".
                Je combine plusieurs outils : génération de texte,
                synthèse vocale, transcription automatique.
              </p>

              <div className="p-6 bg-yellow/10 border-l-2 border-yellow mb-6">
                <p className="text-navy font-medium">
                  Le résultat dépasse mes espérances : je retrouve le plaisir
                  d'imaginer des leçons personnalisées. Mes élèves bénéficient
                  de contenus adaptés à leur secteur professionnel.
                </p>
              </div>

              <p className="text-navy/70 leading-relaxed">
                Ces outils compensent mes lacunes sur certains domaines techniques.
                Je peux enfin proposer des supports pertinents même dans des domaines
                que je ne maîtrise pas personnellement.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// TeachInspire Birth Section
function TeachInspireBirthSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Label */}
          <div className="lg:col-span-4">
            <SectionLabel>La naissance</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              De l'exploration à TeachInspire
            </h2>
          </div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="lg:col-span-8 space-y-6"
          >
            <p className="text-navy/70 leading-relaxed">
              En partageant mes découvertes, des collègues enseignants
              me demandent conseil. L'idée de structurer ces connaissances s'impose.
            </p>

            <p className="text-navy font-medium">
              D'abord une formation. Puis une communauté. Puis des outils.
            </p>

            <p className="text-navy/70 leading-relaxed">
              Ce qui n'était qu'une démarche personnelle pour surmonter
              mes propres contraintes s'est transformé en projet plus large.
            </p>

            <div className="p-6 bg-sage/10 border-l-2 border-sage">
              <p className="text-navy">
                <strong>L'objectif reste simple :</strong> accompagner les enseignants
                dans la découverte et la maîtrise de l'IA,
                personnaliser l'expérience de l'apprenant,
                et dire adieu aux tâches chronophages.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Timeline Section
function TimelineSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { fadeInUp, staggerContainer } = useAnimationVariants(prefersReducedMotion);
  return (
    <section className="bg-cream py-20 lg:py-28 relative overflow-hidden">
      <GeometricAccentGroup preset="about-timeline" />
      <Container>
        <SectionLabel>Parcours</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <KineticHeading
              variant="cascade"
              as="h2"
              className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight"
            >
              Les étapes clés
            </KineticHeading>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white p-6 border border-navy/10"
            >
              <span className="text-xs font-medium tracking-wider uppercase text-rust block mb-3">
                {item.year}
              </span>
              <h3 className="text-lg font-display font-semibold text-navy mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-navy/60">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// Philosophy Section
function PhilosophySection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { fadeInUp, staggerContainer } = useAnimationVariants(prefersReducedMotion);
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionLabel>Philosophie</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Ce qu'on croit
            </h2>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {philosophyPoints.map((point) => (
            <motion.div
              key={point.number}
              variants={fadeInUp}
            >
              <SpotlightCard
                className="bg-cream/50 p-6 border border-navy/10 h-full"
                spotlightColor="rgba(133, 162, 163, 0.12)"
              >
              <span className="text-4xl font-display font-bold text-navy/10 block mb-3" aria-hidden="true">
                {point.number}
              </span>
              <h3 className="text-lg font-display font-semibold text-navy mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-navy/60 leading-relaxed">
                {point.description}
              </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// CTA Section
function CTASection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-navy py-20 lg:py-28 relative overflow-hidden">
      <GridOverlay variant="light" />
      <GeometricAccentGroup preset="about-cta" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-yellow mb-6 block">
            Prochaine étape
          </span>

          <KineticHeading
            variant="cascade"
            as="h2"
            className="text-3xl sm:text-4xl font-display font-semibold text-cream mb-6"
          >
            Envie d'en discuter ?
          </KineticHeading>

          <p className="text-xl text-cream/70 mb-8">
            Réservez un appel découverte de 45 minutes. Sans engagement.
          </p>

          <Button variant="primary" size="lg" href={CALENDLY_URL} showArrow>
            Réserver un appel
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Component
export function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ScrollThreadContainer preset="about">
      <HeroSection prefersReducedMotion={prefersReducedMotion} />
      <WhoAmISection prefersReducedMotion={prefersReducedMotion} />
      <DeclicSection prefersReducedMotion={prefersReducedMotion} />
      <TeachInspireBirthSection prefersReducedMotion={prefersReducedMotion} />
      <TimelineSection prefersReducedMotion={prefersReducedMotion} />
      <PhilosophySection prefersReducedMotion={prefersReducedMotion} />
      <CTASection prefersReducedMotion={prefersReducedMotion} />
    </ScrollThreadContainer>
  );
}
