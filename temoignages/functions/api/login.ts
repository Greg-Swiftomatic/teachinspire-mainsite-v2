/**
 * Vérifie le compte Studio et ouvre une session courte pour le formulaire.
 *
 * Les identifiants sont transmis tels quels au point d'authentification
 * officiel du Studio (même opérateur, HTTPS) et ne sont ni journalisés ni
 * stockés ici. En retour, on émet notre propre jeton de session (2 h) qui
 * porte l'identité vérifiée ; /api/submit ne fait confiance qu'à ce jeton.
 */

import { signSession } from '../lib/session';

interface Env {
  DB: D1Database;
  TI_SESSION_SECRET?: string;
  STUDIO_LOGIN_URL?: string;
}

const DEFAULT_STUDIO_LOGIN = 'https://studio.teachinspire.me/api/auth/login';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const secret = context.env.TI_SESSION_SECRET;
  if (!secret) {
    // Refus explicite plutôt qu'un formulaire ouvert sans identité vérifiée.
    return Response.json({ error: 'Service non configuré.' }, { status: 503 });
  }

  let email = '';
  let password = '';
  try {
    const body = (await context.request.json()) as { email?: string; password?: string };
    email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 });
  }
  if (!email || !password) {
    return Response.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(context.env.STUDIO_LOGIN_URL || DEFAULT_STUDIO_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return Response.json({ error: 'Le Studio est injoignable. Réessayez.' }, { status: 502 });
  }

  if (!upstream.ok) {
    // 401/403/429 côté Studio → message neutre, sans détailler la cause.
    const status = upstream.status === 429 ? 429 : 401;
    return Response.json(
      {
        error:
          status === 429
            ? 'Trop de tentatives. Patientez quelques minutes.'
            : 'Identifiants incorrects. Utilisez votre compte studio.teachinspire.me.',
      },
      { status }
    );
  }

  let data: { user?: { id?: string; email?: string; firstName?: string } };
  try {
    data = (await upstream.json()) as typeof data;
  } catch {
    return Response.json({ error: 'Réponse du Studio illisible.' }, { status: 502 });
  }

  const user = data.user;
  if (!user?.id || !user.email) {
    return Response.json({ error: 'Réponse du Studio incomplète.' }, { status: 502 });
  }

  // Une réponse par compte : on prévient dès la connexion, pas au moment
  // de l'envoi, pour ne pas faire remplir 5 étapes pour rien.
  const existing = await context.env.DB.prepare(
    'SELECT id FROM responses WHERE studio_user_id = ? LIMIT 1'
  )
    .bind(user.id)
    .first();

  const session = await signSession(
    { sub: user.id, email: user.email, firstName: user.firstName || '' },
    secret
  );

  return Response.json({
    session,
    firstName: user.firstName || '',
    email: user.email,
    alreadySubmitted: Boolean(existing),
  });
};
