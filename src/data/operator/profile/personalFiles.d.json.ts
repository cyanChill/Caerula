import type { OpPersonalFile } from "@/types/AKOPFiles";
import type { OperatorId } from "@/types/AKOperator";

declare const personalFiles: Record<OperatorId, OpPersonalFile[]>;

export default personalFiles;
