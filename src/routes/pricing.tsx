import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, organizationSchema, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/hale-data";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      title: "Pricing | HSK Coaching — £29 a month, 7-day free trial",
      description:
        "HSK Coaching membership: 7-day trial with no card. Then £29 a month or £249 a year. All six programmes and direct coaching included.",
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "HSK Coaching membership",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Monthly membership",
              price: "29",
              priceCurrency: "GBP",
              url: `${SITE.url}/pricing`,
            },
            {
              "@type": "Offer",
              name: "Yearly membership",
              price: "249",
              priceCurrency: "GBP",
              url: `${SITE.url}/pricing`,
            },
          ],
        }}
      />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-muted">Pricing</p>
        <h1 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">
          Start free. Stay if it works.
        </h1>
        <p className="pretty mt-6 max-w-xl text-muted">
          No credit card required to start. Cancel at any time. One coach in Coventry,
          every programme.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-line bg-paper-2 p-8 sm:p-10">
            <p className="eyebrow text-muted">Monthly</p>
            <p className="mt-4 font-sans text-5xl font-medium tracking-tight">
              £29
              <span className="text-lg font-normal text-muted"> / month</span>
            </p>
            <p className="mt-3 text-sm text-muted">After your 7-day trial.</p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "All six programmes",
                "New workouts every week",
                "In-session cues and form notes",
                "Rep, weight, and PR tracking",
                "Nutrition log",
                "Direct coaching in the app",
              ].map((item) => (
                <li key={item} className="border-t border-line pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 w-full" size="lg">
              <Link to="/quiz">Find your plan</Link>
            </Button>
          </article>

          <article className="rounded-[1.75rem] bg-void p-8 text-paper sm:p-10">
            <p className="eyebrow text-paper/55">Yearly</p>
            <p className="mt-4 font-sans text-5xl font-medium tracking-tight">
              £249
              <span className="text-lg font-normal text-paper/55"> / year</span>
            </p>
            <p className="mt-3 text-sm text-paper/65">Two months free. Same everything.</p>
            <ul className="mt-8 space-y-3 text-sm text-paper/85">
              {[
                "Everything in monthly",
                "Best value for a full year",
                "Commit to the habit for twelve months",
              ].map((item) => (
                <li key={item} className="border-t border-paper/15 pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="inverse" className="mt-8 w-full" size="lg">
              <Link to="/quiz">Start the trial</Link>
            </Button>
          </article>
        </div>
      </main>
    </SiteShell>
  );
}
