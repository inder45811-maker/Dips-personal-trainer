import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import {
  getCoachInbox,
  listLeads,
  saveCoachInbox,
  type Lead,
} from "@/lib/hale-server";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/inbox")({
  head: () =>
    pageHead({
      title: "Inbox | HSK Coaching",
      description: "Coach inbox for HSK Coaching leads and messages.",
      path: "/inbox",
      noindex: true,
    }),
  component: InboxPage,
});

function InboxPage() {
  return (
    <SiteShell>
      <SignedOut>
        <Navigate to="/login" search={{ next: "/inbox" }} />
      </SignedOut>
      <SignedIn>
        <LeadList />
      </SignedIn>
    </SiteShell>
  );
}

async function sendActivationEmail(to: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: "Confirm HSK Coaching Instagram enquiries",
      _template: "table",
      _captcha: "false",
      name: "HSK Coaching",
      email: to,
      message:
        "Click the confirmation link in this email once. After that, every Instagram enquiry from /go will land here.",
    }),
  });
  return res.ok;
}

function LeadList() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [inbox, setInbox] = useState("");
  const [savedInbox, setSavedInbox] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listLeads()
      .then(setLeads)
      .catch(() => setError("Couldn’t load enquiries."));
    getCoachInbox()
      .then((r) => {
        setInbox(r.email);
        setSavedInbox(r.email);
      })
      .catch(() => undefined);
  }, []);

  async function saveEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNote(null);
    setSaving(true);
    try {
      const res = await saveCoachInbox({ data: { email: inbox } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSavedInbox(res.email);
      const sent = await sendActivationEmail(res.email);
      setNote(
        sent
          ? `Saved. Check ${res.email} and click the confirmation link once — then every /go enquiry emails you.`
          : `Saved ${res.email}. If you don’t get a confirmation email, check spam or try again.`,
      );
    } catch {
      setError("Couldn’t save that email.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow text-muted">Coach</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">Inbox</h1>
      <p className="pretty mt-4 max-w-md text-muted">
        Instagram enquiries from /go are emailed here, and kept on this page.
      </p>

      <form
        onSubmit={saveEmail}
        className="mt-10 rounded-2xl border border-line bg-paper-2 p-5 sm:p-6"
      >
        <label className="text-sm font-medium" htmlFor="inbox-email">
          Forward every enquiry to
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Input
            id="inbox-email"
            type="email"
            required
            autoComplete="email"
            placeholder="hello@hskcoaching.co.uk"
            value={inbox}
            onChange={(e) => setInbox(e.target.value)}
          />
          <Button type="submit" disabled={saving} className="sm:w-40">
            {saving ? "Saving…" : savedInbox ? "Update" : "Save email"}
          </Button>
        </div>
        {savedInbox ? (
          <p className="mt-3 text-xs text-muted">Sending to {savedInbox}</p>
        ) : (
          <p className="mt-3 text-xs text-muted">
            Set this first or the Instagram page cannot email you.
          </p>
        )}
        {note ? <p className="mt-3 text-sm">{note}</p> : null}
      </form>

      {error ? <p className="mt-8 text-sm text-danger">{error}</p> : null}

      {leads && leads.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-line bg-paper-2 px-5 py-8 text-sm text-muted">
          No enquiries yet. Instagram bio link:{" "}
          <a
            href="https://hskcoaching.co.uk/go"
            className="text-ink underline underline-offset-4"
          >
            hskcoaching.co.uk/go
          </a>
        </p>
      ) : null}

      <ul className="mt-10 space-y-4">
        {(leads ?? []).map((lead) => (
          <li key={lead.id} className="rounded-2xl border border-line bg-paper-2 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium tracking-tight">{lead.name}</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {lead.goal}
              </p>
            </div>
            <p className="mt-2 text-sm">
              <a href={`mailto:${lead.email}`} className="underline underline-offset-4">
                {lead.email}
              </a>
              {lead.phone ? (
                <>
                  {" · "}
                  <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                </>
              ) : null}
            </p>
            {lead.notes ? (
              <p className="pretty mt-3 text-sm text-muted">{lead.notes}</p>
            ) : null}
            <p className="mt-4 text-xs text-muted">
              {lead.created_at.slice(0, 16).replace("T", " ")}
              {lead.emailed ? " · emailed" : " · saved"}
            </p>
          </li>
        ))}
      </ul>

      <Button asChild variant="outline" className="mt-10">
        <Link to="/go">Open Instagram page</Link>
      </Button>
    </main>
  );
}
