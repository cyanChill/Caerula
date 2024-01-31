"use client";
import { useMemo } from "react";
import Image from "next/image";

import type { CharacterTalent, UnlockCondition } from "@/data/types/shared";
import { CircleArrow } from "@/assets/svgs/direction";

import { useLevel, usePromotion } from "./Experience.store";
import { usePotential } from "./Potentials";

import { cn } from "@/lib/style";

interface Props {
  talents: Record<number, CharacterTalent[]>;
}

/**
 * @description Displays the talents of the character based on their
 *  experience & potentials.
 */
export default function Talent({ talents }: Props) {
  if (Object.keys(talents).length === 0) return null;
  return (
    <section
      aria-label="Talent"
      className={cn(
        "col-span-2 row-span-2 overflow-clip @container",
        "card relative flex flex-col gap-4 bg-secondary-10/75 p-2 sm:p-4 md:gap-8",
      )}
    >
      {Object.values(talents).map((talent, idx) => (
        <Variant key={idx} talent={talent} />
      ))}
      <Image
        src={`/patterns/crystal.webp`}
        alt=""
        width={256}
        height={256}
        draggable={false}
        className="absolute left-0 top-0 z-[-1] size-full select-none object-cover opacity-15"
      />
    </section>
  );
}

/** @description Information about an single talent. */
function Variant({ talent }: { talent: CharacterTalent[] }) {
  const { data, unlocked, upgradable, levelImprove } = useTalent(talent);

  return (
    <article className="grid gap-2 text-[clamp(0.8rem,3cqw,1.15rem)]">
      <div className="flex w-fit items-center gap-2 rounded-lg bg-secondary-20 px-2.5 py-1">
        <h2 className="break-anywhere">{data.name}</h2>
        <Image
          src={`/images/character/ui/elite/${data.unlockCond.elite}-s.webp`}
          alt=""
          width={16}
          height={16}
          className="size-[1lh]"
        />
      </div>
      <Message
        unlocked={unlocked}
        unlockCond={data.unlockCond}
        improveCond={levelImprove}
      />
      <TalentContent
        unlocked={unlocked}
        data={data}
        potentialUpgrade={upgradable.potential}
      />
    </article>
  );
}

/** @description Hook to help narrow down what talent value should be displayed. */
function useTalent(talent: CharacterTalent[]) {
  const level = useLevel();
  const promotion = usePromotion();
  const potential = usePotential();

  return useMemo(() => {
    const filteredPromo = talent
      .toReversed()
      .filter((t) => t.unlockCond.elite <= promotion);

    const filteredLevel = filteredPromo.filter(
      (t) => t.unlockCond.level <= level,
    );
    const improvedWithLevel = filteredPromo.length !== filteredLevel.length;

    const filteredPot = filteredLevel.filter((t) => t.potential <= potential);

    const talentValue = filteredPot[0] || talent[0];
    const isUnlocked = filteredPot[0] !== undefined;

    return {
      // Default to base talent value if no filters match (ie: if unlocked at Elite 1)
      data: talentValue,
      unlocked: isUnlocked,
      upgradable: {
        promotion: talent.length !== filteredPromo.length,
        potential: filteredLevel.length !== filteredPot.length,
      },
      levelImprove:
        improvedWithLevel && isUnlocked ? filteredPromo[0].unlockCond : null,
    };
  }, [talent, level, promotion, potential]);
}

/** @description Displays an unlock or improvement condition for talent. */
function Message(props: {
  unlocked: boolean;
  unlockCond: UnlockCondition;
  improveCond: UnlockCondition | null;
}) {
  const level = useLevel();

  let message: string | null = null;
  if (!props.unlocked) {
    message = `Unlocked at Elite ${props.unlockCond.elite} Level ${props.unlockCond.level}.`;
  } else if (props.improveCond && level < props.improveCond.level) {
    message = `Improved at Elite ${props.improveCond.elite} Level ${props.improveCond.level}`;
  }

  if (!message) return null;
  return <p className="text-[0.9em] text-neutral-80">{message}</p>;
}

/** @description Displays information about the talent. */
function TalentContent(props: {
  unlocked: boolean;
  data: CharacterTalent;
  potentialUpgrade: boolean;
}) {
  if (!props.unlocked) return null;
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-[0.9em]">
      <div>
        <Image
          src={`/images/character/ui/potential/${props.data.potential}.webp`}
          alt={`At Potential ${props.data.potential}`}
          width={32}
          height={32}
        />
        <PotentialUpgrade
          upgradable={props.potentialUpgrade}
          potential={props.data.potential}
        />
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: props.data.description }}
        className="whitespace-pre-line"
      />
    </div>
  );
}

/** @description Displays an icon whether the talent is upgraded with potential. */
function PotentialUpgrade(props: { upgradable: boolean; potential: number }) {
  if (!props.upgradable && props.potential === 1) return null;
  return (
    <CircleArrow
      className={cn("text-primary-80/25", {
        // Full opacity & glow effect if talent is no longer upgradable.
        "text-primary-80 drop-shadow-[0_0_2px_#95E6FF40]": !props.upgradable,
      })}
    />
  );
}
