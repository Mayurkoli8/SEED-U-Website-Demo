import type { PartnerType } from "@/lib/content";

/** Simple organic line icons. Decorative. */
export function PartnerIcon({ icon }: { icon: PartnerType["icon"] }) {
  const paths: Record<PartnerType["icon"], React.ReactNode> = {
    kvk: <path d="M4 20h16M6 20V10l6-5 6 5v10M10 20v-5h4v5" />,
    fpo: <path d="M12 21v-7m0 0c0-4-3-7-7-7 0 4 3 7 7 7Zm0 0c0-4 3-7 7-7 0 4-3 7-7 7Zm0-7V3" />,
    farmer: <path d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 13v-4a6 6 0 0 1 12 0v4M4 12c2-1 4-1 5 0" />,
    research: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 14h9" />,
    ngo: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
    tech: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.5-8.5 2 2m7 7 2 2m0-11-2 2m-7 7-2 2" />,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[icon]}
    </svg>
  );
}
