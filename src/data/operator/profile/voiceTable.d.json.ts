import type { OperatorId } from "@/data/types/AKCharacter";
import type { CharacterVoice, DialogueLine } from "@/data/types/AKVoice";

declare const VoiceTable: {
  cvTable: Record<string, CharacterVoice[]>;
  dialogueTable: Record<string, DialogueLine[]>;
  opVoiceMap: Record<OperatorId, string[]>;
};

export default VoiceTable;
