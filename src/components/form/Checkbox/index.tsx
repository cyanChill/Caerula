import type { HexColor, WithCSS } from "@/lib/style";
import { cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { ScopeProvider } from "@/lib/jotai/scope";
import { groupNameAtom, INTERNAL_CheckboxInput } from "./client";

interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "children" | "type"
  > {
  label: React.ReactNode;
  theme?: { inactive?: HexColor; active?: HexColor };
}

const defaultTheme = { inactive: "#ABABAE", active: "#78ADF9" };

/** @description Stylized checkbox component built off the default checkbox input. */
export default function Checkbox({
  label,
  theme,
  className,
  style,
  ...props
}: CheckboxProps) {
  const internalTheme = { ...defaultTheme, ...theme };
  return (
    <label
      style={
        {
          "--clr-IA": internalTheme.inactive,
          "--clr-shdw-IA": `${internalTheme.inactive}40`, // At 25% opacity
          "--clr-A": internalTheme.active,
          "--clr-shdw-A": `${internalTheme.active}40`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "flex-center min-h-[calc(2lh+0.375rem)] rounded-md border border-current p-1",
        "text-center text-sm leading-tight text-[var(--clr-IA)]",
        "shadow-[0_0_2px_1px_var(--clr-shdw-IA)] transition duration-300 ease-in-out",
        "has-[:enabled:hover]:cursor-pointer has-[:enabled:hover]:bg-white/5",
        "ring-white has-[:disabled]:opacity-50 has-[:focus]:ring-1 has-[:disabled]:grayscale",
        "has-[:checked]:text-[var(--clr-A)] has-[:checked]:shadow-[0_0_2px_1px_var(--clr-shdw-A)]",
        className,
      )}
    >
      {label}
      <INTERNAL_CheckboxInput {...props} />
    </label>
  );
}

type CheckboxGroupProps = WithCSS<{
  name: `${string}[]`;
  children: React.ReactNode;
}>;

/** @description Allows for easier grouping of atoms of the same category. */
export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <ScopeProvider atoms={[groupNameAtom]}>
      <HydrateAtoms atomValues={[[groupNameAtom, props.name]]}>
        <div
          style={props.style}
          className={cn(
            "grid grid-cols-autoFit gap-1.5 [--min-col-size:125px]",
            props.className,
          )}
        >
          {props.children}
        </div>
      </HydrateAtoms>
    </ScopeProvider>
  );
}
