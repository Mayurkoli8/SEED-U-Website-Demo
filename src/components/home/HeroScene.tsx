"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * "Ask. Understand. Grow." — a looping concept animation:
 * question → language particles → knowledge nodes → answer card → the field responds.
 * Illustrative only; labelled as such below the frame.
 */

type Stage = 0 | 1 | 2 | 3 | 4 | 5;
const DURATIONS: Record<Stage, number> = { 0: 900, 1: 1500, 2: 2600, 3: 2300, 4: 1300, 5: 6500 };

export const COPY = {
  mr: {
    tag: "मराठी",
    question: "माझ्या पिकाची पाने पिवळी पडत आहेत. काय तपासावे?",
    translation: "My crop leaves are turning yellow. What should I check?",
    answerTitle: "हे तपासा",
    answer: ["आधी कोणती पाने पिवळी झाली: जुनी की नवी?", "माती पाणथळ आहे की खूप कोरडी?", "खत किंवा औषध घेण्यापूर्वी KVK कडून खात्री करा."],
    glyphs: ["मा", "झ्या", "पि", "का", "ची", "पा", "ने", "?"],
  },
  en: {
    tag: "English",
    question: "My crop leaves are turning yellow. What should I check?",
    translation: "Asked in English. Marathi is our current focus.",
    answerTitle: "Things to check",
    answer: ["Which leaves yellowed first: old or new?", "Is the soil waterlogged or very dry?", "Confirm with your KVK before buying inputs."],
    glyphs: ["c", "r", "o", "p", "l", "e", "a", "f"],
  },
} as const;

// Question path: from the question card to the knowledge cluster.
const P = { x: [150, 250, 380, 478], y: [150, 70, 250, 190] };
function bezier(p: number[], t: number) {
  const u = 1 - t;
  return u * u * u * p[0] + 3 * u * u * t * p[1] + 3 * u * t * t * p[2] + t * t * t * p[3];
}
const STEPS = Array.from({ length: 10 }, (_, i) => i / 9);
const TRAIL_X = STEPS.map((t) => bezier(P.x, t));
const TRAIL_Y = STEPS.map((t) => bezier(P.y, t));

const NODES = [
  { x: 478, y: 190, r: 9 },
  { x: 528, y: 160, r: 6 },
  { x: 540, y: 222, r: 7 },
  { x: 446, y: 140, r: 5 },
  { x: 500, y: 246, r: 5 },
  { x: 574, y: 188, r: 5 },
  { x: 432, y: 214, r: 4 },
];
const LINKS: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [0, 6], [1, 3], [2, 4]];

const ROWS = Array.from({ length: 11 }, (_, i) => i - 5);
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroScene() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduced || !playing || !inView) return;
    const t = setTimeout(() => {
      if (stage === 5) {
        setCycle((c) => c + 1);
        setStage(0);
      } else {
        setStage((stage + 1) as Stage);
      }
    }, DURATIONS[stage]);
    return () => clearTimeout(t);
  }, [stage, playing, inView, reduced]);

  const s: Stage = reduced ? 5 : stage;
  const lang = cycle % 2 === 0 ? "mr" : "en";
  const copy = COPY[lang];
  const grown = s >= 5;
  const knowing = s >= 3;

  const { scrollYProgress } = useScroll({ target: frame, offset: ["start start", "end start"] });
  const farHills = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const nearHills = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <div>
      <div
        ref={frame}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-cream shadow-[0_40px_80px_-50px_rgba(29,58,42,0.55)] ring-1 ring-forest/10 sm:aspect-[8/7]"
      >
        <svg viewBox="0 0 640 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f8f3e8" />
              <stop offset="1" stopColor="#e4ecd9" />
            </linearGradient>
            <radialGradient id="hs-sun">
              <stop offset="0" stopColor="#efc978" stopOpacity="0.9" />
              <stop offset="1" stopColor="#efc978" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="640" height="560" fill="url(#hs-sky)" />

          <motion.g style={{ y: sunY }}>
            <circle cx="545" cy="96" r="80" fill="url(#hs-sun)" className="origin-[545px_96px] animate-breathe" />
            <circle cx="545" cy="96" r="26" fill="#f1d08f" />
          </motion.g>

          <motion.path style={{ y: farHills }} d="M0 300 C 90 250 170 262 250 280 S 420 236 520 262 S 610 280 640 270 V 360 H0Z" fill="#cdd9c3" />
          <motion.path style={{ y: nearHills }} d="M0 320 C 110 290 200 300 300 316 S 480 290 640 306 V 380 H0Z" fill="#b2c6a8" />

          {/* Farmer, small on the horizon */}
          <g transform="translate(92 333)" fill="#2b4c39" opacity="0.85">
            <circle cx="0" cy="-34" r="5" />
            <path d="M-6 -37c1-5 11-5 12 0l3 1c-2 1-4 1-6 0Z" fill="#d6a03f" />
            <path d="M-6 -28h12l2 18h-16Z" />
            <path d="M-5 -10h4v10h-4zM1 -10h4v10h-4z" />
            <path d="M5 -26 9 -36" stroke="#2b4c39" strokeWidth="2.4" strokeLinecap="round" />
          </g>

          {/* Field */}
          <motion.path
            d="M0 330 Q 320 310 640 330 V 560 H0Z"
            initial={false}
            animate={{ fill: grown ? "#b9cf96" : knowing ? "#d3cf9c" : "#dccf9f" }}
            transition={{ duration: 1.6, ease }}
          />
          {ROWS.map((i) => (
            <motion.line
              key={i}
              x1={320 + i * 18}
              y1={330}
              x2={320 + i * 120}
              y2={560}
              strokeWidth={8 + Math.abs(i) * 0.6}
              strokeLinecap="round"
              initial={false}
              animate={{ stroke: grown ? "#5f9a4a" : "#c3b47c" }}
              transition={{ duration: 1.4, delay: 0.25 + Math.abs(i) * 0.06, ease }}
            />
          ))}
          {ROWS.flatMap((i) =>
            [0.35, 0.6, 0.85].map((t) => {
              const x = 320 + i * 18 + (i * 120 - i * 18) * t;
              const y = 330 + 230 * t;
              return (
                <motion.circle
                  key={`${i}-${t}`}
                  cx={x}
                  cy={y - 4}
                  initial={false}
                  animate={{ r: grown ? 3 + t * 6 : 1.5 + t * 2.5, fill: grown ? "#3f7d33" : "#a99d68" }}
                  transition={{ duration: 1.2, delay: 0.4 + t * 0.6, ease }}
                />
              );
            }),
          )}

          {/* Question travelling as a data-wave */}
          <motion.path
            d={`M${P.x[0]} ${P.y[0]} C ${P.x[1]} ${P.y[1]}, ${P.x[2]} ${P.y[2]}, ${P.x[3]} ${P.y[3]}`}
            fill="none"
            stroke="#4b8a3b"
            strokeWidth="1.6"
            strokeDasharray="3 7"
            initial={false}
            animate={{ opacity: s >= 2 && s <= 4 ? 0.7 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <AnimatePresence>
            {s === 3 &&
              copy.glyphs.map((g, i) => (
                <motion.text
                  key={`${cycle}-${i}`}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="600"
                  fill="#1d3a2a"
                  initial={{ x: TRAIL_X[0], y: TRAIL_Y[0], opacity: 0 }}
                  animate={{ x: TRAIL_X, y: TRAIL_Y, opacity: [0, 1, 1, 1, 1, 1, 1, 0.8, 0.4, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: i * 0.09, ease: "easeInOut" }}
                >
                  {g}
                </motion.text>
              ))}
          </AnimatePresence>

          {/* Knowledge cluster */}
          <g>
            {LINKS.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="#4b8a3b"
                strokeWidth="1.4"
                initial={false}
                animate={{ pathLength: knowing ? 1 : 0, opacity: knowing ? 0.6 : 0 }}
                transition={{ duration: 0.8, delay: knowing ? 0.9 + i * 0.05 : 0, ease }}
              />
            ))}
            {NODES.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={n.r}
                initial={false}
                animate={{ scale: knowing ? 1 : 0, fill: s >= 4 ? (i === 0 ? "#d6a03f" : "#74a95c") : "#4b8a3b" }}
                transition={{ duration: 0.6, delay: knowing ? 1.1 + i * 0.07 : 0, ease }}
              />
            ))}
          </g>

          {/* Knowledge flowing back down to the farm */}
          <motion.path
            d="M478 200 C 470 300, 300 330, 196 452"
            fill="none"
            stroke="#d6a03f"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: s >= 4 ? 1 : 0, opacity: s >= 4 ? 0.85 : 0 }}
            transition={{ duration: 1.2, ease }}
          />

          {/* The seed that sprouts */}
          <g>
            <ellipse cx="190" cy="478" rx="44" ry="12" fill="#8a6a4a" opacity="0.55" />
            <ellipse cx="190" cy="470" rx="9" ry="6" fill="#8a6a4a" />
            <motion.path
              d="M190 468 C 190 448, 194 430, 188 404"
              fill="none"
              stroke="#3f7d33"
              strokeWidth="4"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: grown ? 1 : 0.02 }}
              transition={{ duration: 1.2, ease }}
            />
            <motion.path
              d="M189 420 C 176 398, 152 394, 138 404 C 152 424, 176 428, 189 420Z"
              fill="#74a95c"
              initial={false}
              animate={{ scale: grown ? 1 : 0 }}
              style={{ originX: 1, originY: 0.8 }}
              transition={{ duration: 0.9, delay: grown ? 0.8 : 0, ease }}
            />
            <motion.path
              d="M189 408 C 200 384, 226 378, 242 386 C 228 410, 204 416, 189 408Z"
              fill="#4b8a3b"
              initial={false}
              animate={{ scale: grown ? 1 : 0 }}
              style={{ originX: 0, originY: 0.85 }}
              transition={{ duration: 0.9, delay: grown ? 1 : 0, ease }}
            />
          </g>
        </svg>

        {/* Question card (on phones it gives way to the answer so the field stays visible) */}
        <div className={s >= 4 ? "max-sm:hidden" : undefined}>
        <AnimatePresence>
          {s >= 1 && (
            <motion.div
              key={`q-${cycle}`}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease }}
              className="absolute top-[4%] left-[4%] w-[80%] rounded-2xl bg-paper/95 p-4 shadow-[0_18px_40px_-24px_rgba(29,58,42,0.6)] ring-1 ring-forest/10 sm:w-[56%]"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted uppercase">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-soft text-forest">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm-7 9a7 7 0 0 0 14 0M12 19v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                Farmer asks
                <span className="ml-auto rounded-full bg-cream-deep px-2 py-0.5 normal-case tracking-normal text-forest">{copy.tag}</span>
              </div>
              {s === 1 ? (
                <div className="flex h-12 items-center gap-1" aria-hidden>
                  {Array.from({ length: 22 }, (_, i) => (
                    <motion.span
                      key={i}
                      className="w-1 rounded-full bg-leaf"
                      animate={{ height: [6, 10 + ((i * 7) % 26), 8, 18 + ((i * 5) % 14), 6] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <p lang={lang === "mr" ? "mr" : "en"} className={`text-[1.05rem] leading-snug font-semibold text-forest sm:text-lg ${lang === "mr" ? "font-deva" : ""}`}>
                    {copy.question.split(" ").map((w, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.12 }}
                      >
                        {w}&nbsp;
                      </motion.span>
                    ))}
                  </p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{copy.translation}</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* Answer card */}
        <AnimatePresence>
          {s >= 4 && (
            <motion.div
              key={`a-${cycle}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease }}
              className="absolute top-[4%] right-[4%] w-[92%] sm:top-auto sm:bottom-[4%] rounded-2xl bg-forest p-4 text-cream shadow-[0_24px_50px_-26px_rgba(29,58,42,0.9)] sm:w-[60%] sm:p-5"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-sage uppercase">
                <span aria-hidden className="h-2 w-2 rounded-full bg-turmeric" />
                SEED U · Illustrative answer
              </div>
              <p lang={lang === "mr" ? "mr" : "en"} className={`font-display text-lg ${lang === "mr" ? "font-deva font-semibold" : ""}`}>
                {copy.answerTitle}
              </p>
              <ul className="mt-2 space-y-1.5" lang={lang === "mr" ? "mr" : "en"}>
                {copy.answer.map((line, i) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.18, ease }}
                    className={`flex gap-2 text-sm leading-snug text-cream/90 sm:text-[0.95rem] ${lang === "mr" ? "font-deva" : ""}`}
                  >
                    <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-leaf-bright" aria-hidden>
                      <path d="M8 14C8 9 5 6 2 5c0 4 2 7 6 9Zm0 0c0-5 3-8 6-9 0 4-2 7-6 9Z" fill="currentColor" />
                    </svg>
                    {line}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 px-1 text-sm text-muted">
        <p>Concept animation. Illustrative, not a live product.</p>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-forest/20 px-3.5 font-medium text-forest hover:bg-sage-soft/60"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
              {playing ? <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> : <path d="M5 3l8 5-8 5Z" fill="currentColor" />}
            </svg>
            {playing ? "Pause" : "Play"}
            <span className="sr-only"> animation</span>
          </button>
        )}
      </div>
    </div>
  );
}
