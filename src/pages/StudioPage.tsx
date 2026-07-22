import { motion } from 'framer-motion';
import { Check, ArrowRight, Plus } from 'lucide-react';
import { PageMeta } from '../components/seo/PageMeta';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { GridOverlay } from '../components/ui/GridOverlay';
import { useReducedMotion } from '../hooks/useReducedMotion';

const STUDIO_URL = 'https://studio.teachinspire.me';
const SIGNUP_URL = `${STUDIO_URL}/signup`;
import { BOOKING_URL } from '../assets/assets';

// ── Data ──────────────────────────────────────────────────

const ateliers = [
  {
    number: '01',
    name: 'Prompts · Promptomatik',
    image: 'workshop-prompts',
    flow: 'Besoin → prompt structuré',
    alt: "L'atelier Promptomatik : décrire son besoin, obtenir un prompt structuré",
    description:
      "Décrivez votre besoin en français courant : niveau, public, objectif. L'atelier pose deux ou trois questions, puis construit un prompt structuré, prêt à copier dans ChatGPT, Gemini ou l'IA de votre choix. Chaque bloc est annoté : vous voyez pourquoi il est là, et vous progressez en l'utilisant.",
    detail: 'Ouvert à tous avec le compte gratuit',
  },
  {
    number: '02',
    name: 'Audio',
    image: 'workshop-audio',
    flow: 'Script → MP3',
    alt: "L'atelier Audio : script, direction des voix et génération d'écoutes",
    description:
      "Collez un script, dialogue ou monologue, et choisissez le niveau CECRL, le rythme et l'accent. Des registres prêts à l'emploi (réunion professionnelle, podcast, voix d'examinateur, service client) et un champ accent libre pour tout le reste. Vous dirigez, l'atelier enregistre. Le fichier arrive en MP3, prêt pour la classe.",
    detail: '60 minutes par mois incluses pendant 6 mois avec la formation',
  },
  {
    number: '03',
    name: 'Documents',
    image: 'workshop-documents',
    flow: 'Source → pack PDF',
    alt: "L'atelier Documents : quatre supports pédagogiques générés à partir d'un contenu",
    description:
      "Collez un article, une transcription ou le résultat d'un prompt. L'atelier en tire quatre types de supports : lecture, exercices, guide de l'enseignant, plan de cours. Le pack complet d'une leçon, corrigés compris, en trois styles de mise en page selon votre public. Aperçu à l'écran, téléchargement en PDF.",
    detail: 'Inclus avec la formation',
  },
];

const offers = [
  {
    name: 'Promptomatik',
    price: 'Gratuit',
    subtitle: "Notre outil phare, ouvert à tous : l'atelier prompts",
    features: [
      'Décrivez votre besoin, repartez avec un prompt structuré',
      '5 générations par jour, 3 prompts sauvegardés',
      'Sans carte bancaire, prêt en deux minutes',
      'Audio et Documents restent réservés à la formation',
    ],
    cta: { label: 'Essayer Promptomatik', href: SIGNUP_URL },
  },
  {
    name: 'Formation individuelle',
    price: 'Sur demande',
    subtitle: 'Pour les formateurs indépendants',
    features: [
      'La méthode complète en e-learning',
      'Les trois ateliers pendant 1 an',
      "60 minutes d'audio par mois pendant 6 mois, puis crédits à la demande",
      'Office hours 2 fois par mois',
      'Communauté pendant 1 an',
    ],
    cta: { label: 'En parler avec Greg', href: BOOKING_URL },
  },
  {
    name: 'Formation institut',
    price: 'À partir de 4 200 € HT',
    subtitle: 'De 1 à 15 formateurs (au-delà, formule étendue)',
    features: [
      '6 à 8 webinaires dédiés à votre équipe',
      'Coaching sur vos cas réels',
      'Le Studio pour chaque formateur pendant 1 an',
      "60 minutes d'audio par mois pendant 6 mois, puis crédits à la demande",
      'Espace privé dans la communauté',
      'Éligible financement OPCO',
    ],
    cta: { label: 'Réserver un appel découverte', href: BOOKING_URL },
  },
];

const studioFaqs = [
  {
    question: 'Il faut être client pour essayer ?',
    answer: "Non. Le compte gratuit s'ouvre en deux minutes, sans carte bancaire, et Promptomatik est utilisable tout de suite.",
  },
  {
    question: "Et si les 60 minutes d'audio ne suffisent pas ?",
    answer: "Vous rechargez à la demande : 9 € les 60 minutes, ou 24 € les 180 minutes. Les crédits achetés n'expirent pas à la fin du mois.",
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
        title="TeachInspire Studio : trois ateliers pour préparer vos cours avec l'IA"
        description="Prompts structurés, écoutes sur mesure et supports imprimables : les ateliers maison TeachInspire, pensés pour l'enseignement des langues. Compte gratuit sans carte bancaire."
        path="/studio"
      />

      {/* Hero */}
      <section className="bg-cream min-h-[62vh] relative overflow-hidden border-b border-navy/10">
        <GridOverlay />
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center pt-24 pb-16 lg:pt-36 lg:pb-20">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-6 xl:col-span-5 relative z-10">
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust">
                  TeachInspire Studio
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-navy leading-[1.1] tracking-tight mb-6"
              >
                Trois ateliers pour préparer vos cours
                <span className="text-rust"> avec l'IA</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-navy/70 mb-10 max-w-2xl leading-relaxed">
                Prompts, audio, documents : des outils pensés pour l'enseignement des langues,
                dans un simple navigateur. La formation vous apprend la méthode ; le Studio
                vous fait gagner du temps une fois qu'elle est en place.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href={SIGNUP_URL} showArrow>
                  Essayer Promptomatik gratuitement
                </Button>
                <Button variant="secondary" size="lg" href={STUDIO_URL}>
                  Se connecter
                </Button>
              </motion.div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.7, delay: prefersReducedMotion ? 0 : 0.15 }}
              className="lg:col-span-6 xl:col-span-7 relative lg:-mr-16 xl:-mr-24"
            >
              <picture>
                <source
                  srcSet="/images/studio/studio-hero-console-900.webp 900w, /images/studio/studio-hero-console-1536.webp 1536w"
                  sizes="(max-width: 1023px) 94vw, 58vw"
                  type="image/webp"
                />
                <img
                  src="/images/studio/studio-hero-console-1536.webp"
                  width="1536"
                  height="1024"
                  alt="Les interfaces des ateliers Promptomatik, Audio et Documents réunies dans TeachInspire Studio"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </picture>
            </motion.figure>
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

          <div className="divide-y divide-navy/10 border-t border-navy/10">
            {ateliers.map((atelier, index) => (
              <motion.div
                key={atelier.number}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center py-14 lg:py-20"
              >
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl lg:text-6xl font-display font-bold text-navy/10 leading-none">
                      {atelier.number}
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-rust">
                      {atelier.flow}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-semibold text-navy mb-4">
                    {atelier.name}
                  </h2>
                  <p className="text-navy/70 leading-relaxed mb-6 max-w-xl">{atelier.description}</p>
                  <p className="text-sm font-medium text-navy flex items-start gap-3 border-t border-navy/10 pt-4 max-w-md">
                    <Check className="w-4 h-4 text-sage mt-0.5 flex-none" aria-hidden="true" />
                    {atelier.detail}
                  </p>
                </div>
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <figure className="relative">
                    <picture>
                      <source
                        srcSet={`/images/studio/${atelier.image}-900.webp 900w, /images/studio/${atelier.image}-1536.webp 1536w`}
                        sizes="(max-width: 1023px) 94vw, 58vw"
                        type="image/webp"
                      />
                    <img
                      src={`/images/studio/${atelier.image}-1536.webp`}
                      alt={atelier.alt}
                      loading="lazy"
                      decoding="async"
                      width="1536"
                      height="1024"
                      className="w-full h-auto block"
                    />
                    </picture>
                  </figure>
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
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-4 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-rust whitespace-nowrap">
                Par où commencer
              </span>
              <div className="flex-1 h-px bg-navy/10" />
            </div>
            <h2 className="lg:col-span-7 text-3xl lg:text-4xl font-display font-semibold text-navy max-w-2xl">
              Trois façons d'entrer, selon où vous en êtes
            </h2>
          </div>

          <div className="grid lg:grid-cols-[0.82fr_1fr_1.18fr] border border-navy/15 bg-white">
            {offers.map((offer, index) => {
              const isInstitute = index === 2;
              const isIndividual = index === 1;

              return (
              <motion.article
                key={offer.name}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                className={`relative min-h-0 lg:min-h-[620px] p-7 lg:p-8 flex flex-col border-b lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0 ${
                  isInstitute
                    ? 'bg-navy text-cream border-cream/20'
                    : isIndividual
                      ? 'bg-white border-navy/15'
                      : 'bg-[#ece8dc] border-navy/15'
                }`}
              >
                {isIndividual && <span className="absolute inset-x-0 top-0 h-1.5 bg-yellow" aria-hidden="true" />}
                <span
                  className={`absolute top-5 right-6 font-display text-5xl font-semibold leading-none ${
                    isInstitute ? 'text-cream/10' : 'text-navy/10'
                  }`}
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <p className={`text-[11px] font-medium tracking-[0.16em] uppercase mb-8 pr-14 ${
                  isInstitute ? 'text-yellow' : 'text-rust'
                }`}>
                  {index === 0 ? 'Découvrir gratuitement' : index === 1 ? 'Se former en autonomie' : 'Former une équipe'}
                </p>
                <h3 className={`text-xl lg:text-2xl font-display font-semibold mb-4 ${
                  isInstitute ? 'text-cream' : 'text-navy'
                }`}>
                  {offer.name}
                </h3>
                <p className={`font-display font-semibold leading-tight mb-3 ${
                  isInstitute ? 'text-3xl text-cream' : 'text-[2rem] text-navy'
                }`}>
                  {offer.price}
                </p>
                <p className={`text-sm min-h-10 mb-7 ${isInstitute ? 'text-cream/70' : 'text-navy/55'}`}>
                  {offer.subtitle}
                </p>
                <ul className={`space-y-3 py-6 mb-8 flex-1 border-y ${
                  isInstitute ? 'border-cream/20' : 'border-navy/15'
                }`}>
                  {offer.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-3 text-sm leading-relaxed ${
                      isInstitute ? 'text-cream/80' : 'text-navy/70'
                    }`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-none ${isInstitute ? 'text-yellow' : 'text-sage'}`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={offer.cta.href}
                  target={offer.cta.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`group inline-flex min-h-14 items-center justify-between gap-4 px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                    isInstitute
                      ? 'bg-yellow text-navy hover:bg-cream'
                      : isIndividual
                        ? 'bg-navy text-cream hover:bg-rust'
                        : 'border border-navy text-navy hover:bg-navy hover:text-cream'
                  }`}
                >
                  {offer.cta.label}
                  <ArrowRight className="w-4 h-4 flex-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </motion.article>
            )})}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28 border-t border-navy/10 relative overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="grid grid-cols-4 h-1.5 max-w-[15rem] mb-8" aria-hidden="true">
                <span className="bg-sage" />
                <span className="bg-yellow" />
                <span className="bg-rust" />
                <span className="bg-navy" />
              </div>
              <div className="flex items-center gap-4 mb-5">
                <span className="text-rust font-medium text-xs tracking-[0.2em] uppercase">
                  Questions
                </span>
                <div className="flex-1 h-px bg-navy/10" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-semibold text-navy leading-tight max-w-xs">
                Avant de vous lancer
              </h2>
            </div>
            <div className="lg:col-span-8 border-t border-navy/20">
              {studioFaqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-navy/20" open={index === 0}>
                  <summary className="list-none cursor-pointer py-6 lg:py-7 flex items-start gap-4 lg:gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-2xl text-navy/20 leading-none pt-0.5" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-lg lg:text-xl font-semibold text-navy leading-snug flex-1">
                      {faq.question}
                    </h3>
                    <span className="w-9 h-9 border border-navy/20 grid place-items-center flex-none transition-colors duration-200 group-hover:bg-cream" aria-hidden="true">
                      <Plus className="w-4 h-4 text-rust transition-transform duration-300 group-open:rotate-45" />
                    </span>
                  </summary>
                  <div className="pb-7 lg:pb-8 pl-12 lg:pl-[4.25rem] pr-4 lg:pr-16">
                    <p className="text-navy-light leading-relaxed max-w-2xl">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
