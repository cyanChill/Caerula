/** @description Clamps the current number. */
export function clamp(min: number, curr: number, max: number) {
  return Math.min(Math.max(curr, min), max);
}
/** @description COnverts radians to degrees. */
export function radianToDegree(num: number) {
  return (num * 180) / Math.PI;
}
