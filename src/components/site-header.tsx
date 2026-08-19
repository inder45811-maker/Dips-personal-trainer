import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const links = [
  { to: "/programs", label: "Programmes" },
  { to: "/about", label: "The coach" },
  { to: "/coventry", label: "Coventry" },
  { to: "/online-coaching", label: "Online" },
  { to: "/pricing", label: "Pricing" },
];

export function SiteHeader({ tone = "paper" }: { tone?: "paper" | "void" }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inverted = tone === "void";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        inverted
          ? "border-paper/10 bg-void/80 text-paper"
          : "border-ink/8 bg-paper/85 text-ink",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <Link to="/" className="font-sans text-[15px] font-semibold tracking-[0.22em]">
          HSK
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm tracking-tight transition-opacity hover:opacity-100",
                pathname.startsWith(l.to) ? "opacity-100" : "opacity-60",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <AuthSlot inverted={inverted} />
          <Button asChild size="sm" variant={inverted ? "inverse" : "primary"}>
            <Link to="/quiz">Find your plan</Link>
          </Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          className={cn(
            "border-t px-5 py-5 lg:hidden",
            inverted ? "border-paper/10 bg-void" : "border-ink/8 bg-paper",
          )}
        >
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-lg"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="py-3 text-lg">
              Sign in
            </Link>
            <Button asChild className="mt-3 w-full" onClick={() => setOpen(false)}>
              <Link to="/quiz">Find your plan</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function AuthSlot({ inverted }: { inverted: boolean }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-20 animate-pulse rounded-full bg-current/10" />;
  }
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/app" className="text-sm opacity-70 hover:opacity-100">
          {user.displayName?.split(" ")[0] ?? "Account"}
        </Link>
        <button
          type="button"
          onClick={() => void signOut("/")}
          className={cn(
            "text-sm opacity-50 hover:opacity-100",
            inverted ? "text-paper" : "text-ink",
          )}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <Link to="/login" className="text-sm opacity-70 hover:opacity-100">
      Sign in
    </Link>
  );
}
