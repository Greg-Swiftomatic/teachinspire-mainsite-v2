-- Formulaire en anglais (octobre 2026)
--
-- Chaque invitation porte la langue du formulaire et de l'email, comme elle
-- porte déjà sa version : « fr » par défaut, « en » pour un groupe anglophone
-- (prepare-invites --lang en). La réponse garde la langue dans laquelle elle a
-- été écrite, pour savoir qu'une citation est en anglais. Les valeurs des
-- choix ne changent pas : les réponses restent comparables d'une langue à
-- l'autre.
--
-- Appliquer une seule fois, AVANT de déployer la version qui l'utilise :
--   npx wrangler d1 execute teachinspire-temoignages --remote --file=./migrations/0003_lang.sql

ALTER TABLE invites   ADD COLUMN lang TEXT NOT NULL DEFAULT 'fr';  -- 'fr' | 'en'
ALTER TABLE responses ADD COLUMN lang TEXT NOT NULL DEFAULT 'fr';  -- 'fr' | 'en'
