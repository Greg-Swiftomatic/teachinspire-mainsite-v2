interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB
      .prepare('SELECT * FROM responses ORDER BY submitted_at DESC')
      .all();

    if (!results || results.length === 0) {
      return new Response('No responses found', { status: 404 });
    }

    const headers = [
      'id',
      'submitted_at',
      'name',
      'teaching_situation',
      'institute_name',
      'teaching_format',
      'student_types',
      'ai_experience',
      'ai_uses',
      'material_sources',
      'prep_frustration',
      'course_expectations'
    ];

    const escapeCSV = (value: unknown): string => {
      const str = String(value ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvRows = [
      headers.join(','),
      ...results.map(row =>
        headers.map(header => escapeCSV(row[header as keyof typeof row])).join(',')
      )
    ];

    const csv = csvRows.join('\n');
    const filename = `survey-responses-${new Date().toISOString().split('T')[0]}.csv`;

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return Response.json(
      { error: 'Failed to export responses' },
      { status: 500 }
    );
  }
};
