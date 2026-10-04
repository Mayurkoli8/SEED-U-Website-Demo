import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero, Prose } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the SEED U website handles information: what we collect, why, and your choices.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero path="/privacy-policy" crumb="Privacy policy" eyebrow="Legal" title="Privacy policy" lede={<p>Last updated: 4 October 2026</p>} />
      <section className="pb-28">
        <Container>
          <p className="mb-10 max-w-3xl rounded-2xl bg-turmeric/10 p-4 text-soil ring-1 ring-turmeric/30">
            Draft for review. This policy must be reviewed by SEED U&apos;s legal adviser, including against India&apos;s Digital Personal
            Data Protection Act, 2023, before launch.
          </p>
          <Prose>
            <p>This policy explains how {site.name} handles information when you visit {site.url}.</p>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Messages you send us.</strong> The contact form opens your own email app. We receive only what you choose to send
                by email.
              </li>
              <li>
                <strong>Demo questions.</strong> Questions typed into the &ldquo;Ask SEED U&rdquo; demo are processed in your browser and are
                not sent to our servers.
              </li>
              <li>
                <strong>Analytics (if enabled).</strong> If we turn on website analytics, we collect aggregated usage information such as
                pages visited and device type, to improve the site.
              </li>
            </ul>
            <h2>How we use information</h2>
            <p>To reply to your enquiry, to improve the website, and to keep it secure. We do not sell personal information.</p>
            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct or delete information you have sent us by writing to{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
            <h2>Changes</h2>
            <p>We will update this page if our practices change.</p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
