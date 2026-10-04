import { Container, SectionIntro } from "@/components/ui/primitives";
import { AskDemo } from "./AskDemo";

export function AskSection({ index = "06" }: { index?: string }) {
  return (
    <section id="ask" aria-labelledby="ask-title" className="relative bg-cream-deep/60 py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionIntro index={index || undefined} eyebrow="Ask SEED U" title={<span id="ask-title">Ask a question the way you would ask a neighbour.</span>}>
            <p>
              Type in Marathi or English, or tap a sample. Watch the question become a clear, step-by-step answer.
            </p>
          </SectionIntro>
          <p className="mt-6 rounded-2xl bg-paper/70 p-4 text-[0.95rem] text-muted ring-1 ring-forest/10">
            <strong className="text-forest">This is a demo.</strong> Answers come from a small set of sample responses stored in this website,
            not from a live AI model. They are general prompts for what to check, not a diagnosis.
          </p>
        </div>
        <AskDemo />
      </Container>
    </section>
  );
}
