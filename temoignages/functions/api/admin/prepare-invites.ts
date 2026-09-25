/**
 * Prépare le premier envoi d'un cohorte, sans CSV.
 *
 * Source de vérité : la liste des participants du Studio (tier participant).
 * Pour chaque participant qui n'a pas encore été invité et n'a pas encore
 * répondu, on crée une ligne d'invitation avec un jeton personnel et on
 * renvoie un brouillon d'email prêt à envoyer.
 *
 * Ciblage : `emails` limite la préparation à une liste choisie (une cohorte,
 * un groupe d'actifs), `version` fixe le questionnaire présenté
 * (« mi-parcours » ou « fin-de-parcours ») et le brouillon d'email associé.
 * Sans `emails`, tous les participants du Studio sont préparés.
 *
 * Volontairement « prepare-only » : ce endpoint N'ENVOIE PAS le premier email.
 * Pour une petite cohorte, un envoi personnel de Greg convertit bien mieux
 * qu'un envoi automatique. Les relances, elles, seront automatisées (cron).
 *
 * Protégé par functions/_middleware.ts (Basic Auth admin).
 */

import { isVersion, type FormVersion } from '../../lib/version';

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

function draft(
  firstName: string,
  link: string,
  version: FormVersion
): { subject: string; body: string } {
  const hi = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  const consent = [
    'À la fin, vous pourrez aussi, si vous le souhaitez, m’autoriser à citer',
    'un extrait de vos réponses. Vous choisissez ce qui apparaît (nom,',
    'structure, lien LinkedIn…) et je vous soumets le texte exact avant',
    'toute publication.',
  ];
  const credits = [
    'Vous vous connectez avec votre compte Studio, et 30 minutes de crédits',
    'audio y sont ajoutées dès l’envoi, quel que soit le contenu de vos réponses.',
  ];

  if (version === 'fin-de-parcours') {
    return {
      subject: 'Quelques mois après le parcours : votre retour (8 min)',
      body: [
        hi,
        '',
        'Cela fait maintenant quelques mois que vous avez suivi le parcours.',
        'J’aimerais savoir ce qu’il en reste au quotidien : ce que vous utilisez',
        'encore, ce qui a changé dans votre préparation de cours, et ce qui n’a',
        'pas tenu. Vos réponses servent directement aux prochaines sessions.',
        '',
        'Le questionnaire prend environ 8 minutes, la plupart des questions sont à cocher :',
        link,
        '',
        ...credits,
        '',
        ...consent,
        '',
        'Merci d’avance,',
        'Grégory',
      ].join('\n'),
    };
  }

  return {
    subject: 'Votre avis à mi-parcours (8 min, 30 min de crédits audio offertes)',
    body: [
      hi,
      '',
      'Nous voici à mi-parcours. Avant les derniers ateliers, j’aimerais savoir',
      'ce que la méthode a déjà changé de votre côté, ce qui vous aide, et ce',
      'qui vous manque encore. Je m’en servirai pour ajuster la fin du parcours.',
      '',
      'Le questionnaire prend environ 8 minutes, la plupart des questions sont à cocher :',
      link,
      '',
      ...credits,
      '',
      ...consent,
      '',
      'Merci d’avance,',
      'Grégory',
    ].join('\n'),
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const secret = context.env.TESTIMONIAL_GRANT_SECRET;
  if (!secret) {
    return Response.json({ error: 'Service non configuré.' }, { status: 503 });
  }

  const input = (await context.request.json().catch(() => ({}))) as {
    cohort?: string;
    emails?: unknown;
    version?: unknown;
  };
  const cohort = typeof input.cohort === 'string' ? input.cohort.trim().slice(0, 80) : '';
  const version: FormVersion = isVersion(input.version) ? input.version : 'mi-parcours';
  const wanted = Array.isArray(input.emails)
    ? new Set(
        input.emails
          .filter((e): e is string => typeof e === 'string')
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean)
      )
    : null;

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
    if (wanted) {
      participants = participants.filter((p) => wanted.has((p.email || '').toLowerCase()));
    }
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
    const { subject, body } = draft(firstName, link, version);

    inserts.push(
      context.env.DB.prepare(
        `INSERT INTO invites (token, studio_user_id, first_name, email, cohort, form_version, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(token, p.id, firstName || null, p.email, cohort || null, version, now)
    );
    created.push({ name: p.name, email: p.email, link, subject, body });
  }

  if (inserts.length) {
    await context.env.DB.batch(inserts);
  }

  return Response.json({
    cohort: cohort || null,
    version,
    participants: participants.length,
    // Emails demandés mais sans compte participant actif au Studio : ces
    // personnes ne pourront pas répondre tant qu'elles n'ont pas de compte.
    notFound: wanted
      ? [...wanted].filter((e) => !participants.some((p) => (p.email || '').toLowerCase() === e))
      : [],
    created: created.length,
    skipped: {
      alreadyInvited: participants.filter((p) => invitedIds.has(p.id)).length,
      alreadyResponded: participants.filter((p) => respondedIds.has(p.id)).length,
    },
    drafts: created,
  });
};
