/**
 * Prépare le premier envoi d'un cohorte, sans CSV.
 *
 * Source de vérité : la liste des participants du Studio (tier participant).
 * Pour chaque participant qui n'a pas encore été invité et n'a pas encore
 * répondu, on crée une ligne d'invitation avec un jeton personnel et on
 * renvoie un brouillon d'email prêt à envoyer.
 *
 * Volontairement « prepare-only » : ce endpoint N'ENVOIE PAS le premier email.
 * Pour une petite cohorte, un envoi personnel de Greg convertit bien mieux
 * qu'un envoi automatique. Les relances, elles, seront automatisées (cron).
 *
 * Protégé par functions/_middleware.ts (Basic Auth admin).
 */

interface Env {
  DB: D1Database;
  TESTIMONIAL_GRANT_SECRET?: string;
  STUDIO_PARTICIPANTS_URL?: string;
  FORM_BASE_URL?: string;
}

const DEFAULT_PARTICIPANTS_URL =
  'https://studio.teachinspire.me/api/internal/participants';
const DEFAULT_FORM_BASE = 'https://temoignages.teachinspire.me';

interface Participant {
  id: string;
  email: string;
  name: string;
}

function makeToken(): string {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const firstNameOf = (name: string): string =>
  (name || '').trim().split(/\s+/)[0] || '';

function draft(firstName: string, link: string): { subject: string; body: string } {
  const hi = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  return {
    subject: '7 minutes sur la formation + 30 min de crédits audio',
    body: [
      hi,
      '',
      "Vous venez de terminer la formation. J'aimerais savoir ce que ça a",
      'donné concrètement de votre côté : ce qui a changé dans votre',
      "préparation de cours, et ce qui n'a pas marché.",
      '',
      'Le questionnaire prend 7 minutes, la plupart des questions sont à cocher :',
      link,
      '',
      '30 minutes de crédits audio vous sont offertes sur votre compte Studio',
      'dès que vous répondez, quel que soit le contenu de vos réponses.',
      '',
      'Si vous avez été sceptique au départ, dites-le : c’est justement ce',
      "qui m'intéresse le plus.",
      '',
      'Merci,',
      'Grégory',
    ].join('\n'),
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const secret = context.env.TESTIMONIAL_GRANT_SECRET;
  if (!secret) {
    return Response.json({ error: 'Service non configuré.' }, { status: 503 });
  }

  const cohort =
    (await context.request
      .json()
      .then((b: unknown) => (b as { cohort?: string })?.cohort)
      .catch(() => undefined)) || '';

  // 1. Participants du Studio (source de vérité, pas de CSV).
  let participants: Participant[];
  try {
    const res = await fetch(context.env.STUDIO_PARTICIPANTS_URL || DEFAULT_PARTICIPANTS_URL, {
      headers: { 'X-Internal-Secret': secret },
    });
    if (!res.ok) {
      return Response.json(
        { error: `Studio a répondu ${res.status}.` },
        { status: 502 }
      );
    }
    const body = (await res.json()) as { participants?: Participant[] };
    participants = Array.isArray(body.participants) ? body.participants : [];
  } catch {
    return Response.json({ error: 'Studio injoignable.' }, { status: 502 });
  }

  // 2. Qui a déjà été invité, qui a déjà répondu.
  const [invited, responded] = await Promise.all([
    context.env.DB.prepare(
      'SELECT studio_user_id FROM invites WHERE studio_user_id IS NOT NULL'
    ).all<{ studio_user_id: string }>(),
    context.env.DB.prepare('SELECT studio_user_id FROM responses').all<{
      studio_user_id: string;
    }>(),
  ]);
  const invitedIds = new Set((invited.results ?? []).map((r) => r.studio_user_id));
  const respondedIds = new Set((responded.results ?? []).map((r) => r.studio_user_id));

  const base = (context.env.FORM_BASE_URL || DEFAULT_FORM_BASE).replace(/\/$/, '');
  const now = new Date().toISOString();

  const created: Array<{ name: string; email: string; link: string; subject: string; body: string }> = [];
  const inserts: D1PreparedStatement[] = [];

  for (const p of participants) {
    if (!p.id || !p.email) continue;
    if (invitedIds.has(p.id) || respondedIds.has(p.id)) continue;

    const token = makeToken();
    const firstName = firstNameOf(p.name);
    const link = `${base}/?t=${token}`;
    const { subject, body } = draft(firstName, link);

    inserts.push(
      context.env.DB.prepare(
        `INSERT INTO invites (token, studio_user_id, first_name, email, cohort, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(token, p.id, firstName || null, p.email, cohort || null, now)
    );
    created.push({ name: p.name, email: p.email, link, subject, body });
  }

  if (inserts.length) {
    await context.env.DB.batch(inserts);
  }

  return Response.json({
    cohort: cohort || null,
    participants: participants.length,
    created: created.length,
    skipped: {
      alreadyInvited: participants.filter((p) => invitedIds.has(p.id)).length,
      alreadyResponded: participants.filter((p) => respondedIds.has(p.id)).length,
    },
    drafts: created,
  });
};
