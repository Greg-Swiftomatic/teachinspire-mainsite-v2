interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');

    const { results } = await context.env.DB
      .prepare('SELECT * FROM responses ORDER BY submitted_at DESC LIMIT ?')
      .bind(limit)
      .all();

    return Response.json({ 
      count: results?.length || 0,
      responses: results || [] 
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
};
