-- Questionnaire à mi-parcours (octobre 2026)
--
-- Ajoute ce qui manquait pour une cohorte d'indépendants et pour la vente :
-- situation professionnelle, secteurs des apprenants, retour d'un apprenant,
-- « ce que vous garderiez », note de recommandation, instituts pour lesquels
-- la personne intervient, accord de mise en relation, et la façon exacte dont
-- elle souhaite être présentée.
--
-- Appliquer une seule fois :
--   npx wrangler d1 execute teachinspire-temoignages --remote --file=./migrations/0002_mi_parcours.sql

ALTER TABLE responses ADD COLUMN form_version           TEXT;     -- 'mi-parcours' | 'fin-de-parcours'
ALTER TABLE responses ADD COLUMN city                   TEXT;
ALTER TABLE responses ADD COLUMN learner_sectors        TEXT;
ALTER TABLE responses ADD COLUMN learner_feedback       TEXT;
ALTER TABLE responses ADD COLUMN keep_one               TEXT;
ALTER TABLE responses ADD COLUMN recommend_score        INTEGER;  -- 0 à 10
ALTER TABLE responses ADD COLUMN institutes_worked_with TEXT;
ALTER TABLE responses ADD COLUMN intro_ok               TEXT;     -- oui | peut_etre | non
ALTER TABLE responses ADD COLUMN display_name           TEXT;     -- nom tel qu'il doit apparaître
ALTER TABLE responses ADD COLUMN display_title          TEXT;     -- fonction telle qu'elle doit apparaître
ALTER TABLE responses ADD COLUMN consent_anonymous      INTEGER NOT NULL DEFAULT 0;
ALTER TABLE responses ADD COLUMN consent_city           INTEGER NOT NULL DEFAULT 0;

-- Chaque invitation porte la version du questionnaire à présenter : une
-- cohorte en cours reçoit « mi-parcours », une cohorte terminée « fin-de-parcours ».
ALTER TABLE invites ADD COLUMN form_version TEXT;
