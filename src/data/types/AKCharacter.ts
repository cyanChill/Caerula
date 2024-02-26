import type { OperatorIds, RoleTags, TokenIds } from "./typesFrom";
import type { CharacterBase, CharacterStat, UnlockCondition } from "./shared";

import type { Affiliations } from "./AKAffiliation";
import type { BranchId, Profession } from "./AKClass";
import type { ItemCount } from "./AKItem";
import type { SkillId } from "./AKSkill";

export type OperatorId = (typeof OperatorIds)[number];
export type RoleTag = (typeof RoleTags)[number];
export type TokenId = (typeof TokenIds)[number];

export type CharacterDamage = "NONE" | "PHYSICAL" | "MAGICAL" | "HEAL";

/** @description Specification of skill mastery cost. */
export type OpSkill = {
  id: SkillId;
  tokenUsed: TokenId | null;
  unlockCond: UnlockCondition;
  masteryCost: MasteryCost[];
};
export type MasteryCost = { upgradeTime: number; ingredients: ItemCount[] };

/** @description Specification of cost to level up skill from 1 to 7. */
export type SkillCost = {
  level: 2 | 3 | 4 | 5 | 6 | 7;
  cost: ItemCount[];
};

export interface Operator extends CharacterBase {
  id: OperatorId;
  potentials: string[];
  profession: Profession;
  branch: BranchId;
  skills: OpSkill[];
  skillLevel: SkillCost[];
  trustBonus: CharacterStat; // Max trust is achieved at 100% (Trust is from 0-200%)
  affiliation: Affiliations;
  tags: RoleTag[];
  type: "limited" | "is" | null;
  tokensUsed: TokenId[] | null;
}

/** @description List of the categories of tokens there are. */
export type TokenClassification =
  | "summon"
  | "trap"
  | "reinforcement"
  | "support"
  | "other";

export interface Token extends CharacterBase {
  id: TokenId;
  iconId: string; // Will be different from `id` on `'Thunderer' (Advanced)`
  trait: string;
  skillIds: (SkillId | null)[];
  type: TokenClassification;
  usedBy: OperatorId | null;
}
