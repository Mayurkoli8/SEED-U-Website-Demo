import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero, Prose } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the SEED U website, including the illustrative nature of the Ask SEED U demo.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero path="/terms" crumb="Terms & conditions" eyebrow="Legal" title="Terms & conditions" lede={<p>Last updated: 4 October 2026</p>} />
      <section className="pb-28">
        <Container>
          <p className="mb-10 max-w-3xl rounded-2xl bg-turmeric/10 p-4 text-soil ring-1 ring-turmeric/30">
            Draft for review. These terms must be reviewed by SEED U&apos;s legal adviser before launch.
          </p>
          <Prose>
            <p>By using {site.url} you agree to these terms.</p>
            <h2>Information on this website</h2>
            <p>
              Content is provided for general information about {site.name}. We work to keep it accurate, and we clearly distinguish
              current work from planned capabilities and long-term vision.
            </p>
            <h2>The &ldquo;Ask SEED U&rdquo; demo</h2>
            <p>
              The demo uses a small set of sample answers stored in the website. It is not a live AI system and does not provide
              professional agricultural advice. Always confirm decisions with a qualified local expert, such as your Krishi Vigyan Kendra
              (KVK) or agriculture officer.
            </p>
            <h2>Intellectual property</h2>
            <p>The {site.name} name, logo, text and illustrations on this website belong to {site.name} unless stated otherwise.</p>
            <h2>Links</h2>
            <p>We are not responsible for the content of external websites we link to.</p>
            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
