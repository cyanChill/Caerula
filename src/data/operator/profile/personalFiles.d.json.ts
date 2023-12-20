import type { OpPersonalFile } from "@/data/types/AKOPFiles";
import type { OperatorId } from "@/data/types/AKOperator";

declare const personalFiles: Record<OperatorId, OpPersonalFile[]>;

export default personalFiles;
