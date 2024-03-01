"use client";
import { atom, useAtomValue } from "jotai";

export const groupNameAtom = atom<string | undefined>(undefined);

type INTERNAL_CheckboxInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children" | "className" | "style" | "type"
>;

/** @description The physical checkbox input element. */
export function INTERNAL_CheckboxInput({
  name,
  ...props
}: INTERNAL_CheckboxInputProps) {
  return (
    <input
      type="checkbox"
      name={useAtomValue(groupNameAtom) ?? name}
      {...props}
      className="size-0 outline-none"
    />
  );
}
