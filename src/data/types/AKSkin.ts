import type { BrandIds, SkinIds } from "./typesFrom";
import type { OperatorId, TokenId } from "./AKCharacter";

export type BrandId = (typeof BrandIds)[number];
export type SkinId = (typeof SkinIds)[number];

export interface Brand {
  id: BrandId;
  name: string;
  altName: string; // Capitalized version of `name` that might include more info
  description: string;
}

export interface Skin {
  id: SkinId;
  usedBy: OperatorId | TokenId;
  brandId: BrandId | null;
  subBrand: { id: string; name: string };
  name: string;
  imgAlt: string;
  description: string | null;
  artists: string[] | null; // Currently, array contains only 1 artist
  releasedAt: number;
}
