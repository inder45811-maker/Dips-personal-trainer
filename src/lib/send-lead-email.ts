import { SITE } from "./hale-data";

export type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  goal: string;
  notes?: string;
};

const INBOX = SITE.email;

/** Browser-side FormSubmit so Instagram leads still arrive if the app DB is down. */
export async function sendLeadEmail(lead: LeadPayload) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(INBOX)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New HSK Coaching enquiry — ${lead.goal}`,
      _template: "table",
      _captcha: "false",
      _replyto: lead.email,
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "—",
      goal: lead.goal,
      message: lead.notes || "No extra note.",
      source: "Instagram /go",
    }),
  });
  if (!res.ok) throw new Error("Could not send enquiry.");
  return true;
}

export { INBOX as COACH_INBOX };
