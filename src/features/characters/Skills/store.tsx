"use client";
import { atom } from "jotai";

/** Remember to subtract 1 if we're using this as an array index. */
export const skillLevelAtom = atom(1);
export const maxSkillLevelAtom = atom(7); // `7` or `10`

export const setSkillLevelAtom = atom(null, (get, set, newLevel: number) => {
  if (newLevel < 1 || newLevel > get(maxSkillLevelAtom)) return;
  set(skillLevelAtom, newLevel);
});
