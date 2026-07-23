/**
 * Enregistre une réponse au questionnaire.
 *
 * Public : le formulaire doit pouvoir poster ici. Les protections sont donc
 * côté serveur (leurre, longueurs bornées, valeurs contrôlées) plutôt que
 * derrière une authentification.
 */

interface Env {
  DB: D1Database;
}

interface Payload {
  token?: string | null;
  website?: string; // leurre

  firstName?: string;
  lastName?: string;
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
  creditEmail?: string;
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
    const body = (await context.request.json()) as Payload;

    // Un robot remplit tous les champs, y compris celui que personne ne voit.
    // On répond 201 pour ne rien lui apprendre, sans rien écrire en base.
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return Response.json({ success: true }, { status: 201 });
    }

    const firstName = clean(body.firstName, 80);
    if (!firstName) {
      return Response.json({ error: 'Le prénom est requis.' }, { status: 400 });
    }

    const whatChanged = clean(body.whatChanged, 5000);
    if (!whatChanged) {
      return Response.json(
        { error: 'La question sur ce qui a changé est requise.' },
        { status: 400 }
      );
    }

    const token = clean(body.token, 64);
    const safeToken = token && /^[A-Za-z0-9_-]{6,64}$/.test(token) ? token : null;

    const consentPublish = bit(body.consentPublish);
    const scope = Array.isArray(body.consentScope)
      ? body.consentScope.filter((s) => SCOPES.includes(s))
      : [];
    // Sans autorisation de publier, aucune portée ne peut être retenue.
    const has = (s: string) => (consentPublish === 1 && scope.includes(s) ? 1 : 0);

    const linkedin =
      consentPublish === 1 && scope.includes('linkedin')
        ? isSafeLinkedIn(clean(body.linkedinUrl, 300))
        : null;

    const stmt = context.env.DB.prepare(`
      INSERT INTO responses (
        submitted_at, token,
        first_name, last_name, institute, languages, role,
        initial_reaction, initial_reaction_other, prep_time_before,
        prep_time_now, usage_frequency, what_changed, first_artifact,
        to_a_skeptic, what_was_missing,
        consent_publish, consent_first_name, consent_initial, consent_full_name,
        consent_institute, consent_role, consent_linkedin, consent_photo,
        consent_review_before_publish, willing_video, willing_linkedin_post,
        linkedin_url, credit_email, locale, user_agent
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `);

    const result = await stmt
      .bind(
        new Date().toISOString(),
        safeToken,
        firstName,
        clean(body.lastName, 80),
        clean(body.institute, 160),
        clean(body.languages, 160),
        oneOf(body.role, ROLES) ?? 'formateur',
        oneOf(body.initialReaction, REACTIONS),
        clean(body.initialReactionOther, 500),
        oneOf(body.prepTimeBefore, TIME_BEFORE),
        oneOf(body.prepTimeNow, TIME_NOW),
        oneOf(body.usageFrequency, FREQUENCY),
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
        clean(body.creditEmail, 200),
        clean(context.request.headers.get('accept-language'), 40),
        clean(context.request.headers.get('user-agent'), 300)
      )
      .run();

    if (!result.success) throw new Error('Insert failed');

    // Marque l'invitation comme honorée, pour ne relancer que les autres.
    if (safeToken) {
      await context.env.DB
        .prepare('UPDATE invites SET responded_at = ? WHERE token = ? AND responded_at IS NULL')
        .bind(new Date().toISOString(), safeToken)
        .run()
        .catch(() => undefined);
    }

    return Response.json({ success: true, id: result.meta.last_row_id }, { status: 201 });
  } catch (err) {
    console.error('submit error', err);
    return Response.json({ error: "L'enregistrement a échoué." }, { status: 500 });
  }
};
