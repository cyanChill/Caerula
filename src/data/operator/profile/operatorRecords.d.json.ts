import type { OpRecord } from "@/data/types/AKOPFiles";
import type { OperatorId } from "@/data/types/AKOperator";

declare const operatorRecords: Record<OperatorId, OpRecord[]>;

export default operatorRecords;
