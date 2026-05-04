import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageMeta } from '../components/seo/PageMeta';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { KineticHeading } from '../components/animation/KineticHeading';
import { GeometricAccentGroup } from '../components/animation/GeometricAccentGroup';
import { ScrollThreadContainer } from '../components/animation/ScrollThreadContainer';

const CALENDLY_URL = 'https://cal.com/teachinspire.me';
const FORMATION_BOUNDARY_ILLUSTRATION = '/illustrations/formation-boundary.png';
const CONTACT_CONVERSATION_ILLUSTRATION = '/illustrations/contact-conversation.png';

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
    number: '01',
    period: 'Mois 1',
    title: "Comprendre ce que l'IA peut vraiment déléguer",
    objective: "Démystifier l'IA, identifier les tâches à faible risque et distinguer gain de temps et perte de maîtrise.",
    topics: [
      "Ce que l'IA générative sait vraiment faire, et ce qu'elle simule",
      'Les familles d\'outils : texte, transcription, synthèse vocale, recherche',
      'Tâches automatisables, partiellement automatisables et assistées',
      'Hallucinations, erreurs invisibles et sorties trop lisses',
      "Prise en main d'un environnement de travail IA sans dépendance à un outil",
    ],
    deliverable: "Votre cartographie des usages IA à déléguer, contrôler ou garder humains",
    bonus: 'Prise en main de Google AI Studio',
  },
  {
    number: '02',
    period: 'Mois 2',
    title: "Piloter l'IA avec des critères pédagogiques",
    objective: 'Obtenir des résultats stables, précis et exploitables en guidant l\'IA avec vos critères métier.',
    topics: [
      'Prompt engineering appliqué à la pédagogie',
      'CECRL, niveau, registre, progression et charge cognitive',
      'Méthode MVP (Minimum Viable Prompt) avec critères de qualité',
      "Faire s'auto-évaluer l'IA sans lui abandonner la décision finale",
      'Choisir le modèle selon la tâche, le risque et le niveau attendu',
    ],
    deliverable: 'Votre premier prompt professionnel réutilisable, avec grille de contrôle pédagogique',
    bonus: 'App "Prompt Builder" — Structurez vos prompts en quelques clics',
  },
  {
    number: '03',
    period: 'Mois 3',
    title: "Construire des workflows IA sans perdre la main",
    objective: 'Transformer une ressource authentique en séquence complète, avec validation humaine et adaptation finale.',
    topics: [
      'Trouver des ressources pertinentes (banque de mots-clés, Perplexity)',
      'Workflow complet : vidéo → transcription → points de langue → audio',
      'Backward Design : objectifs, critères, progression',
      'Créer fiches prof & élève, puis relire avec une grille qualité',
      'Adapter au niveau (B2 → A2) sans perdre le contexte ni la progression',
    ],
    deliverable: '2 séquences complètes (B2 et A2) avec supports, critères de validation et traces de décision',
    bonus: 'Annexe IA & Éthique — Anonymiser les données sensibles (RGPD)',
  },
];

const protectedElements = [
  {
    title: 'La qualité pédagogique',
    text: 'Les supports générés sont relus, corrigés, contextualisés et alignés sur un objectif clair.',
  },
  {
    title: "L'autonomie des formateurs",
    text: 'Ils comprennent la méthode, pas seulement une suite de prompts.',
  },
  {
    title: 'La progression des apprenants',
    text: "L'IA ne remplace pas le diagnostic, le feedback et la décision pédagogique.",
  },
  {
    title: 'La soutenabilité du travail',
    text: 'Le temps gagné ne doit pas devenir une pression à produire toujours plus.',
  },
];

const inclusions = [
  {
    title: 'Formation Live',
    items: [
      '6 à 8 webinaires dédiés à votre équipe',
      'Sessions pratiques avec vos cas réels',
      'Coaching sur les premiers cours créés',
      'Planning flexible adapté à vos contraintes',
    ],
  },
  {
    title: 'Outils Exclusifs',
    items: [
      'Prompt Builder Pro (accès à vie)',
      'Mises à jour automatiques incluses',
    ],
  },
  {
    title: 'Ressources',
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

const guarantees = [
  { label: 'Support', text: 'Support prioritaire pendant toute la durée de la formation' },
  { label: 'Bilingue', text: 'Formation bilingue (français/anglais) — idéal pour équipes mixtes' },
  { label: 'Mises à jour', text: 'Mises à jour des outils et contenus incluses' },
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

  return (
    <section className="bg-cream min-h-[70vh] relative overflow-hidden">
      <GridOverlay />
      <GeometricAccentGroup preset="formation-hero" />

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center"
          >
            <div className="lg:col-span-6 max-w-3xl">
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                  Formation pour Instituts
                </span>
              </motion.div>

              <div className="mb-6">
                <KineticHeading
                  variant="cascade"
                  as="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy leading-[1.1] tracking-tight"
                  triggerStart="top 95%"
                >
                  Gagner du temps
                </KineticHeading>
                <KineticHeading
                  variant="slide-from-sides"
                  as="span"
                  className="inline text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-rust leading-[1.1] tracking-tight"
                  delay={0.3}
                  triggerStart="top 95%"
                >
                  sans perdre le métier
                </KineticHeading>
              </div>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-navy/70 mb-4 max-w-2xl leading-relaxed"
              >
                Un parcours de 3 mois pour installer une pratique IA commune dans votre institut.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-navy/60 mb-10 max-w-2xl"
              >
                Vos formateurs apprennent à transformer n'importe quelle source en cours sur-mesure,
                avec une méthode qui protège le jugement pédagogique, la qualité des supports et
                l'autonomie de l'équipe.
                <br />
                <strong className="text-navy">15 tutoriels vidéo</strong> +{' '}
                <strong className="text-navy">6 à 8 sessions live</strong>, adaptés à vos cas réels.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href={CALENDLY_URL} showArrow>
                  Réserver un appel découverte
                </Button>
                <Button variant="secondary" size="lg" href="#programme">
                  Voir le programme
                </Button>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-sm text-navy/50"
              >
                Éligible financement OPCO
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 lg:pl-6"
            >
              <img
                src={FORMATION_BOUNDARY_ILLUSTRATION}
                alt=""
                width={1536}
                height={1024}
                className="mx-auto w-full max-w-[680px] object-contain lg:-ml-8 lg:w-[115%] lg:max-w-none"
                aria-hidden="true"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// For Who Section
function ForWhoSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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

  return (
    <section className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Pour qui</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Cette formation est faite pour vous si...
            </h2>
          </div>

          <div className="lg:col-span-8">
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
                  className="flex items-start gap-4 p-5 border border-navy/10 hover:border-navy/20 transition-colors duration-200"
                >
                  <span className="text-rust font-display text-lg font-semibold flex-shrink-0 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-navy/80">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Promise Section
function PromiseSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-cream py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>La promesse</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Ce que vous saurez faire à la fin
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 lg:p-10 border border-navy/10">
              <p className="text-lg text-navy/70 mb-6 leading-relaxed">
                Prendre n'importe quelle source — une vidéo YouTube, un podcast,
                un article technique, un document de l'entreprise de votre apprenant —
                et la transformer en cours exploitable, sans sacrifier la qualité pédagogique.
              </p>

              <p className="text-navy font-medium mb-6">
                Au bon niveau. Avec le bon vocabulaire.
                Avec des exercices ciblés. Et avec des décisions pédagogiques qui restent entre
                les mains du formateur.
              </p>

              <div className="p-6 bg-yellow/10 border-l-2 border-yellow">
                <p className="text-navy font-medium">
                  3h → 30 min, quand le workflow est cadré par un formateur.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Protection Section
function ProtectionSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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

  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
      <GridOverlay />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Ce que la formation protège</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Une formation IA ne devrait pas seulement apprendre à produire plus vite.
            </h2>

            <motion.img
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
              src={CONTACT_CONVERSATION_ILLUSTRATION}
              alt=""
              width={1536}
              height={1024}
              className="mt-10 hidden w-full max-w-[320px] object-contain lg:block"
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="text-lg text-navy/70 leading-relaxed mb-8"
            >
              Elle doit installer un cadre d'adoption responsable : pratique, transférable,
              et suffisamment clair pour que chaque formateur sache quand l'IA aide vraiment.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid sm:grid-cols-2 gap-px bg-navy/10"
            >
              {protectedElements.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="bg-cream p-6 lg:p-8"
                >
                  <span className="text-4xl font-display font-bold text-rust/20 block mb-4 tabular-nums" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-display font-semibold text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-navy/70 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Modules Section
function ModulesSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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

  return (
    <section id="programme" className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <GeometricAccentGroup preset="formation-modules" />
      <Container>
        <SectionLabel>Le programme</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <KineticHeading
              variant="cascade"
              as="h2"
              className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight"
            >
              Un parcours progressif en
            </KineticHeading>
            <KineticHeading
              variant="counter-roll"
              as="span"
              className="inline text-3xl lg:text-4xl font-display font-semibold text-rust"
              delay={0.3}
            >
              3 étapes
            </KineticHeading>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-navy/60">
              De l'identification des tâches délégables à la création de séquences complètes.
              <br />
              Cadence recommandée : 3 mois. Adaptable selon les contraintes de votre équipe.
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6"
        >
          {modules.map((module) => (
            <motion.div
              key={module.number}
              variants={fadeInUp}
              className="border border-navy/10"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Module Header */}
                <div className="lg:col-span-4 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-navy/10">
                  <span className="text-6xl lg:text-7xl font-display font-bold text-navy/10 block mb-4 tabular-nums" aria-hidden="true">
                    {module.number}
                  </span>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium tracking-wider uppercase text-rust">
                      Module {module.number}
                    </span>
                    <span className="text-xs text-navy/40">·</span>
                    <span className="text-xs text-navy/50">{module.period}</span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-navy mb-3">
                    {module.title}
                  </h3>

                  <p className="text-sm text-navy/60 mb-4">
                    <strong className="text-navy">Objectif :</strong> {module.objective}
                  </p>

                  <div className="p-3 bg-sage/10 border-l-2 border-sage">
                    <p className="text-xs font-medium text-navy">
                      [Bonus] {module.bonus}
                    </p>
                  </div>
                </div>

                {/* Module Content */}
                <div className="lg:col-span-8 p-6 lg:p-8">
                  <p className="text-xs font-medium tracking-wider uppercase text-navy/50 mb-4">
                    Au programme
                  </p>
                  <ul className="space-y-3 mb-6">
                    {module.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-sage mt-1">→</span>
                        <span className="text-navy/70">{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 bg-navy/5">
                    <p className="text-sm">
                      <strong className="text-navy">Livrable :</strong>{' '}
                      <span className="text-navy/70">{module.deliverable}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// Inclusions Section
function InclusionsSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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

  return (
    <section className="bg-cream py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <SectionLabel>Ce que vous recevez</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Tout ce qui est inclus
            </h2>
          </div>
        </div>

        {/* Main inclusions — editorial separator grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-px bg-navy/10 mb-12"
        >
          {inclusions.map((inclusion, idx) => (
            <motion.div
              key={inclusion.title}
              variants={fadeInUp}
              className="bg-white p-6 lg:p-8"
            >
              <span className="text-5xl font-display font-bold text-navy/10 block mb-4 tabular-nums" aria-hidden="true">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-display font-semibold text-navy mb-4">
                {inclusion.title}
              </h3>
              <ul className="space-y-2">
                {inclusion.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                    <span className="text-sage mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Community section — full-bleed navy for rhythm break */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="bg-navy text-cream p-8 lg:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-display font-semibold">Communauté</h3>
                <span className="text-xs font-medium tracking-wider uppercase px-2 py-1 bg-yellow/20 text-yellow rounded-sm">
                  1 an inclus
                </span>
              </div>

              <p className="text-cream/70 mb-4">
                L'IA évolue constamment. De nouveaux outils sortent chaque mois,
                de plus en plus performants, de moins en moins chers.
              </p>
              <p className="text-cream/70 mb-4">
                Une formation seule ne suffit pas. Il faut pouvoir rester à jour.
              </p>
              <p className="text-cream font-medium">
                Avec l'accès à community.teachinspire.me, vous bénéficiez de :
              </p>
            </div>

            <div className="space-y-3">
              {communityBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-yellow">→</span>
                  <p className="text-cream/80">{benefit}</p>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-cream/10">
                <p className="text-sm text-cream/60">
                  Chaque institut a son <strong className="text-cream">espace privé</strong> au sein de la communauté.
                  L'espace général permet d'échanger plus largement avec tous les membres.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Approach Section
function ApproachSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <GeometricAccentGroup preset="formation-approach" />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Notre approche</SectionLabel>
            <KineticHeading
              variant="word-reveal"
              as="h2"
              className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight"
            >
              Les types d'outils, pas les outils
            </KineticHeading>
          </div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="lg:col-span-8"
          >
            <div className="bg-cream/50 p-8 lg:p-10 border border-navy/10">
              <p className="text-navy/70 mb-6">
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
                    <span className="text-rust font-display font-semibold tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-navy/70">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-yellow/10 border-l-2 border-yellow">
                <p className="text-navy font-medium mb-2">
                  Vous comprenez ce que chaque brique permet de faire.
                </p>
                <p className="text-navy/70 text-sm">
                  Vous savez choisir le bon outil selon vos besoins du moment.
                  Vous restez autonome, quel que soit l'outil qui domine demain.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Financement Section
function FinancementSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-cream py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Financement</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight mb-6">
              Tarification
            </h2>
            <p className="text-navy-light leading-relaxed">
              Le tarif dépend de la taille de votre équipe et de vos contraintes.
              On en discute lors de l'appel découverte.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 lg:p-10 border border-navy/10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Check className="w-5 h-5 text-sage flex-shrink-0" aria-hidden="true" />
                <p className="text-navy font-medium">
                  Parcours de 3 mois pour installer une pratique IA commune
                </p>
              </div>

              <p className="text-navy/70 leading-relaxed mb-6">
                À la fin, vos formateurs ne repartent pas avec une collection de prompts.
                Ils repartent avec une méthode commune, des workflows réutilisables,
                des critères de qualité partagés et une capacité à décider quand l'IA aide vraiment.
              </p>

              <div className="pt-6 border-t border-navy/10">
                <p className="text-navy font-medium mb-2">
                  Tarif : sur devis, selon la taille de votre équipe.
                </p>
                <p className="text-navy/60 text-sm">
                  Standard (≤10 formateurs) : à partir de 4 200€ HT. Éligible financement OPCO.
                </p>
              </div>
            </div>

            <Button variant="secondary" size="lg" href={CALENDLY_URL} showArrow>
              Réserver un appel pour en discuter
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Guarantees Section
function GuaranteesSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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

  return (
    <section className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <SectionLabel>Garanties</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Ce qui est garanti
            </h2>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-3 gap-px bg-navy/10"
        >
          {guarantees.map((guarantee, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="p-6 lg:p-8 bg-cream"
            >
              <span className="text-xs font-medium tracking-wider uppercase text-rust block mb-3">
                {guarantee.label}
              </span>
              <p className="text-navy/70">{guarantee.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// Final CTA Section
function FinalCTASection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-navy py-20 lg:py-28 relative">
      <GridOverlay variant="light" />
      <GeometricAccentGroup preset="formation-cta" />
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
            Prêt à former votre équipe ?
          </KineticHeading>

          <p className="text-xl text-cream/70 mb-8">
            Réservez un appel découverte gratuit de 15 minutes.
            <br />
            On évalue ensemble si c'est adapté à vos besoins.
          </p>

          <Button variant="cta" size="lg" href={CALENDLY_URL} showArrow>
            Réserver un appel découverte
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Component
export function FormationPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ScrollThreadContainer preset="formation">
      <PageMeta
        title="La Formation IA pour formateurs de langues | TeachInspire"
        description="Un parcours de 3 mois pour installer une pratique IA commune dans votre institut. Gagnez du temps sans perdre le métier."
        path="/formation"
      />
      <HeroSection prefersReducedMotion={prefersReducedMotion} />
      <ForWhoSection prefersReducedMotion={prefersReducedMotion} />
      <PromiseSection prefersReducedMotion={prefersReducedMotion} />
      <ProtectionSection prefersReducedMotion={prefersReducedMotion} />
      <ModulesSection prefersReducedMotion={prefersReducedMotion} />
      <InclusionsSection prefersReducedMotion={prefersReducedMotion} />
      <ApproachSection prefersReducedMotion={prefersReducedMotion} />
      <FinancementSection prefersReducedMotion={prefersReducedMotion} />
      <GuaranteesSection prefersReducedMotion={prefersReducedMotion} />
      <FinalCTASection prefersReducedMotion={prefersReducedMotion} />
    </ScrollThreadContainer>
  );
}
