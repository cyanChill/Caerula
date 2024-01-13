/*
  This file contains string functions that preserves the string type
  after transformation.
  
  https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#handbook-content
*/

/** @description Capitalize first letter of string. */
export function capitalize<T extends string>(str: T) {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export function toLowercase<T extends string>(str: T) {
  return str.toLowerCase() as Lowercase<T>;
}
