/** Lecture des réponses. Protégé par functions/_middleware.ts. */
interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const raw = parseInt(url.searchParams.get('limit') || '100', 10);
    const limit = Number.isFinite(raw) ? Math.min(Math.max(raw, 1), 500) : 100;
    const onlyConsented = url.searchParams.get('consented') === '1';

    const sql = onlyConsented
      ? 'SELECT * FROM responses WHERE consent_publish = 1 ORDER BY submitted_at DESC LIMIT ?'
      : 'SELECT * FROM responses ORDER BY submitted_at DESC LIMIT ?';

    const { results } = await context.env.DB.prepare(sql).bind(limit).all();

    return Response.json({ count: results?.length ?? 0, responses: results ?? [] });
  } catch (err) {
    console.error('responses error', err);
    return Response.json({ error: 'Lecture impossible.' }, { status: 500 });
  }
};
