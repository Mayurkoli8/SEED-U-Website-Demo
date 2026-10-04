import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { HeroScene } from "./HeroScene";

const POINTS = [
  { title: "Language first", body: "Built for Indian languages" },
  { title: "Agriculture now", body: "Marathi farmers first" },
  { title: "Verified knowledge", body: "Answers grounded in checked sources" },
];

export function Hero() {
  return (
    <section id="question" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="grain absolute inset-0 bg-gradient-to-b from-cream via-paper to-paper" />
      <Container className="relative grid gap-12 pt-8 pb-20 sm:pt-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:pt-16 lg:pb-28">
        <div>
          <Eyebrow index="01">Ask. Understand. Grow.</Eyebrow>
          <h1 id="hero-title" className="text-[2.75rem] text-forest sm:text-6xl lg:text-[4.25rem]">
            AI that understands the farmer.{" "}
            <span className="text-leaf italic">Knowledge that helps the farm grow.</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl text-muted">
            Ask in your language. Get guidance you can act on. SEED U is building Indian-language AI, starting with Marathi agriculture.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#ask">Try the demo</ButtonLink>
            <ButtonLink href="/partners" variant="ghost">
              Partner with SEED U
            </ButtonLink>
          </div>
          <ul className="mt-12 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            {POINTS.map((p) => (
              <li key={p.title} className="border-l-2 border-leaf/40 pl-4">
                <p className="font-semibold text-forest">{p.title}</p>
                <p className="text-[0.95rem] leading-snug text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <HeroScene />
      </Container>
    </section>
  );
}
