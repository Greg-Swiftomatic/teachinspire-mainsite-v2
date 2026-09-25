/** Export CSV. Protégé par functions/_middleware.ts. */
interface Env {
  DB: D1Database;
}

const escapeCSV = (value: unknown): string => {
  const str = String(value ?? '');
  // Neutralise l'injection de formule dans Excel / Sheets.
  const guarded = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return /[",\n\r]/.test(guarded) ? `"${guarded.replace(/"/g, '""')}"` : guarded;
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT * FROM responses ORDER BY submitted_at DESC')
      .all();

    if (!results || results.length === 0) {
      return new Response('Aucune réponse.', { status: 404 });
    }

    const headers = Object.keys(results[0] as Record<string, unknown>);
    const rows = [
      headers.join(','),
      ...results.map((row) =>
        headers.map((h) => escapeCSV((row as Record<string, unknown>)[h])).join(',')
      ),
    ];

    const filename = `temoignages-${new Date().toISOString().slice(0, 10)}.csv`;
    return new Response('﻿' + rows.join('\r\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('export error', err);
    return Response.json({ error: 'Export impossible.' }, { status: 500 });
  }
};
