"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { horizons } from "@/lib/content";
import { EDGES, POINTS } from "@/components/home/VisionSection";
import { Eyebrow } from "@/components/ui/primitives";

const CURVE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** 10 on phones: Now → Next → Later on a stem that grows as you read, then one farm widens into a network. */
export function MobileVision() {
  const list = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const open = useInView(map, { once: true, amount: 0.45 });

  return (
    <section id="m-vision" aria-labelledby="m-vision-title" className="relative overflow-hidden bg-forest pt-16 pb-14 text-cream">
      <div className="mx-auto max-w-md px-5">
        <Eyebrow index="10" tone="light">
          Vision
        </Eyebrow>
        <h2 id="m-vision-title" className="text-[2rem] text-cream">
          From one farm to many farms, languages and regions.
        </h2>
        <p className="mt-4 text-sage-soft/90">Start with one farmer&apos;s question, answered well. Then widen the circle, carefully.</p>

        <div ref={list} className="relative mt-10">
          <div aria-hidden className="absolute top-2 bottom-2 left-[9px] w-0.5 rounded-full bg-sage/20" />
          <motion.div aria-hidden style={{ scaleY: grow }} className="absolute top-2 bottom-2 left-[9px] w-0.5 origin-top rounded-full bg-turmeric" />
          <ol className="space-y-8">
            {horizons.map((h) => (
              <motion.li
                key={h.when}
                initial={{ opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                transition={{ duration: 0.6 }}
                className="relative pl-9"
              >
                <span aria-hidden className="absolute top-2 left-0 h-5 w-5 rounded-full border-2 border-turmeric bg-forest" />
                <span className="block font-display text-3xl text-turmeric">{h.when}</span>
                <span className="mt-1 block text-sm font-semibold tracking-wide text-sage uppercase">{h.label}</span>
                <span className="mt-1 block text-lg text-sage-soft/95">{h.body}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <figure ref={map} className="mt-12">
          <div className="overflow-hidden rounded-[1.75rem] bg-forest-soft/60 ring-1 ring-sage/20">
            <svg viewBox="0 0 600 400" className="w-full" aria-hidden>
              <g
                style={{
                  transform: `scale(${open ? 1 : 3.2})`,
                  transformBox: "view-box",
                  transformOrigin: "300px 200px",
                  transition: `transform 1.8s ${CURVE}`,
                }}
              >
                {EDGES.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={POINTS[a].x}
                    y1={POINTS[a].y}
                    x2={POINTS[b].x}
                    y2={POINTS[b].y}
                    pathLength={1}
                    strokeDasharray="1"
                    stroke="#a8bea0"
                    strokeOpacity="0.45"
                    strokeWidth="1"
                    style={{ strokeDashoffset: open ? 0 : 1, transition: `stroke-dashoffset 0.5s ${CURVE} ${0.3 + i * 0.012}s` }}
                  />
                ))}
                {POINTS.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={i === 0 ? 6 : 2.5 + (i % 3)}
                    fill={i === 0 ? "#d6a03f" : i % 4 === 0 ? "#74a95c" : "#dbe5d3"}
                    style={{ opacity: open || i === 0 ? 1 : 0.15, transition: `opacity 0.4s ease ${0.3 + i * 0.015}s` }}
                  />
                ))}
                <circle cx={300} cy={200} r={14} fill="none" stroke="#d6a03f" strokeOpacity="0.6" className="origin-[300px_200px] motion-safe:animate-breathe" />
              </g>
            </svg>
          </div>
          <figcaption className="mt-3 text-sm text-sage">
            Illustrative network. Each point stands for a farm, a language or a knowledge source. Not a map of current coverage.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
