/**
 * Version du questionnaire présentée à un participant : celle de son
 * invitation si elle existe, sinon la valeur par défaut du déploiement.
 */

export const VERSIONS = ['mi-parcours', 'fin-de-parcours'] as const;
export type FormVersion = (typeof VERSIONS)[number];

export const isVersion = (v: unknown): v is FormVersion =>
  typeof v === 'string' && (VERSIONS as readonly string[]).includes(v);

export async function versionFor(
  db: D1Database,
  studioUserId: string,
  fallback: string | undefined
): Promise<FormVersion> {
  const row = await db
    .prepare('SELECT form_version FROM invites WHERE studio_user_id = ? LIMIT 1')
    .bind(studioUserId)
    .first<{ form_version: string | null }>()
    .catch(() => null);
  if (isVersion(row?.form_version)) return row.form_version;
  return isVersion(fallback) ? fallback : 'mi-parcours';
}
