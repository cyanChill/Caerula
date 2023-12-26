import type { OperatorIds } from "./typesFrom";

import type { NationId, FactionId, TeamId } from "./AKAffiliation";
import type { Profession, SubClass } from "./AKClass";
import type { ItemCount } from "./AKItem";
import type { RangeId } from "./AKRange";
import type { SkillId } from "./AKSkill";
import type { TokenId } from "./AKToken";

export type OperatorId = (typeof OperatorIds)[number];

/** @description Describes where an operator can be placed on the map. */
export type Position = "MELEE" | "RANGED" | "ALL";

/** @description Conversions of the raw data. */
export type EliteLvl = 0 | 1 | 2;
export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

/** @description An operator's stats at a specific level. */
type AttrFields = {
  hp: number;
  atk: number;
  def: number;
  res: number;
  cost: number;
  blockCnt: number;
  atkInterval: number; // baseAttackTime
  respawnTime: number;
};

export type StatAtLevel = {
  level: number;
  data: AttrFields;
};

export type RawStatAtLevel = {
  level: number;
  data: Omit<AttrFields, "hp" | "res" | "atkInterval"> & {
    maxHp: number;
    magicResistance: number;
    baseAttackTime: number;
  };
};

/** @description Specification of operation at promotion rank. */
export type Elite = {
  maxLevel: number;
  stats: StatAtLevel[]; // Note: Really just "[StatAtLevel, StatAtLevel]"
  evolveCost: ItemCount[] | null;
};

/** @description Specification of skill mastery cost. */
export type OpSkill = {
  skillId: SkillId;
  tokenUsed: TokenId | null;
  unlockedAt: EliteLvl;
  masteryCost: MasteryCost[];
};
export type MasteryCost = {
  upgradeTime: number;
  ingredients: ItemCount[];
};

/** @description Specification of operator talent. */
export type OpTalent = {
  name: string;
  variants: OpTalentVariant[];
};
export type OpTalentVariant = {
  nameOverride?: string;
  elite: EliteLvl;
  level: number;
  potential: Rarity;
  description: string;
};

/** @description Specification of cost to level up skill from 1 to 7. */
export type SkillCost = {
  level: 2 | 3 | 4 | 5 | 6 | 7;
  cost: ItemCount[];
};

/** @description The final object representing an operator. */
export interface Operator {
  id: OperatorId;
  name: string;
  displayName: string;
  rarity: Rarity;
  potentials: string[];
  profession: Profession;
  branch: SubClass<Profession>;
  range: RangeId[];
  tokensUsed: TokenId[] | null;
  elite: Elite[];
  skills: OpSkill[];
  talents: OpTalent[];
  trustBonus: StatAtLevel;
  skillLevel: SkillCost[];
  nationId: NationId | null;
  factionId: FactionId | null;
  teamId: TeamId | null;
  position: Position;
  tags: string[];
  type: "limited" | "is" | null;
  slug: string;
}
