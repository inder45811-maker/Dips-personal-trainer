import { WEEKDAYS } from "@/lib/hale-data";

export function PhoneMock() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="rounded-[2.2rem] border border-ink/15 bg-void p-2.5 shadow-[0_30px_80px_-20px_rgba(17,16,14,0.55)]">
        <div className="overflow-hidden rounded-[1.7rem] bg-paper text-ink">
          <div className="px-5 pb-6 pt-6">
            <p className="eyebrow text-muted">Today</p>
            <p className="mt-2 font-sans text-2xl font-medium tracking-tight">
              Chest & triceps
            </p>
            <p className="mt-1 text-sm text-muted">52 min · FORGED · HSK Coaching</p>

            <div className="mt-5 flex gap-1.5">
              {WEEKDAYS.map((d, i) => (
                <div
                  key={`${d}-${i}`}
                  className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-medium ${
                    i === 0 ? "bg-ink text-paper" : "bg-paper-3 text-ink"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {[
                ["Barbell bench press", "4 × 6–8"],
                ["Incline dumbbell press", "3 × 8–10"],
                ["Weighted dip", "3 × 8–10"],
              ].map(([name, sets]) => (
                <li
                  key={name}
                  className="flex items-start justify-between gap-3 border-t border-line pt-3"
                >
                  <span className="text-sm leading-snug">{name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted">{sets}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-ink px-4 py-3 text-paper">
              <p className="text-[11px] uppercase tracking-[0.16em] text-paper/60">
                In-ear cue
              </p>
              <p className="mt-1 text-sm leading-snug">
                Plant your feet. Bar to mid-chest, not the neck.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
