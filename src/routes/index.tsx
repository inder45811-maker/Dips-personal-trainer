import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { programs, testimonials, SITE } from "@/lib/hale-data";
import {
  organizationSchema,
  pageHead,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Personal trainer Coventry | HSK Coaching — daily workout plans",
      description:
        "HSK Coaching is a personal trainer in Coventry offering written daily strength programmes. Gym or home. 7-day trial, no card required. Serving West Midlands and the UK online.",
      path: "/",
      image: "/images/hero.jpg",
    }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "Personal trainer Coventry | HSK Coaching",
          description: SITE.description,
        })}
      />
      <Hero />
      <Definition />
      <Benefits />
      <CoachTeaser />
      <ProgramsTeaser />
      <QuizCta />
      <SocialProof />
      <Closing />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[88dvh] overflow-hidden bg-void text-paper">
      <picture>
        <source media="(min-width: 800px)" srcSet="/images/cta.jpg" />
        <img
          src="/images/hero.jpg"
          alt="Personal trainer HSK Coaching during a strength session in Coventry"
          className="absolute inset-0 h-full w-full object-cover object-[center_22%] lg:object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/25" />
      <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="eyebrow text-paper/70">Personal trainer · Coventry</p>
        <h1 className="display mt-4 max-w-4xl text-[3.2rem] sm:text-7xl md:text-[6rem]">
          Personal trainer in <span className="serif-italic">Coventry</span>
        </h1>
        <p className="pretty mt-6 max-w-lg text-base text-paper/75 sm:text-lg">
          A professionally written strength plan for every day. Coached from
          Coventry gym floors, delivered wherever you train in the UK.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="inverse" size="lg">
            <Link to="/quiz">Find your plan</Link>
          </Button>
          <Link to="/coventry" className="text-sm text-paper/70 underline-offset-4 hover:underline">
            Training in Coventry
          </Link>
        </div>
      </div>
    </section>
  );
}

function Definition() {
  return (
    <section className="border-b border-line bg-paper-2 py-14">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="eyebrow text-muted">What HSK Coaching is</p>
        <p className="pretty mt-5 text-lg leading-relaxed text-ink/80 sm:text-xl">
          {SITE.name} is a one-coach personal training practice based in{" "}
          {SITE.city}, {SITE.country}. We write daily strength and conditioning
          programmes and deliver them in a member app. Membership is{" "}
          {SITE.priceMonthly} a month or {SITE.priceYearly} a year after a
          7-day trial. No credit card is required to start.
        </p>
        <p className="mt-6 text-sm text-muted">
          14 years coaching · {SITE.city} · Strength & conditioning ·{" "}
          {SITE.serviceAreas.join(" · ")}
        </p>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      title: "A plan for today",
      body: "Open the app and train the session written for this day. No more guessing on the gym floor.",
    },
    {
      title: "One coach, in Coventry",
      body: "Programmes, cues and answers come from the same person — not a content library.",
    },
    {
      title: "Gym or home",
      body: "Full-gym strength plans and shorter sessions that work with dumbbells or bodyweight.",
    },
    {
      title: "Coventry, and remote",
      body: "Coached from Coventry. Available wherever you train in the United Kingdom.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <h2 className="display max-w-xl text-4xl sm:text-5xl">
        Daily coaching, not a <span className="serif-italic">video feed</span>
      </h2>
      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b) => (
          <div key={b.title} className="border-t border-line pt-6">
            <h3 className="text-lg font-medium tracking-tight">{b.title}</h3>
            <p className="pretty mt-3 text-sm leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoachTeaser() {
  return (
    <section className="overflow-hidden bg-paper-2">
      <div className="mx-auto grid max-w-6xl items-stretch lg:grid-cols-2">
        <div className="relative min-h-[480px] bg-void lg:min-h-[620px]">
          <img
            src="/images/dips-door.jpg"
            alt="HSK Coaching after a session in a Coventry gym"
            className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 sm:py-24">
          <p className="eyebrow text-muted">The coach</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            One coach. <span className="serif-italic">All</span> the answers.
          </h2>
          <p className="pretty mt-6 max-w-md text-muted">
            Fourteen years of coaching, based in Coventry. Method, background and how we coach
            live on a dedicated page — not buried on the homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/about">Meet the coach</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/coventry">Coventry training</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsTeaser() {
  const featured = programs.slice(0, 3);
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-muted">Programmes</p>
          <h2 className="display mt-4 max-w-xl text-4xl sm:text-5xl">
            Six written plans
          </h2>
        </div>
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link to="/programs">All programmes</Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {featured.map((p) => (
          <Link key={p.slug} to="/programs/$slug" params={{ slug: p.slug }} className="group">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={p.image}
                alt={`${p.name} ${p.style} personal training programme in Coventry`}
                className="h-72 w-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 eyebrow text-muted">{p.style}</p>
            <h3 className="mt-1 text-2xl font-medium tracking-tight">{p.name}</h3>
            <p className="pretty mt-2 text-sm text-muted">{p.tagline}</p>
          </Link>
        ))}
      </div>
      <Button asChild variant="outline" className="mt-10 sm:hidden">
        <Link to="/programs">All programmes</Link>
      </Button>
    </section>
  );
}

function QuizCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-paper-2">
        <div className="grid items-center lg:grid-cols-2">
          <div className="px-6 py-14 sm:px-12">
            <h2 className="display text-4xl sm:text-5xl">
              Find the <span className="serif-italic">right</span> plan
            </h2>
            <p className="pretty mt-5 max-w-md text-muted">
              A two-minute consultation. We recommend one of six programmes based
              on your goal, equipment and schedule.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/quiz">Find your plan</Link>
            </Button>
          </div>
          <img
            src="/images/cta.jpg"
            alt="HSK Coaching spotting a client on the bench in Coventry"
            className="h-56 w-full object-cover object-center sm:h-72 lg:h-full lg:min-h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display max-w-xl text-4xl sm:text-5xl">What members say</h2>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/reviews">All reviews</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <figure key={t.name} className="rounded-2xl border border-line bg-paper-2 p-6">
              <blockquote className="pretty text-[15px] leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 text-sm font-medium">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative isolate overflow-hidden bg-void text-paper">
      <img
        src="/images/dips-floor.jpg"
        alt="HSK Coaching gym floor in Coventry"
        className="absolute inset-0 h-full w-full object-cover object-[center_40%] opacity-45"
      />
      <div className="absolute inset-0 bg-void/60" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <h2 className="display text-4xl sm:text-6xl">
          Start with a <span className="serif-italic">clear</span> plan
        </h2>
        <p className="mt-6 text-paper/75">Complimentary 7-day trial. No card required.</p>
        <Button asChild variant="inverse" size="lg" className="mt-8">
          <Link to="/quiz">Find your plan</Link>
        </Button>
      </div>
    </section>
  );
}
