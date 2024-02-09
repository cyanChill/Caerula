"use client";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";

interface SkillProps {
  hasMasteries: boolean;
}

interface SkillState {
  skillLevel: number;
  maxSkillLevel: number;
  setSkillLevel: (lvl: number) => void;
}

type SkillStore = ReturnType<typeof createSkillStore>;

const createSkillStore = (initProps: SkillProps) => {
  return createStore<SkillState>()((set) => ({
    skillLevel: 1,
    maxSkillLevel: initProps.hasMasteries ? 10 : 7,
    setSkillLevel: (lvl: number) =>
      set(({ maxSkillLevel }) => {
        if (lvl < 1 || lvl > maxSkillLevel) return {};
        return { skillLevel: lvl };
      }),
  }));
};

const SkillContext = createContext<SkillStore | null>(null);

/** @description Use context with Zustand to make a non-global store. */
export function SkillProvider({
  children,
  ...props
}: React.PropsWithChildren<SkillProps>) {
  const storeRef = useRef<SkillStore>();
  if (!storeRef.current) storeRef.current = createSkillStore(props);
  return (
    <SkillContext.Provider value={storeRef.current}>
      {children}
    </SkillContext.Provider>
  );
}

/** @description Internal hook for accessing context. */
function useSkillStore<T>(selector: (state: SkillState) => T): T {
  const store = useContext(SkillContext);
  if (!store) throw new Error("Cannot use outside of SkillProvider.");
  return useStore(store, selector);
}

/* Export selectors manually to prevent subscribing to the entire store. */
/** Remember to subtract 1 if we're using this as an array index. */
export const useSkillLevel = () => useSkillStore((s) => s.skillLevel);
export const useMaxSkillLevel = () => useSkillStore((s) => s.maxSkillLevel);
export const useSetSkillLevel = () => useSkillStore((s) => s.setSkillLevel);
