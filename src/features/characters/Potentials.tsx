"use client";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn as useStore } from "zustand/traditional";
import Image from "next/image";

import { cn } from "@/lib/style";
import Knob from "@/components/form/Knob";

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
export const usePotential = () => usePotentialStore((s) => s.potential);
export const useMaxPotential = () => usePotentialStore((s) => s.maxPotential);
export const useSetPotential = () => usePotentialStore((s) => s.setPotential);

/** @description Interactive way of displaying the potentials of an operator. */
export default function Potentials({ potentials }: { potentials: string[] }) {
  const potential = usePotential();
  const maxPotential = useMaxPotential();
  const setPotential = useSetPotential();

  if (potentials.length === 0) return null;
  return (
    <section
      aria-label="Potentials"
      className="col-span-2 grid grid-cols-[1fr_1.75fr]"
    >
      <div className="card relative grid place-items-center bg-neutral-20/75 p-2 @container sm:p-4">
        <Knob
          label="Potential Selector"
          options={{
            min: 1,
            max: maxPotential,
            trackWidth: `clamp(0.4rem, 7.75cqw, 1.25rem)`,
          }}
          propagateVal={setPotential}
          theme={{
            track: { inactive: "#C6BEAC", active: "#A6C8FF" },
            thumb: "#FFFFFF",
          }}
        />
        <Image
          src={`/images/character/ui/potential/${potential}.webp`}
          alt={`Potential ${potential}`}
          width={64}
          height={64}
          className="absolute left-1/2 top-1/2 size-[70cqw] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="card bg-neutral-10/75 p-4 @container">
        <ul
          aria-label="Available Potentials"
          className="grid gap-2 text-[max(0.75rem,6cqw)]"
        >
          {potentials.map((pot, idx) => (
            <li
              key={idx}
              className={cn("text-neutral-80 transition-opacity", {
                "opacity-50 grayscale": idx > potential - 2,
                "text-primary-80": pot.includes("Improves"),
              })}
            >
              {pot}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
