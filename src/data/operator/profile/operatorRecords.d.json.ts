import type { OpRecord } from "@/types/AKOPFiles";
import type { OperatorId } from "@/types/AKOperator";

declare const operatorRecords: Record<OperatorId, OpRecord[]>;

export default operatorRecords;
