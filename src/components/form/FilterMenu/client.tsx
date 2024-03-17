"use client";
import { atom, useAtomValue } from "jotai";
import { ScopeProvider } from "jotai-scope";

import { HydrateAtoms } from "@/lib/jotai";

const onSubmitAtom = atom<{ fn: (e: React.FormEvent) => void }>({
  fn: () => {
    return;
  },
});

/** @description Where we'll inject the onSubmit function. */
export function FilterMenuProvider(props: {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <ScopeProvider atoms={[onSubmitAtom]}>
      <HydrateAtoms atomValues={[[onSubmitAtom, { fn: props.onSubmit }]]}>
        {props.children}
      </HydrateAtoms>
    </ScopeProvider>
  );
}

/** @description For internal use only — the physical `<form>` element. */
export function INTERNAL_FORM({ children }: { children: React.ReactNode }) {
  const onSubmit = useAtomValue(onSubmitAtom).fn;
  return (
    <form
      id="filter-form"
      onSubmit={onSubmit}
      className="overflow-y-auto p-2 sm:p-4"
    >
      {children}
    </form>
  );
}
