import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/hale-server";
import { sendLeadEmail } from "@/lib/send-lead-email";
import { SITE } from "@/lib/hale-data";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/go")({
  head: () =>
    pageHead({
      title: "Start here | HSK Coaching Instagram",
      description:
        "Instagram landing for HSK Coaching in Coventry. Send your name, email and training goal. One link, one form.",
      path: "/go",
    }),
  component: InstagramLanding,
});

const GOALS = [
  "Fat loss",
  "Build muscle",
  "Strength and conditioning",
  "Full body composition",
  "Fitness conditioning",
  "Other",
];

function InstagramLanding() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await sendLeadEmail({ name, email, phone, goal, notes });
      void submitLead({
        data: { name, email, phone, goal, notes },
      }).catch(() => undefined);
      setDone(true);
    } catch {
      setError("Couldn’t send that. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-dvh bg-void text-paper">
      <img
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_14%] opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/40" />

      <main className="relative mx-auto flex min-h-dvh max-w-md flex-col px-5 py-8">
        <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.28em]">
          HSK
        </p>

        {done ? (
          <div className="my-auto pb-16">
            <p className="eyebrow text-paper/60">Enquiry received</p>
            <h1 className="display mt-3 text-5xl">
              HSK Coaching has your{" "}
              <span className="serif-italic">details</span>
            </h1>
            <p className="pretty mt-5 text-paper/70">
              We will reply to {email} regarding {goal.toLowerCase()}. Please
              check your inbox.
            </p>
            <Button asChild variant="inverse" size="lg" className="mt-10">
              <Link to="/">See the full site</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-10">
              <h1 className="display text-[2.7rem] leading-[0.95] sm:text-5xl">
                Train with{" "}
                <span className="serif-italic font-normal">HSK</span>
              </h1>
              <p className="pretty mt-4 text-sm leading-relaxed text-paper/70">
                Personal training in Coventry and online across the UK. Tell us
                what you want — we will reply with a starting plan.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-4 pb-8">
              <Input
                required
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-paper/15 bg-paper/10 text-paper placeholder:text-paper/40"
              />
              <Input
                required
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-paper/15 bg-paper/10 text-paper placeholder:text-paper/40"
              />
              <Input
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="WhatsApp / phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-paper/15 bg-paper/10 text-paper placeholder:text-paper/40"
              />

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-paper/50">
                  What do you want?
                </p>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={cn(
                        "rounded-full border px-3 py-2 text-sm",
                        goal === g
                          ? "border-paper bg-paper text-ink"
                          : "border-paper/20 bg-paper/5 text-paper/80",
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="notes"
                rows={3}
                placeholder="Anything else we should know?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-xl border border-paper/15 bg-paper/10 px-4 py-3 text-base text-paper placeholder:text-paper/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/30"
              />

              {error ? <p className="text-sm text-danger">{error}</p> : null}

              <Button
                type="submit"
                variant="inverse"
                size="lg"
                className="w-full"
                disabled={busy || !goal}
              >
                {busy ? "Sending…" : "Send enquiry"}
              </Button>
              <p className="text-center text-xs text-paper/45">
                Sent to {SITE.email}. We will not share your details.
              </p>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
