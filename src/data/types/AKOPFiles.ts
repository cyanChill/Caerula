import type { UnlockCondition } from "./shared";

/** @description A section of the Operator Files. */
export interface OpFile {
  title: string;
  text: string;
  unlockCond:
    | { type: "trust" | "promotion"; val: number }
    | { type: "special"; val: string }
    | null;
}

/** @description An entry of Operator Records. */
export interface OpRecord {
  title: string;
  text: string[];
  unlockCond: UnlockCondition;
  trustUnlock: number;
}

/** @description An entry of Operator Paradox Simulators. */
export interface OpParadox {
  title: string;
  text: string;
  unlockCond: UnlockCondition;
}
