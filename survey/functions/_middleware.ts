/**
 * Protects the read endpoints of the survey app.
 *
 * /api/submit stays public: the form has to be able to post to it.
 * /api/responses and /api/export return every respondent's name, institute and
 * free-text answers, so they require credentials.
 *
 * Same pattern as the main site's functions/_middleware.ts: Basic Auth for a
 * browser, X-API-Key for scripts, timing-safe comparison, fail closed.
 *
 * Required Pages environment variables (Settings > Environment variables):
 *   TI_ADMIN_BASIC_USER
 *   TI_ADMIN_BASIC_PASS
 *   TI_SURVEY_API_KEY   (optional, for scripted export)
 *
 * If none are set the protected routes return 404 rather than opening up.
 */

interface Env {
  TI_ADMIN_BASIC_USER?: string;
  TI_ADMIN_BASIC_PASS?: string;
  TI_SURVEY_API_KEY?: string;
}

const PROTECTED = ['/api/responses', '/api/export'];

function unauthorized(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="TeachInspire Survey", charset="UTF-8"',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

function notFound(): Response {
  return new Response('Not found', {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function parseBasicAuth(authHeader: string | null): { user: string; pass: string } | null {
  if (!authHeader) return null;
  const [scheme, encoded] = authHeader.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'basic' || !encoded) return null;

  let decoded = '';
  try {
    decoded = atob(encoded);
  } catch {
    return null;
  }

  const idx = decoded.indexOf(':');
  if (idx < 0) return null;
  return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  const isProtected = PROTECTED.some(
    (p) => url.pathname === p || url.pathname.startsWith(`${p}/`)
  );
  if (!isProtected) return context.next();

  const expectedUser = context.env.TI_ADMIN_BASIC_USER ?? '';
  const expectedPass = context.env.TI_ADMIN_BASIC_PASS ?? '';
  const apiKey = context.env.TI_SURVEY_API_KEY ?? '';

  // Fail closed: an unconfigured deployment must not serve personal data.
  if (!expectedUser || !expectedPass) {
    if (!apiKey) return notFound();
  }

  const apiHeader = context.request.headers.get('X-API-Key');
  const okApiKey = Boolean(apiKey && apiHeader && timingSafeEqual(apiHeader, apiKey));

  let okBasic = false;
  if (expectedUser && expectedPass) {
    const creds = parseBasicAuth(context.request.headers.get('Authorization'));
    if (creds) {
      okBasic =
        timingSafeEqual(creds.user, expectedUser) &&
        timingSafeEqual(creds.pass, expectedPass);
    }
  }

  if (!okApiKey && !okBasic) return unauthorized();

  const res = await context.next();

  const headers = new Headers(res.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
};
