import { cx } from "./primitives";

/** Seed-sprout mark: a seed splitting into two leaves. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cx("h-8 w-8", className)}>
      <circle cx="16" cy="16" r="15" fill="#1d3a2a" />
      <path d="M16 25v-8" stroke="#f6f1e6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 18c-1-4-4.5-6-8-5.5.4 3.6 3.6 6 8 5.5Z" fill="#a8bea0" />
      <path d="M16 16c.8-4.6 4.4-7.3 8.6-7-.2 4.4-3.8 7.4-8.6 7Z" fill="#74a95c" />
      <ellipse cx="16" cy="25.5" rx="3.4" ry="1.4" fill="#8a6a4a" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={cx("font-display text-xl font-semibold tracking-tight", tone === "dark" ? "text-forest" : "text-cream")}>
        SEED U
      </span>
    </span>
  );
}
