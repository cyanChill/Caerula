"use client";
import { useAtomValue } from "jotai";

import { filteredOperatorsListAtom, isFiltersValidAtom } from "./store";

import { cn } from "@/lib/style";
import { CharacterLink } from "@/features/characters/Link";
import { getRarityColor } from "@/features/characters/utils";

/** @description List of filtered operators. */
export function FilteredOperatorList() {
  const hasValidFilters = useAtomValue(isFiltersValidAtom);
  const operators = useAtomValue(filteredOperatorsListAtom);

  if (!hasValidFilters || operators.length === 0) {
    return (
      <p className="p-2 text-center text-sm text-neutral-70">
        {!hasValidFilters
          ? "Select more than 1 filters to begin."
          : "No operators matched the selected filters."}
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid auto-rows-min grid-cols-autoFill gap-2 [--min-col-size:13ch]",
        "overflow-y-auto p-2 text-[10px]",
      )}
    >
      {operators.map(({ id, slug, displayName, rarity }) => (
        <li key={id}>
          <CharacterLink
            avatar={{ id, bg: getRarityColor(rarity).bg }}
            href={`/operator/${slug}`}
            name={displayName}
          />
        </li>
      ))}
    </ul>
  );
}
