import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="py-28 sm:py-40">
      <Container className="max-w-3xl text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="text-5xl text-forest sm:text-6xl">This field hasn&apos;t been planted yet.</h1>
        <p className="mt-6 text-xl text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">Back to the home page</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
