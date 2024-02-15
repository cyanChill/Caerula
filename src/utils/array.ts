/** @description Returns boolean if array is defined & not empty. */
export function notEmpty(arr: unknown[] | undefined) {
  return Array.isArray(arr) && arr.length > 0;
}
