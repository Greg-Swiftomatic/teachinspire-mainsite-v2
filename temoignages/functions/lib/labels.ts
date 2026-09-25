/**
 * Libellés lisibles des réponses à choix, partagés par l'email de
 * notification et la page de suivi. Les valeurs stockées restent courtes et
 * stables ; seuls ces libellés changent si les questions sont reformulées.
 */

export const LABELS: Record<string, string> = {
  // Situation
  direction: 'Dirige une structure',
  independant: 'Formateur·rice indépendant·e',
  salarie: 'Formateur·rice en institut',
  formateur: 'Formateur·rice',
  // Réaction au départ
  curieux: 'Curieux·se',
  sceptique: 'Sceptique',
  reticent: 'Réticent·e',
  inquiet: 'Inquiet·e pour le métier',
  pas_le_temps: 'Craignait de manquer de temps',
  autre: 'Autre',
  // Temps de préparation
  moins_1h: "moins d'1 h",
  '1_2h': '1 à 2 h',
  '2_3h': '2 à 3 h',
  plus_3h: 'plus de 3 h',
  aucune: 'ne préparait pas de sur-mesure',
  moins_30: 'moins de 30 min',
  '30_60': '30 min à 1 h',
  plus_2h: 'plus de 2 h',
  non_utilise: 'pas encore utilisé',
  // Fréquence
  hebdo: 'chaque semaine',
  mensuel: 'quelques fois par mois',
  rare: 'rarement',
  jamais: 'pas encore',
  // Mise en relation
  oui: 'oui',
  peut_etre: 'peut-être',
  non: 'non',
};

export const label = (v: unknown): string =>
  typeof v === 'string' && v ? (LABELS[v] ?? v) : 'non renseigné';

type Row = Record<string, unknown>;

/** Ce que la personne a autorisé, en une ligne. */
export function consentSummary(r: Row): string {
  if (!r.consent_publish) return 'Non : usage interne uniquement';
  const name = r.consent_full_name ? `nom complet (${r.display_name ?? ''})`
    : r.consent_initial ? 'prénom + initiale'
    : r.consent_first_name ? 'prénom seul'
    : 'sans nom';
  const extras = [
    r.consent_role ? `fonction (${r.display_title ?? ''})` : '',
    r.consent_institute ? 'structure' : '',
    r.consent_city ? 'ville' : '',
    r.consent_linkedin ? 'LinkedIn' : '',
    r.consent_photo ? 'photo' : '',
  ].filter(Boolean);
  return `Oui : ${[name, ...extras].join(', ')}`;
}

/** La signature telle qu'elle apparaîtrait sous une citation. */
export function attributionOf(r: Row): string {
  if (!r.consent_publish) return '';
  const first = String(r.first_name ?? '');
  const last = String(r.last_name ?? '');
  const title = r.consent_role ? String(r.display_title ?? '') : '';
  const institute = String(r.institute ?? '');
  const name = r.consent_full_name ? String(r.display_name ?? `${first} ${last}`.trim())
    : r.consent_initial ? `${first}${last ? ` ${last[0].toUpperCase()}.` : ''}`
    : r.consent_first_name ? first
    : '';
  const parts = [
    name,
    title,
    r.consent_institute && institute && !title.includes(institute) ? institute : '',
    r.consent_city ? String(r.city ?? '') : '',
  ].filter(Boolean);
  return parts.join(', ') || 'Participant·e au parcours';
}
