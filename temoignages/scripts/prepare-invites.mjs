#!/usr/bin/env node
/**
 * Prépare les invitations d'un groupe de participants du Studio, puis écrit un
 * brouillon d'email personnel par personne.
 *
 *   TI_ADMIN_USER=greg TI_ADMIN_PASS=... \
 *     node scripts/prepare-invites.mjs "Kintail 2026-09 actifs" \
 *       --version mi-parcours --emails groupes/kintail-actifs.txt
 *
 *   TI_ADMIN_USER=greg TI_ADMIN_PASS=... \
 *     node scripts/prepare-invites.mjs "Arrimage 2026-04" \
 *       --lang en --emails groupes/arrimage-en.txt
 *
 * --version  mi-parcours (défaut) | fin-de-parcours : questionnaire et email présentés
 * --lang     fr (défaut) | en : langue du formulaire et du brouillon d'email
 * --emails   fichier texte, un email par ligne (lignes vides et # ignorées).
 *            Sans ce fichier, tous les participants du Studio sont préparés.
 *
 * Sortie : drafts-<groupe>.md, un email prêt à copier/coller par personne.
 * Greg envoie lui-même ce premier contact (meilleur taux de réponse qu'un
 * envoi de masse). Contient des données personnelles : gitignoré.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.TI_FORM_URL ?? 'https://temoignages.teachinspire.me';
const user = process.env.TI_ADMIN_USER;
const pass = process.env.TI_ADMIN_PASS;

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const cohort = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? '';
const version = flag('--version') ?? 'mi-parcours';
const lang = flag('--lang') ?? 'fr';
const emailsFile = flag('--emails');

if (!user || !pass) {
  console.error('Définir TI_ADMIN_USER et TI_ADMIN_PASS (identifiants de consultation).');
  process.exit(1);
}
if (!['mi-parcours', 'fin-de-parcours'].includes(version)) {
  console.error('--version doit valoir mi-parcours ou fin-de-parcours.');
  process.exit(1);
}
if (!['fr', 'en'].includes(lang)) {
  console.error('--lang doit valoir fr ou en.');
  process.exit(1);
}

const emails = emailsFile
  ? readFileSync(emailsFile, 'utf8')
      .split('\n')
      .map((l) => l.replace(/#.*/, '').trim())
      .filter(Boolean)
  : undefined;

const auth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');

const res = await fetch(`${BASE}/api/admin/prepare-invites`, {
  method: 'POST',
  headers: { Authorization: auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({ cohort, version, lang, emails }),
});

if (!res.ok) {
  console.error(`Échec (${res.status}) :`, await res.text().catch(() => ''));
  process.exit(1);
}

const data = await res.json();

// Une version déployée sans --lang ignore le champ et prépare des invitations
// en français : on s'arrête plutôt que d'écrire des brouillons dans la
// mauvaise langue.
if ((data.lang ?? 'fr') !== lang) {
  console.error(
    `Le serveur a préparé les invitations en « ${data.lang ?? 'fr'} » au lieu de « ${lang} » : ` +
      'la version déployée ne connaît pas encore --lang. Aucun brouillon écrit. ' +
      'Déployer la nouvelle version, puis corriger les invitations créées :\n' +
      `  UPDATE invites SET lang = '${lang}' WHERE cohort = '${cohort}';`
  );
  process.exit(1);
}
console.log(
  `Version : ${data.version} · langue : ${data.lang ?? 'fr'} · ${data.participants} participant(s) retenu(s) · ` +
    `${data.created} nouvelle(s) invitation(s) · déjà invités ${data.skipped.alreadyInvited} · ` +
    `déjà répondu ${data.skipped.alreadyResponded}`
);
if (data.notFound?.length) {
  console.log(`Sans compte participant actif au Studio (ne pourront pas répondre) : ${data.notFound.join(', ')}`);
}

if (!data.created) {
  console.log('Rien à envoyer : tout le monde est déjà invité ou a déjà répondu.');
  process.exit(0);
}

const slug = (cohort || 'invitations')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const blocks = data.drafts.map(
  (d) =>
    `## ${d.name} (${d.email})\n\n` +
    `**Objet :** ${d.subject}\n\n` +
    '```\n' +
    d.body +
    '\n```\n\n' +
    `Lien direct : ${d.link}`
);

const out =
  `# Invitations à envoyer${cohort ? ` : ${cohort}` : ''}\n\n` +
  `${data.created} email(s) personnel(s) à envoyer depuis la boîte de Greg ` +
  `(questionnaire ${data.version}, en ${data.lang === 'en' ? 'anglais' : 'français'}).\n\n` +
  '---\n\n' +
  blocks.join('\n\n---\n\n') +
  '\n';

const file = `drafts-${slug}.md`;
writeFileSync(file, out, 'utf8');
console.log(`${file} écrit : un email personnel par participant, prêt à envoyer.`);
