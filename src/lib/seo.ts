import { SITE, programs, faqs, testimonials, type Program } from "./hale-data";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article" | "profile";
};

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
}

export function pageHead({
  title,
  description,
  path,
  image,
  noindex,
  type = "website",
}: PageSeo) {
  const url = absoluteUrl(path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE.url}${image}`
    : `${SITE.url}/og.jpg`;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { name: "googlebot", content: robots },
      { name: "author", content: SITE.name },
      { name: "geo.region", content: SITE.geoRegion },
      { name: "geo.placename", content: SITE.city },
      { name: "geo.position", content: `${SITE.latitude};${SITE.longitude}` },
      { name: "ICBM", content: `${SITE.latitude}, ${SITE.longitude}` },
      { name: "language", content: SITE.language },
      { name: "content-language", content: SITE.language },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:locale", content: SITE.locale },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: title },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en-GB", href: url },
      { rel: "alternate", hrefLang: "x-default", href: url },
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "SportsActivityLocation", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.name,
    url: SITE.url,
    image: [`${SITE.url}/og.jpg`, `${SITE.url}/images/hero.jpg`],
    logo: `${SITE.url}/favicon.svg`,
    description: SITE.description,
    slogan: "A written plan for every day.",
    priceRange: `${SITE.priceMonthly}–${SITE.priceYearly}`,
    currenciesAccepted: "GBP",
    paymentAccepted: "Credit Card, Debit Card",
    availableLanguage: ["en-GB"],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    areaServed: SITE.serviceAreas.map((name) =>
      name.includes("United Kingdom")
        ? { "@type": "Country", name: "United Kingdom" }
        : { "@type": "AdministrativeArea", name },
    ),
    knowsAbout: [
      "Personal training Coventry",
      "Strength and conditioning",
      "Hypertrophy",
      "Online personal training UK",
      "Boxing conditioning",
    ],
    hasMap: "https://maps.google.com/?q=Coventry+United+Kingdom",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "21:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Training programmes",
      itemListElement: programs.map((p, i) => ({
        "@type": "Offer",
        position: i + 1,
        url: `${SITE.url}/programs/${p.slug}`,
        itemOffered: {
          "@type": "Service",
          name: `${p.name} programme`,
          description: p.description,
        },
      })),
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#coach`,
    name: SITE.name,
    jobTitle: "Strength and conditioning coach",
    description:
      "Coventry-based strength and conditioning coach with 14 years of gym-floor experience. Writes every HSK Coaching session.",
    worksFor: { "@id": `${SITE.url}/#business` },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.countryCode,
    },
    knowsAbout: [
      "Personal training",
      "Strength training",
      "Hypertrophy programming",
    ],
    url: `${SITE.url}/about`,
    image: `${SITE.url}/images/marcus-portrait.jpg`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE.url}/#business` },
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: SITE.language,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#business` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "p.pretty"],
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function programSchema(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${program.name} — ${program.style} programme`,
    description: program.description,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "City", name: SITE.city },
    url: `${SITE.url}/programs/${program.slug}`,
    image: `${SITE.url}${program.image}`,
    serviceType: `${program.style} personal training`,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "29",
      url: `${SITE.url}/pricing`,
      availability: "https://schema.org/InStock",
    },
  };
}

export function reviewListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HSK Coaching member reviews",
    itemListElement: testimonials.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: t.name },
        reviewBody: t.quote,
        itemReviewed: { "@id": `${SITE.url}/#business` },
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
