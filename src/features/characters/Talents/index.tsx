import type { CharacterTalent } from "@/data/types/shared";
import { CircleArrow } from "@/assets/svgs/navigation";
import { talentsAtom } from "./store";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { ScopeProvider } from "@/lib/jotai/scope";
import Card from "@/components/ui/Card";
import { getPotentialIcons, getPromotionIcons } from "@/components/ui/IconList";
import * as Client from "./client";

type TalentsProps = {
  talents: Record<number, CharacterTalent[]>;
  short?: boolean;
};

/**
 * @description Displays the talents of the character based on their
 *  experience & potentials.
 */
export default function Talents({ talents, short = false }: TalentsProps) {
  if (Object.keys(talents).length === 0) return null;
  return (
    <Card
      as="section"
      aria-label="Talent"
      style={{
        background:
          "no-repeat 0 0 / cover url('/patterns/crystal_opac.webp'), #121C2BBF",
      }}
      className={cn("col-span-2 @container", { "row-span-2": !short })}
    >
      <div
        className={cn(
          "no-scrollbar relative flex flex-col gap-4 overflow-y-auto p-2 sm:p-4 md:gap-8",
          {
            "md:aspect-square": !short,
            "md:max-h-[calc((100cqw-1rem)/2)]": short,
          },
        )}
      >
        {Object.values(talents).map((talent, idx) => (
          <ScopeProvider key={idx} atoms={[talentsAtom]}>
            <HydrateAtoms atomValues={[[talentsAtom, talent]]}>
              <Talent />
            </HydrateAtoms>
          </ScopeProvider>
        ))}
      </div>
    </Card>
  );
}

/** @description Displays information about an single talent. */
function Talent() {
  return (
    <article className="grid gap-2 text-[clamp(0.8rem,3cqw,1.15rem)]">
      <Client.TalentHeading
        icons={getPromotionIcons({ size: 16, className: "size-[1lh]" })}
      />
      <Client.ConditionMessage />

      <Client.ContentRenderer>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-[0.9em]">
          <div>
            <Client.PotentialIcon
              icons={getPotentialIcons({
                altBuilder: (val) => `At Potential ${val}`,
              })}
            />
            <Client.UpgradeIcon
              active={
                <CircleArrow className="text-primary-80 drop-shadow-[0_0_2px_#95E6FF40]" />
              }
              inactive={<CircleArrow className="text-primary-80/25" />}
            />
          </div>
          <Client.TalentDescription />
          <Client.TalentRange />
        </div>
      </Client.ContentRenderer>
    </article>
  );
}
