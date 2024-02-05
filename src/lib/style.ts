import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type HexColor = `#${string}`;
export type TWColor = `${string}-${number}` | `[${HexColor}]`;

export type BgColor = `bg-${TWColor}`;
export type BorderColor = `border-${TWColor}`;
export type TextColor = `text-${TWColor}`;

export type WithCSS<T extends Record<string, unknown>> = T & {
  style?: React.CSSProperties;
  className?: string;
};

/**
 * @description Combines any number of Tailwind classes nicely.
 * @returns A string containing Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
