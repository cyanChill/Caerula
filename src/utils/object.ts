/** @description Return object with only the specified keys. */
export function pickKeys<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T,
>(obj: T, keys: readonly K[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, _val]) => keys.includes(key as K)),
  ) as Pick<T, K>;
}

/** @description Return object without the specified keys. */
export function omitKeys<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T,
>(obj: T, keys: readonly K[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, _val]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}