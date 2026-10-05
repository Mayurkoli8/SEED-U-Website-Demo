"use client";

import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const MOBILE = "(max-width: 1023.98px)";

/** Scrolls to the mobile copy (`#m-ask`) of a desktop chapter anchor (`#ask`). Returns whether it did. */
function jumpToMobileChapter(hash: string) {
  if (!hash || !window.matchMedia(MOBILE).matches) return false;
  const target = document.getElementById(`m-${decodeURIComponent(hash.slice(1))}`);
  if (!target) return false;
  target.scrollIntoView();
  return true;
}

/**
 * Story progress as a thin leaf-green line across the top of the screen (the
 * phone counterpart of the desktop GrowthRail), plus the hash bridge for links
 * such as the footer's `/#ask`.
 */
export function MobileChrome() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Arriving with a hash (/#ask): the desktop target is hidden, so go to the mobile one.
    const raf = requestAnimationFrame(() => jumpToMobileChapter(window.location.hash));

    // Same-page links: let the router update the URL, then scroll to the visible chapter.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      requestAnimationFrame(() => jumpToMobileChapter(url.hash));
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-leaf" />;
}
