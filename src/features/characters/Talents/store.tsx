"use client";
import { atom } from "jotai";

import type { CharacterTalent } from "@/data/types/shared";
import { levelAtom, promotionAtom } from "../Experience/store";
import { potentialAtom } from "../Potentials/store";

// Filtering talents based on current promotion, level, and potential.
const filteredPromoAtom = atom((get) =>
  get(talentsAtom)
    .toReversed()
    .filter((t) => t.unlockCond.elite <= get(promotionAtom)),
);
const filterePotAtom = atom((get) =>
  get(filteredPromoAtom).filter((t) => t.potential <= get(potentialAtom)),
);
const filteredLevelAtom = atom((get) =>
  get(filterePotAtom).filter((t) => t.unlockCond.level <= get(levelAtom)),
);

export const isTalentUnlockedAtom = atom(
  (get) => get(filteredLevelAtom)[0] !== undefined,
);
export const isPotUpgradableAtom = atom(
  (get) => get(filterePotAtom).length !== get(filteredPromoAtom).length,
);
export const levelImproveAtom = atom((get) => {
  const currPromo = get(talentAtom).unlockCond.elite;
  const levelVariants = new Set(
    get(talentsAtom)
      .filter((t) => t.unlockCond.elite === currPromo)
      .map((t) => t.unlockCond.level),
  );

  return get(isTalentUnlockedAtom) && levelVariants.size > 1
    ? {
        elite: currPromo,
        // If this occurs, there should only be 2 numbers
        level: [...levelVariants].filter((lvl) => lvl !== 1)[0],
      }
    : null;
});

/** Defaults to first iteration of talent if criterias aren't met. */
export const talentAtom = atom(
  (get) => get(filteredLevelAtom)[0] || get(talentsAtom)[0],
);
export const talentsAtom = atom<CharacterTalent[]>([]);
