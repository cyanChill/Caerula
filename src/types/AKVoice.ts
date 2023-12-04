export const VoiceLangTable = {
  CN_MANDARIN: "CN - Mandarin",
  CN_TOPOLECT: "CN - Regional",
  JP: "JP",
  EN: "EN",
  KR: "KR",
  LINKAGE: "Collaboration",
  ITA: "IT",
} as const;

export type VoiceLangId = keyof typeof VoiceLangTable;
export type VoiceLang = (typeof VoiceLangTable)[VoiceLangId];

export interface VoiceLine {
  sortId: number;
  title: string;
  text: string;
  unlockCond: { type: "trust" | "promotion"; val: number } | null;
}

export interface VoiceActor {
  langId: VoiceLangId;
  actor: string[];
}
