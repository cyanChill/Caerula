import type { NationIds, FactionIds, TeamIds } from "./typesFrom";

/** @description Nations in the world of Arknights. */
export type NationId = (typeof NationIds)[number];

/** @description Factions that belongs to a Nation. */
export type FactionId = (typeof FactionIds)[number];

/** @description Team formed between operators. */
export type TeamId = (typeof TeamIds)[number];

/** @description Shorthand for checking all affiliation types. */
export type Affilations = {
  nation?: NationId;
  faction?: FactionId;
  team?: TeamId;
};