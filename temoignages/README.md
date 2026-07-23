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

Tant que ces variables ne sont pas définies, `/api/responses` et `/api/export`
répondent 404. C'est volontaire : une instance non configurée ne doit jamais
exposer de données personnelles. Le formulaire, lui, fonctionne sans elles.

### 5. Sous-domaine

Custom domains > `temoignages.teachinspire.me`. Cloudflare crée le CNAME.

## Envoyer les invitations

```bash
# participants.csv : prenom,nom,email,institut,role
node scripts/generate-tokens.mjs participants.csv "Cohorte 2026-09"
npx wrangler d1 execute teachinspire-temoignages --remote --file=./invites.sql
```

Produit `invites.csv` avec un lien par personne, prêt pour un publipostage.
Le texte de l'email est dans `docs/testimonial-collection-kit.md`.

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
- **Attribution des crédits.** `credited_at` existe en base mais n'est pas
  encore alimenté ; l'attribution est manuelle. Aucun système de crédits audio
  n'existe dans les dépôts locaux (Promptomatik ne gère que les prompts) :
  l'automatisation attendra que ce système existe quelque part.

## Notes de conception

Les réponses brutes ne sont jamais écrasées : la version éditée pour
publication vit dans `quote_edited`, à côté de l'original. C'est ce qui rend
vérifiable la règle « on n'invente jamais un mot » et conserve la preuve du
consentement.

Sans `consent_publish`, toutes les portées de consentement sont forcées à 0
côté serveur, et l'URL LinkedIn est ignorée même si elle a été transmise. Le
client ne décide pas de ce qui est publiable.
