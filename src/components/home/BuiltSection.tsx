import Link from "next/link";
import { builtItems } from "@/lib/content";
import { Container, Pending, SectionIntro, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function BuiltSection({ index = "08" }: { index?: string }) {
  return (
    <section id="built" aria-labelledby="built-title" className="relative bg-mist py-24 sm:py-32">
      <Container>
        <SectionIntro index={index || undefined} eyebrow="What we have built" title={<span id="built-title">Only what is real. Nothing more.</span>}>
          <p>We will add proof of work here as it is verified. No invented customers, pilots, partners or impact numbers.</p>
        </SectionIntro>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {builtItems.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="flex flex-col rounded-3xl bg-paper p-7 ring-1 ring-forest/10">
              <Tag tone={item.status === "Current focus" ? "soil" : "leaf"}>{item.status}</Tag>
              <h3 className="mt-5 text-2xl text-forest">{item.title}</h3>
              <p className="mt-3 flex-1 text-muted">
                <Pending note={item.pending}>{item.body}</Pending>
              </p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-10">
          <Link href="/what-we-have-built" className="font-semibold text-forest underline decoration-leaf/50 decoration-2 underline-offset-4 hover:decoration-leaf">
            See the full picture of our work so far
          </Link>
        </p>
      </Container>
    </section>
  );
}
