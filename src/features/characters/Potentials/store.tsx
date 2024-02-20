"use client";
import { atom } from "jotai";

/** Remember to subtract 1 if we're using this as an array index. */
export const potentialAtom = atom(1);
export const maxPotentialAtom = atom(6); // From `1` to `6`

export const setPotentialAtom = atom(null, (get, set, newPot: number) => {
  if (newPot < 1 || newPot > get(maxPotentialAtom)) return;
  set(potentialAtom, newPot);
});
