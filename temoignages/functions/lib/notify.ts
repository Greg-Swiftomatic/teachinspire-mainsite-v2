/**
 * Notification email à Greg quand une réponse arrive.
 *
 * L'envoi passe par le relais interne du worker Studio
 * (/api/internal/notify) : c'est lui qui détient la clé Resend et le domaine
 * expéditeur vérifié. Ce formulaire n'a donc aucune clé email en propre.
 * Best effort : un échec d'envoi ne doit jamais faire échouer l'enregistrement.
 */

import { attributionOf, consentSummary, label } from './labels';

interface NotifyEnv {
  TESTIMONIAL_GRANT_SECRET?: string;
  STUDIO_NOTIFY_URL?: string;
  NOTIFY_EMAIL?: string;
}

const DEFAULT_NOTIFY_URL = 'https://studio.teachinspire.me/api/internal/notify';

export interface NewResponse {
  id: number;
  fullName: string;
  credited: boolean;
  row: Record<string, unknown>;
}

const text = (v: unknown): string =>
  typeof v === 'string' && v.trim() ? v : 'non renseigné';

export async function notifyNewResponse(env: NotifyEnv, n: NewResponse): Promise<void> {
  const secret = env.TESTIMONIAL_GRANT_SECRET;
  if (!secret) return;
  const to = env.NOTIFY_EMAIL || 'greg@teachinspire.me';
  const r = n.row;
  const email = String(r.studio_email ?? '');
  const publishable = r.consent_publish === 1;

  const lines = [
    `${n.fullName} (${email}) vient de répondre au questionnaire.`,
    '',
    `Situation : ${label(r.role)}`,
    `Structure : ${text(r.institute)}${r.city ? `, ${r.city}` : ''}`,
    `Langues : ${text(r.languages)} · Secteurs des apprenants : ${text(r.learner_sectors)}`,
    `Crédits (30 min) : ${n.credited ? 'crédités automatiquement' : 'A CREDITER A LA MAIN'}`,
    '',
    `Au départ : ${label(r.initial_reaction)}${r.initial_reaction_other ? ` (${r.initial_reaction_other})` : ''}`,
    `Temps de préparation : ${label(r.prep_time_before)} → ${label(r.prep_time_now)}`,
    `Fréquence d'usage : ${label(r.usage_frequency)}`,
    `Recommandation : ${r.recommend_score ?? 'non renseignée'}/10`,
    '',
    'CE QUI A CHANGÉ',
    text(r.what_changed),
    '',
    'CE QU’IL OU ELLE A CRÉÉ',
    text(r.first_artifact),
    '',
    'RÉACTION D’UN APPRENANT',
    text(r.learner_feedback),
    '',
    'À UN COLLÈGUE OU UN DIRECTEUR QUI HÉSITE',
    text(r.to_a_skeptic),
    '',
    `À garder : ${text(r.keep_one)}`,
    '',
    'CE QUI MANQUE',
    text(r.what_was_missing),
    '',
    'RÉSEAU',
    `Instituts : ${text(r.institutes_worked_with)}`,
    `Mise en relation : ${label(r.intro_ok)}`,
    '',
    `Publication : ${consentSummary(r)}`,
    publishable ? `Signature : ${attributionOf(r)}` : '',
    `LinkedIn : ${text(r.linkedin_url)}`,
    `Vidéo : ${r.willing_video ? 'partant·e' : 'non'} · Post LinkedIn : ${r.willing_linkedin_post ? 'partant·e' : 'non'}`,
    '',
    'Suivi des réponses : https://temoignages.teachinspire.me/admin',
  ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));

  try {
    const res = await fetch(env.STUDIO_NOTIFY_URL || DEFAULT_NOTIFY_URL, {
      method: 'POST',
      headers: { 'X-Internal-Secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        replyTo: email,
        subject: `Témoignage reçu : ${n.fullName} (${r.institute})${publishable ? ' · publiable' : ''}`,
        text: lines.join('\n'),
      }),
    });
    if (!res.ok) {
      console.error('notify failed', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('notify error', err);
  }
}
