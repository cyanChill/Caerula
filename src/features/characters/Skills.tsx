"use client";
import { useState } from "react";
import Image from "next/image";

import type { Skill } from "@/data/types/AKSkill";

import { cn } from "@/lib/style";
import Tabs from "@/components/layout/Tabs";
import Knob from "@/components/form/Knob";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { ContainedRange } from "./RangePattern";

type CharSkill = Skill & { tokenName?: string };

interface Props {
  skills: CharSkill[];
}

/** @description Displays the skills the character has. */
export default function Skills({ skills }: Props) {
  const [skillLvl, setSkillLvl] = useState(1);

  if (skills.length === 0) return null;
  return (
    <Tabs storeId="char-skill" dataStore={skills.map(({ id }) => ({ id }))}>
      <Card
        as="section"
        className={cn(
          "relative col-span-2 row-span-2 @container md:col-span-3 md:aspect-[3/2]",
          "grid grid-flow-dense grid-cols-[minmax(0,1fr)_min(100px,25%)] bg-secondary-20/75",
        )}
      >
        <Actions {...{ skills, skillLvl, setSkillLvl }} />
        <SkillInfo {...{ skills, skillLvl }} />
      </Card>
    </Tabs>
  );
}

interface ActionsProps extends SkillInfoProps {
  setSkillLvl: (lvl: number) => void;
}

/** @description Contains buttons to switch the current skill & skill level. */
function Actions({ skills, skillLvl, setSkillLvl }: ActionsProps) {
  return (
    <Tabs.TabList
      label="Skill List"
      orientation="vertical"
      className={cn(
        "col-start-2 m-1 ml-0 flex flex-col gap-4 p-2 @container sm:p-3",
        "rounded-l-md rounded-r-2xl bg-secondary-10",
      )}
    >
      {skills.map(({ id, iconId, name }, idx) => (
        <Tabs.Tab
          key={idx}
          id={id}
          label={name}
          activeClass="ring-4 ring-secondary-60"
          className={cn(
            "overflow-clip rounded-md shadow-lift outline-0",
            "focus:ring-4 focus:ring-primary-60",
          )}
        >
          <Image
            src={`/images/character/skill/skill_icon_${iconId}.webp`}
            alt=""
            width={32}
            height={32}
            className="size-full"
          />
        </Tabs.Tab>
      ))}

      <div className="relative mt-8 @container md:mt-auto">
        <Knob
          label="Skill Level Selector"
          options={{
            min: 1,
            max: skills[0].description.length,
            trackWidth: `clamp(0.25rem, 12.5cqw, 0.4rem)`,
          }}
          propagateVal={setSkillLvl}
          theme={{ track: { active: "#FF5449" } }}
        />
        <SkillLvlIcon lvl={skillLvl} />
      </div>
    </Tabs.TabList>
  );
}

/** @description Returns image indicating the current skill level. */
function SkillLvlIcon({ lvl }: { lvl: number }) {
  const iconId = lvl < 8 ? lvl : `m-${lvl - 7}`;
  const alt = lvl < 8 ? `Level ${lvl}` : `Mastery ${lvl - 7}`;
  return (
    <Image
      src={`/images/character/ui/skill/${iconId}.webp`}
      alt={`Skill ${alt}`}
      width={32}
      height={32}
      className="absolute-center size-[55cqw]"
    />
  );
}

interface SkillInfoProps {
  skills: CharSkill[];
  skillLvl: number;
}

/**
 * @description Display information about the current skill (only 1
 *  tabpanel will be rendered).
 */
function SkillInfo({ skills, skillLvl }: SkillInfoProps) {
  const lvl = skillLvl - 1; // Offset by 1 to match array index.
  return skills.map(({ spRecovery, activationType, ...skill }) => (
    <Tabs.TabPanel
      key={skill.id}
      id={skill.id}
      className={cn(
        "h-[32rem] max-h-[32rem] p-4 pr-2 @container md:h-auto md:max-h-none md:pr-4",
        "no-scrollbar overflow-y-auto text-[clamp(0.7rem,2.25cqw,1rem)]",
      )}
    >
      <h2 className="break-anywhere mb-2 text-[2.25em] leading-tight">
        {skill.name}
      </h2>

      <ul className="mb-4 flex flex-wrap gap-x-2 gap-y-1 text-[0.85em]">
        {skill.initSp[lvl] > 0 && (
          <EChip iconId="init_sp" className="border-current">
            {skill.initSp[lvl]} Initial SP
          </EChip>
        )}
        {skill.spCost[lvl] > 0 && (
          <EChip iconId="sp_cost" className="border-current text-[#C8E845]">
            {skill.spCost[lvl]} SP Cost
          </EChip>
        )}
        {spRecovery !== "Passive" && (
          <EChip
            className={cn({
              "border-[#8EC31D] bg-[#8EC31D]": spRecovery === "Auto",
              "border-[#FD793B] bg-[#FD793B]": spRecovery === "Offensive",
              "border-[#FFB401] bg-[#FFB401]": spRecovery === "Defensive",
            })}
          >
            {spRecovery} Recovery
          </EChip>
        )}
        <EChip className="border-zinc-500 bg-zinc-500">
          {activationType} {activationType !== "Passive" && "Trigger"}
        </EChip>
        {skill.duration[lvl] > 0 && (
          <EChip iconId="duration" className="border-zinc-600 bg-zinc-600">
            {skill.duration[lvl]}s Duration
          </EChip>
        )}
      </ul>

      <p
        dangerouslySetInnerHTML={{ __html: skill.description[lvl] }}
        className="mb-4 whitespace-pre-line"
      />
      <TokenNote name={skill.tokenName} />
      <ContainedRange rangeId={skill.rangeId} optional />
    </Tabs.TabPanel>
  ));
}

type EChipProps = {
  iconId?: string;
  className: string;
  children: React.ReactNode;
};

/** @description Extended `<Chip />` for this feature. */
function EChip({ iconId, children, ...props }: EChipProps) {
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
    <Chip color="custom" radius="medium" asListItem {...{ icon, ...props }}>
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
