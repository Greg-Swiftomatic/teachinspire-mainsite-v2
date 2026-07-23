import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const DRAFT_KEY = 'ti-temoignage-draft-v1';
const TOTAL_STEPS = 5;

export interface FormData {
  firstName: string;
  lastName: string;
  institute: string;
  languages: string;
  role: string;

  initialReaction: string;
  initialReactionOther: string;
  prepTimeBefore: string;

  prepTimeNow: string;
  usageFrequency: string;
  whatChanged: string;
  firstArtifact: string;

  toASkeptic: string;
  whatWasMissing: string;

  consentPublish: boolean;
  consentScope: string[];
  linkedinUrl: string;
  consentReviewBeforePublish: boolean;
  willingVideo: boolean;
  willingLinkedinPost: boolean;
  creditEmail: string;
}

const EMPTY: FormData = {
  firstName: '', lastName: '', institute: '', languages: '', role: 'formateur',
  initialReaction: '', initialReactionOther: '', prepTimeBefore: '',
  prepTimeNow: '', usageFrequency: '', whatChanged: '', firstArtifact: '',
  toASkeptic: '', whatWasMissing: '',
  consentPublish: false, consentScope: [], linkedinUrl: '',
  consentReviewBeforePublish: false, willingVideo: false, willingLinkedinPost: false,
  creditEmail: '',
};

const REACTIONS = [
  { value: 'curieux', label: 'Curieux ou curieuse, plutôt partant·e' },
  { value: 'sceptique', label: "Sceptique : j'avais déjà essayé l'IA sans résultat convaincant" },
  { value: 'reticent', label: "Réticent·e : je ne voyais pas ce que l'IA venait faire dans mon métier" },
  { value: 'inquiet', label: "Inquiet ou inquiète pour l'avenir du métier" },
  { value: 'pas_le_temps', label: '« Encore une formation » : je n’avais pas le temps' },
  { value: 'autre', label: 'Autre' },
];

const TIME_BEFORE = [
  { value: 'moins_1h', label: "Moins d'1h" },
  { value: '1_2h', label: '1 à 2h' },
  { value: '2_3h', label: '2 à 3h' },
  { value: 'plus_3h', label: 'Plus de 3h' },
  { value: 'aucune', label: "Je n'en préparais pas à partir de ressources authentiques" },
];

const TIME_NOW = [
  { value: 'moins_30', label: 'Moins de 30 min' },
  { value: '30_60', label: '30 min à 1h' },
  { value: '1_2h', label: '1 à 2h' },
  { value: 'plus_2h', label: 'Plus de 2h' },
  { value: 'non_utilise', label: "Je n'utilise pas la méthode" },
];

const FREQUENCY = [
  { value: 'hebdo', label: 'Chaque semaine' },
  { value: 'mensuel', label: 'Quelques fois par mois' },
  { value: 'rare', label: 'Rarement' },
  { value: 'jamais', label: 'Plus du tout' },
];

const CONSENT_SCOPE = [
  { value: 'first_name', label: 'Mon prénom seul' },
  { value: 'initial', label: 'Mon prénom et l’initiale de mon nom' },
  { value: 'full_name', label: 'Mon prénom et mon nom' },
  { value: 'institute', label: 'Le nom de mon institut' },
  { value: 'role', label: 'Ma fonction' },
  { value: 'linkedin', label: 'Un lien vers mon profil LinkedIn' },
  { value: 'photo', label: 'Ma photo' },
];

function Radio({
  name, options, value, onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
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

function CheckList({
  options, values, onToggle,
}: {
  options: { value: string; label: string }[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((o) => {
        const on = values.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            role="checkbox"
            aria-checked={on}
            onClick={() => onToggle(o.value)}
            className="ti-choice"
          >
            <span className="ti-marker grid place-items-center" aria-hidden="true">
              {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </span>
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TestimonialForm({
  token,
  onSuccess,
}: {
  token: string | null;
  onSuccess: (creditEmail?: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  // Champ leurre : rempli uniquement par les robots.
  const [honeypot, setHoneypot] = useState('');

  // Un formulaire de 7 minutes ne doit jamais se perdre sur un rechargement.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        setData({ ...EMPTY, ...JSON.parse(raw) });
        setRestored(true);
      }
    } catch {
      /* stockage indisponible, on continue sans brouillon */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* quota ou mode privé */
    }
  }, [data]);

  useEffect(() => {
    headingRef.current?.focus();
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

  const canAdvance = (): boolean => {
    switch (step) {
      case 1: return data.firstName.trim().length > 0;
      case 2: return data.initialReaction !== '' && data.prepTimeBefore !== '';
      case 3: return data.prepTimeNow !== '' && data.usageFrequency !== '' && data.whatChanged.trim().length > 0;
      case 4: return true;
      default: return true;
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token, website: honeypot }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'Échec de l’envoi');
      }
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      onSuccess(data.creditEmail.trim() || undefined);
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

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust">
            Étape {step} sur {TOTAL_STEPS}
          </span>
          <span className="text-[13px] text-navy/50 tabular-nums">{pct} %</span>
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
        {(
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
                  <label htmlFor="firstName" className="ti-question">Votre prénom</label>
                  <input id="firstName" className="ti-input" value={data.firstName}
                         onChange={(e) => set('firstName', e.target.value)}
                         autoComplete="given-name" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="ti-question">Votre nom</label>
                  <span className="ti-hint">Facultatif. Vous choisirez plus tard ce qui peut être publié.</span>
                  <input id="lastName" className="ti-input" value={data.lastName}
                         onChange={(e) => set('lastName', e.target.value)}
                         autoComplete="family-name" />
                </div>
                <div>
                  <label htmlFor="institute" className="ti-question">Votre institut</label>
                  <input id="institute" className="ti-input" value={data.institute}
                         onChange={(e) => set('institute', e.target.value)}
                         autoComplete="organization" />
                </div>
                <div>
                  <label htmlFor="languages" className="ti-question">
                    Quelle(s) langue(s) enseignez-vous ?
                  </label>
                  <input id="languages" className="ti-input" value={data.languages}
                         onChange={(e) => set('languages', e.target.value)}
                         placeholder="FLE, anglais, espagnol…" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <span className="ti-label">Au départ</span>
                  <p className="ti-question">
                    Quand votre direction vous a annoncé cette formation IA,
                    qu&apos;est-ce que vous vous êtes dit ?
                  </p>
                  <span className="ti-hint">
                    Répondez franchement : les réserves nous intéressent autant
                    que l&apos;enthousiasme.
                  </span>
                  <Radio name="Réaction initiale" options={REACTIONS}
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
                    Avant la formation, combien de temps vous prenait la préparation
                    d&apos;un cours à partir d&apos;une ressource authentique ?
                  </p>
                  <span className="ti-hint">Un podcast, un article, une vidéo.</span>
                  <Radio name="Temps avant" options={TIME_BEFORE}
                         value={data.prepTimeBefore}
                         onChange={(v) => set('prepTimeBefore', v)} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <span className="ti-label">Aujourd&apos;hui</span>
                  <p className="ti-question">Le même cours, aujourd&apos;hui, vous prend :</p>
                  <Radio name="Temps aujourd'hui" options={TIME_NOW}
                         value={data.prepTimeNow}
                         onChange={(v) => set('prepTimeNow', v)} />
                </div>
                <div>
                  <p className="ti-question">À quelle fréquence utilisez-vous la méthode ?</p>
                  <Radio name="Fréquence" options={FREQUENCY}
                         value={data.usageFrequency}
                         onChange={(v) => set('usageFrequency', v)} />
                </div>
                <div>
                  <label htmlFor="whatChanged" className="ti-question">
                    Qu&apos;est-ce qui a changé concrètement dans votre façon de
                    préparer vos cours ?
                  </label>
                  <span className="ti-hint">
                    C&apos;est la question qui compte le plus. Soyez concret :
                    qu&apos;est-ce que vous faites aujourd&apos;hui que vous ne
                    faisiez pas avant ? Qu&apos;est-ce que vous avez arrêté de
                    faire ? Sur quoi passez-vous le temps gagné ?
                  </span>
                  <textarea id="whatChanged" className="ti-textarea" value={data.whatChanged}
                            onChange={(e) => set('whatChanged', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="firstArtifact" className="ti-question">
                    Quel est le premier support que vous avez créé avec la méthode ?
                  </label>
                  <span className="ti-hint">Et à partir de quelle source ?</span>
                  <textarea id="firstArtifact" className="ti-textarea min-h-[100px]"
                            value={data.firstArtifact}
                            onChange={(e) => set('firstArtifact', e.target.value)} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <span className="ti-label">Pour vos collègues</span>
                  <label htmlFor="toASkeptic" className="ti-question">
                    Un formateur sceptique vous dit « l&apos;IA, ce n&apos;est pas
                    pour nous ». Qu&apos;est-ce que vous lui répondez ?
                  </label>
                  <textarea id="toASkeptic" className="ti-textarea" value={data.toASkeptic}
                            onChange={(e) => set('toASkeptic', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="whatWasMissing" className="ti-question">
                    Qu&apos;est-ce qui vous a manqué dans la formation ?
                  </label>
                  <span className="ti-hint">
                    Qu&apos;est-ce qu&apos;on devrait améliorer en priorité ? Les
                    critiques nous sont plus utiles que les compliments.
                  </span>
                  <textarea id="whatWasMissing" className="ti-textarea"
                            value={data.whatWasMissing}
                            onChange={(e) => set('whatWasMissing', e.target.value)} />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div>
                  <span className="ti-label">Publication</span>
                  <p className="ti-question">Pouvons-nous citer vos réponses ?</p>
                  <div className="mb-5 border border-navy/12 bg-white p-5">
                    <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-rust mb-3">
                      Aperçu
                    </p>
                    <p className="font-display text-[22px] leading-snug font-semibold">
                      « Je suis étonnée d&apos;entendre des situations qu&apos;on vit
                      vraiment au travail. »
                    </p>
                    <p className="mt-3 text-[14px] text-navy/60">
                      Prénom Nom, fonction, institut
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-navy/55">
                      Voici à quoi ressemble une citation publiée sur notre site.
                      Vous reliriez le texte exact avant toute mise en ligne.
                    </p>
                  </div>

                  <button type="button" role="checkbox"
                          aria-checked={data.consentPublish}
                          onClick={() => set('consentPublish', !data.consentPublish)}
                          className="ti-choice">
                    <span className="ti-marker grid place-items-center" aria-hidden="true">
                      {data.consentPublish && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                    </span>
                    <span>
                      <strong className="font-semibold">
                        J&apos;autorise TeachInspire à publier tout ou partie de mes réponses.
                      </strong>
                      <br />
                      <span className="text-navy/60">
                        Sans cette case, vos réponses restent internes, et les
                        crédits vous sont offerts de la même façon.
                      </span>
                    </span>
                  </button>
                </div>

                {data.consentPublish && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid gap-8 overflow-hidden"
                  >
                    <div>
                      <p className="ti-question">Jusqu&apos;où pouvons-nous aller ?</p>
                      <span className="ti-hint">Cochez tout ce qui vous convient.</span>
                      <CheckList options={CONSENT_SCOPE} values={data.consentScope}
                                 onToggle={toggleScope} />
                    </div>

                    {data.consentScope.includes('linkedin') && (
                      <div>
                        <label htmlFor="linkedinUrl" className="ti-question">
                          Lien de votre profil LinkedIn
                        </label>
                        <span className="ti-hint">
                          Un profil consultable rend un témoignage nettement plus
                          crédible pour un directeur qui hésite.
                        </span>
                        <input id="linkedinUrl" className="ti-input" type="url"
                               inputMode="url" placeholder="https://www.linkedin.com/in/…"
                               value={data.linkedinUrl}
                               onChange={(e) => set('linkedinUrl', e.target.value)} />
                      </div>
                    )}

                    <div className="grid gap-2">
                      <CheckList
                        options={[
                          { value: 'review', label: 'Je veux relire la version éditée avant publication' },
                          { value: 'video', label: 'Je serais prêt·e à faire un témoignage vidéo de 2 minutes' },
                          { value: 'post', label: 'Je serais prêt·e à publier moi-même un retour sur LinkedIn' },
                        ]}
                        values={[
                          data.consentReviewBeforePublish ? 'review' : '',
                          data.willingVideo ? 'video' : '',
                          data.willingLinkedinPost ? 'post' : '',
                        ].filter(Boolean)}
                        onToggle={(v) => {
                          if (v === 'review') set('consentReviewBeforePublish', !data.consentReviewBeforePublish);
                          if (v === 'video') set('willingVideo', !data.willingVideo);
                          if (v === 'post') set('willingLinkedinPost', !data.willingLinkedinPost);
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label htmlFor="creditEmail" className="ti-question">
                    Sur quel email créditer vos 30 minutes ?
                  </label>
                  <span className="ti-hint">
                    Offertes quoi que vous ayez répondu, et que vous ayez accepté
                    ou non d&apos;être cité·e.
                  </span>
                  <input id="creditEmail" className="ti-input" type="email"
                         inputMode="email" autoComplete="email"
                         value={data.creditEmail}
                         onChange={(e) => set('creditEmail', e.target.value)}
                         placeholder="vous@institut.fr" />
                </div>

                <p className="text-[13px] leading-relaxed text-navy/55">
                  Vous pouvez retirer votre autorisation à tout moment en écrivant
                  à greg@teachinspire.me : la citation sera retirée sous 7 jours.
                  Vos réponses sont conservées 3 ans.
                </p>
              </>
            )}
          </motion.div>
        )}
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
          <button type="button" className="ti-btn-primary" disabled={submitting}
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
