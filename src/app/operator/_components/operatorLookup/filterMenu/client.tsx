"use client";
import { useSetAtom } from "jotai";
import { useState, useRef } from "react";

import { useKey } from "@/hooks/useKey";
import { operatorLookupFilterAtom } from "../store";

import { cn } from "@/lib/style";
import { Button } from "@/components/form/Button";
import ModalBackdrop from "@/components/layout/ModalBackdrop";

/** @description Lookup filter button & form. */
export function LookupControls(props: {
  menuBtnContent: React.ReactNode;
  formContent: React.ReactNode;
  formAction: React.ReactNode;
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
    setOperatorLookupFilter({
      rarity: formData.getAll("rarity[]").map((val) => Number(val)),
      profession: formData.getAll("profession[]").map((val) => String(val)),
      branch: formData.getAll("branch[]").map((val) => String(val)),
      affiliation: String(formData.get("affiliation")) || undefined,
      type: formData.getAll("type[]").map((val) => String(val)),
      position: formData.getAll("position[]").map((val) => String(val)),
    });
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
        className="gap-1 py-0.5 font-geist-sans text-sm"
      >
        {props.menuBtnContent}
      </Button>

      <div
        id="filter-menu"
        ref={menuContainerRef}
        tabIndex={0}
        className={cn(
          "invisible fixed right-0 top-1/2 z-50 -translate-y-1/2 overflow-y-auto",
          "grid h-[calc(100dvh-1rem)] grid-rows-[minmax(0,1fr)_auto] sm:h-[90dvh]",
          "mx-2 w-full max-w-[calc(100%-1rem)] sm:mx-4 sm:max-w-[450px]",
          "rounded-xl bg-neutral-10 font-geist-sans",
          "translate-x-full opacity-0 transition-[visibility_opacity_transform] duration-500",
          "outline-none ring-white focus:ring-2",
          { "visible translate-x-0 opacity-100": show },
        )}
      >
        <form
          ref={formRef}
          id="op-lookup-form"
          onSubmit={updateFilters}
          className="overflow-y-auto p-2 sm:p-4"
        >
          {props.formContent}
        </form>
        {props.formAction}
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
