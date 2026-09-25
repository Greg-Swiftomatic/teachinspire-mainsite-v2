#!/usr/bin/env node
/**
 * Génère un lien personnel par participant.
 *
 * Entrée : un CSV « prenom,nom,email,institut,role,cohorte » (en-tête requis).
 * Sortie : - un CSV prêt pour un publipostage, avec le lien de chaque personne
 *          - un fichier SQL à exécuter sur D1 pour enregistrer les invitations
 *
 *   node scripts/generate-tokens.mjs participants.csv "Cohorte 2026-09"
 *   npx wrangler d1 execute teachinspire-temoignages --remote --file=./invites.sql
 *
 * Le lien permet de savoir qui a répondu, et donc de ne relancer que les
 * autres. Il n'est pas un mot de passe : le formulaire accepte aussi une
 * réponse sans jeton.
 */

import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const BASE_URL = process.env.TI_FORM_URL ?? 'https://temoignages.teachinspire.me';

const [, , csvPath, cohortArg] = process.argv;
if (!csvPath) {
  console.error('Usage: node scripts/generate-tokens.mjs <participants.csv> [cohorte]');
  process.exit(1);
}

const cohort = cohortArg ?? '';
const token = () => randomBytes(9).toString('base64url'); // 12 caractères URL-safe
const sqlStr = (v) => (v ? `'${String(v).replace(/'/g, "''")}'` : 'NULL');

// Découpage CSV tolérant aux guillemets et aux virgules dans les champs.
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

const rows = parseCSV(readFileSync(csvPath, 'utf8'));
if (rows.length < 2) {
  console.error('CSV vide ou sans ligne de données.');
  process.exit(1);
}

const header = rows[0].map((h) => h.trim().toLowerCase());
const col = (names) => {
  for (const n of names) {
    const i = header.indexOf(n);
    if (i !== -1) return i;
  }
  return -1;
};

const iFirst = col(['prenom', 'prénom', 'first_name', 'firstname']);
const iLast = col(['nom', 'last_name', 'lastname']);
const iMail = col(['email', 'mail', 'e-mail']);
const iInst = col(['institut', 'institute', 'organisme']);
const iRole = col(['role', 'rôle', 'fonction']);

if (iFirst === -1) {
  console.error(`Colonne « prenom » introuvable. En-têtes lus : ${header.join(', ')}`);
  process.exit(1);
}

const now = new Date().toISOString();
const out = [['prenom', 'nom', 'email', 'institut', 'role', 'lien'].join(',')];
const sql = ['-- Invitations générées le ' + now];
const seen = new Set();

for (const r of rows.slice(1)) {
  const first = (r[iFirst] ?? '').trim();
  if (!first) continue;

  let t = token();
  while (seen.has(t)) t = token();
  seen.add(t);

  const last = iLast === -1 ? '' : (r[iLast] ?? '').trim();
  const mail = iMail === -1 ? '' : (r[iMail] ?? '').trim();
  const inst = iInst === -1 ? '' : (r[iInst] ?? '').trim();
  const role = iRole === -1 ? 'formateur' : ((r[iRole] ?? '').trim() || 'formateur');

  const link = `${BASE_URL}/?t=${t}`;
  const csvCell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  out.push([first, last, mail, inst, role, link].map(csvCell).join(','));

  sql.push(
    `INSERT INTO invites (token, first_name, last_name, email, institute, role, cohort, created_at) ` +
      `VALUES ('${t}', ${sqlStr(first)}, ${sqlStr(last)}, ${sqlStr(mail)}, ${sqlStr(inst)}, ` +
      `${sqlStr(role)}, ${sqlStr(cohort)}, '${now}');`
  );
}

writeFileSync('invites.csv', out.join('\n') + '\n', 'utf8');
writeFileSync('invites.sql', sql.join('\n') + '\n', 'utf8');

console.log(`${out.length - 1} invitation(s) générée(s).`);
console.log('  invites.csv  : à utiliser pour le publipostage');
console.log('  invites.sql  : npx wrangler d1 execute teachinspire-temoignages --remote --file=./invites.sql');
