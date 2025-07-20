"use client";
import { atom, useAtomValue, useSetAtom } from "jotai";

import { useFormReset } from "@/hooks/useFormReset";

import { cn } from "@/lib/style";
import { Select } from "@/components/form/Select";

export const fieldsetIdAtom = atom("");
export const selectedFieldIdAtom = atom("");

type INTERNAL_FieldSelectorProps = {
  formId: string;
  defaultVal: string;
  options: Array<{ label: string; value: string }>;
};

/** @description Allows us to change what field is rendered. */
export function INTERNAL_FieldSelector(props: INTERNAL_FieldSelectorProps) {
  const id = useAtomValue(fieldsetIdAtom);
  const selectField = useSetAtom(selectedFieldIdAtom);

  useFormReset(() => selectField(props.defaultVal), props.formId);

  return (
    <Select
      id={id}
      name={id}
      options={props.options}
      onChange={(e) => selectField(e.target.value)}
      className="text-xl font-semibold"
    />
  );
}

type INTERNAL_SelectedFieldProps = { id: string; children: React.ReactNode };

/** @description Renders the form element based on the selected field. */
export function INTERNAL_SelectedField(props: INTERNAL_SelectedFieldProps) {
  const notSelected = props.id !== useAtomValue(selectedFieldIdAtom);
  return (
    <fieldset disabled={notSelected} className={cn({ hidden: notSelected })}>
      {props.children}
    </fieldset>
  );
}
