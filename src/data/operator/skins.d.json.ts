import type { OperatorId } from "@/data/types/AKOperator";
import type { BrandId, Brand, OperatorSkin } from "@/data/types/AKSkin";

declare const skins: {
  brandTable: Record<BrandId, Brand>;
  skinTable: Record<OperatorId, OperatorSkin[]>;
};

export default skins;
