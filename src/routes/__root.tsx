import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { GoogleNoscript, GoogleTags } from "@/components/google-tags";
import { Toaster } from "sonner";
import { SITE } from "@/lib/hale-data";
import appCss from "../styles.css?url";

const APP_NAME = SITE.name;
const host = import.meta.env.VITE_PUBLIC_HOSTNAME || SITE.domain;
const ogImage = `https://${host}/og.jpg`;
const siteVerify = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HSK Coaching | Personal trainer Coventry — daily workout plans" },
      {
        name: "description",
        content: SITE.description,
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#EDE6D8" },
      { name: "application-name", content: APP_NAME },
      { name: "format-detection", content: "telephone=no" },
      { name: "geo.region", content: SITE.geoRegion },
      { name: "geo.placename", content: SITE.city },
      { name: "geo.position", content: `${SITE.latitude};${SITE.longitude}` },
      { name: "ICBM", content: `${SITE.latitude}, ${SITE.longitude}` },
      ...(siteVerify
        ? [{ name: "google-site-verification", content: siteVerify }]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: SITE.locale },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "sitemap", href: "/sitemap.xml", type: "application/xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en-GB" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <GoogleTags />
      </head>
      <body>
        <GoogleNoscript />
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          theme="light"
          position="bottom-center"
          toastOptions={{
            className: "!bg-ink !text-paper !border-0 !rounded-full !px-5",
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
