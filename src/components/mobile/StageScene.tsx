"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { COPY } from "@/components/home/HeroScene";
import { FRAGMENTS, KIND_STYLE } from "@/components/home/ProblemSection";
import { languages } from "@/lib/languages";
import { cx } from "@/components/ui/primitives";

/**
 * The pinned "living field" behind the mobile story. One farm scene that
 * changes per beat: seed → question → scattered help → languages → roots →
 * answer. State changes are CSS transitions on transform/opacity/colour, so
 * scrolling itself never drives per-frame work on the SVG.
 */

export const BEAT_COUNT = 6;
export const ROOTS_BEAT = 4;

/** When each intelligence step lights up underground (s). The caption checklist ticks in sync. */
export const ROOT_TICKS = [1.6, 2.0, 2.4, 2.9];

const ease = [0.22, 1, 0.36, 1] as const;
const CURVE = "cubic-bezier(0.22, 1, 0.36, 1)";
const t = (prop: string, dur: number, delay = 0) => `${prop} ${dur}s ${CURVE} ${delay}s`;

// Camera per beat, as % of the stage height: open looking at the sky, dive underground for the roots.
const WORLD_Y = [14, 0, 0, 0, -39, 0];
// The sun climbs as the story moves on (SVG units).
const SUN_Y = [22, 10, 2, -4, -4, -14];

// Crop rows radiate from the horizon. The drawing is 390×520 but bleeds well past it for wide screens.
const ROWS = Array.from({ length: 29 }, (_, i) => i - 14);
const CROP_ROWS = ROWS.filter((i) => Math.abs(i) <= 9);
const CROP_T = [0.05, 0.17, 0.32, 0.45];
const row = (i: number, k: number) => ({ x: 195 + i * 8 + i * 72 * k, y: 92 + 908 * k });

// Roots: seed → context → retrieval → verified data.
const DATA_NODES = [[55, 420], [110, 445], [160, 415], [230, 440], [280, 415], [335, 445]] as const;
const TAP_ROOTS = ["M195 188 C 190 210, 200 230, 195 250", "M195 250 C 188 280, 202 305, 195 330"];
const DATA_ROOTS = DATA_NODES.map(([x, y]) => `M195 330 C ${195 + (x - 195) * 0.25} 360, ${x} ${y - 55}, ${x} ${y}`);
const FINE_ROOTS = [
  "M195 250 C 240 262, 280 258, 330 282",
  "M195 250 C 150 264, 110 262, 60 286",
  "M195 330 C 250 340, 300 346, 362 372",
  "M195 330 C 140 342, 90 348, 28 374",
];
// The same roots reversed, so knowledge visibly travels up to the seed.
const FLOW = DATA_NODES.map(
  ([x, y]) => `M${x} ${y} C ${x} ${y - 55}, ${195 + (x - 195) * 0.25} 360, 195 330 C 202 305, 188 280, 195 250 C 200 230, 190 210, 195 188`,
);

// Problem beat: [fragment index, x %, y %, rotation]. Two loose columns, deliberately untidy.
const SCATTER: [number, number, number, number][] = [
  [0, 27, 5, -5], [6, 71, 5, 7],
  [9, 34, 22, 4], [4, 74, 22, -6],
  [1, 29, 39, -3], [8, 72, 39, 5],
  [7, 32, 56, 6], [3, 73, 56, -4],
  [11, 25, 73, -7], [10, 68, 73, 3],
  [2, 32, 90, 4], [5, 71, 90, -3],
];

export function StageScene({ beat }: { beat: number }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#f8f3e8] via-[#f3efe2] to-[#e4ecd9]">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${WORLD_Y[beat]}%)`, transition: t("transform", 1.2) }}
      >
        <Landscape beat={beat} reduced={reduced} />
      </div>

      {beat === 5 && (
        <div className="pointer-events-none absolute inset-x-0 top-[42%] h-[20%]">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-turmeric/70 motion-safe:animate-rise"
              style={{ left: `${8 + ((i * 67) % 84)}%`, bottom: `${(i * 29) % 40}%`, animationDelay: `${0.8 + ((i * 0.53) % 6)}s` }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {beat === 1 && <QuestionBubble key="question" />}
        {beat === 2 && <Fragments key="fragments" />}
        {beat === 3 && <Languages key="languages" reduced={reduced} />}
        {beat === 5 && <Answer key="answer" />}
      </AnimatePresence>
    </div>
  );
}

function Landscape({ beat, reduced }: { beat: number; reduced: boolean }) {
  const green = beat === 5;
  const under = beat === ROOTS_BEAT;
  const sprout = green ? 1 : under ? 0.5 : 0;
  const lit = (i: number) => ({ on: under, delay: under ? ROOT_TICKS[i] : 0 });

  return (
    <svg viewBox="0 0 390 520" preserveAspectRatio="xMidYMin meet" className="absolute inset-x-0 top-[38%] h-[62%] w-full overflow-visible">
      <defs>
        <radialGradient id="ms-sun">
          <stop offset="0" stopColor="#efc978" stopOpacity="0.85" />
          <stop offset="1" stopColor="#efc978" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ms-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dfc9" />
          <stop offset="0.5" stopColor="#dccdae" />
          <stop offset="1" stopColor="#cdb98f" />
        </linearGradient>
      </defs>

      <g style={{ transform: `translateY(${SUN_Y[beat]}px)`, transition: t("transform", 1.6) }}>
        <circle cx="300" cy="40" r="64" fill="url(#ms-sun)" className="origin-[300px_40px] motion-safe:animate-breathe" />
        <circle cx="300" cy="40" r="20" fill="#f1d08f" />
      </g>

      <path d="M-310 58 C -180 36 -60 52 40 46 S 200 30 280 44 S 520 30 700 46 V 140 H-310Z" fill="#cdd9c3" />
      <path d="M-310 78 C -160 62 -40 74 80 70 S 260 60 360 72 S 560 62 700 70 V 150 H-310Z" fill="#b2c6a8" />
      <path d="M-310 92 Q 195 76 700 92 V 1000 H-310Z" style={{ fill: green ? "#b9cf96" : "#dccf9f", transition: t("fill", 1.6) }} />

      {ROWS.map((i) => {
        const a = row(i, 0);
        const b = row(i, 1);
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            strokeWidth={6 + Math.abs(i) * 0.5}
            strokeLinecap="round"
            style={{ stroke: green ? "#5f9a4a" : "#c9ba84", transition: t("stroke", 1.4, green ? 0.2 + Math.abs(i) * 0.05 : 0) }}
          />
        );
      })}
      {CROP_ROWS.flatMap((i) =>
        CROP_T.map((k) => {
          const p = row(i, k);
          const delay = green ? 0.4 + k * 1.4 : 0;
          return (
            <circle
              key={`${i}-${k}`}
              cx={p.x}
              cy={p.y - 3}
              r={2 + k * 12}
              style={{
                fill: green ? "#3f7d33" : "#a99d68",
                transform: `scale(${green ? 1 : 0.45})`,
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: `${t("transform", 1.2, delay)}, ${t("fill", 1.2, delay)}`,
              }}
            />
          );
        }),
      )}

      {/* Farmer with a phone */}
      <g transform="translate(96 158) scale(1.55)" fill="#2b4c39">
        <circle cx="0" cy="-34" r="5" />
        <path d="M-6 -37c1-5 11-5 12 0l3 1c-2 1-4 1-6 0Z" fill="#d6a03f" />
        <path d="M-6 -28h12l2 18h-16Z" />
        <path d="M-5 -10h4v10h-4zM1 -10h4v10h-4z" />
        <path d="M5 -26 9 -36" stroke="#2b4c39" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="7.5" y="-40" width="3.5" height="6" rx="1" fill="#d6a03f" />
      </g>

      {/* Cut-away: roots drawing on verified knowledge */}
      <g style={{ opacity: under ? 1 : 0, transition: t("opacity", 0.7, under ? 0.3 : 0) }}>
        <path d="M-310 192 C -100 186 100 196 195 190 S 500 186 700 192 V 1000 H-310Z" fill="url(#ms-soil)" />
        <path d="M-310 192 C -100 186 100 196 195 190 S 500 186 700 192" fill="none" stroke="#8a6a4a" strokeOpacity="0.45" strokeWidth="2" />
        {FINE_ROOTS.map((d, i) => (
          <Root key={d} d={d} on={under} delay={1.2 + i * 0.08} width={1.5} color="#8a6a4a" opacity={0.4} />
        ))}
        {TAP_ROOTS.map((d, i) => (
          <Root key={d} d={d} on={under} delay={0.5 + i * 0.3} width={4} />
        ))}
        {DATA_ROOTS.map((d, i) => (
          <Root key={d} d={d} on={under} delay={1 + i * 0.06} width={2.2} />
        ))}
        {DATA_NODES.map(([x, y], i) => (
          <Node key={i} x={x} y={y} r={8} from="#4b8a3b" {...lit(0)} />
        ))}
        <Node x={195} y={330} r={12} from="#1d3a2a" {...lit(1)} />
        <Node x={195} y={250} r={12} from="#1d3a2a" {...lit(2)} />
        {under && !reduced && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.6 }}>
            {FLOW.map((d, i) => (
              <circle key={d} r="3" fill="#d6a03f">
                <animateMotion dur={`${3 + (i % 3) * 0.5}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
          </motion.g>
        )}
      </g>

      {/* The seed that becomes the answer */}
      <ellipse cx="195" cy="188" rx="34" ry="8" fill="#8a6a4a" opacity="0.45" />
      <ellipse cx="195" cy="184" rx="7" ry="5" fill="#8a6a4a" />
      <path
        d="M195 182 C 195 160, 199 138, 193 108"
        fill="none"
        stroke="#3f7d33"
        strokeWidth="4.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: 0.98 - sprout * 0.98, transition: t("stroke-dashoffset", 1.2, under ? ROOT_TICKS[3] : green ? 0.3 : 0) }}
      />
      <Leaf d="M194 128 C 182 110, 160 106, 148 114 C 160 132, 182 136, 194 128Z" origin="194px 128px" fill="#74a95c" on={green} delay={1.1} />
      <Leaf d="M194 116 C 204 96, 228 90, 242 96 C 230 118, 208 124, 194 116Z" origin="194px 116px" fill="#4b8a3b" on={green} delay={1.3} />
    </svg>
  );
}

function Root({ d, on, delay, width, color = "#2b4c39", opacity = 1 }: { d: string; on: boolean; delay: number; width: number; color?: string; opacity?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={width}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray="1"
      style={{ strokeDashoffset: on ? 0 : 1, transition: t("stroke-dashoffset", 0.9, on ? delay : 0) }}
    />
  );
}

function Node({ x, y, r, from, on, delay }: { x: number; y: number; r: number; from: string; on: boolean; delay: number }) {
  return <circle cx={x} cy={y} r={r} stroke="#f6f1e6" strokeWidth="2.5" style={{ fill: on ? "#d6a03f" : from, transition: t("fill", 0.5, delay) }} />;
}

function Leaf({ d, origin, fill, on, delay }: { d: string; origin: string; fill: string; on: boolean; delay: number }) {
  return (
    <path
      d={d}
      fill={fill}
      style={{ transformBox: "view-box", transformOrigin: origin, transform: `scale(${on ? 1 : 0})`, transition: t("transform", 0.9, on ? delay : 0) }}
    />
  );
}

/* ── Overlays, one per beat ─────────────────────────────────────────────── */

function QuestionBubble() {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(false);
  const q = COPY.mr;

  useEffect(() => {
    const id = setTimeout(() => setTyped(true), reduced ? 0 : 1300);
    return () => clearTimeout(id);
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease }}
      className="absolute inset-x-0 top-[12%] px-4"
    >
      <div className="relative mx-auto max-w-sm rounded-2xl bg-paper p-4 shadow-[0_18px_40px_-24px_rgba(29,58,42,0.6)] ring-1 ring-forest/10">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted uppercase">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-soft text-forest">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm-7 9a7 7 0 0 0 14 0M12 19v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          Farmer asks
          <span lang="mr" className="ml-auto rounded-full bg-cream-deep px-2 py-0.5 font-deva normal-case tracking-normal text-forest">
            {q.tag}
          </span>
        </div>
        {typed ? (
          <>
            <p lang="mr" className="font-deva text-[1.05rem] leading-snug font-semibold text-forest">
              {q.question.split(" ").map((w, i) => (
                <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.1 }}>
                  {w}&nbsp;
                </motion.span>
              ))}
            </p>
            <p className="mt-1 text-xs text-muted">{q.translation}</p>
          </>
        ) : (
          <div className="flex h-12 items-center gap-1">
            {Array.from({ length: 24 }, (_, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-leaf"
                animate={{ height: [6, 10 + ((i * 7) % 26), 8, 18 + ((i * 5) % 14), 6] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
              />
            ))}
          </div>
        )}
        <svg viewBox="0 0 20 12" className="absolute top-full left-[16%] h-3 w-5 text-paper">
          <path d="M0 0h20L4 12Z" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
}

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 18 },
  show: (i: number) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: 0.15 + i * 0.06, duration: 0.6, ease } }),
  exit: (i: number) => ({ opacity: 0, scale: 0.5, y: 60, transition: { delay: i * 0.025, duration: 0.45, ease } }),
};
const group: Variants = { hidden: {}, show: {}, exit: { opacity: 0, transition: { duration: 0.3, delay: 0.45 } } };

function Fragments() {
  return (
    <motion.div variants={group} initial="hidden" animate="show" exit="exit" className="absolute inset-x-0 top-[11%] h-[32%] px-4">
      <div className="relative mx-auto h-full max-w-md">
        {SCATTER.map(([fi, x, y, r], i) => {
          const f = FRAGMENTS[fi];
          return (
            <motion.span
              key={f.text}
              custom={i}
              variants={chip}
              style={{ left: `${x}%`, top: `${y}%`, rotate: r }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span
                lang={f.lang}
                style={{ animationDelay: `${(i * 0.7) % 5}s` }}
                className={cx(
                  "inline-flex rounded-full px-3 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap shadow-[0_8px_18px_-14px_rgba(29,58,42,0.7)] ring-1 motion-safe:animate-sway",
                  KIND_STYLE[f.kind],
                  f.lang && "font-deva",
                )}
              >
                {f.text}
              </span>
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

const STREAMS = [50, 150, 250, 350].map((x) => `M${x} 0 C ${x} 30, 200 34, 200 64`);

function Languages({ reduced }: { reduced: boolean }) {
  return (
    <motion.div variants={group} initial="hidden" animate="show" exit="exit" className="absolute inset-x-0 top-[11%] px-4">
      <div className="mx-auto max-w-md">
        <ul className="grid grid-cols-4 gap-1.5">
          {languages.map((l, i) => {
            const focus = l.status === "focus";
            return (
              <motion.li
                key={l.code}
                custom={i}
                variants={chip}
                className={cx(
                  "relative rounded-xl px-1 py-2 text-center ring-1",
                  focus ? "bg-turmeric/25 text-forest ring-turmeric/70" : "bg-paper/75 text-forest/55 ring-forest/10",
                )}
              >
                <span lang={l.code} className="block text-[0.95rem] leading-tight font-semibold">
                  {l.native}
                </span>
                {focus && (
                  <span className="absolute -top-2 -right-1 rounded-full bg-forest px-1.5 py-px text-[0.6rem] font-bold tracking-wider text-cream uppercase">
                    Now
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
        <svg viewBox="0 0 400 64" preserveAspectRatio="none" className="h-12 w-full">
          {STREAMS.map((d, i) => (
            <path key={d} d={d} fill="none" stroke={i === 0 ? "#d6a03f" : "#8fa985"} strokeOpacity={i === 0 ? 0.9 : 0.45} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ))}
          {!reduced &&
            STREAMS.map((d, i) => (
              <circle key={d} r="3.5" fill={i === 0 ? "#d6a03f" : "#4b8a3b"}>
                <animateMotion dur={`${1.8 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
        </svg>
        <motion.p
          custom={12}
          variants={chip}
          className="mx-auto w-fit rounded-full bg-forest px-5 py-2.5 text-center font-display text-lg text-cream shadow-[0_14px_30px_-18px_rgba(29,58,42,0.9)]"
        >
          Shared intelligence layer
        </motion.p>
      </div>
    </motion.div>
  );
}

function Answer() {
  const a = COPY.mr;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.8, delay: 0.4, ease }}
      className="absolute inset-x-0 top-[11%] px-4"
    >
      <div className="mx-auto max-w-sm rounded-2xl bg-forest p-4 text-cream shadow-[0_24px_50px_-26px_rgba(29,58,42,0.9)]">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-wide text-sage uppercase">
          <span className="h-2 w-2 rounded-full bg-turmeric" />
          SEED U · Illustrative answer
        </div>
        <p lang="mr" className="font-deva text-lg font-semibold">
          {a.answerTitle}
        </p>
        <ul lang="mr" className="mt-1.5 space-y-1">
          {a.answer.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.18, ease }}
              className="flex gap-2 font-deva text-sm leading-snug text-cream/90"
            >
              <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-leaf-bright">
                <path d="M8 14C8 9 5 6 2 5c0 4 2 7 6 9Zm0 0c0-5 3-8 6-9 0 4-2 7-6 9Z" fill="currentColor" />
              </svg>
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
