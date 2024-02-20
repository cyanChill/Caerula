"use client";
import { useAtomValue, useSetAtom } from "jotai";

import { potentialAtom, maxPotentialAtom, setPotentialAtom } from "./store";

import { cn } from "@/lib/style";
import Knob from "@/components/form/Knob";

/** @description Allows us to modify the current potential in our Potential store. */
export function PotentialKnob() {
  const maxPotential = useAtomValue(maxPotentialAtom);
  const setPotential = useSetAtom(setPotentialAtom);
  return (
    <Knob
      label="Potential Selector"
      options={{
        min: 1,
        max: maxPotential,
        trackWidth: `clamp(0.4rem, 7.75cqw, 1.25rem)`,
      }}
      propagateVal={setPotential}
      theme={{ track: { active: "#A6C8FF" } }}
    />
  );
}

/** @description Icon representing the current potential. */
export function PotentialIcon({ icons }: { icons: React.ReactNode[] }) {
  const potential = useAtomValue(potentialAtom);
  return icons[potential - 1];
}

/** @description Interactive way of displaying available potentials. */
export function PotentialValues({ potentials }: { potentials: string[] }) {
  const potential = useAtomValue(potentialAtom);
  return potentials.map((pot, idx) => (
    <li
      key={idx}
      className={cn("text-neutral-80 transition-opacity", {
        "opacity-50 grayscale": idx > potential - 2,
        "text-primary-80": pot.includes("Improves"),
      })}
    >
      {pot}
    </li>
  ));
}
