import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/hale-data";
import { breadcrumbSchema, organizationSchema, pageHead, webPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/coventry")({
  head: () =>
    pageHead({
      title: "Personal trainer Coventry | HSK Coaching",
      description:
        "Personal training in Coventry and remote coaching across the UK. Daily strength programmes written by HSK Coaching. Gym-floor experience, app-based delivery.",
      path: "/coventry",
      image: "/images/dips-floor.jpg",
    }),
  component: CoventryPage,
});

function CoventryPage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Coventry", path: "/coventry" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          path: "/coventry",
          name: "Personal trainer Coventry",
          description:
            "Personal training in Coventry and the West Midlands from HSK Coaching.",
        })}
      />
      <main>
        <section className="relative isolate min-h-[70dvh] overflow-hidden bg-void text-paper">
          <img
            src="/images/hero.jpg"
            alt="HSK Coaching during a strength session in Coventry"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/25" />
          <div className="relative mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-end px-5 pb-16 sm:px-8">
            <p className="eyebrow text-paper/70">Service area</p>
            <h1 className="display mt-3 max-w-3xl text-5xl sm:text-7xl">
              Personal trainer, <span className="serif-italic">Coventry</span>
            </h1>
            <p className="pretty mt-5 max-w-xl text-lg text-paper/80">
              HSK Coaching is based in {SITE.city}. Programmes are written here
              and delivered wherever you train — a Coventry gym, a hotel, or home.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="display text-4xl">Based in Coventry. Built to travel.</h2>
            <p className="pretty mt-5 leading-relaxed text-muted">
              Fourteen years of coaching on gym floors — commercial rooms, fight
              gyms, and strength spaces across the city. That is where the
              programmes are tested. The app is how they reach you on a Tuesday
              at 6am.
            </p>
            <p className="pretty mt-4 leading-relaxed text-muted">
              If you train in Coventry or the West Midlands you can work with a
              coach who knows the rooms. If you travel or live elsewhere in the
              United Kingdom, the same daily plan still applies.
            </p>
            <dl className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
              <div className="border-t border-line pt-4">
                <dt className="text-muted">City</dt>
                <dd className="mt-1 font-medium">{SITE.city}, {SITE.country}</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-muted">Serves</dt>
                <dd className="mt-1 font-medium">Coventry, West Midlands, remote UK</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-muted">Focus</dt>
                <dd className="mt-1 font-medium">Strength and conditioning</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-muted">Membership</dt>
                <dd className="mt-1 font-medium">{SITE.priceMonthly} / month after trial</dd>
              </div>
            </dl>
          </div>
          <img
            src="/images/dips-spot.jpg"
            alt="HSK Coaching spotting a client in a Coventry gym"
            className="h-[480px] w-full rounded-3xl object-cover object-[center_28%]"
          />
        </section>

        <section className="bg-paper-2 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="display text-4xl">Who this is for</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  t: "Busy professionals",
                  b: "A written session that fits a working week. No more wandering the floor.",
                },
                {
                  t: "Gym regulars",
                  b: "Progression on the big lifts, programmed by someone who still coaches them.",
                },
                {
                  t: "Remote members",
                  b: "The same plan, delivered in the app, with questions answered by the coach.",
                },
              ].map((x) => (
                <article key={x.t} className="border-t border-line pt-5">
                  <h3 className="text-lg font-medium">{x.t}</h3>
                  <p className="pretty mt-2 text-sm text-muted">{x.b}</p>
                </article>
              ))}
            </div>
            <div className="mt-16">
              <h2 className="display text-3xl">Areas served</h2>
              <p className="pretty mt-4 max-w-2xl text-muted">
                HSK Coaching is based in {SITE.city}. In-person sessions are by
                appointment on Coventry gym floors. Online coaching covers the rest
                of the United Kingdom.
              </p>
              <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-3">
                {SITE.serviceAreas.map((area) => (
                  <li key={area} className="border-t border-line pt-3 font-medium">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/quiz">Find your plan</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/online-coaching">Online coaching UK</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Enquire</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
