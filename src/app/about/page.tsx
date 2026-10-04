import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Pending, SectionIntro } from "@/components/ui/primitives";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata = pageMetadata({
  title: "About SEED U & Team",
  description:
    "SEED U is building India's AI future in Indian languages, starting with Marathi agriculture. Meet the team: Rihan Khan, Armaan Dalmia and Dr. Rajiv Dalmia.",
  path: "/about",
});

// Names and roles as published on seedu.io.
const TEAM = [
  { name: "Rihan Khan", role: "Founder & CEO", focus: "Ground strategy, data acquisition and execution." },
  { name: "Armaan Dalmia", role: "Co-Founder & Technical Strategy Head", focus: "Communication, networking and turning ideas into working systems." },
  { name: "Dr. Rajiv Dalmia", role: "Chief Mentor & Advisor", focus: "Guiding institutional scaling and corporate governance." },
];

const initials = (name: string) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((p) => p[0])
    .join("");

export default function AboutPage() {
  return (
    <>
      <PageHero
        path="/about"
        crumb="About"
        eyebrow="About SEED U"
        title="AI that truly speaks Indian languages, starting on the farm."
        lede={
          <p>
            SEED U is building a data-first AI ecosystem for Indian languages. We describe it as{" "}
            <Pending note="'India's first' is a priority claim. Confirm evidence before publishing.">India&apos;s first Linguistic OS</Pending>:
            shared language infrastructure that lets technology understand people in the language they speak.
          </p>
        }
      />

      <section aria-labelledby="story-title" className="pb-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="story-title" className="text-4xl text-forest">
              Why we exist
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                Most AI is built English-first. For the many Indians who think, speak and decide in their own languages, that means
                useful technology often arrives late, or not at all.
              </p>
              <p>
                We believe AI for India should begin with Indian languages and with verified knowledge, so answers are both
                understandable and trustworthy.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl text-forest">Why agriculture first</h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                Farming is where clear guidance in one&apos;s own language matters every single day. It is a demanding, honest test for
                language AI, and a place where getting it right helps real people.
              </p>
              <p>We are starting with Marathi agriculture, and designing every layer so more languages and domains can follow.</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="team" aria-labelledby="team-title" className="bg-mist py-24 sm:py-32">
        <Container>
          <SectionIntro eyebrow="Team" title={<span id="team-title">The people behind SEED U</span>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <li key={m.name} className="rounded-3xl bg-paper p-7 ring-1 ring-forest/10">
                <span
                  aria-hidden
                  className="flex h-20 w-20 items-center justify-center bg-sage-soft font-display text-2xl text-forest"
                  style={{ borderRadius: ["58% 42% 55% 45% / 50% 55% 45% 50%", "45% 55% 42% 58% / 55% 45% 55% 45%", "52% 48% 60% 40% / 45% 58% 42% 55%"][i] }}
                >
                  {initials(m.name)}
                </span>
                <h3 className="mt-6 text-2xl text-forest">{m.name}</h3>
                <p className="text-sm font-semibold tracking-wide text-leaf uppercase">{m.role}</p>
                <p className="mt-3 text-muted">{m.focus}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection index="" />
    </>
  );
}
