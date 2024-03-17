"use client";
import { useSetAtom } from "jotai";

import { enemyLookupFilterAtom } from "../store";

import { FilterMenuProvider } from "@/components/form/FilterMenu/client";

/** 
 * @description Wrapper for `<FilterMenu />`, providing the `onSubmit`
 *  function for our "Enemy Lookup" feature. 
*/
export function INTERNAL_ONSUBMIT_PROVIDER(props: {
  children: React.ReactNode;
}) {
  const setEnemyLookupFilter = useSetAtom(enemyLookupFilterAtom);

  function updateFilters(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setEnemyLookupFilter({
      event: String(formData.get("event")) || undefined,
      type: formData.getAll("type[]").map((val) => String(val)),
      position: formData.getAll("position[]").map((val) => String(val)),
      race: formData.getAll("race[]").map((val) => String(val)),
      immunities: formData.getAll("immunities[]").map((val) => String(val)),
      attackPattern: formData
        .getAll("attackPattern[]")
        .map((val) => String(val)),
    });
  }

  return (
    <FilterMenuProvider onSubmit={updateFilters}>
      {props.children}
    </FilterMenuProvider>
  );
}
