"use client";

import { Children, useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui/primitives";

/** Native horizontal swipe (CSS scroll-snap, no library) with position dots. */
export function SwipeCards({ label, children }: { label: string; children: React.ReactNode }) {
  const items = Children.toArray(children);
  const scroller = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { root, threshold: 0.6 },
    );
    Array.from(root.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const show = (i: number) => {
    const card = scroller.current?.children[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div>
      <ul
        ref={scroller}
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pt-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li key={i} data-i={i} className="flex w-[84%] max-w-[22rem] shrink-0 snap-start">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show card ${i + 1} of ${items.length}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => show(i)}
            className="flex h-11 w-7 items-center justify-center"
          >
            <span className={cx("h-2 rounded-full transition-[width,background-color] duration-300", active === i ? "w-5 bg-leaf" : "w-2 bg-forest/20")} />
          </button>
        ))}
      </div>
    </div>
  );
}
