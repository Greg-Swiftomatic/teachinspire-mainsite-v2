-- TeachInspire, collecte de témoignages
--
-- Deux tables :
--   invites   : la liste des personnes invitées, une ligne par lien envoyé.
--               Permet de savoir qui a répondu et de ne relancer que les autres.
--   responses : les réponses au formulaire.
--
-- Règle structurante : les réponses brutes ne sont JAMAIS écrasées. La version
-- éditée pour publication vit dans quote_edited, à côté de l'original. C'est ce
-- qui garantit la règle « on n'invente jamais un mot » et conserve la preuve de
-- consentement.

CREATE TABLE IF NOT EXISTS invites (
  token           TEXT PRIMARY KEY,
  studio_user_id  TEXT,                     -- lie l'invitation au compte Studio
  first_name      TEXT,
  last_name       TEXT,
  email           TEXT,
  institute       TEXT,
  role            TEXT,                     -- 'formateur' | 'direction'
  cohort          TEXT,
  created_at      TEXT NOT NULL,
  sent_at         TEXT,                     -- rempli quand le SYSTÈME envoie (relance)
  reminders_sent  INTEGER NOT NULL DEFAULT 0,
  responded_at    TEXT
);

CREATE INDEX IF NOT EXISTS idx_invites_responded ON invites(responded_at);
CREATE INDEX IF NOT EXISTS idx_invites_cohort    ON invites(cohort);
CREATE UNIQUE INDEX IF NOT EXISTS idx_invites_studio_user ON invites(studio_user_id);

CREATE TABLE IF NOT EXISTS responses (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at  TEXT NOT NULL,
  token         TEXT,                       -- nullable : une réponse sans invitation reste acceptée

  -- Identité vérifiée : issue du compte Studio (JWT), jamais des champs du
  -- formulaire. Un compte = une réponse (index unique ci-dessous).
  studio_user_id  TEXT NOT NULL,
  studio_email    TEXT NOT NULL,

  -- Qui
  first_name    TEXT NOT NULL,
  last_name     TEXT,
  institute     TEXT,
  languages     TEXT,
  role          TEXT NOT NULL DEFAULT 'formateur',

  -- Au départ
  initial_reaction        TEXT,             -- curieux | sceptique | reticent | inquiet | pas_le_temps | autre
  initial_reaction_other  TEXT,
  prep_time_before        TEXT,             -- moins_1h | 1_2h | 2_3h | plus_3h | aucune

  -- Aujourd'hui
  prep_time_now     TEXT,                   -- moins_30 | 30_60 | 1_2h | plus_2h | non_utilise
  usage_frequency   TEXT,                   -- hebdo | mensuel | rare | jamais

  -- Champs libres
  what_changed      TEXT,                   -- la question centrale
  first_artifact    TEXT,
  to_a_skeptic      TEXT,
  what_was_missing  TEXT,

  -- Consentement (0/1). consent_publish commande tout le reste.
  consent_publish               INTEGER NOT NULL DEFAULT 0,
  consent_first_name            INTEGER NOT NULL DEFAULT 0,
  consent_initial               INTEGER NOT NULL DEFAULT 0,
  consent_full_name             INTEGER NOT NULL DEFAULT 0,
  consent_institute             INTEGER NOT NULL DEFAULT 0,
  consent_role                  INTEGER NOT NULL DEFAULT 0,
  consent_linkedin              INTEGER NOT NULL DEFAULT 0,
  consent_photo                 INTEGER NOT NULL DEFAULT 0,
  consent_review_before_publish INTEGER NOT NULL DEFAULT 0,
  willing_video                 INTEGER NOT NULL DEFAULT 0,
  willing_linkedin_post         INTEGER NOT NULL DEFAULT 0,
  linkedin_url                  TEXT,

  -- Contrepartie
  credit_email      TEXT,
  credited_at       TEXT,

  -- Workflow de publication
  quote_edited        TEXT,
  quote_status        TEXT NOT NULL DEFAULT 'new',
                      -- new | drafted | awaiting_approval | approved | published | declined | withdrawn
  approval_evidence   TEXT,                 -- où se trouve l'accord écrit
  approved_at         TEXT,
  published_at        TEXT,
  admin_notes         TEXT,

  -- Traces techniques
  locale        TEXT,
  user_agent    TEXT
);

CREATE INDEX IF NOT EXISTS idx_responses_submitted ON responses(submitted_at);
CREATE INDEX IF NOT EXISTS idx_responses_consent   ON responses(consent_publish);
CREATE INDEX IF NOT EXISTS idx_responses_status    ON responses(quote_status);
CREATE INDEX IF NOT EXISTS idx_responses_token     ON responses(token);
CREATE UNIQUE INDEX IF NOT EXISTS idx_responses_one_per_user ON responses(studio_user_id);
