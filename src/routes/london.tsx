import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/london")({
  beforeLoad: () => {
    throw redirect({ to: "/coventry" });
  },
});
