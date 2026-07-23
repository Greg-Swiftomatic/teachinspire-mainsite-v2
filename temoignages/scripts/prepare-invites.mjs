#!/usr/bin/env node
/**
 * Prépare les invitations d'une cohorte à partir des participants du Studio,
 * puis écrit un brouillon d'email personnel par personne.
 *
 * Ne remplace pas le CSV : il n'y a plus de CSV. La liste vient du Studio.
 *
 *   TI_ADMIN_USER=greg TI_ADMIN_PASS=... \
 *     node scripts/prepare-invites.mjs "Cohorte 2026-09"
 *
 * Sortie : drafts.md — un email prêt à copier/coller par personne. Greg envoie
 * lui-même ce premier contact (meilleur taux de réponse qu'un envoi de masse) ;
 * les relances, elles, seront automatisées.
 */

import { writeFileSync } from 'node:fs';

const BASE = process.env.TI_FORM_URL ?? 'https://temoignages.teachinspire.me';
const user = process.env.TI_ADMIN_USER;
const pass = process.env.TI_ADMIN_PASS;
const cohort = process.argv[2] ?? '';

if (!user || !pass) {
  console.error('Définir TI_ADMIN_USER et TI_ADMIN_PASS (identifiants de consultation).');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');

const res = await fetch(`${BASE}/api/admin/prepare-invites`, {
  method: 'POST',
  headers: { Authorization: auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({ cohort }),
});

if (!res.ok) {
  console.error(`Échec (${res.status}) :`, await res.text().catch(() => ''));
  process.exit(1);
}

const data = await res.json();
console.log(
  `${data.participants} participant(s) au Studio · ${data.created} nouvelle(s) invitation(s) · ` +
    `déjà invités ${data.skipped.alreadyInvited} · déjà répondu ${data.skipped.alreadyResponded}`
);

if (!data.created) {
  console.log('Rien à envoyer : tout le monde est déjà invité ou a déjà répondu.');
  process.exit(0);
}

const blocks = data.drafts.map(
  (d) =>
    `## ${d.name} — ${d.email}\n\n` +
    `**Objet :** ${d.subject}\n\n` +
    '```\n' +
    d.body +
    '\n```\n\n' +
    `Lien direct : ${d.link}`
);

const out =
  `# Invitations à envoyer${cohort ? ` — ${cohort}` : ''}\n\n` +
  `${data.created} email(s) personnel(s) à envoyer depuis la boîte de Greg.\n` +
  `Les invitations sont déjà enregistrées ; les relances seront automatiques.\n\n` +
  '---\n\n' +
  blocks.join('\n\n---\n\n') +
  '\n';

writeFileSync('drafts.md', out, 'utf8');
console.log('drafts.md écrit : un email personnel par participant, prêt à envoyer.');
