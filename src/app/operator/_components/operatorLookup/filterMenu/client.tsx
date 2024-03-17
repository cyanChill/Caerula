"use client";
import { useSetAtom } from "jotai";

import { operatorLookupFilterAtom } from "../store";

import { FilterMenuProvider } from "@/components/form/FilterMenu/client";

/**
 * @description Wrapper for `<FilterMenu />`, providing the `onSubmit`
 *  function for our "Operator Lookup" feature.
 */
export function INTERNAL_ONSUBMIT_PROVIDER(props: {
  children: React.ReactNode;
}) {
  const setOperatorLookupFilter = useSetAtom(operatorLookupFilterAtom);

  function updateFilters(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setOperatorLookupFilter({
      rarity: formData.getAll("rarity[]").map((val) => Number(val)),
      profession: formData.getAll("profession[]").map((val) => String(val)),
      branch: formData.getAll("branch[]").map((val) => String(val)),
      affiliation: String(formData.get("affiliation")) || undefined,
      type: formData.getAll("type[]").map((val) => String(val)),
      position: formData.getAll("position[]").map((val) => String(val)),
    });
  }

  return (
    <FilterMenuProvider onSubmit={updateFilters}>
      {props.children}
    </FilterMenuProvider>
  );
}
