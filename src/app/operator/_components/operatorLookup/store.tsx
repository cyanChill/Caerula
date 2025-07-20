"use client";
import { atom } from "jotai";

import type { Operator } from "@/data/types/AKCharacter";

export const operatorLookupFilterAtom = atom({
  rarity: new Array<number>(), // `Rarity[]`
  profession: new Array<string>(), // `Profession[]`
  branch: new Array<string>(), // `BranchId[]`
  affiliation: undefined as string | undefined, // `NationId | FactionId | TeamId | undefined`
  type: new Array<string>(), // `("regular" | "limited" | "is")[]`
  position: new Array<string>(), // `("MELEE" | "RANGED")[]`
});

export const operatorsAtom = atom<
  Array<
    Pick<
      Operator,
      | "id"
      | "slug"
      | "displayName"
      | "rarity"
      | "profession"
      | "branch"
      | "affiliation"
      | "type"
      | "position"
    >
  >
>([]);

export const isFiltersValidAtom = atom((get) => {
  const f = get(operatorLookupFilterAtom);
  return (
    f.rarity.length > 0 ||
    f.profession.length > 0 ||
    f.branch.length > 0 ||
    !!f.affiliation ||
    f.type.length > 0 ||
    f.position.length > 0
  );
});

export const filteredOperatorsListAtom = atom((get) => {
  if (!get(isFiltersValidAtom)) return [];

  const f = get(operatorLookupFilterAtom);
  return get(operatorsAtom)
    .filter((op) => {
      switch (true) {
        case f.rarity.length > 0 && !f.rarity.includes(op.rarity):
        case f.profession.length > 0 && !f.profession.includes(op.profession):
        case f.branch.length > 0 && !f.branch.includes(op.branch):
        case f.type.length > 0 && !f.type.includes(op.type ?? "regular"):
        case f.position.length > 0 && !f.position.includes(op.position):
          return false;
        case !!f.affiliation:
          const { nation, faction, team } = op.affiliation;
          const aff = f.affiliation;
          if (nation !== aff && faction !== aff && team !== aff) return false;
        default:
          return true;
      }
    })
    .toSorted((a, b) => a.displayName.localeCompare(b.displayName));
});
