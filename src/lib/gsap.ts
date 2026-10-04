"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Builds GSAP scroll choreography scoped to an element and reverts it on
 * unmount. Use `mm.add(MOTION_OK, ...)` so reduced-motion visitors get the
 * calm, fully-rendered end state.
 */
export function useScrollScene(scope: RefObject<HTMLElement | null>, build: (mm: gsap.MatchMedia, el: HTMLElement) => void) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    build(mm, el);
    return () => mm.revert();
    // Scenes are built once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
