import type { ProfessionTable } from "./typesFrom";
import type { AttackPosition } from "./shared";
import type { RangeId } from "./AKRange";

export type ProfessionId = keyof typeof ProfessionTable;
export type BranchId = (typeof ProfessionTable)[ProfessionId][number];

/** @description Object going in-depth about a specific subclass. */
export type Branch = {
  id: BranchId;
  name: string;
  position: AttackPosition;
  range: RangeId[];
  trait: string;
};
