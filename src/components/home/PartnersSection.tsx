import { partnerTypes } from "@/lib/content";
import { ButtonLink, Container, SectionIntro } from "@/components/ui/primitives";
import { PartnerIcon } from "@/components/ui/PartnerIcon";
import { Reveal } from "@/components/ui/Reveal";

export function PartnersSection({ showCta = true, index = "09" }: { showCta?: boolean; index?: string }) {
  return (
    <section id="partners" aria-labelledby="partners-title" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro index={index || undefined} eyebrow="Partners" title={<span id="partners-title">Good answers grow from many roots.</span>}>
            <p>No single organisation holds all the knowledge farmers need. These are the people we want to build with.</p>
          </SectionIntro>
          {showCta && (
            <ButtonLink href="/partners" variant="ghost" className="self-start lg:self-auto">
              How we could work together
            </ButtonLink>
          )}
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-forest/10 ring-1 ring-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 0.06} className="group bg-paper p-7 transition-colors duration-500 hover:bg-mist">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest transition-transform duration-500 group-hover:-rotate-6">
                <PartnerIcon icon={p.icon} />
              </span>
              <h3 className="mt-5 text-2xl text-forest">{p.title}</h3>
              <p className="text-sm font-semibold tracking-wide text-leaf uppercase">{p.short}</p>
              <p className="mt-3 text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-[0.95rem] text-muted">
          These are the kinds of organisations we would like to work with. Listing them here does not mean a partnership exists.
        </p>
      </Container>
    </section>
  );
}
