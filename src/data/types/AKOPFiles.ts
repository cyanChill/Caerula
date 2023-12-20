/** @description A section of the Operator Files. */
export interface OpPersonalFile {
  title: string;
  text: string;
  unlockCond:
    | { type: "trust" | "promotion"; val: number }
    | { type: "special"; val: string }
    | null;
}

/** @description An entry of Operator Records. */
export interface OpRecord {
  name: string;
  description: string[];
  unlockCond: { elite: number; lvl: number };
  trustUnlock: number;
}

/** @description An entry of Operator Paradox Simulators. */
export interface OpParadox {
  name: string;
  text: string;
  unlockCond: { elite: number; lvl: number };
}
