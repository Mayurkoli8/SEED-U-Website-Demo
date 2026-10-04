import type { Metadata } from "next";
import { site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  noIndex?: boolean;
  type?: "website" | "article";
};

/** Unique title, description, canonical, Open Graph and X metadata for a page. */
export function pageMetadata({ title, description, path, noIndex, type = "website" }: PageMeta): Metadata {
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    sameAs: [site.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}
