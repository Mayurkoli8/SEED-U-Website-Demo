"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container, SectionIntro, cx } from "@/components/ui/primitives";

const STEPS = [
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

const ease = [0.22, 1, 0.36, 1] as const;

/** Uncertainty → knowledge → action → growth. The plant grows one stage per step. */
function GrowingPlant({ stage }: { stage: number }) {
  const field = ["#d8cc9c", "#c9cf98", "#b4cc8e", "#9dc282"][stage];
  return (
    <svg viewBox="0 0 400 440" className="w-full" aria-hidden>
      <rect width="400" height="440" rx="36" fill="#eef2e8" />
      <motion.path d="M0 300 Q 200 280 400 300 V 440 H0Z" initial={false} animate={{ fill: field }} transition={{ duration: 1, ease }} />
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1={200 + i * 14}
          y1={298}
          x2={200 + i * 80}
          y2={440}
          strokeWidth="6"
          strokeLinecap="round"
          initial={false}
          animate={{ stroke: stage >= 2 ? "#6fa65a" : "#bfb27a" }}
          transition={{ duration: 1, delay: Math.abs(i) * 0.05, ease }}
        />
      ))}
      <ellipse cx="200" cy="330" rx="56" ry="13" fill="#8a6a4a" opacity="0.6" />
      <motion.path
        d="M200 330 C 200 290, 206 240, 198 200 C 192 170, 204 130, 200 96"
        fill="none"
        stroke="#3f7d33"
        strokeWidth="6"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: [0.18, 0.45, 0.72, 1][stage] }}
        transition={{ duration: 1.1, ease }}
      />
      {[
        { d: "M201 300 C 186 278, 160 274, 146 284 C 160 304, 186 308, 201 300Z", ox: 1, oy: 0.8, at: 0 },
        { d: "M201 288 C 214 264, 240 258, 256 266 C 242 290, 216 296, 201 288Z", ox: 0, oy: 0.85, at: 0 },
        { d: "M200 236 C 180 210, 148 206, 130 220 C 148 244, 180 248, 200 236Z", ox: 1, oy: 0.75, at: 1 },
        { d: "M200 222 C 218 194, 252 188, 272 200 C 254 228, 222 234, 200 222Z", ox: 0, oy: 0.8, at: 1 },
        { d: "M199 168 C 182 146, 154 142, 140 154 C 156 176, 182 180, 199 168Z", ox: 1, oy: 0.75, at: 2 },
        { d: "M200 156 C 214 132, 242 126, 258 136 C 244 160, 218 166, 200 156Z", ox: 0, oy: 0.8, at: 2 },
      ].map((leaf, i) => (
        <motion.path
          key={i}
          d={leaf.d}
          fill={i % 2 ? "#4b8a3b" : "#74a95c"}
          initial={false}
          animate={{ scale: stage >= leaf.at ? 1 : 0, opacity: stage >= leaf.at ? 1 : 0 }}
          style={{ originX: leaf.ox, originY: leaf.oy }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        />
      ))}
      <motion.g initial={false} animate={{ scale: stage >= 3 ? 1 : 0, opacity: stage >= 3 ? 1 : 0 }} style={{ originX: 0.5, originY: 0.5 }} transition={{ duration: 0.9, delay: 0.6, ease }}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="200" cy="80" rx="9" ry="18" fill="#d6a03f" transform={`rotate(${r} 200 96) translate(0 -2)`} />
        ))}
        <circle cx="200" cy="96" r="9" fill="#8a6a4a" />
      </motion.g>
      <text x="24" y="44" fill="#55665a" fontSize="15" fontWeight="600" letterSpacing="1.5">
        {["UNCERTAINTY", "KNOWLEDGE", "ACTION", "GROWTH"][stage]}
      </text>
    </svg>
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

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[2.25rem]">
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
