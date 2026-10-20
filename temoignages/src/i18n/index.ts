/**
 * Langue du formulaire. Elle vient de l'invitation (colonne invites.lang,
 * renvoyée par /api/login) ; avant la connexion, le lien d'invitation la
 * porte dans l'URL (?lang=en). Le français reste la langue par défaut.
 */

import { createContext, useContext } from 'react';
import { fr, type Copy } from './fr';
import { en } from './en';

export type Lang = 'fr' | 'en';

export const isLang = (v: unknown): v is Lang => v === 'fr' || v === 'en';

export const COPY: Record<Lang, Copy> = { fr, en };

export function langFromUrl(): Lang {
  const l = new URLSearchParams(window.location.search).get('lang');
  return isLang(l) ? l : 'fr';
}

export const CopyContext = createContext<Copy>(fr);

export const useCopy = (): Copy => useContext(CopyContext);

export type { Copy };
