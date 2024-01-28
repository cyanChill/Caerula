/** @description Checks if key is a keyof the object. */
export function isKeyOf<TObj extends Record<PropertyKey, unknown>>(
  key: PropertyKey,
  obj: TObj,
): key is keyof TObj {
  return key in obj;
}
