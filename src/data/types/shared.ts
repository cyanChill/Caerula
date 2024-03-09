import type { AttackPositions } from "./typesFrom";
import type { ItemCount } from "./AKItem";
import type { RangeId } from "./AKRange";

/** @description Where a character can be placed, or how an enemies attacks. */
export type AttackPosition = (typeof AttackPositions)[number];

export type EliteLvl = 0 | 1 | 2;
export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

/** @description Common portion of stats that are shared. */
export type StatTable = {
  hp: number; // maxHp
  atk: number;
  def: number;
  res: number; // magicResistance
  atkInterval: number; // baseAttackTime
};

export type UnlockCondition = { elite: EliteLvl; level: number };

/** @description Fields shared between Operator & Token schemas. */
export type CharacterBase = {
  slug: string;
  name: string;
  displayName: string;
  rarity: Rarity;
  position: AttackPosition;
  range: RangeId[];
  stats: {
    maxLevel: number;
    stats: CharacterStat[]; // Will contain 2 values
    evolveCost: ItemCount[];
  }[];
  talents: Record<number, CharacterTalent[]>;
};

/**
 * @description A character's stat at the min or max level in a
 *  phase/promotion level (Elite 0/1/2).
 */
export type CharacterStat = StatTable & {
  cost: number;
  blockCnt: number;
  respawnTime: number;
};

export type CharacterTalent = {
  name: string;
  description: string;
  range: RangeId | null;
  potential: Rarity;
  unlockCond: UnlockCondition;
};
