/** @description Clamps the current number. */
export function clamp(min: number, curr: number, max: number) {
  return Math.min(Math.max(curr, min), max);
}

/** @description Converts radians to degrees. */
export function radianToDegree(num: number) {
  return (num * 180) / Math.PI;
}

/** @description Shorthand for abbreviating large numbers. */
export function abbrvNum(val: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(val);
}
