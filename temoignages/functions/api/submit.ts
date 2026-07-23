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

interface Env {
  DB: D1Database;
  TI_SESSION_SECRET?: string;
  TESTIMONIAL_GRANT_SECRET?: string;
  STUDIO_GRANT_URL?: string;
  STUDIO_NOTIFY_URL?: string;
  NOTIFY_EMAIL?: string;
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

  institute?: string;
  languages?: string;
  role?: string;

  initialReaction?: string;
  initialReactionOther?: string;
  prepTimeBefore?: string;

  prepTimeNow?: string;
  usageFrequency?: string;
  whatChanged?: string;
  firstArtifact?: string;

  toASkeptic?: string;
  whatWasMissing?: string;

  consentPublish?: boolean;
  consentScope?: string[];
  linkedinUrl?: string;
  consentReviewBeforePublish?: boolean;
  willingVideo?: boolean;
  willingLinkedinPost?: boolean;
}

const REACTIONS = ['curieux', 'sceptique', 'reticent', 'inquiet', 'pas_le_temps', 'autre'];
const TIME_BEFORE = ['moins_1h', '1_2h', '2_3h', 'plus_3h', 'aucune'];
const TIME_NOW = ['moins_30', '30_60', '1_2h', 'plus_2h', 'non_utilise'];
const FREQUENCY = ['hebdo', 'mensuel', 'rare', 'jamais'];
const ROLES = ['formateur', 'direction'];
const SCOPES = ['first_name', 'initial', 'full_name', 'institute', 'role', 'linkedin', 'photo'];

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
};

const oneOf = (v: unknown, allowed: string[]): string | null =>
  typeof v === 'string' && allowed.includes(v) ? v : null;

const bit = (v: unknown): number => (v === true ? 1 : 0);

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

    const institute = clean(body.institute, 160);
    if (!institute) {
      return Response.json({ error: "L'institut est requis." }, { status: 400 });
    }

    const whatChanged = clean(body.whatChanged, 5000);
    if (!whatChanged || whatChanged.length < 30) {
      return Response.json(
        { error: 'La question sur ce qui a changé est requise (30 caractères minimum).' },
        { status: 400 }
      );
    }

    const initialReaction = oneOf(body.initialReaction, REACTIONS);
    const prepTimeBefore = oneOf(body.prepTimeBefore, TIME_BEFORE);
    const prepTimeNow = oneOf(body.prepTimeNow, TIME_NOW);
    const usageFrequency = oneOf(body.usageFrequency, FREQUENCY);
    if (!initialReaction || !prepTimeBefore || !prepTimeNow || !usageFrequency) {
      return Response.json(
        { error: 'Les questions à choix des étapes 2 et 3 sont requises.' },
        { status: 400 }
      );
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

    const consentPublish = bit(body.consentPublish);
    const scope = Array.isArray(body.consentScope)
      ? body.consentScope.filter((s) => SCOPES.includes(s))
      : [];
    const has = (s: string) => (consentPublish === 1 && scope.includes(s) ? 1 : 0);

    const linkedin =
      consentPublish === 1 && scope.includes('linkedin')
        ? isSafeLinkedIn(clean(body.linkedinUrl, 300))
        : null;
    // Cocher « lien LinkedIn » sans fournir de lien valide est incohérent :
    // on refuse plutôt que d'enregistrer un consentement sans objet.
    if (consentPublish === 1 && scope.includes('linkedin') && !linkedin) {
      return Response.json(
        { error: 'Le lien LinkedIn est requis, ou décochez cette option.' },
        { status: 400 }
      );
    }

    const stmt = context.env.DB.prepare(`
      INSERT INTO responses (
        submitted_at, token, studio_user_id, studio_email,
        first_name, last_name, institute, languages, role,
        initial_reaction, initial_reaction_other, prep_time_before,
        prep_time_now, usage_frequency, what_changed, first_artifact,
        to_a_skeptic, what_was_missing,
        consent_publish, consent_first_name, consent_initial, consent_full_name,
        consent_institute, consent_role, consent_linkedin, consent_photo,
        consent_review_before_publish, willing_video, willing_linkedin_post,
        linkedin_url, credit_email, locale, user_agent
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `);

    const result = await stmt
      .bind(
        new Date().toISOString(),
        safeToken,
        session.sub,
        session.email,
        session.firstName || session.email.split('@')[0],
        null,
        institute,
        clean(body.languages, 160),
        oneOf(body.role, ROLES) ?? 'formateur',
        initialReaction,
        clean(body.initialReactionOther, 500),
        prepTimeBefore,
        prepTimeNow,
        usageFrequency,
        whatChanged,
        clean(body.firstArtifact, 3000),
        clean(body.toASkeptic, 3000),
        clean(body.whatWasMissing, 3000),
        consentPublish,
        has('first_name'),
        has('initial'),
        has('full_name'),
        has('institute'),
        has('role'),
        has('linkedin'),
        has('photo'),
        bit(body.consentReviewBeforePublish),
        bit(body.willingVideo),
        bit(body.willingLinkedinPost),
        linkedin,
        session.email, // les crédits vont au compte connecté, pas à un email saisi
        clean(context.request.headers.get('accept-language'), 40),
        clean(context.request.headers.get('user-agent'), 300)
      )
      .run();

    if (!result.success) throw new Error('Insert failed');

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
    const credited = await grantCredits(context.env, Number(result.meta.last_row_id), session.sub);

    await notifyNewResponse(context.env, {
      id: Number(result.meta.last_row_id),
      firstName: session.firstName || session.email.split('@')[0],
      email: session.email,
      institute,
      languages: clean(body.languages, 160),
      initialReaction,
      prepTimeBefore,
      prepTimeNow,
      usageFrequency,
      whatChanged,
      firstArtifact: clean(body.firstArtifact, 3000),
      toASkeptic: clean(body.toASkeptic, 3000),
      whatWasMissing: clean(body.whatWasMissing, 3000),
      consentPublish: consentPublish === 1,
      consentScopes: scope,
      linkedinUrl: linkedin,
      willingVideo: body.willingVideo === true,
      willingLinkedinPost: body.willingLinkedinPost === true,
      credited,
    });

    return Response.json({ success: true, id: result.meta.last_row_id }, { status: 201 });
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
