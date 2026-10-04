"use client";

import { useRef } from "react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { MOTION_OK, gsap, useScrollScene } from "@/lib/gsap";

/** 05 — From abstract intelligence into an actual farm. Parallax: sky, hills, rows, farmer, particles. */
export function FarmSection() {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (mm, el) => {
    mm.add(MOTION_OK, () => {
      const trigger = { trigger: el, start: "top bottom", end: "bottom top", scrub: true };
      const layers: [string, number][] = [["[data-l='sky']", -6], ["[data-l='far']", 8], ["[data-l='near']", 16], ["[data-l='rows']", 26], ["[data-l='farmer']", 34]];
      layers.forEach(([sel, y]) => {
        gsap.fromTo(el.querySelector(sel), { yPercent: -y / 2 }, { yPercent: y / 2, ease: "none", scrollTrigger: trigger });
      });
    });
  });

  return (
    <section ref={ref} id="farm" aria-labelledby="farm-title" className="relative overflow-hidden bg-cream">
      <div className="relative h-[34rem] sm:h-[40rem]">
        <svg aria-hidden viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="farm-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6f1e6" />
              <stop offset="1" stopColor="#e2ead6" />
            </linearGradient>
          </defs>
          <g data-l="sky">
            <rect y="-80" width="1440" height="800" fill="url(#farm-sky)" />
            <circle cx="1120" cy="150" r="60" fill="#f1d08f" opacity="0.8" />
          </g>
          <path data-l="far" d="M0 330 C 200 270 380 300 560 310 S 900 250 1100 290 S 1340 300 1440 280 V 700 H0Z" fill="#cdd9c3" />
          <path data-l="near" d="M0 380 C 240 340 480 360 720 372 S 1180 330 1440 360 V 700 H0Z" fill="#a8bea0" />
          <g data-l="rows">
            <path d="M0 420 Q 720 395 1440 420 V 720 H0Z" fill="#9dbb84" />
            {Array.from({ length: 19 }, (_, i) => i - 9).map((i) => (
              <path key={i} d={`M${720 + i * 34} 410 L ${720 + i * 190} 720`} stroke="#5f9a4a" strokeWidth={10 + Math.abs(i)} strokeLinecap="round" opacity="0.75" />
            ))}
          </g>
          <g data-l="farmer" transform="translate(1040 520) scale(2.2)" fill="#1d3a2a">
            <circle cx="0" cy="-34" r="5" />
            <path d="M-6 -37c1-5 11-5 12 0l3 1c-2 1-4 1-6 0Z" fill="#d6a03f" />
            <path d="M-6 -28h12l2 18h-16Z" />
            <path d="M-5 -10h4v10h-4zM1 -10h4v10h-4z" />
            <path d="M5 -26 9 -36" stroke="#1d3a2a" strokeWidth="2.4" strokeLinecap="round" />
            <rect x="7.5" y="-40" width="3.5" height="6" rx="1" fill="#d6a03f" />
          </g>
        </svg>
        {/* Data particles rising gently from the field */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-turmeric/70 motion-safe:animate-rise"
              style={{ left: `${8 + ((i * 67) % 84)}%`, bottom: `${10 + ((i * 29) % 30)}%`, animationDelay: `${(i * 0.53) % 7}s` }}
            />
          ))}
        </div>

        <Container className="relative flex h-full items-start pt-14 sm:pt-20">
          <div className="max-w-xl rounded-[2rem] bg-paper/90 p-7 shadow-[0_30px_60px_-40px_rgba(29,58,42,0.6)] ring-1 ring-forest/10 backdrop-blur-sm sm:p-9">
            <Eyebrow index="05">Current focus</Eyebrow>
            <h2 id="farm-title" className="text-4xl text-forest sm:text-5xl">
              Starting where it matters: <span lang="mr" className="font-deva font-semibold text-leaf">मराठी</span> agriculture.
            </h2>
            <p className="mt-5 text-lg text-muted">
              Our current, focused use case is <strong className="text-forest">Marathi Agriculture AI</strong>: guidance for Marathi-speaking
              farmers in Maharashtra. Building deeply for one community first lets us get the language, crops and local context right
              before we expand.
            </p>
            <div className="mt-7">
              <ButtonLink href="/marathi-agriculture-ai">Explore Marathi Agriculture AI</ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
