import { type WithCSS, cn } from "@/lib/style";

type FieldProps = WithCSS<{ children: React.ReactNode }>;

/** @description Stylized `<fieldset>`. */
export function Fieldset({ children, className, style }: FieldProps) {
  return (
    <fieldset style={style} className={cn("flex flex-col", className)}>
      {children}
    </fieldset>
  );
}

/** @description Stylized `<legend>` (positioned like a normal element). */
export function Legend({ children, className, style }: FieldProps) {
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
