"use client";
import { atom, useAtomValue, useSetAtom } from "jotai";

import { cn } from "@/lib/style";
import { Select } from "@/components/form/Select";

export const fieldsetId = atom("");
export const selectedFieldId = atom("");

type INTERNAL_FieldSelectorProps = {
  options: { label: string; value: string }[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

/** @description Allows us to change what field is rendered. */
export function INTERNAL_FieldSelector(props: INTERNAL_FieldSelectorProps) {
  const id = useAtomValue(fieldsetId);
  const selectField = useSetAtom(selectedFieldId);
  return (
    <Select
      id={id}
      name={id}
      options={props.options}
      onChange={(e) => {
        selectField(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      className="text-xl font-semibold"
    />
  );
}

type INTERNAL_SelectedFieldProps = { id: string; children: React.ReactNode };

/** @description Renders the form element based on the selected field. */
export function INTERNAL_SelectedField(props: INTERNAL_SelectedFieldProps) {
  const notSelected = props.id !== useAtomValue(selectedFieldId);
  return (
    <fieldset disabled={notSelected} className={cn({ hidden: notSelected })}>
      {props.children}
    </fieldset>
  );
}
