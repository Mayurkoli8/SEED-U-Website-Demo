"use client";

import { useRef } from "react";
import { Container, SectionIntro } from "@/components/ui/primitives";
import { MOTION_OK, gsap, useScrollScene } from "@/lib/gsap";

type Fragment = { text: string; kind: "knowledge" | "language" | "access"; lang?: "mr" };

export const FRAGMENTS: Fragment[] = [
  { text: "Research papers", kind: "knowledge" },
  { text: "Advisory bulletins", kind: "knowledge" },
  { text: "Scheme notices", kind: "knowledge" },
  { text: "Crop calendars", kind: "knowledge" },
  { text: "मराठी प्रश्न", kind: "language", lang: "mr" },
  { text: "Local crop names", kind: "language" },
  { text: "Dialects", kind: "language" },
  { text: "Spoken, not typed", kind: "language" },
  { text: "Scattered PDFs", kind: "access" },
  { text: "Hour-long videos", kind: "access" },
  { text: "Forwarded messages", kind: "access" },
  { text: "Too technical", kind: "access" },
];

export const KIND_STYLE = {
  knowledge: "bg-sage-soft text-forest ring-leaf/25",
  language: "bg-[#f3e7cb] text-soil ring-turmeric/30",
  access: "bg-paper text-muted ring-forest/15",
};

// Final ring positions (percent of the panel), and where each fragment starts, scattered.
const RING = FRAGMENTS.map((_, i) => {
  const a = (i / FRAGMENTS.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 };
});
const SCATTER = FRAGMENTS.map((_, i) => ({
  x: ((i * 137) % 360) - 180,
  y: ((i * 89) % 220) - 110,
  r: ((i * 53) % 50) - 25,
}));

const COLUMNS = [
  {
    title: "Knowledge",
    body: "Useful agricultural knowledge exists: research, advisories, scheme information. Much of it is written in English or formal language.",
  },
  {
    title: "Language",
    body: "Farmers think and ask in Marathi, Hindi and many local dialects, often by speaking rather than typing.",
  },
  {
    title: "Access",
    body: "Advice is scattered across leaflets, long videos and forwarded messages. Finding the right answer at the right moment is hard.",
  },
];

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (mm, el) => {
    mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
      const chips = el.querySelectorAll<HTMLElement>("[data-chip]");
      const lines = el.querySelectorAll<SVGLineElement>("[data-line]");
      const core = el.querySelector("[data-core]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector("[data-panel]"), start: "top 85%", end: "center 50%", scrub: 0.8 },
      });
      chips.forEach((chip, i) => {
        tl.fromTo(
          chip,
          { x: SCATTER[i].x, y: SCATTER[i].y, rotate: SCATTER[i].r, opacity: 0.45 },
          { x: 0, y: 0, rotate: 0, opacity: 1, ease: "power2.out", duration: 1 },
          i * 0.03,
        );
      });
      tl.fromTo(core, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 0.7);
      tl.fromTo(lines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.02 }, 0.8);
    });
  });

  return (
    <section ref={ref} id="problem" aria-labelledby="problem-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionIntro
          index="02"
          eyebrow="The real problem"
          title={<span id="problem-title">Knowledge exists. It just doesn&apos;t reach the farmer in a form they can use.</span>}
        >
          <p>
            The gap isn&apos;t only information. It is language, format and timing: three disconnected pieces that rarely meet at the moment a
            farmer needs them.
          </p>
        </SectionIntro>

        <div
          data-panel
          className="grain relative mt-14 flex flex-wrap justify-center gap-2.5 overflow-hidden rounded-[2rem] bg-mist p-6 ring-1 ring-forest/10 md:block md:h-[30rem] md:p-0"
        >
          <svg aria-hidden className="absolute inset-0 hidden h-full w-full md:block">
            {RING.map((p, i) => (
              <line
                key={i}
                data-line
                x1="50%"
                y1="50%"
                x2={`${p.x}%`}
                y2={`${p.y}%`}
                pathLength={1}
                strokeDasharray="1"
                stroke="#4b8a3b"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {FRAGMENTS.map((f, i) => (
            <span
              key={f.text}
              data-chip
              lang={f.lang}
              style={{ left: `${RING[i].x}%`, top: `${RING[i].y}%` }}
              className={`inline-flex rounded-full px-4 py-2 text-[0.95rem] font-semibold whitespace-nowrap ring-1 md:absolute md:-translate-x-1/2 md:-translate-y-1/2 ${KIND_STYLE[f.kind]} ${f.lang ? "font-deva" : ""}`}
            >
              {f.text}
            </span>
          ))}

          <div
            data-core
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-forest px-6 py-4 text-cream md:absolute md:top-1/2 md:left-1/2 md:mt-0 md:h-40 md:w-40 md:-translate-x-1/2 md:-translate-y-1/2 md:flex-col md:gap-1 md:px-4 md:text-center"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-leaf-bright" aria-hidden>
              <path d="M12 21c0-6-3-10-8-11 0 5 3 9 8 11Zm0 0c0-6 3-10 8-11 0 5-3 9-8 11Zm0-9V4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="font-display text-lg leading-tight">One clear answer</span>
          </div>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {COLUMNS.map((c) => (
            <li key={c.title} className="border-t border-forest/15 pt-5">
              <h3 className="text-2xl text-forest">{c.title}</h3>
              <p className="mt-2 text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
