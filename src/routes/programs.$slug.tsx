import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import {
  getProgram,
  QUIZ_STORAGE_KEY,
  WEEKDAY_NAMES,
  workoutsByProgram,
} from "@/lib/hale-data";
import { breadcrumbSchema, pageHead, programSchema } from "@/lib/seo";

export const Route = createFileRoute("/programs/$slug")({
  head: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) {
      return pageHead({
        title: "Programme | HSK Coaching",
        description: "Browse HSK Coaching training programmes.",
        path: `/programs/${params.slug}`,
      });
    }
    return pageHead({
      title: `${program.name} | ${program.style} programme — HSK Coaching Coventry`,
      description: `${program.tagline} ${program.daysPerWeek} days a week, ${program.durationMin} minutes, ${program.equipment}. Written by HSK Coaching in Coventry.`,
      path: `/programs/${program.slug}`,
      image: program.image,
    });
  },
  component: ProgramPage,
});

function ProgramPage() {
  const { slug } = Route.useParams();
  const found = getProgram(slug);
  if (!found) throw notFound();
  const program = found;
  const week = workoutsByProgram[program.slug] ?? [];

  function choose() {
    try {
      const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
      const prev = raw ? (JSON.parse(raw) as { answers?: unknown }) : {};
      localStorage.setItem(
        QUIZ_STORAGE_KEY,
        JSON.stringify({ ...prev, programSlug: program.slug }),
      );
    } catch {
      /* ignore */
    }
  }

  return (
    <SiteShell>
      <JsonLd data={programSchema(program)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programmes", path: "/programs" },
          { name: program.name, path: `/programs/${program.slug}` },
        ])}
      />
      <main>
        <section className="relative isolate min-h-[70dvh] overflow-hidden bg-void text-paper">
          <img
            src={program.image}
            alt={`${program.name} ${program.style} training programme`}
            className="absolute inset-0 h-full w-full object-cover object-[center_18%] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/20" />
          <div className="relative mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-end px-5 pb-14 sm:px-8">
            <p className="eyebrow text-paper/70">HSK Coaching · {program.style}</p>
            <h1 className="display mt-3 text-6xl sm:text-8xl">{program.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-paper/80">{program.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="inverse" size="lg" onClick={choose}>
                <Link to="/login" search={{ next: "/app" }}>
                  Start this plan
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-paper/30 text-paper hover:bg-paper/10">
                <Link to="/quiz">Not sure? Take the quiz</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-3">
          <p className="pretty text-lg leading-relaxed text-muted lg:col-span-2">
            {program.description}
          </p>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted">Level</dt>
              <dd className="mt-1 font-medium">{program.level}</dd>
            </div>
            <div>
              <dt className="text-muted">Days</dt>
              <dd className="mt-1 font-medium">{program.daysPerWeek} / week</dd>
            </div>
            <div>
              <dt className="text-muted">Session</dt>
              <dd className="mt-1 font-medium">{program.durationMin} min</dd>
            </div>
            <div>
              <dt className="text-muted">Equipment</dt>
              <dd className="mt-1 font-medium">{program.equipment}</dd>
            </div>
          </dl>
        </section>

        <section className="border-t border-line bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="display text-4xl">This week</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {week.map((w) => (
                <article key={w.id} className="rounded-2xl border border-line bg-paper p-6">
                  <p className="eyebrow text-muted">{WEEKDAY_NAMES[w.weekday]}</p>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {w.focus} · {w.durationMin} min
                  </p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {w.exercises.slice(0, 4).map((e) => (
                      <li key={e.name} className="flex justify-between gap-4 border-t border-line pt-2">
                        <span>{e.name}</span>
                        <span className="tabular-nums text-muted">
                          {e.sets} × {e.reps}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
