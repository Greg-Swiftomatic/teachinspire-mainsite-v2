import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

const CALENDLY_URL = 'https://cal.com/greg-teachinspire/decouverte-teachinspire';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
    number: '01',
    period: 'Mois 1',
    title: 'Panorama des Outils IA',
    objective: "Se familiariser avec les briques essentielles de l'IA générative pour l'enseignement.",
    topics: [
      "Qu'est-ce que l'IA générative ? (démystification)",
      'Les modèles de langage : ces "cerveaux" qui génèrent du texte',
      'Transcription automatique : transformer audio/vidéo en texte instantanément',
      'Synthèse vocale : créer des audios naturels (monologues, dialogues)',
      "Prise en main d'un environnement de travail IA",
    ],
    deliverable: 'Votre première ressource pédagogique créée avec l\'IA',
    bonus: 'App "Text 2 Script" — Générateur de dialogues formatés',
  },
  {
    number: '02',
    period: 'Mois 2',
    title: 'Prompt Engineering',
    objective: 'Obtenir des résultats stables, précis et exploitables grâce à des instructions bien structurées.',
    topics: [
      'Principes de formulation (pourquoi vos prompts ne marchent pas)',
      "Anatomie d'un prompt expert (analyse détaillée)",
      'Méthode MVP (Minimum Viable Prompt)',
      "IA agentique : faire s'auto-évaluer l'IA",
      'Choix du modèle selon la tâche',
    ],
    deliverable: 'Votre premier prompt professionnel réutilisable',
    bonus: 'App "Prompt Builder" — Structurez vos prompts en quelques clics',
  },
  {
    number: '03',
    period: 'Mois 3',
    title: 'Workflows Complets',
    objective: 'Transformer une ressource authentique en séquence pédagogique complète et imprimable.',
    topics: [
      'Trouver des ressources pertinentes (banque de mots-clés, Perplexity)',
      'Workflow complet : vidéo → transcription → points de langue → audio',
      'Backward Design : objectifs, critères, progression',
      'Créer fiches prof & élève (HTML → PDF)',
      'Adapter au niveau (B2 → A2)',
    ],
    deliverable: '2 séquences complètes (B2 et A2) avec tous les supports',
    bonus: 'Annexe IA & Éthique — Anonymiser les données sensibles (RGPD)',
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
      'Text 2 Script Generator (accès à vie)',
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
function HeroSection() {
  return (
    <section className="bg-cream min-h-[70vh] relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-navy"
            style={{ left: `${(i + 1) * (100 / 12)}%` }}
          />
        ))}
      </div>

      <Container>
        <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Label */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                Formation pour Instituts
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy mb-6 leading-[1.1] tracking-tight"
            >
              Apprenez à transformer{' '}
              <span className="text-rust">n'importe quelle source</span>{' '}
              en cours sur-mesure.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-navy/70 mb-4 max-w-2xl leading-relaxed"
            >
              Une formation pour maîtriser l'IA pédagogique.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-navy/60 mb-10 max-w-2xl"
            >
              <strong className="text-navy">15 tutoriels vidéo (6h)</strong> +{' '}
              <strong className="text-navy">6 à 8 sessions live</strong> adaptées à votre équipe.
              <br />
              Cadence recommandée : 3 mois. Adaptable selon vos contraintes.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href={CALENDLY_URL} showArrow>
                Réserver un appel découverte
              </Button>
              <Button variant="secondary" size="lg" href="#programme">
                Voir le programme
              </Button>
            </motion.div>

            {/* OPCO Note */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-sm text-navy/50"
            >
              Éligible financement OPCO
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// For Who Section
function ForWhoSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Label */}
          <div className="lg:col-span-4">
            <SectionLabel>Pour qui</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Cette formation est faite pour vous si...
            </h2>
          </div>

          {/* Right - Content */}
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
                  className="flex items-start gap-4 p-5 border border-navy/10 bg-cream/30"
                >
                  <span className="text-rust font-display text-lg font-semibold flex-shrink-0">
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
function PromiseSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Label */}
          <div className="lg:col-span-4">
            <SectionLabel>La promesse</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Ce que vous saurez faire à la fin
            </h2>
          </div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 lg:p-10 border border-navy/10">
              <p className="text-lg text-navy/70 mb-6 leading-relaxed">
                Prendre n'importe quelle source — une vidéo YouTube, un podcast,
                un article technique, un document de l'entreprise de votre apprenant —
                et la transformer en cours parfaitement adapté.
              </p>

              <p className="text-navy font-medium mb-6">
                Au bon niveau. Avec le bon vocabulaire.
                Avec des exercices ciblés. Et des audios naturels si besoin.
              </p>

              <div className="p-6 bg-yellow/10 border-l-2 border-yellow">
                <p className="text-navy font-medium">
                  Le tout en une fraction du temps que ça prendrait sans l'IA.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Modules Section
function ModulesSection() {
  return (
    <section id="programme" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionLabel>Le programme</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Un parcours progressif en{' '}
              <span className="text-rust">3 étapes</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-navy/60">
              De la découverte des outils à la création de séquences complètes.
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
              className="border border-navy/10 bg-cream/30"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Module Header */}
                <div className="lg:col-span-4 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-navy/10">
                  {/* Number */}
                  <span className="text-6xl lg:text-7xl font-display font-bold text-navy/10 block mb-4">
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

                  {/* Bonus */}
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
function InclusionsSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionLabel>Ce que vous recevez</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Tout ce qui est inclus
            </h2>
          </div>
        </div>

        {/* Main inclusions grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {inclusions.map((inclusion, idx) => (
            <motion.div
              key={inclusion.title}
              variants={fadeInUp}
              className="bg-white p-6 border border-navy/10"
            >
              <span className="text-5xl font-display font-bold text-navy/10 block mb-4">
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

        {/* Community section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy text-cream p-8 lg:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-display font-semibold">Communauté</h3>
                <span className="text-xs font-medium tracking-wider uppercase px-2 py-1 bg-yellow/20 text-yellow">
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
function ApproachSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Label */}
          <div className="lg:col-span-4">
            <SectionLabel>Notre approche</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight">
              Les types d'outils, pas les outils
            </h2>
          </div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                    <span className="text-rust font-display font-semibold">
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
function FinancementSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Financement</SectionLabel>

          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight mb-8">
            Tarification
          </h2>

          <div className="bg-white p-8 lg:p-10 border border-navy/10 mb-8">
            <p className="text-navy/70 mb-6">
              Formation éligible au financement OPCO.
            </p>

            <div className="pt-6 border-t border-navy/10">
              <p className="text-navy font-medium">
                Tarif : sur devis, selon la taille de votre équipe.
              </p>
            </div>
          </div>

          <Button variant="secondary" size="lg" href={CALENDLY_URL} showArrow>
            Réserver un appel pour en discuter
          </Button>
        </div>
      </Container>
    </section>
  );
}

// Guarantees Section
function GuaranteesSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
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
          className="grid sm:grid-cols-3 gap-6"
        >
          {guarantees.map((guarantee, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="p-6 border border-navy/10 bg-cream/30"
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
function FinalCTASection() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-yellow mb-6 block">
            Prochaine étape
          </span>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-cream mb-6">
            Prêt à former votre équipe ?
          </h2>

          <p className="text-xl text-cream/70 mb-8">
            Réservez un appel découverte gratuit de 15 minutes.
            <br />
            On évalue ensemble si c'est adapté à vos besoins.
          </p>

          <Button variant="primary" size="lg" href={CALENDLY_URL} showArrow>
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
      <ApproachSection />
      <FinancementSection />
      <GuaranteesSection />
      <FinalCTASection />
    </>
  );
}
