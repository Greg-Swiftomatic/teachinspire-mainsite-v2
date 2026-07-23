# teachinspire-temoignages

Formulaire de recueil de témoignages de fin de formation. Cloudflare Pages +
D1, sur son propre sous-domaine. Les questions viennent de
`docs/testimonial-collection-kit.md`.

- Formulaire en 5 étapes, environ 7 minutes, brouillon sauvegardé en local
- **Réservé aux participants** : connexion obligatoire avec le compte
  studio.teachinspire.me ; identité et email viennent du compte, une seule
  réponse par compte, crédits attachés au compte connecté
- Lien personnel par participant, pour savoir qui a répondu
- Consentement de publication à granularité fine
- Endpoints de lecture protégés par mot de passe

## Mise en service

```bash
cd temoignages
npm install

# 1. Créer la base, puis coller l'id renvoyé dans wrangler.toml
npm run db:create

# 2. Créer les tables
npm run db:init

# 3. Déployer
npm run pages:deploy
```

### 4. Protéger les endpoints de lecture

Dans le dashboard Cloudflare, projet `teachinspire-temoignages`, section
Settings > Environment variables, ajouter :

| Variable | Rôle |
|---|---|
| `TI_ADMIN_BASIC_USER` | identifiant de consultation |
| `TI_ADMIN_BASIC_PASS` | mot de passe de consultation |
| `TI_TEMOIGNAGES_API_KEY` | facultatif, pour un export scripté |
| `TI_SESSION_SECRET` | signe les sessions ouvertes après connexion Studio (obligatoire : sans lui, /api/login et /api/submit répondent 503) |
| `STUDIO_LOGIN_URL` | facultatif, remplace https://studio.teachinspire.me/api/auth/login (utile en test) |
| `TESTIMONIAL_GRANT_SECRET` | secret partagé avec le worker Studio pour créditer automatiquement les 30 minutes |
| `STUDIO_GRANT_URL` | facultatif, remplace https://studio.teachinspire.me/api/internal/testimonial-grant |
| `STUDIO_NOTIFY_URL` | facultatif, remplace https://studio.teachinspire.me/api/internal/notify |
| `NOTIFY_EMAIL` | facultatif, destinataire des notifications (défaut greg@teachinspire.me) |

Tant que ces variables ne sont pas définies, `/api/responses` et `/api/export`
répondent 404. C'est volontaire : une instance non configurée ne doit jamais
exposer de données personnelles. Le formulaire, lui, fonctionne sans elles.

### 5. Sous-domaine

Custom domains > `temoignages.teachinspire.me`. Cloudflare crée le CNAME.

## Envoyer les invitations

La liste vient du Studio (participants actifs), pas d'un CSV. Une seule
commande prépare les jetons, enregistre les invitations et écrit un brouillon
d'email personnel par personne :

```bash
TI_ADMIN_USER=greg TI_ADMIN_PASS=... \
  npm run invite -- "Cohorte 2026-09"
```

Cela appelle `POST /api/admin/prepare-invites` (protégé Basic Auth), qui
interroge `GET /api/internal/participants` du Studio, ignore les personnes
déjà invitées ou ayant déjà répondu, crée les invitations manquantes, puis
renvoie les brouillons. Le script écrit `drafts.md` : un email prêt à
copier/coller par participant.

**Prepare-only, par choix.** Le premier contact n'est PAS envoyé
automatiquement : pour une petite cohorte, un envoi personnel de Greg
convertit bien mieux. Les invitations sont enregistrées (jeton + suivi) ;
les relances aux non-répondants seront, elles, automatisées (cron, à venir).

`drafts.md` contient des données personnelles : il est gitignoré.

L'ancien flux CSV (`scripts/generate-tokens.mjs`) reste disponible pour un
envoi hors Studio, mais n'est plus la voie principale.

Le jeton n'est pas un mot de passe : il sert à savoir qui a répondu. Une
réponse sans jeton reste acceptée, pour qu'un lien transféré fonctionne quand
même.

## Consulter les réponses

```bash
# JSON
curl -u "$USER:$PASS" https://temoignages.teachinspire.me/api/responses

# uniquement les personnes ayant autorisé la publication
curl -u "$USER:$PASS" "https://temoignages.teachinspire.me/api/responses?consented=1"

# CSV
curl -u "$USER:$PASS" -O https://temoignages.teachinspire.me/api/export
```

Qui relancer :

```sql
SELECT first_name, last_name, email FROM invites WHERE responded_at IS NULL;
```

## Développement local

```bash
npm run build
npx wrangler pages dev dist --d1=DB=teachinspire-temoignages --persist-to=.wrangler/state
```

Attention : `wrangler d1 execute --local` et `wrangler pages dev` ne visent pas
toujours le même fichier SQLite. Si l'insertion échoue avec « no such table »,
appliquer le schéma directement au fichier utilisé par le serveur :

```bash
sqlite3 .wrangler/state/v3/d1/miniflare-D1DatabaseObject/<hash>.sqlite < schema.sql
```

## Authentification

`/api/login` transmet les identifiants au point d'authentification officiel du
Studio (ils ne sont ni journalisés ni stockés ici), puis émet une session
propre au formulaire (HS256, 2 h, `TI_SESSION_SECRET`). `/api/submit` n'accepte
que cette session : l'identité enregistrée (id, email, prénom) vient du jeton,
jamais des champs du formulaire, et l'index unique `idx_responses_one_per_user`
garantit une réponse par compte. À la connexion, un compte ayant déjà répondu
est prévenu immédiatement plutôt qu'au moment de l'envoi.

## Ce qui reste à faire

- **Interface d'administration.** Aujourd'hui la lecture passe par l'API et le
  CSV. Une page protégée permettrait de suivre le cycle
  `new → drafted → awaiting_approval → approved → published`.
- **Envoi automatique des emails.** Volontairement absent : pour 15 à 25
  personnes, un envoi personnel depuis la boîte de Grégory obtient un bien
  meilleur taux de réponse. À reconsidérer à la troisième cohorte.
- **Attribution des crédits : automatisée.** Après l'enregistrement, le
  formulaire appelle `POST /api/internal/testimonial-grant` du worker Studio
  (dépôt `~/Documents/GitHub/teach/promptomatik`, secret partagé
  `TESTIMONIAL_GRANT_SECRET`) qui ajoute 1800 s via `grantAudioCredits`
  (balance + ledger). Best effort : si l'appel échoue, la réponse est
  conservée et `credited_at` reste NULL — la liste des crédits à faire à la
  main est `SELECT studio_email FROM responses WHERE credited_at IS NULL`.
  L'unicité est garantie en amont (une réponse par compte).

## Notification par email

Chaque réponse déclenche un email récapitulatif à greg@teachinspire.me
(réponses complètes, consentement, état du crédit, reply-to sur l'email du
participant). L'envoi passe par le relais `/api/internal/notify` du worker
Studio, qui détient la clé Resend et le domaine expéditeur vérifié
(noreply@promptomatik.com) ; ce projet n'a aucune clé email en propre. Le
relais n'accepte que des destinataires TeachInspire. Best effort : un envoi
raté ne bloque jamais l'enregistrement.

## Notes de conception

Les réponses brutes ne sont jamais écrasées : la version éditée pour
publication vit dans `quote_edited`, à côté de l'original. C'est ce qui rend
vérifiable la règle « on n'invente jamais un mot » et conserve la preuve du
consentement.

Sans `consent_publish`, toutes les portées de consentement sont forcées à 0
côté serveur, et l'URL LinkedIn est ignorée même si elle a été transmise. Le
client ne décide pas de ce qui est publiable.
