"use client";
import { atom } from "jotai";

import type { Enemy, StatusEffect } from "@/data/types/AKEnemy";
import { EnemyEventTable } from "@/data/enemy/enemyEvent";

export const enemyLookupFilterAtom = atom({
  event: undefined as string | undefined, // `keyof EnemyEventTable`
  type: new Array<string>(), // `EnemyTier[]`
  position: new Array<string>(), // `("GROUND" | "FLYING")[]`
  race: new Array<string>(), // `(EnemyRace | "None")[]`
  immunities: new Array<string>(), // `StatusEffect[]`
  attackPattern: new Array<string>(), // `AttackPattern[]`
});

export const enemiesAtom = atom<
  Array<
    Pick<
      Enemy,
      | "sort"
      | "id"
      | "slug"
      | "code"
      | "name"
      | "race"
      | "type"
      | "attackPattern"
      | "immunities"
      | "isFlying"
    >
  >
>([]);

export const filteredEnemiesListAtom = atom((get) => {
  const f = get(enemyLookupFilterAtom);
  return get(enemiesAtom)
    .filter((opp) => {
      switch (true) {
        case !!f.event && !EnemyEventTable[f.event].enemies.includes(opp.id):
        case f.type.length > 0 && !f.type.includes(opp.type):
        case f.position.length > 0 &&
          !f.position.includes(opp.isFlying ? "FLYING" : "GROUND"):
        case f.race.length > 0 && !f.race.includes(opp.race ?? "None"):
        case f.immunities.length > 0 &&
          !f.immunities.every((eff) =>
            opp.immunities.includes(eff as StatusEffect),
          ):
        case f.attackPattern.length > 0 &&
          !f.attackPattern.includes(opp.attackPattern):
          return false;
        default:
          return true;
      }
    })
    .toSorted((a, b) => a.sort - b.sort);
});
