export const VoiceLangTable = {
  CN_MANDARIN: "CN - Mandarin",
  CN_TOPOLECT: "CN - Regional",
  JP: "JP",
  EN: "EN",
  KR: "KR",
  LINKAGE: "Collaboration",
  ITA: "IT",
} as const;

export type LanguageId = keyof typeof VoiceLangTable;
export type Language = (typeof VoiceLangTable)[LanguageId];

export interface CharacterVoice {
  langId: LanguageId;
  actors: string[];
}

export interface DialogueLine {
  sortId: number;
  title: string;
  text: string;
  unlockCond: { type: "trust" | "promotion"; val: number } | null;
}
