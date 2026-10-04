import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Lottie } from "@/components/ui/Lottie";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl text-center">
        {/* Bare ground, then a young plant: the page isn't planted yet. */}
        <Lottie src="/lottie/corn-growing.json" segment={[0, 29]} fit="slice" className="mx-auto mb-8 h-32 w-72 overflow-hidden" />
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="text-5xl text-forest sm:text-6xl">This field hasn&apos;t been planted yet.</h1>
        <p className="mt-6 text-xl text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">Back to the home page</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
