"use client";
import { useSkinId } from "../overview/store";

export function CurrentDialogue<
  TObj extends Record<PropertyKey, React.ReactNode>,
>({ fallback, variants }: { fallback: PropertyKey; variants: TObj }) {
  const currSkinId = useSkinId(); // Get current skin id from a store
  if (variants[currSkinId]) return variants[currSkinId];
  return variants[fallback];
}
