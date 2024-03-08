import type { HexColor, WithCSS } from "@/lib/style";
import { cn } from "@/lib/style";

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
        "text-center text-sm leading-tight text-[--clr-IA]",
        "shadow-[0_0_2px_1px_var(--clr-shdw)] [--clr-shdw:--clr-IA-O]",
        "ring-white transition duration-300 ease-in-out has-[:focus]:ring-2",
        "has-[:enabled:hover]:cursor-pointer has-[:enabled:hover]:bg-white/5",
        "has-[:disabled]:opacity-50 has-[:disabled]:grayscale",
        "has-[:checked]:text-[--clr-A] has-[:checked]:[--clr-shdw:--clr-A-O]",
        className,
      )}
    >
      {label}
      <input type="checkbox" {...props} className="size-0 outline-none" />
    </label>
  );
}

/** @description Groups checkboxes of the same category. */
export function CheckboxGroup(props: WithCSS<{ children: React.ReactNode }>) {
  return (
    <div
      style={props.style}
      className={cn(
        "grid grid-cols-autoFit gap-1.5 [--min-col-size:7.25rem]",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
