"use client";

import { useRef } from "react";
import { horizons } from "@/lib/content";
import { Container, SectionIntro } from "@/components/ui/primitives";
import { MOTION_OK, gsap, useScrollScene } from "@/lib/gsap";

// Deterministic "field map": abstract points, not a geographic map.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(7);
export const POINTS = [{ x: 300, y: 200 }, ...Array.from({ length: 70 }, () => ({ x: 20 + rand() * 560, y: 20 + rand() * 360 }))].map((p) => ({
  x: Math.round(p.x),
  y: Math.round(p.y),
}));
export const EDGES: [number, number][] = [];
POINTS.forEach((p, i) => {
  POINTS.map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
    .filter((o) => o.j !== i)
    .sort((a, b) => a.d - b.d)
    .slice(0, 2)
    .forEach(({ j }) => {
      if (!EDGES.some(([a, b]) => (a === j && b === i) || (a === i && b === j))) EDGES.push([i, j]);
    });
});
// Sort edges by distance from the centre farm, so the network grows outward.
const dist = (i: number) => Math.hypot(POINTS[i].x - 300, POINTS[i].y - 200);
EDGES.sort((a, b) => Math.min(dist(a[0]), dist(a[1])) - Math.min(dist(b[0]), dist(b[1])));

export function VisionSection({ index = "10" }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (mm, el) => {
    mm.add(MOTION_OK, () => {
      const map = el.querySelector("[data-map]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: map, start: "top 85%", end: "center 55%", scrub: 0.8 } });
      tl.fromTo(el.querySelector("[data-zoom]"), { scale: 3.2, svgOrigin: "300 200" }, { scale: 1, svgOrigin: "300 200", ease: "power2.inOut", duration: 1 });
      tl.fromTo(el.querySelectorAll("[data-edge]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.006, duration: 0.3 }, 0.15);
      tl.fromTo(el.querySelectorAll("[data-pt]"), { opacity: 0.15 }, { opacity: 1, stagger: 0.008, duration: 0.2 }, 0.15);
    });
  });

  return (
    <section ref={ref} id="vision" aria-labelledby="vision-title" className="relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionIntro index={index || undefined} eyebrow="Vision" tone="light" title={<span id="vision-title">From one farm to many farms, languages and regions.</span>}>
            <p>Start with one farmer&apos;s question, answered well. Then widen the circle, carefully.</p>
          </SectionIntro>
          <ol className="mt-10 space-y-6">
            {horizons.map((h) => (
              <li key={h.when} className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-sage/20 pt-5">
                <span className="font-display text-2xl text-turmeric">{h.when}</span>
                <span>
                  <span className="block text-sm font-semibold tracking-wide text-sage uppercase">{h.label}</span>
                  <span className="mt-1 block text-lg text-sage-soft/95">{h.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <figure data-map>
          <div className="overflow-hidden rounded-[2rem] bg-forest-soft/60 ring-1 ring-sage/20">
            <svg viewBox="0 0 600 400" className="w-full" aria-hidden>
              <g data-zoom>
                {EDGES.map(([a, b], i) => (
                  <line
                    key={i}
                    data-edge
                    x1={POINTS[a].x}
                    y1={POINTS[a].y}
                    x2={POINTS[b].x}
                    y2={POINTS[b].y}
                    pathLength={1}
                    strokeDasharray="1"
                    stroke="#a8bea0"
                    strokeOpacity="0.45"
                    strokeWidth="1"
                  />
                ))}
                {POINTS.map((p, i) => (
                  <circle key={i} data-pt cx={p.x} cy={p.y} r={i === 0 ? 6 : 2.5 + (i % 3)} fill={i === 0 ? "#d6a03f" : i % 4 === 0 ? "#74a95c" : "#dbe5d3"} />
                ))}
                <circle cx={300} cy={200} r={14} fill="none" stroke="#d6a03f" strokeOpacity="0.6" className="origin-[300px_200px] animate-breathe" />
              </g>
            </svg>
          </div>
          <figcaption className="mt-3 text-sm text-sage">
            Illustrative network. Each point stands for a farm, a language or a knowledge source. Not a map of current coverage.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
