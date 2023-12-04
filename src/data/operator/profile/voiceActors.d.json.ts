import type { OperatorId } from "@/types/AKOperator";
import type { VoiceActor } from "@/types/AKVoice";

declare const voiceActors: Record<OperatorId, VoiceActor[]>;

export default voiceActors;
