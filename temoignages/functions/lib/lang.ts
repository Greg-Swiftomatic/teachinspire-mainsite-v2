/**
 * Langue du formulaire présentée à un participant : celle de son invitation
 * (colonne invites.lang, posée par prepare-invites --lang). Le français reste
 * la langue par défaut ; seuls les libellés changent, jamais les valeurs
 * stockées.
 */

export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: unknown): v is Lang =>
  typeof v === 'string' && (LANGS as readonly string[]).includes(v);

/** Langue de l'invitation, ou null sans invitation (ou avant la migration 0003). */
export async function langFor(db: D1Database, studioUserId: string): Promise<Lang | null> {
  const row = await db
    .prepare('SELECT lang FROM invites WHERE studio_user_id = ? LIMIT 1')
    .bind(studioUserId)
    .first<{ lang: string | null }>()
    .catch(() => null);
  return isLang(row?.lang) ? row.lang : null;
}

/** Message d'erreur montré au participant, dans la langue de son formulaire. */
export const say = (lang: Lang) => (fr: string, en: string): string => (lang === 'en' ? en : fr);
