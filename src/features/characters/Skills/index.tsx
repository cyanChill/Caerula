import Image from "next/image";

import type { Skill } from "@/data/types/AKSkill";
import { maxSkillLevelAtom } from "./store";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import Tabs, { Tab, TabList, TabPanel } from "@/components/layout/Tabs";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { getSkillLevelIcons } from "@/components/ui/IconList";
import { ContainedRange } from "@/features/characters/RangePattern";
import * as Client from "./client";

export type CharSkill = Skill & { tokenName?: string };

type SkillsProps = { skills: CharSkill[] };

/** @description Displays the skills the character has. */
export default function Skills({ skills }: SkillsProps) {
  if (skills.length === 0) return null;
  return (
    <HydrateAtoms atomValues={[[maxSkillLevelAtom, skills[0].initSp.length]]}>
      <Tabs storeId="char-skill" tabKeys={skills.map(({ id }) => id)}>
        <Card
          as="section"
          className={cn(
            "relative col-span-2 row-span-2 @container md:col-span-3",
            "grid grid-flow-dense grid-cols-[minmax(0,1fr)_min(95px,25%)] bg-secondary-20/75",
          )}
        >
          <Actions skills={skills} />
          <SkillInfo skills={skills} />
        </Card>
      </Tabs>
    </HydrateAtoms>
  );
}

/** @description Contains buttons to switch the current skill & skill level. */
function Actions({ skills }: SkillsProps) {
  return (
    <div
      className={cn(
        "col-start-2 m-1 ml-0 flex flex-col gap-4 p-2 sm:p-3",
        "rounded-l-md rounded-r-2xl bg-secondary-10",
      )}
    >
      <TabList
        label="Skill List"
        orientation="vertical"
        className="flex flex-col gap-4"
      >
        {skills.map(({ id, iconId, name }) => (
          <Tab
            key={id}
            id={id}
            label={name}
            activeClass="ring-4"
            className={cn(
              "overflow-clip rounded-md shadow-lift outline-0",
              "ring-secondary-60 hover:ring-4 focus:ring-4 focus:ring-primary-60",
            )}
          >
            <Image
              src={`/images/character/skill/skill_icon_${iconId}.webp`}
              alt=""
              width={32}
              height={32}
              className="size-full"
            />
          </Tab>
        ))}
      </TabList>
      <div className="relative mt-8 @container md:mt-auto">
        <Client.SkillLevelKnob />
        <Client.SkillLevelIcon
          icons={getSkillLevelIcons({
            className: "absolute-center size-[55cqw]",
          })}
        />
      </div>
    </div>
  );
}

/**
 * @description Display information about the current skill (only 1
 *  tabpanel will be rendered).
 */
function SkillInfo({ skills }: SkillsProps) {
  return skills.map(({ spRecovery, activationType, ...skill }) => (
    <TabPanel
      key={skill.id}
      id={skill.id}
      className={cn(
        "h-[32rem] max-h-[32rem] p-4 pr-2 @container md:h-auto md:pr-4",
        "md:max-h-[calc((2*(100cqw-2rem)/3)+1rem)]",
        "no-scrollbar overflow-y-auto text-[clamp(0.7rem,2.25cqw,1rem)]",
      )}
    >
      <h2 className="break-anywhere mb-2 text-[2.25em] leading-tight">
        {skill.name}
      </h2>

      <ul className="mb-4 flex flex-wrap gap-x-2 gap-y-1 text-[0.85em]">
        {/* Skill Initial SP */}
        <Client.SkillAttrRenderer data={skill.initSp}>
          <EChip iconId="init_sp" className="border-current">
            <Client.SkillAttrValue data={skill.initSp} /> Initial SP
          </EChip>
        </Client.SkillAttrRenderer>
        {/* Skill SP Cost */}
        <Client.SkillAttrRenderer data={skill.spCost}>
          <EChip iconId="sp_cost" className="border-current text-[#C8E845]">
            <Client.SkillAttrValue data={skill.spCost} /> SP Cost
          </EChip>
        </Client.SkillAttrRenderer>

        {spRecovery !== "Passive" && (
          <EChip
            className={cn("text-black", {
              "border-[#8EC31D] bg-[#8EC31D]": spRecovery === "Auto",
              "border-[#FD793B] bg-[#FD793B]": spRecovery === "Offensive",
              "border-[#FFB401] bg-[#FFB401]": spRecovery === "Defensive",
            })}
          >
            {spRecovery} Recovery
          </EChip>
        )}
        <EChip className="border-zinc-600 bg-zinc-600">
          {activationType} {activationType !== "Passive" && "Trigger"}
        </EChip>

        {/* Skill Duration */}
        <Client.SkillAttrRenderer data={skill.duration}>
          <EChip iconId="duration" className="border-zinc-700 bg-zinc-700">
            <Client.SkillAttrValue data={skill.duration} />s Duration
          </EChip>
        </Client.SkillAttrRenderer>
      </ul>

      <Client.SkillDescription descriptions={skill.description} />
      <TokenNote name={skill.tokenName} />
      <ContainedRange rangeId={skill.rangeId} optional />
    </TabPanel>
  ));
}

type EChipProps = {
  iconId?: string;
  className: string;
  children: React.ReactNode;
};

/** @description Extended `<Chip />` for this feature. */
function EChip({ iconId, className, children }: EChipProps) {
  const icon = iconId ? (
    <Image
      src={`/images/character/ui/skill/${iconId}.webp`}
      alt=""
      width={16}
      height={16}
      className="size-[1em]"
    />
  ) : undefined;
  return (
    <Chip color="custom" radius="medium" asListItem {...{ icon, className }}>
      {children}
    </Chip>
  );
}

/** @description Displays a note if the skill uses a specific token. */
function TokenNote({ name }: { name: string | undefined }) {
  if (!name) return null;
  return (
    <p className="mb-4">
      <span className="font-semibold underline">Note:</span> This skill uses{" "}
      <span className="text-[#F49800]">{name}</span>.
    </p>
  );
}
