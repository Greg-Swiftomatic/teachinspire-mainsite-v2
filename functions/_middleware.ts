function unauthorized(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="TeachInspire Admin", charset="UTF-8"',
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

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Less-guessable prefix. Keep it long and not publicly linked.
  const protectedPrefix = '/__ti/8b7f2c4a9d13';
  if (!url.pathname.startsWith(protectedPrefix)) return context.next();

  const isApi = url.pathname.startsWith(`${protectedPrefix}/api/`) || url.pathname === `${protectedPrefix}/api`;

  const expectedUser = (context.env.TI_ADMIN_BASIC_USER as string | undefined) ?? '';
  const expectedPass = (context.env.TI_ADMIN_BASIC_PASS as string | undefined) ?? '';
  const apiKey = (context.env.TI_GROWTH_API_KEY as string | undefined) ?? '';
  if (!expectedUser || !expectedPass) {
    // fail closed if not configured; for API allow key-only if configured
    if (!isApi || !apiKey) return notFound();
  }

  // API can authenticate via X-API-Key, so bots don't need to share the Basic Auth password.
  const apiHeader = context.request.headers.get('X-API-Key');
  const okApiKey = isApi && apiKey && apiHeader && timingSafeEqual(apiHeader, apiKey);

  // UI pages (and API calls without key) require Basic Auth.
  let okBasic = false;
  if (expectedUser && expectedPass) {
    const creds = parseBasicAuth(context.request.headers.get('Authorization'));
    if (creds) {
      const okUser = timingSafeEqual(creds.user, expectedUser);
      const okPass = timingSafeEqual(creds.pass, expectedPass);
      okBasic = okUser && okPass;
    }
  }

  if (!okApiKey && !okBasic) return unauthorized();

  const res = await context.next();

  // Defense-in-depth for admin-only responses.
  const headers = new Headers(res.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
};
