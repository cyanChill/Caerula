import { type WithCSS, cn } from "@/lib/style";

type FieldProps = LegendProps & { disabled?: boolean };

/** @description Stylized `<fieldset>`. */
export function Fieldset({ disabled, children, className, style }: FieldProps) {
  return (
    <fieldset
      {...{ disabled }}
      style={style}
      className={cn("flex flex-col", className)}
    >
      {children}
    </fieldset>
  );
}

type LegendProps = WithCSS<{ children: React.ReactNode }>;

/** @description Stylized `<legend>` (positioned like a normal element). */
export function Legend({ children, className, style }: LegendProps) {
  return (
    <legend
      style={style}
      className={cn(
        "break-anywhere float-left mb-1 text-xl font-semibold",
        className,
      )}
    >
      {children}
    </legend>
  );
}
