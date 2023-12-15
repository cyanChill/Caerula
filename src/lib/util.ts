import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description Combines any number of Tailwind classes nicely.
 * @returns A string containing Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** @description Clamps the current number. */
export function clamp(min: number, curr: number, max: number) {
  return Math.min(Math.max(curr, min), max);
}
