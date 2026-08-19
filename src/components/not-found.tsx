import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-paper px-6 text-center text-ink">
      <div>
        <p className="eyebrow text-muted">404</p>
        <h1 className="display mt-3 text-5xl">This page isn’t on the plan</h1>
        <p className="mt-4 text-sm text-muted">Let’s get you back to work.</p>
        <Button asChild className="mt-8">
          <Link to="/">Home</Link>
        </Button>
      </div>
    </main>
  );
}
