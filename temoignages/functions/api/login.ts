/**
 * Vérifie le compte Studio et ouvre une session courte pour le formulaire.
 *
 * Les identifiants sont transmis tels quels au point d'authentification
 * officiel du Studio (même opérateur, HTTPS) et ne sont ni journalisés ni
 * stockés ici. En retour, on émet notre propre jeton de session (2 h) qui
 * porte l'identité vérifiée ; /api/submit ne fait confiance qu'à ce jeton.
 */

import { versionFor } from '../lib/version';
import { isLang, langFor, say, type Lang } from '../lib/lang';
import { signSession } from '../lib/session';

interface Env {
  DB: D1Database;
  TI_SESSION_SECRET?: string;
  STUDIO_LOGIN_URL?: string;
  FORM_VERSION?: string;
}

const DEFAULT_STUDIO_LOGIN = 'https://studio.teachinspire.me/api/auth/login';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let email = '';
  let password = '';
  // Langue affichée avant connexion (celle du lien) : sert aux messages d'erreur.
  let lang: Lang = 'fr';
  try {
    const body = (await context.request.json()) as { email?: string; password?: string; lang?: string };
    email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';
    if (isLang(body.lang)) lang = body.lang;
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 });
  }
  const t = say(lang);

  const secret = context.env.TI_SESSION_SECRET;
  if (!secret) {
    // Refus explicite plutôt qu'un formulaire ouvert sans identité vérifiée.
    return Response.json(
      { error: t('Service non configuré.', 'This form isn’t available right now.') },
      { status: 503 }
    );
  }
  if (!email || !password) {
    return Response.json(
      { error: t('Email et mot de passe requis.', 'Please enter your email and password.') },
      { status: 400 }
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(context.env.STUDIO_LOGIN_URL || DEFAULT_STUDIO_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return Response.json(
      { error: t('Le Studio est injoignable. Réessayez.', 'We can’t reach the Studio right now. Please try again.') },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    // 401/403/429 côté Studio → message neutre, sans détailler la cause.
    const status = upstream.status === 429 ? 429 : 401;
    return Response.json(
      {
        error:
          status === 429
            ? t('Trop de tentatives. Patientez quelques minutes.', 'Too many attempts. Please wait a few minutes.')
            : t(
                'Identifiants incorrects. Utilisez votre compte studio.teachinspire.me.',
                'Incorrect email or password. Please use your studio.teachinspire.me account.'
              ),
      },
      { status }
    );
  }

  // Le Studio actuel renvoie user.name ; d'anciennes versions renvoyaient
  // user.firstName. On accepte les deux.
  let data: { user?: { id?: string; email?: string; firstName?: string; name?: string } };
  try {
    data = (await upstream.json()) as typeof data;
  } catch {
    return Response.json(
      { error: t('Réponse du Studio illisible.', 'The Studio sent an unexpected reply. Please try again.') },
      { status: 502 }
    );
  }

  const user = data.user;
  if (!user?.id || !user.email) {
    return Response.json(
      { error: t('Réponse du Studio incomplète.', 'The Studio sent an incomplete reply. Please try again.') },
      { status: 502 }
    );
  }

  // Une réponse par compte : on prévient dès la connexion, pas au moment
  // de l'envoi, pour ne pas faire remplir 5 étapes pour rien.
  const existing = await context.env.DB.prepare(
    'SELECT id FROM responses WHERE studio_user_id = ? LIMIT 1'
  )
    .bind(user.id)
    .first();

  const fullName = (user.name || user.firstName || '').trim().replace(/\s+/g, ' ').slice(0, 120);
  const firstName = fullName.split(' ')[0] || '';
  const session = await signSession(
    { sub: user.id, email: user.email, firstName, fullName },
    secret
  );

  return Response.json({
    session,
    firstName,
    fullName,
    formVersion: await versionFor(context.env.DB, user.id, context.env.FORM_VERSION),
    // Langue de l'invitation : elle prime sur celle du lien une fois connecté.
    lang: await langFor(context.env.DB, user.id),
    email: user.email,
    alreadySubmitted: Boolean(existing),
  });
};
