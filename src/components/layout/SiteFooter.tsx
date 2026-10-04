import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/primitives";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest text-sage-soft">
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full text-paper sm:h-16">
        <path d="M0 0h1440v28c-180 30-360 44-540 34S540 28 360 34 120 58 0 52Z" fill="currentColor" />
      </svg>
      <Container className="grid gap-12 pt-10 pb-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-lg text-sage-soft/85">
            A question becomes knowledge. Knowledge becomes action. Action helps the farm grow.
          </p>
          <a
            href={site.linkedin}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-sage/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-soft"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-1 1.83-1.9 3.77-1.9 4.03 0 4.77 2.5 4.77 5.8v5.5h-4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.94 1.3-1.94 2.6v5H10v-11Z" />
            </svg>
            SEED U on LinkedIn
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-sage uppercase">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-cream/90 underline-offset-4 hover:text-cream hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-sage/15 py-6 text-sm text-sage/80 sm:flex-row sm:justify-between">
        <p>© 2026 SEED U. All rights reserved.</p>
        <p>Building India&apos;s linguistic future, one question at a time.</p>
      </Container>
    </footer>
  );
}
