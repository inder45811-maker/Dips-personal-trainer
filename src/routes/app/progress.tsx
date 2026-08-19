import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { listCompletions, listSets, type SetLog } from "@/lib/hale-server";

export const Route = createFileRoute("/app/progress")({ component: ProgressPage });

function ProgressPage() {
  const [sets, setSets] = useState<SetLog[]>([]);
  const [done, setDone] = useState<Array<{ workout_id: string; completed_on: string }>>([]);

  useEffect(() => {
    listSets({ data: {} }).then(setSets).catch(() => setSets([]));
    listCompletions()
      .then(setDone)
      .catch(() => setDone([]));
  }, []);

  const volumeByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sets) {
      const key = s.logged_on.slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + s.weight * s.reps);
    }
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14)
      .map(([day, volume]) => ({
        day: day.slice(5),
        volume: Math.round(volume),
      }));
  }, [sets]);

  const bests = useMemo(() => {
    const map = new Map<string, { weight: number; reps: number; score: number }>();
    for (const s of sets) {
      const score = s.weight * s.reps;
      const cur = map.get(s.exercise_name);
      if (!cur || score > cur.score) {
        map.set(s.exercise_name, { weight: s.weight, reps: s.reps, score });
      }
    }
    return [...map.entries()]
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 8);
  }, [sets]);

  return (
    <div>
      <p className="eyebrow text-paper/45">Progress</p>
      <h1 className="display mt-2 text-4xl">The work adds up</h1>

      <section className="mt-8 rounded-2xl border border-paper/10 p-5">
        <p className="text-sm text-paper/55">Volume · last sessions</p>
        <div className="mt-4 h-52">
          {volumeByDay.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeByDay}>
                <XAxis dataKey="day" stroke="#6f6860" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(237,230,216,0.06)" }}
                  contentStyle={{
                    background: "#161412",
                    border: "none",
                    borderRadius: 12,
                    color: "#ede6d8",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="volume" fill="#ede6d8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="grid h-full place-items-center text-sm text-paper/40">
              Log a few sets today and this comes alive.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Best sets</h2>
        {bests.length === 0 ? (
          <p className="mt-3 text-sm text-paper/45">No PRs yet. First honest set counts.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {bests.map(([name, b]) => (
              <li
                key={name}
                className="flex items-baseline justify-between gap-4 border-t border-paper/10 pt-3"
              >
                <span className="text-sm">{name}</span>
                <span className="text-sm tabular-nums text-paper/60">
                  {b.weight} × {b.reps}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Sessions</h2>
        {done.length === 0 ? (
          <p className="mt-3 text-sm text-paper/45">Finish today’s workout to start the streak.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm text-paper/70">
            {done.slice(0, 12).map((c) => (
              <li key={`${c.workout_id}-${c.completed_on}`} className="flex justify-between">
                <span>{c.workout_id.replace("-", " · ")}</span>
                <span className="tabular-nums text-paper/45">{c.completed_on.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
