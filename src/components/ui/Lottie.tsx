"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import { useInView, useReducedMotion } from "framer-motion";
import { cx } from "./primitives";

type Props = {
  /** Path to a Lottie JSON file in /public. */
  src: string;
  /** Controlled mode: tween to this frame whenever it changes. */
  frame?: number;
  /** Autoplay mode: play this segment once when the player scrolls into view. */
  segment?: [number, number];
  /** "meet" shows the whole canvas; "slice" fills the box and crops from the top. */
  fit?: "meet" | "slice";
  className?: string;
};

/**
 * Lightweight Lottie player. The SVG-only lottie-web build and the JSON are
 * fetched only when the player is about to enter the viewport, so neither
 * touches the initial page load. Reduced motion jumps straight to the end frame.
 * Decorative: pair it with real text.
 */
export function Lottie({ src, frame, segment, fit = "meet", className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);
  const [ready, setReady] = useState(false);
  const near = useInView(box, { once: true, margin: "600px 0px" });
  const visible = useInView(box, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    let item: AnimationItem | undefined;
    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled || !box.current) return;
      item = lottie.loadAnimation({
        container: box.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: src,
        rendererSettings: { preserveAspectRatio: `xMidYMax ${fit}`, progressiveLoad: true },
      });
      item.addEventListener("DOMLoaded", () => {
        if (cancelled || !item) return;
        item.goToAndStop(0, true);
        anim.current = item;
        setReady(true);
      });
    });
    return () => {
      cancelled = true;
      item?.destroy();
      anim.current = null;
    };
  }, [near, src, fit]);

  // Controlled: grow (or shrink) from wherever the plant is now to `frame`.
  useEffect(() => {
    const a = anim.current;
    if (!ready || !a || frame === undefined || !visible) return;
    const now = a.firstFrame + a.currentFrame;
    if (reduced || Math.abs(now - frame) < 0.5) a.goToAndStop(frame, true);
    else a.playSegments([now, frame], true);
  }, [frame, ready, visible, reduced]);

  // Autoplay once.
  const from = segment?.[0];
  const to = segment?.[1];
  useEffect(() => {
    const a = anim.current;
    if (!ready || !a || from === undefined || to === undefined || !visible) return;
    if (reduced) a.goToAndStop(to, true);
    else a.playSegments([from, to], true);
  }, [from, to, ready, visible, reduced]);

  return <div ref={box} aria-hidden className={cx("[&_svg]:block", className)} />;
}
