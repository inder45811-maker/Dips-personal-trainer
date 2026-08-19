import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pageHead } from "@/lib/seo";

type LoginSearch = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    next: typeof search.next === "string" ? search.next : "/app",
  }),
  head: () =>
    pageHead({
      title: "Sign in | HSK Coaching",
      description: "Sign in to the HSK Coaching member app or coach inbox.",
      path: "/login",
      noindex: true,
    }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const dest = next && next.startsWith("/") ? next : "/app";
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "Athlete",
        });
        if (err) throw new Error(err.message ?? "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) throw new Error(err.message ?? "Could not sign in");
      }
      window.location.href = dest;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto grid min-h-[calc(100dvh-4.25rem)] max-w-6xl lg:grid-cols-2">
        <div className="hidden lg:block">
          <img
            src="/images/dips-profile.jpg"
            alt=""
            className="h-full w-full object-cover object-[center_16%]"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12">
          <p className="eyebrow text-muted">Start your trial</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">
            {mode === "in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-3 text-sm text-muted">
            7-day trial. No credit card required. Cancel at any time.
          </p>

          {authEnabled ? (
            <div className="mt-8 space-y-3">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => void signIn(p.providerId, { callbackURL: dest })}
                >
                  Continue with {p.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">Sign-in is disabled.</p>
          )}

          <div className="my-8 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted">
            <span className="h-px flex-1 bg-line" />
            or email
            <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={onEmail} className="space-y-3">
            {mode === "up" ? (
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            ) : null}
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "up" ? "new-password" : "current-password"}
            />
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" className="w-full" size="lg" disabled={busy}>
              {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <button
            type="button"
            className="mt-6 text-sm text-muted underline-offset-4 hover:underline"
            onClick={() => {
              setMode((m) => (m === "in" ? "up" : "in"));
              setError(null);
            }}
          >
            {mode === "in" ? "New here? Create an account" : "Already training? Sign in"}
          </button>
          <Link to="/" className="mt-4 text-sm text-muted hover:underline">
            Back home
          </Link>
        </div>
      </main>
    </div>
  );
}
