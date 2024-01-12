import type { Metadata, ResolvingMetadata } from "next";

import { constructMetadata } from "@/lib/metadata";
import { ScrollSlide } from "@/components/layout/ScrollSlide";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return constructMetadata({
    parentMetadata: await parent,
    title: "Disclaimer",
    description: "Site disclaimer.",
    route: "/disclaimer",
  });
}

export default function Disclaimer() {
  return (
    <ScrollSlide
      sections={[
        {
          id: "disclaimer",
          title: "Disclaimer",
          content: <DisclaimerText />,
          glow: `from-[#32A852]`,
          options: { hideArrows: true },
        },
      ]}
    />
  );
}

function DisclaimerText() {
  return (
    <div className="max-w-prose space-y-4 text-[clamp(0.9rem,1.5cqw,3rem)] lg:pt-[5svh]">
      <p>
        Arknights is a mobile game developed & distributed by
        ©Hypergryph/Studio Montagne/Yostar. The in-game assets contained in
        this repository and used on the site are the property of
        Hypergryph/Yostar. This repository & site may contain copyrighted
        material whose use may not have been specifically authorized by the
        copyright holder.
      </p>
      <p>
        This project is not affiliated or endorsed by Arknights&apos; creators &
        distributors and is distributed without profit for research and
        educational purposes.
      </p>
    </div>
  );
}
