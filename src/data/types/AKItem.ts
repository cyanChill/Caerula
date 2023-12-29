import type { ItemIds } from "./typesFrom";
import type { Rarity } from "./shared";

export type ItemId = (typeof ItemIds)[number];

/** @description General structure of how materials are used. */
export type ItemCount = { id: ItemId; count: number };

export interface AKItem {
  id: ItemId;
  iconId: string;
  name: string;
  description: string | null;
  usage: string | null;
  rarity: Rarity;
}
