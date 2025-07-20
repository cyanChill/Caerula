import { type WithCSS, cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { ScopeProvider } from "@/lib/jotai/scope";
import * as Client from "./client";

type DynamicFieldsetProps = WithCSS<{
  id: string;
  formId: string;
  fields: Array<{ id: string; label: string; formEl: React.ReactNode }>;
  disabled?: boolean;
}>;

/** @description Renders form field based on selected option. */
export function DynamicFieldset({
  id,
  formId,
  fields,
  disabled,
  className,
  style,
}: DynamicFieldsetProps) {
  const options = Object.values(fields).map(({ id, label }) => {
    return { value: id, label };
  });

  return (
    <ScopeProvider atoms={[Client.fieldsetIdAtom, Client.selectedFieldIdAtom]}>
      <HydrateAtoms
        atomValues={[
          [Client.fieldsetIdAtom, id],
          [Client.selectedFieldIdAtom, fields[0].id],
        ]}
      >
        <fieldset
          aria-labelledby={id}
          {...{ disabled }}
          style={style}
          className={cn("space-y-2", className)}
        >
          <Client.INTERNAL_FieldSelector
            defaultVal={fields[0].id}
            {...{ formId, options }}
          />
          {Object.values(fields).map(({ id, formEl }) => (
            <Client.INTERNAL_SelectedField key={id} id={id}>
              {formEl}
            </Client.INTERNAL_SelectedField>
          ))}
        </fieldset>
      </HydrateAtoms>
    </ScopeProvider>
  );
}
