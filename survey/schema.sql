DROP TABLE IF EXISTS responses;

CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at TEXT NOT NULL,
  name TEXT NOT NULL,
  teaching_situation TEXT NOT NULL,
  institute_name TEXT,
  teaching_format TEXT NOT NULL,
  student_types TEXT NOT NULL,
  ai_experience TEXT NOT NULL,
  ai_uses TEXT NOT NULL,
  material_sources TEXT NOT NULL,
  prep_frustration TEXT NOT NULL,
  course_expectations TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submitted_at ON responses(submitted_at);
