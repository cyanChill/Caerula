import type { OperatorId } from "@/data/types/AKCharacter";
import type { OpFile, OpParadox, OpRecord } from "@/data/types/AKOPFiles";

declare const profileTable: {
  fileTable: Record<OperatorId, OpFile[]>;
  paradoxTable: Record<OperatorId, OpParadox>;
  recordTable: Record<OperatorId, OpRecord[]>;
};

export default profileTable;
