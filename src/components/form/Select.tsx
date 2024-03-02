import { ChevronDown } from "@/assets/svgs/direction";

import type { HexColor } from "@/lib/style";
import { cn } from "@/lib/style";

type OptionEntry = { label: string; value: string | number };

type GroupedOptions = { groupLabel: string; options: OptionEntry[] };

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: OptionEntry[] | GroupedOptions[];
  allowEmpty?: boolean;
  theme?: {
    bg?: HexColor; // Background color of dropdown
    color?: HexColor; // Color of border & dropdown text
    selected?: {
      bg: HexColor; // Background color on selected dropdown option
      text: HexColor; // Color of selected dropdown option
    };
  };
}

const defaultTheme = {
  bg: "#1A1C1E",
  color: "#ABABAE",
  selected: { bg: "#00315F", text: "#FFFFFF" },
};

/** @description Stylized select component built off of the default select input. */
export function Select({
  options,
  allowEmpty,
  theme,
  className,
  style,
  ...props
}: SelectProps) {
  const internalTheme = { ...defaultTheme, ...theme };
  return (
    <div
      style={
        {
          "--clr-bg": internalTheme.bg,
          "--clr-main": internalTheme.color,
          "--clr-sel-bg": internalTheme.selected.bg,
          "--clr-sel-txt": internalTheme.selected.text,
        } as React.CSSProperties
      }
      className={cn(
        "grid-stack text-[var(--clr-sel-txt)]",
        "has-[>:disabled]:opacity-50 has-[>:disabled]:grayscale",
      )}
    >
      <select
        style={style}
        {...props}
        className={cn(
          "appearance-none truncate rounded-md p-1 pr-[1lh] outline-none",
          "border border-[var(--clr-main)] bg-transparent text-lg",
          "ring-white transition duration-300 ease-in-out focus:ring-2",
          "enabled:hover:cursor-pointer enabled:hover:bg-white/5",
          "*:bg-[var(--clr-bg)] *:text-sm *:text-[var(--clr-main)]",
          className,
        )}
      >
        {allowEmpty && <option value="" />}
        {options.map((opt, idx) => {
          if (hasGroupedOptions(opt)) {
            return (
              <optgroup key={idx} label={opt.groupLabel}>
                {opt.options.map(({ value, label }, idx2) => (
                  <Option key={`${idx}_${idx2}`} value={value}>
                    {label}
                  </Option>
                ))}
              </optgroup>
            );
          }
          return (
            <Option key={idx} value={opt.value}>
              {opt.label}
            </Option>
          );
        })}
      </select>
      <ChevronDown className="pointer-events-none relative right-1 size-[1lh] self-center justify-self-end" />
    </div>
  );
}

/** @description Narrows down the method we'll use to list our select options. */
function hasGroupedOptions(
  opt: Record<string, unknown>,
): opt is GroupedOptions {
  return Object.hasOwn(opt, "groupLabel");
}

type OptionProps = { value: string | number; children: React.ReactNode };

/** @description Internal stylization of option element. */
function Option({ value, children }: OptionProps) {
  return (
    <option
      value={value}
      className="checked:bg-[var(--clr-sel-bg)] checked:text-[var(--clr-sel-txt)]"
    >
      {children}
    </option>
  );
}
