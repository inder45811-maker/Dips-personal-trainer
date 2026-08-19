import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/hale-data";
import { breadcrumbSchema, organizationSchema, pageHead, webPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/online-coaching")({
  head: () =>
    pageHead({
      title: "Online personal training UK | HSK Coaching",
      description:
        "Online personal training from a Coventry coach. Daily written programmes, in-app cues and questions, for home or gym anywhere in the United Kingdom.",
      path: "/online-coaching",
      image: "/images/dips-rower.jpg",
    }),
  component: OnlinePage,
});

function OnlinePage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Online coaching", path: "/online-coaching" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          path: "/online-coaching",
          name: "Online personal training UK",
          description:
            "Remote strength coaching from HSK Coaching in Coventry, delivered across the United Kingdom.",
        })}
      />
      <main>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-muted">United Kingdom</p>
          <h1 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">
            Online personal training from <span className="serif-italic">Coventry</span>
          </h1>
          <p className="pretty mt-6 max-w-xl text-lg text-muted">
            The same written daily plan used on Coventry gym floors, delivered in
            the app. Train at home, in a hotel, or in your local gym — anywhere
            in the UK.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/quiz">Find your plan</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/coventry">If you train in Coventry</Link>
            </Button>
          </div>
        </section>

        <section className="border-t border-line bg-paper-2 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-3">
            {[
              {
                t: "A plan, not a feed",
                b: "You receive the session for today. Questions go to the coach who wrote it.",
              },
              {
                t: "Home or commercial gym",
                b: "VITALITY, ENDURE and DEFINE work with dumbbells or bodyweight. Full-gym plans if you have a rack.",
              },
              {
                t: "Written in Coventry",
                b: `Programmes are tested on ${SITE.city} gym floors, then published for members across the UK.`,
              },
            ].map((x) => (
              <article key={x.t} className="border-t border-line pt-5">
                <h2 className="text-xl font-medium tracking-tight">{x.t}</h2>
                <p className="pretty mt-3 text-sm leading-relaxed text-muted">{x.b}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
