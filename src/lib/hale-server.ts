import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

export type Profile = {
  user_id: string;
  program_slug: string | null;
  goal: string | null;
  experience: string | null;
  training_place: string | null;
  days_per_week: string | null;
  unit: string;
};

export type SetLog = {
  id: number;
  workout_id: string;
  exercise_name: string;
  set_index: number;
  reps: number;
  weight: number;
  logged_on: string;
};

export type Meal = {
  id: number;
  meal: string;
  name: string;
  calories: number | null;
  protein: number | null;
  logged_on: string;
};

export type CoachMessage = {
  id: number;
  role: string;
  body: string;
  created_at: string;
};

export const getProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<Profile>`
      select user_id, program_slug, goal, experience, training_place, days_per_week, unit
      from hale_profiles
      where user_id = ${context.userId}
    `;
    return rows[0] ?? null;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Partial<Profile> & { program_slug?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into hale_profiles (user_id, program_slug, goal, experience, training_place, days_per_week, unit)
      values (
        ${context.userId},
        ${data.program_slug ?? null},
        ${data.goal ?? null},
        ${data.experience ?? null},
        ${data.training_place ?? null},
        ${data.days_per_week ?? null},
        ${data.unit ?? "kg"}
      )
      on conflict (user_id) do update set
        program_slug = coalesce(excluded.program_slug, hale_profiles.program_slug),
        goal = coalesce(excluded.goal, hale_profiles.goal),
        experience = coalesce(excluded.experience, hale_profiles.experience),
        training_place = coalesce(excluded.training_place, hale_profiles.training_place),
        days_per_week = coalesce(excluded.days_per_week, hale_profiles.days_per_week),
        unit = coalesce(excluded.unit, hale_profiles.unit),
        updated_at = now()
    `;
    return { ok: true as const };
  });

export const logSet = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { workoutId: string; exercise: string; setIndex: number; reps: number; weight: number }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into hale_set_logs (user_id, workout_id, exercise_name, set_index, reps, weight)
      values (${context.userId}, ${data.workoutId}, ${data.exercise}, ${data.setIndex}, ${data.reps}, ${data.weight})
      returning id
    `;
    const prev = await sql<{ weight: number; reps: number }>`
      select weight, reps from hale_set_logs
      where user_id = ${context.userId}
        and exercise_name = ${data.exercise}
        and id <> ${rows[0]?.id ?? 0}
      order by (weight * reps) desc
      limit 1
    `;
    const prevScore = prev[0] ? prev[0].weight * prev[0].reps : 0;
    const isPr = data.weight * data.reps > prevScore && prevScore > 0;
    const first = prev.length === 0;
    return { ok: true as const, isPr: isPr || first, id: rows[0]?.id ?? 0 };
  });

export const listSets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: { workoutId?: string; days?: number } = {}) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    if (data.workoutId) {
      return sql<SetLog>`
        select id, workout_id, exercise_name, set_index, reps, weight, logged_on::text as logged_on
        from hale_set_logs
        where user_id = ${context.userId} and workout_id = ${data.workoutId}
        order by created_at desc
        limit 200
      `;
    }
    return sql<SetLog>`
      select id, workout_id, exercise_name, set_index, reps, weight, logged_on::text as logged_on
      from hale_set_logs
      where user_id = ${context.userId}
      order by created_at desc
      limit 400
    `;
  });

export const completeWorkout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { workoutId: string; notes?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into hale_completions (user_id, workout_id, notes)
      values (${context.userId}, ${data.workoutId}, ${data.notes ?? null})
      on conflict (user_id, workout_id, completed_on) do nothing
    `;
    return { ok: true as const };
  });

export const listCompletions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{ workout_id: string; completed_on: string; notes: string | null }>`
      select workout_id, completed_on::text as completed_on, notes
      from hale_completions
      where user_id = ${context.userId}
      order by completed_on desc
      limit 60
    `;
  });

export const addMeal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { meal: string; name: string; calories?: number; protein?: number }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into hale_meals (user_id, meal, name, calories, protein)
      values (
        ${context.userId},
        ${data.meal},
        ${data.name},
        ${data.calories ?? null},
        ${data.protein ?? null}
      )
    `;
    return { ok: true as const };
  });

export const listMeals = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<Meal>`
      select id, meal, name, calories, protein, logged_on::text as logged_on
      from hale_meals
      where user_id = ${context.userId}
      order by created_at desc
      limit 80
    `;
  });

export const listCoachMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<CoachMessage>`
      select id, role, body, created_at::text as created_at
      from hale_messages
      where user_id = ${context.userId}
      order by id asc
      limit 40
    `;
  });

export const askCoach = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { question: string; program?: string }) => input)
  .handler(async ({ context, data }) => {
    const question = data.question.trim().slice(0, 800);
    if (!question) return { ok: false as const, error: "Ask something first." };

    const sql = await getSql();
    await sql`
      insert into hale_messages (user_id, role, body)
      values (${context.userId}, 'user', ${question})
    `;

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      const fallback =
        "Coaching is temporarily unavailable in this environment. Keep the programmed weights honest, record one working set, and we will review it in your next session.";
      await sql`
        insert into hale_messages (user_id, role, body)
        values (${context.userId}, 'coach', ${fallback})
      `;
      return { ok: true as const, text: fallback };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content:
              "You are the HSK Coaching strength coach in Coventry. Voice: calm, precise, professional. No slang, no hype, no emoji. Short paragraphs. You write the HSK programmes (FORGED, VITALITY, ASCEND, ENDURE, DEFINE, LIMITLESS). Give practical lifting and nutrition advice. Never mention you are an AI. Never use the name Dips.",
          },
          {
            role: "user",
            content: `Program: ${data.program ?? "unassigned"}\n\n${question}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: "Couldn’t reach coaching right now." };
    }
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const text = body.choices[0]?.message.content?.trim() || "Let’s keep it simple: do the session as written.";
    await sql`
      insert into hale_messages (user_id, role, body)
      values (${context.userId}, 'coach', ${text})
    `;
    return { ok: true as const, text };
  });

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  goal: string;
  notes: string | null;
  source: string;
  emailed: boolean;
  created_at: string;
};

function coachInboxEmail() {
  const raw = process.env.COACH_EMAIL?.trim();
  return raw && raw.includes("@") ? raw : "";
}

async function readStoredInboxEmail() {
  const sql = await getSql();
  const rows = await sql<{ value: string }>`
    select value from hale_settings where key = ${"inbox_email"}
  `;
  const stored = rows[0]?.value.trim() ?? "";
  if (stored.includes("@")) return stored;
  return coachInboxEmail();
}

async function forwardLeadEmail(
  to: string,
  lead: {
    name: string;
    email: string;
    phone: string;
    goal: string;
    notes: string;
  },
) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New HSK Coaching enquiry — ${lead.goal}`,
        _template: "table",
        _captcha: "false",
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "—",
        goal: lead.goal,
        message: lead.notes || "No extra note.",
        source: "Instagram /go",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const getCoachInbox = createServerFn({ method: "GET" }).handler(async () => {
  const email = await readStoredInboxEmail();
  return { email };
});

export const saveCoachInbox = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    if (!email.includes("@") || email.length > 120) {
      return { ok: false as const, error: "Enter a real email address." };
    }
    const sql = await getSql();
    await sql`
      insert into hale_settings (key, value)
      values (${"inbox_email"}, ${email})
      on conflict (key) do update set value = excluded.value
    `;
    return { ok: true as const, email };
  });

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: { name: string; email: string; phone?: string; goal: string; notes?: string }) => input)
  .handler(async ({ data }) => {
    const name = data.name.trim().slice(0, 80);
    const email = data.email.trim().toLowerCase().slice(0, 120);
    const phone = (data.phone ?? "").trim().slice(0, 40);
    const goal = data.goal.trim().slice(0, 80);
    const notes = (data.notes ?? "").trim().slice(0, 800);
    if (!name || !email.includes("@") || !goal) {
      return { ok: false as const, error: "Name, email, and a goal are required." };
    }

    const to = await readStoredInboxEmail();
    if (!to) {
      return {
        ok: false as const,
        error: "The coaching inbox has not been set yet. Please try again shortly.",
      };
    }

    const emailed = await forwardLeadEmail(to, { name, email, phone, goal, notes });
    const sql = await getSql();
    await sql`
      insert into hale_leads (name, email, phone, goal, notes, source, emailed)
      values (${name}, ${email}, ${phone || null}, ${goal}, ${notes || null}, ${"instagram"}, ${emailed})
    `;
    return { ok: true as const, emailed, inbox: to };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<Lead>`
      select id, name, email, phone, goal, notes, source, emailed,
             created_at::text as created_at
      from hale_leads
      order by id desc
      limit 200
    `;
  });
