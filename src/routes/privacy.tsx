import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/hale-data";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy | HSK Coaching",
      description:
        "How HSK Coaching collects and uses personal information for coaching, membership and enquiries.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-muted">Legal</p>
        <h1 className="display mt-4 text-5xl">Privacy</h1>
        <p className="pretty mt-6 text-muted">
          {SITE.name} ({SITE.domain}) is based in {SITE.city}, {SITE.country}.
          This notice explains what we collect when you use the site, join a
          trial, or send an enquiry.
        </p>
        <div className="pretty mt-10 space-y-8 text-[15px] leading-relaxed text-muted">
          <section>
            <h2 className="text-xl font-medium text-ink">What we collect</h2>
            <p className="mt-3">
              Name, email, optional WhatsApp number, training goal, and notes
              you send through the enquiry form. Account email and training logs
              if you create a membership. Payment details are handled by the
              processor — we do not store card numbers.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-ink">Why we use it</h2>
            <p className="mt-3">
              To recommend a programme, deliver coaching, reply to enquiries,
              and operate the member app. We do not sell personal data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-ink">How long we keep it</h2>
            <p className="mt-3">
              Enquiry records are kept so the coach can follow up. You may ask
              us to delete an account or an enquiry by writing to the coach
              through the contact page.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-ink">Your rights</h2>
            <p className="mt-3">
              If you are in the United Kingdom you can request access,
              correction or deletion of personal data we hold about you.
            </p>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
