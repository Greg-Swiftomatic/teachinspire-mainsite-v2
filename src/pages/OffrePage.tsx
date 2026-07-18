import { motion } from 'framer-motion';
import { Check, ArrowRight, Users, Zap, BookOpen, Layers } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PageMeta } from '../components/seo/PageMeta';

import { BOOKING_URL } from '../assets/assets';

// ── Data ──────────────────────────────────────────────────

const problems = [
  { before: '3h pour créer un cours personnalisé', after: '30 min quand la méthode est cadrée' },
  { before: 'Difficulté à adapter aux secteurs spécialisés', after: 'Sources métier exploitables, même sur un secteur peu familier' },
  { before: 'Ressources génériques, faible engagement', after: 'Supports tirés de vos vidéos, podcasts et documents' },
  { before: 'Coûts élevés de production multimédia', after: 'Audio, transcription et fiches sans budget multimédia lourd' },
];

const months = [
  {
    number: '01',
    period: 'Mois 1',
    title: "Comprendre ce que l'IA peut vraiment déléguer",
    topics: [
      'Large Language Models (LLM)',
      'Speech-to-Text (transcription)',
      'Text-to-Speech (synthèse vocale)',
      'Google AI Studio',
    ],
  },
  {
    number: '02',
    period: 'Mois 2',
    title: "Piloter l'IA avec des critères pédagogiques",
    topics: [
      "Consignes IA appliquées à la pédagogie",
      'CECRL, niveau, registre et progression',
      "Auto-évaluation de l'IA sans abandonner la décision finale",
      'Critères de qualité partagés',
    ],
  },
  {
    number: '03',
    period: 'Mois 3',
    title: "Créer une séquence complète sans perdre la main",
    topics: [
      'Sources métier utilisées pour créer des activités de cours',
      'Création de séquences pédagogiques',
      'Validation humaine et adaptation finale',
      'Traçabilité des décisions pédagogiques',
    ],
  },
];

const resources = [
  {
    icon: Users,
    title: 'Formation Live',
    items: [
      '6 à 8 webinaires dédiés à votre équipe',
      'Travail en direct sur vos cas réels',
      'Coaching sur les premiers cours créés',
    ],
  },
  {
    icon: Zap,
    title: 'TeachInspire Studio',
    items: [
      'Prompts (Promptomatik), Audio et Documents : trois ateliers maison',
      "Accès 1 an — 60 minutes d'audio incluses chaque mois",
      'Crédits supplémentaires à tarif préférentiel',
    ],
  },
  {
    icon: BookOpen,
    title: 'Bibliothèque de supports',
    items: [
      'Leçons complètes créées avec la méthode',
      'Supports réutilisables et modifiables',
      'Modèles de cours prêts à adapter',
    ],
  },
  {
    icon: Layers,
    title: 'Modules ajoutés plus tard',
    items: [
      'Formation pédagogique Notion',
      'Workflow Notebook LM',
      'Nouveaux usages IA ajoutés quand ils tiennent la route',
    ],
  },
];

const communityPublic = [
  'Accès aux webinaires publics',
  'Bibliothèque de ressources partagées',
  'Retours d\'usage entre formateurs',
  'Veille sur les outils qui valent vraiment le détour',
];

const communityPrivate = [
  'Point dédié pour votre équipe',
  'Partage sécurisé de ressources internes',
  'Suivi des essais réalisés pendant l\'année',
];

const pricingTiers = [
  {
    name: 'Formule Standard',
    subtitle: 'Jusqu\'à 10 formateurs',
    price: '4 200€ HT',
    perPerson: '420€/personne pour 10',
    features: [
      'Formation de votre équipe',
      '6 à 8 webinaires en groupe unique',
      'TeachInspire Studio pendant 1 an (prompts, audio, documents)',
      'Accès communauté 1 an',
    ],
    highlighted: false,
  },
  {
    name: 'Formule Étendue',
    subtitle: '11 à 25 formateurs',
    price: '4 200€ HT + 250€ HT',
    perPerson: 'par formateur supplémentaire — ex. : 15 formateurs = 5 450€ HT (363€/pers.)',
    features: [
      'Tous les éléments de la formule Standard',
      'Sessions en groupes plus restreints',
      'Coordination plus serrée avec vos responsables',
    ],
    highlighted: true,
  },
  {
    name: 'Formule Sur-Mesure',
    subtitle: '25+ formateurs',
    price: 'Sur devis',
    perPerson: 'Tarif préférentiel',
    features: [
      'Planning adapté à vos contraintes',
      'Accompagnement dédié',
      'Formation d\'ambassadeurs internes',
      'Format ajusté à votre organisation',
    ],
    highlighted: false,
  },
];

// ── Section Label ─────────────────────────────────────────

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

// ── Hero Section ──────────────────────────────────────────

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
    <section className="bg-cream min-h-[60vh] relative overflow-hidden">
      <GridOverlay />
      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                Offre Formation
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy leading-[1.1] tracking-tight mb-6"
            >
              Créer des cours avec l'IA{' '}
              <span className="text-rust">sans abîmer la qualité</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-navy/70 mb-4 max-w-2xl leading-relaxed"
            >
              Parcours hybride de 3 mois pour aider vos formateurs à produire plus vite,
              relire mieux et garder la décision pédagogique.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-navy/50 mb-10 max-w-2xl"
            >
              Éligible financement OPCO
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href={BOOKING_URL} showArrow>
                Réserver ma session découverte
              </Button>
              <Button variant="secondary" size="lg" href="#tarification">
                Voir les tarifs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Problems / Solutions Section ──────────────────────────

function ProblemsSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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
            <SectionLabel>Le constat</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Ce qui change avec{' '}
              <span className="text-rust">TeachInspire</span>
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-8 space-y-4"
          >
            {problems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="grid md:grid-cols-2 gap-px bg-navy/10"
              >
                <div className="bg-cream p-5 flex items-start gap-4">
                  <span className="text-rust font-display text-lg font-semibold flex-shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-navy/60 line-through decoration-navy/20">{item.before}</p>
                </div>
                <div className="bg-white p-5 flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-sage flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-navy font-medium">{item.after}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Programme Section ─────────────────────────────────────

function ProgrammeSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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
        <SectionLabel>Le parcours</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Un parcours hybride sur{' '}
              <span className="text-rust">3 mois</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-navy/60">
              15 tutoriels vidéo (6h au total) + 6 à 8 sessions live (1h à 1h30 chacune).
              <br />
              Le rythme laisse le temps de tester entre deux séances.
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-px bg-navy/10"
        >
          {months.map((month) => (
            <motion.div
              key={month.number}
              variants={fadeInUp}
              className="bg-white p-6 lg:p-8"
            >
              <span className="text-6xl font-display font-bold text-navy/10 block mb-4 tabular-nums" aria-hidden="true">
                {month.number}
              </span>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium tracking-wider uppercase text-rust">
                  {month.period}
                </span>
              </div>

              <h3 className="text-xl font-display font-semibold text-navy mb-6">
                {month.title}
              </h3>

              <ul className="space-y-3">
                {month.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-sage mt-0.5">→</span>
                    <span className="text-navy/70 text-sm">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Resources Section ─────────────────────────────────────

function ResourcesSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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
        <SectionLabel>Accompagnement</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Ce que votre équipe{' '}
              <span className="text-rust">reçoit</span>
            </h2>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10"
        >
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                variants={fadeInUp}
                className="bg-cream p-6 lg:p-8"
              >
                <span className="text-5xl font-display font-bold text-navy/10 block mb-4 tabular-nums" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-sage" aria-hidden="true" />
                  <h3 className="text-lg font-display font-semibold text-navy">
                    {resource.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {resource.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                      <span className="text-sage mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// ── Community Section ─────────────────────────────────────

function CommunitySection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-cream py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <SectionLabel>Communauté</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Un an pour rester{' '}
              <span className="text-rust">à jour</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <span className="text-xs font-medium tracking-wider uppercase px-3 py-1.5 bg-yellow/20 text-navy border border-yellow/30 rounded-sm">
              1 an inclus
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="bg-navy text-cream p-8 lg:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Public Space */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium tracking-wider uppercase text-yellow">
                  Espace Public
                </span>
                <div className="flex-1 h-px bg-cream/10" />
              </div>
              <ul className="space-y-3">
                {communityPublic.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-yellow">→</span>
                    <p className="text-cream/80">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Private Space */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium tracking-wider uppercase text-yellow">
                  Espace Privé de Votre Institut
                </span>
                <div className="flex-1 h-px bg-cream/10" />
              </div>
              <ul className="space-y-3">
                {communityPrivate.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-yellow">→</span>
                    <p className="text-cream/80">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Pricing Section ───────────────────────────────────────

function PricingSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
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
    <section id="tarification" className="bg-white py-20 lg:py-28 relative">
      <GridOverlay />
      <Container>
        <SectionLabel>Tarification</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Tarifs par taille{' '}
              <span className="text-rust">d'équipe</span>
            </h2>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-px bg-navy/10 mb-12"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeInUp}
              className={`p-6 lg:p-8 ${tier.highlighted ? 'bg-navy text-cream' : 'bg-cream'}`}
            >
              <span className={`text-xs font-medium tracking-wider uppercase block mb-3 ${tier.highlighted ? 'text-yellow' : 'text-rust'}`}>
                {tier.subtitle}
              </span>

              <h3 className={`text-xl font-display font-semibold mb-2 ${tier.highlighted ? 'text-cream' : 'text-navy'}`}>
                {tier.name}
              </h3>

              <p className={`text-2xl font-display font-bold mb-1 ${tier.highlighted ? 'text-yellow' : 'text-navy'}`}>
                {tier.price}
              </p>
              <p className={`text-sm mb-6 ${tier.highlighted ? 'text-cream/60' : 'text-navy/50'}`}>
                {tier.perPerson}
              </p>

              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-yellow' : 'text-sage'}`} aria-hidden="true" />
                    <span className={`text-sm ${tier.highlighted ? 'text-cream/80' : 'text-navy/70'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* OPCO + Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="grid md:grid-cols-2 gap-px bg-navy/10"
        >
          <div className="bg-cream p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-sage flex-shrink-0" aria-hidden="true" />
              <p className="text-navy font-medium">Éligible financement OPCO</p>
            </div>
            <p className="text-sm text-navy/60">
              On vous fournit les éléments nécessaires pour la demande de prise en charge.
            </p>
          </div>
          <div className="bg-cream p-6 lg:p-8">
            <p className="text-xs font-medium tracking-wider uppercase text-rust mb-3">
              Garanties
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-navy/70">
                <span className="text-sage mt-0.5">→</span>
                Support prioritaire pendant 1 an
              </li>
              <li className="flex items-start gap-2 text-sm text-navy/70">
                <span className="text-sage mt-0.5">→</span>
                Mises à jour des outils incluses
              </li>
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Final CTA Section ─────────────────────────────────────

function FinalCTASection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-navy py-20 lg:py-28 relative">
      <GridOverlay variant="light" />
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

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-cream mb-6">
            Prêt à cadrer l'usage IA de votre institut ?
          </h2>

          <p className="text-xl text-cream/70 mb-4">
            Réservez une session découverte gratuite de 15 minutes.
          </p>
          <p className="text-cream/50 mb-8">
            On regarde votre équipe, vos besoins, puis le bon format.
          </p>

          <Button variant="cta" size="lg" href={BOOKING_URL} showArrow>
            Réserver ma session découverte gratuite
          </Button>

          <p className="text-sm text-cream/40 mt-8">
            Ou écrivez-nous directement à{' '}
            <a href="mailto:greg@teachinspire.me" className="text-cream/60 underline hover:text-yellow transition-colors duration-150">
              greg@teachinspire.me
            </a>
            {'. '}Réponse sous 24h avec un devis adapté à votre équipe.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Main Page Component ───────────────────────────────────

export function OffrePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageMeta
        title="Offre Formation IA pour instituts de langues | TeachInspire"
        description="Parcours de 3 mois pour cadrer l'usage de l'IA en institut de langues, avec méthode commune, essais encadrés et critères de qualité."
        path="/offre"
      />
      <HeroSection prefersReducedMotion={prefersReducedMotion} />
      <ProblemsSection prefersReducedMotion={prefersReducedMotion} />
      <ProgrammeSection prefersReducedMotion={prefersReducedMotion} />
      <ResourcesSection prefersReducedMotion={prefersReducedMotion} />
      <CommunitySection prefersReducedMotion={prefersReducedMotion} />
      <PricingSection prefersReducedMotion={prefersReducedMotion} />
      <FinalCTASection prefersReducedMotion={prefersReducedMotion} />
    </>
  );
}
