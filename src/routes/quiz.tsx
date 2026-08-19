import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  getProgram,
  quizSteps,
  QUIZ_STORAGE_KEY,
  scoreQuiz,
  type QuizAnswers,
} from "@/lib/hale-data";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({
  head: () =>
    pageHead({
      title: "Find your plan | HSK Coaching consultation",
      description:
        "Two-minute consultation to match you with an HSK Coaching programme. Goal, equipment, schedule — then a written plan.",
      path: "/quiz",
    }),
  component: QuizPage,
});

const empty: QuizAnswers = {
  goal: "",
  place: "",
  experience: "",
  days: "",
  time: "",
  style: "",
};

function QuizPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(empty);
  const [done, setDone] = useState(false);

  const current = quizSteps[step];
  const resultSlug = useMemo(() => (done ? scoreQuiz(answers) : null), [done, answers]);
  const program = getProgram(resultSlug);

  function pick(value: string) {
    if (!current) return;
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step < quizSteps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    const slug = scoreQuiz(next);
    try {
      localStorage.setItem(
        QUIZ_STORAGE_KEY,
        JSON.stringify({ answers: next, programSlug: slug }),
      );
    } catch {
      /* ignore */
    }
    setDone(true);
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100dvh-4.25rem)] max-w-3xl flex-col px-5 py-12 sm:px-8">
        {program && done ? (
          <div className="my-auto">
            <p className="eyebrow text-muted">Your plan</p>
            <h1 className="display mt-4 text-5xl sm:text-7xl">{program.name}</h1>
            <p className="serif-italic mt-3 text-3xl text-ink/80">{program.tagline}</p>
            <p className="pretty mt-6 max-w-lg text-muted">{program.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <Stat k="Style" v={program.style} />
              <Stat k="Days" v={`${program.daysPerWeek} / week`} />
              <Stat k="Time" v={`${program.durationMin} min`} />
              <Stat k="Kit" v={program.equipment} />
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/login" search={{ next: "/app" }}>
                  Start free trial
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/programs/$slug" params={{ slug: program.slug }}>
                  See the plan
                </Link>
              </Button>
            </div>
            <button
              type="button"
              className="mt-8 text-sm text-muted underline-offset-4 hover:underline"
              onClick={() => {
                setDone(false);
                setStep(0);
                setAnswers(empty);
              }}
            >
              Retake the quiz
            </button>
          </div>
        ) : current ? (
          <div className="my-auto w-full">
            <div className="mb-10 flex items-center justify-between text-xs text-muted">
              <span>
                {step + 1} / {quizSteps.length}
              </span>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="underline-offset-4 hover:underline"
                >
                  Back
                </button>
              ) : (
                <button type="button" onClick={() => navigate({ to: "/" })}>
                  Close
                </button>
              )}
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-paper-3">
              <div
                className="h-full bg-ink transition-[width] duration-300"
                style={{ width: `${((step + 1) / quizSteps.length) * 100}%` }}
              />
            </div>
            <h1 className="display mt-10 text-4xl sm:text-5xl">{current.title}</h1>
            <ul className="mt-10 space-y-3">
              {current.options.map((opt) => {
                const selected = answers[current.key] === opt.value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => pick(opt.value)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border px-5 py-5 text-left transition-colors",
                        selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line bg-paper-2 hover:border-ink/30",
                      )}
                    >
                      <span>
                        <span className="block text-lg font-medium tracking-tight">
                          {opt.label}
                        </span>
                        {opt.hint ? (
                          <span
                            className={cn(
                              "mt-1 block text-sm",
                              selected ? "text-paper/70" : "text-muted",
                            )}
                          >
                            {opt.hint}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-muted">{k}</dt>
      <dd className="mt-1 font-medium">{v}</dd>
    </div>
  );
}
