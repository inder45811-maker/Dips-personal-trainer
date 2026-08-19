import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  tone?: "paper" | "void";
}) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader tone={tone} />
      {children}
      <SiteFooter />
    </div>
  );
}
