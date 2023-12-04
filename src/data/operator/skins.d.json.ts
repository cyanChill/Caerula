import type { OperatorId } from "@/types/AKOperator";
import type { BrandId, Brand, OperatorSkin } from "@/types/AKSkin";

declare const skins: {
  brandTable: Record<BrandId, Brand>;
  skinTable: Record<OperatorId, OperatorSkin[]>;
};

export default skins;
