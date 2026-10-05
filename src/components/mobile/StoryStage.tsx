"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COPY } from "@/components/home/HeroScene";
import { STEPS as INTEL_STEPS } from "@/components/home/IntelligenceSection";
import { ButtonLink, Eyebrow, Pending, cx } from "@/components/ui/primitives";
import { BEAT_COUNT, ROOTS_BEAT, ROOT_TICKS, StageScene } from "./StageScene";

/**
 * Mobile chapters 01–05 as one story: the farm scene stays pinned while
 * caption cards scroll over it. Each caption block sets the scene's beat as
 * it docks; captions are real text in reading order, the scene is decorative.
 */
export function StoryStage() {
  const [beat, setBeat] = useState(0);
  const story = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setBeat(Number((e.target as HTMLElement).dataset.beat));
        });
      },
      { rootMargin: "-66% 0px -32% 0px" },
    );
    story.current?.querySelectorAll("[data-beat]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    // Pulled up under the transparent header so the sky runs edge to edge.
    <section id="m-question" aria-labelledby="m-hero-title" className="relative -mt-18">
      <div aria-hidden className="absolute inset-0">
        <div className="sticky top-0 h-svh overflow-hidden">
          <StageScene beat={beat} />
        </div>
      </div>

      <div ref={story} className="relative">
        <HeroBeat />

        <Caption beat={1} eyebrow="The question">
          <h2 className="text-[1.65rem] text-forest">Ask in your language.</h2>
          <p className="mt-2 text-muted">
            A farmer describes what they see, in their own words. SEED U is building Indian-language AI, starting with Marathi agriculture.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold text-forest">
            {["Language first", "Agriculture now", "Verified knowledge"].map((p) => (
              <li key={p} className="rounded-full bg-sage-soft px-2.5 py-1">
                {p}
              </li>
            ))}
          </ul>
          <p className="sr-only">
            Example question, in Marathi: <span lang="mr">{COPY.mr.question}</span> ({COPY.mr.translation})
          </p>
        </Caption>

        <Caption beat={2} index="02" eyebrow="The real problem">
          <h2 className="text-[1.5rem] text-forest">Knowledge exists. It just doesn&apos;t reach the farmer in a form they can use.</h2>
          <ul className="mt-3 space-y-1.5 text-[0.95rem] leading-snug text-muted">
            {PROBLEM.map((p) => (
              <li key={p.title} className="flex gap-2.5">
                <span aria-hidden className={cx("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", p.dot)} />
                <span>
                  <strong className="text-forest">{p.title}:</strong> {p.body}
                </span>
              </li>
            ))}
          </ul>
        </Caption>

        <Caption beat={3} index="03" eyebrow="Language">
          <h2 className="text-[1.65rem] text-forest">Many languages. One shared understanding.</h2>
          <p className="mt-2 text-muted">
            We are starting with{" "}
            <span lang="mr" className="font-deva font-semibold text-forest">
              मराठी
            </span>
            , for farmers in Maharashtra. Other Indian languages are part of the long-term vision and are not supported yet.
          </p>
        </Caption>

        <Caption beat={4} index="04" eyebrow="The intelligence layer">
          <h2 className="text-[1.5rem] text-forest">Like roots drawing water, SEED U draws on verified knowledge.</h2>
          <RootSteps on={beat === ROOTS_BEAT} />
        </Caption>

        <Caption beat={5} index="05" eyebrow="Current focus" last>
          <h2 className="text-[1.65rem] text-forest">
            Starting where it matters:{" "}
            <span lang="mr" className="font-deva font-semibold text-leaf">
              मराठी
            </span>{" "}
            agriculture.
          </h2>
          <p className="mt-2 text-muted">
            Guidance for Marathi-speaking farmers in Maharashtra. One community first, so the language, crops and local context are right
            before we expand.
          </p>
          <ButtonLink href="/marathi-agriculture-ai" className="mt-4 w-full justify-center">
            Explore Marathi Agri AI
          </ButtonLink>
          <div className="sr-only">
            Illustrative answer, in Marathi: <span lang="mr">{COPY.mr.answerTitle}</span>
            <ul lang="mr">
              {COPY.mr.answer.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Caption>
      </div>
    </section>
  );
}

/** Opening screen: the headline over the dawn field. Fades as the story starts so it never sits on the first overlay. */
function HeroBeat() {
  const block = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: block, offset: ["start start", "end 68%"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div ref={block} data-beat={0} style={{ opacity: fade }} className="flex min-h-svh flex-col justify-between px-5 pt-24 pb-6">
      <div className="mx-auto w-full max-w-md">
        <Eyebrow index="01">Ask. Understand. Grow.</Eyebrow>
        <h1 id="m-hero-title" className="text-[2.35rem] leading-[1.05] text-forest">
          AI that understands the farmer. <span className="text-leaf italic">Knowledge that helps the farm grow.</span>
        </h1>
        <p className="mt-4 text-lg text-muted">Ask in your language. Get guidance you can act on.</p>
      </div>
      <div className="mx-auto w-full max-w-md">
        <ButtonLink href="#m-ask" className="w-full justify-center">
          Try the demo
        </ButtonLink>
        <Link href="/partners" className="mt-1 flex min-h-11 items-center justify-center gap-2 font-semibold text-forest underline decoration-leaf/40 decoration-2 underline-offset-4">
          Partner with SEED U
        </Link>
        <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted">
          <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 motion-safe:animate-bounce">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Scroll to follow one farmer&apos;s question
        </p>
      </div>
    </motion.div>
  );
}

const PROBLEM = [
  { title: "Knowledge", body: "research and advisories, often in English or formal language.", dot: "bg-sage ring-1 ring-leaf/40" },
  { title: "Language", body: "farmers ask in Marathi, Hindi and local dialects.", dot: "bg-[#f3e7cb] ring-1 ring-turmeric/60" },
  { title: "Access", body: "advice scattered across leaflets, long videos and forwards.", dot: "bg-paper ring-1 ring-forest/30" },
];

/** A caption card that docks at the bottom of the screen, then fades as it scrolls away. */
function Caption({
  beat,
  index,
  eyebrow,
  last = false,
  children,
}: {
  beat: number;
  index?: string;
  eyebrow: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  const block = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: block, offset: ["end end", "end 45%"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={block}
      data-beat={beat}
      className={cx("flex flex-col justify-end px-4 pb-5", beat < BEAT_COUNT - 1 ? "min-h-[90svh]" : "min-h-svh")}
    >
      <motion.div
        style={last ? undefined : { opacity: fade }}
        className="sticky bottom-5 mx-auto w-full max-w-md rounded-[1.75rem] bg-paper/95 p-5 shadow-[0_24px_50px_-30px_rgba(29,58,42,0.7)] ring-1 ring-forest/10 backdrop-blur-md"
      >
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-leaf uppercase">
          {index && <span className="font-display text-sm tracking-normal tabular-nums opacity-70">{index}</span>}
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
          {eyebrow}
        </p>
        {children}
      </motion.div>
    </div>
  );
}

/** The four intelligence steps, ticking off as the roots underground light up. */
function RootSteps({ on }: { on: boolean }) {
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  return (
    <ol className="mt-3 space-y-2">
      {INTEL_STEPS.map((s, i) => {
        const delay = on ? ROOT_TICKS[i] : 0;
        return (
          <li key={s.key} className="flex items-center gap-3">
            <span
              className={cx("relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold", on ? "bg-leaf text-cream" : "bg-sage-soft text-forest")}
              style={{ transition: `background-color 0.4s ${ease} ${delay}s, color 0.4s ${ease} ${delay}s` }}
            >
              <span style={{ opacity: on ? 0 : 1, transition: `opacity 0.3s ${ease} ${delay}s` }}>{i + 1}</span>
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="absolute h-3.5 w-3.5"
                style={{ opacity: on ? 1 : 0, transform: `scale(${on ? 1 : 0.4})`, transition: `opacity 0.4s ${ease} ${delay}s, transform 0.4s ${ease} ${delay}s` }}
              >
                <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-snug font-semibold text-forest">
              {i === 0 ? <Pending note="Confirm dataset sources, languages and verification process.">{s.title}</Pending> : s.title}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
