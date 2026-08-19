import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/hale-data";
import { breadcrumbSchema, faqSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "FAQ | HSK Coaching — personal training Coventry",
      description:
        "Answers on finding a plan, gym vs home, pricing, beginners, nutrition and switching programmes at HSK Coaching.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <JsonLd data={faqSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-muted">FAQ</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl">Still have questions?</h1>
        <p className="pretty mt-5 text-muted">
          Straight answers about HSK Coaching programmes, the trial, and how
          training works from Coventry or remotely.
        </p>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-14 rounded-3xl bg-paper-2 p-8 text-center">
          <p className="text-lg font-medium">Ready when you are.</p>
          <Button asChild className="mt-5">
            <Link to="/quiz">Find your plan</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
