import type { OperatorId } from "@/data/types/AKCharacter";

declare const latestStore: {
  "latest-operator-ids": OperatorId[];
  "latest-skin-ids": string[];
};

export default latestStore;
