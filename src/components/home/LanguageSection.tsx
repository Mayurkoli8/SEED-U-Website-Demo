"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { languages } from "@/lib/languages";
import { Container, SectionIntro, cx } from "@/components/ui/primitives";

const STREAMS = Array.from({ length: 12 }, (_, i) => {
  const x = 40 + i * (920 / 11);
  return `M${x} 0 C ${x} 90, ${500 + (x - 500) * 0.25} 120, ${500 + (x - 500) * 0.12} 200`;
});

export function LanguageSection({ index = "03" }: { index?: string }) {
  const [active, setActive] = useState("mr");
  const reduced = useReducedMotion();
  const current = languages.find((l) => l.code === active) ?? languages[0];

  return (
    <section id="language" aria-labelledby="language-title" className="relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#dbe5d3_1px,transparent_1px)] [background-size:22px_22px]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionIntro index={index || undefined} eyebrow="Language" tone="light" title={<span id="language-title">Many languages. One shared understanding.</span>}>
            <p>
              India has 22 languages listed in the Eighth Schedule of the Constitution, and countless local ways of speaking. SEED U is
              designed so that meaning, not just words, flows into one shared intelligence layer.
            </p>
          </SectionIntro>
          <div className="rounded-3xl bg-forest-soft/70 p-6 ring-1 ring-sage/20">
            <p lang="mr" className="font-deva text-4xl font-semibold text-cream sm:text-5xl">
              मराठी
            </p>
            <p className="mt-3 text-lg text-sage-soft/90">
              <strong className="text-cream">Our current focus.</strong> We are starting with Marathi, for farmers in Maharashtra, and
              designing every layer so more Indian languages can follow.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <p id="lang-hint" className="mb-4 text-sm text-sage">
            Tap a language to see where it stands today.
          </p>
          <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6" aria-describedby="lang-hint">
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  lang={l.code}
                  aria-pressed={active === l.code}
                  onClick={() => setActive(l.code)}
                  onMouseEnter={() => setActive(l.code)}
                  onFocus={() => setActive(l.code)}
                  className={cx(
                    "group flex min-h-16 w-full flex-col items-center justify-center rounded-2xl px-2 py-3 ring-1 transition-[background-color,transform] duration-300 hover:-translate-y-0.5",
                    l.status === "focus" ? "bg-turmeric/20 ring-turmeric/60" : "bg-forest-soft/60 ring-sage/20 hover:bg-forest-soft",
                    active === l.code && "bg-sage/25 ring-sage",
                  )}
                >
                  <span className="text-xl font-semibold text-cream">{l.native}</span>
                  <span lang="en" className="mt-0.5 text-xs text-sage">
                    {l.english}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <svg aria-hidden viewBox="0 0 1000 200" preserveAspectRatio="none" className="mt-2 h-24 w-full sm:h-32">
            {STREAMS.map((d, i) => (
              <path key={i} id={`stream-${i}`} d={d} fill="none" stroke={i === 0 ? "#d6a03f" : "#a8bea0"} strokeOpacity={i === 0 ? 0.8 : 0.3} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            ))}
            {!reduced &&
              STREAMS.map((d, i) => (
                <circle key={i} r="3.5" fill={i === 0 ? "#d6a03f" : "#dbe5d3"}>
                  <animateMotion dur={`${2.6 + (i % 4) * 0.5}s`} repeatCount="indefinite" begin={`${(i * 0.37) % 2}s`} path={d} />
                </circle>
              ))}
          </svg>

          <div className="relative rounded-full bg-gradient-to-r from-sage/20 via-leaf/40 to-sage/20 px-6 py-5 text-center ring-1 ring-sage/30">
            <p className="font-display text-xl text-cream sm:text-2xl">Shared intelligence layer</p>
            <p className="text-sm text-sage-soft/90 sm:text-base">Understands meaning across languages, then answers in the farmer&apos;s own.</p>
          </div>

          <motion.div
            key={current.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-live="polite"
            className="mx-auto mt-8 max-w-2xl text-center text-lg"
          >
            <span lang={current.code} className="font-semibold text-cream">
              {current.native}
            </span>{" "}
            <span className="text-sage">({current.english})</span>
            <span className="mx-2 text-sage/60">·</span>
            <span className={current.status === "focus" ? "text-turmeric" : "text-sage-soft/90"}>{current.note}</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
