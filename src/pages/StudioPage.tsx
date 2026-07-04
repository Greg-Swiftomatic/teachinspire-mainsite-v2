import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { PageMeta } from '../components/seo/PageMeta';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { useReducedMotion } from '../hooks/useReducedMotion';

const STUDIO_URL = 'https://studio.teachinspire.me';
const SIGNUP_URL = `${STUDIO_URL}/signup`;
const CALENDLY_URL = 'https://cal.com/teachinspire.me';

// ── Data ──────────────────────────────────────────────────

const ateliers = [
  {
    number: '01',
    name: 'Prompts · Promptomatik',
    image: '/studio/atelier-prompts.png',
    alt: "L'atelier Promptomatik : décrire son besoin, obtenir un prompt structuré",
    description:
      "Décrivez votre besoin en français courant : niveau, public, objectif. L'atelier pose deux ou trois questions, puis construit un prompt structuré, prêt à copier dans ChatGPT, Gemini ou l'IA de votre choix. Chaque bloc est annoté — vous voyez pourquoi il est là, et vous progressez en l'utilisant.",
    detail: 'Ouvert à tous avec le compte gratuit',
  },
  {
    number: '02',
    name: 'Audio',
    image: '/studio/atelier-audio.png',
    alt: "L'atelier Audio : script, direction des voix et génération d'écoutes",
    description:
      "Un script, deux voix, un niveau CECRL : l'atelier génère une écoute sur mesure pour vos apprenants. Accents, rythme, expressions — vous dirigez, il enregistre. Le fichier arrive en MP3, prêt pour la classe.",
    detail: '60 minutes incluses chaque mois avec la formation',
  },
  {
    number: '03',
    name: 'Documents',
    image: '/studio/atelier-documents.png',
    alt: "L'atelier Documents : trois supports imprimables générés à partir d'un contenu",
    description:
      "Collez un article, un plan de cours ou une transcription. L'atelier en tire trois supports imprimables différents, corrigés compris, mis en page pour l'impression. Aperçu à l'écran, téléchargement en PDF.",
    detail: 'Inclus avec la formation',
  },
];

const offers = [
  {
    name: 'Découverte',
    price: 'Gratuit',
    subtitle: 'Sans carte bancaire',
    features: [
      'Promptomatik : 5 générations par jour',
      '3 prompts sauvegardés',
      'Modèles officiels consultables',
    ],
    cta: { label: 'Créer un compte gratuit', href: SIGNUP_URL },
    highlighted: false,
  },
  {
    name: 'Formation individuelle',
    price: 'Sur demande',
    subtitle: 'Pour les formateurs indépendants',
    features: [
      'La méthode complète en e-learning',
      'Les trois ateliers pendant 1 an',
      "60 minutes d'audio chaque mois",
      'Office hours 2 fois par mois',
      'Communauté pendant 1 an',
    ],
    cta: { label: 'En parler avec Greg', href: CALENDLY_URL },
    highlighted: true,
  },
  {
    name: 'Formation institut',
    price: 'À partir de 4 200€ HT',
    subtitle: 'Équipes jusqu’à 10 formateurs et au-delà',
    features: [
      '6 à 8 webinaires dédiés à votre équipe',
      'Coaching sur vos cas réels',
      'Le Studio pour chaque formateur, 1 an',
      'Espace privé dans la communauté',
      'Éligible financement OPCO',
    ],
    cta: { label: 'Réserver un appel découverte', href: CALENDLY_URL },
    highlighted: false,
  },
];

const studioFaqs = [
  {
    question: 'Il faut être client pour essayer ?',
    answer: "Non. Le compte gratuit s'ouvre en deux minutes, sans carte bancaire, et Promptomatik est utilisable tout de suite.",
  },
  {
    question: 'Les ateliers remplacent la formation ?',
    answer: "Ils l'accompagnent. La formation vous apprend à juger ce que l'IA produit ; les ateliers accélèrent ce que vous savez déjà juger. Un support généré reste un support à relire.",
  },
  {
    question: 'Et si je veux partir ?',
    answer: 'Vos prompts se copient en un clic, les audios se téléchargent en MP3, les documents en PDF. Rien n’est enfermé dans le Studio.',
  },
];

// ── Page ──────────────────────────────────────────────────

export function StudioPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } },
  };

  return (
    <>
      <PageMeta
        title="TeachInspire Studio — trois ateliers pour préparer vos cours avec l'IA"
        description="Prompts structurés, écoutes sur mesure et supports imprimables : les ateliers maison TeachInspire, pensés pour l'enseignement des langues. Compte gratuit sans carte bancaire."
        path="/studio"
      />

      {/* Hero */}
      <section className="bg-cream min-h-[55vh] relative overflow-hidden">
        <GridOverlay />
        <Container>
          <div className="pt-32 pb-16 lg:pt-40 lg:pb-24">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                  TeachInspire Studio
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy leading-[1.1] tracking-tight mb-6"
              >
                La méthode d'abord,
                <span className="text-rust"> les ateliers ensuite</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-navy/70 mb-10 max-w-2xl leading-relaxed">
                La formation vous apprend à piloter l'IA sur des outils ouverts. Le Studio
                vous fait gagner du temps une fois la méthode en place : trois ateliers
                pensés pour l'enseignement des langues, dans un simple navigateur.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href={SIGNUP_URL} showArrow>
                  Créer un compte gratuit
                </Button>
                <Button variant="secondary" size="lg" href={STUDIO_URL}>
                  Se connecter
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Ateliers */}
      <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
        <Container>
          <div className="flex items-center gap-4 mb-14">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
              Les trois ateliers
            </span>
            <div className="flex-1 h-px bg-navy/10" />
          </div>

          <div className="space-y-20 lg:space-y-28">
            {ateliers.map((atelier, index) => (
              <motion.div
                key={atelier.number}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}
              >
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="text-6xl lg:text-7xl font-display font-bold text-navy/10 mb-4">
                    {atelier.number}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-semibold text-navy mb-4">
                    {atelier.name}
                  </h2>
                  <p className="text-navy/70 leading-relaxed mb-4">{atelier.description}</p>
                  <p className="text-sm font-medium text-sage flex items-center gap-2">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    {atelier.detail}
                  </p>
                </div>
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="border border-navy/10 shadow-[0_2px_24px_rgba(44,61,87,0.08)] bg-cream">
                    <img
                      src={atelier.image}
                      alt={atelier.alt}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Offres */}
      <section className="bg-cream py-20 lg:py-28 relative overflow-hidden" id="offres">
        <GridOverlay />
        <Container>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
              Par où commencer
            </span>
            <div className="flex-1 h-px bg-navy/10" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy mb-14 max-w-2xl">
            Trois façons d'entrer, selon où vous en êtes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer.name}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`bg-white p-8 flex flex-col ${
                  offer.highlighted ? 'border-2 border-yellow shadow-[0_4px_32px_rgba(241,210,99,0.25)]' : 'border border-navy/10'
                }`}
              >
                <h3 className="text-lg font-display font-semibold text-navy mb-1">{offer.name}</h3>
                <p className="text-2xl font-display font-bold text-navy mb-1">{offer.price}</p>
                <p className="text-sm text-navy/50 mb-6">{offer.subtitle}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-navy/70">
                      <Check className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={offer.cta.href}
                  target={offer.cta.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    offer.highlighted
                      ? 'bg-navy text-cream hover:bg-navy/90'
                      : 'border border-navy text-navy hover:bg-navy hover:text-cream'
                  }`}
                >
                  {offer.cta.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mini FAQ */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-yellow" />
                <span className="text-yellow font-medium text-sm tracking-wide uppercase">
                  Questions
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold text-navy leading-tight">
                Avant de vous lancer
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              {studioFaqs.map((faq) => (
                <div key={faq.question} className="border-b border-navy/10 pb-8">
                  <h3 className="text-navy font-medium mb-2">{faq.question}</h3>
                  <p className="text-navy-light leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
