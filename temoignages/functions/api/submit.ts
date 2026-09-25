/**
 * Enregistre une réponse au questionnaire.
 *
 * Exige une session ouverte par /api/login (compte Studio vérifié).
 * L'identité (id, email, prénom) vient exclusivement du jeton de session,
 * jamais des champs du formulaire, et un index unique garantit une seule
 * réponse par compte : les 30 minutes offertes ne peuvent être obtenues
 * qu'une fois, et uniquement par un utilisateur existant.
 */

import { bearer, verifySession } from '../lib/session';
import { notifyNewResponse } from '../lib/notify';
import { versionFor } from '../lib/version';

interface Env {
  DB: D1Database;
  TI_SESSION_SECRET?: string;
  TESTIMONIAL_GRANT_SECRET?: string;
  STUDIO_GRANT_URL?: string;
  STUDIO_NOTIFY_URL?: string;
  NOTIFY_EMAIL?: string;
  FORM_VERSION?: string;
}

const DEFAULT_GRANT_URL = 'https://studio.teachinspire.me/api/internal/testimonial-grant';
const GRANT_SECONDS = 1800; // 30 minutes offertes

/**
 * Crédite les 30 minutes sur le compte Studio. Best effort : un échec ne doit
 * jamais faire échouer l'enregistrement de la réponse. Si le crédit passe,
 * credited_at est rempli ; sinon il reste NULL et signale un crédit à faire à
 * la main (SELECT ... WHERE credited_at IS NULL).
 */
async function grantCredits(env: Env, responseId: number, studioUserId: string): Promise<boolean> {
  const secret = env.TESTIMONIAL_GRANT_SECRET;
  if (!secret) return false;
  try {
    const res = await fetch(env.STUDIO_GRANT_URL || DEFAULT_GRANT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Internal-Secret': secret },
      body: JSON.stringify({ userId: studioUserId, seconds: GRANT_SECONDS }),
    });
    if (!res.ok) {
      console.error('credit grant failed', res.status, await res.text().catch(() => ''));
      return false;
    }
    await env.DB.prepare('UPDATE responses SET credited_at = ? WHERE id = ?')
      .bind(new Date().toISOString(), responseId)
      .run();
    return true;
  } catch (err) {
    console.error('credit grant error', err);
    return false;
  }
}

interface Payload {
  token?: string | null;
  website?: string; // leurre

  role?: string;
  institute?: string;
  city?: string;
  languages?: string;
  learnerSectors?: string;

  initialReaction?: string;
  initialReactionOther?: string;
  prepTimeBefore?: string;

  prepTimeNow?: string;
  usageFrequency?: string;
  whatChanged?: string;
  firstArtifact?: string;
  learnerFeedback?: string;

  toASkeptic?: string;
  keepOne?: string;
  whatWasMissing?: string;
  recommendScore?: number | null;

  institutesWorkedWith?: string;
  introOk?: string;

  consentPublish?: boolean;
  naming?: string;
  displayName?: string;
  consentScope?: string[];
  displayTitle?: string;
  linkedinUrl?: string;
  willingVideo?: boolean;
  willingLinkedinPost?: boolean;
}

const ROLES = ['direction', 'independant', 'salarie'];
const REACTIONS = ['curieux', 'sceptique', 'reticent', 'inquiet', 'pas_le_temps', 'autre'];
const TIME_BEFORE = ['moins_1h', '1_2h', '2_3h', 'plus_3h', 'aucune'];
const TIME_NOW = ['moins_30', '30_60', '1_2h', 'plus_2h', 'non_utilise'];
const FREQUENCY = ['hebdo', 'mensuel', 'rare', 'jamais'];
const INTRO = ['oui', 'peut_etre', 'non'];
const NAMING = ['full_name', 'initial', 'first_name', 'anonymous'];
const SCOPES = ['institute', 'role', 'city', 'linkedin', 'photo'];

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
};

const oneOf = (v: unknown, allowed: string[]): string | null =>
  typeof v === 'string' && allowed.includes(v) ? v : null;

const bit = (v: unknown): number => (v === true ? 1 : 0);

const score = (v: unknown): number | null =>
  typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 10 ? v : null;

const isSafeLinkedIn = (v: string | null): string | null => {
  if (!v) return null;
  try {
    const u = new URL(v);
    if (u.protocol !== 'https:') return null;
    if (!/(^|\.)linkedin\.com$/i.test(u.hostname)) return null;
    return u.toString().slice(0, 300);
  } catch {
    return null;
  }
};

const bad = (error: string) => Response.json({ error }, { status: 400 });

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const secret = context.env.TI_SESSION_SECRET;
    if (!secret) {
      return Response.json({ error: 'Service non configuré.' }, { status: 503 });
    }

    const raw = bearer(context.request);
    const session = raw ? await verifySession(raw, secret) : null;
    if (!session) {
      return Response.json(
        { error: 'Session expirée. Reconnectez-vous avec votre compte Studio.' },
        { status: 401 }
      );
    }

    const body = (await context.request.json()) as Payload;

    // Un robot remplit tous les champs, y compris celui que personne ne voit.
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return Response.json({ success: true }, { status: 201 });
    }

    const role = oneOf(body.role, ROLES);
    if (!role) return bad('Indiquez votre situation (étape 1).');

    const institute = clean(body.institute, 160);
    if (!institute) return bad('Le nom de votre structure est requis (étape 1).');

    const whatChanged = clean(body.whatChanged, 5000);
    if (!whatChanged || whatChanged.length < 30) {
      return bad('La question sur ce qui a changé est requise (30 caractères minimum).');
    }

    const initialReaction = oneOf(body.initialReaction, REACTIONS);
    const prepTimeBefore = oneOf(body.prepTimeBefore, TIME_BEFORE);
    const prepTimeNow = oneOf(body.prepTimeNow, TIME_NOW);
    const usageFrequency = oneOf(body.usageFrequency, FREQUENCY);
    if (!initialReaction || !prepTimeBefore || !prepTimeNow || !usageFrequency) {
      return bad('Les questions à choix des étapes 2 et 3 sont requises.');
    }

    // Vérification anticipée pour un message clair (l'index unique reste la
    // garantie finale en cas de course).
    const dup = await context.env.DB.prepare(
      'SELECT id FROM responses WHERE studio_user_id = ? LIMIT 1'
    )
      .bind(session.sub)
      .first();
    if (dup) {
      return Response.json(
        { error: 'Une réponse existe déjà pour ce compte. Merci !' },
        { status: 409 }
      );
    }

    const token = clean(body.token, 64);
    const safeToken = token && /^[A-Za-z0-9_-]{6,64}$/.test(token) ? token : null;
    const city = clean(body.city, 80);

    // Consentement. Le serveur décide de ce qui est publiable, jamais le client :
    // sans consent_publish tout reste à 0, et « aucun nom » exclut tout ce qui
    // permettrait de retrouver la personne (structure, LinkedIn, photo).
    const consentPublish = bit(body.consentPublish);
    const naming = consentPublish ? oneOf(body.naming, NAMING) : null;
    if (consentPublish && !naming) return bad('Choisissez comment vous nommer, ou décochez la publication.');
    const anonymous = naming === 'anonymous';

    const scope = consentPublish && Array.isArray(body.consentScope)
      ? body.consentScope.filter((s) => SCOPES.includes(s))
      : [];
    const has = (s: string) =>
      consentPublish === 1 && scope.includes(s) &&
      !(anonymous && ['institute', 'linkedin', 'photo'].includes(s)) ? 1 : 0;

    const displayName = naming === 'full_name' ? clean(body.displayName, 120) : null;
    if (naming === 'full_name' && !displayName) return bad('Indiquez votre nom tel qu’il doit apparaître.');

    const displayTitle = has('role') ? clean(body.displayTitle, 160) : null;
    if (has('role') && !displayTitle) return bad('Indiquez votre fonction, ou décochez « Ma fonction ».');
    if (has('city') && !city) return bad('Indiquez votre ville, ou décochez « Ma ville ».');

    const linkedin = has('linkedin') ? isSafeLinkedIn(clean(body.linkedinUrl, 300)) : null;
    // Cocher « lien LinkedIn » sans fournir de lien valide est incohérent :
    // on refuse plutôt que d'enregistrer un consentement sans objet.
    if (has('linkedin') && !linkedin) return bad('Le lien LinkedIn est requis, ou décochez cette option.');

    const fullName = (session.fullName || '').trim();
    const lastName = fullName.split(/\s+/).slice(1).join(' ') || null;
    const firstName = session.firstName || session.email.split('@')[0];
    const formVersion = await versionFor(context.env.DB, session.sub, context.env.FORM_VERSION);

    const row: Record<string, unknown> = {
      submitted_at: new Date().toISOString(),
      token: safeToken,
      studio_user_id: session.sub,
      studio_email: session.email,
      first_name: firstName,
      last_name: lastName,
      institute,
      city,
      languages: clean(body.languages, 160),
      learner_sectors: clean(body.learnerSectors, 300),
      role,
      initial_reaction: initialReaction,
      initial_reaction_other: clean(body.initialReactionOther, 500),
      prep_time_before: prepTimeBefore,
      prep_time_now: prepTimeNow,
      usage_frequency: usageFrequency,
      what_changed: whatChanged,
      first_artifact: clean(body.firstArtifact, 3000),
      learner_feedback: clean(body.learnerFeedback, 3000),
      to_a_skeptic: clean(body.toASkeptic, 3000),
      keep_one: clean(body.keepOne, 500),
      what_was_missing: clean(body.whatWasMissing, 3000),
      recommend_score: score(body.recommendScore),
      institutes_worked_with: clean(body.institutesWorkedWith, 2000),
      intro_ok: oneOf(body.introOk, INTRO),
      consent_publish: consentPublish,
      consent_anonymous: anonymous ? 1 : 0,
      consent_first_name: naming === 'first_name' ? 1 : 0,
      consent_initial: naming === 'initial' ? 1 : 0,
      consent_full_name: naming === 'full_name' ? 1 : 0,
      consent_institute: has('institute'),
      consent_role: has('role'),
      consent_city: has('city'),
      consent_linkedin: has('linkedin'),
      consent_photo: has('photo'),
      // Engagement affiché dans le formulaire : rien n'est publié sans
      // validation écrite de la version finale.
      consent_review_before_publish: consentPublish,
      willing_video: bit(body.willingVideo),
      willing_linkedin_post: bit(body.willingLinkedinPost),
      linkedin_url: linkedin,
      display_name: displayName,
      display_title: displayTitle,
      credit_email: session.email, // les crédits vont au compte connecté, pas à un email saisi
      form_version: formVersion,
      locale: clean(context.request.headers.get('accept-language'), 40),
      user_agent: clean(context.request.headers.get('user-agent'), 300),
    };

    const cols = Object.keys(row);
    const result = await context.env.DB
      .prepare(`INSERT INTO responses (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`)
      .bind(...cols.map((c) => row[c] ?? null))
      .run();

    if (!result.success) throw new Error('Insert failed');
    const id = Number(result.meta.last_row_id);

    // Marque l'invitation comme honorée par compte (fiable même si la
    // personne est arrivée sans son lien) et, à défaut, par jeton.
    await context.env.DB
      .prepare(
        'UPDATE invites SET responded_at = ? WHERE responded_at IS NULL AND (studio_user_id = ? OR token = ?)'
      )
      .bind(new Date().toISOString(), session.sub, safeToken)
      .run()
      .catch(() => undefined);

    // L'unicité par compte est déjà acquise (index + 409 ci-dessus) : ce
    // crédit ne peut donc être déclenché qu'une seule fois par utilisateur.
    const credited = await grantCredits(context.env, id, session.sub);

    await notifyNewResponse(context.env, { id, fullName: fullName || firstName, credited, row });

    return Response.json({ success: true, id, credited }, { status: 201 });
  } catch (err) {
    // L'index unique peut claquer en cas de double envoi simultané.
    if (err instanceof Error && /UNIQUE/i.test(err.message)) {
      return Response.json(
        { error: 'Une réponse existe déjà pour ce compte. Merci !' },
        { status: 409 }
      );
    }
    console.error('submit error', err);
    return Response.json({ error: "L'enregistrement a échoué." }, { status: 500 });
  }
};
