"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion honours the visitor's reduced-motion preference site-wide. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
