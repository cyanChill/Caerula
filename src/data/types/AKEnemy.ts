import type {
  AttackPatterns,
  ClassTiers,
  EnemyIds,
  EnemyRaceTable,
} from "./typesFrom";
import type { StatTable } from "./shared";

export type EnemyId = (typeof EnemyIds)[number];
export type EnemyRace = (typeof EnemyRaceTable)[keyof typeof EnemyRaceTable];
export type EnemyTier = (typeof ClassTiers)[number];
export type AttackPattern = (typeof AttackPatterns)[number];

/** @description The debuffs enemies can be immune to. */
export const Debuffs = [
  "Stun",
  "Silence",
  "Sleep",
  "Frozen",
  "Levitate",
] as const;
export type StatusEffect = (typeof Debuffs)[number];

/** @description Describes the stats of an enemy. */
export type EnemyStat = StatTable & {
  // FIXME: Not completely sure if the mapping for the elemental resistances are correct
  erst: number; // epDamageResistance (Reduce Elemental Damage Taken By Percent)
  irst: number; // epResistance (Reduce Elemental Impairement Build-up By Percent)
  mvSpd: number; // moveSpeed
  atkRange: number; // rangeRadius
};

/** @description Structure of how we display an enemy ability. */
export type EnemyAbility = {
  text: string;
  textFormat: "SILENCE" | "NORMAL" | "TITLE";
};

/** @description Object representing an Arknights enemy. */
export interface Enemy {
  sort: number;
  id: EnemyId;
  slug: string;
  code: string;
  name: string;
  description: string;
  race: EnemyRace | null;
  type: EnemyTier;
  attackPattern: AttackPattern;
  abilityList: EnemyAbility[];
  immunities: StatusEffect[];
  lifePointReduction: number; // lifePointReduce
  weight: number; // massLevel
  isFlying: boolean;
  relatedEnemies: EnemyId[];
}
