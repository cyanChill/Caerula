import type { OperatorId } from "@/types/AKOperator";

declare const edgeStore: {
  "latest-operator-ids": OperatorId[];
};

export default edgeStore;
