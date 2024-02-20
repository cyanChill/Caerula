"use client";
import { createContext, useContext } from "react";
import { useAtomValue } from "jotai";

import type { CharacterTalent } from "@/data/types/shared";
import { levelAtom, promotionAtom } from "../Experience/store";
import { potentialAtom } from "../Potentials/store";

const TalentContext = createContext<{
  data: CharacterTalent;
  isUnlocked: boolean;
  upgradable: { promotion: boolean; potential: boolean };
  levelImprove: { elite: number; level: number } | null;
} | null>(null);

/**
 * @description Accesses the necessary stores to output information about
 *  the current talent.
 */
export function TalentProvider(props: {
  talent: CharacterTalent[];
  children: React.ReactNode;
}) {
  const level = useAtomValue(levelAtom);
  const promotion = useAtomValue(promotionAtom);
  const potential = useAtomValue(potentialAtom);

  const filteredPromo = props.talent
    .toReversed()
    .filter((t) => t.unlockCond.elite <= promotion);
  const filteredLevel = filteredPromo.filter(
    (t) => t.unlockCond.level <= level,
  );
  const filteredPot = filteredLevel.filter((t) => t.potential <= potential);

  const talentValue = filteredPot[0] || props.talent[0];
  const isUnlocked = filteredPot[0] !== undefined;

  // Determine if the talent has improvement based on level
  const currPromo = talentValue.unlockCond.elite;
  const levelVariants = new Set(
    props.talent
      .filter(({ unlockCond }) => unlockCond.elite === currPromo)
      .map(({ unlockCond }) => unlockCond.level),
  );
  const improvedWithLevel = isUnlocked && levelVariants.size > 1;
  const lvlUnlockConfig = improvedWithLevel
    ? {
        elite: currPromo,
        // If this occurs, there should only be 2 numbers
        level: [...levelVariants].filter((lvl) => lvl !== 1)[0],
      }
    : null;

  return (
    <TalentContext.Provider
      value={{
        // Default to base talent value if no filters match (ie: if unlocked at Elite 1)
        data: talentValue,
        isUnlocked,
        upgradable: {
          promotion: props.talent.length !== filteredPromo.length,
          potential: filteredLevel.length !== filteredPot.length,
        },
        levelImprove: lvlUnlockConfig,
      }}
    >
      {props.children}
    </TalentContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
export function useTalentStore() {
  const store = useContext(TalentContext);
  if (!store) throw new Error("Cannot use outside of TalentProvider.");
  return store;
}
