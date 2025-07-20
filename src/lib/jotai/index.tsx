"use client";
import { type WritableAtom, Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

/** @description Allows Jotai to function in component sub tree. */
export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

/** @description Initialize Jotai atoms on render. */
export function HydrateAtoms(props: {
  atomValues: Iterable<
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: React.ReactNode;
}) {
  useHydrateAtoms(new Map(props.atomValues));
  return props.children;
}
