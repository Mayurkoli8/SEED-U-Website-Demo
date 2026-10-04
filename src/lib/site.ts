/**
 * Central site configuration. Everything that might change between
 * environments is read from NEXT_PUBLIC_* variables (see .env.example).
 */

export const site = {
  name: "SEED U",
  legalName: "SEED U",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seedu.io").replace(/\/$/, ""),
  tagline: "Ask. Understand. Grow.",
  description:
    "SEED U builds Indian-language AI, starting with Marathi agriculture. A farmer asks a question in their own language and gets clear guidance they can act on.",
  // Contact address is not published on the current site — confirm before launch.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@seedu.io",
  linkedin: "https://www.linkedin.com/company/seed-u/",
  // Set NEXT_PUBLIC_SHOW_APPROVAL_MARKERS=false once every flagged claim is approved.
  showApprovalMarkers: process.env.NEXT_PUBLIC_SHOW_APPROVAL_MARKERS !== "false",
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/platform", label: "Platform" },
  { href: "/marathi-agriculture-ai", label: "Marathi Agri AI" },
  { href: "/what-we-have-built", label: "What We've Built" },
  { href: "/partners", label: "Partners" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { href: "/platform", label: "What we do" },
      { href: "/marathi-agriculture-ai", label: "Marathi Agriculture AI" },
      { href: "/what-we-have-built", label: "What we have built" },
      { href: "/#ask", label: "Try the demo" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About & team" },
      { href: "/partners", label: "For partners" },
      { href: "/blog", label: "Blog & news" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
    ],
  },
];
