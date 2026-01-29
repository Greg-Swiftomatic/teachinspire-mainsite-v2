import { motion } from 'framer-motion';
import {
  Video,
  Users,
  Wrench,
  BookOpen,
  MessageSquare,
  Rocket,
  CheckCircle,
  Headphones,
  Globe,
  Sparkles,
  ArrowRight,
  Calendar,
  Zap,
  Target,
  Brain,
  Mic,
  FileText,
  Lightbulb,
  Workflow,
} from 'lucide-react';
import { Container } from '../components/layout/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MagicCard, TiltCard, BorderGlowCard } from '../components/ui/MagicCard';

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
const targetAudience = [
  "Vous voulez créer des cours adaptés au secteur et aux objectifs de chaque apprenant",
  "Vous êtes limité par ce que les manuels proposent",
  "Vous avez des apprenants dans des domaines que vous ne maîtrisez pas",
  "Vous voulez exploiter des ressources authentiques (vidéos, podcasts, articles) mais c'est trop long à adapter",
  "Vos formateurs ont testé l'IA mais ne voient pas comment l'utiliser concrètement",
];

const modules = [
  {
    number: 1,
    period: 'Mois 1',
    title: 'Panorama des Outils IA',
    objective: "Se familiariser avec les briques essentielles de l'IA générative pour l'enseignement.",
    topics: [
      { icon: Lightbulb, text: "Qu'est-ce que l'IA générative ? (démystification)" },
      { icon: Brain, text: 'Les modèles de langage : ces "cerveaux" qui génèrent du texte' },
      { icon: Mic, text: 'Transcription automatique : transformer audio/vidéo en texte instantanément' },
      { icon: Headphones, text: 'Synthèse vocale : créer des audios naturels (monologues, dialogues)' },
      { icon: Zap, text: "Prise en main d'un environnement de travail IA" },
    ],
    deliverable: 'Votre première ressource pédagogique créée avec l\'IA',
    bonus: {
      name: 'App "Text 2 Script"',
      description: 'Générateur de dialogues formatés',
    },
    color: 'yellow',
  },
  {
    number: 2,
    period: 'Mois 2',
    title: 'Prompt Engineering',
    objective: 'Obtenir des résultats stables, précis et exploitables grâce à des instructions bien structurées.',
    topics: [
      { icon: Target, text: 'Principes de formulation (pourquoi vos prompts ne marchent pas)' },
      { icon: FileText, text: "Anatomie d'un prompt expert (analyse détaillée)" },
      { icon: Rocket, text: 'Méthode MVP (Minimum Viable Prompt)' },
      { icon: Brain, text: "IA agentique : faire s'auto-évaluer l'IA" },
      { icon: Sparkles, text: 'Choix du modèle selon la tâche' },
    ],
    deliverable: 'Votre premier prompt professionnel réutilisable',
    bonus: {
      name: 'App "Prompt Builder"',
      description: 'Structurez vos prompts en quelques clics',
    },
    color: 'sage',
  },
  {
    number: 3,
    period: 'Mois 3',
    title: 'Workflows Complets',
    objective: 'Transformer une ressource authentique en séquence pédagogique complète et imprimable.',
    topics: [
      { icon: BookOpen, text: 'Trouver des ressources pertinentes (banque de mots-clés, Perplexity)' },
      { icon: Workflow, text: 'Workflow complet : vidéo → transcription → points de langue → audio' },
      { icon: Target, text: 'Backward Design : objectifs, critères, progression' },
      { icon: FileText, text: 'Créer fiches prof & élève (HTML → PDF)' },
      { icon: Users, text: 'Adapter au niveau (B2 → A2)' },
    ],
    deliverable: '2 séquences complètes (B2 et A2) avec tous les supports',
    bonus: {
      name: 'Annexe IA & Éthique',
      description: 'Anonymiser les données sensibles (RGPD)',
    },
    color: 'yellow',
  },
];

const inclusions = [
  {
    title: 'Formation Live',
    icon: Video,
    items: [
      '6 à 8 webinaires dédiés à votre équipe',
      'Sessions pratiques avec vos cas réels',
      'Coaching sur les premiers cours créés',
      'Planning flexible adapté à vos contraintes',
    ],
  },
  {
    title: 'Outils Exclusifs',
    icon: Wrench,
    items: [
      'Prompt Builder Pro (accès à vie)',
      'Text 2 Script Generator (accès à vie)',
      'Mises à jour automatiques incluses',
    ],
  },
  {
    title: 'Ressources',
    icon: BookOpen,
    items: [
      'Bibliothèque de leçons créées avec nos méthodes',
      'Templates de prompts prêts à personnaliser',
      'Fiches récapitulatives de chaque module',
    ],
  },
];

const communityBenefits = [
  'Veille partagée sur les outils et les évolutions',
  'Échange sur les expérimentations de chacun',
  "Questions/réponses avec d'autres formateurs",
  'Webinaires de mise à jour sur les nouveautés',
];

const futureModules = [
  'Formation Notion Pédagogique',
  'Workflow Notebook LM',
  'Accès prioritaire aux nouvelles techniques IA',
];

const guarantees = [
  { icon: Headphones, text: 'Support prioritaire pendant toute la durée de la formation' },
  { icon: Globe, text: 'Formation bilingue (français/anglais) — idéal pour équipes mixtes' },
  { icon: Sparkles, text: 'Mises à jour des outils et contenus incluses' },
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
            <Badge variant="yellow" className="mb-6">
              Formation pour Instituts
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-navy mb-6 leading-tight"
          >
            Apprenez à transformer{' '}
            <span className="text-sage">n'importe quelle source en cours sur-mesure.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-navy-light mb-4 max-w-3xl mx-auto"
          >
            Une formation pour maîtriser l'IA pédagogique.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-navy-light/80 mb-8"
          >
            <strong className="text-navy">15 tutoriels vidéo (6h)</strong> + <strong className="text-navy">6 à 8 sessions live</strong> adaptées à votre équipe.
            <br />
            Cadence recommandée : 3 mois. Adaptable selon vos contraintes.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button variant="primary" size="lg" href={CALENDLY_URL}>
              <Calendar className="w-5 h-5 mr-2" />
              Réserver un appel découverte
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function ForWhoSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Cette formation est faite pour vous si...</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4"
        >
          {targetAudience.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-4 p-4 rounded-xl bg-cream/50 border border-navy/5"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 400 }}
              >
                <ArrowRight className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
              </motion.div>
              <p className="text-navy-light">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Ce que vous saurez faire à la fin</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-navy/10"
        >
          <p className="text-lg text-navy-light mb-6">
            Prendre n'importe quelle source — une vidéo YouTube, un podcast, 
            un article technique, un document de l'entreprise de votre apprenant — 
            et la transformer en cours parfaitement adapté.
          </p>

          <p className="text-navy font-medium mb-6">
            Au bon niveau. Avec le bon vocabulaire. 
            Avec des exercices ciblés. Et des audios naturels si besoin.
          </p>

          <div className="p-4 bg-yellow/10 rounded-xl border border-yellow/20">
            <p className="text-navy font-medium">
              Le tout en une fraction du temps que ça prendrait sans l'IA.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function ModulesSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionTitle subtitle="De la découverte des outils à la création de séquences complètes.">
          Un parcours progressif en 3 étapes
        </SectionTitle>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-navy-light mb-12"
        >
          Cadence recommandée : 3 mois. Adaptable selon les contraintes de votre équipe.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-8"
        >
          {modules.map((module) => (
            <motion.div key={module.number} variants={fadeInUp}>
              <BorderGlowCard
                glowColor={module.color === 'yellow' ? '#f1d263' : '#85a2a3'}
                className="overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Module Header */}
                  <div className="lg:w-1/3 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                          module.color === 'yellow'
                            ? 'bg-yellow text-navy'
                            : 'bg-sage text-white'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {module.number}
                      </motion.div>
                      <div>
                        <Badge variant={module.color === 'yellow' ? 'yellow' : 'sage'}>
                          Module {module.number}
                        </Badge>
                        <p className="text-sm text-navy-light mt-1">{module.period}</p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold font-display text-navy mb-3">
                      {module.title}
                    </h3>

                    <p className="text-navy-light text-sm mb-4 flex-grow">
                      <strong className="text-navy">Objectif :</strong> {module.objective}
                    </p>

                    {/* Bonus badge */}
                    <div
                      className={`p-3 rounded-lg ${
                        module.color === 'yellow' ? 'bg-yellow/10' : 'bg-sage/10'
                      }`}
                    >
                      <p className="text-sm font-medium text-navy">
                        [Bonus] {module.bonus.name}
                      </p>
                      <p className="text-xs text-navy-light">{module.bonus.description}</p>
                    </div>
                  </div>

                  {/* Module Content */}
                  <div className="lg:w-2/3 lg:border-l lg:border-navy/10 lg:pl-8">
                    <p className="text-sm font-medium text-navy mb-4">Au programme :</p>
                    <ul className="space-y-3 mb-6">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <topic.icon className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                          <span className="text-navy-light">{topic.text}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-navy/5 rounded-lg">
                      <p className="text-sm">
                        <strong className="text-navy">Livrable :</strong>{' '}
                        <span className="text-navy-light">{module.deliverable}</span>
                      </p>
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

function InclusionsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionTitle>Ce que vous recevez</SectionTitle>

        {/* Main inclusions grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {inclusions.map((inclusion) => (
            <motion.div key={inclusion.title} variants={scaleIn}>
              <TiltCard className="h-full bg-cream" tiltAmount={5}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow/20 flex items-center justify-center">
                    <inclusion.icon className="w-5 h-5 text-yellow" />
                  </div>
                  <h3 className="font-semibold font-display text-navy">{inclusion.title}</h3>
                </div>
                <ul className="space-y-2">
                  {inclusion.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-navy-light">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Community section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MagicCard className="bg-navy text-cream" gradientColor="#f1d263" gradientOpacity={0.1}>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-yellow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-display">Communauté</h3>
                    <Badge variant="yellow">1 an inclus</Badge>
                  </div>
                </div>

                <p className="text-cream/80 mb-4">
                  L'IA évolue constamment. De nouveaux outils sortent chaque mois,
                  de plus en plus performants, de moins en moins chers.
                </p>
                <p className="text-cream/80 mb-4">
                  Une formation seule ne suffit pas. Il faut pouvoir rester à jour.
                </p>
                <p className="text-cream font-medium">
                  Avec l'accès à community.teachinspire.me, vous bénéficiez de :
                </p>
              </div>

              <div className="lg:w-1/2 space-y-4">
                {communityBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-yellow flex-shrink-0" />
                    <p className="text-cream/90">{benefit}</p>
                  </div>
                ))}

                <div className="pt-4 border-t border-cream/10 mt-6">
                  <p className="text-sm text-cream/70">
                    Chaque institut a son <strong className="text-cream">espace privé</strong> au sein de la communauté.
                    L'espace général permet d'échanger plus largement avec tous les membres.
                  </p>
                </div>
              </div>
            </div>
          </MagicCard>
        </motion.div>

        {/* Future modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-6 bg-sage/10 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-5 h-5 text-sage" />
            <h4 className="font-semibold text-navy">Modules Futurs Inclus</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {futureModules.map((module, idx) => (
              <Badge key={idx} variant="sage">
                {module}
              </Badge>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function EnvironmentSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Notre approche : les types d'outils, pas les outils</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-navy/10"
        >
          <p className="text-navy-light mb-6">
            L'IA évolue vite. Ce qui est le meilleur outil aujourd'hui 
            ne le sera peut-être plus dans 6 mois.
          </p>

          <p className="text-navy font-medium mb-4">
            C'est pourquoi on vous apprend à maîtriser chaque TYPE d'outil :
          </p>

          <ul className="space-y-3 mb-6">
            {[
              'Génération de texte (transformer, adapter, créer)',
              'Transcription automatique (audio/vidéo → texte)',
              'Synthèse vocale (texte → audio naturel)',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-sage flex-shrink-0" />
                <span className="text-navy-light">{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 bg-yellow/10 rounded-xl border border-yellow/20">
            <p className="text-navy font-medium mb-2">
              Vous comprenez ce que chaque brique permet de faire.
            </p>
            <p className="text-navy-light text-sm">
              Vous savez choisir le bon outil selon vos besoins du moment.
              Vous restez autonome, quel que soit l'outil qui domine demain.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FinancementSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <SectionTitle>Financement</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-cream rounded-2xl p-8 mb-8">
            <p className="text-navy-light mb-6">
              Formation éligible au financement OPCO.
            </p>

            <div className="pt-6 border-t border-navy/10">
              <p className="text-navy font-medium">
                Tarif : sur devis, selon la taille de votre équipe.
              </p>
            </div>
          </div>

          <Button variant="secondary" size="lg" href={CALENDLY_URL}>
            Réserver un appel pour en discuter
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

function GuaranteesSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle>Ce qui est garanti</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {guarantees.map((guarantee, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-sm border border-navy/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <guarantee.icon className="w-8 h-8 text-sage" />
              </motion.div>
              <p className="text-navy-light">{guarantee.text}</p>
            </motion.div>
          ))}
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
            Prêt à former votre équipe ?
          </h2>

          <p className="text-xl text-cream/80 mb-8">
            Réservez un appel découverte gratuit de 15 minutes.
            <br />
            On évalue ensemble si c'est adapté à vos besoins.
          </p>

          <Button variant="primary" size="lg" href={CALENDLY_URL}>
            <Calendar className="w-5 h-5 mr-2" />
            Réserver un appel découverte
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Component
export function FormationPage() {
  return (
    <>
      <HeroSection />
      <ForWhoSection />
      <PromiseSection />
      <ModulesSection />
      <InclusionsSection />
      <EnvironmentSection />
      <FinancementSection />
      <GuaranteesSection />
      <FinalCTASection />
    </>
  );
}
