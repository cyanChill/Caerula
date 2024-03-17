"use client";
import { useSetAtom } from "jotai";

import { operatorLookupFilterAtom } from "../store";

import { FilterMenu } from "@/components/form/FilterMenu";

/** @description Lookup filter button & form. */
export function LookupControls({
  formContent,
}: {
  formContent: React.ReactNode;
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

  return <FilterMenu formControls={formContent} onSubmit={updateFilters} />;
}
