import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, organizationSchema, pageHead, personSchema, webPageSchema } from "@/lib/seo";
import { COACH, SITE } from "@/lib/hale-data";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "The coach | HSK Coaching — personal trainer Coventry",
      description:
        "Meet HSK Coaching. Fourteen years of coaching, based in Coventry. One coach writing every session, cue and reply — for athletes, beginners and busy professionals.",
      path: "/about",
      image: "/images/marcus-portrait.jpg",
    }),
  component: AboutPage,
});

const gallery = [
  { src: "/images/dips-walk.jpg", alt: "HSK Coaching between sets on a Coventry gym floor", pos: "object-[center_12%]", tall: true },
  { src: "/images/dips-rower.jpg", alt: "Rowing session with HSK Coaching", pos: "object-[center_20%]", tall: false },
  { src: "/images/dips-boxing.jpg", alt: "Boxing conditioning session", pos: "object-[center_18%]", tall: false },
  { src: "/images/dips-spot.jpg", alt: "HSK Coaching spotting a client bench press", pos: "object-[center_32%]", tall: true },
  { src: "/images/dips-cue.jpg", alt: "Coaching a client through a lift in Coventry", pos: "object-[center_35%]", tall: false },
  { src: "/images/dips-ring.jpg", alt: "Boxing ring session with HSK Coaching", pos: "object-[center_22%]", tall: true },
  { src: "/images/marcus-kettle.jpg", alt: "Overhead lockout during strength work", pos: "object-[center_12%]", tall: false },
  { src: "/images/dips-explain.jpg", alt: "HSK Coaching a pulldown", pos: "object-[center_40%]", tall: false },
];

function AboutPage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The coach", path: "/about" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          path: "/about",
          name: "The coach | HSK Coaching",
          description:
            "Fourteen years of coaching, based in Coventry. One coach writing every session.",
          type: "AboutPage",
        })}
      />
      <main>
        <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-muted">The coach</p>
            <h1 className="display mt-4 text-5xl sm:text-7xl">
              HSK <span className="serif-italic">Coaching</span>
            </h1>
            <p className="pretty mt-6 max-w-md text-lg leading-relaxed text-muted">
              Fourteen years of coaching, based in Coventry. One focus: a clear plan for today,
              and the reason it works.
            </p>
          </div>
          <img
            src="/images/marcus-portrait.jpg"
            alt="HSK Coaching, strength and conditioning coach in Coventry"
            className="h-[640px] w-full rounded-3xl object-cover object-[center_12%]"
          />
        </section>

        <section className="bg-void py-20 text-paper">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="serif-italic text-3xl leading-snug sm:text-4xl">
              “Most people do not need more information. They need a plan they
              trust, and coaching that stays precise when the set becomes difficult.”
            </p>
            <p className="mt-8 text-sm text-paper/60">
              {COACH.brand} · {SITE.city}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="display text-4xl">How we coach</h2>
            <p className="pretty mt-5 leading-relaxed text-muted">
              Every session is written by HSK Coaching. Not a committee, and not
              an algorithm presented as a coach. You receive a week of work on
              Monday, cues when you train, and you can ask questions from the app.
            </p>
            <p className="pretty mt-4 leading-relaxed text-muted">
              The method is built for athletes and busy professionals who are
              tired of guessing. Honest compound lifts, controlled rest, and
              enough variety to stay engaged — without losing the plot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/quiz">Find your plan</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/coventry">Coventry training</Link>
              </Button>
            </div>
          </div>
          <img
            src="/images/dips-profile.jpg"
            alt="HSK Coaching on the gym floor in Coventry"
            className="h-[420px] w-full rounded-3xl object-cover object-[center_18%]"
          />
        </section>

        <section className="bg-paper-2 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="eyebrow text-muted">The work</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              Strength. Boxing. <span className="serif-italic">The floor.</span>
            </h2>
            <div className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4">
              {gallery.map((g) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  className={`mb-3 w-full rounded-2xl object-cover sm:mb-4 ${g.pos} ${
                    g.tall ? "h-72 sm:h-96" : "h-48 sm:h-64"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
