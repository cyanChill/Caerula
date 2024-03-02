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
export function Checkbox({
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
          "--clr-IA-O": `${internalTheme.inactive}40`, // At 25% opacity
          "--clr-A": internalTheme.active,
          "--clr-A-O": `${internalTheme.active}40`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "flex-center min-h-[calc(2lh+0.375rem)] rounded-md border border-current p-1",
        "text-center text-sm leading-tight text-[var(--clr-IA)]",
        "shadow-[0_0_2px_1px_var(--clr-shdw)] [--clr-shdw:var(--clr-IA-O)]",
        "ring-white transition duration-300 ease-in-out has-[:focus]:ring-2",
        "has-[:enabled:hover]:cursor-pointer has-[:enabled:hover]:bg-white/5",
        "has-[:disabled]:opacity-50 has-[:disabled]:grayscale",
        "has-[:checked]:text-[var(--clr-A)] has-[:checked]:[--clr-shdw:var(--clr-A-O)]",
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

/** @description Groups checkboxes of the same category. */
export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <ScopeProvider atoms={[groupNameAtom]}>
      <HydrateAtoms atomValues={[[groupNameAtom, props.name]]}>
        <div
          style={props.style}
          className={cn(
            "grid grid-cols-autoFit gap-1.5 [--min-col-size:7.5rem]",
            props.className,
          )}
        >
          {props.children}
        </div>
      </HydrateAtoms>
    </ScopeProvider>
  );
}
