import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const DRAFT_KEY = 'ti-temoignage-draft-v2';
const TOTAL_STEPS = 6;
const WHAT_CHANGED_MIN = 30;

const isValidLinkedin = (v: string): boolean =>
  /^https:\/\/([a-z0-9-]+\.)*linkedin\.com\//i.test(v.trim());

export interface FormData {
  role: string;
  institute: string;
  city: string;
  languages: string;
  learnerSectors: string;

  initialReaction: string;
  initialReactionOther: string;
  prepTimeBefore: string;

  prepTimeNow: string;
  usageFrequency: string;
  whatChanged: string;
  firstArtifact: string;
  learnerFeedback: string;

  toASkeptic: string;
  keepOne: string;
  whatWasMissing: string;
  recommendScore: number | null;

  institutesWorkedWith: string;
  introOk: string;

  consentPublish: boolean;
  naming: string;
  displayName: string;
  consentScope: string[];
  displayTitle: string;
  linkedinUrl: string;
  willingVideo: boolean;
  willingLinkedinPost: boolean;
}

const EMPTY: FormData = {
  role: '', institute: '', city: '', languages: '', learnerSectors: '',
  initialReaction: '', initialReactionOther: '', prepTimeBefore: '',
  prepTimeNow: '', usageFrequency: '', whatChanged: '', firstArtifact: '', learnerFeedback: '',
  toASkeptic: '', keepOne: '', whatWasMissing: '', recommendScore: null,
  institutesWorkedWith: '', introOk: '',
  consentPublish: false, naming: '', displayName: '', consentScope: [], displayTitle: '',
  linkedinUrl: '', willingVideo: false, willingLinkedinPost: false,
};

type Option = { value: string; label: string };

const ROLES: Option[] = [
  { value: 'direction', label: 'Je dirige un institut ou un organisme de formation' },
  { value: 'independant', label: 'Je suis formateur ou formatrice indépendant·e' },
  { value: 'salarie', label: 'Je suis formateur ou formatrice au sein d’un institut' },
];

const REACTIONS_ASSIGNED: Option[] = [
  { value: 'curieux', label: 'Curieux ou curieuse, plutôt partant·e' },
  { value: 'sceptique', label: "Sceptique : j'avais déjà essayé l'IA sans résultat convaincant" },
  { value: 'reticent', label: "Réticent·e : je ne voyais pas ce que l'IA venait faire dans mon métier" },
  { value: 'inquiet', label: "Inquiet ou inquiète pour l'avenir du métier" },
  { value: 'pas_le_temps', label: '« Encore une formation » : je n’avais pas le temps' },
  { value: 'autre', label: 'Autre' },
];

const REACTIONS_CHOSEN: Option[] = [
  { value: 'curieux', label: 'Curieux ou curieuse, sans idée précise de ce que j’allais en tirer' },
  { value: 'sceptique', label: "Sceptique : j'avais déjà essayé l'IA sans résultat convaincant" },
  { value: 'reticent', label: "Réservé·e : je ne voyais pas bien ce que l'IA venait faire dans mon métier" },
  { value: 'inquiet', label: "Inquiet ou inquiète pour l'avenir du métier" },
  { value: 'pas_le_temps', label: 'Intéressé·e, mais pas sûr·e d’avoir le temps de suivre' },
  { value: 'autre', label: 'Autre' },
];

const TIME_BEFORE: Option[] = [
  { value: 'moins_1h', label: "Moins d'1 h" },
  { value: '1_2h', label: '1 à 2 h' },
  { value: '2_3h', label: '2 à 3 h' },
  { value: 'plus_3h', label: 'Plus de 3 h' },
  { value: 'aucune', label: 'Je ne préparais pas de cours sur mesure' },
];

const TIME_NOW: Option[] = [
  { value: 'moins_30', label: 'Moins de 30 min' },
  { value: '30_60', label: '30 min à 1 h' },
  { value: '1_2h', label: '1 à 2 h' },
  { value: 'plus_2h', label: 'Plus de 2 h' },
  { value: 'non_utilise', label: "Je n'ai pas encore utilisé la méthode sur un vrai cours" },
];

const FREQUENCY: Option[] = [
  { value: 'hebdo', label: 'Chaque semaine' },
  { value: 'mensuel', label: 'Quelques fois par mois' },
  { value: 'rare', label: 'Rarement' },
  { value: 'jamais', label: 'Pas encore' },
];

const INTRO: Option[] = [
  { value: 'oui', label: 'Oui, volontiers' },
  { value: 'peut_etre', label: 'Peut-être, parlons-en' },
  { value: 'non', label: 'Non merci' },
];

const NAMING: Option[] = [
  { value: 'full_name', label: 'Mon prénom et mon nom' },
  { value: 'initial', label: 'Mon prénom et l’initiale de mon nom' },
  { value: 'first_name', label: 'Mon prénom seul' },
  { value: 'anonymous', label: 'Aucun nom : seulement ma fonction et ma ville' },
];

const TITLE_PLACEHOLDER: Record<string, string> = {
  direction: 'Directrice de Langues & Co',
  independant: 'Formatrice d’anglais indépendante',
  salarie: 'Formateur FLE chez Langues & Co',
};

function Radio({
  name, options, value, onChange,
}: {
  name: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className="ti-choice ti-radio"
        >
          <span className="ti-marker" aria-hidden="true" />
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function Toggle({
  on, onClick, children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" role="checkbox" aria-checked={on} onClick={onClick} className="ti-choice">
      <span className="ti-marker grid place-items-center" aria-hidden="true">
        {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </button>
  );
}

function Scale({ value, onChange }: { value: number | null; onChange: (v: number) => void }) {
  return (
    <div>
      <div role="radiogroup" aria-label="Note de 0 à 10" className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
        {Array.from({ length: 11 }, (_, n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
            className="ti-scale"
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[13px] text-navy/50">
        <span>0 : pas du tout</span>
        <span>10 : sans hésiter</span>
      </div>
    </div>
  );
}

/** Coupe une réponse libre en extrait lisible pour l'aperçu. */
function excerpt(text: string, max = 170): string {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return `${space > 80 ? cut.slice(0, space) : cut}…`;
}

export function attribution(d: FormData, fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  const first = words[0] || 'Prénom';
  const last = words.slice(1).join(' ');
  const has = (s: string) => d.consentScope.includes(s);
  const anonymous = d.naming === 'anonymous';
  const title = has('role') ? d.displayTitle.trim() : '';
  const institute = d.institute.trim();

  const name =
    d.naming === 'full_name' ? (d.displayName.trim() || fullName || 'Prénom Nom')
    : d.naming === 'initial' ? `${first}${last ? ` ${last[0].toUpperCase()}.` : ''}`
    : d.naming === 'first_name' ? first
    : '';

  const parts = [
    name,
    title,
    !anonymous && has('institute') && institute && !title.includes(institute) ? institute : '',
    has('city') ? d.city.trim() : '',
  ].filter(Boolean);

  return parts.length ? parts.join(', ') : 'Participant·e au parcours';
}

export function TestimonialForm({
  token,
  session,
  fullName,
  onStepChange,
  finished = false,
  onSuccess,
}: {
  token: string | null;
  session: string;
  fullName: string;
  onStepChange?: (step: number) => void;
  finished?: boolean;
  onSuccess: (credited: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ ...EMPTY, displayName: fullName });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  // Champ leurre : rempli uniquement par les robots.
  const [honeypot, setHoneypot] = useState('');

  // Un formulaire de 8 minutes ne doit jamais se perdre sur un rechargement.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        setData({ ...EMPTY, displayName: fullName, ...JSON.parse(raw) });
        setRestored(true);
      }
    } catch {
      /* stockage indisponible, on continue sans brouillon */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* quota ou mode privé */
    }
  }, [data]);

  useEffect(() => {
    onStepChange?.(step);
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const toggleScope = (v: string) =>
    setData((p) => ({
      ...p,
      consentScope: p.consentScope.includes(v)
        ? p.consentScope.filter((x) => x !== v)
        : [...p.consentScope, v],
    }));

  const anonymous = data.naming === 'anonymous';
  const scopeOn = (s: string) => data.consentScope.includes(s);
  const assigned = data.role === 'salarie';
  // Même questionnaire, deux moments : pendant le parcours, ou après.
  const timeNow = finished
    ? TIME_NOW.map((o) => (o.value === 'non_utilise' ? { ...o, label: "Je n'utilise pas la méthode" } : o))
    : TIME_NOW;
  const frequency = finished
    ? FREQUENCY.map((o) => (o.value === 'jamais' ? { ...o, label: 'Plus du tout' } : o))
    : FREQUENCY;

  const publishProblem = (): string => {
    if (!data.consentPublish) return '';
    if (!data.naming) return 'Choisissez comment vous nommer, ou décochez l’autorisation de publier.';
    if (data.naming === 'full_name' && !data.displayName.trim())
      return 'Indiquez votre nom tel qu’il doit apparaître.';
    if (scopeOn('role') && !data.displayTitle.trim())
      return 'Indiquez votre fonction, ou décochez « Ma fonction ».';
    if (scopeOn('city') && !data.city.trim())
      return 'Indiquez votre ville à l’étape 1, ou décochez « Ma ville ».';
    if (!anonymous && scopeOn('linkedin') && !isValidLinkedin(data.linkedinUrl))
      return 'Le lien LinkedIn doit commencer par https://www.linkedin.com/, ou décochez cette option.';
    return '';
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 1: return data.role !== '' && data.institute.trim().length > 0;
      case 2: return data.initialReaction !== '' && data.prepTimeBefore !== '';
      case 3: return (
        data.prepTimeNow !== '' &&
        data.usageFrequency !== '' &&
        data.whatChanged.trim().length >= WHAT_CHANGED_MIN
      );
      case 4: return true;
      case 5: return true;
      default: return publishProblem() === '';
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify({ ...data, token, website: honeypot }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; credited?: boolean };
      if (!res.ok) throw new Error(body.error || 'Échec de l’envoi');
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      onSuccess(Boolean(body.credited));
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : "L'envoi a échoué. Vérifiez votre connexion et réessayez."
      );
      setSubmitting(false);
    }
  };

  const pct = Math.round(((step - 1) / TOTAL_STEPS) * 100);
  const quote = excerpt(data.toASkeptic || data.whatChanged)
    || 'Votre réponse à la question « un collègue ou un directeur hésite » apparaîtra ici.';

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
            Étape {step} sur {TOTAL_STEPS}
          </span>
          <span className="text-[13px] tabular-nums text-navy/50">{pct} %</span>
        </div>
        <div className="h-[3px] w-full bg-navy/10" role="progressbar"
             aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className="h-full bg-rust"
            animate={{ width: `${Math.max(pct, 3)}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {restored && step === 1 && (
        <p className="mb-6 border-l-2 border-sage bg-sage/10 px-4 py-3 text-[14px] text-navy/75">
          Vos réponses précédentes ont été retrouvées. Vous pouvez reprendre où
          vous en étiez.
        </p>
      )}

      <div ref={headingRef} tabIndex={-1} className="outline-none">
        {/*
          Pas d'AnimatePresence ici : en mode "wait" la sortie peut ne jamais
          se terminer et l'étape suivante reste alors non montée. Une clé qui
          change suffit à rejouer l'animation d'entrée, sans blocage possible.
        */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-10"
        >
          {step === 1 && (
            <>
              <div>
                <span className="ti-label">Vous</span>
                <p className="ti-question">Quelle est votre situation ?</p>
                <span className="ti-hint">
                  Votre nom et votre email viennent de votre compte Studio,
                  inutile de les ressaisir.
                </span>
                <Radio name="Situation" options={ROLES} value={data.role}
                       onChange={(v) => set('role', v)} />
              </div>
              <div>
                <label htmlFor="institute" className="ti-question">
                  {data.role === 'salarie' ? 'Votre institut' : 'Le nom de votre structure'}
                </label>
                <span className="ti-hint">
                  {data.role === 'independant'
                    ? 'Le nom sous lequel vous exercez. Si vous exercez à votre nom, indiquez-le simplement.'
                    : 'Tel que vos clients le connaissent.'}
                </span>
                <input id="institute" className="ti-input" value={data.institute}
                       onChange={(e) => set('institute', e.target.value)}
                       autoComplete="organization" required />
              </div>
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor="city" className="ti-question">Votre ville</label>
                  <input id="city" className="ti-input" value={data.city}
                         onChange={(e) => set('city', e.target.value)}
                         autoComplete="address-level2" placeholder="Nantes" />
                </div>
                <div>
                  <label htmlFor="languages" className="ti-question">Langue(s) enseignée(s)</label>
                  <input id="languages" className="ti-input" value={data.languages}
                         onChange={(e) => set('languages', e.target.value)}
                         placeholder="Anglais, FLE…" />
                </div>
              </div>
              <div>
                <label htmlFor="learnerSectors" className="ti-question">
                  Dans quels secteurs travaillent vos apprenants ?
                </label>
                <span className="ti-hint">Juridique, industrie, santé, hôtellerie…</span>
                <input id="learnerSectors" className="ti-input" value={data.learnerSectors}
                       onChange={(e) => set('learnerSectors', e.target.value)} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <span className="ti-label">Au départ</span>
                <p className="ti-question">
                  {assigned
                    ? 'Quand votre direction vous a annoncé ce parcours, qu’est-ce que vous vous êtes dit ?'
                    : 'Au moment de vous inscrire, où en étiez-vous avec l’IA ?'}
                </p>
                <span className="ti-hint">
                  Répondez franchement : les réserves nous intéressent autant
                  que l&apos;enthousiasme.
                </span>
                <Radio name="Réaction initiale"
                       options={assigned ? REACTIONS_ASSIGNED : REACTIONS_CHOSEN}
                       value={data.initialReaction}
                       onChange={(v) => set('initialReaction', v)} />
                {data.initialReaction === 'autre' && (
                  <input className="ti-input mt-3" value={data.initialReactionOther}
                         onChange={(e) => set('initialReactionOther', e.target.value)}
                         placeholder="En une phrase" aria-label="Précisez" />
                )}
              </div>
              <div>
                <p className="ti-question">
                  Avant le parcours, combien de temps vous prenait la préparation
                  d&apos;une séance sur mesure ?
                </p>
                <span className="ti-hint">
                  Une séance construite pour un apprenant ou un secteur précis, à
                  partir d&apos;un article, d&apos;un podcast ou d&apos;un document
                  de l&apos;entreprise.
                </span>
                <Radio name="Temps avant" options={TIME_BEFORE}
                       value={data.prepTimeBefore}
                       onChange={(v) => set('prepTimeBefore', v)} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <span className="ti-label">{finished ? 'Aujourd’hui' : 'Jusqu’ici'}</span>
                <p className="ti-question">Aujourd&apos;hui, la même séance vous prend :</p>
                <Radio name="Temps aujourd'hui" options={timeNow}
                       value={data.prepTimeNow}
                       onChange={(v) => set('prepTimeNow', v)} />
              </div>
              <div>
                <p className="ti-question">À quelle fréquence utilisez-vous la méthode ?</p>
                <Radio name="Fréquence" options={frequency}
                       value={data.usageFrequency}
                       onChange={(v) => set('usageFrequency', v)} />
              </div>
              <div>
                <label htmlFor="whatChanged" className="ti-question">
                  Qu&apos;est-ce qui a changé concrètement dans votre façon de
                  préparer vos cours ?
                </label>
                <span className="ti-hint">
                  C&apos;est la question qui compte le plus. Qu&apos;est-ce que
                  vous faites aujourd&apos;hui que vous ne faisiez pas avant ?
                  Qu&apos;est-ce que vous avez arrêté de faire ? Si rien n&apos;a
                  encore changé, dites-le aussi.
                </span>
                <textarea id="whatChanged" className="ti-textarea" value={data.whatChanged}
                          onChange={(e) => set('whatChanged', e.target.value)} required />
                {data.whatChanged.trim().length > 0 &&
                  data.whatChanged.trim().length < WHAT_CHANGED_MIN && (
                  <p className="mt-2 text-[13px] text-rust">
                    Encore quelques mots : c&apos;est la réponse qui nous sert
                    le plus ({data.whatChanged.trim().length}/{WHAT_CHANGED_MIN}
                    {' '}caractères minimum).
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="firstArtifact" className="ti-question">
                  Qu&apos;avez-vous déjà créé avec la méthode ?
                </label>
                <span className="ti-hint">Pour quel apprenant ou quel secteur, et à partir de quelle source ?</span>
                <textarea id="firstArtifact" className="ti-textarea min-h-[100px]"
                          value={data.firstArtifact}
                          onChange={(e) => set('firstArtifact', e.target.value)} />
              </div>
              <div>
                <label htmlFor="learnerFeedback" className="ti-question">
                  Un apprenant a-t-il réagi à un cours créé avec la méthode ?
                </label>
                <span className="ti-hint">Facultatif. Ce qu&apos;il ou elle a dit, même en quelques mots.</span>
                <textarea id="learnerFeedback" className="ti-textarea min-h-[100px]"
                          value={data.learnerFeedback}
                          onChange={(e) => set('learnerFeedback', e.target.value)} />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <span className="ti-label">Votre avis</span>
                <label htmlFor="toASkeptic" className="ti-question">
                  Un collègue formateur ou un directeur d&apos;institut vous demande
                  si le parcours vaut le coup. Que lui répondez-vous ?
                </label>
                <span className="ti-hint">
                  En quelques phrases, comme vous le lui diriez.
                </span>
                <textarea id="toASkeptic" className="ti-textarea" value={data.toASkeptic}
                          onChange={(e) => set('toASkeptic', e.target.value)} />
              </div>
              <div>
                <label htmlFor="keepOne" className="ti-question">
                  Si vous ne deviez garder qu&apos;une chose du parcours, laquelle ?
                </label>
                <input id="keepOne" className="ti-input" value={data.keepOne}
                       onChange={(e) => set('keepOne', e.target.value)}
                       placeholder="Un module, un outil, un prompt, un atelier…" />
              </div>
              <div>
                <label htmlFor="whatWasMissing" className="ti-question">
                  {finished ? 'Qu’est-ce qui vous a manqué ?' : 'Qu’est-ce qui vous manque pour l’instant ?'}
                </label>
                <span className="ti-hint">
                  Ce qu&apos;on devrait améliorer en priorité. Les critiques nous
                  sont plus utiles que les compliments.
                </span>
                <textarea id="whatWasMissing" className="ti-textarea min-h-[110px]"
                          value={data.whatWasMissing}
                          onChange={(e) => set('whatWasMissing', e.target.value)} />
              </div>
              <div>
                <p className="ti-question">
                  Recommanderiez-vous le parcours à un collègue ?
                </p>
                <Scale value={data.recommendScore} onChange={(v) => set('recommendScore', v)} />
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div>
                <span className="ti-label">Votre réseau</span>
                <label htmlFor="institutesWorkedWith" className="ti-question">
                  {data.role === 'direction'
                    ? 'Connaissez-vous d’autres dirigeants d’instituts que ce parcours pourrait intéresser ?'
                    : 'Intervenez-vous pour d’autres instituts ou organismes de formation ?'}
                </label>
                <span className="ti-hint">
                  Facultatif. Indiquez leurs noms si vous le souhaitez.
                </span>
                <textarea id="institutesWorkedWith" className="ti-textarea min-h-[100px]"
                          value={data.institutesWorkedWith}
                          onChange={(e) => set('institutesWorkedWith', e.target.value)} />
              </div>
              <div>
                <p className="ti-question">
                  Accepteriez-vous que Grégory vous demande de le présenter à l&apos;un d&apos;eux ?
                </p>
                <span className="ti-hint">
                  Il vous écrira d&apos;abord pour en parler. Rien ne se fera sans votre accord.
                </span>
                <Radio name="Mise en relation" options={INTRO} value={data.introOk}
                       onChange={(v) => set('introOk', v)} />
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div>
                <span className="ti-label">Publication</span>
                <p className="ti-question">Pouvons-nous citer vos réponses ?</p>
                <span className="ti-hint">
                  Les témoignages aident d&apos;autres formateurs et instituts à
                  comprendre ce que le parcours apporte vraiment. Vous choisissez
                  ce qui apparaît.
                </span>
                <Toggle on={data.consentPublish}
                        onClick={() => set('consentPublish', !data.consentPublish)}>
                  <strong className="font-semibold">
                    J&apos;autorise TeachInspire à publier un extrait de mes réponses.
                  </strong>
                  <br />
                  <span className="text-navy/60">
                    Sans cette case, vos réponses restent internes, et les
                    crédits vous sont offerts de la même façon.
                  </span>
                </Toggle>
              </div>

              {data.consentPublish && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid gap-10 overflow-hidden"
                >
                  <div>
                    <p className="ti-question">Comment vous nommer ?</p>
                    <Radio name="Nom affiché" options={NAMING} value={data.naming}
                           onChange={(v) => set('naming', v)} />
                    {data.naming === 'full_name' && (
                      <div className="mt-4">
                        <label htmlFor="displayName" className="mb-2 block text-[14px] font-medium">
                          Votre nom tel qu&apos;il doit apparaître
                        </label>
                        <input id="displayName" className="ti-input" value={data.displayName}
                               onChange={(e) => set('displayName', e.target.value)}
                               autoComplete="name" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="ti-question">Ce qui peut accompagner votre témoignage</p>
                    <span className="ti-hint">Cochez tout ce qui vous convient.</span>
                    <div className="grid gap-2">
                      <Toggle on={scopeOn('role')} onClick={() => toggleScope('role')}>
                        Ma fonction
                      </Toggle>
                      {scopeOn('role') && (
                        <div className="mb-2 ml-1 border-l-2 border-navy/10 pl-4 pt-1">
                          <label htmlFor="displayTitle" className="mb-2 block text-[14px] font-medium">
                            Votre fonction telle qu&apos;elle doit apparaître
                          </label>
                          <input id="displayTitle" className="ti-input" value={data.displayTitle}
                                 onChange={(e) => set('displayTitle', e.target.value)}
                                 placeholder={TITLE_PLACEHOLDER[data.role] ?? 'Formatrice d’anglais'} />
                        </div>
                      )}
                      {!anonymous && (
                        <Toggle on={scopeOn('institute')} onClick={() => toggleScope('institute')}>
                          Le nom de ma structure{data.institute.trim() ? ` (${data.institute.trim()})` : ''}
                        </Toggle>
                      )}
                      <Toggle on={scopeOn('city')} onClick={() => toggleScope('city')}>
                        Ma ville{data.city.trim() ? ` (${data.city.trim()})` : ''}
                      </Toggle>
                      {!anonymous && (
                        <>
                          <Toggle on={scopeOn('linkedin')} onClick={() => toggleScope('linkedin')}>
                            Un lien vers mon profil LinkedIn
                          </Toggle>
                          {scopeOn('linkedin') && (
                            <div className="mb-2 ml-1 border-l-2 border-navy/10 pl-4 pt-1">
                              <label htmlFor="linkedinUrl" className="mb-2 block text-[14px] font-medium">
                                Lien de votre profil
                              </label>
                              <input id="linkedinUrl" className="ti-input" type="url"
                                     inputMode="url" placeholder="https://www.linkedin.com/in/…"
                                     value={data.linkedinUrl}
                                     onChange={(e) => set('linkedinUrl', e.target.value)}
                                     aria-invalid={!isValidLinkedin(data.linkedinUrl)} />
                            </div>
                          )}
                          <Toggle on={scopeOn('photo')} onClick={() => toggleScope('photo')}>
                            Ma photo
                            <span className="block text-[13.5px] text-navy/55">
                              Celle de votre profil LinkedIn, ou une photo que Grégory vous demandera.
                            </span>
                          </Toggle>
                        </>
                      )}
                    </div>
                  </div>

                  <figure className="border border-navy/12 bg-white p-5 md:p-6" aria-live="polite">
                    <figcaption className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
                      Aperçu de votre témoignage
                    </figcaption>
                    <blockquote className="font-display text-[20px] font-semibold leading-snug md:text-[22px]">
                      « {quote} »
                    </blockquote>
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 text-[14.5px] text-navy/65">
                      <span>{data.naming ? attribution(data, fullName) : 'Choisissez comment vous nommer'}</span>
                      {!anonymous && scopeOn('linkedin') && isValidLinkedin(data.linkedinUrl) && (
                        <span className="text-[13px] font-medium text-rust">· profil LinkedIn</span>
                      )}
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-navy/55">
                      L&apos;extrait final sera choisi et raccourci avec vous :
                      Grégory vous enverra le texte exact, et rien ne sera publié
                      sans votre accord écrit. Aucun mot n&apos;est ajouté à ce
                      que vous avez écrit.
                    </p>
                  </figure>

                  <div>
                    <p className="ti-question">Où il pourrait apparaître</p>
                    <ul className="grid list-disc gap-1.5 pl-5 text-[15px] leading-relaxed text-navy/75">
                      <li>Le site teachinspire.me</li>
                      <li>Les publications LinkedIn de TeachInspire</li>
                      <li>Les documents de présentation envoyés aux instituts</li>
                    </ul>
                  </div>

                  <div>
                    <p className="ti-question">Et si vous le souhaitez</p>
                    <div className="grid gap-2">
                      <Toggle on={data.willingVideo} onClick={() => set('willingVideo', !data.willingVideo)}>
                        Je veux bien enregistrer une courte vidéo (1 à 2 min) en visio
                        avec Grégory, en montrant un cours que j&apos;ai créé
                      </Toggle>
                      <Toggle on={data.willingLinkedinPost}
                              onClick={() => set('willingLinkedinPost', !data.willingLinkedinPost)}>
                        Je veux bien publier moi-même un retour sur LinkedIn
                      </Toggle>
                    </div>
                  </div>
                </motion.div>
              )}

              <p className="border-l-2 border-yellow bg-yellow/10 px-4 py-3 text-[15px] leading-relaxed text-navy/80">
                Vos 30 minutes de crédits audio seront ajoutées au compte
                Studio avec lequel vous êtes connecté·e, quoi que vous ayez
                répondu.
              </p>

              <p className="text-[13px] leading-relaxed text-navy/55">
                Vos réponses sont conservées par TeachInspire pendant 3 ans et ne
                sont transmises à personne. Pour modifier ou retirer votre
                autorisation à tout moment, écrivez à greg@teachinspire.me : la
                citation sera retirée sous 7 jours.
              </p>
            </>
          )}
        </motion.div>
      </div>

      {/* Leurre anti-robot, invisible et hors du parcours au clavier. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={honeypot}
               onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {error && (
        <p role="alert" className="mt-8 border-l-2 border-rust bg-rust/10 px-4 py-3 text-[14px] text-navy">
          {error}
        </p>
      )}

      {step === TOTAL_STEPS && publishProblem() && (
        <p className="mt-8 border-l-2 border-rust bg-rust/10 px-4 py-3 text-[14px]">
          {publishProblem()}
        </p>
      )}

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-navy/10 pt-6">
        {step > 1 ? (
          <button type="button" className="ti-btn-ghost" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft className="h-4 w-4" /> Retour
          </button>
        ) : <span />}

        {step < TOTAL_STEPS ? (
          <button type="button" className="ti-btn-primary" disabled={!canAdvance()}
                  onClick={() => setStep((s) => s + 1)}>
            Continuer <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" className="ti-btn-primary"
                  disabled={submitting || !canAdvance()}
                  onClick={submit}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
              </>
            ) : (
              <>Envoyer mes réponses</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
