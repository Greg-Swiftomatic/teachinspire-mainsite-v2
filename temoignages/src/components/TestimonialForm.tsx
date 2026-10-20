import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useCopy, type Copy, type Lang } from '../i18n';

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

// Valeurs stockées, identiques dans toutes les langues : seuls les libellés
// (src/i18n) changent, pour que les réponses restent comparables.
const ROLES = ['direction', 'independant', 'salarie'] as const;
const REACTIONS = ['curieux', 'sceptique', 'reticent', 'inquiet', 'pas_le_temps', 'autre'] as const;
const TIME_BEFORE = ['moins_1h', '1_2h', '2_3h', 'plus_3h', 'aucune'] as const;
const TIME_NOW = ['moins_30', '30_60', '1_2h', 'plus_2h', 'non_utilise'] as const;
const FREQUENCY = ['hebdo', 'mensuel', 'rare', 'jamais'] as const;
const INTRO = ['oui', 'peut_etre', 'non'] as const;
const NAMING = ['full_name', 'initial', 'first_name', 'anonymous'] as const;

const options = <V extends string>(values: readonly V[], labels: Record<V, string>): Option[] =>
  values.map((value) => ({ value, label: labels[value] }));

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
  const c = useCopy().form;
  return (
    <div>
      <div role="radiogroup" aria-label={c.scaleAria} className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
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
        <span>{c.scaleLow}</span>
        <span>{c.scaleHigh}</span>
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

export function attribution(d: FormData, fullName: string, c: Copy['form']): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  const first = words[0] || c.firstNamePlaceholder;
  const last = words.slice(1).join(' ');
  const has = (s: string) => d.consentScope.includes(s);
  const anonymous = d.naming === 'anonymous';
  const title = has('role') ? d.displayTitle.trim() : '';
  const institute = d.institute.trim();

  const name =
    d.naming === 'full_name' ? (d.displayName.trim() || fullName || c.fullNamePlaceholder)
    : d.naming === 'initial' ? `${first}${last ? ` ${last[0].toUpperCase()}.` : ''}`
    : d.naming === 'first_name' ? first
    : '';

  const parts = [
    name,
    title,
    !anonymous && has('institute') && institute && !title.includes(institute) ? institute : '',
    has('city') ? d.city.trim() : '',
  ].filter(Boolean);

  return parts.length ? parts.join(', ') : c.anonymousSignature;
}

export function TestimonialForm({
  token,
  session,
  fullName,
  onStepChange,
  finished = false,
  lang,
  onSuccess,
}: {
  token: string | null;
  session: string;
  fullName: string;
  onStepChange?: (step: number) => void;
  finished?: boolean;
  lang: Lang;
  onSuccess: (credited: boolean) => void;
}) {
  const c = useCopy().form;
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
  const timeNow = options(TIME_NOW, finished
    ? { ...c.timeNow, non_utilise: c.timeNowUnusedFinished }
    : c.timeNow);
  const frequency = options(FREQUENCY, finished
    ? { ...c.frequency, jamais: c.frequencyNeverFinished }
    : c.frequency);

  const publishProblem = (): string => {
    if (!data.consentPublish) return '';
    if (!data.naming) return c.namingMissing;
    if (data.naming === 'full_name' && !data.displayName.trim()) return c.displayNameMissing;
    if (scopeOn('role') && !data.displayTitle.trim()) return c.titleMissing;
    if (scopeOn('city') && !data.city.trim()) return c.cityMissing;
    if (!anonymous && scopeOn('linkedin') && !isValidLinkedin(data.linkedinUrl))
      return c.linkedinInvalid;
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
        body: JSON.stringify({ ...data, token, lang, website: honeypot }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; credited?: boolean };
      if (!res.ok) throw new Error(body.error || c.sendFailed);
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      onSuccess(Boolean(body.credited));
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : c.networkFailed
      );
      setSubmitting(false);
    }
  };

  const pct = Math.round(((step - 1) / TOTAL_STEPS) * 100);
  const quote = excerpt(data.toASkeptic || data.whatChanged) || c.quotePlaceholder;

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
            {c.step(step, TOTAL_STEPS)}
          </span>
          <span className="text-[13px] tabular-nums text-navy/50">{c.percent(pct)}</span>
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
          {c.restored}
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
                <span className="ti-label">{c.youLabel}</span>
                <p className="ti-question">{c.roleQuestion}</p>
                <span className="ti-hint">{c.roleHint}</span>
                <Radio name={c.roleAria} options={options(ROLES, c.roles)} value={data.role}
                       onChange={(v) => set('role', v)} />
              </div>
              <div>
                <label htmlFor="institute" className="ti-question">
                  {data.role === 'salarie' ? c.instituteEmployed : c.instituteOther}
                </label>
                <span className="ti-hint">
                  {data.role === 'independant' ? c.instituteHintIndependent : c.instituteHint}
                </span>
                <input id="institute" className="ti-input" value={data.institute}
                       onChange={(e) => set('institute', e.target.value)}
                       autoComplete="organization" required />
              </div>
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor="city" className="ti-question">{c.city}</label>
                  <input id="city" className="ti-input" value={data.city}
                         onChange={(e) => set('city', e.target.value)}
                         autoComplete="address-level2" placeholder={c.cityPlaceholder} />
                </div>
                <div>
                  <label htmlFor="languages" className="ti-question">{c.languages}</label>
                  <input id="languages" className="ti-input" value={data.languages}
                         onChange={(e) => set('languages', e.target.value)}
                         placeholder={c.languagesPlaceholder} />
                </div>
              </div>
              <div>
                <label htmlFor="learnerSectors" className="ti-question">
                  {c.sectors}
                </label>
                <span className="ti-hint">{c.sectorsHint}</span>
                <input id="learnerSectors" className="ti-input" value={data.learnerSectors}
                       onChange={(e) => set('learnerSectors', e.target.value)} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <span className="ti-label">{c.startLabel}</span>
                <p className="ti-question">
                  {assigned ? c.reactionAssigned : c.reactionChosen}
                </p>
                <span className="ti-hint">{c.reactionHint}</span>
                <Radio name={c.reactionAria}
                       options={options(REACTIONS, assigned ? c.reactionsAssigned : c.reactionsChosen)}
                       value={data.initialReaction}
                       onChange={(v) => set('initialReaction', v)} />
                {data.initialReaction === 'autre' && (
                  <input className="ti-input mt-3" value={data.initialReactionOther}
                         onChange={(e) => set('initialReactionOther', e.target.value)}
                         placeholder={c.reactionOtherPlaceholder} aria-label={c.reactionOtherAria} />
                )}
              </div>
              <div>
                <p className="ti-question">{c.timeBeforeQuestion}</p>
                <span className="ti-hint">{c.timeBeforeHint}</span>
                <Radio name={c.timeBeforeAria} options={options(TIME_BEFORE, c.timeBefore)}
                       value={data.prepTimeBefore}
                       onChange={(v) => set('prepTimeBefore', v)} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <span className="ti-label">{finished ? c.nowLabelFinished : c.nowLabelOngoing}</span>
                <p className="ti-question">{c.timeNowQuestion}</p>
                <Radio name={c.timeNowAria} options={timeNow}
                       value={data.prepTimeNow}
                       onChange={(v) => set('prepTimeNow', v)} />
              </div>
              <div>
                <p className="ti-question">{c.frequencyQuestion}</p>
                <Radio name={c.frequencyAria} options={frequency}
                       value={data.usageFrequency}
                       onChange={(v) => set('usageFrequency', v)} />
              </div>
              <div>
                <label htmlFor="whatChanged" className="ti-question">
                  {c.changedQuestion}
                </label>
                <span className="ti-hint">{c.changedHint}</span>
                <textarea id="whatChanged" className="ti-textarea" value={data.whatChanged}
                          onChange={(e) => set('whatChanged', e.target.value)} required />
                {data.whatChanged.trim().length > 0 &&
                  data.whatChanged.trim().length < WHAT_CHANGED_MIN && (
                  <p className="mt-2 text-[13px] text-rust">
                    {c.changedTooShort(data.whatChanged.trim().length, WHAT_CHANGED_MIN)}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="firstArtifact" className="ti-question">
                  {c.artifactQuestion}
                </label>
                <span className="ti-hint">{c.artifactHint}</span>
                <textarea id="firstArtifact" className="ti-textarea min-h-[100px]"
                          value={data.firstArtifact}
                          onChange={(e) => set('firstArtifact', e.target.value)} />
              </div>
              <div>
                <label htmlFor="learnerFeedback" className="ti-question">
                  {c.feedbackQuestion}
                </label>
                <span className="ti-hint">{c.feedbackHint}</span>
                <textarea id="learnerFeedback" className="ti-textarea min-h-[100px]"
                          value={data.learnerFeedback}
                          onChange={(e) => set('learnerFeedback', e.target.value)} />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <span className="ti-label">{c.opinionLabel}</span>
                <label htmlFor="toASkeptic" className="ti-question">
                  {c.skepticQuestion}
                </label>
                <span className="ti-hint">{c.skepticHint}</span>
                <textarea id="toASkeptic" className="ti-textarea" value={data.toASkeptic}
                          onChange={(e) => set('toASkeptic', e.target.value)} />
              </div>
              <div>
                <label htmlFor="keepOne" className="ti-question">
                  {c.keepQuestion}
                </label>
                <input id="keepOne" className="ti-input" value={data.keepOne}
                       onChange={(e) => set('keepOne', e.target.value)}
                       placeholder={c.keepPlaceholder} />
              </div>
              <div>
                <label htmlFor="whatWasMissing" className="ti-question">
                  {finished ? c.missingFinished : c.missingOngoing}
                </label>
                <span className="ti-hint">{c.missingHint}</span>
                <textarea id="whatWasMissing" className="ti-textarea min-h-[110px]"
                          value={data.whatWasMissing}
                          onChange={(e) => set('whatWasMissing', e.target.value)} />
              </div>
              <div>
                <p className="ti-question">{c.recommendQuestion}</p>
                <Scale value={data.recommendScore} onChange={(v) => set('recommendScore', v)} />
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div>
                <span className="ti-label">{c.networkLabel}</span>
                <label htmlFor="institutesWorkedWith" className="ti-question">
                  {data.role === 'direction' ? c.networkDirection : c.networkOther}
                </label>
                <span className="ti-hint">{c.networkHint}</span>
                <textarea id="institutesWorkedWith" className="ti-textarea min-h-[100px]"
                          value={data.institutesWorkedWith}
                          onChange={(e) => set('institutesWorkedWith', e.target.value)} />
              </div>
              <div>
                <p className="ti-question">{c.introQuestion}</p>
                <span className="ti-hint">{c.introHint}</span>
                <Radio name={c.introAria} options={options(INTRO, c.intro)} value={data.introOk}
                       onChange={(v) => set('introOk', v)} />
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div>
                <span className="ti-label">{c.publishLabel}</span>
                <p className="ti-question">{c.publishQuestion}</p>
                <span className="ti-hint">{c.publishHint}</span>
                <Toggle on={data.consentPublish}
                        onClick={() => set('consentPublish', !data.consentPublish)}>
                  <strong className="font-semibold">{c.publishToggle}</strong>
                  <br />
                  <span className="text-navy/60">{c.publishToggleNote}</span>
                </Toggle>
              </div>

              {data.consentPublish && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid gap-10 overflow-hidden"
                >
                  <div>
                    <p className="ti-question">{c.namingQuestion}</p>
                    <Radio name={c.namingAria} options={options(NAMING, c.naming)} value={data.naming}
                           onChange={(v) => set('naming', v)} />
                    {data.naming === 'full_name' && (
                      <div className="mt-4">
                        <label htmlFor="displayName" className="mb-2 block text-[14px] font-medium">
                          {c.displayNameLabel}
                        </label>
                        <input id="displayName" className="ti-input" value={data.displayName}
                               onChange={(e) => set('displayName', e.target.value)}
                               autoComplete="name" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="ti-question">{c.scopeQuestion}</p>
                    <span className="ti-hint">{c.scopeHint}</span>
                    <div className="grid gap-2">
                      <Toggle on={scopeOn('role')} onClick={() => toggleScope('role')}>
                        {c.scopeRole}
                      </Toggle>
                      {scopeOn('role') && (
                        <div className="mb-2 ml-1 border-l-2 border-navy/10 pl-4 pt-1">
                          <label htmlFor="displayTitle" className="mb-2 block text-[14px] font-medium">
                            {c.displayTitleLabel}
                          </label>
                          <input id="displayTitle" className="ti-input" value={data.displayTitle}
                                 onChange={(e) => set('displayTitle', e.target.value)}
                                 placeholder={c.titlePlaceholder[data.role] ?? c.titlePlaceholderDefault} />
                        </div>
                      )}
                      {!anonymous && (
                        <Toggle on={scopeOn('institute')} onClick={() => toggleScope('institute')}>
                          {c.scopeInstitute}{data.institute.trim() ? ` (${data.institute.trim()})` : ''}
                        </Toggle>
                      )}
                      <Toggle on={scopeOn('city')} onClick={() => toggleScope('city')}>
                        {c.scopeCity}{data.city.trim() ? ` (${data.city.trim()})` : ''}
                      </Toggle>
                      {!anonymous && (
                        <>
                          <Toggle on={scopeOn('linkedin')} onClick={() => toggleScope('linkedin')}>
                            {c.scopeLinkedin}
                          </Toggle>
                          {scopeOn('linkedin') && (
                            <div className="mb-2 ml-1 border-l-2 border-navy/10 pl-4 pt-1">
                              <label htmlFor="linkedinUrl" className="mb-2 block text-[14px] font-medium">
                                {c.linkedinLabel}
                              </label>
                              <input id="linkedinUrl" className="ti-input" type="url"
                                     inputMode="url" placeholder="https://www.linkedin.com/in/…"
                                     value={data.linkedinUrl}
                                     onChange={(e) => set('linkedinUrl', e.target.value)}
                                     aria-invalid={!isValidLinkedin(data.linkedinUrl)} />
                            </div>
                          )}
                          <Toggle on={scopeOn('photo')} onClick={() => toggleScope('photo')}>
                            {c.scopePhoto}
                            <span className="block text-[13.5px] text-navy/55">
                              {c.scopePhotoNote}
                            </span>
                          </Toggle>
                        </>
                      )}
                    </div>
                  </div>

                  <figure className="border border-navy/12 bg-white p-5 md:p-6" aria-live="polite">
                    <figcaption className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
                      {c.previewTitle}
                    </figcaption>
                    <blockquote className="font-display text-[20px] font-semibold leading-snug md:text-[22px]">
                      {c.quote(quote)}
                    </blockquote>
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 text-[14.5px] text-navy/65">
                      <span>{data.naming ? attribution(data, fullName, c) : c.namingPending}</span>
                      {!anonymous && scopeOn('linkedin') && isValidLinkedin(data.linkedinUrl) && (
                        <span className="text-[13px] font-medium text-rust">{c.linkedinBadge}</span>
                      )}
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-navy/55">
                      {c.previewNote}
                    </p>
                  </figure>

                  <div>
                    <p className="ti-question">{c.whereQuestion}</p>
                    <ul className="grid list-disc gap-1.5 pl-5 text-[15px] leading-relaxed text-navy/75">
                      {c.where.map((w) => <li key={w}>{w}</li>)}
                    </ul>
                  </div>

                  <div>
                    <p className="ti-question">{c.extrasQuestion}</p>
                    <div className="grid gap-2">
                      <Toggle on={data.willingVideo} onClick={() => set('willingVideo', !data.willingVideo)}>
                        {c.willingVideo}
                      </Toggle>
                      <Toggle on={data.willingLinkedinPost}
                              onClick={() => set('willingLinkedinPost', !data.willingLinkedinPost)}>
                        {c.willingLinkedinPost}
                      </Toggle>
                    </div>
                  </div>
                </motion.div>
              )}

              <p className="border-l-2 border-yellow bg-yellow/10 px-4 py-3 text-[15px] leading-relaxed text-navy/80">
                {c.creditsNote}
              </p>

              <p className="text-[13px] leading-relaxed text-navy/55">
                {c.privacy}
              </p>
            </>
          )}
        </motion.div>
      </div>

      {/* Leurre anti-robot, invisible et hors du parcours au clavier. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{c.honeypot}</label>
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
            <ChevronLeft className="h-4 w-4" /> {c.back}
          </button>
        ) : <span />}

        {step < TOTAL_STEPS ? (
          <button type="button" className="ti-btn-primary" disabled={!canAdvance()}
                  onClick={() => setStep((s) => s + 1)}>
            {c.next} <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" className="ti-btn-primary"
                  disabled={submitting || !canAdvance()}
                  onClick={submit}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {c.sending}
              </>
            ) : (
              <>{c.send}</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
