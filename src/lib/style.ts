import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type BgColor = `bg-${string}-${number}` | `bg-[#${string}]`;
export type BorderColor = `border-${string}-${number}` | `border-[#${string}]`;

/**
 * @description Combines any number of Tailwind classes nicely.
 * @returns A string containing Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
