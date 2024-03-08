import OperatorTable from "@/data/operator/operatorTable.json";
import { operatorsAtom } from "./store";

import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { pickKeys } from "@/utils/object";
import { FilterMenu } from "./filterMenu";
import { FilteredOperatorList } from "./filteredList";

/** @description Allows for quick lookup of operators based on various filters. */
export default function OperatorLookup() {
  return (
    <HydrateAtoms
      atomValues={[
        [
          operatorsAtom,
          Object.values(OperatorTable).map((op) =>
            pickKeys(op, [
              ...["id", "slug", "displayName", "rarity", "position"],
              ...["profession", "branch", "affiliation", "type"],
            ] as const),
          ),
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
        <div className="px-2">
          <h2 className="mb-2 text-2xl sm:text-4xl">Operator Lookup</h2>
          <FilterMenu />
          <hr className="-mx-0.5 mb-4 mt-2 border-white/50" />
        </div>
        <FilteredOperatorList />
      </section>
    </HydrateAtoms>
  );
}
