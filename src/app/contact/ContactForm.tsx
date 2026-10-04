"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/primitives";

const TYPES = [
  { value: "partnership", label: "Partnership" },
  { value: "investment", label: "Investment" },
  { value: "general", label: "General enquiry" },
] as const;

const field =
  "mt-2 w-full rounded-2xl bg-paper px-4 py-3 text-lg text-ink ring-1 ring-forest/15 placeholder:text-muted/60 focus:ring-2 focus:ring-leaf focus:outline-none";

/**
 * No backend: composes an email in the visitor's mail app. Replace with a
 * server action or form service when SEED U chooses one.
 */
export function ContactForm() {
  const params = useSearchParams();
  const initial = TYPES.find((t) => t.value === params.get("type"))?.value ?? "general";
  const [type, setType] = useState<string>(initial);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const label = TYPES.find((t) => t.value === type)?.label ?? "Enquiry";
    const subject = `[${label}] ${data.get("subject") || "Enquiry"} from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}${data.get("org") ? `\n${data.get("org")}` : ""}`;
    track("contact_submit", { type });
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-mist p-6 ring-1 ring-forest/10 sm:p-9">
      <fieldset>
        <legend className="text-sm font-semibold text-forest">What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label
              key={t.value}
              className={cx(
                "cursor-pointer rounded-full px-4 py-2.5 text-[0.95rem] font-semibold ring-1 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-turmeric",
                type === t.value ? "bg-forest text-cream ring-forest" : "bg-paper text-forest ring-forest/15 hover:bg-sage-soft",
              )}
            >
              <input type="radio" name="type" value={t.value} checked={type === t.value} onChange={() => setType(t.value)} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-forest">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-semibold text-forest">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-sm font-semibold text-forest">
          Organisation <span className="font-normal text-muted">(optional)</span>
          <input name="org" autoComplete="organization" className={field} />
        </label>
        <label className="block text-sm font-semibold text-forest">
          Subject
          <input name="subject" className={field} />
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold text-forest">
        Message
        <textarea name="message" required rows={5} className={cx(field, "resize-y")} />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">This opens your email app with the message ready to send.</p>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-7 text-lg font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Write the email
        </button>
      </div>
      {sent && (
        <p role="status" className="mt-4 rounded-2xl bg-paper p-4 text-forest ring-1 ring-leaf/30">
          Your email app should open now. If it does not, write to us directly at{" "}
          <a className="font-semibold underline" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}
