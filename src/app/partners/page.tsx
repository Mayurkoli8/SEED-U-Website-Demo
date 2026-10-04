import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, Container, SectionIntro } from "@/components/ui/primitives";
import { PartnersSection } from "@/components/home/PartnersSection";

export const metadata = pageMetadata({
  title: "Partner with SEED U",
  description:
    "SEED U wants to work with KVKs, FPOs and FPCs, farmer-facing organisations, research institutions, NGOs and technology partners on Indian-language agricultural AI.",
  path: "/partners",
});

const STEPS = [
  { title: "Start a conversation", body: "Tell us who you work with and the questions they struggle to get answered." },
  { title: "Define a shared problem", body: "Agree on one specific, useful question area, such as a crop, a season or a region." },
  { title: "Design carefully", body: "Decide together what knowledge is verified, how answers are checked and how success is measured." },
  { title: "Build and learn", body: "Build in small steps, with farmers and experts reviewing what works." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        path="/partners"
        crumb="For partners"
        eyebrow="For partners"
        title="Partner with SEED U."
        lede={<p>Better agricultural guidance in Indian languages needs people who know farmers, crops, regions and data. We are looking for them.</p>}
      >
        <div className="mt-9">
          <ButtonLink href="/contact?type=partnership">Start a conversation</ButtonLink>
        </div>
      </PageHero>

      <PartnersSection index="" showCta={false} />

      <section aria-labelledby="how-title" className="bg-mist py-24 sm:py-32">
        <Container>
          <SectionIntro eyebrow="How it could work" title={<span id="how-title">A simple, careful path to working together.</span>} />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-paper p-7 ring-1 ring-forest/10">
                <span className="font-display text-4xl text-leaf/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl text-forest">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="investors-title" className="py-24">
        <Container className="grid gap-8 rounded-[2rem] bg-forest p-8 text-cream sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h2 id="investors-title" className="text-4xl">
              For investors
            </h2>
            <p className="mt-4 text-lg text-sage-soft/95">
              SEED U is an early-stage company building India-first language AI. If you back infrastructure for Bharat, we would be glad to
              share more about our work and plans.
            </p>
          </div>
          <div className="lg:text-right">
            <ButtonLink href="/contact?type=investment" variant="light">
              Talk to the founders
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
