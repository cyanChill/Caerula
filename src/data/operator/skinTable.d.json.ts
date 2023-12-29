import type { OperatorId } from "@/data/types/AKCharacter";
import type { Brand, BrandId, Skin, SkinId } from "@/data/types/AKSkin";

declare const skinTable: {
  brandTable: Record<BrandId, Brand>;
  skinTable: Record<SkinId, Skin>;
  opSkinMap: Record<OperatorId, SkinId[]>;
};

export default skinTable;
