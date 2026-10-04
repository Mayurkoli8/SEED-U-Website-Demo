"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cx } from "@/components/ui/primitives";

const CHAPTERS = [
  { id: "question", label: "The question" },
  { id: "problem", label: "The real problem" },
  { id: "language", label: "Language" },
  { id: "intelligence", label: "Intelligence" },
  { id: "farm", label: "The farm" },
  { id: "ask", label: "Ask SEED U" },
  { id: "action", label: "Answer to action" },
  { id: "built", label: "What we've built" },
  { id: "partners", label: "Partners" },
  { id: "vision", label: "Vision" },
  { id: "join", label: "Build with us" },
];

/** Scroll-controlled seed-to-tree: a stem grows down the page, each chapter a leaf. Desktop only. */
export function GrowthRail() {
  const { scrollYProgress } = useScroll();
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(CHAPTERS.findIndex((c) => c.id === e.target.id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Story chapters" className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block">
      <div className="relative py-2">
        <div aria-hidden className="absolute top-0 bottom-0 left-[11px] w-0.5 rounded-full bg-forest/10" />
        <motion.div aria-hidden style={{ scaleY: grow }} className="absolute top-0 bottom-0 left-[11px] w-0.5 origin-top rounded-full bg-leaf" />
        <ol className="relative space-y-3.5">
          {CHAPTERS.map((c, i) => {
            const passed = i <= active;
            return (
              <li key={c.id}>
                <a href={`#${c.id}`} aria-current={i === active ? "step" : undefined} className="group relative flex items-center">
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <svg viewBox="0 0 24 24" className={cx("h-6 w-6 transition-transform duration-500", passed ? "scale-100" : "scale-50")} aria-hidden>
                      {passed ? (
                        <path d="M12 20c0-7 4-12 9-13-1 7-5 12-9 13Zm0 0c0-5-3-9-8-10 0 5 3 9 8 10Z" fill={i === active ? "#d6a03f" : "#4b8a3b"} />
                      ) : (
                        <ellipse cx="12" cy="12" rx="5" ry="3.6" fill="#8a6a4a" opacity="0.7" />
                      )}
                    </svg>
                  </span>
                  <span
                    className={cx(
                      "pointer-events-none absolute right-full mr-2 rounded-full bg-paper px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-forest opacity-0 shadow-sm ring-1 ring-forest/10 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")} · {c.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
