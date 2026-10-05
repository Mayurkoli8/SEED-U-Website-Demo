import Link from "next/link";
import { builtItems, partnerTypes } from "@/lib/content";
import { AskDemo } from "@/components/home/AskDemo";
import { ButtonLink, Eyebrow, Pending, Tag } from "@/components/ui/primitives";
import { PartnerIcon } from "@/components/ui/PartnerIcon";
import { SwipeCards } from "./SwipeCards";

/** Mobile chapter intro: eyebrow, title and a short line, in a phone-width column. */
function Intro({ index, eyebrow, id, title, tone = "dark", children }: { index: string; eyebrow: string; id: string; title: React.ReactNode; tone?: "dark" | "light"; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md px-5">
      <Eyebrow index={index} tone={tone}>
        {eyebrow}
      </Eyebrow>
      <h2 id={id} className={tone === "dark" ? "text-[2rem] text-forest" : "text-[2rem] text-cream"}>
        {title}
      </h2>
      {children && <div className={tone === "dark" ? "mt-4 text-muted" : "mt-4 text-sage-soft/90"}>{children}</div>}
    </div>
  );
}

export function MobileAsk() {
  return (
    <section id="m-ask" aria-labelledby="m-ask-title" className="relative bg-cream-deep/60 pt-16 pb-14">
      <Intro index="06" eyebrow="Ask SEED U" id="m-ask-title" title="Ask a question the way you would ask a neighbour.">
        <p>Type in Marathi or English, or tap a sample.</p>
      </Intro>
      <div className="mx-auto mt-6 max-w-md px-3">
        <AskDemo />
        <p className="mt-4 px-2 text-sm text-muted">
          <strong className="text-forest">This is a demo.</strong> Answers come from a small set of sample responses stored in this website,
          not from a live AI model. They are general prompts for what to check, not a diagnosis.
        </p>
      </div>
    </section>
  );
}

export function MobileBuilt() {
  return (
    <section id="m-built" aria-labelledby="m-built-title" className="relative bg-mist pt-16 pb-12">
      <Intro index="08" eyebrow="What we have built" id="m-built-title" title="Only what is real. Nothing more.">
        <p>We will add proof of work here as it is verified. No invented customers, pilots, partners or impact numbers.</p>
      </Intro>
      <div className="mx-auto mt-8 max-w-2xl">
        <SwipeCards label="What we have built">
          {builtItems.map((item) => (
            <article key={item.title} className="flex w-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-forest/10">
              <div>
                <Tag tone={item.status === "Current focus" ? "soil" : "leaf"}>{item.status}</Tag>
              </div>
              <h3 className="mt-4 text-[1.5rem] text-forest">{item.title}</h3>
              <p className="mt-3 flex-1 text-muted">
                <Pending note={item.pending}>{item.body}</Pending>
              </p>
            </article>
          ))}
        </SwipeCards>
      </div>
      <p className="mx-auto mt-4 max-w-md px-5">
        <Link href="/what-we-have-built" className="font-semibold text-forest underline decoration-leaf/50 decoration-2 underline-offset-4">
          See the full picture of our work so far
        </Link>
      </p>
    </section>
  );
}

export function MobilePartners() {
  return (
    <section id="m-partners" aria-labelledby="m-partners-title" className="relative pt-16 pb-12">
      <Intro index="09" eyebrow="Partners" id="m-partners-title" title="Good answers grow from many roots.">
        <p>No single organisation holds all the knowledge farmers need. These are the people we want to build with.</p>
      </Intro>
      <div className="mx-auto mt-8 max-w-2xl">
        <SwipeCards label="Partner types">
          {partnerTypes.map((p) => (
            <article key={p.title} className="flex w-full flex-col rounded-3xl bg-mist p-6 ring-1 ring-forest/10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                <PartnerIcon icon={p.icon} />
              </span>
              <h3 className="mt-4 text-[1.5rem] text-forest">{p.title}</h3>
              <p className="text-sm font-semibold tracking-wide text-leaf uppercase">{p.short}</p>
              <p className="mt-3 text-muted">{p.body}</p>
            </article>
          ))}
        </SwipeCards>
      </div>
      <div className="mx-auto max-w-md px-5">
        <p className="mt-2 text-[0.95rem] text-muted">
          These are the kinds of organisations we would like to work with. Listing them here does not mean a partnership exists.
        </p>
        <ButtonLink href="/partners" variant="ghost" className="mt-6 w-full justify-center">
          How we could work together
        </ButtonLink>
      </div>
    </section>
  );
}

export function MobileClose() {
  return (
    <section id="m-join" aria-labelledby="m-join-title" className="relative overflow-hidden px-5 pt-20 pb-16">
      <svg aria-hidden viewBox="0 0 800 400" className="pointer-events-none absolute -right-48 -bottom-10 w-[34rem] text-sage-soft">
        <path d="M400 380C400 250 320 150 160 120c10 150 110 240 240 260Zm0 0C400 250 480 150 640 120c-10 150-110 240-240 260Z" fill="currentColor" />
      </svg>
      <div className="relative mx-auto max-w-md">
        <Eyebrow index="11">Build with us</Eyebrow>
        <h2 id="m-join-title" className="text-[2.75rem] leading-[1.02] text-forest">
          Build for Bharat with us.
        </h2>
        <p className="mt-5 text-lg text-muted">
          If you work with farmers, languages or agricultural knowledge, or want to back India-first AI, we would like to hear from you.
        </p>
        <div className="mt-8 grid gap-3">
          <ButtonLink href="/partners" className="w-full justify-between">
            Partner with SEED U
          </ButtonLink>
          <ButtonLink href="/what-we-have-built" variant="ghost" className="w-full justify-between bg-paper/70">
            Explore the work
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" className="w-full justify-between bg-paper/70">
            Contact us
          </ButtonLink>
        </div>
        <p className="mt-12 font-display text-xl text-forest/80 italic">
          A question becomes knowledge. Knowledge becomes action. Action helps the farm grow.
        </p>
      </div>
    </section>
  );
}
