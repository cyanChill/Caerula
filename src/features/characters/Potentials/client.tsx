"use client";
import { usePotential, useMaxPotential, useSetPotential } from "./store";

import { cn } from "@/lib/style";
import Knob from "@/components/form/Knob";

/** @description Allows us to modify the current potential in our Potential store. */
export function PotentialKnob() {
  const maxPotential = useMaxPotential();
  const setPotential = useSetPotential();
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
  const potential = usePotential();
  return icons[potential - 1];
}

/** @description Interactive way of displaying available potentials. */
export function PotentialValues({ potentials }: { potentials: string[] }) {
  const potential = usePotential();
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
