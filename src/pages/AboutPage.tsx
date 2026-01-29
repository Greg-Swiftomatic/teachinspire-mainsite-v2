import { motion } from 'framer-motion';
import {
  Lightbulb,
  Rocket,
  GraduationCap,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Users,
  MessageSquare,
  Brain,
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MagicCard } from '../components/ui/MagicCard';
import { ILLUSTRATIONS } from '../assets/assets';

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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Timeline data
const timeline = [
  {
    year: '2016',
    title: 'Formation CELTA',
    description: 'Cambridge, Université de Solihull, Birmingham',
    icon: GraduationCap,
    color: 'yellow',
  },
  {
    year: '2016-2022',
    title: 'Enseignement FLE/Anglais',
    description: 'Cours individuels et collectifs',
    icon: Users,
    color: 'sage',
  },
  {
    year: 'Fin 2022',
    title: "Découverte de l'IA générative",
    description: "Début de l'exploration",
    icon: Lightbulb,
    color: 'yellow',
  },
  {
    year: '2023',
    title: 'Expérience aux États-Unis',
    description: "Intégration d'une équipe utilisant l'IA pour automatiser la création de contenu à partir de podcasts",
    icon: MapPin,
    color: 'sage',
  },
  {
    year: '2024',
    title: 'Création de TeachInspire',
    description: 'Première formation',
    icon: Rocket,
    color: 'yellow',
  },
  {
    year: '2025',
    title: 'Ouverture aux instituts',
    description: 'Expansion de la formation',
    icon: Sparkles,
    color: 'sage',
  },
];

// Philosophy points
const philosophyPoints = [
  {
    title: "L'IA est un assistant, pas un remplaçant",
    description:
      "Vous restez le pédagogue. L'IA vous fait gagner du temps, elle ne décide pas à votre place.",
    icon: Brain,
  },
  {
    title: "Maîtriser les types d'outils, pas un outil en particulier",
    description:
      "L'IA évolue vite. Très vite. On vous apprend à comprendre chaque brique (génération de texte, transcription, synthèse vocale) pour que vous puissiez vous adapter, quel que soit l'outil du moment.",
    icon: Sparkles,
  },
  {
    title: "Ne pas rester prisonnier d'une seule solution",
    description:
      "Si demain un meilleur outil sort, vous aurez les compétences pour l'évaluer et l'adopter. C'est ça, l'autonomie.",
    icon: ArrowRight,
  },
  {
    title: 'Rester à jour grâce à la communauté',
    description:
      "Dans un domaine qui évolue aussi vite, on ne peut pas apprendre une fois et s'arrêter là. La communauté permet de faire une veille ensemble, de partager ce qui fonctionne, d'échanger sur nos expérimentations.",
    icon: MessageSquare,
  },
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
              À propos
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
          >
            Derrière <span className="text-sage">TeachInspire</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy-light max-w-2xl mx-auto"
          >
            L'histoire d'un formateur de langues qui a découvert comment l'IA
            pouvait transformer sa pratique — et qui veut partager ça avec vous.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

function WhoAmISection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-yellow/30 via-sage/20 to-yellow/30 rounded-2xl blur-xl"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <img
                src={ILLUSTRATIONS.portraitGregory}
                alt="Grégory - Fondateur de TeachInspire"
                className="relative w-80 h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold font-display text-navy mb-2">
                Je m'appelle Grégory.
              </h2>
              <p className="text-navy-light text-lg">
                Formateur de langues depuis 2016.
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-navy-light">
              Tout a commencé pendant ma formation CELTA à Birmingham.
              On nous encourageait à créer nos propres ressources,
              adaptées à nos vrais élèves. J'ai adoré ça.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-navy-light">
              Puis la réalité m'a rattrapé : 30 heures de cours par semaine,
              8 étudiants avec des besoins complètement différents.
              Des profils techniques, des secteurs que je ne maîtrisais pas,
              des contextes culturels variés, un temps limité pour atteindre leurs objectifs.
              <strong className="text-navy"> Impossible de tout personnaliser. Retour aux manuels standards.</strong>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="p-4 bg-sage/10 rounded-xl border-l-4 border-sage"
            >
              <p className="text-navy-light text-sm space-y-1">
                <span className="block">Le temps : préparer une seule leçon personnalisée peut prendre des heures.</span>
                <span className="block">La diversité des besoins : chaque apprenant a un profil professionnel différent.</span>
                <span className="block">Mes propres limites : je ne suis pas expert de tous les domaines techniques.</span>
              </p>
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

function DeclicSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Fin 2022 : le déclic</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <p className="text-navy-light mb-4">
              Novembre 2022. ChatGPT sort. Un ami m'envoie une vidéo.
              <strong className="text-navy"> Le potentiel est évident.</strong>
            </p>

            <p className="text-navy-light mb-4">
              J'expérimente. Je teste. Je découvre une communauté active
              qui partage ses astuces sur le "prompting".
              Je combine plusieurs outils : génération de texte,
              synthèse vocale, transcription automatique.
            </p>

            <div className="p-4 bg-yellow/10 rounded-xl border border-yellow/20 my-6">
              <p className="text-navy font-medium">
                Le résultat dépasse mes espérances : je retrouve le plaisir
                d'imaginer des leçons personnalisées. Mes élèves bénéficient
                de contenus adaptés à leur secteur professionnel.
              </p>
            </div>

            <p className="text-navy-light">
              Ces outils compensent mes lacunes sur certains domaines techniques.
              Je peux enfin proposer des supports pertinents même dans des domaines
              que je ne maîtrise pas personnellement.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function TeachInspireSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>De l'exploration à TeachInspire</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-navy-light"
        >
          <p>
            En partageant mes découvertes, des collègues enseignants
            me demandent conseil. L'idée de structurer ces connaissances s'impose.
          </p>

          <p className="text-navy font-medium">
            D'abord une formation. Puis une communauté. Puis des outils.
          </p>

          <p>
            Ce qui n'était qu'une démarche personnelle pour surmonter
            mes propres contraintes s'est transformé en projet plus large.
          </p>

          <div className="p-6 bg-sage/10 rounded-xl">
            <p className="text-navy">
              <strong>L'objectif reste simple :</strong> accompagner les enseignants
              dans la découverte et la maîtrise de l'IA,
              personnaliser l'expérience de l'apprenant,
              et dire adieu aux tâches chronophages.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle>Parcours</SectionTitle>

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow via-sage to-yellow" />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                variants={slideInLeft}
                className="relative pl-16 pb-8 last:pb-0"
              >
                {/* Circle marker */}
                <motion.div
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    item.color === 'yellow' ? 'bg-yellow' : 'bg-sage'
                  } shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <item.icon className={`w-6 h-6 ${item.color === 'yellow' ? 'text-navy' : 'text-white'}`} />
                </motion.div>

                {/* Content */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-navy/5">
                  <Badge variant={item.color === 'yellow' ? 'yellow' : 'sage'} className="mb-2">
                    {item.year}
                  </Badge>
                  <h3 className="text-lg font-semibold font-display text-navy mb-1">
                    {item.title}
                  </h3>
                  <p className="text-navy-light text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionTitle>Ce qu'on croit</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {philosophyPoints.map((point, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <MagicCard
                className="h-full bg-cream"
                gradientColor={idx % 2 === 0 ? '#f1d263' : '#85a2a3'}
                gradientOpacity={0.15}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    idx % 2 === 0 ? 'bg-yellow/20' : 'bg-sage/20'
                  }`}>
                    <point.icon className={`w-5 h-5 ${idx % 2 === 0 ? 'text-yellow' : 'text-sage'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{point.title}</h3>
                    <p className="text-navy-light text-sm">{point.description}</p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function CTASection() {
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
            Envie d'en discuter ?
          </h2>

          <p className="text-xl text-cream/80 mb-8">
            Réservez un appel découverte de 45 minutes. Sans engagement.
          </p>

          <Button variant="primary" size="lg" href={CALENDLY_URL}>
            <Calendar className="w-5 h-5 mr-2" />
            Réserver un appel
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Component
export function AboutPage() {
  return (
    <>
      <HeroSection />
      <WhoAmISection />
      <DeclicSection />
      <TeachInspireSection />
      <TimelineSection />
      <PhilosophySection />
      <CTASection />
    </>
  );
}
