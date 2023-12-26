import type { SkillIds, SkillIconIds } from "./typesFrom";

import type { RangeId } from "./AKRange";

export type SkillId = (typeof SkillIds)[number];
/**
 * @description Used to identify the icon file for skill if it's not null
 *  (ie: SkillId isn't used as the icon file identifier).
 */
export type SkillIconId = (typeof SkillIconIds)[number];

/** @description The final object representing an operator skill. */
export interface Skill {
  id: SkillId;
  iconId: SkillId | SkillIconId;
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
