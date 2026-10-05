"use client";

import { useEffect, useRef, useState } from "react";
import { FIELD, STAGE_FRAMES, STAGE_LABELS, STEPS } from "@/components/home/ActionSection";
import { Lottie } from "@/components/ui/Lottie";
import { Eyebrow, cx } from "@/components/ui/primitives";

/** 07 on phones: the corn stays pinned under the header and grows one stage per step scrolling beneath it. */
export function MobileAction() {
  const [stage, setStage] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-70% 0px -28% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="m-action" aria-labelledby="m-action-title" className="relative pt-16 pb-8">
      <div className="mx-auto max-w-md px-5">
        <Eyebrow index="07">From answer to action</Eyebrow>
        <h2 id="m-action-title" className="text-[2rem] text-forest">
          A good answer is only useful if it leads to a good decision.
        </h2>
        <p className="mt-4 text-muted">Guidance becomes a short sequence the farmer can follow. Illustrative example, continuing the yellow-leaf question.</p>
      </div>

      <div className="sticky top-18 z-10 mt-5 bg-paper px-4 pt-3 pb-2">
        <div className="relative mx-auto h-[34svh] max-w-md overflow-hidden rounded-[1.75rem] bg-mist ring-1 ring-forest/10">
          <div aria-hidden className="absolute -inset-x-[15%] -bottom-[10%] h-[20%] rounded-[50%] transition-colors duration-1000" style={{ backgroundColor: FIELD[stage] }} />
          <Lottie src="/lottie/corn-growing.json" frame={STAGE_FRAMES[stage]} className="absolute inset-x-[12%] top-[14%] bottom-[2%]" />
          <p className="absolute top-4 left-5 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
            <span className="sr-only">Stage: </span>
            {STAGE_LABELS[stage]}
          </p>
          <div aria-hidden className="absolute top-5 right-5 flex gap-1">
            {STEPS.map((s, i) => (
              <span key={s.title} className={cx("h-1.5 w-5 rounded-full transition-colors duration-500", i <= stage ? "bg-leaf" : "bg-forest/15")} />
            ))}
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-paper to-transparent" />
      </div>

      <ol className="mx-auto max-w-md px-4">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            ref={(el) => {
              steps.current[i] = el;
            }}
            data-step={i}
            className="flex min-h-[44svh] items-center py-3"
          >
            <div
              className={cx(
                "w-full rounded-3xl p-6 ring-1 transition-[background-color,box-shadow,opacity] duration-500",
                stage === i ? "bg-paper shadow-[0_30px_60px_-40px_rgba(29,58,42,0.55)] ring-forest/15" : "bg-mist/60 opacity-55 ring-transparent",
              )}
            >
              <span className="font-display text-4xl text-leaf/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-[1.6rem] text-forest">{step.title}</h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
