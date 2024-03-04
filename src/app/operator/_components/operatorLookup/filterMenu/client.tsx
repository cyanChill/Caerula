"use client";
import { useSetAtom } from "jotai";
import { useState, useRef } from "react";

import { useKey } from "@/hooks/useKey";
import type { OperatorLookupFilterType } from "../store";
import { operatorLookupFilterAtom } from "../store";

import { cn } from "@/lib/style";
import { Button } from "@/components/form/Button";
import ModalBackdrop from "@/components/layout/ModalBackdrop";

/** @description Logic that opens/closes the filter menu. */
export function INTERNAL_Menu(props: {
  menuBtnChild: React.ReactNode;
  formContent: React.ReactNode;
  formSubmitBtn: React.ReactNode;
}) {
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [show, setShow] = useState(false);
  const setOperatorLookupFilter = useSetAtom(operatorLookupFilterAtom);

  function setVisibility(isVisible: boolean) {
    setShow(isVisible);
    if (isVisible === false) openBtnRef.current?.focus();
    else formRef.current?.scrollTo(0, 0);
    // Prevent scroll on the body if the menu is open
    document.body.setAttribute("data-lock", `${isVisible}`);
  }

  function triggerFormSubmit() {
    formRef.current!.requestSubmit();
  }

  function updateFilters(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const newFilters: OperatorLookupFilterType = {
      rarity: [],
      classFilter: "profession",
      profession: [],
      branch: [],
      affiliation: undefined,
      type: [],
      position: [],
    };

    for (const [key, val] of formData) {
      if (key === "rarity[]") newFilters.rarity.push(Number(val));
      if (key === "class-filter") newFilters.classFilter = val as string;
      if (key === "profession[]") newFilters.profession.push(val as string);
      if (key === "branch[]") newFilters.branch.push(val as string);
      if (key === "type[]") newFilters.type.push(val as string);
      if (key === "position[]") newFilters.position.push(val as string);
      if (key === "affiliation" && !!val)
        newFilters.affiliation = val as string;
    }

    setOperatorLookupFilter(newFilters);
    setVisibility(false);
  }

  useKey("Escape", triggerFormSubmit);

  return (
    <>
      <Button
        ref={openBtnRef}
        aria-controls="filter-menu"
        onClick={() => setVisibility(true)}
        color="tertiary"
        radius="medium"
        className="mx-2 gap-1 py-0.5 font-geist-sans text-sm"
      >
        {props.menuBtnChild}
      </Button>

      <div
        id="filter-menu"
        ref={menuContainerRef}
        tabIndex={0}
        className={cn(
          "invisible fixed right-0 top-1/2 z-50 -translate-y-1/2 overflow-y-auto",
          "mx-2 w-full max-w-[calc(100%-1rem)] rounded-xl sm:max-w-[450px]",
          "translate-x-full opacity-0 transition-[visibility_opacity_transform] duration-500",
          "outline-none ring-white focus:ring-2",
          { "visible translate-x-0 opacity-100": show },
        )}
      >
        <div
          className={cn(
            "grid h-[calc(100dvh-1rem)] grid-rows-[minmax(0,1fr)_auto] sm:h-[90dvh]",
            "bg-neutral-10 font-geist-sans",
          )}
        >
          <form
            ref={formRef}
            id="op-filter-form"
            onSubmit={updateFilters}
            className="overflow-y-auto overflow-x-visible p-2 sm:p-4"
          >
            {props.formContent}
          </form>
          {props.formSubmitBtn}
        </div>
      </div>

      <ModalBackdrop
        isVisible={show}
        tabIndex={show ? 0 : -1}
        onClick={triggerFormSubmit}
        onFocus={() => menuContainerRef.current!.focus()}
      />
    </>
  );
}
