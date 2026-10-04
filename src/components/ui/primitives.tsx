import Link from "next/link";
import { site } from "@/lib/site";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
};

/** Tactile, organic button: soft press, gentle lift, no glow. */
export function ButtonLink({ href, children, variant = "primary", className }: ButtonProps) {
  const styles = {
    primary: "bg-forest text-cream hover:bg-forest-soft shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-12px_rgba(29,58,42,0.7)]",
    ghost: "border border-forest/25 text-forest hover:border-forest/50 hover:bg-sage-soft/50",
    light: "bg-cream text-forest hover:bg-white",
  }[variant];
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-organic)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        styles,
        className,
      )}
    >
      {children}
      <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
        <path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export function Eyebrow({ index, children, tone = "dark" }: { index?: string; children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={cx(
        "mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.14em] uppercase",
        tone === "dark" ? "text-leaf" : "text-sage",
      )}
    >
      {index && <span className="font-display text-base tracking-normal tabular-nums opacity-70">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      {children}
    </p>
  );
}

export function SectionIntro({
  index,
  eyebrow,
  title,
  children,
  tone = "dark",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cx("max-w-3xl", className)}>
      <Eyebrow index={index} tone={tone}>
        {eyebrow}
      </Eyebrow>
      <h2 className={cx("text-4xl sm:text-5xl lg:text-[3.5rem]", tone === "dark" ? "text-forest" : "text-cream")}>{title}</h2>
      {children && (
        <div className={cx("mt-6 text-lg sm:text-xl", tone === "dark" ? "text-muted" : "text-sage-soft/90")}>{children}</div>
      )}
    </div>
  );
}

/**
 * Marks a claim that still needs SEED U approval (brief §1, §11).
 * Hidden when NEXT_PUBLIC_SHOW_APPROVAL_MARKERS=false.
 */
export function Pending({ note, children }: { note: string; children?: React.ReactNode }) {
  if (!site.showApprovalMarkers) return <>{children}</>;
  return (
    <span className="inline">
      {children}
      <span
        title={note}
        className="ml-1.5 inline-flex translate-y-[-2px] items-center gap-1 rounded-full border border-turmeric/50 bg-turmeric/10 px-2 py-0.5 align-middle font-sans text-[0.7rem] font-semibold tracking-wide text-soil uppercase"
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-turmeric" />
        Pending approval
        <span className="sr-only">: {note}</span>
      </span>
    </span>
  );
}

export function Tag({ children, tone = "leaf" }: { children: React.ReactNode; tone?: "leaf" | "soil" | "muted" }) {
  const styles = {
    leaf: "bg-sage-soft text-forest",
    soil: "bg-turmeric/15 text-soil",
    muted: "bg-cream-deep text-muted",
  }[tone];
  return <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase", styles)}>{children}</span>;
}
