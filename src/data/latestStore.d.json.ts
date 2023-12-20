import type { OperatorId } from "@/data/types/AKOperator";

declare const latestStore: {
  "latest-operator-ids": OperatorId[];
  "latest-skin-ids": string[];
};

export default latestStore;
