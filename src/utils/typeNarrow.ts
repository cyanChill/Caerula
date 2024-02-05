/** @description Checks if key is a keyof the object. */
export function isKeyOf<TObj extends Record<PropertyKey, unknown>>(
  key: PropertyKey,
  obj: TObj,
): key is keyof TObj {
  return key in obj;
}

/** @description Assert object is of a type. */
export function objIsType<T extends Record<PropertyKey, unknown>>(
  key: PropertyKey,
  obj: Record<string, unknown>,
): obj is T {
  return key in obj;
}
