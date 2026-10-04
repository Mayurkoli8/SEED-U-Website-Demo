import Link from "next/link";
import { Container, Eyebrow } from "./primitives";
import { JsonLd } from "./JsonLd";
import { site } from "@/lib/site";

export function PageHero({
  eyebrow,
  title,
  lede,
  path,
  crumb,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  path: string;
  crumb: string;
  children?: React.ReactNode;
}) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: crumb, item: `${site.url}${path}` },
    ],
  };
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grain absolute inset-0 bg-gradient-to-b from-cream to-paper" />
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -top-10 -right-24 w-[26rem] text-sage-soft/70 sm:w-[34rem]">
        <path d="M200 380c0-130-60-230-180-260 0 150 70 240 180 260Zm0 0c0-130 60-230 180-260 0 150-70 240-180 260Z" fill="currentColor" />
      </svg>
      <Container className="relative pt-10 pb-16 sm:pt-16 sm:pb-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-forest hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-forest">
              {crumb}
            </li>
          </ol>
        </nav>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-5xl text-forest sm:text-6xl lg:text-7xl">{title}</h1>
        {lede && <div className="mt-6 max-w-2xl text-xl text-muted">{lede}</div>}
        {children}
      </Container>
      <JsonLd data={breadcrumbs} />
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-lg text-ink/90 [&_a]:font-semibold [&_a]:text-forest [&_a]:underline [&_a]:decoration-leaf/50 [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:text-3xl [&_h2]:text-forest [&_h3]:pt-2 [&_h3]:text-2xl [&_h3]:text-forest [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
      {children}
    </div>
  );
}
