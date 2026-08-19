import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getProgram, programs, WEEKDAY_NAMES, workoutsByProgram } from "@/lib/hale-data";
import { getProfile, saveProfile } from "@/lib/hale-server";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/plan")({ component: PlanPage });

function PlanPage() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then((p) => setSlug(p?.program_slug ?? null))
      .catch(() => setSlug(null));
  }, []);

  const program = getProgram(slug);
  const week = slug ? (workoutsByProgram[slug] ?? []) : [];

  async function switchTo(next: string) {
    await saveProfile({ data: { program_slug: next } });
    setSlug(next);
    toast(`You’re on ${next.toUpperCase()}`);
  }

  return (
    <div>
      <p className="eyebrow text-paper/45">Your plan</p>
      <h1 className="display mt-2 text-4xl">{program?.name ?? "Unassigned"}</h1>
      {program ? (
        <p className="mt-2 max-w-md text-sm text-paper/60">{program.tagline}</p>
      ) : (
        <Button asChild variant="inverse" className="mt-6">
          <Link to="/quiz">Find your plan</Link>
        </Button>
      )}

      {week.length ? (
        <ol className="mt-8 space-y-3">
          {week.map((w) => (
            <li key={w.id} className="flex items-baseline justify-between gap-4 border-t border-paper/10 pt-3">
              <div>
                <p className="text-xs text-paper/40">{WEEKDAY_NAMES[w.weekday]}</p>
                <p className="text-sm">{w.title}</p>
              </div>
              <p className="text-xs tabular-nums text-paper/45">{w.durationMin}m</p>
            </li>
          ))}
        </ol>
      ) : null}

      <h2 className="mt-12 text-lg font-medium">Switch plan</h2>
      <ul className="mt-4 space-y-2">
        {programs.map((p) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => void switchTo(p.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left",
                p.slug === slug
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/10 text-paper hover:border-paper/30",
              )}
            >
              <span>
                <span className="block font-medium">{p.name}</span>
                <span className={cn("block text-xs", p.slug === slug ? "text-ink/60" : "text-paper/45")}>
                  {p.style} · {p.daysPerWeek}d · {p.durationMin}m
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
