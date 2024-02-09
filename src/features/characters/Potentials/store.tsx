"use client";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";

interface PotentialProps {
  numPotentials: number;
}

interface PotentialState {
  potential: number; // Current operator potential
  maxPotential: number;
  setPotential: (pot: number) => void;
}

type PotentialStore = ReturnType<typeof createPotentialStore>;

const createPotentialStore = (initProps: PotentialProps) => {
  return createStore<PotentialState>()((set) => ({
    potential: 1,
    maxPotential: initProps.numPotentials + 1,
    setPotential: (pot: number) =>
      set(({ maxPotential }) => {
        if (pot < 1 || pot > maxPotential) return {};
        return { potential: pot };
      }),
  }));
};

const PotentialContext = createContext<PotentialStore | null>(null);

/** @description Use context with Zustand to make a non-global store. */
export function PotentialProvider({
  children,
  ...props
}: React.PropsWithChildren<PotentialProps>) {
  const storeRef = useRef<PotentialStore>();
  if (!storeRef.current) storeRef.current = createPotentialStore(props);
  return (
    <PotentialContext.Provider value={storeRef.current}>
      {children}
    </PotentialContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
function usePotentialStore<T>(selector: (state: PotentialState) => T): T {
  const store = useContext(PotentialContext);
  if (!store) throw new Error("Cannot use outside of PotentialProvider.");
  return useStore(store, selector);
}

/* Export selectors manually to prevent subscribing to the entire store. */
/** Remember to subtract 1 if we're using this as an array index. */
export const usePotential = () => usePotentialStore((s) => s.potential);
export const useMaxPotential = () => usePotentialStore((s) => s.maxPotential);
export const useSetPotential = () => usePotentialStore((s) => s.setPotential);
