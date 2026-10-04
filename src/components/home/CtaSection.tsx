import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";

export function CtaSection({ index = "11" }: { index?: string }) {
  return (
    <section id="join" aria-labelledby="join-title" className="relative overflow-hidden py-24 sm:py-32">
      <svg aria-hidden viewBox="0 0 800 400" className="pointer-events-none absolute -right-40 -bottom-24 w-[46rem] text-sage-soft">
        <path d="M400 380C400 250 320 150 160 120c10 150 110 240 240 260Zm0 0C400 250 480 150 640 120c-10 150-110 240-240 260Z" fill="currentColor" />
      </svg>
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow index={index || undefined}>Build with us</Eyebrow>
          <h2 id="join-title" className="text-5xl text-forest sm:text-6xl lg:text-7xl">
            Build for Bharat with us.
          </h2>
          <p className="mt-6 text-xl text-muted">
            If you work with farmers, languages or agricultural knowledge, or want to back India-first AI, we would like to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/partners">Partner with SEED U</ButtonLink>
            <ButtonLink href="/what-we-have-built" variant="ghost">
              Explore the work
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact us
            </ButtonLink>
          </div>
          <p className="mt-14 font-display text-2xl text-forest/80 italic">
            A question becomes knowledge. Knowledge becomes action. Action helps the farm grow.
          </p>
        </div>
      </Container>
    </section>
  );
}
