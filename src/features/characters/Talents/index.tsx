import Image from "next/image";

import type { CharacterTalent } from "@/data/types/shared";
import { CircleArrow } from "@/assets/svgs/direction";

import { cn } from "@/lib/style";
import Card from "@/components/ui/Card";
import { getPotentialIcons, getPromotionIcons } from "@/components/ui/IconList";
import { TalentProvider } from "./store";
import * as Client from "./client";

type TalentsProps = { talents: Record<number, CharacterTalent[]> };

/**
 * @description Displays the talents of the character based on their
 *  experience & potentials.
 */
export default function Talents({ talents }: TalentsProps) {
  if (Object.keys(talents).length === 0) return null;
  return (
    <Card
      as="section"
      aria-label="Talent"
      defaultPadding
      className={cn(
        "col-span-2 row-span-2 overflow-clip @container",
        "relative flex flex-col gap-4 bg-secondary-10/75 md:gap-8",
      )}
    >
      {Object.values(talents).map((talent, idx) => (
        <TalentProvider key={idx} talent={talent}>
          <Talent />
        </TalentProvider>
      ))}
      <Image
        src={`/patterns/crystal.webp`}
        alt=""
        width={256}
        height={256}
        draggable={false}
        className="absolute left-0 top-0 z-[-1] size-full select-none object-cover opacity-15"
      />
    </Card>
  );
}

/** @description Displays information about an single talent. */
function Talent() {
  return (
    <article className="grid gap-2 text-[clamp(0.8rem,3cqw,1.15rem)]">
      <div className="flex w-fit items-center gap-2 rounded-lg bg-secondary-20 px-2.5 py-1">
        <Client.TalentName />
        <Client.PromotionIcon
          icons={getPromotionIcons({ size: 16, className: "size-[1lh]" })}
        />
        <Client.LevelVariantIndicator />
      </div>
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
        </div>
      </Client.ContentRenderer>
    </article>
  );
}
