import EnemyList from "@/data/enemy/enemyList.json";
import { enemiesAtom } from "./store";

import { HydrateAtoms } from "@/lib/jotai";
import { pickKeys } from "@/utils/object";
import { EnemyFilterMenu } from "./filterMenu";
import { FilteredEnemyList } from "./filteredList";

/** @description Allows for quick lookup of enemies based on various filters. */
export default function EnemyLookup() {
  return (
    <HydrateAtoms
      atomValues={[
        [
          enemiesAtom,
          Object.values(EnemyList).map((enemy) =>
            pickKeys(enemy, [
              ...["sort", "id", "slug", "code", "name", "race"],
              ...["type", "attackPattern", "immunities", "isFlying"],
            ] as const),
          ),
        ],
      ]}
    >
      <section className="min-h-dvh">
        <EnemyFilterMenu />
        <FilteredEnemyList />
      </section>
    </HydrateAtoms>
  );
}
