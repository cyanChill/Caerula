"use client";
import { atom } from "jotai";

import type { CharacterBase, CharacterStat } from "@/data/types/shared";

export type Recipient = Pick<CharacterBase, "name" | "range" | "stats"> & {
  id: string;
  href: string;
  bonus?: CharacterStat;
  iconId: string;
};

export const levelAtom = atom(1);
/** The current max level based on the current promotion. */
export const maxLevelAtom = atom(
  (get) => get(recipientAtom).stats[get(promotionAtom)].maxLevel,
);

export const promotionAtom = atom(0);
export const maxPromotionAtom = atom(
  (get) => get(recipientAtom).stats.length - 1,
); // From `0` to `2`

export const recipientIdAtom = atom("");
export const recipientAtom = atom(
  (get) => get(recipientsAtom).find(({ id }) => id === get(recipientIdAtom))!,
);
export const recipientsAtom = atom<Recipient[]>([]);

// Values representing the current experience of the recipient.
export const statAtom = atom<CharacterStat>((get) =>
  getCurrentStats(get(levelAtom), get(recipientAtom).stats[get(promotionAtom)]),
);
export const rangeAtom = atom(
  (get) => get(recipientAtom).range[get(promotionAtom)],
);
export const bonusAtom = atom((get) => get(recipientAtom).bonus);

export const setLevelAtom = atom(null, (get, set, newLevel: number) => {
  if (newLevel < 1 || newLevel > get(maxLevelAtom)) return;
  set(levelAtom, newLevel);
});

export const setPromotionAtom = atom(null, (get, set, newPromo: number) => {
  if (newPromo < 0 || newPromo > get(maxPromotionAtom)) return;
  if (newPromo === get(promotionAtom)) return;
  set(levelAtom, 1);
  set(promotionAtom, newPromo);
});

export const setRecipientAtom = atom(null, (get, set, id: string) => {
  const recipient = get(recipientsAtom).find((rcpt) => rcpt.id === id);
  if (!recipient) return;
  set(recipientIdAtom, id);
});

/** @description Current stat of character at current level & promotion. */
function getCurrentStats(
  lvl: number,
  promoStats: CharacterBase["stats"][number],
) {
  const [startStat, endStat] = promoStats.stats;
  const lvlDiff = promoStats.maxLevel - 1;
  // Calculate the increments in the attributes that change per level-up.
  const incrementPerLvl = {
    hp: (endStat.hp - startStat.hp) / lvlDiff,
    atk: (endStat.atk - startStat.atk) / lvlDiff,
    def: (endStat.def - startStat.def) / lvlDiff,
  };
  // Calculate & return current attribute values.
  return {
    ...startStat,
    hp: Math.round(startStat.hp + incrementPerLvl.hp * (lvl - 1)),
    atk: Math.round(startStat.atk + incrementPerLvl.atk * (lvl - 1)),
    def: Math.round(startStat.def + incrementPerLvl.def * (lvl - 1)),
  };
}
