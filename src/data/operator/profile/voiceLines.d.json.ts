import type { OperatorId } from "@/types/AKOperator";
import type { VoiceLine } from "@/types/AKVoice";

declare const voiceLines: Record<OperatorId, VoiceLine[]>;

export default voiceLines;
