import type { NationIds, FactionIds, TeamIds } from "./typesFrom";

/** @description Nations in the world of Arknights. */
export type NationId = (typeof NationIds)[number];

/** @description Factions that belongs to a Nation. */
export type FactionId = (typeof FactionIds)[number];

/** @description Teams formed between operators. */
export type TeamId = (typeof TeamIds)[number];

/** @description Shorthand for checking all affiliation types. */
export type Affiliations = {
  nation?: NationId | null;
  faction?: FactionId | null;
  team?: TeamId | null;
};

/** @description Relation between Faction or Team with Nation. */
export type AffiliationRelation = { name: string; nationId: NationId | null };

export const NationInfo: Record<NationId, string> = {
  bolivar: "Bolívar",
  columbia: "Columbia",
  egir: "Ægir",
  higashi: "Higashi",
  iberia: "Iberia",
  kazimierz: "Kazimierz",
  kjerag: "Kjerag",
  laterano: "Laterano",
  leithanien: "Leithanien",
  lungmen: "Yan-Lungmen",
  minos: "Minos",
  rhodes: "Rhodes Island",
  rim: "Rim Billiton",
  sami: "Sami",
  sargon: "Sargon",
  siracusa: "Siracusa",
  ursus: "Ursus",
  victoria: "Victoria",
  yan: "Yan"
};

export const FactionInfo: Record<FactionId, AffiliationRelation> = {
  abyssal: { name: "Abyssal Hunters", nationId: "egir" },
  babel: { name: "Babel", nationId: null },
  blacksteel: { name: "Blacksteel Worldwide", nationId: "columbia" },
  dublinn: { name: "Dublinn", nationId: "victoria" },
  elite: { name: "Rhodes Island-Elite Operator", nationId: "rhodes" },
  glasgow: { name: "Glasgow", nationId: "victoria" },
  karlan: { name: "Karlan Trade CO., LTD", nationId: "kjerag" },
  lgd: { name: "Lungmen Guard Department", nationId: "lungmen" },
  penguin: { name: "Penguin Logistics", nationId: "lungmen" },
  pinus: { name: "Pinus Sylvestris", nationId: "kazimierz" },
  rhine: { name: "Rhine Lab", nationId: "columbia" },
  siesta: { name: "Siesta", nationId: "columbia" },
  sui: { name: "Yan-Sui", nationId: "yan" },
  sweep: { name: "S.W.E.E.P", nationId: "rhodes" }
};

export const TeamInfo: Record<TeamId, AffiliationRelation> = {
  action4: { name: "Op Team A4", nationId: "rhodes" },
  chiave: { name: "Chiave Gang", nationId: "siracusa" },
  followers: { name: "Followers", nationId: null },
  lee: { name: "Lee's Detective Agency", nationId: "lungmen" },
  rainbow: { name: "Team Rainbow", nationId: null },
  reserve1: { name: "Reserve Op Team A1", nationId: "rhodes" },
  reserve4: { name: "Reserve Op Team A4", nationId: "rhodes" },
  reserve6: { name: "Reserve Op Team A6", nationId: "rhodes" },
  student: { name: "Ursus Student Self-Governing Group", nationId: "ursus" }
};
