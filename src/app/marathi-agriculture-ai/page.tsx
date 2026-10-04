import { pageMetadata } from "@/lib/seo";
import { samples } from "@/lib/ask";
import { PageHero } from "@/components/ui/PageHero";
import { Container, SectionIntro } from "@/components/ui/primitives";
import { AskSection } from "@/components/home/AskSection";
import { ActionSection } from "@/components/home/ActionSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata = pageMetadata({
  title: "Marathi Agriculture AI",
  description:
    "SEED U's current focus: agricultural guidance for Marathi-speaking farmers in Maharashtra. Ask in Marathi, get clear steps you can act on.",
  path: "/marathi-agriculture-ai",
});

const WILL = [
  "Understand questions asked in everyday Marathi",
  "Explain what to check on the crop and in the soil",
  "Give clear, step-by-step guidance in Marathi",
  "Point farmers to local experts such as KVKs when a decision needs confirmation",
];

const NOT_TODAY = [
  "Live weather forecasts",
  "Disease detection from photos",
  "Soil testing or analysis",
  "Market or mandi prices",
];

export default function MarathiAgriculturePage() {
  return (
    <>
      <PageHero
        path="/marathi-agriculture-ai"
        crumb="Marathi Agriculture AI"
        eyebrow="Current use case"
        title={
          <>
            Marathi Agriculture AI. <span lang="mr" className="font-deva font-semibold text-leaf">शेतकऱ्यांसाठी, मराठीत.</span>
          </>
        }
        lede={<p>Agricultural guidance for Marathi-speaking farmers in Maharashtra, asked the way farmers actually speak.</p>}
      />

      <section aria-labelledby="why-title" className="pb-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="why-title" className="text-4xl text-forest">
              Why Marathi, and why agriculture?
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                Farming decisions are made every day, often with incomplete information. Much of the useful knowledge exists, but not in
                the language, format or moment a farmer needs it.
              </p>
              <p>
                Marathi is the language of Maharashtra&apos;s farmers. Starting with one language and one sector lets us get the
                vocabulary, crops and local context right, and earn trust, before expanding.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-forest">Questions farmers might ask</h2>
            <p className="mt-2 text-muted">Illustrative examples.</p>
            <ul className="mt-5 space-y-3">
              {samples.map((s) => (
                <li key={s.id} className="rounded-2xl bg-mist p-4 ring-1 ring-forest/10">
                  <p lang="mr" className="font-deva text-lg font-medium text-forest">
                    {s.mr.question}
                  </p>
                  <p className="text-[0.95rem] text-muted">{s.en.question}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="scope-title" className="bg-mist py-24">
        <Container>
          <SectionIntro eyebrow="Honest scope" title={<span id="scope-title">What it is designed to do, and what it does not do today.</span>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-paper p-7 ring-1 ring-forest/10">
              <h3 className="text-2xl text-forest">Designed to</h3>
              <ul className="mt-4 space-y-3">
                {WILL.map((w) => (
                  <li key={w} className="flex gap-3 text-lg text-ink/90">
                    <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-leaf" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-paper p-7 ring-1 ring-forest/10">
              <h3 className="text-2xl text-forest">Not supported today</h3>
              <ul className="mt-4 space-y-3">
                {NOT_TODAY.map((w) => (
                  <li key={w} className="flex gap-3 text-lg text-muted">
                    <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-soil/60" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">We will only add these if and when the product genuinely supports them.</p>
            </div>
          </div>
        </Container>
      </section>

      <AskSection index="" />
      <ActionSection index="" />
      <CtaSection index="" />
    </>
  );
}
