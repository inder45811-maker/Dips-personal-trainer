import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Apple, Dumbbell, LineChart, MessageCircle, UserRound } from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/app")({
  head: () =>
    pageHead({
      title: "Member app | HSK Coaching",
      description: "Today’s workout and training log.",
      path: "/app",
      noindex: true,
    }),
  component: AppLayout,
});

const tabs: Array<{
  to: "/app" | "/app/progress" | "/app/nutrition" | "/app/coach" | "/app/plan";
  label: string;
  icon: typeof Dumbbell;
  exact?: boolean;
}> = [
  { to: "/app", label: "Today", icon: Dumbbell, exact: true },
  { to: "/app/progress", label: "Progress", icon: LineChart },
  { to: "/app/nutrition", label: "Fuel", icon: Apple },
  { to: "/app/coach", label: "Coach", icon: MessageCircle },
  { to: "/app/plan", label: "Plan", icon: UserRound },
];

function AppLayout() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (isPending) {
    return (
      <div className="grid min-h-dvh place-items-center bg-void text-paper">
        <div className="h-8 w-28 animate-pulse rounded-full bg-paper/10" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn to="/login" />;

  return (
    <div className="min-h-dvh bg-void text-paper">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-paper/10 bg-void/90 px-5 backdrop-blur">
        <Link to="/" className="text-[13px] font-semibold tracking-[0.22em]">
          HSK
        </Link>
        <div className="flex items-center gap-4 text-sm text-paper/60">
          <span className="hidden sm:inline">{user.displayName ?? "Athlete"}</span>
          <button type="button" onClick={() => void signOut("/")} className="hover:text-paper">
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-3xl">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-44 shrink-0 flex-col gap-1 border-r border-paper/10 py-6 pr-4 md:flex">
          {tabs.map((t) => {
            const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm",
                  active ? "bg-paper/10 text-paper" : "text-paper/55 hover:text-paper",
                )}
              >
                <t.icon className="size-4" />
                {t.label}
              </Link>
            );
          })}
        </aside>
        <main className="min-w-0 flex-1 px-5 pb-24 pt-6 md:px-8 md:pb-12">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-paper/10 bg-void/95 pb-[env(safe-area-inset-bottom)] md:hidden">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] tracking-wide",
                active ? "text-paper" : "text-paper/40",
              )}
            >
              <t.icon className="size-4" />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
