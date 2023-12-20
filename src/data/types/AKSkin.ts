import type { BrandIds } from "./typesFrom";

export type BrandId = (typeof BrandIds)[number];

export interface Brand {
  id: BrandId;
  name: string;
  capitalName: string;
  description: string;
}

export interface OperatorSkin {
  id: string;
  name: string;
  alt: string;
  brandId: BrandId;
  subBrand: { id: string; name: string };
  artists: string[] | null;
  description: string | null;
}
