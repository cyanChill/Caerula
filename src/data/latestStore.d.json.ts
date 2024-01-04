import type { OperatorId } from "@/data/types/AKCharacter";
import type { SkinId } from "@/data/types/AKSkin";

declare const latestStore: {
  "latest-operator-ids": OperatorId[];
  "latest-skin-ids": SkinId[];
};

export default latestStore;
