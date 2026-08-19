import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/hale-data";
import { breadcrumbSchema, organizationSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact | HSK Coaching Coventry",
      description:
        "Contact HSK Coaching in Coventry. Send your name, email and training goal. Replies go to the coach inbox.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact HSK Coaching",
          url: `${SITE.url}/contact`,
        }}
      />
      <main className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-muted">Contact</p>
          <h1 className="display mt-4 text-5xl sm:text-6xl">
            Write to the <span className="serif-italic">coach</span>
          </h1>
          <p className="pretty mt-6 max-w-md text-muted">
            Based in {SITE.city}. Tell us what you want to train for. We reply
            with a starting programme — not a sales script.
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="text-muted">Studio</dt>
              <dd className="mt-1 font-medium">
                {SITE.name}, {SITE.city}, {SITE.country}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Website</dt>
              <dd className="mt-1 font-medium">{SITE.domain}</dd>
            </div>
            <div>
              <dt className="text-muted">Instagram link</dt>
              <dd className="mt-1">
                <Link to="/go" className="underline underline-offset-4">
                  hskcoaching.co.uk/go
                </Link>
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-[1.75rem] border border-line bg-paper-2 p-8">
          <p className="text-lg font-medium">Send a short brief</p>
          <p className="mt-2 text-sm text-muted">
            Name, email, WhatsApp and a goal. Takes under a minute.
          </p>
          <Button asChild size="lg" className="mt-8 w-full">
            <Link to="/go">Open the enquiry form</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="mt-3 w-full">
            <Link to="/quiz">Or find a plan first</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
