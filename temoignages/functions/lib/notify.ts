/**
 * Notification email à Greg quand une réponse arrive.
 *
 * L'envoi passe par le relais interne du worker Studio
 * (/api/internal/notify) : c'est lui qui détient la clé Resend et le domaine
 * expéditeur vérifié. Ce formulaire n'a donc aucune clé email en propre.
 * Best effort : un échec d'envoi ne doit jamais faire échouer l'enregistrement.
 */

interface NotifyEnv {
  TESTIMONIAL_GRANT_SECRET?: string;
  STUDIO_NOTIFY_URL?: string;
  NOTIFY_EMAIL?: string;
}

const DEFAULT_NOTIFY_URL = 'https://studio.teachinspire.me/api/internal/notify';

export interface ResponseSummary {
  id: number;
  firstName: string;
  email: string;
  institute: string;
  languages: string | null;
  initialReaction: string | null;
  prepTimeBefore: string | null;
  prepTimeNow: string | null;
  usageFrequency: string | null;
  whatChanged: string;
  firstArtifact: string | null;
  toASkeptic: string | null;
  whatWasMissing: string | null;
  consentPublish: boolean;
  consentScopes: string[];
  linkedinUrl: string | null;
  willingVideo: boolean;
  willingLinkedinPost: boolean;
  credited: boolean;
}

const LABELS: Record<string, string> = {
  curieux: 'Curieux, plutôt partant',
  sceptique: 'Sceptique',
  reticent: 'Réticent',
  inquiet: 'Inquiet pour le métier',
  pas_le_temps: '« Encore une formation »',
  autre: 'Autre',
  moins_1h: "moins d'1h",
  '1_2h': '1 à 2h',
  '2_3h': '2 à 3h',
  plus_3h: 'plus de 3h',
  aucune: 'aucune préparation de ce type',
  moins_30: 'moins de 30 min',
  '30_60': '30 min à 1h',
  plus_2h: 'plus de 2h',
  non_utilise: "n'utilise pas la méthode",
  hebdo: 'chaque semaine',
  mensuel: 'quelques fois par mois',
  rare: 'rarement',
  jamais: 'plus du tout',
};

const label = (v: string | null): string => (v ? (LABELS[v] ?? v) : 'non renseigné');

export async function notifyNewResponse(env: NotifyEnv, r: ResponseSummary): Promise<void> {
  const secret = env.TESTIMONIAL_GRANT_SECRET;
  if (!secret) return;
  const to = env.NOTIFY_EMAIL || 'greg@teachinspire.me';

  const consent = r.consentPublish
    ? `OUI (${r.consentScopes.length ? r.consentScopes.join(', ') : 'aucune portée cochée'})`
    : 'non, usage interne uniquement';

  const lines = [
    `${r.firstName} (${r.email}) vient de répondre au questionnaire.`,
    '',
    `Institut : ${r.institute}`,
    `Langues : ${r.languages ?? 'non renseigné'}`,
    `Crédits (30 min) : ${r.credited ? 'crédités automatiquement' : 'A CREDITER A LA MAIN'}`,
    '',
    `Réaction au départ : ${label(r.initialReaction)}`,
    `Temps de préparation : ${label(r.prepTimeBefore)} → ${label(r.prepTimeNow)}`,
    `Fréquence d'usage : ${label(r.usageFrequency)}`,
    '',
    'CE QUI A CHANGÉ',
    r.whatChanged,
    '',
    'PREMIER SUPPORT CRÉÉ',
    r.firstArtifact ?? 'non renseigné',
    '',
    'À UN COLLÈGUE SCEPTIQUE',
    r.toASkeptic ?? 'non renseigné',
    '',
    'À AMÉLIORER',
    r.whatWasMissing ?? 'non renseigné',
    '',
    `Publication : ${consent}`,
    `LinkedIn : ${r.linkedinUrl ?? 'non fourni'}`,
    `Vidéo 2 min : ${r.willingVideo ? 'partant' : 'non'} · Post LinkedIn : ${r.willingLinkedinPost ? 'partant' : 'non'}`,
    '',
    'Toutes les réponses : https://temoignages.teachinspire.me/api/responses',
    'Export CSV : https://temoignages.teachinspire.me/api/export',
  ];

  try {
    const res = await fetch(env.STUDIO_NOTIFY_URL || DEFAULT_NOTIFY_URL, {
      method: 'POST',
      headers: { 'X-Internal-Secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        replyTo: r.email,
        subject: `Témoignage reçu : ${r.firstName} (${r.institute})${r.consentPublish ? ' · publiable' : ''}`,
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
