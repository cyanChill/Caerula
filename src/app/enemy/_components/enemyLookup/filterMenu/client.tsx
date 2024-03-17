"use client";
import { useSetAtom } from "jotai";

import { enemyLookupFilterAtom } from "../store";

import { FilterMenu } from "@/components/form/FilterMenu";

/** @description Lookup filter button & form. */
export function LookupControls({
  formContent,
}: {
  formContent: React.ReactNode;
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
    <FilterMenu
      menuBtnClassName="sticky top-[5svh] mb-4"
      formControls={formContent}
      onSubmit={updateFilters}
    />
  );
}
