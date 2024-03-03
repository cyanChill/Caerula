import OperatorTable from "@/data/operator/operatorTable.json";
import { operatorsAtom } from "./store";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { FilterMenu } from "./filterMenu";
import { FilteredOperatorList } from "./filteredList";

/** @description Allows for quick lookup of operators based on various filters. */
export default function OperatorLookup() {
  return (
    <HydrateAtoms
      atomValues={[
        [
          operatorsAtom,
          Object.values(OperatorTable).map((op) => ({
            id: op.id,
            slug: op.slug,
            displayName: op.displayName,
            rarity: op.rarity,
            profession: op.profession,
            branch: op.branch,
            affiliation: op.affiliation,
            type: op.type,
            position: op.position,
          })),
        ],
      ]}
    >
      <section
        className={cn(
          "grid max-h-[40rem] grid-rows-[auto_minmax(0,1fr)] py-2",
          "lg:sticky lg:top-[5dvh] lg:order-2 lg:max-h-[90dvh]",
          "rounded-xl border border-white/50",
        )}
      >
        <div>
          <h2 className="mb-2 px-2 text-3xl sm:text-4xl">Operator Lookup</h2>
          <FilterMenu />
          <hr className="mx-1.5 mb-4 mt-2 border-white/50" />
        </div>
        <FilteredOperatorList />
      </section>
    </HydrateAtoms>
  );
}
