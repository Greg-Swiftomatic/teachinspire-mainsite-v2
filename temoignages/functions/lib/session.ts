/**
 * Session courte signée HS256, émise par /api/login après vérification du
 * compte Studio, exigée par /api/submit.
 *
 * On n'utilise pas le JWT du Studio directement : cela demanderait de partager
 * JWT_SECRET entre les deux projets. Émettre notre propre jeton avec notre
 * propre secret (TI_SESSION_SECRET) garde les deux applications découplées.
 */

export interface SessionClaims {
  sub: string;    // id utilisateur Studio
  email: string;
  firstName: string;
  iat: number;
  exp: number;
}

const enc = new TextEncoder();

const b64url = (bytes: Uint8Array): string =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

const b64urlJson = (obj: unknown): string => b64url(enc.encode(JSON.stringify(obj)));

const fromB64url = (s: string): Uint8Array => {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
};

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function signSession(
  claims: Omit<SessionClaims, 'iat' | 'exp'>,
  secret: string,
  ttlSeconds = 2 * 60 * 60
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionClaims = { ...claims, iat: now, exp: now + ttlSeconds };
  const head = b64urlJson({ alg: 'HS256', typ: 'JWT' });
  const body = b64urlJson(payload);
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(`${head}.${body}`));
  return `${head}.${body}.${b64url(new Uint8Array(sig))}`;
}

export async function verifySession(token: string, secret: string): Promise<SessionClaims | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [head, body, sig] = parts;
  try {
    const ok = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(secret),
      fromB64url(sig) as unknown as ArrayBuffer,
      enc.encode(`${head}.${body}`)
    );
    if (!ok) return null;
    const claims = JSON.parse(new TextDecoder().decode(fromB64url(body))) as SessionClaims;
    if (typeof claims.exp !== 'number' || claims.exp < Math.floor(Date.now() / 1000)) return null;
    if (!claims.sub || !claims.email) return null;
    return claims;
  } catch {
    return null;
  }
}

export function bearer(request: Request): string | null {
  const h = request.headers.get('Authorization');
  if (!h?.startsWith('Bearer ')) return null;
  return h.slice(7);
}
