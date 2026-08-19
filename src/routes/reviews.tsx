import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { longReviews, testimonials } from "@/lib/hale-data";
import { breadcrumbSchema, pageHead, reviewListSchema, webPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/reviews")({
  head: () =>
    pageHead({
      title: "Member reviews | HSK Coaching Coventry",
      description:
        "What members say about HSK Coaching programmes, daily plans and in-app coaching from Coventry.",
      path: "/reviews",
    }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <JsonLd data={reviewListSchema()} />
      <JsonLd
        data={webPageSchema({
          path: "/reviews",
          name: "Member reviews | HSK Coaching",
          description: "What members say about HSK Coaching in Coventry.",
        })}
      />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-muted">Reviews</p>
        <h1 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">
          What people like you are saying
        </h1>
        <p className="pretty mt-6 max-w-xl text-muted">
          Members training in Coventry gyms and from home. Honest notes on the
          plan, the coaching, and the habit.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-line bg-paper-2 p-6">
              <blockquote className="pretty text-[15px] leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 text-sm font-medium">{t.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {longReviews.map((r) => (
            <article key={r.title} className="border-t border-line pt-6">
              <h2 className="text-lg font-medium">{r.title}</h2>
              <p className="pretty mt-3 text-sm leading-relaxed text-muted">{r.body}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">{r.name}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-paper-2 p-8 text-center">
          <p className="text-lg font-medium">Start the 7-day trial.</p>
          <Button asChild className="mt-5">
            <Link to="/quiz">Find your plan</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
