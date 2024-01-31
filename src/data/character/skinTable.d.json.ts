import type { OperatorId, TokenId } from "@/data/types/AKCharacter";
import type { Brand, BrandId, Skin, SkinId } from "@/data/types/AKSkin";

declare const SkinTable: {
  brandTable: Record<BrandId, Brand>;
  skinTable: Record<SkinId, Skin>;
  charSkinMap: Record<OperatorId | TokenId, SkinId[]>;
};

export default SkinTable;
