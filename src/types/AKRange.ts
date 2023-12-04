import type { RangeIds } from "./typesFrom";

export type RangeId = (typeof RangeIds)[number];

/**
 * @description Structure to create a visual representation of range
 * (0 = empty tile, 1 = part of range, 2 = deployment spot).
 */
export type RangeArea = (0 | 1 | 2)[][];
