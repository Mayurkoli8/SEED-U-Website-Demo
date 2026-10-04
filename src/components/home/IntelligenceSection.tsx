"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container, Pending, SectionIntro, cx } from "@/components/ui/primitives";
import { MOTION_OK, gsap, useScrollScene } from "@/lib/gsap";

const STEPS = [
  {
    key: "data",
    title: "Verified knowledge",
    plain: "It starts from checked sources, not random internet text.",
    tech: "Curated, verified multilingual datasets.",
  },
  {
    key: "retrieval",
    title: "Find what matters",
    plain: "When a question arrives, the system looks up the most relevant pieces of that knowledge.",
    tech: "Retrieval over the verified corpus.",
  },
  {
    key: "context",
    title: "Understand the situation",
    plain: "It takes the language, the crop and what the farmer described into account.",
    tech: "Context assembly across languages.",
  },
  {
    key: "answer",
    title: "Answer clearly",
    plain: "It replies in the farmer's language with steps they can act on.",
    tech: "Grounded generation, designed to minimise hallucination.",
  },
] as const;

type Key = (typeof STEPS)[number]["key"];

// Roots: data nodes (deep) → retrieval → context → answer (the sprout above ground).
const DATA_NODES = [
  [70, 470], [140, 500], [200, 455], [290, 470], [350, 505], [420, 460],
] as const;
const NODE_POS: Record<Key, [number, number]> = { data: [240, 470], retrieval: [240, 330], context: [240, 205], answer: [240, 92] };
const ROOTS = [
  ...DATA_NODES.map(([x, y]) => `M${x} ${y} C ${x} ${y - 70}, ${240 + (x - 240) * 0.3} 380, 240 330`),
  "M240 330 C 228 290, 252 250, 240 205",
  "M240 205 C 232 160, 246 125, 240 92",
];
const FINE_ROOTS = [
  "M240 330 C 300 340, 360 330, 420 360",
  "M240 330 C 180 345, 120 340, 60 370",
  "M240 205 C 300 220, 340 240, 380 236",
  "M240 205 C 190 222, 150 230, 110 228",
];

export function IntelligenceSection({ index = "04" }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Key>("data");

  useScrollScene(ref, (mm, el) => {
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector("[data-roots]"), start: "top 85%", end: "center 50%", scrub: 0.8 },
      });
      tl.fromTo(el.querySelectorAll("[data-root]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.08, duration: 1 });
      tl.fromTo(el.querySelectorAll("[data-fine]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.05, duration: 0.6 }, 0.3);
      tl.fromTo(el.querySelectorAll("[data-node]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, stagger: 0.12, duration: 0.4 }, 0.2);
      tl.fromTo(el.querySelector("[data-sprout]"), { scale: 0.2, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.6 }, 0.9);
    });
  });

  return (
    <section ref={ref} id="intelligence" aria-labelledby="intelligence-title" className="relative bg-mist py-24 sm:py-32">
      <Container>
        <SectionIntro
          index={index || undefined}
          eyebrow="The intelligence layer"
          title={<span id="intelligence-title">Like roots drawing water, SEED U draws on verified knowledge.</span>}
        >
          <p>Four simple steps turn a farmer&apos;s question into an answer they can trust. No jargon required.</p>
        </SectionIntro>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div data-roots className="relative mx-auto w-full max-w-md">
            <svg viewBox="0 0 480 540" className="w-full" aria-hidden>
              <defs>
                <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ece4d3" />
                  <stop offset="1" stopColor="#dccdae" />
                </linearGradient>
              </defs>
              <rect x="0" y="100" width="480" height="440" rx="36" fill="url(#soil)" />
              <path d="M0 104 Q 240 90 480 104" stroke="#8a6a4a" strokeOpacity="0.4" strokeWidth="2" fill="none" />

              {FINE_ROOTS.map((d, i) => (
                <path key={i} data-fine d={d} pathLength={1} strokeDasharray="1" fill="none" stroke="#8a6a4a" strokeOpacity="0.35" strokeWidth="1.5" />
              ))}
              {ROOTS.map((d, i) => (
                <path key={i} id={`root-${i}`} data-root d={d} pathLength={1} strokeDasharray="1" fill="none" stroke="#2b4c39" strokeWidth={i >= DATA_NODES.length ? 4 : 2.2} strokeLinecap="round" />
              ))}
              {!reduced &&
                ROOTS.map((d, i) => (
                  <circle key={i} r="3" fill="#d6a03f">
                    <animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} />
                  </circle>
                ))}

              {DATA_NODES.map(([x, y], i) => (
                <circle
                  key={i}
                  data-node
                  cx={x}
                  cy={y}
                  r={active === "data" ? 11 : 9}
                  fill={active === "data" ? "#d6a03f" : "#4b8a3b"}
                  className="cursor-pointer transition-[r,fill] duration-300"
                  onMouseEnter={() => setActive("data")}
                />
              ))}
              {(["retrieval", "context"] as const).map((k) => (
                <circle
                  key={k}
                  data-node
                  cx={NODE_POS[k][0]}
                  cy={NODE_POS[k][1]}
                  r={active === k ? 17 : 14}
                  fill={active === k ? "#d6a03f" : "#1d3a2a"}
                  stroke="#f6f1e6"
                  strokeWidth="3"
                  className="cursor-pointer transition-[r,fill] duration-300"
                  onMouseEnter={() => setActive(k)}
                />
              ))}

              <g data-sprout onMouseEnter={() => setActive("answer")} className="cursor-pointer">
                <path d="M240 100 C 240 70, 244 50, 238 28" stroke="#3f7d33" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M239 50 C 222 26, 194 22, 178 34 C 196 58, 222 60, 239 50Z" fill={active === "answer" ? "#d6a03f" : "#74a95c"} className="transition-[fill] duration-300" />
                <path d="M239 38 C 254 12, 284 6, 300 16 C 286 42, 258 48, 239 38Z" fill="#4b8a3b" />
              </g>
            </svg>
          </div>

          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <li key={step.key}>
                <button
                  type="button"
                  aria-pressed={active === step.key}
                  onMouseEnter={() => setActive(step.key)}
                  onFocus={() => setActive(step.key)}
                  onClick={() => setActive(step.key)}
                  className={cx(
                    "w-full rounded-3xl p-5 text-left ring-1 transition-[background-color,box-shadow] duration-300 sm:p-6",
                    active === step.key ? "bg-paper shadow-[0_20px_40px_-30px_rgba(29,58,42,0.6)] ring-forest/15" : "bg-transparent ring-transparent hover:bg-paper/60",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-2xl text-leaf tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-display text-2xl text-forest">{step.title}</span>
                      <span className="mt-1 block text-lg text-muted">{step.plain}</span>
                      <span className="mt-2 block text-sm text-soil">
                        {step.key === "data" ? <Pending note="Confirm dataset sources, languages and verification process.">For technical readers: {step.tech}</Pending> : <>For technical readers: {step.tech}</>}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
