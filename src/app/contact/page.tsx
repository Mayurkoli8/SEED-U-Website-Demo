import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Pending } from "@/components/ui/primitives";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact SEED U about partnerships, investment or general enquiries on Indian-language and agricultural AI.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        path="/contact"
        crumb="Contact"
        eyebrow="Contact"
        title="Let's talk."
        lede={<p>Partnerships, investment or a simple question. We read every message.</p>}
      />
      <section aria-label="Contact details and form" className="pb-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8 text-lg">
            <div>
              <h2 className="text-2xl text-forest">Email</h2>
              <p className="mt-2">
                <Pending note="No email is published on the current site. Confirm the public contact address.">
                  <a href={`mailto:${site.contactEmail}`} className="font-semibold text-forest underline decoration-leaf/50 underline-offset-4">
                    {site.contactEmail}
                  </a>
                </Pending>
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-forest">LinkedIn</h2>
              <p className="mt-2">
                <a href={site.linkedin} rel="noopener noreferrer" target="_blank" className="font-semibold text-forest underline decoration-leaf/50 underline-offset-4">
                  linkedin.com/company/seed-u
                </a>
              </p>
            </div>
            <div className="rounded-3xl bg-cream p-6 text-base text-muted ring-1 ring-forest/10">
              <p>
                <strong className="text-forest">Partners:</strong> tell us who you work with and the questions they need answered.
              </p>
              <p className="mt-3">
                <strong className="text-forest">Investors:</strong> we are happy to share more about our work and plans.
              </p>
            </div>
          </div>
          <Suspense fallback={<div className="min-h-96 rounded-[2rem] bg-mist" />}>
            <ContactForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
