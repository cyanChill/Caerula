import type { SkillIds } from "./typesFrom";

import type { RangeId } from "./AKRange";

export type SkillId = (typeof SkillIds)[number];

/** @description The final object representing an operator skill. */
export interface Skill {
  id: SkillId;
  iconId: string;
  name: string;
  // Populated the description with the appropriate template value
  description: string[];
  rangeId: RangeId | null;
  activationType: "Passive" | "Manual" | "Auto";
  spRecovery: "Auto" | "Offensive" | "Defensive" | "Passive";
  // Each position is for skill level (x + 1)
  spCost: number[];
  initSp: number[];
  duration: number[];
}
