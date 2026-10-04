import { pageMetadata } from "@/lib/seo";
import { builtItems, horizons } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Pending, SectionIntro, Tag } from "@/components/ui/primitives";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata = pageMetadata({
  title: "What We Have Built",
  description:
    "An honest account of SEED U's work so far: verified multilingual data, retrieval designed to minimise hallucination, and Marathi agriculture as the first use case.",
  path: "/what-we-have-built",
});

const STANDARDS = [
  "We only list work that exists and that SEED U has approved for publication.",
  "We never invent users, customers, pilots, partners, funding or impact numbers.",
  "Statistics carry a source, or they are not published.",
  "Demos are labelled as demos. Plans are labelled as plans.",
];

export default function BuiltPage() {
  return (
    <>
      <PageHero
        path="/what-we-have-built"
        crumb="What we have built"
        eyebrow="Proof of work"
        title="What we have built, honestly."
        lede={<p>Our work so far, and how we separate current work from plans and long-term vision.</p>}
      />

      <section aria-labelledby="work-title" className="pb-24">
        <Container>
          <h2 id="work-title" className="text-4xl text-forest">
            Current work
          </h2>
          <ul className="mt-10 space-y-5">
            {builtItems.map((item) => (
              <li key={item.title} className="grid gap-4 rounded-3xl bg-mist p-7 ring-1 ring-forest/10 md:grid-cols-[12rem_1fr] md:gap-8">
                <div>
                  <Tag tone={item.status === "Current focus" ? "soil" : "leaf"}>{item.status}</Tag>
                </div>
                <div>
                  <h3 className="text-2xl text-forest">{item.title}</h3>
                  <p className="mt-2 text-lg text-muted">
                    <Pending note={item.pending}>{item.body}</Pending>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-3xl border-2 border-dashed border-forest/20 p-7 text-center text-muted">
            Space for verified milestones, demos and publications as SEED U approves them.
          </div>
        </Container>
      </section>

      <section aria-labelledby="horizon-title" className="bg-forest py-24 text-cream">
        <Container>
          <SectionIntro tone="light" eyebrow="Now, next, later" title={<span id="horizon-title">Current work, planned work and vision, kept apart.</span>} />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {horizons.map((h) => (
              <li key={h.when} className="rounded-3xl bg-forest-soft p-7 ring-1 ring-sage/20">
                <p className="font-display text-3xl text-turmeric">{h.when}</p>
                <p className="mt-1 text-sm font-semibold tracking-wide text-sage uppercase">{h.label}</p>
                <p className="mt-4 text-lg text-sage-soft/95">{h.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="standards-title" className="py-24">
        <Container>
          <SectionIntro eyebrow="Our standard" title={<span id="standards-title">What you will never find on this page</span>} />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {STANDARDS.map((s) => (
              <li key={s} className="flex gap-3 rounded-2xl bg-paper p-5 text-lg ring-1 ring-forest/10">
                <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-leaf" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection index="" />
    </>
  );
}
