import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/hale-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold tracking-[0.22em]">HSK</p>
          <p className="pretty mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Professional strength coaching and daily programming. {SITE.name},{" "}
            {SITE.city}.
          </p>
          <address className="mt-4 not-italic text-sm text-muted">
            {SITE.name}
            <br />
            {SITE.city}, {SITE.region}, {SITE.country}
            <br />
            Service area: {SITE.serviceAreas.join(", ")}
            <br />
            {SITE.domain}
          </address>
        </div>
        <div>
          <p className="eyebrow text-muted">Train</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/programs" className="hover:underline">
                Programmes
              </Link>
            </li>
            <li>
              <Link to="/quiz" className="hover:underline">
                Find your plan
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:underline">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/app" className="hover:underline">
                Member app
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-muted">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                The coach
              </Link>
            </li>
            <li>
              <Link to="/coventry" className="hover:underline">
                Personal trainer Coventry
              </Link>
            </li>
            <li>
              <Link to="/online-coaching" className="hover:underline">
                Online coaching UK
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/go" className="hover:underline">
                Instagram link
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>No credit card to start · Cancel anytime</p>
        </div>
      </div>
    </footer>
  );
}
