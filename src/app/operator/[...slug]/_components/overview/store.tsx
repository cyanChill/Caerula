"use client";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";

type SkinProps = { initId: string };
type SkinState = { skinId: string; setSkinId: (id: string) => void };
type SkinStore = ReturnType<typeof createSkinStore>;

const createSkinStore = ({ initId }: SkinProps) => {
  return createStore<SkinState>()((set) => ({
    skinId: initId,
    setSkinId: (id: string) => set(() => ({ skinId: id })),
  }));
};

const SkinContext = createContext<SkinStore | null>(null);

/** @description Use context with Zustand to make a non-global store. */
export function SkinProvider({
  children,
  ...props
}: React.PropsWithChildren<SkinProps>) {
  const storeRef = useRef<SkinStore>();
  if (!storeRef.current) storeRef.current = createSkinStore(props);
  return (
    <SkinContext.Provider value={storeRef.current}>
      {children}
    </SkinContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
function useSkinStore<T>(selector: (state: SkinState) => T): T {
  const store = useContext(SkinContext);
  if (!store) throw new Error("Cannot use outside of SkinProvider.");
  return useStore(store, selector);
}

/* Export selectors manually to prevent subscribing to the entire store. */
export const useSkinId = () => useSkinStore((s) => s.skinId);
export const useSetSkinId = () => useSkinStore((s) => s.setSkinId);
