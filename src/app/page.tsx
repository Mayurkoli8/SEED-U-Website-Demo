import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { LanguageSection } from "@/components/home/LanguageSection";
import { IntelligenceSection } from "@/components/home/IntelligenceSection";
import { FarmSection } from "@/components/home/FarmSection";
import { AskSection } from "@/components/home/AskSection";
import { ActionSection } from "@/components/home/ActionSection";
import { BuiltSection } from "@/components/home/BuiltSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { VisionSection } from "@/components/home/VisionSection";
import { CtaSection } from "@/components/home/CtaSection";
import { GrowthRail } from "@/components/home/GrowthRail";
import { MobileHome } from "@/components/mobile/MobileHome";

export const metadata = {
  ...pageMetadata({
    title: "SEED U — AI that understands the farmer",
    description:
      "SEED U builds Indian-language AI, starting with Marathi agriculture. Ask a farming question in your own language and get clear guidance you can act on.",
    path: "/",
  }),
  title: { absolute: "SEED U — AI that understands the farmer" },
};

export default function HomePage() {
  return (
    <>
      {/* Desktop and phones tell the story differently; CSS picks one, so there is no layout flash. */}
      <div className="max-lg:hidden">
        <GrowthRail />
        <Hero />
        <ProblemSection />
        <LanguageSection />
        <IntelligenceSection />
        <FarmSection />
        <AskSection />
        <ActionSection />
        <BuiltSection />
        <PartnersSection />
        <VisionSection />
        <CtaSection />
      </div>
      <div className="lg:hidden">
        <MobileHome />
      </div>
    </>
  );
}
