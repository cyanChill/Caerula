import type { Professions } from "./typesFrom";

import type { RangeId } from "./AKRange";
import type { Position } from "./AKOperator";

/** @description The class an operator belongs to. */
export type Profession = keyof typeof Professions;
/** @description The subclasses/branches associated with a specific profession. */
export type SubClass<T extends Profession> = (typeof Professions)[T][number];

/** @description Object going in-depth about a specific subclass. */
export type Branch = {
  id: SubClass<Profession>;
  name: string;
  position: Position;
  range: RangeId[];
  trait: string;
  costIncrease: [number, number, number];
};
