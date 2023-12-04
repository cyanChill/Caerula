import type { FactionId, NationId, TeamId } from "@/types/AKAffiliation";

type NonNullNationId = Exclude<NationId, null>;
type NonNullFactionId = Exclude<FactionId, null>;
type NonNullTeamId = Exclude<TeamId, null>;

export const NationInfo = {
  bolivar: { id: "bolivar", name: "Bolívar" },
  columbia: { id: "columbia", name: "Columbia" },
  egir: { id: "egir", name: "Ægir" },
  higashi: { id: "higashi", name: "Higashi" },
  iberia: { id: "iberia", name: "Iberia" },
  kazimierz: { id: "kazimierz", name: "Kazimierz" },
  kjerag: { id: "kjerag", name: "Kjerag" },
  laterano: { id: "laterano", name: "Laterano" },
  leithanien: { id: "leithanien", name: "Leithanien" },
  lungmen: { id: "lungmen", name: "Lungmen" },
  minos: { id: "minos", name: "Minos" },
  rhodes: { id: "rhodes", name: "Rhodes Island" },
  rim: { id: "rim", name: "Rim Billiton" },
  sami: { id: "sami", name: "Sami" },
  sargon: { id: "sargon", name: "Sargon" },
  siracusa: { id: "siracusa", name: "Siracusa" },
  ursus: { id: "ursus", name: "Ursus" },
  victoria: { id: "victoria", name: "Victoria" },
  yan: { id: "yan", name: "Yan" },
} as Record<NonNullNationId, { id: NonNullNationId; name: string }>;

export const FactionInfo = {
  abyssal: { id: "abyssal", nationId: "egir", name: "Abyssal Hunters" },
  babel: { id: "babel", nationId: null, name: "Babel" },
  blacksteel: {
    id: "blacksteel",
    nationId: "columbia",
    name: "Blacksteel Worldwide",
  },
  dublinn: { id: "dublinn", nationId: "victoria", name: "Dublinn" },
  elite: { id: "elite", nationId: "rhodes", name: "Elite Op" },
  glasgow: { id: "glasgow", nationId: "victoria", name: "Glasgow" },
  karlan: { id: "karlan", nationId: "kjerag", name: "Karlan Trade" },
  lgd: { id: "lgd", nationId: "lungmen", name: "Lungmen Guard Department" },
  penguin: { id: "penguin", nationId: "lungmen", name: "Penguin Logistics" },
  pinus: { id: "pinus", nationId: "kazimierz", name: "Pinus Sylvestris" },
  rhine: { id: "rhine", nationId: "columbia", name: "Rhine Lab" },
  siesta: { id: "siesta", nationId: null, name: "Siesta" },
  sui: { id: "sui", nationId: "yan", name: "Sui" },
  sweep: { id: "sweep", nationId: "rhodes", name: "S.W.E.E.P." },
} as Record<
  NonNullFactionId,
  { id: NonNullFactionId; nationId: NationId; name: string }
>;

export const TeamInfo = {
  action4: { id: "action4", nationId: "rhodes", name: "Op Team A4" },
  chiave: { id: "chiave", nationId: "siracusa", name: "Chiave's Gang" },
  followers: { id: "followers", nationId: "rhodes", name: "Followers" },
  lee: { id: "lee", nationId: "lungmen", name: "Lee's Detective Agency" },
  rainbow: { id: "rainbow", nationId: null, name: "Team Rainbow" },
  reserve1: { id: "reserve1", nationId: "rhodes", name: "Reserve Op Team A1" },
  reserve4: { id: "reserve4", nationId: "rhodes", name: "Reserve Op Team A4" },
  reserve6: { id: "reserve6", nationId: "rhodes", name: "Reserve Op Team A6" },
  student: {
    id: "student",
    nationId: "ursus",
    name: "Ursus Student Self-Governing Group",
  },
} as Record<
  NonNullTeamId,
  { id: NonNullTeamId; nationId: NationId; name: string }
>;
