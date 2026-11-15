/**
 * TEMPORARY: site limited to the /go landing page (unpaid invoice).
 * Everything except /go, static assets, server-function endpoints and /api/*
 * is redirected to /go with a 302.
 * To revert: delete this file (or `git revert` the commit that added it).
 */
interface LimitEvent {
  url: URL;
}

const ALLOWED_PREFIXES = [
  "/go",
  "/api/",
  "/_serverFn",
  "/_server",
  "/_build",
  "/assets/",
  "/images/",
  "/__grok/",
];

export default function limitToGo(event: LimitEvent): Response | undefined {
  const path = event.url.pathname;
  if (path === "/go" || path === "/go/") return undefined;
  if (path === "/api") return undefined;
  if (ALLOWED_PREFIXES.some((p) => p !== "/go" && path.startsWith(p))) return undefined;
  // Any file with an extension (favicon.svg, og.jpg, robots.txt, js/css, ...)
  const last = path.split("/").pop() ?? "";
  if (last.includes(".")) return undefined;
  return new Response(null, { status: 302, headers: { location: "/go", "cache-control": "no-store" } });
}
