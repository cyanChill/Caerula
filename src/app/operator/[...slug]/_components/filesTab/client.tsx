"use client";
import { useAtomValue } from "jotai";

import { selectedSkinIdAtom } from "../overview/store";

export function CurrentDialogue<
  TObj extends Record<PropertyKey, React.ReactNode>,
>({ fallback, variants }: { fallback: PropertyKey; variants: TObj }) {
  const currSkinId = useAtomValue(selectedSkinIdAtom); // Get current skin id from a store
  if (variants[currSkinId]) return variants[currSkinId];
  return variants[fallback];
}
