"use client";
import "core-js/features/array/to-reversed";
import "core-js/features/array/to-sorted";
import "core-js/features/array/to-spliced";

/*
  FIXME: Temporary workaround until Next.js adds the polyfills for these
  new array methods.
*/
export function Polyfill() {
  return null;
}
