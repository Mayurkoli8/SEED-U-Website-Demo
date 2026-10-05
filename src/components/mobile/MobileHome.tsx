import { MobileChrome } from "./MobileChrome";
import { StoryStage } from "./StoryStage";
import { MobileAction } from "./MobileAction";
import { MobileVision } from "./MobileVision";
import { MobileAsk, MobileBuilt, MobileClose, MobilePartners } from "./MobileSections";

/**
 * The home page on phones and tablets (below `lg`): its own story, not the
 * desktop layout stacked. Chapters 01–05 play over one pinned farm scene;
 * the rest are touch-first sections. Section ids carry an `m-` prefix so they
 * never collide with the desktop ones, and MobileChrome maps `#ask`-style
 * links onto them.
 */
export function MobileHome() {
  return (
    <>
      <MobileChrome />
      <StoryStage />
      <MobileAsk />
      <MobileAction />
      <MobileBuilt />
      <MobilePartners />
      <MobileVision />
      <MobileClose />
    </>
  );
}
