import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Pending, SectionIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { IntelligenceSection } from "@/components/home/IntelligenceSection";
import { LanguageSection } from "@/components/home/LanguageSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata = pageMetadata({
  title: "What We Do: Indian-Language AI Platform",
  description:
    "How SEED U works: verified multilingual knowledge, retrieval and context, and clear answers in Indian languages, starting with Marathi agriculture.",
  path: "/platform",
});

const LAYERS = [
  {
    title: "A linguistic foundation",
    body: "Verified, multilingual data for Indian languages. Meaning, not just translation.",
    pending: "Confirm dataset scope and current status.",
  },
  {
    title: "An intelligence layer",
    body: "Retrieval and context that ground every answer in checked sources, designed to minimise hallucination.",
  },
  {
    title: "Focused applications",
    body: "Practical tools built on top, starting with agricultural guidance for Marathi-speaking farmers.",
  },
];

const PRINCIPLES = [
  { title: "Verified before clever", body: "An answer is only as good as its source. We start from knowledge that has been checked." },
  { title: "Language is the interface", body: "People should not have to switch to English to get help. The system meets them in their language." },
  { title: "Honest about limits", body: "We say clearly what the product does today, what is planned, and what is still a vision." },
  { title: "People stay in the loop", body: "Guidance supports a farmer's decision. Local experts like KVKs and agriculture officers remain essential." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        path="/platform"
        crumb="What we do"
        eyebrow="What we do"
        title="Indian-language AI that turns questions into guidance people can use."
        lede={<p>SEED U is building a data-first intelligence layer for Indian languages, and applying it first where clear answers matter every day: the farm.</p>}
      />

      <section aria-labelledby="layers-title" className="pb-24">
        <Container>
          <h2 id="layers-title" className="sr-only">
            The three layers of SEED U
          </h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {LAYERS.map((l, i) => (
              <Reveal as="li" key={l.title} delay={i * 0.08} className="rounded-3xl bg-mist p-7 ring-1 ring-forest/10">
                <span className="font-display text-4xl text-leaf/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl text-forest">{l.title}</h3>
                <p className="mt-3 text-muted">{l.pending ? <Pending note={l.pending}>{l.body}</Pending> : l.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <IntelligenceSection index="" />
      <LanguageSection index="" />

      <section aria-labelledby="principles-title" className="py-24 sm:py-32">
        <Container>
          <SectionIntro eyebrow="Principles" title={<span id="principles-title">How we build</span>} />
          <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t border-forest/15 pt-5">
                <h3 className="text-2xl text-forest">{p.title}</h3>
                <p className="mt-2 text-lg text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection index="" />
    </>
  );
}
