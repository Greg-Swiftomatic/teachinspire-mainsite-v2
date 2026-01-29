interface Env {
  DB: D1Database;
}

interface SurveySubmission {
  name: string;
  teaching_situation: string;
  institute_name: string | null;
  teaching_format: string;
  student_types: string;
  ai_experience: string;
  ai_uses: string;
  material_sources: string;
  prep_frustration: string;
  course_expectations: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data: SurveySubmission = await context.request.json();

    if (!data.name || !data.teaching_situation || !data.teaching_format || 
        !data.ai_experience || !data.course_expectations) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const stmt = context.env.DB.prepare(`
      INSERT INTO responses (
        submitted_at,
        name,
        teaching_situation,
        institute_name,
        teaching_format,
        student_types,
        ai_experience,
        ai_uses,
        material_sources,
        prep_frustration,
        course_expectations
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.bind(
      new Date().toISOString(),
      data.name,
      data.teaching_situation,
      data.institute_name || null,
      data.teaching_format,
      data.student_types,
      data.ai_experience,
      data.ai_uses,
      data.material_sources,
      data.prep_frustration,
      data.course_expectations
    ).run();

    if (!result.success) {
      throw new Error('Database insert failed');
    }

    return Response.json(
      { success: true, id: result.meta.last_row_id },
      { status: 201 }
    );

  } catch (error) {
    console.error('Submission error:', error);
    return Response.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
};
