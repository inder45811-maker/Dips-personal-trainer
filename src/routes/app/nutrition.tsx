import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addMeal, listMeals, type Meal } from "@/lib/hale-server";

export const Route = createFileRoute("/app/nutrition")({ component: NutritionPage });

const meals = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function NutritionPage() {
  const [rows, setRows] = useState<Meal[]>([]);
  const [meal, setMeal] = useState<(typeof meals)[number]>("Breakfast");
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const data = await listMeals();
    setRows(data);
  }

  useEffect(() => {
    refresh().catch(() => setRows([]));
  }, []);

  const today = useMemo(
    () => rows.filter((r) => r.logged_on.slice(0, 10) === todayStamp()),
    [rows],
  );
  const cal = today.reduce((s, r) => s + (r.calories ?? 0), 0);
  const pro = today.reduce((s, r) => s + (r.protein ?? 0), 0);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      await addMeal({
        data: {
          meal,
          name: name.trim(),
          calories: calories ? Number(calories) : undefined,
          protein: protein ? Number(protein) : undefined,
        },
      });
      setName("");
      setCalories("");
      setProtein("");
      await refresh();
      toast("Logged");
    } catch {
      toast("Couldn’t save that meal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="eyebrow text-paper/45">Nutrition</p>
      <h1 className="display mt-2 text-4xl">Log meals in seconds</h1>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-paper/8 p-4">
          <p className="text-xs text-paper/45">Calories today</p>
          <p className="mt-1 text-3xl font-medium tabular-nums">{cal || "—"}</p>
        </div>
        <div className="rounded-2xl bg-paper/8 p-4">
          <p className="text-xs text-paper/45">Protein today</p>
          <p className="mt-1 text-3xl font-medium tabular-nums">{pro ? `${pro}g` : "—"}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <div className="flex flex-wrap gap-2">
          {meals.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMeal(m)}
              className={`rounded-full px-4 py-2 text-sm ${
                meal === m ? "bg-paper text-ink" : "bg-paper/10 text-paper/70"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <Input
          placeholder="What did you eat?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-paper/15 bg-paper/5 text-paper placeholder:text-paper/30"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            inputMode="numeric"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="border-paper/15 bg-paper/5 text-paper placeholder:text-paper/30"
          />
          <Input
            inputMode="numeric"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="border-paper/15 bg-paper/5 text-paper placeholder:text-paper/30"
          />
        </div>
        <Button type="submit" variant="inverse" className="w-full" disabled={busy}>
          {busy ? "Saving…" : "Add meal"}
        </Button>
      </form>

      <ul className="mt-10 space-y-3">
        {today.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-3 border-t border-paper/10 pt-3">
            <div>
              <p className="text-sm">{r.name}</p>
              <p className="text-xs text-paper/45">{r.meal}</p>
            </div>
            <p className="text-sm tabular-nums text-paper/60">
              {r.calories ?? "—"} / {r.protein ? `${r.protein}g` : "—"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
