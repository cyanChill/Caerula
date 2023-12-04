import type { TokenIds } from "./typesFrom";

import type { Elite, Position, OperatorId } from "./AKOperator";
import type { RangeId } from "./AKRange";
import type { SkillId } from "./AKSkill";

export type TokenId = (typeof TokenIds)[number];

export type TokenType =
  | "summon"
  | "trap"
  | "reinforcement"
  | "support"
  | "other";

/** @description The final object representing a token. */
export interface Token {
  id: TokenId;
  iconId: TokenId; // Will be different from `id` on `'Thunderer' (Advanced)`
  name: string;
  displayName: string;
  description: string;
  position: Position;
  range: RangeId;
  stats: Omit<Elite, "evolveCost">[];
  skillIds: (SkillId | null)[];
  type: TokenType;
  usedBy: OperatorId | null;
  slug: string;
}
