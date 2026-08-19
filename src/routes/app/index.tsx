import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getProgram,
  getWorkout,
  QUIZ_STORAGE_KEY,
  todayWeekdayIndex,
  WEEKDAYS,
  WEEKDAY_NAMES,
  workoutsByProgram,
  type StoredQuiz,
} from "@/lib/hale-data";
import { completeWorkout, getProfile, listSets, logSet, saveProfile, type SetLog } from "@/lib/hale-server";

export const Route = createFileRoute("/app/")({ component: TodayPage });

function TodayPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<SetLog[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const weekday = todayWeekdayIndex();
  const program = getProgram(slug);
  const workout = slug ? getWorkout(slug, weekday) : null;
  const week = slug ? (workoutsByProgram[slug] ?? []) : [];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const profile = await getProfile();
        let next = profile?.program_slug ?? null;
        if (!next) {
          try {
            const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
            if (raw) {
              const stored = JSON.parse(raw) as StoredQuiz;
              next = stored.programSlug;
              if (next) {
                await saveProfile({
                  data: {
                    program_slug: next,
                    goal: stored.answers?.goal,
                    experience: stored.answers?.experience,
                    training_place: stored.answers?.place,
                    days_per_week: stored.answers?.days,
                  },
                });
              }
            }
          } catch {
            /* ignore */
          }
        }
        if (!cancelled) setSlug(next);
        if (next) {
          const day = getWorkout(next, todayWeekdayIndex());
          if (day) {
            const rows = await listSets({ data: { workoutId: day.id } });
            if (!cancelled) setLogs(rows);
          }
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loggedKey = useMemo(() => {
    const map = new Set<string>();
    for (const l of logs) map.add(`${l.exercise_name}-${l.set_index}`);
    return map;
  }, [logs]);

  async function saveSet(exercise: string, setIndex: number, reps: number, weight: number) {
    if (!workout) return;
    setBusy(`${exercise}-${setIndex}`);
    try {
      const res = await logSet({
        data: {
          workoutId: workout.id,
          exercise,
          setIndex,
          reps,
          weight,
        },
      });
      const rows = await listSets({ data: { workoutId: workout.id } });
      setLogs(rows);
      toast(res.isPr ? `PR — ${exercise}` : "Set logged");
    } catch {
      toast("Couldn’t save that set");
    } finally {
      setBusy(null);
    }
  }

  async function finish() {
    if (!workout) return;
    try {
      await completeWorkout({ data: { workoutId: workout.id } });
      toast("Session in the book.");
    } catch {
      toast("Couldn’t mark complete");
    }
  }

  if (!ready) {
    return <div className="h-40 animate-pulse rounded-2xl bg-paper/5" />;
  }

  if (!program || !workout) {
    return (
      <div>
        <p className="eyebrow text-paper/45">Today</p>
        <h1 className="display mt-3 text-4xl">Find your plan first</h1>
        <p className="mt-3 max-w-md text-sm text-paper/60">
          Two minutes. I’ll put you on the right week of work.
        </p>
        <Button asChild variant="inverse" className="mt-6">
          <Link to="/quiz">Find your plan</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow text-paper/45">
        {WEEKDAY_NAMES[weekday]} · {program.name}
      </p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">{workout.title}</h1>
      <p className="mt-2 text-sm text-paper/55">
        {workout.focus} · {workout.durationMin} min
      </p>

      <div className="mt-6 flex gap-1.5">
        {WEEKDAYS.map((d, i) => {
          const day = week.find((w) => w.weekday === i);
          return (
            <div
              key={`${d}-${i}`}
              title={day?.title}
              className={`grid h-9 w-9 place-items-center rounded-full text-[11px] font-medium ${
                i === weekday ? "bg-paper text-ink" : "bg-paper/10 text-paper/70"
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-paper/8 px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-paper/45">In-ear</p>
        <p className="mt-1 text-sm leading-relaxed">{workout.coachingNote}</p>
      </div>

      <ol className="mt-8 space-y-5">
        {workout.exercises.map((ex) => (
          <li key={ex.name} className="rounded-2xl border border-paper/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{ex.name}</p>
                <p className="mt-1 text-xs text-paper/50">
                  {ex.sets} × {ex.reps}
                  {ex.restSec ? ` · ${ex.restSec}s rest` : ""}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-paper/65">{ex.cue}</p>
            <div className="mt-4 space-y-2">
              {Array.from({ length: ex.sets }, (_, i) => (
                <SetRow
                  key={i}
                  index={i + 1}
                  logged={loggedKey.has(`${ex.name}-${i + 1}`)}
                  busy={busy === `${ex.name}-${i + 1}`}
                  onSave={(reps, weight) => void saveSet(ex.name, i + 1, reps, weight)}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <Button variant="inverse" className="mt-8 w-full" size="lg" onClick={() => void finish()}>
        Mark session complete
      </Button>
    </div>
  );
}

function SetRow({
  index,
  logged,
  busy,
  onSave,
}: {
  index: number;
  logged: boolean;
  busy: boolean;
  onSave: (reps: number, weight: number) => void;
}) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  return (
    <form
      className="grid grid-cols-[2rem_1fr_1fr_auto] items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const r = Number(reps);
        const w = Number(weight);
        if (!r || Number.isNaN(w)) return;
        onSave(r, w);
      }}
    >
      <span className="text-xs tabular-nums text-paper/40">{index}</span>
      <Input
        inputMode="numeric"
        placeholder="kg"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="h-10 border-paper/15 bg-paper/5 text-paper placeholder:text-paper/30"
      />
      <Input
        inputMode="numeric"
        placeholder="reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className="h-10 border-paper/15 bg-paper/5 text-paper placeholder:text-paper/30"
      />
      <Button
        type="submit"
        size="sm"
        variant="inverse"
        disabled={busy || logged}
        className="h-10 px-3 text-xs"
      >
        {logged ? "In" : busy ? "…" : "Log"}
      </Button>
    </form>
  );
}
