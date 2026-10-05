"use client";

import { useEffect, useRef, useState } from "react";
import { Container, SectionIntro, cx } from "@/components/ui/primitives";
import { Lottie } from "@/components/ui/Lottie";

export const STEPS = [
  {
    title: "Check the crop",
    body: "Look closely. Which leaves changed first? Are there spots or insects? Careful observation is the start of every good decision.",
  },
  {
    title: "Observe the soil",
    body: "Too wet, too dry, cracked or crusted? The soil often explains what the leaves are showing.",
  },
  {
    title: "Consider the weather",
    body: "Recent rain, heat or cold changes what makes sense to do next. SEED U does not provide live weather data today.",
  },
  {
    title: "Plan the next action",
    body: "Decide what to do, what to wait on, and who to confirm with: your KVK or agriculture officer when in doubt.",
  },
];

// Frames in public/lottie/corn-growing.json (see scripts/build-lottie.mjs).
export const STAGE_FRAMES = [16, 29, 42, 68];
export const STAGE_LABELS = ["Uncertainty", "Knowledge", "Action", "Growth"];
export const FIELD = ["#ddd2a6", "#cfd3a0", "#bcd197", "#a6c98b"];

/** Uncertainty → knowledge → action → growth. The corn grows one stage per step. */
function GrowingPlant({ stage, autoplay = false }: { stage: number; autoplay?: boolean }) {
  return (
    <div className="relative aspect-[10/11] overflow-hidden rounded-[2.25rem] bg-mist ring-1 ring-forest/10">
      <div aria-hidden className="absolute -inset-x-[15%] -bottom-[8%] h-[18%] rounded-[50%] transition-colors duration-1000" style={{ backgroundColor: FIELD[stage] }} />
      <Lottie
        src="/lottie/corn-growing.json"
        frame={autoplay ? undefined : STAGE_FRAMES[stage]}
        segment={autoplay ? [0, STAGE_FRAMES[3]] : undefined}
        className="absolute inset-x-[4%] top-[10%] bottom-[2%]"
      />
      <p className="absolute top-6 left-7 text-sm font-semibold tracking-[0.14em] text-muted uppercase">
        <span className="sr-only">Stage: </span>
        {STAGE_LABELS[stage]}
      </p>
    </div>
  );
}

export function ActionSection({ index = "07" }: { index?: string }) {
  const [stage, setStage] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="action" aria-labelledby="action-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionIntro index={index || undefined} eyebrow="From answer to action" title={<span id="action-title">A good answer is only useful if it leads to a good decision.</span>}>
          <p>Guidance becomes a short sequence the farmer can follow. Illustrative example, continuing the yellow-leaf question.</p>
        </SectionIntro>

        <div className="mx-auto mt-12 max-w-sm lg:hidden">
          <GrowingPlant stage={3} autoplay />
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <GrowingPlant stage={stage} />
            </div>
          </div>
          <ol className="space-y-4 lg:space-y-0">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className="lg:flex lg:min-h-[62vh] lg:items-center"
              >
                <div
                  className={cx(
                    "w-full rounded-3xl p-6 ring-1 transition-[background-color,box-shadow,opacity] duration-500 sm:p-8",
                    stage === i ? "bg-paper shadow-[0_30px_60px_-40px_rgba(29,58,42,0.55)] ring-forest/15" : "bg-mist/60 ring-transparent lg:opacity-60",
                  )}
                >
                  <span className="font-display text-5xl text-leaf/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-3xl text-forest">{step.title}</h3>
                  <p className="mt-3 text-lg text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
