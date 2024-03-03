"use client";
import { atom } from "jotai";

import type { Operator } from "@/data/types/AKCharacter";

export type OperatorLookupFilterType = {
  rarity: number[]; // `Rarity[]`
  classFilter: string; // `"profession" | "branch"`
  profession: string[]; // `Profession[]`
  branch: string[]; // `BranchId[]`
  affiliation?: string; // `NationId | FactionId | TeamId | undefined`
  type: string[]; // `("regular" | "limited" | "is")[]`
  position: string[]; // `("MELEE" | "RANGED")[]`
};

export const operatorLookupFilterAtom = atom<OperatorLookupFilterType>({
  rarity: [],
  classFilter: "profession",
  profession: [],
  branch: [],
  affiliation: undefined,
  type: [],
  position: [],
});

export const operatorsAtom = atom<
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
  >[]
>([]);

export const isFiltersValidAtom = atom((get) => {
  const filters = get(operatorLookupFilterAtom);
  return (
    filters.rarity.length > 0 ||
    filters.profession.length > 0 ||
    filters.branch.length > 0 ||
    !!filters.affiliation ||
    filters.type.length > 0 ||
    filters.position.length > 0
  );
});

export const filteredOperatorsListAtom = atom((get) => {
  if (!get(isFiltersValidAtom)) return [];

  const filters = get(operatorLookupFilterAtom);
  return get(operatorsAtom)
    .filter((op) => {
      if (filters.rarity.length > 0 && !filters.rarity.includes(op.rarity))
        return false;
      if (
        filters.profession.length > 0 &&
        !filters.profession.includes(op.profession)
      )
        return false;
      if (filters.branch.length > 0 && !filters.branch.includes(op.branch))
        return false;
      if (filters.affiliation) {
        const { nation, faction, team } = op.affiliation;
        const aff = filters.affiliation;
        if (nation !== aff && faction !== aff && team !== aff) return false;
      }
      if (
        filters.type.length > 0 &&
        !filters.type.includes(op.type ?? "regular")
      )
        return false;
      if (
        filters.position.length > 0 &&
        !filters.position.includes(op.position)
      )
        return false;

      return true;
    })
    .toSorted((a, b) => a.displayName.localeCompare(b.displayName));
});
