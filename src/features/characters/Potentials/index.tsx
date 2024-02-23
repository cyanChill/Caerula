import { maxPotentialAtom } from "./store";

import { HydrateAtoms } from "@/lib/jotai";
import Card from "@/components/ui/Card";
import { getPotentialIcons } from "@/components/ui/IconList";
import * as Client from "./client"; // Fine since we're using everything

type PotentialProviderProps = {
  numPotentials: number;
  children: React.ReactNode;
};

/** @description Helps set the max potential value. */
export function PotentialProvider(props: PotentialProviderProps) {
  return (
    <HydrateAtoms atomValues={[[maxPotentialAtom, props.numPotentials + 1]]}>
      {props.children}
    </HydrateAtoms>
  );
}

/** @description Interactive way of displaying the potentials of an operator. */
export default function Potentials({ potentials }: { potentials: string[] }) {
  if (potentials.length === 0) return null;
  return (
    <section
      aria-label="Potentials"
      className="col-span-2 grid grid-cols-[1fr_1.75fr]"
    >
      <Card
        defaultPadding
        className="relative grid place-items-center bg-neutral-20/75 @container"
      >
        <Client.PotentialKnob />
        <Client.PotentialIcon
          icons={getPotentialIcons({
            size: 64,
            altBuilder: (val) => `Potential ${val}`,
            className: "absolute-center size-[70cqw]",
          })}
        />
      </Card>
      <Card className="bg-neutral-10/75 p-4 @container">
        <ul
          aria-label="Available Potentials"
          className="grid gap-2 text-[max(0.75rem,6cqw)]"
        >
          <Client.PotentialValues potentials={potentials} />
        </ul>
      </Card>
    </section>
  );
}
