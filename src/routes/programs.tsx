import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { programs } from "@/lib/hale-data";
import { breadcrumbSchema, organizationSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/programs")({
  head: () =>
    pageHead({
      title: "Training programmes | HSK Coaching Coventry",
      description:
        "Six professionally written strength programmes from HSK Coaching in Coventry: hypertrophy, strength, sculpt, functional, longevity and performance.",
      path: "/programs",
    }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programmes", path: "/programs" },
        ])}
      />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-muted">Programmes</p>
        <h1 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">
          Find the programme that fits your life
        </h1>
        <p className="pretty mt-6 max-w-xl text-muted">
          Six programmes. One coach in Coventry. Complete the consultation or browse
          below. Each plan has its own page with structure, days and equipment.
        </p>
        <Button asChild className="mt-8">
          <Link to="/quiz">Find your plan</Link>
        </Button>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link key={p.slug} to="/programs/$slug" params={{ slug: p.slug }} className="group">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={`${p.name} ${p.style} programme — HSK Coaching Coventry`}
                  className="h-80 w-full object-cover object-[center_16%] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 eyebrow text-muted">{p.style}</p>
              <h2 className="mt-1 text-3xl font-medium tracking-tight">{p.name}</h2>
              <p className="pretty mt-2 text-sm text-muted">{p.tagline}</p>
              <p className="mt-3 text-xs text-muted">
                {p.daysPerWeek} days · {p.durationMin} min · {p.equipment}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
